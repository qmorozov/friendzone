import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Input from './index';

describe('Input component', () => {
  it('renders', () => {
    const { container } = render(<Input />);
    expect(container).toBeInTheDocument();
  });

  it('applies "required" style when required prop is true', () => {
    const { container } = render(<Input required />);
    const label = container.querySelector('label');
    expect(label).toHaveClass('required');
  });

  it('applies "disabled" style when disabled prop is true', () => {
    const { container } = render(<Input disabled />);
    const label = container.querySelector('label');
    expect(label).toHaveClass('disabled');
  });

  it('applies "checkbox" style when type prop is "checkbox"', () => {
    const { container } = render(<Input type="checkbox" />);
    const label = container.querySelector('label');
    expect(label).toHaveClass('checkbox');
  });

  it('renders label text when label prop is provided', () => {
    const { getByText } = render(<Input label="Test" />);
    const labelText = getByText('Test');
    expect(labelText).toBeInTheDocument();
  });

  it('does not render label text when label prop is not provided', () => {
    const { queryByText } = render(<Input />);
    const labelText = queryByText('Test');
    expect(labelText).not.toBeInTheDocument();
  });
});
