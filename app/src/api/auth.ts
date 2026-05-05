import { apiClient } from './client';

export type SignInRequest = {
  email: string;
};

export type SignInResponse = {
  token: string;
  user: { id: string; email: string; name: string };
};

export const signIn = async (data: SignInRequest): Promise<SignInResponse> => {
  const response = await apiClient.post('/api/auth/email-signin', data);
  return response.data;
};