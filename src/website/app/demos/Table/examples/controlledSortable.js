/* @flow */
import { Component } from 'react';
import Button from '../../../../../library/Button';
import Flex, { FlexItem } from '../../../../../library/Flex';
import Table from '../../../../../library/Table';
import data from '../shared/data';

export default {
  id: 'controlled-sortable',
  title: 'Controlled - Sortable Columns',
  description: `Table controls its own state by default, and can optionally
be managed by the application as a controlled component via the control prop
\`sort\`.`,
  scope: { Button, Component, Table, Flex, FlexItem, data },
  source: `
    () => {
      const evenRows = data.filter((row, index) => (index + 1)%2 === 0);
      const oddRows = data.filter((row, index) => (index + 1)%2 !== 0);

      const initialState = {
        sort: undefined
      };

      class MyTable extends Component {
        constructor(props) {
          super(props);

          this.state = initialState;

          this.handleSort = this.handleSort.bind(this);
          this.sortFruitsAscending = this.sortFruitsAscending.bind(this);
          this.sortFruitsDescending = this.sortFruitsDescending.bind(this);
          this.reset = this.reset.bind(this);
        }

        handleSort(sort) {
          console.log({sort});
          this.setState({ sort });
        }

        sortFruitsAscending() {
          this.setState({
            sort: {
              key: 'Fruits',
              descending: false
            }
          });
        }

        sortFruitsDescending() {
          this.setState({
            sort: {
              key: 'Fruits',
              descending: true
            }
          });
        }

        reset() {
          this.setState(initialState)
        }

        render() {
          return (
            <div>
              <Flex marginBottom="md">
                <FlexItem>
                  <Button onClick={this.sortFruitsAscending} size="medium">Sort Fruits ascending</Button>
                </FlexItem>
                <FlexItem>
                  <Button onClick={this.sortFruitsDescending} size="medium">Sort Fruits descending</Button>
                </FlexItem>
                <FlexItem marginLeft="auto">
                  <Button onClick={this.reset} size="medium">Reset</Button>
                </FlexItem>
              </Flex>
              <Table
                data={data}
                rowKey="Fruits"
                sortable
                sort={this.state.sort}
                onSort={this.handleSort}
                title="Delicious Foods"
                hideTitle />
            </div>
          );
        }
      }

      return <MyTable />;
    }
    `
};
