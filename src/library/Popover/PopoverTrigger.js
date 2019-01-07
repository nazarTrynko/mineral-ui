/* @flow */
import React, { Children, cloneElement, Component } from 'react';
import { Reference } from 'react-popper';
import { PopoverTriggerRoot as Root } from './styled';

import type { PopoverTriggerProps } from './types';

export default class PopoverTrigger extends Component<PopoverTriggerProps> {
  static displayName = 'PopoverTrigger';

  render() {
    const { children, cursor, ...restProps } = this.props;
    const rootProps = {
      cursor
    };

    return (
      <Root {...rootProps}>
        <Reference>
          {({ ref }) => {
            const props = {
              ...restProps
            };

            return (
              <span ref={ref}>
                {cloneElement(Children.only(children), props)}
              </span>
            );
          }}
        </Reference>
      </Root>
    );
  }
}
