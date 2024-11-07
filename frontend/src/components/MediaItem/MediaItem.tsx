import style from "./MediaItem.module.sass";
import Image from "components/Image/Image";
import cn from "classnames";

function MediaItem({
  name,
  image,
  type,
  score,
}: {
  name: string;
  image: any;
  type: string;
  score: number;
}) {
  const scoreColor = (x: number) => {
    if (x >= 70) {
      return style.green;
    }
    if (x < 70 && x > 35) {
      return style.yellow;
    }
    if (x <= 35) {
      return style.red;
    }
  };

  return (
    <div className={style.container}>
      <Image image={image} classname={style.image} />
      <div className={style.name}>{name}</div>
      <div className={style.separator} />
      <div className={style.row}>
        <div className={style.type}>{type}</div>
        <div className={cn(style.score, scoreColor(score))}>{score}</div>
      </div>
    </div>
  );
}

export default MediaItem;
