import React from "react";
import style from "./Section.module.sass";
import cn from "classnames";

function Section({
  children,
  title,
  sectionColor = "default",
}: {
  children: React.ReactNode;
  title: string;
  sectionColor?: "default" | "green" | "red" | "yellow" | "blue";
}) {
  const squareClasses = cn(style.square, {
    [style.default]: sectionColor === "default",
    [style.red]: sectionColor === "red",
    [style.green]: sectionColor === "green",
    [style.yellow]: sectionColor === "yellow",
    [style.blue]: sectionColor === "blue",
  });

  return (
    <div className={style.container}>
      <div className={style.title_row}>
        <div className={squareClasses} />
        <div className={style.title}>{title}</div>
      </div>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default Section;
