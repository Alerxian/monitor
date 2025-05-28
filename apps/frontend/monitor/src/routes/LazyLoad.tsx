import React, { Suspense } from 'react';

import { LoadingPage } from '@/components/ui/loading';

export const lazyLoad = (path: string) => {
  const Component = React.lazy(() => import(`../pages/${path}/index.tsx`));

  return (
    <Suspense fallback={<LoadingPage />}>
      <Component />
    </Suspense>
  );
};
