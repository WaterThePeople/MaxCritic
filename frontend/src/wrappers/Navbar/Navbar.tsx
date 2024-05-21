import React, { useState, useEffect } from "react";
import style from "./Navbar.module.sass";
import Logo from "features/Logo/Logo";
import { Icon } from "components/SvgIcons/Icon";

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
        <Icon name="gamepad" fill="white" size={64} viewBox="-4 -4 32 32" />
        <Icon name="gamepad" fill="white" size={64} viewBox="-4 -4 32 32" />
        <Icon name="gamepad" fill="white" size={64} viewBox="-4 -4 32 32" />
        <Icon name="gamepad" fill="white" size={64} viewBox="-4 -4 32 32" />
        <Icon name="gamepad" fill="white" size={64} viewBox="-4 -4 32 32" />
      </div>
    </div>
  );
}

export default Navbar;
