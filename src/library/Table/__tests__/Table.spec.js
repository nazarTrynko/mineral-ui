/* @flow */
import React, { Component } from 'react';
import { mount, shallow } from 'enzyme';
import { mountInThemeProvider } from '../../../../utils/enzymeUtils';
import { ThemeProvider } from '../../themes';
import Checkbox from '../../Checkbox';
import Table from '../Table';
import TableBase from '../TableBase';
import TableBody from '../TableBody';
import TableHeader from '../TableHeader';
import TableRow from '../TableRow';
import TableSortableHeaderCell from '../TableSortableHeaderCell';
import examples from '../../../website/app/demos/Table/examples';
import testDemoExamples from '../../../../utils/testDemoExamples';

const defaultProps = {
  data: [
    { aa: 'aa0', ab: 'ab0', ac: 'ac0', ad: 'ad0' },
    { aa: 'aa2', ab: 'ab2', ac: 'ac2', ad: 'ad2' },
    { aa: 'aa1', ab: 'ab1', ac: 'ac1', ad: 'ad1' },
    { aa: 'aa3', ab: 'ab3', ac: 'ac3', ad: 'ad3', disabled: true }
  ],
  title: 'Test'
};
// $FlowFixMe
const nonDisabledRowsLength = defaultProps.data.filter((item) => !item.disabled)
  .length;

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

  describe('selectable', () => {
    describe('defaultSelectedRows', () => {
      it('does not select without selectable', () => {
        const [, table] = mountTable({
          defaultSelectedRows: [defaultProps.data[0]]
        });

        const selectedRows = table.find(TableBase).props().selectable;

        expect(selectedRows).toEqual(undefined);
      });

      it('selects default rows', () => {
        const [, table] = mountTable({
          defaultSelectedRows: [defaultProps.data[0]],
          selectable: true
        });

        const firstRowCheckbox = table
          .find(TableBody)
          .find(TableRow)
          .at(0)
          .find(Checkbox);
        const headerCheckbox = table.find(TableHeader).find(Checkbox);

        expect(headerCheckbox.props().indeterminate).toBeTrue;
        expect(firstRowCheckbox.props().checked).toBeTrue;
      });

      it('does not select disabled rows', () => {
        const [, table] = mountTable({
          defaultSelectedRows: [defaultProps.data[3]],
          selectable: true
        });

        const lastRowCheckbox = table
          .find(TableBody)
          .find(TableRow)
          .at(3)
          .find(Checkbox);
        const headerCheckbox = table.find(TableHeader).find(Checkbox);

        expect(
          headerCheckbox.props().checked && headerCheckbox.props().indeterminate
        ).toBeFalse;
        expect(lastRowCheckbox.props().checked).toBeFalse;
      });
    });

    describe('on click', () => {
      describe('single row', () => {
        it('selects row', () => {
          const app = mountApp({
            ...defaultProps,
            selectable: true
          });

          let table = app.find(Table);

          let firstRowCheckbox = table
            .find(TableBody)
            .find(TableRow)
            .at(0)
            .find('input[type="checkbox"]');
          firstRowCheckbox.simulate('change');

          app.update();
          table = app.find(Table);

          const headerCheckbox = table.find(TableHeader).find(Checkbox);
          firstRowCheckbox = table
            .find(TableBody)
            .find(TableRow)
            .at(0)
            .find(Checkbox);

          expect(headerCheckbox.props().indeterminate).toBeTrue;
          expect(firstRowCheckbox.props().checked).toBeTrue;
        });

        it('deselects row when initially selected', () => {
          const app = mountApp({
            ...defaultProps,
            defaultSelectedRows: [defaultProps.data[0]],
            selectable: true
          });

          let table = app.find(Table);

          let firstRowCheckbox = table
            .find(TableBody)
            .find(TableRow)
            .at(0)
            .find('input[type="checkbox"]');
          firstRowCheckbox.simulate('change');

          app.update();
          table = app.find(Table);

          const headerCheckbox = table.find(TableHeader).find(Checkbox);
          firstRowCheckbox = table
            .find(TableBody)
            .find(TableRow)
            .at(0)
            .find(Checkbox);

          expect(
            headerCheckbox.props().checked &&
              headerCheckbox.props().indeterminate
          ).toBeFalse;
          expect(firstRowCheckbox.props().checked).toBeFalse;
        });
      });

      describe('all rows', () => {
        it('selects all non-disabled rows when no rows initially selected', () => {
          const app = mountApp({
            ...defaultProps,
            selectable: true
          });

          let table = app.find(Table);

          const headerCheckbox = table
            .find(TableHeader)
            .find('input[type="checkbox"]');
          headerCheckbox.simulate('change');

          app.update();
          table = app.find(Table);

          const checkboxes = table
            .find(TableBody)
            .findWhere((n) => n.type() === Checkbox && n.props().checked);

          expect(headerCheckbox.props().checked).toBeTrue;
          expect(checkboxes.length).toEqual(nonDisabledRowsLength);
        });

        it('deselects all rows when some rows initially selected', () => {
          const app = mountApp({
            ...defaultProps,
            defaultSelectedRows: [defaultProps.data[0]],
            selectable: true
          });

          let table = app.find(Table);

          const headerCheckbox = table
            .find(TableHeader)
            .find('input[type="checkbox"]');
          headerCheckbox.simulate('change');

          app.update();
          table = app.find(Table);

          const checkboxes = table
            .find(TableBody)
            .findWhere((n) => n.type() === Checkbox && n.props().checked);

          expect(
            headerCheckbox.props().checked &&
              headerCheckbox.props().indeterminate
          ).toBeFalse;
          expect(checkboxes.length).toEqual(0);
        });

        it('deselects all rows when all rows initially selected', () => {
          const app = mountApp({
            ...defaultProps,
            defaultSelectedRows: defaultProps.data,
            selectable: true
          });

          let table = app.find(Table);

          const headerCheckbox = table
            .find(TableHeader)
            .find('input[type="checkbox"]');
          headerCheckbox.simulate('change');

          app.update();
          table = app.find(Table);

          const checkboxes = table
            .find(TableBody)
            .findWhere((n) => n.type() === Checkbox && n.props().checked);

          expect(
            headerCheckbox.props().checked &&
              headerCheckbox.props().indeterminate
          ).toBeFalse;
          expect(checkboxes.length).toEqual(0);
        });
      });
    });
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

      it('makes only the appropriate columns sortable with sortable in Table and column definition', () => {
        const [, table] = mountTable({
          columns: [
            { key: 'aa', content: 'AA', sortable: false },
            { key: 'ab', content: 'AB' },
            { key: 'ac', content: 'AC' },
            { key: 'ad', content: 'AD' }
          ],
          data: defaultProps.data,
          sortable: true
        });
        const header = table.find(TableHeader);

        expect(header.find(TableSortableHeaderCell).length).toEqual(3);
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
