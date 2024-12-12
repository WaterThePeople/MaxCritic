import React from "react";
import style from "./ChangePassword.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import LoadingSpinner from "components/LoadingSpinner";
import { Icon } from "components/Icon/Icon";
import InputPassword from "components/InputPassword/InputPassword";
import Modal from "components/Modal/Modal";

function ChangePassword({
  loading,
  password,
  setPassword,
  newPassword,
  setNewPassword,
  onSave,
  error,
  success,
  onSuccess,
}: {
  loading: boolean;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  onSave: Function;
  error: string;
  success: string;
  onSuccess: Function;
}) {
  return (
    <div className={style.container}>
      <InputPassword
        password={password ? password : ""}
        setPassword={setPassword}
        label="Your Current Password"
        maxLength={50}
      />
      <InputPassword
        password={newPassword ? newPassword : ""}
        setPassword={setNewPassword}
        label="Your New Password"
        maxLength={50}
      />
      {error && (
        <div className={style.error_container}>
          <div className={style.error_icon}>
            <Icon
              name={"info"}
              size={18}
              className={style.svg}
              viewBox="0 0 24 24"
            />
          </div>
          <div className={style.error}>{error}</div>
        </div>
      )}
      {loading ? (
        <div className={style.loading}>
          <LoadingSpinner />
        </div>
      ) : (
        <DefaultButton text="Change Password" onClick={onSave} />
      )}
      <Modal visible={success.length > 0}>
        <div className={style.success}>
          {success}
          <DefaultButton text="Go to home" onClick={onSuccess} />
        </div>
      </Modal>
    </div>
  );
}

export default ChangePassword;
