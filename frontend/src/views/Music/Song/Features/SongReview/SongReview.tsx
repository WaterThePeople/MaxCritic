import style from "./SongReview.module.sass";
import User from "components/User/User";
import DefaultButton from "components/DefaultButton/DefaultButton";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import Score from "components/Score/Score";

function SongReview({
  item,
  userReviewID,
  openReviewModal,
}: {
  item: any;
  userReviewID?: number;
  openReviewModal?: Function;
}) {
  return (
    <div className={style.item}>
      <div className={style.row}>
        <div className={style.column}>
          {`${item?.date.split("-")[2]}.${item?.date.split("-")[1]}.${
            item?.date.split("-")[0]
          }`}
          <div className={style.user_row}>
            <User
              user={item?.author}
              classname={style.user}
              href={`/profile/${item?.author?.username}`}
            />
            {userReviewID === item?.id && (
              <DefaultButton
                text="Your review"
                onClick={() => openReviewModal && openReviewModal()}
                classname={style.review}
              />
            )}
          </div>
        </div>
        <Score score={item?.rating} scale />
      </div>
      <div className={style.description}>{item?.description}</div>
      <div className={style.separator} />
      <div className={style.content}>
        <span>Played on</span>
        <div className={style.platforms}>
          {item?.platform?.map((item: any, index: number) => (
            <ImageTextRow
              classname={style.platform}
              image={item?.image}
              text={item?.platform_name}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SongReview;
