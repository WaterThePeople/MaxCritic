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
import GameReviews from "./Features/GameReviews/GameReviews";
import Modal from "components/Modal/Modal";
import AddGameReview from "./Features/AddGameReview/AddGameReview";
import DefaultButton from "components/DefaultButton/DefaultButton";
import EditGameReview from "./Features/EditGameReview/EditGameReview";
import Score from "components/Score/Score";
import Date from "components/Date/Date";

function Game({ userData }: { userData: any }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [userReview, setUserReview] = useState<any>();
  const [userReviewModal, setUserReviewModal] = useState(false);

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

  const checkIfUserReview = () => {
    game?.reviews?.map((item: any) => {
      if (item?.author?.id === userData?.id) {
        setUserReview(item);
      }
    });
  };

  useEffect(() => {
    checkIfUserReview();
  }, [game]);

  const getYoutubeEmbededURL = (link: string) => {
    return link?.split("https://www.youtube.com/watch?v=")[1];
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
                )}?rel=0&iv_load_policy=3&modestbranding=1&autoplay=0&mute=1`}
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
              <Date date={game?.release_date} />
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>MAX SCORE</div>
                  <div className={style.score_text}>
                    Based on {game?.reviews?.length} reviews
                  </div>
                </div>
                <Score score={game?.score} scale />
              </div>
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>YOUR REVIEW</div>
                  {userReview ? (
                    <DefaultButton
                      text="Your review"
                      onClick={() => setUserReviewModal(true)}
                    />
                  ) : (
                    <div className={style.score_text}>Add your own Review!</div>
                  )}
                </div>
                {userReview ? (
                  <Score score={userReview?.rating} scale />
                ) : (
                  <div
                    className={cn(style.add_score)}
                    onClick={() => setAddReviewModal(true)}
                  >
                    <Icon
                      name={"plus"}
                      className={style.plus_svg}
                      viewBox="0 0 24 24"
                    />
                  </div>
                )}
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
            <GameReviews data={game?.reviews} />
          </Section>
        </div>
      )}
      {addReviewModal && (
        <Modal setVisible={setAddReviewModal}>
          <AddGameReview platforms={game?.platforms} id={game?.id} />
        </Modal>
      )}
      {userReviewModal && (
        <Modal setVisible={setUserReviewModal}>
          <EditGameReview platforms={game?.platforms} data={userReview} />
        </Modal>
      )}
    </View>
  );
}

export default Game;
