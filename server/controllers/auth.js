import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username: username });
    const isEmail = await User.findOne({ email: email });
    if (user) {
      return res.status(409).json({ message: "User already registered" });
    }
    if (isEmail) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: username,
      email: email,
      password: passwordHash,
    });
    return res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    return res.status(500).json({ message: "internal error" + err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user)
      return res.status(401).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid username or password" });

    const token = jwt.sign({ user: user._id }, process.env.JWTSECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,

      maxAge: 15000000,
    });

    return res.status(200).json({ message: "login successful " + token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { captchaValue } = req.body;
    // console.log(req.body);
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTHCA_SERVER}&response=${captchaValue}`
    );
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
