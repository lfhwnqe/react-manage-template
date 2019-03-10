import http from '../utils/request'

//获取用户信息列表
export function fetchCustomerInfoList(params) {
  return http.get('/api/customerInfo/findByPage', {
    params
  });
}