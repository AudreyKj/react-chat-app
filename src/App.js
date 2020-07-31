import React from "react";
import "./App.scss";
import Chat from "./Chat.js";
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
      <div className="App">
        <Helmet>
          <title>Chat app</title>
          <meta name="description" content="chat app" />
          <meta name="keywords" content="chat,messages,connect,friends" />
        </Helmet>
        <Chat> </Chat>
      </div>
    </>
  );
}

export default App;
