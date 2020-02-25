import React from 'react';

import LazyLoad from 'LazyLoad/';

export default function Lazy(props) {
  return (
    <LazyLoad
      path='components/SideMenu/SideMenu.js'
      {...props}
      Fallback={Loading}
    />
  );
}

function Loading() {
  return (
    <div>
      <p>Fetching good boy pictures...</p>
    </div>
  );
}
