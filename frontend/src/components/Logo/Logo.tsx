import React from "react";
import style from "./Logo.module.sass";

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button className={style.logo} onClick={onClick}>
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
