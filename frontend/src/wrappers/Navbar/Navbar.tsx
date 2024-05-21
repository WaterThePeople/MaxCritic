import React, { useState, useEffect } from "react";
import style from "./Navbar.module.sass";
import Logo from "features/Logo/Logo";
import NavbarButton from "components/NavbarButton/NavbarButton";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "utils/useWindowDimensions";
import cn from "classnames";

function Navbar({ children }) {
  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();

  const [menuVisible, setMenuVisible] = useState(false);

  return (
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
          <button onClick={() => navigate(`/login`)} className={style.login}>
            Login
          </button>
        </div>
        {children}
      </div>
      <div
        className={
          menuVisible ? style.container_left_open : style.container_left
        }
      >
        <NavbarButton
          onClick={() => navigate(`/games`)}
          iconName="gamepad"
          size={width < 1000 ? 32 : 48}
          viewBox="-4 -3 32 32"
          isMenuOpen={menuVisible}
          title="Games"
        />
        <NavbarButton
          onClick={() => navigate(`/movies`)}
          iconName="movie"
          size={width < 1000 ? 32 : 42}
          viewBox="-8 -10 64 64"
          isMenuOpen={menuVisible}
          title="Movies"
        />
        <NavbarButton
          onClick={() => navigate(`/shows`)}
          iconName="tv"
          size={width < 1000 ? 32 : 48}
          viewBox="-6 -6 28 28"
          isMenuOpen={menuVisible}
          title="TV Shows"
        />
        <NavbarButton
          onClick={() => navigate(`/music`)}
          iconName="music"
          size={width < 1000 ? 32 : 48}
          viewBox="-5 -6 36 36"
          isMenuOpen={menuVisible}
          title="Music"
        />
      </div>
    </div>
  );
}

export default Navbar;
