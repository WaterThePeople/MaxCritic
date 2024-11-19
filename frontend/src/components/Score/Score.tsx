import style from "./Score.module.sass";
import cn from "classnames";

function Score({ score, scale }: { score: number; scale?: boolean }) {
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
    <div className={cn(style.score, scoreColor(score), scale && style.scale)}>
      {score}
    </div>
  );
}

export default Score;
