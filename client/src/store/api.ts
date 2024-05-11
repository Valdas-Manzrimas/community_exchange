// api.ts
import axios from 'axios';
import { store } from '.';
import { logout } from './slices/authSlice';
import { clearCommunity } from './slices/communitySlice';
import { clearUser } from './slices/userSlice';
import { setAlert } from './slices/alertSlice';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use((request) => {
  const { token } = store.getState().persisted.auth;
  if (token) {
    request.headers['x-access-token'] = token;
  }
  return request;
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch(logout());
      store.dispatch(clearUser());
      store.dispatch(clearCommunity());
      store.dispatch(setAlert('Session expired'));
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
