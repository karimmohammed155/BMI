import { compareSync, hashSync } from "bcryptjs";
import { user } from "../../../DB/models/user.js";
import { Error_handler_class } from "../../utils/error-class.utils.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  const is_email_exists = await user.findOne({ email: email });
  if (is_email_exists) {
    return next(
      new Error_handler_class("Email is already exists", 400, "Sign up api")
    );
  }
  const hashed_password = hashSync(password, +process.env.SALT_ROUNDS);
  const new_user = await user.create({
    username,
    email,
    password: hashed_password,
  });
  res.status(201).json({ message: "User created successfully", new_user });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const is_user_exists = await user.findOne({ email: email });
  if (!is_user_exists) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const valid_password = compareSync(password, is_user_exists.password);
  if (!valid_password) {
    return next(
      new Error_handler_class("invalid credentials", 400, "login api")
    );
  }
  const token = jwt.sign(
    { user_id: is_user_exists._id },
    process.env.SIGNATURE,
    { expiresIn: "30d" }
  );
  res
    .status(200)
    .json({ message: "User logged in successfully", token: token });
};
