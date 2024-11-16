import React from "react";
import style from "./GameCategories.module.sass";
import Image from "components/Image/Image";

function GameCategories({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <div className={style.row} key={index}>
          <Image image={item?.image} classname={style.image} />
          {item?.category_name}
        </div>
      ))}
    </div>
  );
}

export default GameCategories;
