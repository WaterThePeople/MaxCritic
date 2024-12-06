import { useState, useEffect } from "react";
import style from "./Home.module.sass";
import View from "wrappers/View/View";

import axios from "axios";
import { serverPath } from "BackendServerPath";

import Welcome from "./Features/Welcome/Welcome";
import RecentlyAdded from "./Features/RecentlyAdded/RecentlyAdded";
import Discover from "./Features/Discover/Discover";

function Home() {
  const [recentlyAdded, setRecentlyAdded] = useState<any[]>([]);
  const [recentlyAddedLoading, setRecentlyAddedLoading] = useState(false);

  const getRecentlyAdded = async () => {
    setRecentlyAddedLoading(true);
    axios
      .get(`${serverPath}api/recent?page_size=8`, {})
      .then((response) => {
        setRecentlyAdded(response?.data?.results);
        setRecentlyAddedLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setRecentlyAddedLoading(false);
      });
  };

  useEffect(() => {
    getRecentlyAdded();
  }, []);

  return (
    <View>
      <div className={style.container}>
        <Welcome />
        {/* <RecentlyAdded items={recentlyAdded} loading={recentlyAddedLoading} /> */}
        <Discover />
      </div>
    </View>
  );
}

export default Home;
