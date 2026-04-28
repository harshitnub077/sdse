import fs from "fs";
import userModel from "../models/userModel.js";
import { FoodService } from "../services/foodService.js";
import type { Response } from "express";
import type { MulterRequest } from "../types.js";

const foodService = new FoodService();

// add food items
const addFood = async (req: MulterRequest, res: Response) => {
  const image_filename = req.file?.filename ?? "";
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      return foodService.addFood(
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.category,
        image_filename,
        res
      );
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all foods
const listFood = async (_req: unknown, res: Response) => {
  return foodService.listAllFood(res);
};

// remove food item
const removeFood = async (
  req: any,
  res: Response
) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      // We should ideally move file unlinking to the service too, but for now keeping it simple.
      // But let's try to be consistent.
      return foodService.removeFood(req.body.id, res);
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
