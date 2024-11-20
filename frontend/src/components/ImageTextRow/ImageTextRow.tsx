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
  small,
}: {
  image: any;
  text: string;
  classname?: string;
  selected?: boolean;
  onClick?: Function;
  small?: boolean;
}) {
  return onClick ? (
    <div
      className={cn(
        style.row,
        classname,
        selected && style.selected,
        onClick && style.clickable,
        small && style.small
      )}
      onClick={() => onClick()}
    >
      <Image image={image} classname={cn(style.image, small && style.small)} />
      {text}
    </div>
  ) : (
    <div
      className={cn(
        style.row,
        classname,
        selected && style.selected,
        small && style.small
      )}
    >
      <Image image={image} classname={cn(style.image, small && style.small)} />
      {text}
    </div>
  );
}

export default ImageTextRow;
