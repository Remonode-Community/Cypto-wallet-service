import bcrypt from "bcrypt";
import User from "../models/User.js";

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = bcrypt.hash(password, 10);
};
