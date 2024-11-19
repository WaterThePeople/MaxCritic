import React from "react";
import style from "./GamesListView.module.sass";
import MediaItemList from "components/MediaItemList/MediaItemList";
import LoadingCard from "components/LoadingCard/LoadingCard";

function GamesListView({
  data,
  loading,
  pageSize,
}: {
  data: any[];
  loading: boolean;
  pageSize: number;
}) {
  return (
    <div className={style.container}>
      {loading ? (
        [...Array(pageSize)]?.map((item: any, index: number) => (
          <LoadingCard classname={style.loading_card} key={index} />
        ))
      ) : data?.length > 0 ? (
        data?.map((item: any, index: number) => (
          <MediaItemList
            key={index}
            name={item?.name}
            image={item?.image}
            score={item?.score}
            date={item?.release_date}
            slug={item?.slug}
            description={item?.description}
          />
        ))
      ) : (
        <div className={style.no_data}>We couldn't find any data!</div>
      )}
    </div>
  );
}

export default GamesListView;
