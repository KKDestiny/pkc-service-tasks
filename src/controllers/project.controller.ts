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
    const result: Array<ProjectType> = await projectRepo.list();
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

export default {
  list,
};
