/*
 * @Date: 2022-10-12 22:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { ProjectType } from "../interfaces/project.interface";
import { IRequest } from "src/interfaces/comm.interface";

import projectRepo from "../repositories/project.repository";
import APIError from "../utils/apierror.util";

async function list(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const { status } = req.query;
    const criteria = { userId: _id };
    if (status) {
      Object.assign(criteria, { status });
    }

    const result: Array<ProjectType> = await projectRepo.list({ criteria });
    if (!result) {
      throw new APIError("list project failed", 400);
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

    const result: ProjectType = await projectRepo.create(data);
    if (!result) {
      throw new APIError("create pdca failed", 400);
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const criteria = { userId: _id, ...(req.params || {}) };
    const updates = req.body;

    const result: ProjectType = await projectRepo.findByIdAndUpdate(criteria, updates);
    if (!result) {
      throw new APIError("create pdca failed", 400);
    }

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

async function remove(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const criteria = { userId: _id, ...(req.params || {}) };

    const result: ProjectType = await projectRepo.remove(criteria);
    if (!result) {
      throw new APIError("create pdca failed", 400);
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
  update,
  remove,
};
