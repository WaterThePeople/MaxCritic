import React, { useState } from "react";
import style from "./Username.module.sass";
import DefaultButton from "components/DefaultButton/DefaultButton";
import LoadingCard from "components/LoadingCard/LoadingCard";
import Input from "components/Input/Input";
import { Icon } from "components/Icon/Icon";

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
  return loading ? (
    <LoadingCard classname={style.loading} />
  ) : (
    <div className={style.container}>
      <Input
        value={username ? username : ""}
        setValue={setUsername}
        label="Your Username"
        maxLength={50}
      />
      <div className={style.row}>
        <DefaultButton text="Save" onClick={onSaveUsername} />
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
      </div>
    </div>
  );
}

export default Username;
