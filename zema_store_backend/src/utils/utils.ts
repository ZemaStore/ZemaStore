import { isNil } from "lodash";
import { Response } from "express";
import ExceptionResponse from "../models/responses/exception-response.model";

export default class Utils {
  private static _INSTANCE: Utils | null = null;

  public static get instance(): Utils {
    if (!this._INSTANCE) {
      this._INSTANCE = new Utils();
    }
    return this._INSTANCE;
  }

  public handleResponseException(
    res: Response,
    error: any,
    transaction: any = null
  ) {
    if (!isNil(transaction)) {
      transaction.rollback();
    }

    let statusCode = 500;

    if (error.isCustom === true) {
      statusCode = error.statusCode;
    }

    res
      .status(statusCode)
      .send(new ExceptionResponse((error as Error).message));
  }
}
