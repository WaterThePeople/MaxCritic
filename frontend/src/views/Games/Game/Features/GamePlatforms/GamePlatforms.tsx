import React from "react";
import style from "./GamePlatforms.module.sass";
import Image from "components/Image/Image";

function GamePlatforms({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <div className={style.row} key={index}>
          <Image image={item?.image} classname={style.image} />
          {item?.platform_name}
        </div>
      ))}
    </div>
  );
}

export default GamePlatforms;
