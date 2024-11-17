import React, { useState } from "react";
import style from "./GameReviews.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import GameReview from "components/GameReview/GameReview";

function GameReviews({ data }: { data: [] }) {
  const [limit, setLimit] = useState(5);
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

  const handleMoreReviews = () => {
    setLimit(data?.length);
  };

  const reverseArray = (array: []) => {
    let temp = [];

    for (let i = array?.length - 1; i >= 0; i--) {
      temp.push(array[i]);
    }

    return temp;
  };

  return (
    <div className={style.container}>
      {data?.length > 0 ? (
        reverseArray(data)?.map(
          (item: any, index: number) =>
            index <= limit - 1 && <GameReview key={index} item={item} />
        )
      ) : (
        <div className={style.no_data}>There aren't any reviews yet!</div>
      )}
      {limit < data?.length && (
        <DefaultButton
          onClick={handleMoreReviews}
          text={`Load the Rest of the Reviews (${data?.length - limit})`}
        />
      )}
    </div>
  );
}

export default GameReviews;
