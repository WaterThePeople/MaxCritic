import React from "react";
import style from "./Navbar.module.sass";
import Logo from "components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import DefaultButton from "components/DefaultButton/DefaultButton";

function Navbar({
  isAuth,
  setMenuVisible,
}: {
  isAuth: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();

  const logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className={style.corner_container}>
          <div className={style.button_container}>
            <button
              className={style.corner_button}
              onClick={() => setMenuVisible((previous) => !previous)}
            >
              <div className={style.corner_line} />
              <div className={style.corner_line} />
              <div className={style.corner_line} />
            </button>
          </div>
          <Logo />
        </div>
        {isAuth ? (
          <DefaultButton
            text="Log out"
            onClick={() => logout()}
            classname={style.logout}
            classnameText={style.logout_text}
          />
        ) : (
          <button onClick={() => navigate(`/login`)} className={style.login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
