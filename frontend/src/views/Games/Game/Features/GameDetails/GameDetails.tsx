import React from "react";
import style from "./GameDetails.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

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
            <ImageTextRow image={item?.image} text={item?.name} />
          ))}
        </div>
      </div>
      <div className={style.content}>
        <span>Published by</span>
        <ImageTextRow image={publisher?.image} text={publisher?.name} />
      </div>
      <div className={style.content}>
        <span>Game's budget</span>
        <ImageTextRow image={budget?.image} text={budget?.budget_name} />
      </div>
      <div className={style.content}>
        <span>Age rating</span>
        <ImageTextRow image={esrb?.image} text={esrb?.rating_name} />
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
