import React, { useState, useEffect } from "react";
import style from "./EditGameReview.module.sass";
import { isAuthenticated } from "utils/Authentication";
import { useNavigate } from "react-router-dom";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Section from "components/Section/Section";
import cn from "classnames";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ImageTextRow from "components/ImageTextRow/ImageTextRow";
import { Icon } from "components/Icon/Icon";
import { returnAccessToken } from "utils/Authentication";
import LoadingSpinner from "components/LoadingSpinner";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import Score from "components/Score/Score";

function EditGameReview({ data, platforms }: { data: any; platforms: any[] }) {
  const navigate = useNavigate();
  const isAuth = isAuthenticated();

  const [description, setDescription] = useState("");
  const [score, setScore] = useState(0);
  const [selectedPlatforms, setSelectedPlatforms] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const editReview = async () => {
    setLoading(true);
    const { accessToken } = await returnAccessToken();
    axios
      .put(
        `${serverPath}api/games/review/edit/${data?.id}/`,
        {
          description: description,
          platform: selectedPlatforms,
          rating: score,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
      .then((response) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const deleteReview = async () => {
    setLoading(true);
    axios
      .delete(`${serverPath}api/games/review/delete/${data?.id}/`, {})
      .then((response) => {
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

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

  const handleEditReview = () => {
    if (!(description?.length > 0)) {
      setError("Description cannot be empty!");
    } else if (!(selectedPlatforms?.length > 0)) {
      setError("Choose at least one platform!");
    } else {
      setError("");
      editReview();
    }
  };

  useEffect(() => {
    setDescription(data?.description);
    setScore(data?.rating);
    let temp: number[] = [];
    data?.platform?.map((item: any) => {
      temp.push(item?.id);
    });
    setSelectedPlatforms(temp);
  }, [data]);

  return (
    <div className={style.container}>
      {isAuth ? (
        <div className={style.content}>
          <Section
            title="Your Review"
            sectionColor="red"
            classname={style.section}
          >
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
          <Section
            title="Change Score"
            sectionColor="green"
            classname={style.section}
          >
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
            title="Change Platforms"
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
                  viewBox="-8 -5 18 18"
                />
              </div>
              <div className={style.error}>{error}</div>
            </div>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className={style.buttons}>
              <DefaultButton
                text="Update your review"
                onClick={() => handleEditReview()}
                classname={style.update_button}
              />
              {confirmDeleteVisible ? (
                <OutsideClickHandler
                  classname={style.outside_click_container}
                  onClickOutside={() => setConfirmDeleteVisible(false)}
                >
                  <DefaultButton
                    text="Click again to delete"
                    onClick={() => deleteReview()}
                    classname={style.delete_button_confirm}
                    classnameText={style.delete_button_text_confirm}
                  />
                </OutsideClickHandler>
              ) : (
                <DefaultButton
                  text="Delete your review"
                  onClick={() => setConfirmDeleteVisible(true)}
                  classname={style.delete_button}
                  classnameText={style.delete_button_text}
                />
              )}
            </div>
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

export default EditGameReview;
