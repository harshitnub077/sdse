import orderModel from "../models/orderModel.js";
import { BaseService } from "./baseService.js";
import type { Response } from "express";

/**
 * @class OrderService
 * Handles order-related business logic.
 */
export class OrderService extends BaseService {
  
  getIdentifier(): string {
    return "ORDER_SERVICE_V1";
  }

  /**
   * Fetches all orders (admin logic).
   */
  public async listAllOrders(res: Response) {
    try {
      const orders = await orderModel.find({});
      return this.sendSuccess(res, "Order List Fetched", { data: orders });
    } catch (error) {
      return this.sendError(res, "Error fetching orders");
    }
  }

  /**
   * Fetches orders for a specific user.
   */
  public async listUserOrders(userId: string, res: Response) {
    try {
      const orders = await orderModel.find({ userId });
      return this.sendSuccess(res, "User Orders Fetched", { data: orders });
    } catch (error) {
      return this.sendError(res, "Error fetching user orders");
    }
  }

  /**
   * Updates order status.
   */
  public async updateStatus(orderId: string, status: string, res: Response) {
    try {
      await orderModel.findByIdAndUpdate(orderId, { status });
      return this.sendSuccess(res, "Status Updated Successfully");
    } catch (error) {
      return this.sendError(res, "Error updating status");
    }
  }
}
