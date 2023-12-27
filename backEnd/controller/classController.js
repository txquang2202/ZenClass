import Class from "../models/classes.js";
import User from "../models/user.js";
import Homework from "../models/homeworks.js";
import transporter from "../middleware/nodemailer.js";
import mongoose from "mongoose";
import Grade from "../models/grades.js";
import Comment from "../models/comments.js";

const createClass = async (req, res) => {
  try {
    const { title, userID, className } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is empty!" });
    }
    if (!className) {
      return res.status(400).json({ message: "Class name is empty!" });
    }

    const existTitle = await Class.findOne({ title });
    if (existTitle) {
      return res.status(400).json({ message: "Class title already taken!" });
    }
    const teacher = await User.findOne({ userID: userID });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    const newClass = new Class({
      title: title,
      teachers: [teacher._id],
      className: className,
    });
    const returnClass = {
      title: title,
      teacher: teacher.fullname,
      className: className,
      id: newClass._id,
    };
    await newClass.save();
    if (!teacher.classes.includes(newClass._id)) {
      teacher.classes.push(newClass._id);
      await teacher.save();
    }
    res.json({
      message: "Create class successfully!!",
      class: returnClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
};
const getAllClasses = async (req, res) => {
  const userID = req.params.id;
  try {
    const classInfo = await User.findOne({ _id: userID }, "classes").populate({
      path: "classes",
      select: "title teachers className",
      populate: {
        path: "teachers",
        model: "users",
        select: "fullname",
        options: { limit: 1 },
      },
    });
    res.json({ classInfo: classInfo.classes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching users");
  }
};
const getClassMembers = async (req, res) => {
  const classId = req.params.id;
  try {
    const classWithMembers = await Class.findById(classId)
      .populate("students", "_id userID username fullname img")
      .populate("teachers", "_id userID username fullname img");

    if (!classWithMembers) {
      return res.status(404).json({ error: "Invalid Class ID" });
    }

    res.json(classWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const joinByCode = async (req, res) => {
  const classId = req.params.id;
  const studentId = req.body.studentId;

  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid Class ID" });
    }
    const existStudent = await Class.findOne({
      students: studentId,
      _id: classId,
    });

    if (existStudent) {
      return res
        .status(404)
        .json({ message: "You have already joined this class!!" });
    }
    const existTeacher = await Class.findOne({
      teachers: studentId,
      _id: classId,
    });

    if (existTeacher) {
      return res
        .status(404)
        .json({ message: "You have already joined this class!!" });
    }
    if (!student.courses.includes(classId)) {
      student.courses.push(classId);
      await student.save();
    }
    //them vao grades schema
    const gradestructs = await Class.findOne(
      { _id: classId },
      "gradestructs"
    ).populate({ path: "gradestructs", select: "topic" });

    if (!gradestructs || !gradestructs.gradestructs) {
      return res.status(400).json({
        message: `Gradestruct not found in the specified class`,
      });
    }
    const newGrades = gradestructs.gradestructs.map((gradestruct) => ({
      topic: gradestruct.topic,
      score: 0,
    }));

    const newGrade = new Grade({
      studentId: student.userID,
      fullName: student.fullname,
      grades: newGrades,
    });

    await newGrade.save();

    const classGrades = await Class.findById(classId);

    if (!classGrades.grades.includes(newGrade._id)) {
      classGrades.grades.push(newGrade._id);
      await classGrades.save();
    }
    //tra ve du lieu
    const reciver = await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          students: student,
        },
      },
      { new: true }
    );
    const teacherName = await Class.findOne(
      {
        _id: classId,
      },
      "teachers"
    ).populate("teachers", "_id fullname");
    const toReturn = {
      id: reciver._id,
      title: reciver.title,
      author: teacherName.teachers[0].fullname,
      class: reciver.className,
    };
    return res
      .status(200)
      .json({ message: "Joined class successfully!", toReturn });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addStudent = async (req, res) => {
  const classId = req.params.id;
  let { studentId } = req.query;

  if (!req.user) {
    return res.redirect(
      `${process.env.BASE_URL}/signin?message=You have to login first`
    );
  }
  if (!studentId) {
    if (req.user._id) {
      studentId = req.user._id;
    } else if (req.user.user._id) {
      studentId = req.user.user._id;
    }
  }
  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=The student does not exist!!!`
      );
    }
    const existStudent = await Class.findOne({
      students: studentId,
      _id: classId,
    });

    if (existStudent) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=You have already joined this class!!`
      );
    }
    const existTeacher = await Class.findOne({
      teachers: studentId,
      _id: classId,
    });

    if (existTeacher) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=You have already joined this class!!`
      );
    }
    if (!student.courses.includes(classId)) {
      student.courses.push(classId);
      await student.save();
    }
    await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          students: student,
        },
      },
      { new: true }
    );
    //them vao bang grade
    const gradestructs = await Class.findOne(
      { _id: classId },
      "gradestructs"
    ).populate({ path: "gradestructs", select: "topic" });

    if (!gradestructs || !gradestructs.gradestructs) {
      return res.status(400).json({
        message: `Gradestruct not found in the specified class`,
      });
    }
    const newGrades = gradestructs.gradestructs.map((gradestruct) => ({
      topic: gradestruct.topic,
      score: 0,
    }));

    const newGrade = new Grade({
      studentId: student.userID,
      fullName: student.fullname,
      grades: newGrades,
    });

    await newGrade.save();

    const classGrades = await Class.findById(classId);

    if (!classGrades.grades.includes(newGrade._id)) {
      classGrades.grades.push(newGrade._id);
      await classGrades.save();
    }
    return res.redirect(
      `${process.env.BASE_URL}/home/classes/detail/people/${classId}?okay=Joining class successfully!!!`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addTeacher = async (req, res) => {
  const classId = req.params.id;
  let { teacherId } = req.query;

  if (!req.user) {
    return res.redirect(
      `${process.env.BASE_URL}/signin?message=You have to login first`
    );
  }
  if (!teacherId) {
    if (req.user._id) {
      teacherId = req.user._id;
    } else if (req.user.user._id) {
      teacherId = req.user.user._id;
    }
  }
  try {
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=The teacher is not exist!!!`
      );
    }
    const existStudent = await Class.findOne({
      students: teacherId,
      _id: classId,
    });

    if (existStudent) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=You have already joined this class!!`
      );
    }
    const existTeacher = await Class.findOne({
      teachers: teacherId,
      _id: classId,
    });

    if (existTeacher) {
      return res.redirect(
        `${process.env.BASE_URL}/home/classes/detail/people/${classId}?err=You have already joined this class!!`
      );
    }
    if (!teacher.classes.includes(classId)) {
      teacher.classes.push(classId);
      await teacher.save();
    }
    await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          teachers: teacher,
        },
      },
      { new: true }
    );

    return res.redirect(
      `${process.env.BASE_URL}/home/classes/detail/people/${classId}?okay=Joining class successfully!!!`
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const invitationLink = async (req, res) => {
  const check = req.body.check;
  const email = req.body.searchText;
  const classId = req.params.id;
  const person = await User.findOne({ email });
  if (!person) {
    return res.status(404).json({ message: "The user is not exist!!!" });
  }
  let links = null;
  if (check == 1) {
    links = `${process.env.BA_BASE_URL}/api/v1/addTeacherToClass/${classId}?teacherId=${person._id}`;
  } else {
    links = `${process.env.BA_BASE_URL}/api/v1/addStudentsToClass/${classId}?studentId=${person._id}`;
  }
  const existTeacher = await Class.findOne({
    teachers: person._id,
    _id: classId,
  });

  if (existTeacher) {
    return res.status(400).json({ message: "That user is already in class" });
  }
  const existStudent = await Class.findOne({
    students: person._id,
    _id: classId,
  });

  if (existStudent) {
    return res.status(400).json({ message: "That user is already in class" });
  }
  const mailOptions = {
    from: "Zen Class Corporation stellaron758@gmail.com",
    to: email,
    subject: "[Invitation to our class]",
    html: `To join our class please click this link: <a href="${links}">JOIN</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    return res.status(200).json({ message: "Reset email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const deleteStudentFromClass = async (req, res) => {
  try {
    const classID = req.params.id;
    const personID = req.body.personID;

    const isStudentExists = await Class.exists({
      _id: classID,
      students: personID,
    });

    if (isStudentExists) {
      await Class.findByIdAndUpdate(
        classID,
        {
          $pull: {
            students: personID,
          },
        },
        { new: true }
      );
      await User.findOneAndUpdate(
        { courses: classID },
        {
          $pull: {
            courses: classID,
          },
        },
        { new: true }
      );

      res.json({ message: "Delete successfully!" });
    } else {
      res.status(404).json({ message: "Student not found in the class." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting student from class");
  }
};
const deleteTeacherFromClass = async (req, res) => {
  try {
    const classID = req.params.id;
    const personID = req.body.personID;

    const isTeacherExists = await Class.exists({
      _id: classID,
      teachers: personID,
    });

    if (isTeacherExists) {
      await Class.findByIdAndUpdate(
        classID,
        {
          $pull: {
            teachers: personID,
          },
        },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: personID },
        {
          $pull: {
            classes: classID,
          },
        },
        { new: true }
      ).populate("classes");

      res.json({ message: "Delete successfully!" });
    } else {
      res.status(404).json({ message: "Teacher not found in the class." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting teacher from class");
  }
};
const deleteClassbyID = async (req, res) => {
  try {
    const classID = req.params.id;
    const deletedClass = await Class.findById(classID);
    const deletedHomeWork = await Class.findOne({ _id: classID }, "homeworks");

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found!" });
    }

    const students = deletedClass.students;
    const teachers = deletedClass.teachers;

    await User.updateMany(
      { _id: { $in: [...students, ...teachers] } },
      {
        $pull: {
          courses: classID,
          classes: classID,
        },
      }
    );
    for (const homeworkID of deletedHomeWork.homeworks) {
      const homework = await Homework.findOne({ _id: homeworkID });
      if (homework) {
        await Comment.deleteMany({ _id: { $in: homework.comments } });
      }
    }

    await Homework.deleteMany({ _id: { $in: deletedClass.homeworks } });

    await Class.findByIdAndDelete(classID);

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting class");
  }
};
const editClass = async (req, res) => {
  try {
    const { title, className } = req.body;
    const classID = req.params.id;
    const class_edit = await Class.findById(classID);

    if (!class_edit) {
      return res.status(404).json({ message: "User not found!" });
    }

    class_edit.title = title;
    class_edit.className = className;
    await class_edit.save();

    res.json({ message: "Class updated successfully", class_edit });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating class");
  }
};
const getClassByID = async (req, res) => {
  try {
    const classID = req.params.id;

    const classInfo = await Class.findById(classID).populate([
      {
        path: "teachers",
        select: "_id username fullname img",
      },
      {
        path: "gradestructs",
        select: "topic ratio",
      },
    ]);

    if (!classInfo) {
      return res.status(404).json({ message: "Class not found!" });
    }
    res.json({ classInfo });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching class info");
  }
};
export {
  getAllClasses,
  createClass,
  deleteClassbyID,
  editClass,
  getClassByID,
  addStudent,
  addTeacher,
  getClassMembers,
  invitationLink,
  deleteStudentFromClass,
  deleteTeacherFromClass,
  joinByCode,
};
