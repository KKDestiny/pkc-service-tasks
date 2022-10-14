/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import express from "express";
import controller from "../controllers/project.controller";

const router = express.Router({ mergeParams: true });

router.get("/", controller.list);
router.post("/", controller.create);

export default router;
