/* @flow */
import React from 'react';
import createReactContext, { type Context } from 'create-react-context';
import { createStyledComponent } from '../styles';
import DataRow from './DataRow';
import HeaderRow from './HeaderRow';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import TableTitle from './TableTitle';

import type { Columns, Messages, Row, Rows } from './DataTable';

type Props = {
  columns?: Columns,
  data: Rows,
  highContrast?: boolean,
  messages: Messages,
  rowKey?: string,
  selectable?: {
    all: boolean,
    some: boolean,
    isSelected: (rowData: Row) => boolean,
    toggleAll: () => void,
    toggleItem: (rowData: Row) => void
  },
  /** TODO: Controlled */
  sort?: {
    key: string,
    ascending?: boolean
  },
  sortFn?: (key: string) => -1 | 0 | 1,
  spacious?: boolean,
  striped?: boolean,
  title?: React$Node,
  titleAppearance?: string,
  titleElement?: string,
  titleId?: string
};

type Appearance = {
  highContrast?: boolean,
  spacious?: boolean,
  striped?: boolean
};

export const TableContext: Context<Appearance> = createReactContext({});

export const componentTheme = (baseTheme: Object) => ({
  Table_borderTop: `1px solid ${baseTheme.borderColor}`,
  Table_borderBottom_highContrast: `1px solid ${baseTheme.color_gray_60}`,
  Table_borderTop_highContrast: `1px solid ${baseTheme.color_gray_80}`,
  Table_boxShadow_focus: `0 0 0 1px ${baseTheme.borderColor_theme_focus}`,
  // ...tableTitleComponentTheme(baseTheme), // TODO

  ...baseTheme
});

const styles = {
  table: ({ highContrast, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      borderBottom: highContrast ? theme.Table_borderBottom_highContrast : null,
      borderCollapse: 'collapse',
      borderSpacing: 0,
      borderTop: highContrast
        ? theme.Table_borderTop_highContrast
        : theme.Table_borderTop,
      width: '100%'
    };
  }
};

const StyledTable = createStyledComponent('table', styles.table, {
  displayName: 'Table',
  rootEl: 'table',
  includeStyleReset: true
});

export default function Table({
  columns,
  data,
  highContrast,
  messages,
  rowKey,
  selectable,
  sort,
  sortFn,
  spacious,
  striped,
  title,
  titleAppearance,
  titleElement,
  titleId
}: Props) {
  console.log(`render ${selectable ? 'selectable ' : ''}Table`);
  const headerProps = {
    checked: selectable && selectable.all,
    columns,
    indeterminate: selectable && selectable.some,
    messages,
    sort,
    sortFn,
    toggle: selectable && selectable.toggleAll
  };

  return (
    <StyledTable>
      {title && (
        <TableTitle
          appearance={titleAppearance}
          element={titleElement}
          id={titleId}>
          {title}
        </TableTitle>
      )}
      <TableContext.Provider value={{ highContrast, spacious, striped }}>
        <TableHeader>
          <HeaderRow {...headerProps} />
        </TableHeader>
        <TableBody>
          {data.map((rowData, index) => {
            const rowProps = {
              checked: selectable && selectable.isSelected(rowData),
              columns,
              data: rowData,
              toggleItem: selectable && selectable.toggleItem
            };
            return <DataRow key={rowData[rowKey] || index} {...rowProps} />;
          })}
        </TableBody>
      </TableContext.Provider>
    </StyledTable>
  );
}
