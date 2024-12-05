import { useState, useEffect } from "react";
import style from "./Song.module.sass";
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
import SongCategories from "./Features/SongsCategories/SongsCategories";
import SongDetails from "./Features/SongDetails/SongDetails";
import SongReviews from "./Features/SongReviews/SongReviews";
import SongAuthors from "./Features/SongAuthors/SongAuthors";
import Modal from "components/Modal/Modal";
import AddReview from "components/AddReview/AddReview";
import EditReview from "components/EditReview/EditReview";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Score from "components/Score/Score";
import Date from "components/Date/Date";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import { returnAccessToken } from "utils/Authentication";

function Song() {
  const { isAuth, userData } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [userReview, setUserReview] = useState<any>();
  const [userReviewModal, setUserReviewModal] = useState(false);
  const [songInLibrary, setSongInLibrary] = useState(false);

  const getSongData = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .get(`${serverPath}api/songs/${slug}/`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      })
      .then((response) => {
        setSong(response?.data);
        setSongInLibrary(response?.data?.in_library);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        navigate("/");
      });
  };

  useEffect(() => {
    getSongData();
  }, [slug]);

  const addSongToLibrary = async (ID: number) => {
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}/api/songs/library/add/${ID}/`,
        {},
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      )
      .then((response) => {
        setSongInLibrary(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeSongFromLibrary = async (ID: number) => {
    const { accessToken } = await returnAccessToken();
    console.log(accessToken);
    axios
      .post(
        `${serverPath}/api/songs/library/remove/${ID}/`,
        {},
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      )
      .then((response) => {
        setSongInLibrary(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkIfUserReview = () => {
    song?.has_reviewed &&
      song?.reviews?.map((item: any) => {
        if (item?.author?.id === userData?.id) {
          setUserReview(item);
        }
      });
  };

  useEffect(() => {
    checkIfUserReview();
  }, [song]);

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
                  song?.youtube_video
                )}?rel=0&iv_load_policy=3&modestbranding=1&autoplay=0&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Section title="Summary" sectionColor="yellow">
                {song?.description}
              </Section>
            </div>
            <div className={style.info}>
              <div className={style.name}>{song?.name}</div>
              <Image image={song?.image} classname={style.image} />
              <Date date={song?.release_date} />
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>MAX SCORE</div>
                  <div className={style.score_text}>
                    Based on {song?.reviews?.length} reviews
                  </div>
                </div>
                <Score score={song?.score} scale />
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
              {isAuth ? (
                songInLibrary ? (
                  <div
                    className={cn(style.library_button, style.blue)}
                    onClick={() => removeSongFromLibrary(song?.id)}
                  >
                    Already in Library
                    <div className={style.remove_text}>Click to remove</div>
                  </div>
                ) : (
                  <div
                    className={cn(style.library_button)}
                    onClick={() => addSongToLibrary(song?.id)}
                  >
                    Add to library
                    <Icon
                      name={"plus"}
                      className={style.plus_svg}
                      viewBox="0 0 24 24"
                    />
                  </div>
                )
              ) : (
                <div
                  className={cn(style.library_button, style.unauthorized)}
                  onClick={() => navigate("/login")}
                >
                  Log in To access Library!
                </div>
              )}
            </div>
          </div>
          <div className={style.separator} />
          <Section title="Genres" sectionColor="blue">
            <SongCategories data={song?.categories} />
          </Section>
          <div className={style.separator} />
          <Section title="Author" sectionColor="green">
            <SongAuthors data={song?.authors} />
          </Section>
          <div className={style.separator} />
          <Section title="Details" sectionColor="red">
            <SongDetails
              esrb={song?.ESRB}
              release_date={song?.release_date}
              duration={song?.duration}
              production={song?.production}
            />
          </Section>
          <div className={style.separator} />
          <Section title="Reviews">
            <SongReviews
              data={song?.reviews}
              userReviewID={userReview?.id}
              openReviewModal={() => setUserReviewModal(true)}
            />
          </Section>
        </div>
      )}

      <Modal setVisible={setAddReviewModal} visible={addReviewModal}>
        <AddReview id={song?.id} url="/api/songs/reviews/create/" />
      </Modal>

      <Modal setVisible={setUserReviewModal} visible={userReviewModal}>
        <EditReview
          data={userReview}
          url="api/songs/review/edit/"
          deleteUrl="api/songs/review/delete/"
        />
      </Modal>
    </View>
  );
}

export default Song;
