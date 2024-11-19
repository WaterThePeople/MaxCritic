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
  slug,
}: {
  name: string;
  description: string;
  image: any;
  date: string;
  score: number;
  slug?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={style.container}
      onClick={() => slug && navigate(`/games/${slug}`)}
    >
      <Image image={image} classname={style.image} />
      <div className={style.content}>
        <div className={style.row}>
          <div className={style.text_container}>
            <div className={style.name}>{name}</div>
            <div className={style.description}>{description}</div>
          </div>
          <Score score={score} scale />
        </div>
        <Date date={date} />
      </div>
    </div>
  );
}

export default MediaItemList;
