import { useMutation, useQuery } from '@tanstack/react-query';

import w from './http';

const applicationApi = {
  create: `/application/create`,
  list: `/application/list`,
};

export const useAppCreate = () => {
  return useMutation({
    mutationKey: ['app', 'create'],
    mutationFn: (data: unknown) => {
      return w.post(data, applicationApi.create);
    },
  });
};

interface AppItem {
  id: number;
  appId: string;
  name: string;
  description: string;
  appType: string;
}

interface AppListResult {
  code: number;
  message: string;
  data: {
    list: AppItem[];
    total: number;
  };
}

export const useAppList = () => {
  return useQuery<AppItem[]>({
    queryKey: ['app', 'list'],
    queryFn: async () => {
      const { data } = await (<Promise<AppListResult>>w.get(applicationApi.list));
      return data.list;
    },
  });
};
