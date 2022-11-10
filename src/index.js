import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Main from "./App/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Route exact path="/" component={Main} />
  </Router>
);
