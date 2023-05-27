import { FC, ReactNode } from 'react';

interface IButton {
  children: ReactNode;
}

const Button: FC<IButton> = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
