import React, { useState, useEffect } from "react";
import style from "./Header.module.sass";
import Logo from "features/Logo/Logo";

function Header({ children }) {
  return (
    <div className={style.container}>
      <Logo />
      {children}
    </div>
  );
}

export default Header;
