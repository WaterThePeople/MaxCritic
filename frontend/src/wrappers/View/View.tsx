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
  background?: "default" | "green" | "purple" | "yellow" | "blue";
  backButton?: boolean;
}) {
  const classes = cn(style.square, {
    [style.default]: background === "default",
    [style.blue]: background === "blue",
    [style.green]: background === "green",
    [style.yellow]: background === "yellow",
    [style.purple]: background === "purple",
  });

  return (
    <div className={cn(style.container, background && classes)}>
      <div className={cn(style.content, backButton && style.content_button)}>
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
