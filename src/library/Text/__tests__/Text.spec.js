/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import Text from '../Text';
import examples from '../../../website/app/demos/Text/examples';
import { mountInWrapper } from '../../../../utils/enzymeUtils';
import testDemoExamples from '../../../../utils/testDemoExamples';
import testThemeOverrides from '../../../../utils/testThemeOverrides';

function shallowText(props = {}) {
  return shallow(<Text {...props}>A</Text>);
}

describe('Text', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const text = shallowText();

    expect(text.exists()).toEqual(true);
  });

  describe('theme overrides', () => {
    testThemeOverrides(<Text>test</Text>, [
      'Text_color',
      'Text_fontSize',
      'Text_lineHeight',
      'Text_marginBottom'
    ]);
  });

  describe('memoization', () => {
    let wrapper;
    let mocks: Array<Function>;

    beforeEach(() => {
      Text.createRootNode = jest
        .fn()
        .mockImplementation((props) => props.element);

      mocks = [Text.createRootNode];

      wrapper = mountInWrapper(<Text>test</Text>);

      // Ignore initial calls during first render
      mocks.forEach((mock) => mock.mockClear());
    });

    afterEach(() => {
      mocks.forEach((mock) => mock.mockRestore());
    });

    describe('when element prop changes', () => {
      it('updates root node', () => {
        wrapper.setProps({ element: 'a' });

        expect(Text.createRootNode).toHaveBeenCalledTimes(1);
      });
    });

    describe('when other props change', () => {
      it('does not update root node', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Text.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
