import React, { useState, useEffect } from "react";
import style from "./Navbar.module.sass";
import Logo from "features/Logo/Logo";

function Navbar({ children }) {
  return (
    <div className={style.container}>
      <div className={style.container_top}>
        <div className={style.header}>
          <Logo />
          <div className={style.login}>Login</div>
        </div>
        {children}
      </div>
      <div className={style.container_left}>
        
      </div>
    </div>
  );
}

export default Navbar;
