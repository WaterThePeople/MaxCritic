import { useState, useEffect } from "react";
import style from "./GameDetail.module.sass";
import View from "wrappers/View/View";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { serverPath } from "BackendServerPath";

function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>();

  const getGameData = async () => {
    axios
      .get(`${serverPath}api/games/${slug}/`, {})
      .then((response) => {
        setGame(response?.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/");
      });
  };

  useEffect(() => {
    getGameData();
  }, []);

  const getYoutubeEmbededURL = (link: string) => {
    return link?.split("https://www.youtube.com/watch?v=")[1];
  };

  return (
    <View background={true}>
      <div className={style.container}>
        <div className={style.row}>
          <iframe
            className={style.video}
            src={`https://www.youtube.com/embed/${getYoutubeEmbededURL(
              game?.youtube_video
            )}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className={style.info}>
            <div className={style.name}>{game?.name}</div>
          </div>
        </div>
      </div>
    </View>
  );
}

export default GameDetail;
