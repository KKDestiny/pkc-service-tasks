/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../controllers/migration.admin.controller";

const router = express.Router({ mergeParams: true });

router.post("/app-to-server", controller.appToServer);

export default router;
