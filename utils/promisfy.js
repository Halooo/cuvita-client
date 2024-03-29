import { ROOT } from '../config/api.config';
/**
 * 请求参数常量
 */
export const METHOD = {
  GET: 'GET',
  POST: 'POST'
}
/**
 * 封装wx.request()
 * @param directory, Object data, String method
 * @return Promise ? resolve() : reject()
 */
export function request(directory, method='GET', data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: ROOT.concat(directory),
      method,
      data,
      success({ data, statusCode }) {
        if (statusCode === 400 || statusCode === 404 || statusCode === 500)
          reject(statusCode);
        resolve(data);
      },
      fail(e) {
        reject(e);
      }
    });
  });
}
/**
 * 封装wx.login()
 */
export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success({ code }) {
        resolve(code);
      }
    });
  });
}
/**
 * 封装wx.getNetworkType()
 */
export function getNetworkType() {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success({ networkType }) {
        resolve(networkType);
      },
      fail(e) {
        reject(e);
      }
    });
  });
}
/**
 * 封装wx.requestPayment()
 */
export function requestPayment(bundle) {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...bundle,
      success(res) {
        resolve(res);
      },
      fail(e) {
        reject(e);
      }
    });
  });
}