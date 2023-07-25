/**
 * 创建Observable 从数组，类数组 Promise
 * @param {*} input
 */
import { innerFrom } from "./innerFrom.js";
export function from(input) {
  return innerFrom(input);
}
