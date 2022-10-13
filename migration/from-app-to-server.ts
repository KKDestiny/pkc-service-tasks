/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 把app数据迁移到服务器的MongoDB
 */
import fs from "fs-extra";

import createDatabase from "../src/helpers/mongo";
import projectRepo from "../src/repositories/project.repository";
import taskRepo from "../src/repositories/task.repository";
import pdcaRepo from "../src/repositories/pdca.repository";

createDatabase();

async function run() {
  const projects = await fs.readJSON(`${__dirname}/sources/LIN_PROJECTS.sqlite.json`);
  const tasks = await fs.readJSON(`${__dirname}/sources/LIN_TASKS.sqlite.json`);
  const pdcas = await fs.readJSON(`${__dirname}/sources/LIN_PDCAS.sqlite.json`);
  // console.log(projects, tasks, pdcas);

  // 处理项目
  for (let index = 0; index < projects.length; index++) {
    projects[index]._id_in_app = projects[index]._id;
    delete projects[index]._id;

    if (projects[index].group !== "personal") {
      projects[index].group = "work";
    }
    projects[index].status = "open";
  }
  const projectRes = await projectRepo.insertMany(projects);
  console.log(projectRes);

  // 处理任务
  for (let index = 0; index < tasks.length; index++) {
    tasks[index]._id_in_app = tasks[index]._id;
    delete tasks[index]._id;

    if (tasks[index].projectId) {
      const project = projectRes.find(e => e._id_in_app === tasks[index].projectId);
      if (project) {
        tasks[index].projectId = project._id;
      }
    }
  }
  const taskRes = await taskRepo.insertMany(tasks);
  console.log(taskRes);

  // 处理PDCA
  for (let index = 0; index < pdcas.length; index++) {
    pdcas[index]._id_in_app = pdcas[index]._id;
    delete pdcas[index]._id;

    if (pdcas[index].tasks && Array.isArray(pdcas[index].tasks)) {
      const tasks = [];
      for (let i = 0; i < pdcas[index].tasks.length; i++) {
        const task = taskRes.find(e => e._id_in_app === pdcas[index].tasks[i].taskId);
        if (task) {
          pdcas[index].tasks[i].taskId = task._id;
          tasks.push(pdcas[index].tasks[i]);
        }
      }
      pdcas[index].tasks = tasks;
    }
  }
  const pdcaRes = await pdcaRepo.insertMany(pdcas);
  console.log(pdcaRes);
}

async function exec() {
  console.log(`===================== Begin Migration from app to server =====================`);
  await run();
  console.log(`====================== End Migration from app to server ======================\n\n`);
}
exec();
