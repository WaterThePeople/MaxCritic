import React, { useState } from "react";
import style from "./Navbar.module.sass";
import Logo from "components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Image from "components/Image/Image";
import cn from "classnames";
import OutsideClickHandler from "components/OutsideClickHandler/OutsideClickHandler";
import Modal from "components/Modal/Modal";

function Navbar({
  isAuth,
  setMenuVisible,
  userData,
}: {
  isAuth: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
}) {
  const navigate = useNavigate();
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const logout = () => {
    window.location.reload();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const goToProfile = () => {
    navigate(`/profile`);
    setProfileMenuVisible(false);
  };

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
                  <div className={style.user_menu_item} onClick={goToProfile}>
                    <div className={style.user_text}>Profile</div>
                  </div>
                )}
                {profileMenuVisible && (
                  <div
                    className={style.user_menu_item_2}
                    onClick={openLogoutModal}
                  >
                    <div className={style.user_text}>Log out</div>
                  </div>
                )}
              </div>
            </OutsideClickHandler>
          ) : (
            <button onClick={() => navigate(`/login`)} className={style.login}>
              Login
            </button>
          )}
        </div>
      </div>
      {logoutModal && (
        <Modal setVisible={setLogoutModal}>
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
      )}
    </>
  );
}

export default Navbar;
