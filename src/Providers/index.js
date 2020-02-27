import React from 'react';

import { Colors } from './Colors.js';
import { Images } from './Images.js';

export default function ContextProviders(props) {
  return (
    <Colors>
      <Images>{props.children}</Images>
    </Colors>
  );
}
