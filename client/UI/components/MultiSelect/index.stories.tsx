import { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import MultiSelect, { IMultiSelect, IMultiSelectItem } from './index';

export default {
  title: 'Components/MultiSelect',
  component: MultiSelect,
} as Meta;

const Template: Story<IMultiSelect> = (args: IMultiSelect) => {
  const [selectedItems, setSelectedItems] = useState<IMultiSelectItem[]>([]);

  const handleSelect = (selected: IMultiSelectItem[]) => {
    setSelectedItems(selected);
  };

  return (
    <>
      <MultiSelect {...args} onSelect={handleSelect} />
      <p>Selected items:</p>
      <ul>
        {selectedItems.map(({ id, name }: IMultiSelectItem) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      id: '61bfb821c5a11c8f480163d1',
      name: 'Reading',
    },
    {
      id: '61bfb821c5a11c8f480163d2',
      name: 'Painting',
    },
    {
      id: '61bfb821c5a11c8f480163d3',
      name: 'Playing Guitar',
    },
    {
      id: '61bfb821c5a11c8f480163d4',
      name: 'Cooking',
    },
    {
      id: '61bfb821c5a11c8f480163d5',
      name: 'Gardening',
    },
    {
      id: '61bfb821c5a11c8f480163d6',
      name: 'Photography',
    },
    {
      id: '61bfb821c5a11c8f480163d7',
      name: 'Hiking',
    },
    {
      id: '61bfb821c5a11c8f480163d8',
      name: 'Playing Chess',
    },
    {
      id: '61bfb821c5a11c8f480163d9',
      name: 'Dancing',
    },
    {
      id: '61bfb821c5a11c8f480163da',
      name: 'Writing',
    },
  ],
};
