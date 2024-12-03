import style from "./LibraryItem.module.sass";
import Image from "components/Image/Image";
import DefaultLink from "components/DefaultLink/DefaultLink";

function LibraryItem({
  name,
  image,
  slug,
}: {
  name: string;
  image: any;
  slug?: string;
}) {
  return (
    <DefaultLink className={style.container} to={slug ? slug : ""}>
      <Image image={image} classname={style.image} />
      <div className={style.name}>{name}</div>
    </DefaultLink>
  );
}

export default LibraryItem;
