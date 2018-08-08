/* @flow */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from '../../themes';
import Text from '../Text';
import examples from '../../../website/app/demos/Text/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';
import testThemeOverrides from '../../../../utils/testThemeOverrides';

function shallowText(props = {}) {
  return shallow(<Text {...props}>A</Text>);
}

const mountApp = (props = {}) => {
  return mount(<App {...props} />);
};

const App = (props = {}) => {
  const textProps = {
    children: 'test',
    ...props
  };

  return (
    <ThemeProvider>
      <Text {...textProps} />
    </ThemeProvider>
  );
};

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

  describe('root node', () => {
    beforeEach(() => {
      Text.createRootNode = jest
        .fn()
        .mockImplementation((props) => props.element);
    });

    afterEach(() => {
      Text.createRootNode.mockReset();
    });

    it('is updated when element prop changes', () => {
      const app = mountApp();

      app.setProps({ element: 'a' });

      expect(Text.createRootNode).toHaveBeenCalledTimes(2);
    });

    it('is not updated when other props change', () => {
      const app = mountApp();

      app.setProps({ id: 'test' });
      app.setProps({ onClick: jest.fn() });

      expect(Text.createRootNode).toHaveBeenCalledTimes(1);
    });
  });
});
