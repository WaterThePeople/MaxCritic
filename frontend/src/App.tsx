import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from "./App.module.sass";

import View from "./wrappers/View/View";
import Navbar from "wrappers/Navbar/Navbar";

function App() {
  return (
    <Router>
      <View>
        <Navbar>
          <Routes>
            <Route path="/" />
            <Route path="/games" />
            <Route path="/movies" />
            <Route path="/shows" />
            <Route path="/music" />
            <Route path="/login" />
            <Route path="/register" />
          </Routes>
        </Navbar>
      </View>
    </Router>
  );
}

export default App;
