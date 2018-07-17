/* @flow */
import { Component } from 'react';
import deepEqual from 'fast-deep-equal';

type Props<T> = {
  children: (props: Object) => React$Node,
  data: Data<T>,
  defaultSelected?: Data<T>,
  onToggle?: (item: T, selected: boolean) => void,
  onToggleAll?: (items: Array<T>, selected: boolean) => void,
  selected?: Data<T>
};

export type State<T> = {
  selected: Array<T>
};

type Data<T> = Array<T>;
// TODO: `rowData` should be T, but that would require passing T from Table
export type SelectableType = {
  all: boolean,
  some: boolean,
  isSelected: (rowData: Object) => boolean,
  toggle: Toggle,
  toggleAll: ToggleAll
};
export type Toggle = (rowData: Object) => void;
export type ToggleAll = () => void;

const getSelectableItems = (data: Data<T>) =>
  data.filter((item) => !item.disabled);

export default class Selectable<T> extends Component<Props<T>, State<T>> {
  constructor(props: Props<T>) {
    super(props);

    this.state = {
      selected: props.defaultSelected || []
    };
  }

  selectableItems: Data<T> = getSelectableItems(this.props.data);

  componentWillReceiveProps(nextProps: Props<T>) {
    if (!deepEqual(this.props.selected, nextProps.selected)) {
      this.setState({
        selected: nextProps.selected
      });
    }

    if (!deepEqual(this.props.data, nextProps.data)) {
      this.selectableItems = getSelectableItems(nextProps.data);
    }
  }

  render() {
    const props = {
      ...this.props,
      selectable: {
        ...this.state,
        all: this.allSelected(),
        some: this.someSelected(),
        isSelected: this.isSelected,
        toggle: this.toggle,
        toggleAll: this.toggleAll
      }
    };

    return this.props.children(props);
  }

  toggle = (item: T) => {
    if (this.isControlled('selected')) {
      this.toggleActions(item);
    } else {
      this.setState(
        (prevState) => {
          const selected = prevState.selected.slice(0);
          const index = selected.indexOf(item);
          const hasItem = index !== -1;
          hasItem ? selected.splice(index, 1) : selected.push(item);

          return {
            selected
          };
        },
        () => {
          this.toggleActions(item);
        }
      );
    }
  };

  toggleActions = (item: T) => {
    const { onToggle } = this.props;
    onToggle && onToggle(item, this.isSelected(item));
  };

  toggleAll = () => {
    if (this.isControlled('selected')) {
      this.toggleAllActions();
    } else {
      this.setState(() => {
        return {
          selected:
            this.allSelected() || this.someSelected()
              ? []
              : this.selectableItems
        };
      }, this.toggleAllActions);
    }
  };

  toggleAllActions = () => {
    const { onToggleAll } = this.props;
    const all = !this.allSelected();
    onToggleAll && onToggleAll(all ? this.selectableItems : [], all);
  };

  allSelected = () => {
    const selected = this.getControllableValue('selected');
    return selected && selected.length === this.selectableItems.length;
  };

  someSelected = () => {
    const selected = this.getControllableValue('selected');
    const all = this.allSelected();
    return selected && selected.length > 0 && !all;
  };

  isSelected = (item: T) => {
    const selected = this.getControllableValue('selected');
    return selected && selected.indexOf(item) !== -1;
  };

  isControlled = (prop: string) => {
    return this.props.hasOwnProperty(prop);
  };

  getControllableValue = (key: string) => {
    return this.isControlled(key) ? this.props[key] : this.state[key];
  };
}
