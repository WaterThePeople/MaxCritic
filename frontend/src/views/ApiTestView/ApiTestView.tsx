import React, { useState, useEffect } from "react";
import style from "./ApiTestView.module.sass";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import LoadingCard from "components/LoadingCard/LoadingCard";

function ApiTestView() {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState<any[]>([]);

  const postReview = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}/api/games/reviews/create/`,
        {
          game_id: 1,
          rating: rating,
          description: description,
          platform: platform,
        },
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
      <input
        placeholder="platform"
        className={style.input}
        type="number"
        value={platform}
        onChange={(e) => setPlatform([parseInt(e.target.value)])}
      />
      <input
        placeholder="description"
        className={style.input}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        placeholder="rating"
        className={style.input}
        type="number"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
      />
      <button onClick={() => postReview()}>Post review</button>
      <LoadingCard classname={style.loading_card} spinnerSize={50} />
    </div>
  );
}

export default ApiTestView;
