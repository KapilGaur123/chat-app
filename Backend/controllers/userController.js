import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js"; // Correct name
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  try {
    let { fullname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(404).json({
        error: "password is not match",
      });
    }

    const user = await Users.findOne({ email });
    if (user) {
      return res.status(405).json({ message: "user exist already" });
    }

    const salt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, salt);

    const createdUser = await Users.create({
      fullname,
      email,
      password: hassPassword,
    });

    const token = generateToken(createdUser);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(202).json({
      message: "User created successfully",
      createdUser: {
        id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(503).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    const user = await Users.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!user || !isMatch) {
      return res.status(409).json({ message: "Invalid user credential" });
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(202).json({
      message: "user Logged-IN successfully",
      user: {
        fullname: user.fullname,
        email: user.email,
        id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(506).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(201).json({ message: "user logged out sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(506).json({ message: "Internal server error" });
  }
};

export const AllUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filterUsers = await Users.find({_id: {$ne: loggedInUser}}).select("-password")

    res.status(202).json(filterUsers)

  } catch (error) {
    console.log(error);
    res.status(506).json({ message: "Internal server error { Allusers }" });
  }
};
