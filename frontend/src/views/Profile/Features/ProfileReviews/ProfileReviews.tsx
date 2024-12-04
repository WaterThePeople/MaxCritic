import { useState } from "react";
import style from "./ProfileReviews.module.sass";
import LoadingCard from "components/LoadingCard/LoadingCard";
import ProfileGameReview from "./Features/ProfileGameReview/ProfileGameReview";
import ProfileMovieReview from "./Features/ProfileMovieReview/ProfileMovieReview";
import ProfileShowReview from "./Features/ProfileShowReview/ProfileShowReview";
import DefaultButton from "components/DefaultButton/DefaultButton";

function ProfileReviews({
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

  const Review = ({ item, index }: { item: any; index: number }) => {
    if (section === "Games") {
      return (
        <ProfileGameReview key={index} item={item} userReviewID={authorID} />
      );
    }
    if (section === "Movies") {
      return (
        <ProfileMovieReview key={index} item={item} userReviewID={authorID} />
      );
    }
    if (section === "TV Shows") {
      return (
        <ProfileShowReview key={index} item={item} userReviewID={authorID} />
      );
    }
    return null;
  };

  return (
    <div className={style.container}>
      <div className={style.title}>All Reviews of {section}</div>
      <div className={style.separator} />
      {!loading ? (
        <div className={style.content}>
          {data?.length > 0 ? (
            reverseArray(data)?.map((item: any, index: number) =>
              index <= limit - 1 ? (
                <Review key={index} item={item} index={index} />
              ) : null
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

export default ProfileReviews;
