import style from "./LibraryItem.module.sass";
import Image from "components/Image/Image";
import { useNavigate } from "react-router-dom";

function LibraryItem({
  name,
  image,
  slug,
}: {
  name: string;
  image: any;
  slug?: string;
}) {
  const navigate = useNavigate();

  return (
    <div
      className={style.container}
      onClick={() => slug && navigate(`/games/${slug}`)}
    >
      <Image image={image} classname={style.image} />
      <div className={style.name}>{name}</div>
    </div>
  );
}

export default LibraryItem;
