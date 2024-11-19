import style from "./Date.module.sass";

function Date({ date }: { date: string }) {
  return (
    <div className={style.container}>
      <span>Released </span>
      <div className={style.item}>{date?.split("-")[2]}</div>
      <div className={style.item}>{date?.split("-")[1]}</div>
      <div className={style.item}>{date?.split("-")[0]}</div>
    </div>
  );
}

export default Date;
