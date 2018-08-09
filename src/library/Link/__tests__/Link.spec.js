/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Link, { componentTheme } from '../Link';
import examples from '../../../website/app/demos/Link/examples';
import { mountInWrapper } from '../../../../utils/enzymeUtils';
import testDemoExamples from '../../../../utils/testDemoExamples';
import testThemeOverrides from '../../../../utils/testThemeOverrides';
import { getProcessedComponentThemeKeys } from '../../themes/processComponentTheme';

function shallowLink(props = {}) {
  const linkProps = {
    href: 'http://example.com',
    children: 'Children',
    ...props
  };
  return shallow(<Link {...linkProps} />);
}

describe('Link', () => {
  testDemoExamples(examples, { exclude: ['react-router'] });

  it('renders', () => {
    const link = shallowLink();

    expect(link.exists()).toEqual(true);
  });

  describe('theme overrides', () => {
    testThemeOverrides(
      <Link href="http://example.com">test</Link>,
      getProcessedComponentThemeKeys(componentTheme)
    );
  });

  describe('memoization', () => {
    describe('createRootNode', () => {
      let wrapper;

      beforeEach(() => {
        Link.createRootNode = jest
          .fn()
          .mockImplementation((props) => props.element);
        wrapper = mountInWrapper(<Link href="http://example.com">test</Link>);
        // $FlowFixMe - Flow doesn't know it is a mock
        Link.createRootNode.mockClear(); // Ignore initial call
      });

      afterEach(() => {
        // $FlowFixMe - Flow doesn't know it is a mock
        Link.createRootNode.mockRestore();
      });

      it('is updated when element prop changes', () => {
        wrapper.setProps({ element: 'span' });

        expect(Link.createRootNode).toHaveBeenCalledTimes(1);
      });

      it('is not updated when other props change', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Link.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
