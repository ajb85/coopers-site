import React from 'react';

import LazyLoad from 'LazyLoad/';

export default function Lazy(props) {
  return (
    <LazyLoad
      path="components/Image/Image.js"
      fallback={<Loading />}
      {...props}
    />
  );
}

function Loading() {
  return (
    <div style={{ width: '100%', height: '40vh', backgroundColor: 'black' }} />
  );
}
