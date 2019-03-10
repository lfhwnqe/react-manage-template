import http from '../utils/request';

export function fetchLoanList(params) {
  return http.get('/api/loan/findByPage', {
    params
  });
}
