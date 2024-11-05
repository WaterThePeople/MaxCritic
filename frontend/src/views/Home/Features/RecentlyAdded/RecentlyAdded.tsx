import style from "./RecentlyAdded.module.sass";
import HorizontalScroll from "components/HorizontalScroll/HorizontalScroll";
import MediaItem from "components/MediaItem/MediaItem";

function RecentlyAdded({ items }: { items: any[] }) {
  return (
    <div className={style.container}>
      <div className={style.title}>Recently added</div>
      <div className={style.separator} />
      <HorizontalScroll>
        {items.map((item: any, index: number) => (
          <MediaItem
            key={index}
            name={item?.name}
            image={item?.image}
            type={item?.type}
            score={item?.score}
          />
        ))}
      </HorizontalScroll>
    </div>
  );
}

export default RecentlyAdded;
