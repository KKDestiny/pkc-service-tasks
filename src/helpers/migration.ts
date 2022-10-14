import projectRepo from "../repositories/project.repository";
import taskRepo from "../repositories/task.repository";
import pdcaRepo from "../repositories/pdca.repository";

export async function migrationFromAPPToServer({ userId, projects, tasks, pdcas }) {
  // 处理项目
  for (let index = 0; index < projects.length; index++) {
    projects[index]._id_in_app = projects[index]._id;
    delete projects[index]._id;

    if (projects[index].group !== "personal") {
      projects[index].group = "work";
    }
    projects[index].status = "open";
    projects[index].userId = userId;
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
    tasks[index].userId = userId;
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
    pdcas[index].userId = userId;
  }
  const pdcaRes = await pdcaRepo.insertMany(pdcas);
  console.log(pdcaRes);

  return { projectRes, taskRes, pdcaRes };
}
