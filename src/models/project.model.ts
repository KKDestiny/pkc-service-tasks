/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";

export const schema = new Schema(
  {
    projectname: { type: String, description: "项目名称", required: true },
    intro: { type: String, description: "项目说明", required: true },
    group: {
      type: String,
      description: "分组",
      required: false,
      enum: ["work", "personal"],
    },
    status: {
      type: String,
      description: "项目状态",
      required: true,
      enum: [
        "open", // 进行中
        "closed", // 已关闭
        "suspend", // 挂起
        "aborted", // 废弃
      ],
    },
    parentId: { type: String, description: "父级项目", required: false },
    bookId: { type: String, description: "Wiki书籍id", required: false },
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

const projectModel = mongoose.model("project", schema);

export default projectModel;
