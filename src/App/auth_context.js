import { React, useEffect, useState } from "react";
import { createContext } from "react";

import firebase from "firebase/compat/app";

import { firebaseAuth } from "./firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "./index.css";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (user) => {
        console.log(user);
        setUser(user);
      },
    },
  };

  const SignIn = () => {
    return (
      <div className="main">
        <h3>To Do List</h3>
        <p>Please sign-in:</p>
        <div className="interior">
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
        </div>
      </div>
    );
  };

  return (
    <AuthContext.Provider value={{ user, SignIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
