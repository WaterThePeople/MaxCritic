import React from "react";
import style from "./View.module.sass";
import cn from "classnames";

function View({
  children,
  background,
}: {
  children: React.ReactNode;
  background?: boolean;
}) {
  return (
    <div className={cn(style.container, background && style.background)}>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default View;
