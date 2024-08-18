import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "wrappers/Navbar/Navbar";
import Login from "views/Login/Login";
import Home from "views/Home/Home";

import { checkUserAuth } from "./Authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkUserAuth();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <Navbar isAuth={isAuthenticated}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" />
          <Route path="/movies" />
          <Route path="/shows" />
          <Route path="/music" />
          <Route path="/login" element={<Login isAuth={isAuthenticated} />} />
          <Route path="/register" />
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
