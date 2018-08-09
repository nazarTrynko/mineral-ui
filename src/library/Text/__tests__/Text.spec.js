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
    describe('createRootNode', () => {
      let wrapper;

      beforeEach(() => {
        Text.createRootNode = jest
          .fn()
          .mockImplementation((props) => props.element);
        wrapper = mountInWrapper(<Text>test</Text>);
        // $FlowFixMe - Flow doesn't know it is a mock
        Text.createRootNode.mockClear(); // Ignore initial call
      });

      afterEach(() => {
        // $FlowFixMe - Flow doesn't know it is a mock
        Text.createRootNode.mockRestore();
      });

      it('is updated when element prop changes', () => {
        wrapper.setProps({ element: 'a' });

        expect(Text.createRootNode).toHaveBeenCalledTimes(1);
      });

      it('is not updated when other props change', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Text.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
