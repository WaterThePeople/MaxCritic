import React from "react";
import style from "./Logo.module.sass";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link className={style.logo} to={"/"}>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="Logo"
        className={style.image}
      />
      <div className={style.text}>MaxCritic</div>
    </Link>
  );
}

export default Logo;
