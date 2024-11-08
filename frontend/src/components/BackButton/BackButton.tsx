import React, { useState, useEffect } from "react";
import style from "./BackButton.module.sass";
import { Icon } from "components/Icon/Icon";
import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <div className={style.container} onClick={() => navigate(-1)}>
      <Icon
        name={"arrow"}
        size={24}
        className={style.svg}
        viewBox="0 -5 32 32"
      />
      <div className={style.text}>Go back</div>
    </div>
  );
}

export default BackButton;
