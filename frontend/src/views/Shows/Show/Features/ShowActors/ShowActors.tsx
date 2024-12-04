import React from "react";
import style from "./ShowActors.module.sass";
import Actor from "components/Actor/Actor";

function ShowActors({ data }: { data: any[] }) {
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

export default ShowActors;
