/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 把app数据迁移到服务器的MongoDB
 */
import fs from "fs-extra";

import createDatabase from "../src/helpers/mongo";
import { migrationFromAPPToServer } from "../src/helpers/migration";

createDatabase();

const userId = undefined;

async function run() {
  const projects = await fs.readJSON(`${__dirname}/sources/LIN_PROJECTS.sqlite.json`);
  const tasks = await fs.readJSON(`${__dirname}/sources/LIN_TASKS.sqlite.json`);
  const pdcas = await fs.readJSON(`${__dirname}/sources/LIN_PDCAS.sqlite.json`);

  await migrationFromAPPToServer({ userId, projects, tasks, pdcas });
}

async function exec() {
  console.log(`===================== Begin Migration from app to server =====================`);
  await run();
  console.log(`====================== End Migration from app to server ======================\n\n`);
}
exec();
