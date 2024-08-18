import React, { useState, useEffect } from "react";
import style from "./BackButton.module.sass";
import { Icon } from "components/Icon/Icon";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className={style.container} onClick={() => navigate(-1)}>
      <div className={style.icon}>
        <Icon
          name={"arrow"}
          size={24}
          className={style.svg}
          viewBox="0 -6 32 32"
        />
      </div>
      <div className={style.text}>Go back</div>
    </button>
  );
}

export default BackButton;
