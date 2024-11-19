import style from "./MediaItem.module.sass";
import Image from "components/Image/Image";
import { useNavigate } from "react-router-dom";
import { Icon } from "components/Icon/Icon";
import Score from "components/Score/Score";

function MediaItem({
  name,
  image,
  type,
  score,
  slug,
}: {
  name: string;
  image: any;
  type: string;
  score: number;
  slug?: string;
}) {
  const navigate = useNavigate();

  return (
    <div className={style.container}>
      <Image image={image} classname={style.image} />
      <div
        className={style.name}
        onClick={() => slug && navigate(`/games/${slug}`)}
      >
        {name}
      </div>
      <div className={style.separator} />
      <div className={style.row}>
        <div className={style.col}>
          <div className={style.type}>{type}</div>
          {slug && (
            <div
              className={style.expand}
              onClick={() => navigate(`/games/${slug}`)}
            >
              <div className={style.expand_text}>Expand</div>
              <Icon
                name={"basic_arrow"}
                className={style.svg}
                size={16}
                viewBox="4 4 24 24"
                rotate="270deg"
              />
            </div>
          )}
        </div>

        <Score score={score} />
      </div>
    </div>
  );
}

export default MediaItem;
