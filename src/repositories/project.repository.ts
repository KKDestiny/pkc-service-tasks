/*
 * @Date: 2020-06-09 15:24:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import projectModel from "../models/project.model";
import { ProjectType } from "../interfaces/project.interface";

class Repository extends BaseRepository<ProjectType> {}

export default new Repository(projectModel);
