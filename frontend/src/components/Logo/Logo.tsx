import React from "react";
import style from "./Logo.module.sass";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();
  return (
    <button className={style.logo} onClick={() => navigate("/")}>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="Logo"
        className={style.image}
      />
      <div className={style.text}>MaxCritic</div>
    </button>
  );
}

export default Logo;
