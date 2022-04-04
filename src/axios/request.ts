import axios from "./base";
import qs from "qs";

export default class Request{
  /**
   * get方法
   * @param {string} url 路径
   * @param {object} params 参数
   */
  static get = (url: string, params?: object) => {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: params }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
    
  static post = (url: string, params?: object) => {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params)).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }  
}
