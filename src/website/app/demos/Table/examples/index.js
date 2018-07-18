/* @flow */
import alignment from './alignment';
import basic from './basic';
import columnAlign from './columnAlign';
import columnDef from './columnDef';
import controlledSelectable from './controlledSelectable';
import controlledSortable from './controlledSortable';
import customCell from './customCell';
import customHeaderCell from './customHeaderCell';
import customRow from './customRow';
import density from './density';
import highContrast from './highContrast';
import importSyntax from './importSyntax';
import kitchenSink from './kitchenSink';
import largeDataSets from './largeDataSets';
import primaryColumn from './primaryColumn';
import selectable from './selectable';
import rtl from './rtl';
import scrollable from './scrollable';
import sortable from './sortable';
import striped from './striped';
import title from './title';

export default [
  importSyntax,
  basic,
  columnDef,
  sortable,
  selectable,
  title,
  primaryColumn,
  columnAlign,
  density,
  striped,
  highContrast,
  scrollable,
  controlledSelectable,
  controlledSortable,
  rtl,
  customCell,
  customHeaderCell,
  customRow,
  alignment,
  largeDataSets,
  kitchenSink
];
