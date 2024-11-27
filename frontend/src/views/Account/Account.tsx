import React, { useState, useEffect } from "react";
import style from "./Account.module.sass";
import View from "wrappers/View/View";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

import UserAvatar from "./Features/UserAvatar/UserAvatar";
import Username from "./Features/Username/Username";
import Email from "./Features/Email/Email";

function Account() {
  const { isAuth, userData, setUserData } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuth !== null && !isAuth) {
      navigate(`/`);
    }
  }, [isAuth]);

  const changePhoto = async (imageFile: string) => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .put(
        `${serverPath}api/user/image/`,
        { image: imageFile },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setUserData({
          id: userData?.id,
          username: userData?.username,
          email: userData?.email,
          image: imageFile,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const removePhoto = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .put(
        `${serverPath}/api/user/image/`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setUserData({
          id: userData?.id,
          username: userData?.username,
          email: userData?.email,
          image: "",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const changeUsername = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .put(
        `${serverPath}/api/user/username/`,
        { new_username: username },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setUserData({
          id: userData?.id,
          username: username,
          email: userData?.email,
          image: userData?.image,
        });
        setLoading(false);
      })
      .catch((error) => {
        setUsernameError(error?.response?.data?.new_username[0]);
        setLoading(false);
      });
  };

  useEffect(() => {
    setImage(userData?.image);
    setUsername(userData?.username);
    setLoading(false);
    setEmail(userData?.email);
  }, [userData]);

  useEffect(() => {
    setUsernameError("");
  }, [username]);

  return (
    <View background>
      <div className={style.container}>
        <div className={style.title}>Your Account</div>
        <div className={style.separator} />
        <div className={style.content}>
          <UserAvatar
            loading={loading}
            image={image ? image : ""}
            setImage={setImage}
            changePhoto={changePhoto}
            removePhoto={removePhoto}
          />
          <div className={style.column}>
            <Username
              loading={loading}
              username={username}
              setUsername={setUsername}
              onSaveUsername={changeUsername}
              error={usernameError}
            />
            <Email loading={loading} email={email} setEmail={setEmail} />
          </div>
        </div>
      </div>
    </View>
  );
}

export default Account;
