import React, { useState, useEffect, useCallback, useRef } from "react";
import style from "./ImageCropper.module.sass";
import Modal from "components/Modal/Modal";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Cropper from "react-easy-crop";

function ImageCropper({
  setCroppedImage,
  onSuccess,
}: {
  setCroppedImage: React.Dispatch<React.SetStateAction<string | null>>;
  onSuccess: Function;
}) {
  const [visible, setVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
          setVisible(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const image = await loadImage(imageSrc);

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
    }
    const croppedBase64 = canvas.toDataURL("image/jpeg").split(",")[1];
    setCroppedImage(croppedBase64);
    setImageSrc("");
    setVisible(false);
    onSuccess(croppedBase64);
  };

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  };

  return (
    <>
      <DefaultButton text="Change Profile Image" onClick={triggerFileInput} />
      <input
        type="file"
        value={""}
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <Modal setVisible={setVisible} visible={visible}>
        <div className={style.container}>
          {imageSrc && (
            <div className={style.content}>
              <DefaultButton text="Upload Image" onClick={getCroppedImage} />
              <Cropper
                image={imageSrc}
                crop={crop}
                onCropChange={setCrop}
                cropShape="rect"
                aspect={1}
                onCropComplete={onCropComplete}
                classes={{ containerClassName: style.cropper_container }}
              />
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

export default ImageCropper;
