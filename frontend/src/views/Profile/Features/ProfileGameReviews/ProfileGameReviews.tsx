import { useState } from "react";
import style from "./ProfileGameReviews.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import ProfileGameReview from "./Features/ProfileGameReview/ProfileGameReview";
import DefaultButton from "components/DefaultButton/DefaultButton";

function ProfileGameReviews({
  section,
  data,
  loading,
  authorID,
}: {
  section: string;
  data: [];
  loading: boolean;
  authorID: number;
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
      <div className={style.title}>All Reviews of {section}</div>
      <div className={style.separator} />
      {!loading ? (
        <div className={style.content}>
          {data?.length > 0 ? (
            reverseArray(data)?.map(
              (item: any, index: number) =>
                index <= limit - 1 && (
                  <ProfileGameReview
                    key={index}
                    item={item}
                    userReviewID={authorID}
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
      ) : (
        <LoadingCard classname={style.loading} />
      )}
    </div>
  );
}

export default ProfileGameReviews;
