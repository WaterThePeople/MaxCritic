import React from "react";
import style from "./View.module.sass";
import cn from "classnames";
import BackButton from "components/BackButton/BackButton";

function View({
  children,
  background,
  backButton,
}: {
  children: React.ReactNode;
  background?: boolean;
  backButton?: boolean;
}) {
  return (
    <div className={cn(style.container, background && style.background)}>
      <div className={cn(style.content, style.content_button)}>
        {children}
        {backButton && (
          <div className={style.button}>
            <BackButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
