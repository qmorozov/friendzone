import { render, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input component', () => {
  test('should update input value correctly', () => {
    const labelText = 'Username';
    const inputValue = 'testUser';
    const { getByLabelText } = render(<Input label={labelText} />);
    const inputElement = getByLabelText(labelText) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(inputElement.value).toBe(inputValue);
  });
});
