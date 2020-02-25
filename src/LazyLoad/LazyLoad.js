import React, { lazy, Suspense } from 'react';

export default function LazyLoad(props) {
  const { path, Fallback, ...compProps } = props;
  const LazyComponent = lazy(() => import(`../${path}`));
  return (
    <Suspense fallback={<Fallback /> || <div>Loading...</div>}>
      <LazyComponent {...compProps} />
    </Suspense>
  );
}
