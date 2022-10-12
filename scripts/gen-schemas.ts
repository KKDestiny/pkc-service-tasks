/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: 导出项目swagger数据
 */
import { run } from "../src/specs/tools/schemas.tool";

import { schema as projectsSchema } from "../src/models/project.model";
import { schema as tasksSchema } from "../src/models/task.model";
import { schema as pdcaSchema } from "../src/models/pdca.model";

const schemas = [
  {
    filename: "projects",
    schemaName: "Projects",
    schema: projectsSchema,
  },
  {
    filename: "tasks",
    schemaName: "Tasks",
    schema: tasksSchema,
  },
  {
    filename: "pdcas",
    schemaName: "PDCAs",
    schema: pdcaSchema,
  },
];

async function exec() {
  console.log(`===================== Begin Generate Schemas =====================`);
  await run(schemas);
  console.log(`====================== End Generate Schemas ======================\n\n`);
}
exec();
