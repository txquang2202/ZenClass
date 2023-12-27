import Notification from "../models/notifications.js";
import User from "../models/user.js";
import Class from "../models/classes.js";

const getAllNotifications = async (req, res) => {
  const classID = req.params.id;
  try {
    const notifications = await Class.findOne(
      { _id: classID },
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
    const classNoti = await Class.findById(classID);
    // console.log(classNoti);
    if (!classNoti.notifications?.includes(newNoti._id)) {
      classNoti.notifications?.push(newNoti._id);
      await classNoti.save();
    }
    res.json({
      message: "Create notification successfully!!",
      class: newNoti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { getAllNotifications, addNotification };
