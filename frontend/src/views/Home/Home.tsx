import { useState, useEffect } from "react";
import style from "./Home.module.sass";
import View from "wrappers/View/View";

import axios from "axios";
import { serverPath } from "BackendServerPath";

import Welcome from "./Features/Welcome/Welcome";

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

  return (
    <View>
      <div className={style.container}>
        <Welcome />
      </div>
    </View>
  );
}

export default Home;
