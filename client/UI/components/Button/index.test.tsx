import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from './index';

describe('Button', () => {
  it('renders button with children', () => {
    const { getByText } = render(<Button>Hello</Button>);
    const buttonElement = getByText('Hello');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button with icon and children', () => {
    const { getByText, getByTestId } = render(
      <Button icon={<i data-testid="test-icon" />}>Button with Icon</Button>
    );
    const buttonElement = getByText('Button with Icon');
    const iconElement = getByTestId('test-icon');
    expect(buttonElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
  });

  it('calls onClick callback when button is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Button onClick={onClickMock}>Click me</Button>
    );
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies additional props to the button element', () => {
    const { getByText } = render(<Button id="my-button">Custom Button</Button>);
    const buttonElement = getByText('Custom Button');
    expect(buttonElement).toHaveAttribute('id', 'my-button');
  });
});
