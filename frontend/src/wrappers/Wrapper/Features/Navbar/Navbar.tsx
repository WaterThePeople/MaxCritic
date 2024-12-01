import React, { useState, useEffect } from "react";
import style from "./Navbar.module.sass";
import Logo from "components/Logo/Logo";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Image from "components/Image/Image";
import cn from "classnames";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import Modal from "components/Modal/Modal";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import DefaultLink from "components/DefaultLink/DefaultLink";
import { useLocation } from "react-router-dom";

function Navbar({
  setMenuVisible,
}: {
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { isAuth, userData } = useAuth();
  const location = useLocation();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  useEffect(() => {
    setProfileMenuVisible(false);
  }, [location]);

  const openLogoutModal = () => {
    setProfileMenuVisible(false);
    setLogoutModal(true);
  };

  return (
    <>
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
            <OutsideClickHandler
              onClickOutside={() => setProfileMenuVisible(false)}
            >
              <div className={style.user_menu}>
                <div
                  className={cn(
                    style.user,
                    profileMenuVisible && style.visible
                  )}
                  onClick={() => setProfileMenuVisible(!profileMenuVisible)}
                >
                  <div className={style.user_text}>{userData?.username}</div>
                  {userData?.image ? (
                    <Image
                      image={userData?.image}
                      classname={style.user_image}
                    />
                  ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL + "../assets/default_avatar.png"
                      }
                      alt="Avatar"
                      className={style.user_image}
                    />
                  )}
                </div>
                {profileMenuVisible && (
                  <DefaultLink
                    className={cn(style.user_menu_item, style.first)}
                    to={`/account`}
                  >
                    <div className={style.user_text}>Account</div>
                  </DefaultLink>
                )}
                {profileMenuVisible && (
                  <DefaultLink
                    className={cn(style.user_menu_item, style.second)}
                    to={`/profile/${userData?.username}`}
                  >
                    <div className={style.user_text}>Profile</div>
                  </DefaultLink>
                )}
                {profileMenuVisible && (
                  <DefaultLink
                    to={`/library`}
                    className={cn(style.user_menu_item, style.third)}
                  >
                    <div className={style.user_text}>Library</div>
                  </DefaultLink>
                )}
                {profileMenuVisible && (
                  <div
                    className={cn(style.user_menu_item, style.last)}
                    onClick={openLogoutModal}
                  >
                    <div className={style.user_text}>Log out</div>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          ) : (
            <DefaultLink to={"/login"} className={style.login}>
              Login
            </DefaultLink>
          )}
        </div>
      </div>
      <Modal setVisible={setLogoutModal} visible={logoutModal}>
        <div className={style.logout_modal_container}>
          <div className={style.confirm_logout_text}>
            Are you sure you want to logout?
          </div>
          <div className={style.logout_modal_row}>
            <DefaultButton
              text="Cancel"
              onClick={() => setLogoutModal(false)}
            />
            <DefaultButton
              text="Confirm"
              onClick={() => logout()}
              classname={style.logout}
              classnameText={style.logout_text}
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Navbar;
