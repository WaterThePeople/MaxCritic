import React from "react";
import style from "./ProfileTab.module.sass";
import cn from "classnames";

function ProfileTab({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: Function;
}) {
  return (
    <div
      className={cn(style.label, selected && style.selected)}
      onClick={() => onClick()}
    >
      {label}
    </div>
  );
}

export default ProfileTab;
