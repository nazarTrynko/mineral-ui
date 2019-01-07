/* @flow */
import React from 'react';
import { PopoverArrowRoot as Root } from './styled';

import type { PopoverArrowProps } from './types';

const PopoverArrow = React.forwardRef((props: PopoverArrowProps, ref: any) => {
  return (
    <Root {...props} aria-hidden ref={ref}>
      ▼
    </Root>
  );
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
