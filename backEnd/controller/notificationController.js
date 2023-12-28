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

const deleteNotiByID = async (req, res) => {
  try {
    const notiID = req.params.id;

    // Tìm người dùng có thông báo cần xóa
    const userWithNoti = await User.findOne({ notifications: notiID });

    if (!userWithNoti) {
      return res.status(404).json({ message: "Notification not found!" });
    }

    // Lọc bỏ thông báo cần xóa khỏi danh sách thông báo của người dùng
    userWithNoti.notifications = userWithNoti.notifications.filter(
      (id) => id.toString() !== notiID
    );

    // Lưu lại thông tin của người dùng sau khi xóa thông báo
    await userWithNoti.save();

    // Xóa thông báo từ cơ sở dữ liệu
    await Notification.findByIdAndDelete(notiID);

    res.json({ message: "Notification deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting notification");
  }
};

export { getAllNotifications, addNotification, deleteNotiByID };
