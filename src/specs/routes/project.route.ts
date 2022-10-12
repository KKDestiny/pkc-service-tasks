/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
const tags = ["1. 项目"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/projects": {
      get: {
        tags,
        summary: "获取项目列表",
        produces,
        consumes,
        parameters: [],
        responses: {
          200: {
            description: "成功",
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "object",
                },
              },
            },
          },
          400: {
            description: "失败",
            schema: {
              type: "object",
              properties: {
                errors: {
                  type: "object",
                  properties: {
                    status: {
                      type: "number",
                      example: 400,
                    },
                    message: {
                      type: "string",
                      example: "失败信息",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
