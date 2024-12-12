import React, { useState, useEffect } from "react";
import style from "./AddGameReview.module.sass";
import { useNavigate } from "react-router-dom";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Section from "components/Section/Section";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import { Icon } from "components/Icon/Icon";
import { returnAccessToken } from "utils/Authentication";
import LoadingSpinner from "components/LoadingSpinner";
import Score from "components/Score/Score";
import { useAuth } from "wrappers/AuthContext/AuthContext";

function AddGameReview({ id, platforms }: { id: number; platforms: any[] }) {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getSliderBackground = (value: number): string => {
    const percentage = (value / 100) * 100;

    let background = "linear-gradient(to right,";

    if (percentage <= 35) {
      background += ` #A62929 ${percentage}%, `;
    } else if (percentage < 70) {
      background += ` #A6A629 ${percentage}%, `;
    } else {
      background += ` #29A642  ${percentage}%, `;
    }
    background += ` #262625 ${percentage}%)`;
    return background;
  };

  const handlePlatformSelect = (item: number) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(item)) {
        return prev.filter((existing) => existing !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const postReview = async () => {
    setLoading(true);
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}api/games/reviews/create/`,
        {
          game: id,
          rating: score,
          description: description,
          platform: selectedPlatforms,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleAddReview = () => {
    if (!(description?.length > 0)) {
      setError("Description cannot be empty!");
    } else if (!(selectedPlatforms?.length > 0)) {
      setError("Choose at least one platform!");
    } else {
      setError("");
      postReview();
    }
  };

  return (
    <div className={style.container}>
      {isAuth ? (
        <div className={style.content}>
          <Section title="Review" sectionColor="red" classname={style.section}>
            <div className={style.description_limit}>
              {description?.length} / 500
            </div>
            <textarea
              className={style.description}
              value={description}
              maxLength={500}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </Section>
          <Section title="Score" sectionColor="green" classname={style.section}>
            <div className={style.score_container}>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value))}
                className={style.slider}
                style={{ background: getSliderBackground(score) }}
              />
              <Score score={score} scale />
            </div>
          </Section>
          <Section
            title="Select Platforms"
            sectionColor="blue"
            classname={style.section}
          >
            <div className={style.platform_container}>
              {platforms?.map((item: any, index: number) => (
                <ImageTextRow
                  image={item?.image}
                  text={item?.platform_name}
                  selected={selectedPlatforms.includes(item?.id)}
                  onClick={() => handlePlatformSelect(item?.id)}
                />
              ))}
            </div>
          </Section>
          {error && (
            <div className={style.error_container}>
              <div className={style.error_icon}>
                <Icon
                  name={"info"}
                  size={18}
                  className={style.svg}
                  viewBox="0 0 24 24"
                />
              </div>
              <div className={style.error}>{error}</div>
            </div>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DefaultButton
              text="Add your Review"
              onClick={() => handleAddReview()}
            />
          )}
        </div>
      ) : (
        <div className={style.unauthorized}>
          <div className={style.unauthorized_text}>
            You cannot add a review unless you are logged in!
          </div>
          <DefaultButton
            text="Go to Login"
            onClick={() => navigate("/login")}
          />
        </div>
      )}
    </div>
  );
}

export default AddGameReview;
