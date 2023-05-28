import { Story, Meta } from '@storybook/react';
import Tabs, { ITabs } from './index';

export default {
  title: 'Components/Tabs',
  component: Tabs,
} as Meta;

const Template: Story<ITabs> = (args: ITabs) => <Tabs {...args} />;

export const SingleTab = Template.bind({});
SingleTab.args = {
  options: [
    {
      id: '1',
      title: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
  ],
};

export const MultipleTabs = Template.bind({});
MultipleTabs.args = {
  options: [
    {
      id: '1',
      title: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      id: '2',
      title: 'Tab 2',
      content: <div>Content for Tab 2</div>,
    },
    {
      id: '3',
      title: 'Tab 3',
      content: <div>Content for Tab 3</div>,
    },
  ],
};

export const SelectedTab = Template.bind({});
SelectedTab.args = {
  options: [
    {
      id: '1',
      title: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      id: '2',
      title: 'Tab 2',
      content: <div>Content for Tab 2</div>,
    },
    {
      id: '3',
      title: 'Tab 3',
      content: <div>Content for Tab 3</div>,
    },
  ],
  selectedTabId: '2',
};

export const DisabledTab = Template.bind({});
DisabledTab.args = {
  options: [
    {
      id: '1',
      title: 'Tab 1',
      content: <div>Content for Tab 1</div>,
    },
    {
      id: '2',
      title: 'Tab 2',
      content: <div>Content for Tab 2</div>,
      disabled: true,
    },
    {
      id: '3',
      title: 'Tab 3',
      content: <div>Content for Tab 3</div>,
    },
  ],
};
