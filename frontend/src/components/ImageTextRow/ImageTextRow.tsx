import React from "react";
import style from "./ImageTextRow.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";

function ImageTextRow({
  image,
  text,
  classname,
  selected,
  onClick,
}: {
  image: any;
  text: string;
  classname?: string;
  selected?: boolean;
  onClick?: Function;
}) {
  return onClick ? (
    <div
      className={cn(
        style.row,
        classname,
        selected && style.selected,
        onClick && style.clickable
      )}
      onClick={() => onClick()}
    >
      <Image image={image} classname={style.image} />
      {text}
    </div>
  ) : (
    <div className={cn(style.row, classname, selected && style.selected)}>
      <Image image={image} classname={style.image} />
      {text}
    </div>
  );
}

export default ImageTextRow;
