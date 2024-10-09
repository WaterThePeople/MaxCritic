import React, { useState, useEffect } from "react";
import style from "./Home.module.sass";

import axios from "axios";
import { serverPath } from "BackendServerPath";

function Home() {
  const [recentlyAdded, setRecentlyAdded] = useState<any[]>([]);

  const getRecentlyAdded = async () => {
    axios
      .get(`${serverPath}api/recent`, {})
      .then((response) => {
        console.log(response);
        setRecentlyAdded(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecentlyAdded();
  }, []);

  console.log(recentlyAdded);

  return <div className={style.container}>THIS IS HOME SCREEN SECTION</div>;
}

export default Home;
