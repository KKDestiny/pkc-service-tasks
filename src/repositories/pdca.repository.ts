/*
 * @Date: 2020-06-09 15:24:12
 * @LastEditors: linxiaozhou.com
 * @Description: Description
 */
import { BaseRepository } from "./base.repository";
import pdcaModel from "../models/pdca.model";

import { PDCAType } from "../interfaces/pdca.interface";

class Repository extends BaseRepository<PDCAType> {}

export default new Repository(pdcaModel);
