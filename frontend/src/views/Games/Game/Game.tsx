import { useState, useEffect } from "react";
import style from "./Game.module.sass";
import View from "wrappers/View/View";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Image from "components/Image/Image";
import cn from "classnames";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { Icon } from "components/Icon/Icon";
import LoadingCard from "components/LoadingCard/LoadingCard";
import Section from "components/Section/Section";
import GameCategories from "./Features/GameCategories/GameCategories";
import GamePlatforms from "./Features/GamePlatforms/GamePlatforms";
import GameDetails from "./Features/GameDetails/GameDetails";

function Game() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>();
  const [loading, setLoading] = useState(false);

  const getGameData = async () => {
    setLoading(true);
    axios
      .get(`${serverPath}api/games/${slug}/`, {})
      .then((response) => {
        setGame(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        navigate("/");
      });
  };

  useEffect(() => {
    getGameData();
  }, []);

  const getYoutubeEmbededURL = (link: string) => {
    return link?.split("https://www.youtube.com/watch?v=")[1];
  };

  const scoreColor = (x: number) => {
    if (x >= 70) {
      return style.green;
    }
    if (x < 70 && x > 35) {
      return style.yellow;
    }
    if (x <= 35) {
      return style.red;
    }
  };

  return (
    <View background={true} backButton={true}>
      {loading ? (
        <LoadingCard classname={style.container} spinnerSize={75} />
      ) : (
        <div className={style.container}>
          <div className={style.row}>
            <div className={style.video_and_description}>
              <iframe
                className={style.video}
                src={`https://www.youtube.com/embed/${getYoutubeEmbededURL(
                  game?.youtube_video
                )}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Section title="Summary" sectionColor="yellow">
                {game?.description}
              </Section>
            </div>
            <div className={style.info}>
              <div className={style.name}>{game?.name}</div>
              <Image image={game?.image} classname={style.image} />
              <div className={style.released_on}>
                <div className={style.released_on_row}>
                  <span>Released </span>
                  <div className={style.released_on_box}>
                    {game?.release_date?.split("-")[2]}
                  </div>
                  <div className={style.released_on_box}>
                    {game?.release_date?.split("-")[1]}
                  </div>
                  <div className={style.released_on_box}>
                    {game?.release_date?.split("-")[0]}
                  </div>
                </div>
              </div>
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>MAX SCORE</div>
                  <div className={style.score_text}>
                    Based on {game?.reviews?.length} reviews
                  </div>
                </div>
                <div className={cn(style.score, scoreColor(game?.score))}>
                  {game?.score}
                </div>
              </div>
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>YOUR REVIEW</div>
                  <div className={style.score_text}>Add your own Review!</div>
                </div>
                <div className={cn(style.add_score)}>
                  <Icon
                    name={"plus"}
                    className={style.plus_svg}
                    viewBox="0 0 24 24"
                  />
                </div>
              </div>
              <div className={style.separator} />
              <div className={cn(style.library_button)}>
                Add to library
                <Icon
                  name={"plus"}
                  className={style.plus_svg}
                  viewBox="0 0 24 24"
                />
              </div>
            </div>
          </div>
          <div className={style.separator} />
          <Section title="Genres" sectionColor="blue">
            <GameCategories data={game?.categories} />
          </Section>
          <div className={style.separator} />
          <Section title="Available on" sectionColor="green">
            <GamePlatforms data={game?.platforms} />
          </Section>
          <div className={style.separator} />
          <Section title="Details" sectionColor="red">
            <GameDetails
              developers={game?.developer}
              publisher={game?.publisher}
              esrb={game?.ESRB}
              budget={game?.budget}
              release_date={game?.release_date}
            />
          </Section>
          <div className={style.separator} />
          <Section title="Reviews">
            <></>
          </Section>
        </div>
      )}
    </View>
  );
}

export default Game;
