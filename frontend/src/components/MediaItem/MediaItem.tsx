import style from "./MediaItem.module.sass";
import Image from "components/Image/Image";
import { Icon } from "components/Icon/Icon";
import Score from "components/Score/Score";
import DefaultLink from "components/DefaultLink/DefaultLink";

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
  return (
    <div className={style.container}>
      <Image image={image} classname={style.image} />
      <DefaultLink className={style.name} to={`/games/${slug}`}>
        {name}
      </DefaultLink>
      <div className={style.separator} />
      <div className={style.row}>
        <div className={style.col}>
          <div className={style.type}>{type}</div>
          {slug && (
            <DefaultLink className={style.expand} to={`/games/${slug}`}>
              <div className={style.expand_text}>Expand</div>
              <Icon
                name={"basic_arrow"}
                className={style.svg}
                size={16}
                viewBox="4 4 24 24"
                rotate="270deg"
              />
            </DefaultLink>
          )}
        </div>

        <Score score={score} />
      </div>
    </div>
  );
}

export default MediaItem;
