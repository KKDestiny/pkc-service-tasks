/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
import mongoose, { Schema } from "mongoose";

export const schema = new Schema(
  {
    name: {
      type: String,
      description: "用户名",
    },
    email: {
      type: String,
      description: "email",
    },
    password: {
      type: String,
      description: "登录密码",
    },
    isActive: {
      type: Boolean,
      description: "是否激活",
    },
    isAdmin: {
      type: Boolean,
      description: "是否为超级管理员",
    },
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

const Account = mongoose.model("account", schema);

export default Account;
