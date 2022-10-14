/*
 * @Date: 2022-10-12 22:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { TaskType } from "../interfaces/task.interface";
import { IRequest } from "src/interfaces/comm.interface";

import taskRepo from "../repositories/task.repository";
import APIError from "../utils/apierror.util";

async function list(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const criteria = { userId: _id, ...(req.query || {}) };

    const result: Array<TaskType> = await taskRepo.list({ criteria });
    if (!result) {
      throw new APIError("list tasks failed", 400);
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function create(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const data = { userId: _id, ...(req.body || {}) };

    const result: TaskType = await taskRepo.create(data);
    if (!result) {
      throw new APIError("create tasks failed", 400);
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  list,
  create,
};
