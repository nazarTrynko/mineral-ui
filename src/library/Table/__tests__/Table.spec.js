/* @flow */
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import { mountInThemeProvider } from '../../../../utils/enzymeUtils';
import { ThemeProvider } from '../../themes';
import Table from '../Table';
import TableBase from '../TableBase';
import TableHeader from '../TableHeader';
import TableSortableHeaderCell from '../TableSortableHeaderCell';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

const defaultProps = {
  data: [
    { aa: 'aa0', ab: 'ab0', ac: 'ac0', ad: 'ad0' },
    { aa: 'aa2', ab: 'ab2', ac: 'ac2', ad: 'ad2' },
    { aa: 'aa1', ab: 'ab1', ac: 'ac1', ad: 'ad1' },
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
    describe('enablement', () => {
      it('makes all columns sortable with sortable on Table', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          sortable: true
        });
        const header = table.find(TableHeader);

        expect(header.find(TableSortableHeaderCell).length).toEqual(4);
      });

      it('makes only the first column sortable with sortable in column definition', () => {
        const [, table] = mountTable({
          columns: [
            { key: 'aa', content: 'AA', sortable: true },
            { key: 'ab', content: 'AB' },
            { key: 'ac', content: 'AC' },
            { key: 'ad', content: 'AD' }
          ],
          data: defaultProps.data
        });
        const header = table.find(TableHeader);

        expect(header.find(TableSortableHeaderCell).length).toEqual(1);
      });
    });

    describe('defaultSort', () => {
      it('sorts without sortable', () => {
        const [, table] = mountTable({
          defaultSort: { key: 'aa', descending: true }
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('sorts with sortable Table', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          defaultSort: { key: 'aa', descending: true },
          sortable: true
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('sorts with sortable column', () => {
        const [, table] = mountTable({
          columns: [
            { key: 'aa', content: 'AA', sortable: true },
            { key: 'ab', content: 'AB' },
            { key: 'ac', content: 'AC' },
            { key: 'ad', content: 'AD' }
          ],
          data: defaultProps.data,
          defaultSort: { key: 'aa', descending: true }
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('sorts with sortable Table and sortComparator', () => {
        const [, table] = mountTable({
          data: defaultProps.data,
          defaultSort: { key: 'aa', descending: true },
          sortable: true,
          sortComparator: () => 0
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
      });

      it('sorts with sortable column and sortComparator', () => {
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
          defaultSort: { key: 'aa', descending: true },
          sortComparator: tableSortComparator
        });

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
        expect(tableSortComparator).not.toHaveBeenCalled();
      });
    });

    describe('on click', () => {
      let app, table;

      beforeEach(() => {
        // [, table] = mountTable({
        //   data: defaultProps.data,
        //   sortable: true
        // });

        app = mountApp({
          ...defaultProps,
          sortable: true
        });

        table = app.find(Table);
      });

      it('sorts ascending on first click', () => {
        let headerCell = table.find(TableSortableHeaderCell).first();
        const button = headerCell.find('button');

        button.simulate('click');

        app.update();
        table = app.find(Table);

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
        expect(headerCell.html()).toMatchSnapshot();
      });

      it('toggles sort direction on second click', () => {
        const headerCell = table.find(TableSortableHeaderCell).first();
        const button = headerCell.find('button');

        button.simulate('click');
        button.simulate('click');

        app.update();
        table = app.find(Table);

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
        expect(headerCell.html()).toMatchSnapshot();
      });

      it('sorts ascending when sorted column changes', () => {
        const headerCell = table.find(TableSortableHeaderCell).first();
        const secondHeaderCell = table.find(TableSortableHeaderCell).at(1);
        const button = headerCell.find('button');
        const secondButton = secondHeaderCell.find('button');

        button.simulate('click');
        secondButton.simulate('click');

        app.update();
        table = app.find(Table);

        const sortedData = table.find(TableBase).props().data;

        expect(sortedData).toMatchSnapshot();
        expect(headerCell.html()).toMatchSnapshot('Idle');
        expect(secondHeaderCell.html()).toMatchSnapshot('Active');
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
        defaultSort: { key: 'aa', descending: true },
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
