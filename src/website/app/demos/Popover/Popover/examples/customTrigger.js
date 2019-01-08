/* @flow */

import { createStyledComponent } from '../../../../../../library/styles';
import { Reference } from 'react-popper';
import Popover from '../../../../../../library/Popover';
import DemoContent from '../../common/DemoContent';
import renderPropsDescription from '../../../common/renderPropsDescription';

export default {
  id: 'custom-trigger',
  title: 'Custom Trigger',
  description: `Use the \`children\` render prop to provide custom rendering
control of the trigger. ${renderPropsDescription}`,
  scope: {
    createStyledComponent,
    DemoContent,
    Popover,
    Reference
  },
  source: `
    () => {
      // Your render function must return a Popper Reference component.
      // import { Reference } from 'react-popper';
      const CustomTrigger = createStyledComponent('button', {});      

      return (
        <Popover content={<DemoContent />}>
          {
            ({ props, state }) => {
              return (
                <Reference>
                  {({ ref }) => {
                    const triggerProps = {
                      ...props,
                      ref,
                      role: undefined
                    }

                    return (
                      <CustomTrigger {...triggerProps}>
                        Popover <span role="img" aria-hidden="true">{state.isOpen ? '▲' : '▼'}</span>
                      </CustomTrigger>
                    );
                  }}
                </Reference>
              );
            }
          }
        </Popover>
      );
    }`
};
