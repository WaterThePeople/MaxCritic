import React, { useState, useEffect } from "react";
import style from "./Navbar.module.sass";
import Logo from "components/Logo/Logo";
import NavbarButton from "components/NavbarButton/NavbarButton";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "utils/useWindowDimensions";
import cn from "classnames";
import DefaultButton from "components/DefaultButton/DefaultButton";

function Navbar({
  children,
  isAuth,
}: {
  children: React.ReactNode;
  isAuth: boolean;
}) {
  const navigate = useNavigate();

  const path = window.location.pathname;

  const { height, width } = useWindowDimensions();

  const [menuVisible, setMenuVisible] = useState(false);

  const [visibleNavbar, setVisibleNavbar] = useState(true);

  useEffect(() => {
    if (path === "/login") {
      setVisibleNavbar(false);
    } else if (path === "/register") {
      setVisibleNavbar(false);
    } else {
      setVisibleNavbar(true);
    }
  }, [path]);

  const logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return visibleNavbar ? (
    <div className={style.container}>
      <div className={style.container_top}>
        <div className={style.header}>
          <div className={style.corner_container}>
            <div className={style.button_container}>
              <button
                className={style.corner_button}
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <div className={style.corner_line} />
                <div className={style.corner_line} />
                <div className={style.corner_line} />
              </button>
            </div>
            <Logo onClick={() => navigate(`/`)} />
          </div>
          {isAuth ? (
            <DefaultButton
              text="Log out"
              onClick={() => logout()}
              classname={style.logout}
              classnameText={style.logout_text}
            />
          ) : (
            <button onClick={() => navigate(`/login`)} className={style.login}>
              Login
            </button>
          )}
        </div>
      </div>

      <div className={style.bottom_container}>
        <div
          className={
            menuVisible
              ? cn(style.container_left, style.container_left_open)
              : style.container_left
          }
        >
          <NavbarButton
            onClick={() => navigate(`/games`)}
            iconName="gamepad"
            size={width < 1000 ? 24 : 40}
            viewBox="-4 -3 32 32"
            title="Games"
          />
          <NavbarButton
            onClick={() => navigate(`/movies`)}
            iconName="movie"
            size={width < 1000 ? 24 : 40}
            viewBox="-13 -12 72 72"
            title="Movies"
          />
          <NavbarButton
            onClick={() => navigate(`/shows`)}
            iconName="tv"
            size={width < 1000 ? 24 : 40}
            viewBox="-6 -6 28 28"
            title="TV Shows"
          />
          <NavbarButton
            onClick={() => navigate(`/music`)}
            iconName="music"
            size={width < 1000 ? 24 : 40}
            viewBox="-5 -6 36 36"
            title="Music"
          />
        </div>
        {width > 600 ? (
          <div className={style.children_container}>{children}</div>
        ) : (
          !menuVisible && (
            <div className={style.children_container}>{children}</div>
          )
        )}
      </div>
    </div>
  ) : (
    <div className={style.children_container_auth}>{children}</div>
  );
}

export default Navbar;
