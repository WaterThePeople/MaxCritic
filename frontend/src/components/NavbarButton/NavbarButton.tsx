import React from "react";
import style from "./NavbarButton.module.sass";
import { Icon } from "components/Icon/Icon";
import cn from "classnames";

function NavbarButton({
  iconName,
  size = 48,
  viewBox = "0 0 48 48",
  onClick,
  isMenuOpen = false,
  title = "",
}: {
  iconName: string;
  size?: number;
  viewBox?: string;
  onClick: () => void;
  isMenuOpen?: boolean;
  title?: string;
}) {
  return (
    <button
      className={isMenuOpen ? cn(style.container, style.open) : style.container}
      onClick={onClick}
    >
      <div className={style.icon}>
        <Icon
          name={iconName}
          size={size}
          viewBox={viewBox}
          className={style.svg}
        />
      </div>
      {isMenuOpen && <div className={style.title}>{title}</div>}
    </button>
  );
}

export default NavbarButton;
