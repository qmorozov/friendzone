import { Story, Meta } from '@storybook/react';

import Button, { IButton, ButtonVariant } from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: Object.values(ButtonVariant),
      },
    },
    disabled: {
      control: 'boolean',
    },
    icon: {
      control: false,
    },
    children: {
      control: 'text',
    },
  },
} as Meta;

const Template: Story<IButton> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Button with Icon',
  icon: <i className="icon-class" />,
};

export const VariantFill = Template.bind({});
VariantFill.args = {
  children: 'Button Variant Fill',
  variant: ButtonVariant.fill,
};

export const VariantBorder = Template.bind({});
VariantBorder.args = {
  children: 'Button Variant Border',
  variant: ButtonVariant.border,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Button disabled',
  disabled: true,
};
