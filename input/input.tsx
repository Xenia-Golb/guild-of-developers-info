import { ComponentPropsWithoutRef, MouseEvent, forwardRef } from 'react';
import clsx from 'clsx';

import s from './input.module.scss';

export type InputProps = ComponentPropsWithoutRef<'input'> & {
    type: 'text' | 'password';
    label: string;
    error?: boolean;
    placeholder?: string;
    extraClass?: string;
    onIconClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    icon?: 'show' | 'hide';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            error = false,
            placeholder,
            extraClass = '',
            className,
            type = 'text',
            value,
            onIconClick,
            disabled = false,
            icon,
            ...rest
        },
        ref,
    ) => (
        <div className={clsx(s['input-container'], extraClass)}>
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
            {icon && onIconClick && (
                <button type='button' onClick={onIconClick} className={s['icon-button']}>
                    {icon === 'show' ? '👁️' : '🙈'}
                </button>
            )}
        </div>
    ),
);

Input.displayName = 'Input';
