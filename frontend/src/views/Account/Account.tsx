import React, { useState, useEffect } from "react";
import style from "./Account.module.sass";
import View from "wrappers/View/View";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

function Account() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate(`/`);
    }
  }, [isAuth]);

  return (
    <View background>
      <div className={style.content}>
        <div className={style.title}>Your Account</div>
        <div className={style.separator} />
      </div>
    </View>
  );
}

export default Account;
