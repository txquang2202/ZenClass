import Class from "../models/classes.js";
import User from "../models/user.js";
import transporter from "../middleware/nodemailer.js";

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate("teachers", "username");

    res.json({ classes });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching users");
  }
};
const getClassMembers = async (req, res) => {
  const classId = req.params.id;
  try {
    const classWithMembers = await Class.findById(classId)
      .populate("students", "_id username fullname img")
      .populate("teachers", "_id username fullname img");

    if (!classWithMembers) {
      return res.status(404).json({ error: "Invalid Class ID" });
    }

    res.json(classWithMembers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addStudent = async (req, res) => {
  const classId = req.params.id;
  let { studentId } = req.query;

  if (!studentId) {
    if (!req.user) {
      return res.redirect(
        `${process.env.BASE_URL}/signin?message=Unauthorized: User not logged in`
      );
    }
    studentId = req.user._id;
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
    student.courses.push(classId);
    await student.save();
    await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          students: student,
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

const addTeacher = async (req, res) => {
  const classId = req.params.id;
  let { teacherId } = req.query;

  if (!teacherId) {
    if (!req.user) {
      return res.redirect(
        `${process.env.BASE_URL}/signin?message=Unauthorized: User not logged in`
      );
    }
    teacherId = req.user._id;
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
    }
    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user profile");
  }
};
const deleteTeacherFromClass = async (req, res) => {
  try {
    const classID = req.params.id;
    const personID = req.body.personID;
    const isTeachersExists = await Class.exists({
      _id: classID,
      teachers: personID,
    });
    if (isTeachersExists) {
      const deleteTeacher = await Class.findByIdAndUpdate(
        classID,
        {
          $pull: {
            teachers: personID,
          },
        },
        { new: true }
      );
    }
    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user profile");
  }
};
const createClass = async (req, res) => {
  try {
    const { title, teacherName, className } = req.body;

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
    const teacher = await User.findOne({ username: teacherName });
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
      teacher: teacherName,
      className: className,
      id: newClass._id,
    };
    await newClass.save();

    res.json({
      message: "Create class successfully!!",
      class: returnClass,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
};
const deleteClassbyID = async (req, res) => {
  try {
    const classID = req.params.id;

    const deleteClass = await Class.findByIdAndDelete(classID);

    if (!deleteClass) {
      return res.status(404).json({ message: "Class not found!" });
    }

    res.json({ message: "Delete succesfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user profile");
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

    const classInfo = await Class.findById(classID);

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
};
