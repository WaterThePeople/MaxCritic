import style from "./SearchBarItemFull.module.sass";
import Image from "components/Image/Image";
import Date from "components/Date/Date";
import DefaultLink from "components/DefaultLink/DefaultLink";

function SearchBarItemFull({
  name,
  image,
  date,
  slug,
  type,
}: {
  name: string;
  image: any;
  date: string;
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
      return `/music/${slug}`;
    } else {
      return "/";
    }
  };

  return (
    <DefaultLink className={style.container} to={returnCurrentType()}>
      <Image image={image} classname={style.image} />
      <div className={style.content}>
        <div className={style.name}>{name}</div>
        <Date date={date} />
        <div className={style.type}>{type}</div>
      </div>
    </DefaultLink>
  );
}

export default SearchBarItemFull;
