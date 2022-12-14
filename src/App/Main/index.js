import { useEffect, useState, useContext } from "react";

import { db } from "../firebase";
import { AuthContext } from "../auth_context";

import {
  fetchFistPage,
  fetchNextPage,
  fetchPreviosPage,
} from "../PaginatedToDoList/todo-state";

import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

import "./App.css";

const PAGE_SIZE = 3;

function App() {
  const authContext = useContext(AuthContext);

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);

  // Set up the snapshot listener
  useEffect(() => {
    if (authContext.user) {
      db.collection("todos")
        .where("user", "==", authContext.user.user.uid)
        .orderBy("createdAt", "asc")
        .onSnapshot((snapshot) => {
          setItems(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [authContext]);

  if (authContext.user === null) {
    return <authContext.SignIn />;
  }

  const listItem = (item) => {
    return (
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon
              onClick={async () => {
                await db.collection("todos").doc(item.id).delete();
              }}
            />
          </IconButton>
        }
      >
        <Checkbox
          edge="start"
          checked={item.completed}
          disableRipple
          onClick={async () => {
            await db.collection("todos").doc(item.id).update({
              completed: !item.completed,
            });
          }}
        />
        <ListItemText primary={item.name} />
      </ListItem>
    );
  };

  return (
    <div>
      <h1>Welcome to the todo list, {authContext.user.user.displayName}</h1>
      <TextField
        variant="outlined"
        label="Enter a to do item"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
        onKeyPress={async (e) => {
          if (e.key === "Enter") {
            // Create a new record, making sure to store it's key as a field for later reference
            var docRef = db.collection("todos").doc();
            docRef.set({
              id: docRef.id,
              name: item,
              user: authContext.user.user.uid,
              completed: false,
              createdAt: Date.now(),
            });
            setItem("");
          }
        }}
      />
      <hr />
      <div className="todoList">
        <List dense="true">
          {items.map((item) => {
            return listItem(item);
          })}
        </List>
      </div>
    </div>
  );
}

export default App;
