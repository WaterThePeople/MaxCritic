import style from "./NavbarButton.module.sass";
import { Icon } from "components/Icon/Icon";
import cn from "classnames";

function NavbarButton({
  iconName,
  size = 48,
  viewBox = "0 0 48 48",
  onClick,
  title = "",
  isFocused = false,
}: {
  iconName: string;
  size?: number;
  viewBox?: string;
  onClick: () => void;
  title?: string;
  isFocused?: boolean;
}) {
  return (
    <button
      className={cn(style.container, isFocused && style.container_focused)}
      onClick={onClick}
    >
      <div className={style.row}>
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
      </div>
      <Icon
        name={"arrow"}
        size={24}
        className={style.arrow}
        viewBox="0 -6 32 32"
      />
    </button>
  );
}

export default NavbarButton;
