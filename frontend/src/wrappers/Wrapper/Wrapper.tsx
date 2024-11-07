import React, { useState, useEffect } from "react";
import style from "./Wrapper.module.sass";
import Navbar from "wrappers/Wrapper/Features/Navbar/Navbar";
import Menu from "wrappers/Wrapper/Features/Menu/Menu";
import cn from "classnames";
import { useLocation } from "react-router-dom";
import useWindowDimensions from "utils/useWindowDimensions";

function Wrapper({
  children,
  isAuth,
}: {
  children: React.ReactNode;
  isAuth: boolean;
}) {
  const [menuVisible, setMenuVisible] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (menuVisible && width <= 600) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuVisible]);

  const [visibleNavbar, setVisibleNavbar] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setVisibleNavbar(false);
    } else if (location.pathname === "/register") {
      setVisibleNavbar(false);
    } else {
      setVisibleNavbar(true);
    }
    setMenuVisible(false);
  }, [location]);

  return visibleNavbar ? (
    <div className={style.container}>
      <Navbar isAuth={isAuth} setMenuVisible={setMenuVisible} />
      <div className={cn(style.content)}>
        <Menu menuVisible={menuVisible} />
        <div className={menuVisible ? style.inner_menu_open : style.inner}>
          {children}
        </div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={cn(style.inner_full)}>{children}</div>
    </div>
  );
}

export default Wrapper;
