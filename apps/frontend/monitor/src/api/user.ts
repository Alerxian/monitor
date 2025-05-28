import { useMutation } from '@tanstack/react-query';

import w from './http';

const api = {
  login: `/auth/login`,
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
      return <Promise<LoginResult>>w.post(data, api.login);
    },
  });
};
