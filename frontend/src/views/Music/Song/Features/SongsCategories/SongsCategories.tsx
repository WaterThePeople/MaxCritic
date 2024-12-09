import React from "react";
import style from "./SongsCategories.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function SongsCategories({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <div className={style.row} key={index}>
          <ImageTextRow image={item?.image} text={item?.category_name} />
        </div>
      ))}
    </div>
  );
}

export default SongsCategories;
