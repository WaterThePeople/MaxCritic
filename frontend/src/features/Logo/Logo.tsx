import React from "react";
import style from "./Logo.module.sass";

function Logo() {
  return (
    <div className={style.container}>
      <div className={style.logo}>
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Logo"
          className={style.image}
        />
        <div className={style.text}>MaxCritic</div>
      </div>
      <div className={style.login}>
        Login
      </div>
    </div>
  );
}

export default Logo;