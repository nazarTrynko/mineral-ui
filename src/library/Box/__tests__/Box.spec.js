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

  describe('root node', () => {
    let wrapper;

    beforeEach(() => {
      Box.createRootNode = jest
        .fn()
        .mockImplementation((props) => props.element);
      wrapper = mountInWrapper(<Box />);
    });

    afterEach(() => {
      Box.createRootNode.mockReset();
    });

    it('is updated when element prop changes', () => {
      wrapper.setProps({ element: 'span' });

      expect(Box.createRootNode).toHaveBeenCalledTimes(2);
    });

    it('is not updated when other props change', () => {
      wrapper.setProps({ id: 'test' });
      wrapper.setProps({ onClick: jest.fn() });

      expect(Box.createRootNode).toHaveBeenCalledTimes(1);
    });
  });
});
