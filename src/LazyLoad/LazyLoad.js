import React, { lazy, Suspense } from 'react';

export default function LazyLoad(props) {
  const { path, fallback, ...restProps } = props;
  const LazyComponent = lazy(() => import(`../${path}`));
  return (
    <Suspense fallback={fallback || <div>Loading...</div>}>
      <LazyComponent {...restProps} />
    </Suspense>
  );
}
