import { forwardRef, useState } from 'react';
import { Input } from './input';
import { InputProps } from './input';
import s from './input.module.scss';

export const PasswordInput = forwardRef<
  HTMLInputElement,
  Omit<InputProps, 'icon' | 'type' | 'onIconClick'>
>(({ ...rest }, forwardRef) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleShowPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className={s['input-container']}>
      <Input
        {...rest}
        ref={forwardRef}
        type={isPasswordVisible ? 'text' : 'password'}
        onIconClick={toggleShowPassword}
        icon={isPasswordVisible ? 'state-On' : 'state-Off'}
      />
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
