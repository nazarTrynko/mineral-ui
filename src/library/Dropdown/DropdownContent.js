/* @flow */
import React, { Component } from 'react';
import Popper from '../Popover/RtlPopper';
import { DropdownContentWrapper } from './styled';

import type { DropdownContentProps } from './types';

export default class DropdownContent extends Component<DropdownContentProps> {
  static displayName = 'DropdownContent';

  render() {
    const {
      children,
      modifiers,
      placement,
      positionFixed,
      ...restProps
    } = this.props;
    const popperProps = {
      modifiers,
      placement,
      positionFixed
    };

    return (
      <Popper {...popperProps}>
        {({ ref, style, placement }) => {
          const dropdownContentWrapperProps = {
            'data-placement': placement,
            ref,
            style,
            ...restProps
          };

          return (
            <DropdownContentWrapper {...dropdownContentWrapperProps}>
              {children}
            </DropdownContentWrapper>
          );
        }}
      </Popper>
    );
  }
}
