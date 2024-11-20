import { HTMLProps, PropsWithChildren, useEffect, useState, useRef } from 'react';
import clsx from 'clsx';

import s from './text-area.module.scss';

type TextAreaProps = PropsWithChildren<HTMLProps<HTMLTextAreaElement>> & {
  errorText?: string;
  maxLength?: number;
};

export const TextArea = ({ errorText, maxLength = 100, ...rest }: TextAreaProps) => {
  const [charCount, setCharCount] = useState(0);
  const [value, setValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [textAreaHeight, setTextAreaHeight] = useState(0); // для динамической высоты

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

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight + 10}px`;
      setTextAreaHeight(textAreaRef.current.scrollHeight);
    }
  }, [value]);

  return (
    <div className={clsx(s['text-area-container'], { [s.error]: !!errorText })}>
      <div className={s['textarea-wrapper']} style={{ minHeight: `${textAreaHeight}px` }}>
        <textarea
          ref={textAreaRef}
          cols={27}
          className={clsx(s['text-area'], { [s['text-area__error']]: !!errorText })}
          onChange={handleChange}
          maxLength={maxLength}
          value={value}
          {...rest}></textarea>
        <span className={s['character-count']} style={{ top: `${textAreaHeight - 20}px` }}>
          {charCount}/{maxLength}
        </span>
      </div>
      {errorText && <p className={s['error-text']}>{errorText}</p>}
    </div>
  );
};

export default TextArea;
