/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";

export const schema = new Schema(
  {
    // 基本信息
    _id_in_app: { type: String, description: "存储在app的id", required: false },
    taskname: { type: String, description: "任务名称", required: true },
    intro: { type: String, description: "任务说明", required: false },
    conclusion: { type: String, description: "任务结论", required: false },
    status: {
      type: String,
      description: "任务状态",
      required: true,
      enum: [
        "open", // 进行中
        "closed", // 已关闭
        "suspend", // 挂起
        "aborted", // 废弃
      ],
    },
    isSettop: {
      type: String,
      description: "置顶时间戳",
      required: false,
    },
    frequency: {
      type: String,
      description: "任务频率",
      required: true,
      enum: [
        "once", // 一次性
        "daily", // 每日计划
        "weekly", // 每周计划
        "monthly", // 每月计划
        "annually", // 每年计划
        "none", // 长远计划
        "temp", // 临时任务
      ],
    },
    day: {
      type: Number,
      description: "weekly/monthly/annually时，表示第day日",
      required: false,
    },

    // 时间要求
    startDate: {
      type: String,
      description: "开始日期",
      required: false,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    deadline: {
      type: String,
      description: "最迟结束日期",
      required: false,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    realEndDate: {
      type: String,
      description: "实际结束日期",
      required: false,
      format: "YYYY-MM-DD HH:mm:ss",
    },
    progress: {
      type: Number,
      description: "当前进度",
      required: false,
    },
    hours: {
      type: Number,
      description: "计划耗时",
      required: false,
    },
    hoursLog: {
      type: [
        {
          _id: { type: String, description: "id" },
          date: { type: String, description: "日期", format: "datetime" },
          hours: { type: Number, description: "耗时" },
          intro: { type: String, description: "说明" },
          progress: { type: Number, description: "本次耗时到达的进度" },
        },
      ],
      description: "耗时记录",
      required: false,
    },

    // 关联
    parentId: { type: Schema.Types.ObjectId, description: "父级任务", required: false },
    projectId: { type: Schema.Types.ObjectId, description: "绑定项目", required: false },
    articleId: { type: String, description: "绑定文章", required: false },

    // 导入
    source: {
      type: String,
      description: "来源",
      required: false,
      enum: ["github"],
    },
    originalIssue: {
      type: String,
      description: "原始issue信息",
      required: false,
    },
    userId: { type: Schema.Types.ObjectId, description: "所有者ID", required: false },
  },
  {
    timestamps: true,
    versionKey: false,
    minimize: false,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);
schema.method({});

const taskModel = mongoose.model("task", schema);

export default taskModel;
