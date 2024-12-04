import { useState } from "react";
import style from "./ProfileSongReview.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Score from "components/Score/Score";
import Modal from "components/Modal/Modal";
import EditReview from "components/EditReview/EditReview";
import DefaultLink from "components/DefaultLink/DefaultLink";

function ProfileSongReview({
  item,
  userReviewID,
}: {
  item: any;
  userReviewID?: number;
}) {
  const [editReviewModal, setEditReviewModal] = useState(false);

  return (
    <div className={style.item}>
      <div className={style.row}>
        <div className={style.column}>
          {`${item?.date.split("-")[2]}.${item?.date.split("-")[1]}.${
            item?.date.split("-")[0]
          }`}
          <DefaultLink className={style.name} to={`/songs/${item?.song_slug}`}>
            {item?.song_name}
          </DefaultLink>
          {userReviewID === item?.author?.id && (
            <DefaultButton
              text="Edit review"
              onClick={() => setEditReviewModal(true)}
              classname={style.review}
            />
          )}
        </div>
        <Score score={item?.rating} scale />
      </div>
      <div className={style.description}>{item?.description} </div>
      <Modal setVisible={setEditReviewModal} visible={editReviewModal}>
        <EditReview
          data={item}
          url="api/songs/review/edit/"
          deleteUrl="api/songs/review/delete/"
        />
      </Modal>
    </div>
  );
}

export default ProfileSongReview;
