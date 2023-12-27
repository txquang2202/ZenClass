import Notification from "../models/notifications";
import User from "../models/user.js";
import Class from "../models/classes.js";

const getAllNotification = async (req, res) => {
  const classID = req.parmas.id;
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
    const { fullname, content, avt, date, link, userID } = req.body;
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

    if (!classNoti.notifications.includes(newNoti._id)) {
      classNoti.notifications.push(newNoti._id);
      await classNoti.save();
    }
    res.json({
      message: "Create noti successfully!!",
      class: newNoti,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { getAllNotification, addNotification };
