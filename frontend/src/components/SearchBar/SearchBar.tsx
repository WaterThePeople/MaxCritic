import React from "react";
import style from "./SearchBar.module.sass";
import { Icon } from "components/Icon/Icon";
import cn from "classnames";

function SearchBar({
  value,
  setValue,
  open,
  setOpen,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={style.container}>
      <input
        className={cn(style.input, open ? style.open : style.open_not_given)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setOpen && setOpen(true)}
      />
      <Icon name={"search"} className={style.svg} viewBox="0 0 24 24" />
    </div>
  );
}

export default SearchBar;
