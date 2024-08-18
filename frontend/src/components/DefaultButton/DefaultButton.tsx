import React, { useState, useEffect } from "react";
import style from "./DefaultButton.module.sass";

function DefaultButton({
  onClick,
  text,
  classname,
  classnameText,
}: {
  onClick: Function;
  text: string;
  classname?: any;
  classnameText?: any;
}) {
  return (
    <button
      className={classname ? classname : style.container}
      onClick={() => onClick()}
    >
      <div className={classnameText ? classnameText : style.text}>{text}</div>
    </button>
  );
}

export default DefaultButton;
