import Class from "../models/class.js";

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found!" });
    }

    res.json({ classes }); //
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching users");
  }
};
const createClass = async (req, res) => {
  try {
    const { title, teacher, className } = req.body;

    const newClass = new Class({
      title: title,
      teacher: teacher,
      className: className,
    });

    const existTitle = await Class.findOne({ title });

    if (!title) {
      return res.status(400).json({ message: "Title is empty!" });
    }
    if (!className) {
      return res.status(400).json({ message: "Class name is empty!" });
    }
    if (existTitle) {
      return res.status(400).json({ message: "Class title already taken!" });
    }

    await newClass.save();

    res.json({
      message: "Create class successfully!!",
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

export { getAllClasses, createClass, deleteClassbyID, editClass, getClassByID };
