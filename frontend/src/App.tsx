import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import style from "./App.module.sass";

import View from "./wrappers/View/View";
import Header from "wrappers/Header/Header";

function App() {
  return (
    <Router>
      <View>
        <Header>
          <Routes>
            <Route path="/" />
            <Route path="/products" />
            <Route path="/products/:id" />
            <Route path="/sales" />
          </Routes>
        </Header>
      </View>
    </Router>
  );
}

export default App;
