import React from "react";
import style from "./MovieActors.module.sass";
import Actor from "components/Actor/Actor";

function MovieActors({ data }: { data: any[] }) {
  return (
    <div className={style.container}>
      {data?.map((item: any, index: number) => (
        <div className={style.row} key={index}>
          <Actor
            image={item?.image}
            name={item?.name}
            character={item?.character}
          />
        </div>
      ))}
    </div>
  );
}

export default MovieActors;
