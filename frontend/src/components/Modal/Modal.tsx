import React, { useState, useEffect } from "react";
import style from "./Modal.module.sass";

function Modal({
  children,
  visible,
  setVisible,
}: {
  children: React.ReactNode;
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return <div className={style.modal}>{children}</div>;
}

export default Modal;
