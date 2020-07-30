import React, { useState, useEffect } from "react";
import axios from "axios";

function Chat() {
  const [prevMessages, setPrevMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messagePosted, setMessagePosted] = useState([]);

  const UNIQUE_TOKEN = process.env.REACT_APP_TOKEN;
  const url = `https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?token=[${UNIQUE_TOKEN}]`;

  //   const url = `https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?
  // since=1521096352339&limit=10&token=${UNIQUE_TOKEN}`;

  /* eslint-disable */
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        console.log("data", response);
        setPrevMessages(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  }, []);

  const writingMessage = e => {
    setNewMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();

    console.log("newMessage", newMessage);

    axios
      .post(
        "https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0",
        { message: newMessage, author: "User" },
        {
          headers: {
            "content-type": "application/json; charset=utf-8",
            token: UNIQUE_TOKEN
          }
        }
      )
      .then(response => {
        console.log("response", response);
        setMessagePosted(prevMessages => [...prevMessages, response.data]);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const enterCheck = e => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <>
      <section className="chat">
        <div className="message-container">
          {messagePosted &&
            messagePosted.map(message => (
              <div className="new-message-posted message" key={message._id}>
                <p className="user-message"> {message.message}</p>
                <span className="date date-new-message">
                  {message.timestamp}
                </span>
              </div>
            ))}
        </div>

        <div className="new-message-input">
          <form>
            <label forhtml="newMessage"> </label>
            <textarea
              id="newMessage"
              name="newMessage"
              rows="1"
              cols="50"
              placeholder="Message"
              value={newMessage}
              onChange={writingMessage}
              onKeyDown={enterCheck}
            ></textarea>

            <button onClick={sendMessage}>Send</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Chat;
