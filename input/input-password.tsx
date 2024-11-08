import { forwardRef, useState } from 'react';
import { Input } from './input';
import { InputProps } from './input';

export const PasswordInput = forwardRef<
    HTMLInputElement,
    Omit<InputProps, 'icon' | 'type' | 'onIconClick'>
>(({ ...rest }, forwardRef) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    function toggleShowPassword() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <Input
            {...rest}
            type={isPasswordVisible ? 'text' : 'password'}
            icon={isPasswordVisible ? 'hide' : 'show'}
            onIconClick={toggleShowPassword}
            ref={forwardRef}
        />
    );
});

PasswordInput.displayName = 'PasswordInput';
