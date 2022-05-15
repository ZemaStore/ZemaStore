import { isNil } from "lodash";
import { Request, Response } from "express";
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

  public getPaginationData(req: Request) {
    const page: number = isNil(req.query.page)
      ? 0
      : parseInt(req.query.page as string);
    const sortBy: string = req.query.sortBy as string;

    const sort = {};
    if (sortBy) {
      const parts = sortBy.toString().split(":");
      const val = parts[1] === "asc" ? 1 : -1;
      sort[parts[0]] = val;
    } else {
      sort["createdAt"] = -1;
    }

    return { page, sort };
  }
}
