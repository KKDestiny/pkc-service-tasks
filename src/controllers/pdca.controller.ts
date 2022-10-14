/*
 * @Date: 2022-10-12 22:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { PDCAType } from "../interfaces/pdca.interface";
import { IRequest } from "src/interfaces/comm.interface";

import pdcaRepo from "../repositories/pdca.repository";
import APIError from "../utils/apierror.util";

async function list(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const { status } = req.query;
    const criteria = { userId: _id };
    if (status) {
      Object.assign(criteria, { status });
    }

    const result: Array<PDCAType> = await pdcaRepo.list({ criteria });
    if (!result) {
      throw new APIError("list pdca failed", 400);
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

    const result: PDCAType = await pdcaRepo.create(data);
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
};
