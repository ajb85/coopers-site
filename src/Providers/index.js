import React from 'react';

import { Colors } from './Colors.js';
import { Account } from './Account.js';

export default function ContextProviders(props) {
  return (
    <Colors>
      <Account>{props.children}</Account>
    </Colors>
  );
}
