import React, { useState, useEffect } from "react";
import style from "./InputPassword.module.sass";
import { Icon } from "components/Icon/Icon";

function InputPassword({
  label,
  password,
  setPassword,
}: {
  label: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.text}>{label}</div>
        <button className={style.button} onClick={() => setVisible(!visible)}>
          {!visible ? (
            <div className={style.button_row}>
              <Icon
                name={"eye"}
                size={18}
                className={style.svg}
                viewBox="0 0 20 20"
              />
              Show
            </div>
          ) : (
            <div className={style.button_row}>
              <Icon
                name={"eye_slashed"}
                size={18}
                className={style.svg}
                viewBox="0 0 20 20"
              />
              Hide
            </div>
          )}
        </button>
      </div>

      <input
        className={style.input}
        type={visible ? "" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}

export default InputPassword;
