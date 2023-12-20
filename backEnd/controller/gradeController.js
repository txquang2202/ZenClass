import Class from "../models/classes.js";
import User from "../models/user.js";
import GradeStruct from "../models/gradestructs.js";
import transporter from "../middleware/nodemailer.js";
import mongoose from "mongoose";

const getAllGradeStructs = async (req, res) => {
  const classID = req.params.id;
  try {
    const gradestructs = await Class.findOne(
      { _id: classID },
      "gradestructs"
    ).populate({
      path: "gradestructs",
      select: "topic ratio",
    });
    console.log(gradestructs.gradestructs);

    res.json({ gradestructs: gradestructs.gradestructs });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching");
  }
};

const addGradeStruct = async (req, res) => {
  try {
    const classID = req.params.id;
    let { topic, ratio } = req.body;

    if (!topic) {
      topic = "New Topic";
    }
    if (!ratio) {
      ratio = 0;
    }

    const existTopic = await Class.findOne(
      { _id: classID },
      "gradestructs"
    ).populate({ path: "gradestructs", select: "topic" });
    const topicToCheck = topic;

    if (
      existTopic &&
      existTopic.gradestructs.some((item) => item.topic === topicToCheck)
    ) {
      return res.status(400).json({ message: "Topic already taken!" });
    }

    const newStruct = new GradeStruct({
      topic: topic,
      ratio: ratio,
    });
    await newStruct.save();
    const classGD = await Class.findById(classID);

    if (!classGD.gradestructs.includes(newStruct._id)) {
      classGD.gradestructs.push(newStruct._id);
      await classGD.save();
    }
    res.json({
      message: "Create new struct successfully!!",
      gradeStruct: newStruct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
};

const deleteGradeStruct = async (req, res) => {
  try {
    const structID = req.params.id;
    //const homeworkCMT = await Homework.findById(homeworkID);

    const classWithStruct = await Class.findOne({ gradestructs: structID });

    if (!classWithStruct) {
      return res.status(404).json({ message: "Structs not found!" });
    }

    // await Comment.deleteMany({ _id: { $in: homeworkCMT.comments } });

    classWithStruct.gradestructs = classWithStruct.gradestructs.filter(
      (id) => id.toString() !== structID
    );

    await classWithStruct.save();

    await GradeStruct.findByIdAndDelete(structID);

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting struct");
  }
};
const editGradeStruct = async (req, res) => {
  try {
    const { topic, ratio } = req.body;
    const structID = req.params.id;
    const updatedStruct = await GradeStruct.findById(structID);

    if (!updatedStruct) {
      return res.status(404).json({ message: "Grade struct not found!" });
    }

    updatedStruct.topic = topic;
    updatedStruct.ratio = ratio;
    await updatedStruct.save();

    res.json({ message: "Grade struct updated successfully", updatedStruct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating struct");
  }
};

export {
  deleteGradeStruct,
  editGradeStruct,
  addGradeStruct,
  getAllGradeStructs,
};
