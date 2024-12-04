import style from "./Actor.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";

function Actor({
  image,
  name,
  character,
}: {
  image: any;
  name: string;
  character: string;
}) {
  return (
    <div className={cn(style.column)}>
      <Image image={image} classname={cn(style.image)} />
      <div className={style.content}>
        <div className={style.name}>{name}</div>
        <div className={style.character}>{character}</div>
      </div>
    </div>
  );
}

export default Actor;
