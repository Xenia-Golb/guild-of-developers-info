import { ToggleButton } from "./toogle-button";
import style from "./toggle-button.module.scss";
import { Pagination } from "../main";
import { useState } from "react";

type ToggleGroupProps = {
  maxItems: number;
  items: number;
};
export function ToggleButtonGroup({ maxItems, items }: ToggleGroupProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(items);

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={style["toggle-button-group"]}>
      <div className={style["button-group"]}>
        <div className={style["button-group__text"]}>Показать: </div>
        <ToggleButton
          onClick={() => handleItemsPerPageChange(items)}
          isActive={itemsPerPage === items}
        >
          {items}
        </ToggleButton>
        <ToggleButton
          onClick={() => handleItemsPerPageChange(items * 2)}
          isActive={itemsPerPage === items * 2}
        >
          {items * 2}
        </ToggleButton>
        <ToggleButton
          onClick={() => handleItemsPerPageChange(items * 3)}
          isActive={itemsPerPage === items * 3}
        >
          {items * 3}
        </ToggleButton>
      </div>

      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />

      <div className={style["toggle-button-group__text"]}>
        Строк: {itemsPerPage} из
        <span className={style["text-bold"]}>{maxItems}</span>
      </div>
    </div>
  );
}
