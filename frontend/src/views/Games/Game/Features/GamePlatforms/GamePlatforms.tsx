import React from "react";
import style from "./GamePlatforms.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function GamePlatforms({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <ImageTextRow
          image={item?.image}
          text={item?.platform_name}
          key={index}
          small
        />
      ))}
    </div>
  );
}

export default GamePlatforms;
