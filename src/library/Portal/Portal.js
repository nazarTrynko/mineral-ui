/* @flow */
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { canUseDOM } from 'exenv';

import type { PortalProps } from './types';

export default class Portal extends Component<PortalProps> {
  static displayName = 'Portal';

  node: ?HTMLElement;

  constructor(props) {
    super(props);

    if (canUseDOM) {
      this.node = document.createElement('div');
    }
  }

  componentDidMount() {
    canUseDOM && document.body.appendChild(this.node);
  }

  componentWillUnmount() {
    canUseDOM && document.body.removeChild(this.node);
  }

  render() {
    return createPortal(this.props.children, this.node);
  }
}
