import User from "../models/user.js";
import env from "dotenv";
import bcrypt from "bcrypt";

env.config();
const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email, fullname, birthdate, phone, gender } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role: 0,
      img: "",
      fullname: "",
      birthdate: "",
      phone: "",
      gender: "",
      street: "",
      city: "",
    });

    const existUsername = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUsername) {
      return res.status(400).json({ message: "Username already taken!" });
    }
    if (existEmail) {
      return res.status(400).json({ message: "Email already taken!" });
    }

    await newUser.save();
    res.json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi.");
  }
};
const editUser = async (req, res) => {
  try {
    const { fullname, birthdate, phone, gender, street, city, img } = req.body;
    const userId = req.params.id;
    console.log(req.body);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    user.fullname = fullname || user.fullname;
    user.birthdate = birthdate || user.birthdate;
    user.phone = phone || user.phone;
    user.gender = gender || user.gender;
    user.street = street || user.street;
    user.city = city || user.city;
    console.log(req.file);
    if (req.file) {
      user.img = req.file.filename;
    }

    await user.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating profile");
  }
};
export { createUser, editUser };
