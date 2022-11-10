import { useEffect, useState, useContext } from "react";

import { db } from "../firebase";
import { AuthContext } from "../auth_context";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./App.css";

function App() {
  const authContext = useContext(AuthContext);

  const [item, setItem] = useState("");

  return (
    <div className="App">
      <h1>Welcome to the todo list</h1>
      {authContext.user ? "Logged in" : "Not logged in"}
      <TextField
        variant="outlined"
        label="Enter a to do item"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
        onKeyPress={async (e) => {
          if (e.key === "Enter") {
            var x = await db.collection("todos").add({
              item: item,
              completed: false,
            });
            setItem("");
          }
        }}
      />
    </div>
  );
}

export default App;
