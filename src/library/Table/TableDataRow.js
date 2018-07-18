/* @flow */
import React, { Component } from 'react';
import deepEqual from 'react-fast-compare';
import TableSelectableCell from './TableSelectableCell';
import TableCell from './TableCell';
import TableRow from './TableRow';

import type { Toggle } from './Selectable';
import type { Columns, Messages, Row } from './Table';

type Props = {
  checked?: boolean,
  columns: Columns,
  data: Row,
  messages: Messages,
  toggle?: Toggle
};

export default class TableDataRow extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !deepEqual(this.props, nextProps);
  }

  toggle = () => {
    const { toggle } = this.props;
    toggle && toggle(this.props.data);
  };

  render() {
    const { checked, columns, data, messages, toggle } = this.props;
    const selectable = Boolean(toggle);
    console.log(`render ${selectable ? 'Selectable ' : ''}TableDataRow`);

    const children = columns.map(({ cell, key, ...restColumn }) => {
      const cellProps = {
        children: data[key],
        key,
        ...restColumn
      };
      return cell ? cell({ props: cellProps }) : <TableCell {...cellProps} />;
    });

    if (selectable) {
      children.unshift(
        <TableSelectableCell
          checked={checked}
          disabled={data.disabled}
          key="selectable"
          label={checked ? messages.deselectRow : messages.selectRow}
          onChange={this.toggle}
        />
      );
    }

    return data.row ? (
      data.row({ props: { children } })
    ) : (
      <TableRow>{children}</TableRow>
    );
  }
}
