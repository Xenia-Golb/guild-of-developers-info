import { HTMLProps, PropsWithChildren } from 'react';
import clsx from 'clsx';

import s from './text-area/text-area.module.scss';

type TextAreaProps = PropsWithChildren<HTMLProps<HTMLTextAreaElement>> & {
    variant: 'normal ' | 'error' | 'filled'
    error?: boolean;
    helperText?: string;
};
export const TextArea = ({
    variant = 'default',
    error = false,
    helperText,
    children,
    ...rest
}: TextAreaProps) => {
    return (
        <div className={clsx(s['.text-area-container'], { [s.error]: error })}>
            <textarea className={clsx(s['text-area'], s[`text-area__variant__${variant}`])} {...rest}>
                {children}
            </textarea>
            <span class={s['character-count']}>0/100</span>
            {helperText && <p className={clsx(s['helper-text'], { [s['error-text']]: error })}>{helperText}</p>}
        </div>
    );
}

export default TextArea;