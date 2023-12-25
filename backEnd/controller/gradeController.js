import Class from "../models/classes.js";
import User from "../models/user.js";
import Grade from "../models/grades.js";
import GradeStruct from "../models/gradestructs.js";

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
    //console.log(gradestructs.gradestructs);

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
    //them vao bang grade
    const classGrade = await Class.findOne({ _id: classID }, "grades");
    const newStructGrade = {
      topic: newStruct.topic,
      ratio: newStruct.ratio,
    };
    for (const gradeID of classGrade.grades) {
      const newGrade = await Grade.findOne({ _id: gradeID });

      if (
        newGrade &&
        !newGrade.grades.some((grade) => grade.topic === newStructGrade.topic)
      ) {
        newGrade.grades.push(newStructGrade);
        await newGrade.save();
      }
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

    const classWithStruct = await Class.findOne({ gradestructs: structID });

    if (!classWithStruct) {
      return res.status(404).json({ message: "Structs not found!" });
    }

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
    const topicToBeUpdated = updatedStruct.topic;
    const ratioToBeUpdated = updatedStruct.ratio;
    updatedStruct.topic = topic;
    updatedStruct.ratio = ratio;
    await updatedStruct.save();

    //sua bang grade
    const classGrade = await Class.findOne(
      { gradestructs: structID },
      "grades"
    );
    // console.log(classGrade.grades);
    const updatingValue = {
      topic: topic,
      ratio: ratio,
    };
    for (const gradeID of classGrade.grades) {
      const updateGrade = await Grade.findOne({ _id: gradeID });
      if (updateGrade) {
        const index = updateGrade.grades.findIndex(
          (item) => item.topic === topicToBeUpdated
        );
        if (index !== -1) {
          updateGrade.grades[index].topic = updatingValue.topic;
          updateGrade.grades[index].ratio = updatingValue.ratio;

          await updateGrade.save();
        }
      }
    }

    res.json({ message: "Grade struct updated successfully", updatedStruct });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating struct");
  }
};
const getAllGradeByClass = async (req, res) => {
  const classID = req.params.id;
  try {
    const grades = await Class.findOne({ _id: classID }, "grades").populate({
      path: "grades",
      select: "studentId fullName grades",
    });
    res.json({ grades: grades.grades });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching");
  }
};
const editClassGrade = async (req, res) => {
  try {
    const classID = req.params.id;
    const { studentID, newScore } = req.body;
    const classroom = await Class.findById(classID);
    if (!classroom) {
      return res.status(404).json({ message: "Class not found!" });
    }
    const updatedGrade = await Grade.findOne({
      studentId: studentID,
      _id: { $in: classroom.grades },
    });
    if (!updatedGrade) {
      return res.status(404).json({ message: "Grade not found!" });
    }
    updatedGrade.grades.forEach((score, index) => {
      score.score = newScore[index];
    });
    await updatedGrade.save();
    res.json({ message: "Grade updated successfully", updatedGrade });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating grade");
  }
};
export {
  deleteGradeStruct,
  editGradeStruct,
  addGradeStruct,
  getAllGradeStructs,
  getAllGradeByClass,
  editClassGrade,
};
