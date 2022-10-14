/*
 * @Date: 2022-10-12 22:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { IRequest } from "src/interfaces/comm.interface";
import { migrationFromAPPToServer } from "../helpers/migration";

async function appToServer(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { _id } = req.user;
    const { projects, tasks, pdcas } = req.body;

    const result = await migrationFromAPPToServer({ userId: _id, projects, tasks, pdcas });

    return res.status(200).json({
      data: result,
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  appToServer,
};
