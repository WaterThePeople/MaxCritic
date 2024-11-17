import React, { useState, useEffect } from "react";
import style from "./ApiTestView.module.sass";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import LoadingCard from "components/LoadingCard/LoadingCard";

function ApiTestView() {
  const deleteReview = async () => {
    axios
      .delete(`${serverPath}api/games/review/delete/12/`, {})
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
      <button onClick={() => deleteReview()}>Delete review</button>
      <LoadingCard classname={style.loading_card} spinnerSize={50} />
    </div>
  );
}

export default ApiTestView;
