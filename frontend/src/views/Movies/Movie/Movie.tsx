import { useState, useEffect } from "react";
import style from "./Movie.module.sass";
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
import MovieCategories from "./Features/MovieCategories/MovieCategories";
import MovieDetails from "./Features/MovieDetails/MovieDetails";
import MovieReviews from "./Features/MovieReviews/MovieReviews";
import MovieActors from "./Features/MovieActors/MovieActors";
import Modal from "components/Modal/Modal";
import AddReview from "components/AddReview/AddReview";
import EditReview from "components/EditReview/EditReview";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Score from "components/Score/Score";
import Date from "components/Date/Date";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import { returnAccessToken } from "utils/Authentication";

function Movie() {
  const { isAuth, userData } = useAuth();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);
  const [userReview, setUserReview] = useState<any>();
  const [userReviewModal, setUserReviewModal] = useState(false);
  const [movieInLibrary, setMovieInLibrary] = useState(false);

  const getMovieData = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .get(`${serverPath}api/movies/${slug}/`, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      })
      .then((response) => {
        setMovie(response?.data);
        setMovieInLibrary(response?.data?.in_library);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        navigate("/");
      });
  };

  useEffect(() => {
    getMovieData();
  }, [slug]);

  const addMovieToLibrary = async (ID: number) => {
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}api/movies/library/add/${ID}/`,
        {},
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      )
      .then((response) => {
        setMovieInLibrary(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeMovieFromLibrary = async (ID: number) => {
    const { accessToken } = await returnAccessToken();
    console.log(accessToken);
    axios
      .post(
        `${serverPath}api/movies/library/remove/${ID}/`,
        {},
        {
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
        }
      )
      .then((response) => {
        setMovieInLibrary(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkIfUserReview = () => {
    movie?.has_reviewed &&
      movie?.reviews?.map((item: any) => {
        if (item?.author?.id === userData?.id) {
          setUserReview(item);
        }
      });
  };

  useEffect(() => {
    checkIfUserReview();
  }, [movie]);

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
                  movie?.youtube_video
                )}?rel=0&iv_load_policy=3&modestbranding=1&autoplay=0&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Section title="Summary" sectionColor="yellow">
                {movie?.description}
              </Section>
            </div>
            <div className={style.info}>
              <div className={style.name}>{movie?.name}</div>
              <Image image={movie?.image} classname={style.image} />
              <Date date={movie?.release_date} />
              <div className={style.separator} />
              <div className={style.score_row}>
                <div className={style.score_text_container}>
                  <div className={style.score_title}>MAX SCORE</div>
                  <div className={style.score_text}>
                    Based on {movie?.reviews?.length} reviews
                  </div>
                </div>
                <Score score={movie?.score} scale />
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
                movieInLibrary ? (
                  <div
                    className={cn(style.library_button, style.blue)}
                    onClick={() => removeMovieFromLibrary(movie?.id)}
                  >
                    Already in Library
                    <div className={style.remove_text}>Click to remove</div>
                  </div>
                ) : (
                  <div
                    className={cn(style.library_button)}
                    onClick={() => addMovieToLibrary(movie?.id)}
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
            <MovieCategories data={movie?.categories} />
          </Section>
          <div className={style.separator} />
          <Section title="Actors" sectionColor="green">
            <MovieActors data={movie?.actors} />
          </Section>
          <div className={style.separator} />
          <Section title="Details" sectionColor="red">
            <MovieDetails
              esrb={movie?.ESRB}
              release_date={movie?.release_date}
              duration={movie?.duration}
              director={movie?.director}
              writers={movie?.writers}
              production={movie?.production}
            />
          </Section>
          <div className={style.separator} />
          <Section title="Reviews">
            <MovieReviews
              data={movie?.reviews}
              userReviewID={userReview?.id}
              openReviewModal={() => setUserReviewModal(true)}
            />
          </Section>
        </div>
      )}

      <Modal setVisible={setAddReviewModal} visible={addReviewModal}>
        <AddReview id={movie?.id} url="api/movies/reviews/create/" />
      </Modal>

      <Modal setVisible={setUserReviewModal} visible={userReviewModal}>
        <EditReview
          data={userReview}
          url="api/movies/review/edit/"
          deleteUrl="api/movies/review/delete/"
        />
      </Modal>
    </View>
  );
}

export default Movie;
