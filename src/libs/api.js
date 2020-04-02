import axios from 'axios';
import router from '../router';
import url from './config';

const config = {
  baseUrl: `${url.localUrl}/`,
  // baseUrl: '/api',
};

axios.defaults.baseURL = config.baseUrl;

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem('Authorization');
  if (token) {
    // eslint-disable-next-line no-param-reassign
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

axios.interceptors.response.use(
  // eslint-disable-next-line arrow-parens
  (res) => res.data,
  (error) => {
    if (error.response.status === 401) {
      router.push('/login');
    }
    return Promise.reject(error.response);
  },
);

export default axios;
