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
      .populate("students", "username fullname img")
      .populate("teachers", "username fullname img");

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
  const { studentId } = req.body;

  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "The students is not exist!!!" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          students: student,
        },
      },
      { new: true }
    );

    res.json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const addTeacher = async (req, res) => {
  const classId = req.params.id;
  const { teacherId } = req.body;

  try {
    const teacher = await User.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "The teacher is not exist!!!" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          teachers: teacher,
        },
      },
      { new: true }
    );

    res.json(updatedClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
const resetPassword = async (req, res) => {
  const classId = req.params.id;
  const verificationLink = `${process.env.BA_BASE_URL}/api/v1/invite/${classId}`;

  const existEmail = await User.findOne({ email });

  if (!existEmail) {
    return res.status(400).json({ message: "Email is not exist!" });
  }

  try {
    await User.updateOne(
      { email: email },
      { $set: { verificationToken: verificationToken } }
    );
  } catch (error) {
    console.error("Error saving verificationToken to database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  const mailOptions = {
    from: "Zen Class Corporation stellaron758@gmail.com",
    to: email,
    subject: "[Reset Password]",
    html: `Your reset password link is: <a href="${verificationLink}">Reset your password</a>`,
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
export {
  getAllClasses,
  createClass,
  deleteClassbyID,
  editClass,
  getClassByID,
  addStudent,
  addTeacher,
  getClassMembers,
};
