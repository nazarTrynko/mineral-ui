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
    let wrapper;
    let mocks: Array<Function>;

    beforeEach(() => {
      Box.createRootNode = jest
        .fn()
        .mockImplementation((props) => props.element);

      mocks = [Box.createRootNode];

      wrapper = mountInWrapper(<Box />);

      // Ignore initial calls during first render
      mocks.forEach((mock) => mock.mockClear());
    });

    afterEach(() => {
      mocks.forEach((mock) => mock.mockRestore());
    });

    describe('when element prop changes', () => {
      it('updates root node', () => {
        wrapper.setProps({ element: 'span' });

        expect(Box.createRootNode).toHaveBeenCalledTimes(1);
      });
    });

    describe('when other props change', () => {
      it('does not update root node', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(Box.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
