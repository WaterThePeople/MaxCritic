import React, { useState, useEffect } from "react";
import style from "./MediaItem.module.sass";
import Image from "components/Image/Image";

function MediaItem({
  name,
  image,
  type,
  score,
}: {
  name: string;
  image: any;
  type: string;
  score: number;
}) {
  return (
    <div className={style.container}>
      <Image image={image} classname={style.image} />
      <div className={style.name}>{name}</div>
      <div className={style.separator} />
      <div className={style.row}>
        <div className={style.type}>{type}</div>
        <div className={style.score}>{score}</div>
      </div>
    </div>
  );
}

export default MediaItem;
