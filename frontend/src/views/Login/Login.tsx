import { useState, useEffect } from "react";
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
import LoadingSpinner from "components/LoadingSpinner";
import { useAuth } from "wrappers/AuthContext/AuthContext";

function Login() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const { width } = useWindowDimensions();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    navigate(`/`);
    window.location.reload();
  };

  const login = () => {
    setLoading(true);
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
        const { access, refresh } = response?.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("email", email);
        setSuccess("You have succesfully logged in!");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
        <Logo />
      ) : (
        <div className={style.logo}>
          <Logo />
        </div>
      )}

      <div className={style.back_button}>
        <BackButton />
      </div>
      <div className={style.content}>
        {width > 1000 && (
          <img
            src={process.env.PUBLIC_URL + "assets/grid1.png"}
            className={style.image}
            alt="grid1"
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
                  viewBox="-8 -5 18 18"
                />
              </div>
              <div className={style.error}>{error}</div>
            </div>
          )}
          {loading ? (
            <LoadingSpinner />
          ) : (
            <DefaultButton text="Log In" onClick={login} />
          )}

          <div className={style.bottom_text}>
            Don't have an account?
            <div
              onClick={() => navigate(`/register`)}
              className={style.register_link}
            >
              Click here to create it!
            </div>
          </div>
        </div>
      </div>
      {success && (
        <Modal>
          <div className={style.success}>
            {success}
            <DefaultButton text="Go to home" onClick={onSuccess} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Login;
