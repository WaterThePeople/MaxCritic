import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ApiTestView from "views/ApiTestView/ApiTestView";

import Wrapper from "wrappers/Wrapper/Wrapper";
import Login from "views/Login/Login";
import Register from "views/Register/Register";
import Home from "views/Home/Home";

import Profile from "views/Profile/Profile";

import Games from "views/Games/Games";
import Game from "views/Games/Game/Game";

import { isAuthenticated } from "./utils/Authentication";

import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "./utils/Authentication";

function App() {
  const isAuth = isAuthenticated();
  const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  const getUserData = async () => {
    const { accessToken } = await returnAccessToken();
    setUserDataLoading(true);
    axios
      .get(`${serverPath}api/user/info/`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setUserData(response?.data);
        setUserDataLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuth) {
      getUserData();
    }
  }, [isAuth]);

  return (
    <Router>
      <Wrapper isAuth={isAuth} userData={userData}>
        <Routes>
          <Route path="/test" element={<ApiTestView />} />

          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<Game userData={userData} />} />
          <Route path="/movies" />
          <Route path="/shows" />
          <Route path="/music" />
          <Route path="/login" element={<Login isAuth={isAuth} />} />
          <Route path="/register" element={<Register isAuth={isAuth} />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
