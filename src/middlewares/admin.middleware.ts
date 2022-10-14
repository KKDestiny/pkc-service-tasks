/*
 * @Date: 2021-06-01 23:23:09
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import APIError from "../utils/apierror.util";

export default async function (req, res, next) {
  try {
    if (req.user.isAdmin) return next();

    throw new APIError("没有权限", 401);
  } catch (err) {
    res.status(err.status).json({ errors: { message: err.message } });
  }
}
