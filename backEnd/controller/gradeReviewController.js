import Class from "../models/classes.js";
import User from "../models/user.js";
import gradesReview from "../models/gradesReview.js";
import Comment from "../models/comments.js";

const getAllGradeReviews = async (req, res) => {
  const classID = req.params.id;
  try {
    const gradereviews = await Class.findOne(
      { _id: classID },
      "gradereviews"
    ).populate({
      path: "gradereviews",
      select:
        "avt fullname userID date typeGrade currentGrade expectationGrade explaination",
    });
    // const gradeReviews = await Class.findOne({ _id: classID }, "gradereviews");
    res.json({ gradereviews: gradereviews?.gradereviews });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching");
  }
};

const addGradeReviewByID = async (req, res) => {
  try {
    const classID = req.params.id;
    const {
      avt,
      fullname,
      userID,
      date,
      typeGrade,
      currentGrade,
      expectationGrade,
      explaination,
    } = req.body;

    if (!typeGrade) {
      return res.status(400).json({ message: "Type grade is empty!" });
    }
    if (!currentGrade) {
      return res.status(400).json({ message: "Current grade is empty!" });
    }
    if (!expectationGrade) {
      return res.status(400).json({ message: "Expectation grade is empty!" });
    }
    if (!explaination) {
      return res.status(400).json({ message: "Explaination is empty!" });
    }

    const newGR = new gradesReview({
      avt: avt,
      fullname: fullname,
      userID: userID,
      date: date,
      typeGrade: typeGrade,
      currentGrade: currentGrade,
      expectationGrade: expectationGrade,
      explaination: explaination,
    });
    await newGR.save();
    const classGR = await Class.findById(classID);

    if (!classGR.gradereviews?.includes(newGR._id)) {
      classGR.gradereviews?.push(newGR._id);
      await classGR.save();
    }
    res.json({
      message: "Create grade review successfully!!",
      gradeReview: newGR,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
};

const deleteReviewByID = async (req, res) => {
  try {
    const reviewID = req.params.id;
    const reviewCMT = await gradesReview.findById(reviewID);

    const classWithReview = await Class.findOne({ gradereviews: reviewID });

    if (!classWithReview) {
      return res.status(404).json({ message: "Review not found!" });
    }

    await Comment.deleteMany({ _id: { $in: reviewCMT.comments } });

    // Cập nhật và lưu classWithReview
    classWithReview.gradereviews = classWithReview.gradereviews.filter(
      (id) => id.toString() !== reviewID
    );
    await classWithReview.save();

    await gradesReview.findByIdAndDelete(reviewID);

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting review");
  }
};

export { getAllGradeReviews, addGradeReviewByID, deleteReviewByID };
