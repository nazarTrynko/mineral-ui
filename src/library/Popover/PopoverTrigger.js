/* @flow */
import React, { Children, cloneElement, Component } from 'react';
import { Reference } from 'react-popper';
import { PopoverTriggerRoot as Root } from './styled';

import type { PopoverTriggerProps } from './types';

export default class PopoverTrigger extends Component<PopoverTriggerProps> {
  static displayName = 'PopoverTrigger';

  render() {
    const { children, cursor, ...restProps } = this.props;


    return (
      <Reference>
        {({ ref }) => {
          const rootProps = {
            cursor,
            ref
          };
          const props = {
            ...restProps
          };

          return (
            <Root {...rootProps}>
              {cloneElement(Children.only(children), props)}
            </Root>
          );
        }}
      </Reference>
    );
  }
}
