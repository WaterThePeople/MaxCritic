import style from "./MediaItemList.module.sass";
import Image from "components/Image/Image";
import { useNavigate } from "react-router-dom";
import Score from "components/Score/Score";
import Date from "components/Date/Date";

function MediaItemList({
  name,
  description,
  image,
  date,
  score,
  url,
  inLibrary,
}: {
  name: string;
  description: string;
  image: any;
  date: string;
  score: number;
  url?: string;
  inLibrary?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className={style.container} onClick={() => url && navigate(url)}>
      <Image image={image} classname={style.image} />
      <div className={style.content}>
        <div className={style.row}>
          <div className={style.text_container}>
            <div className={style.name}>{name}</div>
            <div className={style.description}>{description}</div>
          </div>
          <Score score={score} scale />
        </div>
        <div className={style.bottom_row}>
          <Date date={date} />
          {inLibrary && <div className={style.library}>In library</div>}
        </div>
      </div>
    </div>
  );
}

export default MediaItemList;
