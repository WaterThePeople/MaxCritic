import React from "react";
import style from "./GameDetails.module.sass";
import Image from "components/Image/Image";

function GameDetails({
  developers,
  publisher,
  budget,
  esrb,
  release_date,
}: {
  developers: any[];
  publisher: any;
  budget: any;
  esrb: any;
  release_date: any;
}) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <span>Developed by</span>
        <div className={style.developers}>
          {developers?.map((item: any, index: number) => (
            <div className={style.row} key={index}>
              <Image image={item?.image} classname={style.image} />
              {item?.name}
            </div>
          ))}
        </div>
      </div>
      <div className={style.content}>
        <span>Published by</span>
        <div className={style.row}>
          <Image image={publisher?.image} classname={style.image} />
          {publisher?.name}
        </div>
      </div>
      <div className={style.content}>
        <span>Game's budget</span>
        <div className={style.row}>
          <Image image={budget?.image} classname={style.image} />
          {budget?.budget_name}
        </div>
      </div>
      <div className={style.content}>
        <span>Age rating</span>
        <div className={style.row}>
          <Image image={esrb?.image} classname={style.image} />
          {esrb?.rating_name}
        </div>
      </div>
      <div className={style.released_on}>
        <div className={style.released_on_row}>
          <span>Released </span>
          <div className={style.released_on_box}>
            {release_date?.split("-")[2]}
          </div>
          <div className={style.released_on_box}>
            {release_date?.split("-")[1]}
          </div>
          <div className={style.released_on_box}>
            {release_date?.split("-")[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;
