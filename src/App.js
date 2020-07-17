import React from "react";
import { Button, Input, FormControl, IconButton } from "@material-ui/core";
import "./App.css";
import { useState } from "react";
import Message from "./components/Message/Message";
import { useEffect } from "react";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []);

  const handleMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setMessages([...messages, { username: username, message: input }]);
    setInput("");
  };
  return (
    <div className="App">
      <img
        className="img"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger-logo"
      />

      <h1>Adda with Arif bhai 🚀 </h1>
      <p>
        Welcome <span className="name_tag">{username} </span>{" "}
      </p>
      <form className="app_form">
        <FormControl className="app_formControl">
          <Input
            className="app_input"
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          ></Input>

          <IconButton
            className="app_iconButton"
            type="submit"
            onClick={handleMessage}
            disabled={!input}
            variant="contained"
            color="primary"
          >
            <SendIcon></SendIcon>
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message}></Message>
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
