/* @flow */
import React from 'react';
import { shallow } from 'enzyme';
import { mountInWrapper } from '../../../../utils/enzymeUtils';
import testDemoExamples from '../../../../utils/testDemoExamples';
import { FlexItem } from '../../Flex';
import examples from '../../../website/app/demos/Flex/examples/FlexItem';

function shallowFlexItem(props = {}) {
  return shallow(<FlexItem {...props} />);
}

describe('FlexItem', () => {
  testDemoExamples(examples);

  it('renders', () => {
    const flexItem = shallowFlexItem();

    expect(flexItem.exists()).toEqual(true);
  });

  describe('composition', () => {
    it('composes Box by default', () => {
      const flexItem = shallowFlexItem();

      expect(flexItem).toMatchSnapshot();
    });

    it('composes Flex when flex={true}', () => {
      const flexItem = shallowFlexItem({
        flex: true
      });

      expect(flexItem).toMatchSnapshot();
    });
  });

  describe('memoization', () => {
    let wrapper;
    let mocks: Array<Function>;

    beforeEach(() => {
      FlexItem.createRootNode = jest.fn().mockImplementation(() => 'div');

      mocks = [FlexItem.createRootNode];

      wrapper = mountInWrapper(<FlexItem />);

      // Ignore initial calls during first render
      mocks.forEach((mock) => mock.mockClear());
    });

    afterEach(() => {
      mocks.forEach((mock) => mock.mockRestore());
    });

    describe('when flex changes', () => {
      it('updates root node', () => {
        // FIXME: This causes a console warning due to invalid dom attribute
        wrapper.setProps({ flex: true });

        expect(FlexItem.createRootNode).toHaveBeenCalledTimes(1);
      });
    });

    describe('when other props change', () => {
      it('does not update root node', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(FlexItem.createRootNode).not.toHaveBeenCalled();
      });
    });
  });
});
