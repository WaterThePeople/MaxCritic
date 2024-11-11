import { useRef } from "react";
import style from "./RecentlyAdded.module.sass";
import HorizontalScroll, {
  HorizontalScrollRef,
} from "components/HorizontalScroll/HorizontalScroll";
import MediaItem from "components/MediaItem/MediaItem";
import { Icon } from "components/Icon/Icon";
import LoadingCard from "components/LoadingCard/LoadingCard";

function RecentlyAdded({ items, loading }: { items: any[]; loading: boolean }) {
  const horizontalScrollRef = useRef<HorizontalScrollRef>(null);

  return (
    <div className={style.container}>
      <div className={style.row}>
        <div className={style.title}>Recently added</div>
        <div className={style.buttons}>
          <button
            className={style.button}
            onClick={() => horizontalScrollRef.current?.scrollLeft()}
          >
            <Icon
              name={"basic_arrow"}
              className={style.svg}
              viewBox="4 4 24 24"
              rotate="90deg"
            />
          </button>
          <button
            className={style.button}
            onClick={() => horizontalScrollRef.current?.scrollRight()}
          >
            <Icon
              name={"basic_arrow"}
              className={style.svg}
              viewBox="4 4 24 24"
              rotate="270deg"
            />
          </button>
        </div>
      </div>
      <div className={style.separator} />
      {loading ? (
        <HorizontalScroll ref={horizontalScrollRef}>
          {[...Array(8)].map((item: any, index: number) => (
            <LoadingCard key={index} classname={style.loading_card} />
          ))}
        </HorizontalScroll>
      ) : (
        <HorizontalScroll ref={horizontalScrollRef}>
          {items.map((item: any, index: number) => (
            <MediaItem
              key={index}
              name={item?.name}
              image={item?.image}
              type={item?.type}
              score={item?.score}
              slug={item?.slug}
            />
          ))}
        </HorizontalScroll>
      )}
    </div>
  );
}

export default RecentlyAdded;
