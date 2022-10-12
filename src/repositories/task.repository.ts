/*
 * @Date: 2020-06-09 15:24:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import taskModel from "../models/task.model";

import { TaskType } from "../interfaces/task.interface";

class Repository extends BaseRepository<TaskType> {}

export default new Repository(taskModel);
