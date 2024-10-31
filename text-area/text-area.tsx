import { HTMLProps, PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';

import s from './text-area.module.scss';

type TextAreaProps = PropsWithChildren<HTMLProps<HTMLTextAreaElement>> & {
    variant?: 'normal' | 'error' | 'active';
    error?: boolean;
    label?: string;
    helperText?: string;
    maxLength?: number;
};
export const TextArea = ({
    variant = 'normal',
    error = false,
    helperText,
    children,
    maxLength = 100,
    ...rest
}: TextAreaProps) => {
    const [charCount, setCharCount] = useState(0);
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value;

        if (newValue.length <= maxLength) {
            setValue(newValue);
            setCharCount(newValue.length);
        }
        if (rest.onChange) {
            rest.onChange(event);
        }
    };

    useEffect(() => {
        if (rest.value) {
            setValue(rest.value as string);
            setCharCount((rest.value as string).length);
        }
    }, [rest.value]);
    {
        return (
            <div className={clsx(s['text-area-container'], { [s.error]: error })}>
                <textarea
                    className={clsx(s['text-area'], s[`text-area__variant__${variant}`])}
                    onChange={handleChange}
                    maxLength={maxLength}
                    value={value}
                    {...rest}>
                    {children}
                </textarea>
                <span className={s['character-count']}>
                    {' '}
                    {charCount}/{maxLength}
                </span>
                {helperText && <p className={s['error-text']}>{helperText}</p>}
            </div>
        );
    }
};

export default TextArea;
