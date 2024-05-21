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
            <Route path="/products" />
            <Route path="/products/:id" />
            <Route path="/sales" />
          </Routes>
        </Navbar>
      </View>
    </Router>
  );
}

export default App;
