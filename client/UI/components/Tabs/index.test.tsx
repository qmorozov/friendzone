import { render, fireEvent } from '@testing-library/react';
import Tabs, { ITab } from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Tabs', () => {
  const tabs: ITab[] = [
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
  ];

  it('renders the tabs correctly', () => {
    const { getByText } = render(<Tabs options={tabs} />);

    tabs.forEach((tab) => {
      expect(getByText(tab.title)).toBeInTheDocument();
    });
  });

  it('displays the correct content when a tab is clicked', () => {
    const { getByText, queryByText } = render(<Tabs options={tabs} />);

    fireEvent.click(getByText('Tab 2'));

    expect(getByText('Content for Tab 2')).toBeInTheDocument();
    expect(queryByText('Content for Tab 1')).toBeNull();
    expect(queryByText('Content for Tab 3')).toBeNull();
  });
});
