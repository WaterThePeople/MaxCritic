import React from "react";
import style from "./NavbarButton.module.sass";
import { Icon } from "components/Icon/Icon";

function NavbarButton({
  iconName,
  size = 48,
  viewBox = "0 0 48 48",
  onClick,
  title = "",
}: {
  iconName: string;
  size?: number;
  viewBox?: string;
  onClick: () => void;
  title?: string;
}) {
  return (
    <button className={style.container} onClick={onClick}>
      <div className={style.icon_container}>
        <div className={style.icon}>
          <Icon
            name={iconName}
            size={size}
            viewBox={viewBox}
            className={style.svg}
          />
        </div>
      </div>
      <div className={style.title}>{title}</div>
    </button>
  );
}

export default NavbarButton;
