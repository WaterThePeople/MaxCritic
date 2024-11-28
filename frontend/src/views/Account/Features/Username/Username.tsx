import React, { useState } from "react";
import style from "./Username.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import Input from "components/Input/Input";
import { Icon } from "components/Icon/Icon";
import LoadingSpinner from "components/LoadingSpinner";

function Username({
  loading,
  username,
  setUsername,
  onSaveUsername,
  error,
}: {
  loading: boolean;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<any>>;
  onSaveUsername: Function;
  error: string;
}) {
  return (
    <div className={style.container}>
      <Input
        value={username ? username : ""}
        setValue={setUsername}
        label="Your Username"
        maxLength={50}
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
        <div className={style.loading}>
          <LoadingSpinner />
        </div>
      ) : (
        <DefaultButton text="Change Username" onClick={onSaveUsername} />
      )}
    </div>
  );
}

export default Username;
