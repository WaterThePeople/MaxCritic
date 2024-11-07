import { useRef } from "react";
import style from "./RecentlyAdded.module.sass";
import HorizontalScroll, {
  HorizontalScrollRef,
} from "components/HorizontalScroll/HorizontalScroll";
import MediaItem from "components/MediaItem/MediaItem";
import { Icon } from "components/Icon/Icon";

function RecentlyAdded({ items }: { items: any[] }) {
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
    </div>
  );
}

export default RecentlyAdded;
