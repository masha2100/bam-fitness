import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import { forceLogoutAtom } from '../atoms/auth';
import { jotaiStore } from '../lib/store';

const getApiUrl = () => {
  if (__DEV__) {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      return 'http://10.0.2.2:4000'; 
    }
    return 'http://192.168.0.131:4000'; 
  }
  return 'https://your-production-api.com'; 
};

export const apiClient = axios.create({
  baseURL: getApiUrl(),
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
      jotaiStore.set(forceLogoutAtom);
    }
    return Promise.reject(error);
  }
);