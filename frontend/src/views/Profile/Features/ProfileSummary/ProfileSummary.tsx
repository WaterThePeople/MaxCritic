import React from "react";
import style from "./ProfileSummary.module.sass";
import cn from "classnames";
import LoadingCard from "components/LoadingCard/LoadingCard";
import Score from "components/Score/Score";
import DefaultLink from "components/DefaultLink/DefaultLink";

function ProfileSummary({
  section,
  data,
  loading,
}: {
  section: string;
  data: any[];
  loading: boolean;
}) {
  const averageScore =
    (data?.reduce((sum, review) => sum + review.rating, 0) / data?.length) | 0;

  const positiveRatings = data?.filter((review) => review.rating >= 70);
  const mixedRatings = data?.filter(
    (review) => review.rating < 70 && review.rating > 35
  );
  const negativeRatings = data?.filter((review) => review.rating <= 35);
  const highestRatedReview = data?.reduce(
    (max, review) => (review.rating > max.rating ? review : max),
    data?.[0]
  );
  const lowestRatedReview = data?.reduce(
    (min, review) => (review.rating < min.rating ? review : min),
    data?.[0]
  );

  return (
    <div className={style.container}>
      <div className={style.title}>Overview of {section}</div>
      <div className={style.separator} />
      {data?.length > 0 ? (
        !loading ? (
          <div className={style.content}>
            <div className={style.left}>
              <span>{Math.floor(averageScore)}</span>
              <div className={style.text1}>Average Rating</div>
              <div className={style.text2}>
                Based on ({data?.length} reviews)
              </div>
            </div>
            <div className={style.right}>
              <div className={style.distribution_container}>
                <span>Score Distribution</span>
                <div className={style.distribution_row}>
                  <div className={style.distribution_text}>Positive</div>
                  <div className={style.distribution}>
                    <div
                      className={cn(style.color, style.green)}
                      style={{
                        width: `${Math.round(
                          (positiveRatings?.length / data?.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className={style.distribution_text}>
                    {positiveRatings?.length} (
                    {Math.round((positiveRatings?.length / data?.length) * 100)}
                    %)
                  </div>
                </div>
                <div className={style.distribution_row}>
                  <div className={style.distribution_text}>Mixed</div>
                  <div className={style.distribution}>
                    <div
                      className={cn(style.color, style.yellow)}
                      style={{
                        width: `${Math.round(
                          (mixedRatings?.length / data?.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className={style.distribution_text}>
                    {mixedRatings?.length} (
                    {Math.round((mixedRatings?.length / data?.length) * 100)}%)
                  </div>
                </div>
                <div className={style.distribution_row}>
                  <div className={style.distribution_text}>Negative</div>
                  <div className={style.distribution}>
                    <div
                      className={cn(style.color, style.red)}
                      style={{
                        width: `${Math.round(
                          (negativeRatings?.length / data?.length) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className={style.distribution_text}>
                    {negativeRatings?.length} (
                    {Math.round((negativeRatings?.length / data?.length) * 100)}
                    %)
                  </div>
                </div>
              </div>
              <div className={style.separator} />
              <div className={style.best_reviews}>
                <div className={style.best_reviews_item}>
                  <span>Highest Rating</span>
                  <DefaultLink
                    className={style.best_reviews_item_score}
                    to={`/games/${highestRatedReview?.game_slug}`}
                  >
                    <Score score={highestRatedReview?.rating} />
                    <span>{highestRatedReview?.game_name}</span>
                  </DefaultLink>
                </div>
                <div className={style.best_reviews_item}>
                  <span>Lowest Rating</span>
                  <DefaultLink
                    className={style.best_reviews_item_score}
                    to={`/games/${lowestRatedReview?.game_slug}`}
                  >
                    <Score score={lowestRatedReview?.rating} />
                    <span>{lowestRatedReview?.game_name}</span>
                  </DefaultLink>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <LoadingCard classname={style.loading} />
        )
      ) : (
        <div className={style.empty}>There isn't any data yet!</div>
      )}
    </div>
  );
}

export default ProfileSummary;
