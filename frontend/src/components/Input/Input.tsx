import React, { useState, useEffect } from "react";
import style from "./Input.module.sass";

function Input({
  label,
  value,
  setValue,
  maxLength = 250,
  readOnly = false,
  disabled = false,
}: {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  maxLength?: number;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={style.container}>
      <div className={style.text}>{label}</div>
      <input
        className={style.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        readOnly={readOnly}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
