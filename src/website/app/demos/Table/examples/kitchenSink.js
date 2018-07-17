/* @flow */
import React from 'react';
import Table from '../../../../../library/Table';
// import data from '../shared/data';

const sortByLength = (a: Object, b: Object, key: string) => {
  const lengthA = a[key].length;
  const lengthB = b[key].length;
  if (lengthA < lengthB) {
    return -1;
  }
  if (lengthA > lengthB) {
    return 1;
  }
  return 0;
};

// prettier-ignore
const data = [
  { aa: "aa0", ab: "ab0", ac: "ac0", ad: "ad0", ae: "ae0" },
  { aa: "aa1", ab: "ab1", ac: "ac1", ad: "ad1", ae: "ae1" },
  { aa: "aa2", ab: "ab2", ac: "ac2", ad: "ad2", ae: "ae2" },
  { aa: "aa3", ab: "ab3", ac: "ac3", ad: "ad3", ae: "ae3" },
  { aa: "aa4", ab: "ab4", ac: "ac4", ad: "ad4", ae: "ae4" },
  { aa: "aa5", ab: "ab5", ac: "ac5", ad: "ad5", ae: "ae5" },
  { aa: "aa6", ab: "ab6", ac: "ac6", ad: "ad6", ae: "ae6" },
  { aa: "aa7", ab: "ab7", ac: "ac7", ad: "ad7", ae: "ae7" },
  { aa: "aa8", ab: "ab8", ac: "ac8", ad: "ad8", ae: "ae8" },
  { aa: "aa9", ab: "ab9", ac: "ac9", ad: "ad9", ae: "ae9" },
  { aa: "aa10", ab: "ab10", ac: "ac10", ad: "ad10", ae: "ae10" },
  { aa: "aa11", ab: "ab11", ac: "ac11", ad: "ad11", ae: "ae11" },
  { aa: "aa12", ab: "ab12", ac: "ac12", ad: "ad12", ae: "ae12" },
  { aa: "aa13", ab: "ab13", ac: "ac13", ad: "ad13", ae: "ae13" },
  { aa: "aa14", ab: "ab14", ac: "ac14", ad: "ad14", ae: "ae14" },
  { aa: "aa15", ab: "ab15", ac: "ac15", ad: "ad15", ae: "ae15" },
  { aa: "aa16", ab: "ab16", ac: "ac16", ad: "ad16", ae: "ae16" },
  { aa: "aa17", ab: "ab17", ac: "ac17", ad: "ad17", ae: "ae17" },
  { aa: "aa18", ab: "ab18", ac: "ac18", ad: "ad18", ae: "ae18" },
  { aa: "aa19", ab: "ab19", ac: "ac19", ad: "ad19", ae: "ae19" },
  { aa: "aa20", ab: "ab20", ac: "ac20", ad: "ad20", ae: "ae20" },
  { aa: "aa21", ab: "ab21", ac: "ac21", ad: "ad21", ae: "ae21" },
  { aa: "aa22", ab: "ab22", ac: "ac22", ad: "ad22", ae: "ae22" },
  { aa: "aa23", ab: "ab23", ac: "ac23", ad: "ad23", ae: "ae23" },
  { aa: "aa24", ab: "ab24", ac: "ac24", ad: "ad24", ae: "ae24" },
  { aa: "aa25", ab: "ab25", ac: "ac25", ad: "ad25", ae: "ae25" },
  { aa: "aa26", ab: "ab26", ac: "ac26", ad: "ad26", ae: "ae26" },
  { aa: "aa27", ab: "ab27", ac: "ac27", ad: "ad27", ae: "ae27" },
  { aa: "aa28", ab: "ab28", ac: "ac28", ad: "ad28", ae: "ae28" },
  { aa: "aa29", ab: "ab29", ac: "ac29", ad: "ad29", ae: "ae29" },
  { aa: "aa30", ab: "ab30", ac: "ac30", ad: "ad30", ae: "ae30" },
  { aa: "aa31", ab: "ab31", ac: "ac31", ad: "ad31", ae: "ae31" },
  { aa: "aa32", ab: "ab32", ac: "ac32", ad: "ad32", ae: "ae32" },
  { aa: "aa33", ab: "ab33", ac: "ac33", ad: "ad33", ae: "ae33" },
  { aa: "aa34", ab: "ab34", ac: "ac34", ad: "ad34", ae: "ae34" },
  { aa: "aa35", ab: "ab35", ac: "ac35", ad: "ad35", ae: "ae35" },
  { aa: "aa36", ab: "ab36", ac: "ac36", ad: "ad36", ae: "ae36" },
  { aa: "aa37", ab: "ab37", ac: "ac37", ad: "ad37", ae: "ae37" },
  { aa: "aa38", ab: "ab38", ac: "ac38", ad: "ad38", ae: "ae38" },
  { aa: "aa39", ab: "ab39", ac: "ac39", ad: "ad39", ae: "ae39" },
  { aa: "aa40", ab: "ab40", ac: "ac40", ad: "ad40", ae: "ae40" },
  { aa: "aa41", ab: "ab41", ac: "ac41", ad: "ad41", ae: "ae41" },
  { aa: "aa42", ab: "ab42", ac: "ac42", ad: "ad42", ae: "ae42" },
  { aa: "aa43", ab: "ab43", ac: "ac43", ad: "ad43", ae: "ae43" },
  { aa: "aa44", ab: "ab44", ac: "ac44", ad: "ad44", ae: "ae44" },
  { aa: "aa45", ab: "ab45", ac: "ac45", ad: "ad45", ae: "ae45" },
  { aa: "aa46", ab: "ab46", ac: "ac46", ad: "ad46", ae: "ae46" },
  { aa: "aa47", ab: "ab47", ac: "ac47", ad: "ad47", ae: "ae47" },
  { aa: "aa48", ab: "ab48", ac: "ac48", ad: "ad48", ae: "ae48" },
  { aa: "aa49", ab: "ab49", ac: "ac49", ad: "ad49", ae: "ae49" }
];

const CustomCell = ({ props }: Object) => (
  <td key={props.key}>Custom {props.children}</td>
);

const CustomHeader = ({ props }: Object) => (
  <th key={props.key}>Custom {props.children}</th>
);

const CustomSortableHeader = ({
  helpers,
  props: renderProps,
  state
}: {
  helpers: Object,
  props: Object,
  state: Object
}) => (
  <th key={renderProps.key}>
    <button
      onClick={() => {
        helpers.sort({
          column: state.sort.column,
          direction: state.sort.direction
        });
      }}>
      Custom {renderProps.children}{' '}
      {state.sort &&
        state.sort.column === renderProps.key &&
        state.sort.direction}
    </button>
  </th>
);

const CustomRow = ({ props }: Object) => (
  <tr key={props.key} style={{ fontStyle: 'italic' }}>
    {props.children}
  </tr>
);

// const columns = [
//   { content: 'Fresh Fruits', key: 'Fruits', sortable: true, cell: CustomCell },
//   { content: 'Veritable Vegetables', key: 'Vegetables', sortable: true, header: CustomSortableHeader },
//   { content: 'Grains', key: 'Grains', header: CustomHeader },
//   { content: 'Delectable Dairy', key: 'Dairy', sortable: true, sortComparator: sortByLength },
//   { content: 'Protein', key: 'Protein' }
// ];

const columns = [
  { content: 'AA', key: 'aa', sortable: true, cell: CustomCell },
  { content: 'AB', key: 'ab', sortable: true, header: CustomHeader },
  { content: 'AC', key: 'ac', header: CustomHeader },
  { content: 'AD', key: 'ad', sortComparator: sortByLength },
  { content: 'AE', key: 'ae' }
];

const rows = data.concat([
  {
    ...data[0],
    disabled: true,
    aa: data[0].aa + 1,
    row: CustomRow
  }
]);

export default {
  id: 'kitchen-sink',
  title: 'Kitchen Sink',
  hideFromProd: true,
  hideSource: true,
  scope: {
    CustomCell,
    CustomHeader,
    CustomSortableHeader,
    CustomRow,
    rows,
    Table,
    columns
  },
  source: `
    <Table
      columns={columns}
      data={rows}
      selectable
      selectedRows={[rows[0]]}
      defaultSort={{ key: 'aa' }}
      highContrast
      rowKey="aa"
      density="spacious"
      striped
      title="Title"
      titleAppearance="h5"
      titleElement="h2" />`
};
