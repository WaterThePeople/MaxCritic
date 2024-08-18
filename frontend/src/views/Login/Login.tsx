import React, { useState, useEffect } from "react";
import style from "./Login.module.sass";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import Logo from "components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "utils/useWindowDimensions";
import BackButton from "components/BackButton/BackButton";
import Input from "components/Input/Input";
import InputPassword from "components/InputPassword/InputPassword";
import DefaultButton from "components/DefaultButton/DefaultButton";
import { Icon } from "components/Icon/Icon";
import Modal from "components/Modal/Modal";

function Login({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSuccess = () => {
    navigate(`/`);
    window.location.reload();
  };

  const login = () => {
    axios
      .post(
        `${serverPath}api/token/`,
        {
          password: password,
          email: email,
        },
        {}
      )
      .then((response) => {
        console.log(response);
        const { access, refresh } = response?.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("email", email);
        setSuccess("You have succesfully logged in!");
      })
      .catch((error) => {
        console.log(error);
        if (email === "" || password === "") {
          setError("No field can be empty!");
        } else {
          console.log(error?.response);
          if (error?.response?.data?.email) {
            setError(error?.response?.data?.email[0]);
          }
          if (error?.response?.data?.non_field_errors) {
            setError(error?.response?.data?.non_field_errors[0]);
          }
        }
      });
  };

  useEffect(() => {
    setError("");
  }, [email, password]);

  useEffect(() => {
    if (isAuth) {
      navigate(`/`);
    }
  }, [isAuth]);

  return (
    <div className={style.container}>
      {width > 1000 ? (
        <Logo onClick={() => navigate(`/`)} />
      ) : (
        <div className={style.logo}>
          <Logo onClick={() => navigate(`/`)} />
        </div>
      )}

      <div className={style.back_button}>
        <BackButton />
      </div>
      <div className={style.content}>
        {width > 1000 && (
          <img
            src={process.env.PUBLIC_URL + "assets/wallpaper.png"}
            className={style.image}
          />
        )}
        <div className={style.login_container}>
          <div className={style.title}>Sign In</div>
          <Input label="Email" value={email} setValue={setEmail} />
          <InputPassword
            label="Password"
            password={password}
            setPassword={setPassword}
          />
          {error && (
            <div className={style.error_container}>
              <div className={style.error_icon}>
                <Icon
                  name={"info"}
                  size={18}
                  className={style.svg}
                  viewBox="-7 -5 18 18"
                />
              </div>
              <div className={style.error}>{error}</div>
            </div>
          )}
          <DefaultButton text="Log In" onClick={login} />
        </div>
      </div>
      {success && (
        <Modal>
          <div className={style.modal_container}>
            <div className={style.success}>
              {success}
              <DefaultButton
                text="Go to home"
                onClick={onSuccess}
                classname={style.success_button_container}
                classnameText={style.success_button_text}
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Login;
