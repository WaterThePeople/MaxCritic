import React, { useState, useEffect } from "react";
import style from "./Profile.module.sass";
import View from "wrappers/View/View";
import { useParams } from "react-router-dom";
import Image from "components/Image/Image";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ProfileTab from "./Features/ProfileTab/ProfileTab";
import ProfileSummary from "./Features/ProfileSummary/ProfileSummary";
import ProfileReviews from "./Features/ProfileReviews/ProfileReviews";
import useWindowDimensions from "utils/useWindowDimensions";
import DropdownModal from "components/DropdownModal/DropdownModal";
import { useAuth } from "wrappers/AuthContext/AuthContext";

const sections = ["Games", "Movies", "TV Shows", "Music"];

function Profile() {
  const { userData } = useAuth();
  const { width } = useWindowDimensions();
  const { username } = useParams();
  const [currentTab, setCurrentTab] = useState(sections[0]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const getLibrary = async () => {
    axios
      .get(`${serverPath}api/user/profile/${username}/`, {})
      .then((response) => {
        setData(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getLibrary();
  }, [username]);

  const returnCurrentType = () => {
    if (currentTab === "Games") {
      return data?.game_reviews;
    } else if (currentTab === "Movies") {
      return data?.movie_reviews;
    } else if (currentTab === "TV Shows") {
      return data?.show_reviews;
    } else if (currentTab === "Music") {
      return data?.song_reviews;
    } else {
      return [];
    }
  };

  return (
    <View background>
      <div className={style.container}>
        <div className={style.top_row}>
          {data?.image ? (
            <Image image={data?.image} classname={style.user_image} />
          ) : (
            <img
              src={process.env.PUBLIC_URL + "../assets/default_avatar.png"}
              alt="Avatar"
              className={style.user_image}
            />
          )}
          <div className={style.title}>{username}</div>
        </div>
        <div className={style.separator} />
        <div className={style.content}>
          {width > 1000 ? (
            <div className={style.tabs}>
              {sections?.map((item: any, index: number) => (
                <ProfileTab
                  label={item}
                  key={index}
                  selected={currentTab === item}
                  onClick={() => setCurrentTab(item)}
                />
              ))}
            </div>
          ) : (
            <DropdownModal
              array={sections}
              value={currentTab}
              onClick={(x: any) => setCurrentTab(x)}
            />
          )}
          <ProfileSummary
            section={currentTab}
            data={returnCurrentType()}
            loading={loading}
          />
          <ProfileReviews
            section={currentTab}
            data={returnCurrentType()}
            loading={loading}
            authorID={userData?.id}
          />
        </div>
      </div>
    </View>
  );
}

export default Profile;
