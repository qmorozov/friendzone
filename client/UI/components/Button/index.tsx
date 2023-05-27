import { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { classnames } from '../../../services/helper';

import styles from './index.module.scss';

export enum ButtonVariant {
  fill = 'fill',
  border = 'border',
}

type ButtonVariantString = keyof typeof ButtonVariant;

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  classes?: string;
  children: ReactNode;
  variant?: ButtonVariantString;
}

const Button: FC<IButton> = ({
  children,
  icon = false,
  classes,
  variant = ButtonVariant.fill,
  ...rest
}) => {
  const wrapperClasses = classnames({
    [styles.btn]: true,
    [styles[variant]]: true,
  });

  return (
    <button className={`${wrapperClasses} ${classes}`} {...rest}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
