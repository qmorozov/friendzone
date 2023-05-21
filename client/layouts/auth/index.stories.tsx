import { Story, Meta } from '@storybook/react';

import AuthLayout, { IAuthLayout } from './index';

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  argTypes: {
    children: { control: 'text' },
  },
} as Meta;

const Template: Story<IAuthLayout> = (args: IAuthLayout) => (
  <AuthLayout {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Auth',
  children: (
    <div>
      <h1>AuthLayout Example</h1>
      <p>This is an example of AuthLayout component.</p>
    </div>
  ),
};
