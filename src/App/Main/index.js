import Button from "@mui/material/Button";
import { db } from "../firebase";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the todo list</h1>
      <Button
        onClick={async () => {
          console.log("clicked");
          var myRec = {
            name: "test",
            description: "test",
            completed: false,
            value: Math.random() * 100,
          };
          var x = await db.collection("todos").add(myRec);
          console.log("x", x);
        }}
      >
        Click Me!
      </Button>
    </div>
  );
}

export default App;
