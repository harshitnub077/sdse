import { AuthService } from "../services/authService.js";
import validator from "validator";
import type { Request, Response } from "express";

const authService = new AuthService();

// login user
const loginUser = async (
  req: Request<unknown, unknown, { email?: string; password?: string }>,
  res: Response
) => {
  const email = req.body.email ?? "";
  const password = req.body.password ?? "";
  return authService.login(email, password, res);
};

// register user
const registerUser = async (
  req: Request<unknown, unknown, { name?: string; email?: string; password?: string }>,
  res: Response
) => {
  const name = req.body.name ?? "";
  const email = req.body.email ?? "";
  const password = req.body.password ?? "";

  // validating email format and strong password
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please enter valid email" });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Please enter strong password",
    });
  }

  return authService.register(name, email, password, res);
};

export { loginUser, registerUser };
