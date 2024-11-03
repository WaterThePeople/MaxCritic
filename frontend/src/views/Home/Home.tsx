import { useState, useEffect } from "react";
import style from "./Home.module.sass";
import View from "wrappers/View/View";

import axios from "axios";
import { serverPath } from "BackendServerPath";

import Welcome from "./Features/Welcome/Welcome";
import RecentlyAdded from "./Features/RecentlyAdded/RecentlyAdded";

function Home() {
  const [recentlyAdded, setRecentlyAdded] = useState<any[]>([]);

  const getRecentlyAdded = async () => {
    axios
      .get(`${serverPath}api/recent?page_size=8`, {})
      .then((response) => {
        console.log(response);
        setRecentlyAdded(response?.data?.results);
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
        <RecentlyAdded items={recentlyAdded} />
      </div>
    </View>
  );
}

export default Home;
