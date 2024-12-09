import React, { useState } from "react";
import style from "./SongReviews.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import SongReview from "../SongReview/SongReview";

function SongReviews({
  data,
  userReviewID,
  openReviewModal,
}: {
  data: [];
  userReviewID?: number;
  openReviewModal?: Function;
}) {
  const [limit, setLimit] = useState(5);
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
            index <= limit - 1 && (
              <SongReview
                key={index}
                item={item}
                userReviewID={userReviewID}
                openReviewModal={openReviewModal}
              />
            )
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

export default SongReviews;
