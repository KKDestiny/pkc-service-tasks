/*
 * @Author: linxiaozhou.com
 * @LastEditors: linxiaozhou.com
 * @Description: file content
 */
const tags = ["x. 数据迁移"];
const produces = ["application/json"];
const consumes = ["application/json"];

export default {
  paths: {
    "/admins/migrations/app-to-server": {
      post: {
        tags,
        summary: "把app数据迁移到服务器的MongoDB",
        produces,
        consumes,
        parameters: [
          {
            name: "body",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                projects: {
                  type: "array",
                  required: true,
                  description: "项目列表",
                  items: {
                    type: "object",
                    $ref: `#/definitions/Projects`,
                  },
                },
                tasks: {
                  type: "array",
                  required: true,
                  description: "任务列表",
                  items: {
                    type: "object",
                    $ref: `#/definitions/Tasks`,
                  },
                },
                pdcas: {
                  type: "array",
                  required: true,
                  description: "PDCA列表",
                  items: {
                    type: "object",
                    $ref: `#/definitions/PDCAs`,
                  },
                },
              },
            },
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
