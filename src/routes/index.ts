/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import auth from "../middlewares/auth.middleware";

import projectRoute from "./project.route";
import taskRoute from "./task.route";
import pdcaRoute from "./pdca.route";

const router = express.Router({ mergeParams: true });

router.use(auth);
router.use("/projects", projectRoute);
router.use("/tasks", taskRoute);
router.use("/pdcas", pdcaRoute);

export default router;
