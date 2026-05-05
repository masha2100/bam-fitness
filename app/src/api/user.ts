import { apiClient } from './client';

export type HomeResponse = {
  welcome: { name: string };
  goalProgress: { completed: number; target: number };
};

export const getHome = async (): Promise<HomeResponse> => {
  const response = await apiClient.get('/api/user/home');
  return response.data;
};