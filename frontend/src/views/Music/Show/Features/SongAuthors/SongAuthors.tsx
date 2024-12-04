import React from "react";
import style from "./SongAuthors.module.sass";
import Author from "components/Author/Author";

function SongAuthors({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <div className={style.row} key={index}>
          <Author image={item?.image} name={item?.name} />
        </div>
      ))}
    </div>
  );
}

export default SongAuthors;
