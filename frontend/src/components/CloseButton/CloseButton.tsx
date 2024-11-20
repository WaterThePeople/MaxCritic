import React, { useState, useEffect } from "react";
import style from "./CloseButton.module.sass";
import { Icon } from "components/Icon/Icon";

function CloseButton({ onClick }: { onClick: Function }) {
  return (
    <div className={style.container} onClick={() => onClick()}>
      <Icon
        name={"plus"}
        className={style.svg}
        viewBox="0 0 24 24"
        rotate="45deg"
      />
    </div>
  );
}

export default CloseButton;
