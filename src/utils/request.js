import axios from 'axios';

import store from '../store/store';
import {
  setLoginStatus
} from '../store/action';
import config from '../config/app.config';

const http = axios.create({
  baseURL: config.rootPath,
  timeout: 3000
});

http.interceptors.request.use((config) => {
  if (config.json === false) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.data = stringifyParams(config.data);
  }
  return config;
});

const defaultError = '操作失败，请稍后再试';

http.interceptors.response.use((res) => {
  let ret = res.data;
  let showErrorMsg = res.config.showErrorMsg === false ? false : true;
  if (ret.code !== undefined) {
    if (ret.code === "0") {
      return Promise.resolve(ret.data);
    } else {
      showErrorMsg && alert(ret.msg || defaultError);
      return Promise.reject(-1);
    }
  } else {
    if (typeof ret == 'string' && ret.indexOf('<!DOCTYPE html>') > -1) {
      //登录失效,防止几个ajax请求同时失败，不断的弹出登录超时的Box
      showExpireBox();
      return Promise.reject();
    }
    return Promise.resolve(ret);
  }
}, (error) => {
  alert(defaultError);
  console.log(error);
  return Promise.reject();
});

export default http;

function showExpireBox() {
  // 更改redux状态
  store.dispatch(setLoginStatus(false));
  // window.location.href = '/login';
}

function stringifyParams(params) {
  let keys = Object.keys(params);
  if (keys.length) {
    let paramArr = keys.filter((key) => {
      return params[key] != null;
    }).map((key) => {
      return key + '=' + params[key];
    });
    return paramArr.join('&');
  }
  return '';
}