import { useState } from 'react';
import { DropdownItem, IconItem } from '../../main';
import { Dropdowns } from '../../dropdown/dropdown';
import style from './table-cell-text.module.scss';

type TableCellTextProps = {
  type?: 'text' | 'textWithIcon' | 'dropdown';
  icon?: React.ReactNode;
};

export const TableCellText = ({ type = 'text', icon }: TableCellTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>('Text');

  const labels = ['Text', 'Участник', 'Менеджер', 'Менеджер партнера'];

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (label: string) => {
    setSelected(label);
    setIsOpen(false);
  };

  const renderText = () => {
    return <span className={style['text']}>Text</span>;
  };

  const renderTextWithIcon = () => {
    return (
      <div className={style['text-with-icon']}>
        <span className={style['text']}>Text</span>
        <span className={style['icon']}>{icon || <IconItem className='icon' icon='copy' />}</span>
      </div>
    );
  };

  const renderDropdown = () => {
    return (
      <Dropdowns
        onToggle={handleToggle}
        nameDropdown={'Текст'}
        isOpen={isOpen}
        className={`${s.dropdown__toggle} ${s['dropdown_icon_' + (isOpen ? 'chevronUp' : 'chevronDown')]} ${s.dropdown__toggle_without_status} `}>
        {labels.map((label, index) => (
          <DropdownItem label={label} key={index} />
        ))}
      </Dropdowns>
    );
  };

  switch (type) {
    case 'text':
      return <div className={style['table-cell-text']}>{renderText()}</div>;
    case 'textWithIcon':
      return <div className={style['table-cell-text']}>{renderTextWithIcon()}</div>;
    case 'dropdown':
      return <div className={style['table-cell-text']}>{renderDropdown()}</div>;
    default:
      return null;
  }
};
