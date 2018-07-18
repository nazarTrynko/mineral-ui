/* @flow */
import { createStyledComponent } from '../../../../../library/styles';
import { withTheme } from '../../../../../library/themes';
import Table from '../../../../../library/Table';
import { componentTheme as tableCellTheme } from '../../../../../library/Table/TableCell';
import { componentTheme as tableRowTheme } from '../../../../../library/Table/TableRow';
import renderPropDescription from '../../shared/renderPropDescription';
import sharedData from '../shared/data';

export default {
  id: 'custom-row',
  title: 'Custom Row',
  description: `Use the \`row\`
[render prop](https://reactjs.org/docs/render-props.html) as a row property
to provide custom rendering control of the [TR](/components/tr) for that row.

${renderPropDescription}

Some things to keep in mind:

1. Because you are rendering a table row, the rendered root element _must_ be a
   \`tr\`.
1. Remember to accommodate the appearance-related Table props, like
   [\`highContrast\`](#high-contrast),
   [\`isSelected\`](#row-selection), [\`spacious\`](#spacious), and
   [\`striped\`](#zebra-striped).
1. If your app supports RTL languages, you can use \`theme.direction\` to
   conditionally apply the necessary styles.`,
  scope: {
    createStyledComponent,
    Table,
    sharedData,
    tableCellTheme,
    tableRowTheme,
    withTheme
  },
  source: `
    () => {
      /**
       * If you wish to use theme variables in your function, you must either use
       * createStyledComponent or the withTheme HOC, (higher order component),
       * which provides the base theme as a prop.
       *   import { withTheme } from 'mineral-ui/themes';
       *
       * If you wish to access a component specific theme, you'll need to import
       * it and compose it with the base theme as shown below.
       *   import { componentTheme as tableRowTheme } from 'mineral-ui/Table/TableRow';
       */
      const row = ({ props }) => {
        const { key, highContrast, spacious, striped } = props;

        const CustomRow = withTheme(({ theme: baseTheme }) => {
          // const theme = {
          //   ...tableCellTheme(baseTheme),
          //   ...tableRowTheme(baseTheme)
          // };
          const theme = baseTheme;
          const paddingVertical = spacious
            ? theme.TableCell_paddingVertical_spacious
            : theme.TableCell_paddingVertical;

          const Root = createStyledComponent('tr', {
            backgroundColor: theme.well_backgroundColor_warning,

            '&:not(:last-child)': {
              borderBottom: highContrast
                ? theme.TableRow_borderHorizontal_highContrast
                : theme.TableRow_borderHorizontal
            },

            '&:nth-child(even):not(:hover)': {
              backgroundColor:
                striped
                  ? theme.TableRow_backgroundColor_striped
                  : null
            }
          });

          const Cell = createStyledComponent('td', {
            padding: paddingVertical + ' ' + theme.TableCell_paddingHorizontal
          });

          const Divider = createStyledComponent('hr', {
            backgroundColor: theme.color_warning,
            border: 0,
            height: 1
          })

          const numCells = Object.keys(data[0]).length;

          return (
            <Root {...props}>
              <Cell colSpan={numCells}><Divider /></Cell>
            </Root>
          );
        });

        return <CustomRow key={key} />;
      }

      const data = [
        sharedData[0],
        sharedData[1],
        { row },
        sharedData[2],
        sharedData[3]
      ];

      return (
        <Table
          data={data}
          rowKey="Fruits"
          title="Foods of the World"
          hideTitle />
      );
    }`
};
