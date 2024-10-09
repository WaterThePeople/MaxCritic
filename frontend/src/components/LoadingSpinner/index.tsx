import React from "react";
import style from "./LoadingSpinner.module.sass";

const LoadingSpinner = ({ size = 25 }: { size?: number }) => {
  return (
    <div className={style.container}>
      <div
        className={style.spinner}
        style={{ height: size, width: size }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
