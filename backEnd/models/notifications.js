import mongoose from "mongoose";
const { Schema } = mongoose;

const notificationsSchema = new mongoose.Schema({
  username: String,
  content: String,
  avt: String,
  date: Date,
});

const Notification = mongoose.model("notifications", notificationsSchema);

export default Notification;
