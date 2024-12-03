import React, { useState, useEffect } from "react";
import style from "./Menu.module.sass";
import useWindowDimensions from "utils/useWindowDimensions";
import cn from "classnames";
import NavbarButton from "components/NavbarButton/NavbarButton";
import { useLocation } from "react-router-dom";

function Menu({ menuVisible }: { menuVisible: boolean }) {
  const { width } = useWindowDimensions();
  const location = useLocation();

  return (
    <div
      className={
        menuVisible
          ? cn(style.container, style.container_open)
          : style.container
      }
    >
      <NavbarButton
        href={`/games`}
        iconName="gamepad"
        size={width <= 1000 ? 24 : 40}
        viewBox="-4 -3 32 32"
        title="Games"
        isFocused={location.pathname === "/games"}
      />
      <div className={style.separator} />
      <NavbarButton
        href={`/movies`}
        iconName="movie"
        size={width <= 1000 ? 24 : 40}
        viewBox="-13 -12 72 72"
        title="Movies"
        isFocused={location.pathname === "/movies"}
      />
      <div className={style.separator} />
      <NavbarButton
        href={`/shows`}
        iconName="tv"
        size={width <= 1000 ? 24 : 40}
        viewBox="-6 -6 28 28"
        title="TV Shows"
        isFocused={location.pathname === "/shows"}
      />
      <div className={style.separator} />
      <NavbarButton
        href={`/music`}
        iconName="music"
        size={width <= 1000 ? 24 : 40}
        viewBox="-5 -6 36 36"
        title="Music"
        isFocused={location.pathname === "/music"}
      />
      <NavbarButton
        href={`/search`}
        iconName="search"
        size={width <= 1000 ? 24 : 40}
        viewBox="-8 -8 40 40"
        title="Search"
        isFocused={location.pathname === "/search"}
      />
      <div className={style.separator} />
    </div>
  );
}

export default Menu;
