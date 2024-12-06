import { ComponentPropsWithoutRef, MouseEvent, forwardRef } from 'react';
import clsx from 'clsx';
import s from './input.module.scss';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
  type: 'text' | 'password';
  label?: string;
  error?: boolean;
  placeholder?: string;
  onIconClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  active?: boolean;
  icon?: 'close' | 'state-Off' | 'state-On';
  theme?: 'light' | 'dark';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error = false,
      placeholder,
      className,
      type = 'text',
      value,
      disabled = false,
      icon,
      onIconClick,
      theme = 'light',
      ...rest
    },
    ref,
  ) => (
    <div className={clsx(s['input-container'], s[`input-container--${theme}`])}>
      <label className={clsx(s['input-label'], { [s['input-label-disabled']]: disabled })}>
        {label}
      </label>
      <input
        ref={ref}
        className={clsx(s['input'], className, { [s['input-error']]: error })}
        value={value}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...rest}
      />
      {icon && (
        <span
          className={clsx(s.icon, {
            [s[`input_icon_${icon}`]]: icon,
          })}
          onClick={onIconClick}
        />
      )}
    </div>
  ),
);

Input.displayName = 'Input';
