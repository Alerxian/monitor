import QueryStringAddon from 'wretch/addons/queryString';

import w from './http';

export const request = (urlStr: string, data?: unknown) => {
  const [method, url] = urlStr.split(' ');

  switch (method.toUpperCase()) {
    case 'GET':
      if (data) {
        return w.addon(QueryStringAddon).query(data).get(url);
      }
      return w.get(url);
    case 'POST':
      return w.post(data, url);
    case 'PUT':
      return w.put(data, url);
    case 'DELETE':
      return w.delete(url);
    default:
      throw new Error('Invalid method');
  }
};
