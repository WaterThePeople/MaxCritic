import React from "react";
import style from "./MovieDetails.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import Date from "components/Date/Date";

function MovieDetails({
  esrb,
  release_date,
}: {
  esrb: any;
  release_date: any;
}) {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <span>Developed by</span>
        {/* <div className={style.developers}>
          {developers?.map((item: any, index: number) => (
            <ImageTextRow image={item?.image} text={item?.name} key={index} />
          ))}
        </div> */}
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
