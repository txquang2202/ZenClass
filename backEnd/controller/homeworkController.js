import Homework from "../models/homeworks.js";
import User from "../models/user.js";
import transporter from "../middleware/nodemailer.js";
import mongoose from "mongoose";
import Class from "../models/classes.js";

const getAllHomework = async (req, res) => {
  const classID = req.params.id;
  try {
    const homeworks = await Class.findOne(
      { _id: classID },
      "homeworks"
    ).populate({
      path: "homeworks",
      select: "title description teacher date",
    });

    res.json({ homeworks: homeworks.homeworks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching");
  }
};

const getHomeworkByID = async (req, res) => {
  try {
    const homeworkID = req.params.id;
    const classWithHomework = await Homework.findOne({ homeworks: homeworkID });

    if (!classWithHomework) {
      return res.status(404).json({ message: "Homework not found!" });
    }

    res.json(classWithHomework);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching homework info");
  }
};

const createHomeworkByID = async (req, res) => {
  try {
    const classID = req.params.id;
    const { title, teacherName, description, date } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is empty!" });
    }
    if (!description) {
      return res.status(400).json({ message: "Class name is empty!" });
    }

    const existTitle = await Homework.findOne({ title });
    if (existTitle) {
      return res.status(400).json({ message: "Homework title already taken!" });
    }
    const teacher = await User.findOne({ fullname: teacherName });
    if (!teacher) {
      return res.status(400).json({ message: "Teacher not found!" });
    }

    const newHW = new Homework({
      title: title,
      teacher: teacherName,
      description: description,
      date: date,
    });
    await newHW.save();
    const classHW = await Class.findById(classID);

    if (!classHW.homeworks.includes(newHW._id)) {
      classHW.homeworks.push(newHW._id);
      await classHW.save();
    }
    res.json({
      message: "Create homeworks successfully!!",
      class: newHW,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
};
const deleteHomeworkByID = async (req, res) => {
  try {
    const homeworkID = req.params.id;

    const classWithHomework = await Class.findOne({ homeworks: homeworkID });

    if (!classWithHomework) {
      return res.status(404).json({ message: "Homework not found!" });
    }
    classWithHomework.homeworks = classWithHomework.homeworks.filter(
      (id) => id.toString() !== homeworkID
    );

    await classWithHomework.save();

    await Homework.findByIdAndDelete(homeworkID);

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting homework");
  }
};
const editHomeworkByID = async (req, res) => {
  try {
    const { title, description } = req.body;
    const homeworkID = req.params.id;
    const updatedHomework = await Homework.findById(homeworkID);

    if (!updatedHomework) {
      return res.status(404).json({ message: "Homework not found!" });
    }

    updatedHomework.title = title;
    updatedHomework.description = description;
    await updatedHomework.save();

    res.json({ message: "Homework updated successfully", updatedHomework });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating updatedHomework");
  }
};

export {
  deleteHomeworkByID,
  editHomeworkByID,
  createHomeworkByID,
  getAllHomework,
  getHomeworkByID,
};
