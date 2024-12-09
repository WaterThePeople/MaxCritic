import style from "./Welcome.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "wrappers/AuthContext/AuthContext";

function Welcome() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <div className={style.text_container}>
        <div className={style.header_text}>Welcome To</div>
        <div className={style.logo}>
          <img
            src={process.env.PUBLIC_URL + "/logo.png"}
            alt="Logo"
            className={style.logo_image}
          />
          <div className={style.logo_text}>MaxCritic</div>
        </div>
      </div>
      <div className={style.bottom_container}>
        <div className={style.text_container}>
          <div className={style.description_title}>
            Discover, Rate, and Share Your Favorite Entertainment
          </div>
          <div className={style.description}>
            Explore an extensive catalog of games, movies, books, and more, and
            see what other people think. Rate and review titles you love (or
            don't). Join today and start shaping the conversation around the
            entertainment you love!
          </div>
          {!isAuth && (
            <DefaultButton
              onClick={() => navigate("/register")}
              text=" Join Us!"
            />
          )}
        </div>
        <img
          src={process.env.PUBLIC_URL + "assets/reviews.svg"}
          className={style.image}
          alt="reviews"
        />
      </div>
    </div>
  );
}

export default Welcome;
