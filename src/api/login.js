import axios from 'axios';
import config from '../config/app.config.js';
import { message } from 'antd';

const http = axios.create({
  baseURL: config.rootPath,
  timeout: 10000
});

const defaultError = '操作失败，请稍后再试';
http.interceptors.response.use(res => {
  if (res.data.success) {
    return Promise.resolve(res.data);
  } else {
    if (res.config.url != config.rootPath + '/login/currentuser') {
      if (res.data.message) {
        message.error(res.data.message);
      }
    }
    message.error('登陆失败');
    return Promise.reject('登陆失败');
  }
}, error => {
  message.error(defaultError);
  return Promise.reject();
});

export function login(params) {
  return http.post('/login/valid', params, {
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  });
}

export function logout() {
  return http.get('/logout');
}

export function authUserStatus() {
  return http.get('/login/currentuser');
}