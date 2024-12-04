import React from "react";
import style from "./MovieDetails.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import Date from "components/Date/Date";

function MovieDetails({
  esrb,
  release_date,
  duration,
  director,
  writers,
  production,
}: {
  esrb: any;
  release_date: any;
  duration: string;
  director: any;
  writers: any;
  production: any;
}) {
  return (
    <div className={style.container}>
      <div className={style.content_row}>
        <span>Duration:</span>
        {duration}
      </div>
      <div className={style.content}>
        <span>Directed by</span>
        <div className={style.developers}>
          {director?.map((item: any, index: number) => (
            <ImageTextRow image={item?.image} text={item?.name} key={index} />
          ))}
        </div>
      </div>
      <div className={style.content}>
        <span>Written by</span>
        <div className={style.developers}>
          {writers?.map((item: any, index: number) => (
            <ImageTextRow image={item?.image} text={item?.name} key={index} />
          ))}
        </div>
      </div>
      <div className={style.content}>
        <span>Production:</span>
        <ImageTextRow image={production?.image} text={production?.name} />
      </div>
      <div className={style.content}>
        <span>Age rating</span>
        <ImageTextRow image={esrb?.image} text={esrb?.rating_name} />
      </div>
      <Date date={release_date} />
    </div>
  );
}

export default MovieDetails;
