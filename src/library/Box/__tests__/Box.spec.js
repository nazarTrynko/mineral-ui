/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import { mountInWrapper } from '../../../../utils/enzymeUtils';
import testDemoExamples from '../../../../utils/testDemoExamples';
import Box from '../Box';
import examples from '../../../website/app/demos/Box/examples';

function shallowBox(props = {}) {
  return shallow(<Box {...props} />);
}

describe('Box', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const box = shallowBox();

    expect(box.exists()).toEqual(true);
  });

  describe('memoization', () => {
    describe('createRootNode', () => {
      let wrapper;

      beforeEach(() => {
        Box.createRootNode = jest
          .fn()
          .mockImplementation((props) => props.element);
        wrapper = mountInWrapper(<Box />);
        // $FlowFixMe - Flow doesn't know it is a mock
        Box.createRootNode.mockClear(); // Ignore initial call
      });

      afterEach(() => {
        // $FlowFixMe - Flow doesn't know it is a mock
        Box.createRootNode.mockRestore();
      });

      it('is updated when element prop changes', () => {
        wrapper.setProps({ element: 'span' });

        expect(Box.createRootNode).toHaveBeenCalledTimes(1);
      });

      it('is not updated when other props change', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Box.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
