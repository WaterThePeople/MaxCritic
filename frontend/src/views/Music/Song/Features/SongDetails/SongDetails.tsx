import React from "react";
import style from "./SongDetails.module.sass";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import Date from "components/Date/Date";

function SongDetails({
  esrb,
  release_date,
  duration,
  production,
}: {
  esrb: any;
  release_date: any;
  duration: string;
  production: any;
}) {
  return (
    <div className={style.container}>
      <div className={style.content_row}>
        <span>Song Length:</span>
        {duration}
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

export default SongDetails;
