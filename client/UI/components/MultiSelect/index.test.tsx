import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import MultiSelect from './index';

const options = [
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
];

test('renders MultiSelect component', () => {
  render(<MultiSelect options={options} onSelect={jest.fn()} />);

  const multiSelectElement = screen.getByText('Writing');
  expect(multiSelectElement).toBeInTheDocument();

  options.forEach((option) => {
    const optionElement = screen.getByLabelText(option.name);
    expect(optionElement).toBeInTheDocument();
  });
});
