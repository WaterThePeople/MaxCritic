import style from "./SearchBarItem.module.sass";
import Image from "components/Image/Image";
import DefaultLink from "components/DefaultLink/DefaultLink";

function SearchBarItem({
  name,
  image,
  date,
  score,
  slug,
  type,
}: {
  name: string;
  image: any;
  date: string;
  score: number;
  slug: string;
  type: string;
}) {
  const returnCurrentType = () => {
    if (type === "Game") {
      return `/games/${slug}`;
    } else if (type === "Movie") {
      return `/movies/${slug}`;
    } else if (type === "TV Show") {
      return `/shows/${slug}`;
    } else if (type === "Music") {
      return `/songs/${slug}`;
    } else {
      return "/";
    }
  };

  return (
    <DefaultLink className={style.container} to={returnCurrentType()}>
      <Image image={image} classname={style.image} />
      <div className={style.content}>
        <div className={style.name}>{name}</div>
        <div className={style.type}>{type}</div>
      </div>
    </DefaultLink>
  );
}

export default SearchBarItem;
