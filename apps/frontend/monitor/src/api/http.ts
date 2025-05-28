/* eslint-disable no-console */
import { toast } from 'sonner';
import wretch from 'wretch';
import AbortAddon from 'wretch/addons/abort';
// import FormDataAddon from 'wretch/addons/formData';
// import FormUrlAddon from 'wretch/addons/formUrl';
import QueryStringAddon from 'wretch/addons/queryString';
// import { dedupe, retry } from 'wretch/middlewares';

const w = wretch('http://localhost:4000/api', {
  mode: 'cors',
  // credentials: 'include',
})
  .auth(`Bearer ${localStorage.getItem('auth_token')}`)
  .resolve((response) => response.json())
  .catcher(500, (error) => {
    console.error(error);
    toast.error('服务器错误，请稍后再试');
  })
  .catcher(403, (error) => {
    console.error(error);
    toast.error('权限不足，请联系管理员');
  })
  .catcher(401, (error) => {
    console.error(error);
    toast.error('登录已失效，请重新登录');
  });

// 添加query string
// example {a: 1, b: 2} => ?a=1&b=2
w.addon(QueryStringAddon);

// 添加abort controller
w.addon(AbortAddon());

// w.addon(FormDataAddon);

// w.addon(FormUrlAddon);

// w.middlewares([
//   retry({
//     delayTimer: 500,
//     delayRamp: (delay, nbOfAttempts) => delay * nbOfAttempts,
//     maxAttempts: 3,
//     until: (response) => !!response && response.ok,
//     onRetry: undefined,
//     retryOnNetworkError: false,
//     resolveWithLatestResponse: false,
//   }),
//   dedupe({
//     skip: (_, options) => options.method !== 'GET' || options.skipDedupe,
//     key: (url, options) => `${options.method}@${url}`,
//     resolver: (response) => response.clone(),
//   }),
// ]);

export default w;
