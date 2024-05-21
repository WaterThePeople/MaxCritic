import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import style from "./App.module.sass";

import ApiTestView from "./views/ApiTestView/ApiTestView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiTestView />} />
        <Route path="/products" />
        <Route path="/products/:id" />
        <Route path="/sales" />
      </Routes>
    </Router>
  );
}

export default App;
