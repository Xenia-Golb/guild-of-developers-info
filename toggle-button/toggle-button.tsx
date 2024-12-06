import style from "./toggle-button.module.scss";

type ToggleButtonProps = {
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
};

export function ToggleButton({
  onClick,
  isActive,
  children,
}: ToggleButtonProps) {
  return (
    <button
      className={`${style["toggle-button"]} ${
        isActive ? style["toggle-button__active"] : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
