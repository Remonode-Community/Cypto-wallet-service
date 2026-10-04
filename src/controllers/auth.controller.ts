import { registerUser } from "../services/auth.service.js";
import type { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
};
