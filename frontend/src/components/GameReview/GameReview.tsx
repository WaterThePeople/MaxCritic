import style from "./GameReview.module.sass";
import User from "components/User/User";
import cn from "classnames";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";

function GameReview({ item }: { item: any }) {
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
    <div className={style.item}>
      <div className={style.row}>
        <div className={style.column}>
          {`${item?.date.split("-")[2]}.${item?.date.split("-")[1]}.${
            item?.date.split("-")[0]
          }`}
          <User user={item?.author} />
        </div>
        <div className={cn(style.score, scoreColor(item?.rating))}>
          {item?.rating}
        </div>
      </div>
      <div className={style.description}>{item?.description}</div>
      <div className={style.separator} />
      <div className={style.content}>
        <span>Played on</span>
        <div className={style.platforms}>
          {item?.platform?.map((item: any, index: number) => (
            <ImageTextRow
              classname={style.platform}
              image={item?.image}
              text={item?.platform_name}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameReview;
