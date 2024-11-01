import React from "react";
import style from "./View.module.sass";

function View({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.container}>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default View;
