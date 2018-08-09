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
    describe('createRootNode', () => {
      let wrapper;

      beforeEach(() => {
        FlexItem.createRootNode = jest.fn().mockImplementation(() => 'div');
        wrapper = mountInWrapper(<FlexItem />);
      });

      afterEach(() => {
        // $FlowFixMe
        FlexItem.createRootNode.mockReset();
      });

      it('is updated when flex prop changes', () => {
        // FIXME: This causes a console warning due to invalid dom attribute
        wrapper.setProps({ flex: true });

        expect(FlexItem.createRootNode).toHaveBeenCalledTimes(2);
      });

      it('is not updated when other props change', () => {
        wrapper.setProps({ id: 'test' });
        wrapper.setProps({ onClick: jest.fn() });

        expect(FlexItem.createRootNode).toHaveBeenCalledTimes(1);
      });
    });
  });
});
