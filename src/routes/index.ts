/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";

import auth from "../middlewares/auth.middleware";
import admin from "../middlewares/admin.middleware";

import projectRoute from "./project.route";
import taskRoute from "./task.route";
import pdcaRoute from "./pdca.route";

import migrationAdminRoute from "./migration.admin.route";

const router = express.Router({ mergeParams: true });

router.use(auth);
router.use("/projects", projectRoute);
router.use("/tasks", taskRoute);
router.use("/pdcas", pdcaRoute);

router.use(admin);
router.use("/admins/migrations", migrationAdminRoute);

export default router;
