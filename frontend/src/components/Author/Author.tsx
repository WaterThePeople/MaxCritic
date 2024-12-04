import style from "./Author.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";

function Author({ image, name }: { image: any; name: string }) {
  return (
    <div className={cn(style.column)}>
      <Image image={image} classname={cn(style.image)} />
      <div className={style.content}>
        <div className={style.name}>{name}</div>
      </div>
    </div>
  );
}

export default Author;
