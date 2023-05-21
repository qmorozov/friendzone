import { Story, Meta } from '@storybook/react';

import Input, { IInput } from './index';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    defaultValue: { control: { disable: true } },
    type: { control: 'radio' },
  },
} as Meta;

const InputTemplate: Story<IInput> = (args: IInput) => <Input {...args} />;

export const Default: Story<IInput> = InputTemplate.bind({});
Default.args = {
  label: 'Input Label',
  required: false,
  disabled: false,
  defaultValue: '',
};

export const Disabled: Story<IInput> = InputTemplate.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Required: Story<IInput> = InputTemplate.bind({});
Required.args = {
  ...Default.args,
  required: true,
};

export const WithoutLabel: Story<IInput> = InputTemplate.bind({});
WithoutLabel.args = {
  ...Default.args,
  label: '',
};

export const Checkbox: Story<IInput> = InputTemplate.bind({});
Checkbox.args = {
  label: 'Checkbox Label',
  type: 'checkbox',
  required: false,
  disabled: false,
  checked: true,
};

export const Radio: Story<IInput> = InputTemplate.bind({});
Radio.args = {
  label: 'Radio Label',
  type: 'radio',
  required: false,
  disabled: false,
};
