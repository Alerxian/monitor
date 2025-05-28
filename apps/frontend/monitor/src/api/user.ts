import { useMutation } from '@tanstack/react-query';

import { request } from './request';

const api = {
  login: `POST /auth/login`,
};

interface LoginParams {
  username: string;
  password: string;
}

interface LoginResult {
  code: number;
  message: string;
  access_token: string;
}

export const useUserLogin = () => {
  return useMutation<LoginResult, unknown, LoginParams>({
    mutationKey: ['user', 'login'],
    mutationFn: (data) => {
      return request(api.login, data);
    },
  });
};
