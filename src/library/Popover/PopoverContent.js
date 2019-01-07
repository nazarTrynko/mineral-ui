/* @flow */
import React, { Component } from 'react';
import PopoverArrow from './PopoverArrow';
import Root from './RtlPopper';
import { PopoverContentWrapper, PopoverBlock, PopoverTitle } from './styled';
import { ARROW_SIZE } from './constants';

import type { PopoverContentProps } from './types';

export default class PopoverContent extends Component<PopoverContentProps> {
  static displayName = 'PopoverContent';

  render() {
    const { children, hasArrow, placement, subtitle, title, ...restProps } = this.props;

    return (
      <Root placement={placement}>
        {({ ref, style, placement, arrowProps }) => {
          const popoverContentWrapperProps = {
            'data-placement': placement,
            ref,
            style,
            ...restProps
          };

          const popoverArrowProps = {
            size: ARROW_SIZE,
            placement,
            ...arrowProps
          };

          return (
            <PopoverContentWrapper {...popoverContentWrapperProps}>
              {title && (
                <PopoverTitle subtitle={subtitle}>{title}</PopoverTitle>
              )}
              <PopoverBlock>{children}</PopoverBlock>
              {hasArrow && <PopoverArrow {...popoverArrowProps} />}
            </PopoverContentWrapper>
          );
        }}
      </Root>
    );
  }
}
