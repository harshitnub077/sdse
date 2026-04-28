import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { BaseService } from "./baseService.js";
import type { Response } from "express";

/**
 * @class AuthService
 * Demonstrates Inheritance (extends BaseService).
 * Demonstrates Encapsulation (hides user authentication logic).
 */
export class AuthService extends BaseService {
  private readonly secret: string;

  constructor() {
    super();
    this.secret = process.env.JWT_SECRET || "";
  }

  /**
   * Overriding abstract method from BaseService.
   * Demonstrates inheritance and implementation of abstract contracts.
   */
  getIdentifier(): string {
    return "AUTH_SERVICE_V1";
  }

  /**
   * Internal helper to create tokens.
   * Demonstrates Encapsulation (internal logic).
   */
  private generateToken(id: string): string {
    return jwt.sign({ id }, this.secret);
  }

  /**
   * Method to handle user login.
   */
  public async login(email: string, password: string, res: Response) {
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return this.sendError(res, "User Doesn't exist", 404);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return this.sendError(res, "Invalid Credentials", 401);
      }

      const token = this.generateToken(user._id);
      return this.sendSuccess(res, "Login Successful", { token, role: user.role });
    } catch (error) {
      return this.sendError(res, "Login failed within AuthService");
    }
  }

  /**
   * Method to handle user registration.
   */
  public async register(name: string, email: string, password: string, res: Response) {
    try {
      const exists = await userModel.findOne({ email });
      if (exists) {
        return this.sendError(res, "User already exists", 400);
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
        name,
        email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      const token = this.generateToken(user._id);
      return this.sendSuccess(res, "Registration Successful", { token, role: user.role });
    } catch (error) {
      return this.sendError(res, "Registration failed within AuthService");
    }
  }
}
