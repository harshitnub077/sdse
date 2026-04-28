import foodModel from "../models/foodModel.js";
import { BaseService } from "./baseService.js";
import type { Response } from "express";

/**
 * @class FoodService
 * Demonstrates Abstraction by separating product management logic from the controller.
 */
export class FoodService extends BaseService {
  
  getIdentifier(): string {
    return "FOOD_SERVICE_V1";
  }

  /**
   * Fetches all food items.
   * Demonstrates Encapsulation of MongoDB queries.
   */
  public async listAllFood(res: Response) {
    try {
      const foods = await foodModel.find({});
      return this.sendSuccess(res, "Food List Fetched", { data: foods });
    } catch (error) {
      return this.sendError(res, "Error fetching food items");
    }
  }

  /**
   * Internal logic for checking stock (Placeholder for Polymorphism demo).
   * Could be overridden in a 'SpecialFoodService'.
   */
  protected validateStock(foodId: string): boolean {
    // Logic to validate stock
    return true; 
  }

  /**
   * Adds a new food item.
   */
  public async addFood(name: string, description: string, price: number, category: string, image: string, res: Response) {
    try {
      const food = new foodModel({
        name,
        description,
        price,
        category,
        image,
      });
      await food.save();
      return this.sendSuccess(res, "Food Added");
    } catch (error) {
      return this.sendError(res, "Error adding food item");
    }
  }

  /**
   * Removes a food item.
   */
  public async removeFood(id: string, res: Response) {
    try {
      await foodModel.findByIdAndDelete(id);
      return this.sendSuccess(res, "Food Removed");
    } catch (error) {
      return this.sendError(res, "Error removing food item");
    }
  }
}
