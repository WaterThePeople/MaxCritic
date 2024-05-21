import React, { useState, useEffect } from "react";
import style from "./View.module.sass";

function View({ children }) {
  return <div className={style.container}>{children}</div>;
}

export default View;
