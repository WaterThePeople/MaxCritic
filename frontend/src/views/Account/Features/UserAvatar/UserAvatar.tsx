import React, { useState } from "react";
import style from "./UserAvatar.module.sass";
import Image from "components/Image/Image";
import DefaultButton from "components/DefaultButton/DefaultButton";
import ImageCropper from "components/ImageCropper/ImageCropper";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import LoadingCard from "components/LoadingCard/LoadingCard";

function UserAvatar({
  loading,
  image,
  setImage,
  changePhoto,
  removePhoto,
}: {
  loading: boolean;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<any>>;
  changePhoto: Function;
  removePhoto: Function;
}) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  return loading ? (
    <LoadingCard classname={style.loading} />
  ) : (
    <div className={style.container}>
      <span>Your Avatar</span>
      {image ? (
        <Image classname={style.image} image={image ? image : ""} />
      ) : (
        <img
          src={process.env.PUBLIC_URL + "../assets/default_avatar.png"}
          alt="Avatar"
          className={style.image}
        />
      )}
      <div className={style.row}>
        <ImageCropper setCroppedImage={setImage} onSuccess={changePhoto} />

        {confirmDeleteVisible ? (
          <OutsideClickHandler
            onClickOutside={() => setConfirmDeleteVisible(false)}
          >
            <DefaultButton
              text="Click again to delete"
              onClick={() => {
                removePhoto();
                setConfirmDeleteVisible(false);
              }}
              classname={style.delete_button_confirm}
              classnameText={style.delete_button_text_confirm}
            />
          </OutsideClickHandler>
        ) : (
          <DefaultButton
            text="Remove your Avatar"
            onClick={() => setConfirmDeleteVisible(true)}
            classname={style.delete_button}
            classnameText={style.delete_button_text}
          />
        )}
      </div>
    </div>
  );
}

export default UserAvatar;
