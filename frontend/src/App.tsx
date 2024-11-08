import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ApiTestView from "views/ApiTestView/ApiTestView";

import Wrapper from "wrappers/Wrapper/Wrapper";
import Login from "views/Login/Login";
import Register from "views/Register/Register";
import Home from "views/Home/Home";

import Games from "views/Games/Games";
import GameDetail from "views/Games/GameDetail/GameDetail";

import { checkUserAuth } from "./utils/Authentication";

import axios from "axios";
import { serverPath } from "BackendServerPath";
import { returnAccessToken } from "./utils/Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkUserAuth();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

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
    if (isAuthenticated) {
      getUserData();
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Wrapper isAuth={isAuthenticated}>
        <Routes>
          <Route path="/test" element={<ApiTestView />} />

          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/games/:slug" element={<GameDetail />} />
          <Route path="/movies" />
          <Route path="/shows" />
          <Route path="/music" />
          <Route path="/login" element={<Login isAuth={isAuthenticated} />} />
          <Route
            path="/register"
            element={<Register isAuth={isAuthenticated} />}
          />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
