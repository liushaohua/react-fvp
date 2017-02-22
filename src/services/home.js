import request from '../utils/request';
import qs from 'qs';

export async function update(params) {
  return request('/api/home', {
    method: 'post',
    body: qs.stringify(params),
  });
}

export async function renChart(params) {
  return request('/api/home/charts', {
    method: 'post',
    body: qs.stringify(params)
  });
}
