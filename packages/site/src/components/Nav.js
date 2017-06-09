/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { createStyledComponent } from '@mineral-ui/style-utils';
import _Link from './Link';
import styleReset from './styleReset';

type Props = {|
  className?: string,
  demos: Array<Object>
|};

const styles = {
  nav: (props, theme) => ({
    ...styleReset(theme),
    padding: theme.measurement_c
  }),
  title: (props, theme) => ({
    borderBottom: `1px solid ${theme.color_gray}`,
    fontSize: theme.font_size_c,
    margin: `0 0 ${theme.measurement_c}`,
    paddingBottom: theme.measurement_c
  }),
  heading: (props, theme) => ({
    margin: '0',
    fontSize: theme.font_size_b
  }),
  list: {
    listStyle: 'none',
    paddingLeft: '0'
  },
  listItem: (props, theme) => ({
    '& + li': {
      marginTop: theme.measurement_b
    }
  }),
  link: {
    textDecoration: 'none'
  }
};

const Root = createStyledComponent('nav', styles.nav);
const Title = createStyledComponent('h1', styles.title);
const Heading = createStyledComponent('h2', styles.heading);
const List = createStyledComponent('ol', styles.list);
const ListItem = createStyledComponent('li', styles.listItem);
const Link = createStyledComponent(_Link, styles.link);

export default function Nav({ className, demos }: Props) {
  const demoLinks = demos.map(demo => {
    return (
      <ListItem key={demo.slug}>
        <Link href={`#${demo.slug}`}>{demo.title}</Link>
      </ListItem>
    );
  });

  return (
    <Root className={className}>
      <Title>Mineral UI</Title>
      <Heading>Components</Heading>
      <List>
        {demoLinks}
      </List>
    </Root>
  );
}