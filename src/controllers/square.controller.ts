/*
 * @Date: 2022-10-12 22:19:59
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { NextFunction, Response } from "express";

import { ProjectType } from "../interfaces/project.interface";
import { IRequest } from "src/interfaces/comm.interface";

import projectRepo from "../repositories/project.repository";
import taskRepo from "../repositories/task.repository";

import APIError from "../utils/apierror.util";

async function getBasics(req: IRequest, res: Response, next: NextFunction) {
  try {
    const { projectStatus, taskStatus } = req.query;

    // 获取公开项目列表
    const projectCriteria = { isPublic: true, status: "open" };
    if (projectStatus) {
      if (projectStatus === "all") {
        delete projectCriteria.status;
      } else {
        Object.assign(projectCriteria, { status: projectStatus });
      }
    }
    const projects: Array<ProjectType> = await projectRepo.list({ criteria: projectCriteria });
    if (!projects) {
      throw new APIError("list project failed", 400);
    }

    // 获取公开项目的任务列表
    const projectIdList = projects.reduce((temp, project) => {
      temp.push(project._id);
      return temp;
    }, []);
    const taskCriteria = { projectId: projectIdList, status: "open" };
    if (taskStatus) {
      if (taskStatus === "all") {
        delete taskCriteria.status;
      } else {
        Object.assign(taskCriteria, { status: taskStatus });
      }
    }
    const tasks = projectIdList.length > 0 ? await taskRepo.list({ criteria: taskCriteria }) : [];

    return res.status(200).json({
      data: {
        projects,
        tasks,
      },
    });
  } catch (error) {
    return next(error);
  }
}

export default {
  getBasics,
};
