import { ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import s from './table-cell.module.scss';

type TableCellProps = {
  children?: ReactNode;
  type?: 'headline' | 'text' | 'status' | 'button';
  icon?: 'clip' | 'moreVert' | 'iconAttach' | 'chevronDown' | 'chevronUp' | 'copy';
  onIconClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
};

export function TableCell({ children, type = 'text', className }: TableCellProps) {
  const paddingClass = clsx({
    [s['padding-headline']]: type === 'headline',
    [s['padding-text']]: type === 'text',
    [s['padding-status']]: type === 'status',
    [s['padding-button']]: type === 'button',
  });

  return <div className={clsx(s['table-cell'], paddingClass, className)}>{children}</div>;
}
