import { useEffect, useState, useContext } from "react";

import { db } from "../firebase";
import { AuthContext } from "../auth_context";

import { fetchFirstPage, fetchAfter, fetchBefore } from "./todo-state";

import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

import "./App.css";

const PAGE_SIZE = 3;

function App() {
  const authContext = useContext(AuthContext);

  const [item, setItem] = useState("");
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState();
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  useEffect(() => {
    if (authContext.user) {
      setUserId(authContext.user.user.uid);
    }
  }, [authContext]);

  // Get the first page of the users data
  useEffect(() => {
    fetchFirstPage(userId, PAGE_SIZE).then((res) => {
      setItems(res.data);
      setHasNextPage(res.morePagesAvailable);
    });
  }, [userId]);

  if (!userId) {
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
          tabIndex={-1}
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
            docRef
              .set({
                id: docRef.id,
                name: item,
                user: authContext.user.user.uid,
                completed: false,
                createdAt: Date.now(),
              })
              .then(() => {
                setItem("");
                //Now fetch last page with the new item
                fetchBefore(userId, docRef.id, PAGE_SIZE).then((res) => {
                  setItems(res.data);
                  setHasPreviousPage(res.morePagesAvailable);
                });
              });
          }
        }}
      />
      <hr />
      <div className="todoList">
        <List>
          {items.map((item) => {
            return listItem(item);
          })}
        </List>
        <Button
          variant="contained"
          disabled={!hasPreviousPage}
          onClick={() => {
            fetchBefore(userId, items[0].id, PAGE_SIZE).then((res) => {
              setItems(res.data);
              setHasPreviousPage(res.morePagesAvailable);
            });
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!hasNextPage}
          onClick={() => {
            fetchAfter(userId, items[items.length - 1].id, PAGE_SIZE).then(
              (res) => {
                setItems(res.data);
                setHasPreviousPage(true);
                setHasNextPage(res.morePagesAvailable);
              }
            );
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
