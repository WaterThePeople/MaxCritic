import React, { useState, useEffect } from "react";
import style from "./Library.module.sass";
import View from "wrappers/View/View";
import DropdownModal from "components/DropdownModal/DropdownModal";
import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "utils/Authentication";
import LoadingCard from "components/LoadingCard/LoadingCard";
import LibraryList from "./Features/LibraryList/LibraryList";
import { useAuth } from "wrappers/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const libraries = ["Games", "Movies", "TV Shows", "Music"];

function Library() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [currentLibrary, setCurrentLibrary] = useState(libraries[0]);
  const [library, setLibrary] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const returnCurrentType = () => {
    if (currentLibrary === "Games") {
      return "games";
    } else if (currentLibrary === "Movies") {
      return "movies";
    } else if (currentLibrary === "TV Shows") {
      return "shows";
    } else if (currentLibrary === "Music") {
      return "music";
    } else {
      return "/";
    }
  };

  const getLibrary = async () => {
    const { accessToken } = await returnAccessToken();
    setLoading(true);
    axios
      .get(`${serverPath}/api/${returnCurrentType()}/library`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setLibrary(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLibrary([]);
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getLibrary();
  }, []);

  useEffect(() => {
    getLibrary();
  }, [currentLibrary]);

  useEffect(() => {
    if (isAuth != null && !isAuth) {
      navigate(`/`);
    }
  }, [isAuth]);

  return (
    <View background>
      <div className={style.content}>
        <div className={style.top_row}>
          <div className={style.title}>Your Library</div>
          <DropdownModal
            array={libraries}
            value={currentLibrary}
            onClick={(x: any) => setCurrentLibrary(x)}
          />
        </div>
        <div className={style.separator} />
        <div className={style.container}>
          {loading ? (
            <div className={style.loading_card_container}>
              {[...Array(16)]?.map((item: any, index: number) => (
                <LoadingCard classname={style.loading_card} key={index} />
              ))}
            </div>
          ) : (
            <LibraryList data={library} returnCurrentType={returnCurrentType} />
          )}
        </div>
      </div>
    </View>
  );
}

export default Library;
