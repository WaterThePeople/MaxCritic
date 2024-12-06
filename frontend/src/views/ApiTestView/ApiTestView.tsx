import React, { useState, useEffect, useCallback } from "react";
import style from "./ApiTestView.module.sass";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import Image from "components/Image/Image";
import Cropper from "react-easy-crop";

import ImageCropper from "components/ImageCropper/ImageCropper";

function ApiTestView() {
  const [image, setImage] = useState<string | null>(null);

  const changePhoto = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .put(
        `${serverPath}api/user/image/`,
        { image: image },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeUsername = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .put(
        `${serverPath}api/user/username/`,
        { new_username: "admin" },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.title}>THIS VIEW IS FOR TESTING API CALLS ONLY</div>
      <button onClick={changePhoto}>change photo</button>

      {image && (
        <div>
          <h2>Cropped Image:</h2>
          <Image image={image} />
        </div>
      )}
    </div>
  );
}

export default ApiTestView;
