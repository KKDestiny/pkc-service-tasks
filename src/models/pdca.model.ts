/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";

export const schema = new Schema(
  {
    _id_in_app: { type: String, description: "存储在app的id", required: false },
    // 基本信息
    startDate: {
      type: String,
      description: "PDCA开始日期; 日计划则为当日",
      required: true,
      format: "YYYY-MM-DD",
    },
    intro: { type: String, description: "任务说明", required: false },
    tasks: {
      type: [
        {
          taskId: { type: Schema.Types.ObjectId, description: "任务id" },
          taskname: {
            type: String,
            description: "任务名称(加入PDCA时的名称，仅在任务删除后可使用此字段)",
          },
        },
      ],
      description: "任务id清单",
    },
    check: { type: String, description: "检查", required: false },
    act: { type: String, description: "总结", required: false },
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

const pdcaModel = mongoose.model("pdca", schema);

export default pdcaModel;
