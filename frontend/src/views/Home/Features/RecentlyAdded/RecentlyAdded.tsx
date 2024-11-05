import style from "./RecentlyAdded.module.sass";
import HorizontalScroll from "components/HorizontalScroll/HorizontalScroll";
import Image from "components/Image/Image";

function RecentlyAdded({ items }: { items: any[] }) {
  return (
    <div className={style.container}>
      <div className={style.title}>Recently added</div>
      <div className={style.separator} />
      <HorizontalScroll>
        {items.map((item: any, index: number) => (
          <div key={index} className={style.item}>
            <Image image={item?.image} classname={style.image}/>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
}

export default RecentlyAdded;
