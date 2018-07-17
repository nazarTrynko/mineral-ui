/* @flow */
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import { mountInThemeProvider } from '../../../../utils/enzymeUtils';
import { ThemeProvider } from '../../themes';
import Table from '../Table';
import TableBase from '../TableBase';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

const defaultProps = {
  data: [
    { aa: 'aa0', ab: 'ab0', ac: 'ac0', ad: 'ad0' },
    { aa: 'aa1', ab: 'ab1', ac: 'ac1', ad: 'ad1' },
    { aa: 'aa2', ab: 'ab2', ac: 'ac2', ad: 'ad2' },
    { aa: 'aa3', ab: 'ab3', ac: 'ac3', ad: 'ad3' }
  ],
  title: 'Test'
};

function shallowTable(props = {}) {
  const tableProps = {
    ...defaultProps,
    ...props
  };
  return shallow(<Table {...tableProps} />);
}

const mountTable = (props = {}) => {
  const tableProps = {
    ...defaultProps,
    ...props
  };

  return mountInThemeProvider(<Table {...tableProps} />);
};

const mountApp = (props = {}) => {
  return mount(<App {...props} />);
};

class App extends Component<*, *> {
  state = {
    data: this.props.data || []
  };

  render() {
    const tableProps = {
      ...this.props,
      data: this.state.data
    };

    return (
      <ThemeProvider>
        <Table {...tableProps} />
      </ThemeProvider>
    );
  }
}

describe('Table', () => {
  // testDemoExamples(examples, {
  //   exclude: ['large-data-sets'],
  //   contextPolyfill: true
  // });

  it('renders', () => {
    const table = shallowTable();

    expect(table.exists()).toEqual(true);
  });

  describe('sortable', () => {
    describe('sort', () => {
      it('without sortable', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          sort: { key: 'aa', descending: true }
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('with sortable Table', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          sort: { key: 'aa', descending: true },
          sortable: true
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('with sortable column', () => {
        const [, table] = mountTable({
          columns: [
            { key: 'aa', content: 'AA', sortable: true },
            { key: 'ab', content: 'AB' },
            { key: 'ac', content: 'AC' },
            { key: 'ad', content: 'AD' }
          ],
          data: defaultProps.data,
          sort: { key: 'aa', descending: true }
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('with sortable Table and sortComparator', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          sort: { key: 'aa', descending: true },
          sortable: true,
          sortComparator: () => 0
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('with sortable column and sortComparator', () => {
        const tableSortComparator = jest.fn();

        const [, table] = mountTable({
          columns: [
            {
              key: 'aa',
              content: 'AA',
              sortable: true,
              sortComparator: () => 0
            },
            { key: 'ab', content: 'AB' },
            { key: 'ac', content: 'AC' },
            { key: 'ad', content: 'AD' }
          ],
          data: defaultProps.data,
          sort: { key: 'aa', descending: true },
          sortComparator: tableSortComparator
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
        expect(tableSortComparator).not.toHaveBeenCalled();
      });
    });

    it('maintains sort state when data changes', () => {
      const props = {
        columns: [
          { content: 'AA', key: 'aa' },
          { content: 'AB', key: 'ab' },
          { content: 'AC', key: 'ac' },
          { content: 'AD', key: 'ad' }
        ],
        data: [
          { aa: 'aa0', ab: 'ab0', ac: 'ac0', ad: 'ad0' },
          { aa: 'aa1', ab: 'ab1', ac: 'ac1', ad: 'ad1' },
          { aa: 'aa2', ab: 'ab2', ac: 'ac2', ad: 'ad2' },
          { aa: 'aa3', ab: 'ab3', ac: 'ac3', ad: 'ad3' }
        ],
        sort: { key: 'aa', descending: true },
        sortable: true,
        title: 'Test'
      };

      const app = mountApp(props);

      app.setState({
        data: [...props.data, { aa: 'aa4', ab: 'ab4', ac: 'ac4', ad: 'ad4' }]
      });

      expect(app.exists()).toEqual(true);
    });
  });
});
