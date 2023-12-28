import User from "../models/user.js";
import Comment from "../models/comments.js";
import env from "dotenv";
import bcrypt from "bcryptjs";
import {
  sendEmail,
  verifyEmail,
  generateUniqueToken,
} from "./authController.js";
import { constants } from "crypto";
env.config();

const createUserwithFile = async (req, res) => {
  try {
    const user = req.body;
    const password = "111111";
    const hashedPassword = await bcrypt.hash(password, 10);
    
    
    // Generate a verification token
    const verificationToken = generateUniqueToken();
    console.log(verificationToken);
    const newUser = new User({
      userID : user.userID,
      username: user.username,
      password: hashedPassword,
      email: user.email,
      verificationToken,
      isVerified: true,
      role: 0,
      img: "",
      fullname: user.fullname || "", // You can use user.fullname if it exists, or an empty string otherwise
      birthdate: user.birthdate || "", // Similar for other optional fields
      phone: user.phone || "",
      gender: user.gender || "",
      street: user.street || "",
      city: user.city || "",
    });
    
    const username = newUser.username;
    const email = newUser.email
    const existUsername = await User.findOne({ username });
    const existEmail = await User.findOne({ email });

    if (existUsername) {
      return res.status(400).json({ message: "Username already taken!" });
    }
    if (existEmail) {
      return res.status(400).json({ message: "Email already taken!" });
    }

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Đã xảy ra lỗi.");
  }
};

const changeInforUser = async (req, res) => {
  try {
    const user = req.body;
    const id = parseInt(user.userID);
    const userDB = await User.findOne({ userID: id });

    if (!userDB) {
      return res.status(404).json({ message: "User not found!" });
    }
    userDB.fullname = user.fullname || userDB.fullname;
    userDB.birthdate = user.birthdate || userDB.birthdate;
    userDB.phone = user.phone || userDB.phone;
    userDB.gender = user.gender || userDB.gender;
    userDB.street = user.street || userDB.street;
    userDB.city = user.city || userDB.city;

    await userDB.save();

    res.json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating profile");
  }
};
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user profile");
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: [0] });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching users");
  }
};
const getAllUsersComments = async (req, res) => {
  try {
    const comments = await Comment.find();

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found!" });
    }

    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching users");
  }
};

const deleteUsersbyID = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while fetching user profile");
  }
};

const deleteListUsersByIds = async (req, res) => {
  try {
    const listIdDelete = req.body;

    if (!listIdDelete || listIdDelete.length === 0) {
      return res
        .status(400)
        .json({ message: "No user IDs provided for deletion!" });
    }

    const deletedUsers = await User.deleteMany({ _id: { $in: listIdDelete } });

    if (deletedUsers.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No users found for the provided IDs!" });
    }

    res.json({ message: "Users deleted successfully", deletedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while deleting users");
  }
};

const changeStatusUsers = async (req, res) => {
  try {
    const userIds = req.body;

    if (!userIds || userIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No user IDs provided for blocking!" });
    }

    const result = await User.updateMany({ _id: { $in: userIds } }, [
      {
        $set: {
          status: {
            $cond: {
              if: { $eq: ["$status", "Blocked"] },
              then: "Normal",
              else: "Blocked",
            },
          },
        },
      },
    ]);

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ message: "No users were found or updated" });
    }

    res.json({ message: "Users' status updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(`Error while updating users' status: ${error.message}`);
  }
};

const blockUserbyID = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.status === "Blocked") {
      user.status = "Normal";
    } else {
      user.status = "Blocked";
    }

    await user.save();

    res.json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while updating user status");
  }
};

export {
  createUserwithFile,
  changeInforUser,
  getUserProfile,
  getAllUsers,
  getAllUsersComments,
  sendEmail,
  verifyEmail,
  deleteUsersbyID,
  deleteListUsersByIds,
  blockUserbyID,
  changeStatusUsers,
};
