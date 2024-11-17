import React, { useState, useEffect } from "react";
import style from "./Modal.module.sass";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";

function Modal({
  children,
  visible,
  setVisible,
}: {
  children: React.ReactNode;
  visible?: boolean;
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={style.modal}>
      {setVisible ? (
        <OutsideClickHandler onClickOutside={() => setVisible(false)}>
          {children}
        </OutsideClickHandler>
      ) : (
        children
      )}
    </div>
  );
}

export default Modal;
