import { useState, useEffect } from "react";
import style from "./Register.module.sass";
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

function Register() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const { width } = useWindowDimensions();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  const onSuccess = () => {
    navigate(`/login`);
    window.location.reload();
  };

  const register = () => {
    setLoading(true);
    axios
      .post(
        `${serverPath}api/register/`,
        {
          username: username,
          password: password,
          email: email,
        },
        {}
      )
      .then((response) => {
        setSuccess(
          "You have created your account successfully! Now go on and log into your account!"
        );
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        if (email === "" || password === "" || username === "") {
          setError("No field can be empty!");
        } else {
          console.log(error?.response);
          if (error?.response?.data?.email) {
            setError(error?.response?.data?.email[0]);
          }
          if (error?.response?.data?.password) {
            setError(error?.response?.data?.password[0]);
          }
          if (error?.response?.data?.username) {
            setError(error?.response?.data?.username[0]);
          }
          if (error?.response?.data?.non_field_errors) {
            setError(error?.response?.data?.non_field_errors[0]);
          }
        }
      });
  };

  useEffect(() => {
    setError("");
  }, [email, password, username]);

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
            src={process.env.PUBLIC_URL + "assets/grid2.png"}
            className={style.image}
            alt="grid2"
          />
        )}
        <div className={style.register_container}>
          <div className={style.title}>Sign Up</div>
          <Input label="Username" value={username} setValue={setUsername} />
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
            <DefaultButton text="Create an account" onClick={register} />
          )}
          <div className={style.bottom_text}>
            Already have an account?
            <div
              onClick={() => navigate(`/login`)}
              className={style.login_link}
            >
              Click here to log in!
            </div>
          </div>
        </div>
      </div>
      {success && (
        <Modal>
          <div className={style.success}>
            {success}
            <DefaultButton text="Go to login" onClick={onSuccess} />
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Register;
