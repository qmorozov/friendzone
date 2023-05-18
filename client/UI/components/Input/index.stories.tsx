import { Story, Meta } from '@storybook/react';
import Input, { IInput } from './index';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
