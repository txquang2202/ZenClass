import Notification from "../models/notifications.js";
import User from "../models/user.js";
import Class from "../models/classes.js";

const getAllNotifications = async (req, res) => {
  const userID = req.params.id;
  try {
    const notifications = await User.findOne(
      { _id: userID },
      "notifications"
    ).populate({
      path: "notifications",
      select: "fullname content avt date link",
    });

    res.json({ notifications: notifications.notifications });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching");
  }
};

const addNotification = async (req, res) => {
  try {
    const classID = req.params.id;
    const { content, avt, date, link, userID } = req.body;
    const teacher = await User.findOne({ userID: userID });
    const newNoti = new Notification({
      fullname: teacher.fullname,
      content: content,
      avt: avt,
      date: date,
      link: link,
    });
    await newNoti.save();
    console.log(req.body);

    console.log(teacher.fullname);

    const classNoti = await Class.findById(classID).populate("students");
    const students = classNoti.students;

    for (const student of students) {
      const newStudentNoti = new Notification({
        fullname: student.fullname,
        content: content,
        avt: avt,
        date: date,
        link: link,
      });

      await newStudentNoti.save();

      student.notifications.push(newStudentNoti._id);
      await student.save();
    }

    classNoti.notifications.push(newNoti._id);
    await classNoti.save();

    res.json({
      message: "Create notification successfully!!",
      class: newNoti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

const deleteNotiByID = async (req, res) => {};

export { getAllNotifications, addNotification, deleteNotiByID };
