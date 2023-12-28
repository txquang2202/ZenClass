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
    //const findStudentToAdd
    const newNoti = new Notification({
      fullname: teacher.fullname,
      content: content,
      avt: avt,
      date: date,
      link: `/home/classes/detail/grade-board/${link}`,
    });
    await newNoti.save();

    const classNoti = await Class.findById(classID);
    for (const studentID of classNoti.students) {
      const student = await User.findOne({ _id: studentID });
      student.notifications.push(newNoti._id);
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

const deleteNotiByID = async (req, res) => {
  try {
    const notiID = req.params.id;

    const userWithNoti = await User.findOne({ notifications: notiID });

    if (!userWithNoti) {
      return res.status(404).json({ message: "Notification not found!" });
    }

    userWithNoti.notifications = userWithNoti.notifications.filter(
      (id) => id.toString() !== notiID
    );

    await userWithNoti.save();

    await Notification.findByIdAndDelete(notiID);

    res.json({ message: "Notification deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting notification");
  }
};

const deleteAllNoti = async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await User.findOne({ userID: userID });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.notifications = [];
    await user.save();

    res.json({ message: "Notifications deleted succesfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting notifications");
  }
};

export { getAllNotifications, addNotification, deleteNotiByID, deleteAllNoti };
