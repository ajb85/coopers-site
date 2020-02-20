import React from 'react';

import LazyLoad from 'LazyLoad/';

export default function Lazy(props) {
  return (
    <LazyLoad
      path='components/Header/Header.js'
      fallback={<Loading />}
      {...props}
    />
  );
}

function Loading() {
  return <div>Header is loading...</div>;
}
