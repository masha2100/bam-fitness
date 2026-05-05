import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getDefaultStore } from 'jotai';
import { forceLogoutAtom } from '../atoms/auth';

const API_URL = 'http://172.20.10.2:4000';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');
      const store = getDefaultStore();
      store.set(forceLogoutAtom);
    }
    return Promise.reject(error);
  }
);