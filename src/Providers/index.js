import React from 'react';

import { Colors } from './Colors.js';
import { Account } from './Account.js';
import { Images } from './Images.js';

export default function ContextProviders(props) {
  return (
    <Colors>
      <Account>
        <Images>{props.children}</Images>
      </Account>
    </Colors>
  );
}
