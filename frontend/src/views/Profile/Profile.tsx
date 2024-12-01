import React, { useState, useEffect } from "react";
import style from "./Profile.module.sass";
import View from "wrappers/View/View";
import { useParams } from "react-router-dom";
import Image from "components/Image/Image";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import ProfileTab from "./Features/ProfileTab/ProfileTab";
import ProfileSummary from "./Features/ProfileSummary/ProfileSummary";

const sections = ["Games", "Movies", "TV Shows", "Music"];

function Profile() {
  const { username } = useParams();
  const [currentTab, setCurrentTab] = useState(sections[0]);
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const getLibrary = async () => {
    axios
      .get(`${serverPath}/api/user/profile/${username}/`, {})
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
          {currentTab === "Games" && (
            <ProfileSummary
              section="Games"
              data={data?.game_reviews}
              loading={loading}
            />
          )}
        </div>
      </div>
    </View>
  );
}

export default Profile;
