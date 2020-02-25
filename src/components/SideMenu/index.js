import React from 'react';
import LazyLoad from 'LazyLoad/';

export default function Lazy(props) {
  return (
    <LazyLoad
      path='components/SideMenu/SideMenu.js'
      fallback={<Loading />}
      {...props}
    />
  );
}

function Loading(props) {
  return (
    <div>
      <p>Fetching the good boy...</p>
    </div>
  );
}
