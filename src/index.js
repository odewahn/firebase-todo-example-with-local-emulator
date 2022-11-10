import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./App/auth_context";
import Main from "./App/Main";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AuthProvider>
      <Route exact path="/" component={Main} />
    </AuthProvider>
  </Router>
);
