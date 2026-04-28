import type { Response } from "express";

/**
 * @class BaseService
 * Provides common utility methods for all services.
 * Demonstrates Abstraction by providing a base contract.
 */
export abstract class BaseService {
  constructor() {}

  /**
   * Abstract method to get the service identifier.
   */
  abstract getIdentifier(): string;

  /**
   * Sends a success response.
   */
  protected sendSuccess(res: Response, message: string, data: any = {}) {
    return res.json({
      success: true,
      message,
      ...data,
    });
  }

  /**
   * Sends an error response.
   */
  protected sendError(res: Response, message: string, code: number = 400) {
    return res.status(code).json({
      success: false,
      message,
    });
  }
}
