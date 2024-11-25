import React, { useState, useEffect } from "react";
import style from "./ApiTestView.module.sass";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import LoadingCard from "components/LoadingCard/LoadingCard";

function ApiTestView() {
  const getData = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .get(`${serverPath}/api/games/library`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const addGame = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}/api/games/library/add/5/`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeGame = async () => {
    const { accessToken } = await returnAccessToken();
    axios
      .post(
        `${serverPath}/api/games/library/remove/5/`,
        {},
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={style.container}>
      <div className={style.title}>THIS VIEW IS FOR TESTING API CALLS ONLY</div>
      <button onClick={addGame}>add game to library</button>
      <button onClick={removeGame}>remove game from library</button>
      <LoadingCard classname={style.loading_card} spinnerSize={50} />
    </div>
  );
}

export default ApiTestView;
