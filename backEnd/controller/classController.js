import Class from "../models/class.js";

const getAllClasses = async (req, res) => {
  try {
    console.log(req.cookies);
    const classes = await Class.find();

    if (!classes || classes.length === 0) {
      return res.status(404).json({ message: "No classes found!" });
    }

    res.json({ classes });
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

export { getAllClasses, createClass, deleteClassbyID };
