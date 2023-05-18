import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';
import '@testing-library/jest-dom/extend-expect';

describe('Input component', () => {
  test('renders without errors', () => {
    render(<Input />);
  });

  test('handles input change', () => {
    const { getByLabelText } = render(<Input label="Test" />);
    const input = getByLabelText('Test') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test value' } });

    expect(input.value).toBe('test value');
  });

  test('applies "required" style when required prop is true', () => {
    const { container } = render(<Input label="Test" required />);
    const label = container.querySelector('label');

    expect(label).toHaveClass('required');
  });

  test('applies "disabled" style when disabled prop is true', () => {
    const { container } = render(<Input label="Test" disabled />);
    const label = container.querySelector('label');

    expect(label).toHaveClass('disabled');
  });

  test('applies "checkbox" style when type prop is "checkbox"', () => {
    const { container } = render(<Input label="Test" type="checkbox" />);
    const label = container.querySelector('label');

    expect(label).toHaveClass('checkbox');
  });

  test('renders label text when label prop is provided', () => {
    const { getByText } = render(<Input label="Test" />);
    const labelText = getByText('Test');

    expect(labelText).toBeInTheDocument();
  });

  test('does not render label text when label prop is not provided', () => {
    const { queryByText } = render(<Input />);
    const labelText = queryByText('Test');

    expect(labelText).toBeNull();
  });
});
