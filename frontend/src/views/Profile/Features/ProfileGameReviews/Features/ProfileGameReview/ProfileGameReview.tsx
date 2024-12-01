import { useState } from "react";
import style from "./ProfileGameReview.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import Score from "components/Score/Score";
import Modal from "components/Modal/Modal";
import EditGameReview from "components/EditGameReview/EditGameReview";
import DefaultLink from "components/DefaultLink/DefaultLink";

function ProfileGameReview({
  item,
  userReviewID,
}: {
  item: any;
  userReviewID?: number;
}) {
  const [editReviewModal, setEditReviewModal] = useState(false);
  console.log(item);

  return (
    <div className={style.item}>
      <div className={style.row}>
        <div className={style.column}>
          {`${item?.date.split("-")[2]}.${item?.date.split("-")[1]}.${
            item?.date.split("-")[0]
          }`}
          <DefaultLink
            className={style.game_name}
            to={`/games/${item?.game_slug}`}
          >
            {item?.game_name}
          </DefaultLink>
          {userReviewID === item?.author?.id && (
            <DefaultButton
              text="Edit review"
              onClick={() => setEditReviewModal(true)}
              classname={style.game_review}
            />
          )}
        </div>
        <Score score={item?.rating} scale />
      </div>
      <div className={style.description}>{item?.description} </div>
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
      <Modal setVisible={setEditReviewModal} visible={editReviewModal}>
        <EditGameReview platforms={item?.game_platforms} data={item} />
      </Modal>
    </div>
  );
}

export default ProfileGameReview;
