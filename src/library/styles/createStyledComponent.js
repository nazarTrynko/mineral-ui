/* @flow */

import styled from 'react-emotion';
import withPropsFn from 'recompose/withProps';
import componentStyleReset from './componentStyleReset';
import isValidProp from '../utils/isValidProp';

type Element =
  | React$StatelessFunctionalComponent<*>
  | React$ComponentType<*>
  | string;

type StylesIn = Object | StylesFn | Array<StylesIn>;
type StylesOut = Object | Array<StylesOut>;
type MappedStylesOut = Array<Object | MappedStylesOut>;
type StylesFn = (props: Object, context?: Object) => StylesOut;

type Options = {
  displayName?: string,
  filterProps?: Array<string>,
  forwardProps?: Array<string>,
  includeStyleReset?: boolean,
  rootEl?: string,
  withProps?: Object
};

const getComponentStyles = (
  styles: StylesIn,
  props: Object,
  context?: Object
): StylesOut =>
  Array.isArray(styles)
    ? mapStyles(styles, props, context)
    : maybeRunStylesFunction(styles, props, context);

const mapStyles = (
  styles: Array<StylesIn>,
  props: Object,
  context?: Object
): MappedStylesOut =>
  styles.map((style) => getComponentStyles(style, props, context));

const maybeRunStylesFunction = (
  styles: StylesIn,
  props: Object,
  context?: Object
): StylesOut =>
  typeof styles === 'function' ? styles(props, context) : styles;

export default function createStyledComponent(
  element: Element,
  styles: StylesIn,
  options?: Options = {}
) {
  const {
    displayName,
    filterProps = [],
    forwardProps = [],
    includeStyleReset,
    rootEl,
    withProps
  } = options;
  const outStyles = (props: Object, context?: Object): StylesOut => {
    let componentStyles = getComponentStyles(styles, props, context);

    if (includeStyleReset) {
      const resetStyles = componentStyleReset(props);
      if (Array.isArray(componentStyles)) {
        componentStyles.unshift(resetStyles);
      } else {
        componentStyles = {
          ...resetStyles,
          ...componentStyles
        };
      }
    }

    return componentStyles;
  };

  if (displayName && typeof element !== 'string') {
    element.displayName = displayName;
  }

  const styledComponent = styled(element, {
    ...(process.env.NODE_ENV !== 'production' && displayName
      ? { label: displayName }
      : undefined),
    shouldForwardProp: (prop) => {
      /*
       * These props are filtered in Emotion's default implementation of
       * shouldForwardProp, which this overrides.
       */
      const filteredProps = ['innerRef', 'theme'].concat(filterProps);
      const isFiltered = filteredProps.indexOf(prop) !== -1;
      const isForwarded = forwardProps.indexOf(prop) !== -1;
      const tag = typeof element === 'string' ? element : rootEl;

      return !isFiltered && (isForwarded || isValidProp(tag, prop));
    }
  })(outStyles);

  return withProps ? withPropsFn(withProps)(styledComponent) : styledComponent;
}
