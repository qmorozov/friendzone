import { ChangeEvent, FC, InputHTMLAttributes, useState } from 'react';
import st from './index.module.scss';

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input: FC<IInput> = ({ label, ...inputProps }) => {
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <label
      title={`input ${label}`}
      className={`${st.wrapper} ${value ? st.full : ''}`}
    >
      <input
        type="text"
        value={value}
        {...inputProps}
        onChange={handleChange}
      />
      {label && <p>{label}</p>}
    </label>
  );
};

export default Input;
