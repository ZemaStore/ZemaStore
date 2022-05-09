import { Request, Response, NextFunction } from "express";

import Role from "../models/mongoose/role";

export const addRole = async (req: Request, res: Response) => {
  const { name } = req.body.name;
  if (name === null) {
    return res
      .status(400)
      .json({ success: false, message: "Please, add role name." });
  }

  try {
    const role = await Role.create({
      name,
    });

    return res.status(201).json({
      success: true,
      message: "Role created successfully.",
      data: role,
    });
  } catch (e) {
    return res
      .status(400)
      .json({ success: false, message: (e as Error).message });
  }
};

export const getRoles = async (req: Request, res: Response) => {}
