import React from 'react';

import { Colors } from './Colors.js';
import { Images } from './Images.js';
import { Window } from './Window.js';

export default function ContextProviders(props) {
  return (
    <Colors>
      <Window>
        <Images>{props.children}</Images>
      </Window>
    </Colors>
  );
}
