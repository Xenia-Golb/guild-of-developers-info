import { ReactNode, MouseEvent } from 'react';
import clsx from 'clsx';
import s from './table-cell.module.scss';

type TableCellProps = {
  children?: ReactNode;
  type?: 'headline' | 'text' |  'status' | 'button';
  isBig?: boolean;
  isActive?: boolean;
  icon?: 'clip' | 'moreVert' | 'iconAttach'| 'chevronDown' | 'chevronUp' | 'copy'; 
  onIconClick?: (e: MouseEvent<HTMLButtonElement>) => void; 
  className?: string;
};

export function TableCell({
  children,
  type = 'text',
  isBig = false,
  isActive = false,
//   icon,
//   onIconClick,
  className,
}: TableCellProps) {

  const paddingClass = clsx({
    [s['padding-headline']]: type === 'headline',
    [s['padding-text']]: type === 'text',
    [s['padding-status']]: type === 'status',
    [s['padding-button']]: type === 'button',
  });

  const borderClass = clsx({
    [s['border-bottom-big']]: isBig,
    [s['border-bottom-small']]: !isBig,
  });

  return (
    <div
      className={clsx(s['table-cell'], paddingClass, borderClass, className, {
        [s['active']]: isActive,
      })}
    >
      {children}

      {/* {type === 'button' && icon && (
        <button
          onClick={onIconClick}
          className={clsx(s.button, `button_icon_${icon}`)}
          title={icon}
        ></button>
      )} */}
    </div>
  );
}
