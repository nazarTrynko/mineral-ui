/* @flow */
import React, { Children, cloneElement, Component } from 'react';
import { Reference } from 'react-popper';
import { PopoverTriggerWrapper } from './styled';

import type { PopoverTriggerProps } from './types';

export default class PopoverTrigger extends Component<PopoverTriggerProps> {
  static displayName = 'PopoverTrigger';

  render() {
    const { children, cursor, ...restProps } = this.props;

    return (
      <Reference>
        {({ ref }) => {
          const popoverTriggerWrapperProps = {
            cursor,
            ref
          };

          return (
            <PopoverTriggerWrapper {...popoverTriggerWrapperProps}>
              {cloneElement(Children.only(children), restProps)}
            </PopoverTriggerWrapper>
          );
        }}
      </Reference>
    );
  }
}
