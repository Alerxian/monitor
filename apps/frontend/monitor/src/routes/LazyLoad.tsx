import React, { Suspense } from 'react';

export const lazyLoad = (path: string) => {
  const Component = React.lazy(() => import(`../pages/${path}/index.tsx`));

  return (
    <Suspense fallback={<div>loading....</div>}>
      <Component />
    </Suspense>
  );
};
