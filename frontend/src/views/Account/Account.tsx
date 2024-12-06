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
import ChangePassword from "./Features/ChangePassword/ChangePassword";

function Account() {
  const { isAuth, userData, setUserData } = useAuth();
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const navigate = useNavigate();

  const [avatarLoading, setAvatarLoading] = useState(true);
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [emailLoading, setEmailLoading] = useState(true);
  const [passwordLoading, setPasswordLoading] = useState(true);

  useEffect(() => {
    if (isAuth !== null && !isAuth) {
      navigate(`/login`);
    }
  }, [isAuth]);

  const changePhoto = async (imageFile: string) => {
    const { accessToken } = await returnAccessToken();
    setAvatarLoading(true);
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
        setAvatarLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAvatarLoading(false);
      });
  };

  const removePhoto = async () => {
    const { accessToken } = await returnAccessToken();
    setAvatarLoading(true);
    axios
      .put(
        `${serverPath}api/user/image/`,
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
        setAvatarLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setAvatarLoading(false);
      });
  };

  const changeUsername = async () => {
    const { accessToken } = await returnAccessToken();
    setUsernameLoading(true);
    axios
      .put(
        `${serverPath}api/user/username/`,
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
        setUsernameLoading(false);
      })
      .catch((error) => {
        setUsernameError(error?.response?.data?.new_username[0]);
        setUsernameLoading(false);
      });
  };

  const changePassword = async () => {
    const { accessToken } = await returnAccessToken();
    setPasswordLoading(true);
    axios
      .post(
        `${serverPath}api/user/password/change/`,
        {
          new_password: newPassword,
          old_password: password,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setPasswordChangeSuccess(
          "You have successfully changed your password!"
        );
        setPasswordLoading(false);
      })
      .catch((error) => {
        setPasswordError(error?.response?.data?.error);
        setPasswordLoading(false);
      });
  };

  const onPasswordChangeSuccess = () => {
    window.location.reload();
    navigate(`/login`);
  };

  useEffect(() => {
    setImage(userData?.image);
    setUsername(userData?.username);
    setEmail(userData?.email);
    setAvatarLoading(false);
    setUsernameLoading(false);
    setEmailLoading(false);
    setPasswordLoading(false);
  }, [userData]);

  useEffect(() => {
    setUsernameError("");
  }, [username]);

  useEffect(() => {
    setPasswordError("");
  }, [password, newPassword]);

  return (
    <View background>
      <div className={style.container}>
        <div className={style.title}>Your Account</div>
        <div className={style.separator} />
        <div className={style.content}>
          <UserAvatar
            loading={avatarLoading}
            image={image ? image : ""}
            setImage={setImage}
            changePhoto={changePhoto}
            removePhoto={removePhoto}
          />
          <div className={style.column}>
            <Username
              loading={usernameLoading}
              username={username}
              setUsername={setUsername}
              onSaveUsername={changeUsername}
              error={usernameError}
            />
            <Email loading={emailLoading} email={email} setEmail={setEmail} />
            <ChangePassword
              loading={passwordLoading}
              setPassword={setPassword}
              password={password}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              error={passwordError}
              onSave={changePassword}
              success={passwordChangeSuccess}
              onSuccess={onPasswordChangeSuccess}
            />
          </div>
        </div>
      </div>
    </View>
  );
}

export default Account;
