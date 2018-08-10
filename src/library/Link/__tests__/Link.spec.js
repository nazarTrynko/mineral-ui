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
    let wrapper;
    let mocks: Array<Function>;

    beforeEach(() => {
      Link.createRootNode = jest
        .fn()
        .mockImplementation((props) => props.element);

      mocks = [Link.createRootNode];

      wrapper = mountInWrapper(<Link href="http://example.com">test</Link>);

      // Ignore initial calls during first render
      mocks.forEach((mock) => mock.mockClear());
    });

    afterEach(() => {
      mocks.forEach((mock) => mock.mockRestore());
    });

    describe('when element prop changes', () => {
      it('updates root node', () => {
        wrapper.setProps({ element: 'span' });

        expect(Link.createRootNode).toHaveBeenCalledTimes(1);
      });
    });

    describe('when other props change', () => {
      it('does not update root node', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Link.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
