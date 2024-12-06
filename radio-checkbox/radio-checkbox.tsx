import { useState } from "react";
import s from "./radio-checkbox.module.scss";

type RadioCheckBoxProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const RadioCheckBox = ({ onChange, ...props }: RadioCheckBoxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={s["radio-checkbox"]}>
      <input
        type="radio"
        className={s["radio-checkbox__hidden"]}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      <span
        className={`${s["radio-checkbox__custom"]} ${
          isChecked ? s["radio-checkbox__custom_checked"] : ""
        }`}
      ></span>
    </div>
  );
};
