import React, { useState, useEffect } from "react";
import style from "./Input.module.sass";

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className={style.container}>
      <div className={style.text}>{label}</div>
      <input
        className={style.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
