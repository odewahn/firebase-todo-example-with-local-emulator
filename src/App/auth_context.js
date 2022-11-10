import { React, useEffect, useState } from "react";
import { createContext } from "react";

import { firebaseAuth } from "./firebase";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  console.log("Setting up Auth Provider");

  return (
    <AuthContext.Provider value={{ user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
