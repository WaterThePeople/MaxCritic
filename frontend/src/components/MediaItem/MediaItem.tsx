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
  const returnCurrentType = () => {
    if (type === "Game") {
      return `/games/${slug}`;
    } else if (type === "Movie") {
      return `/movies/${slug}`;
    } else if (type === "TV Show") {
      return `/shows/${slug}`;
    } else if (type === "Song") {
      return `/songs/${slug}`;
    } else {
      return "/";
    }
  };
  return (
    <div className={style.container}>
      <Image image={image} classname={style.image} />
      <DefaultLink className={style.name} to={returnCurrentType()}>
        {name}
      </DefaultLink>
      <div className={style.separator} />
      <div className={style.row}>
        <div className={style.col}>
          <div className={style.type}>{type}</div>
          {slug && (
            <DefaultLink className={style.expand} to={returnCurrentType()}>
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
