/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
const tags = ["4. 广场"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/square": {
      get: {
        tags,
        summary: "获取广场数据",
        produces,
        consumes,
        parameters: [
          {
            in: "query",
            name: "projectStatus",
            example: "open",
            requied: false,
            enum: ["all", "open", "closed", "aborted", "suspend"],
            description: "项目状态; 不传入则默认给出open的项目",
          },
          {
            in: "query",
            name: "taskStatus",
            example: "open",
            requied: false,
            enum: ["all", "open", "closed", "aborted"],
            description: "任务状态; 不传入则默认给出open的任务",
          },
        ],
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
