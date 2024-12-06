import { useState } from 'react';
import clsx from 'clsx'; // Убедитесь, что clsx установлен
import { DropdownItem } from '../../main';
import { Dropdowns } from '../../dropdown/dropdown';
import style from './table-cell-text.module.scss'; // Убедитесь, что путь правильный

export const TableCellText = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>('Text'); // Выбранный элемент

  const labels = ['Text', 'Участник', 'Менеджер', 'Менеджер партнера']; // Список элементов

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (label: string) => {
    setSelected(label);
    setIsOpen(false);
  };

  return (
    <div className={style['table-cell-text']}>
      <Dropdowns
        onToggle={handleToggle}
        nameDropdown={selected}
        isOpen={isOpen}
        className={clsx(style['table-cell-dropdown'], {
          [style['dropdown-open']]: isOpen,
        })}>
        {labels.map((label, index) => (
          <DropdownItem
            key={index}
            label={label}
            className={clsx(style['dropdown-item'], {
              [style['dropdown-item-selected']]: label === selected,
            })}
            onClick={() => handleSelect(label)}
          />
        ))}
      </Dropdowns>
    </div>
  );
};
