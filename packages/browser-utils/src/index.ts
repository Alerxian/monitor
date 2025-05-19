export const getBrowserInfo = () => {
  // 获取浏览器信息
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    referrer: document.referrer,
    path: location.pathname,
  };
};

export { VitalsIntegration } from './integrations';
