import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Timestamp from "react-timestamp";

function Chat() {
  const [loading, setLoading] = useState(true);
  const [errorEmptyMessage, setErrorEmptyMessage] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const [errorPostMessage, setErrorPostMessage] = useState(false);
  const [prevMessages, setPrevMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messagesPosted, setMessagesPosted] = useState([]);
  const elementRef = useRef(null);
  const texteareaRef = useRef(null);

  const UNIQUE_TOKEN = process.env.REACT_APP_TOKEN;

  const url = `https://chatty.kubernetes.doodle-test.com/api/chatty/v1.0/?since=1521096352339&limit=10&token=${UNIQUE_TOKEN}`;

  /* eslint-disable */
  //disabled eslint to pass empty array to useEffect
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setPrevMessages(response.data);
        elementRef.current.scrollTop =
          elementRef.current.scrollHeight - elementRef.current.clientHeight;
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setErrorApi(true);
      });
  }, []);

  const writingMessage = e => {
    setNewMessage(e.target.value);
    setErrorEmptyMessage(false);
  };

  const sendMessage = e => {
    e.preventDefault();

    if (newMessage.length === 0) {
      setErrorEmptyMessage(true);
      return;
    }

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
        setMessagesPosted(prevMessages => [...prevMessages, response.data]);

        elementRef.current.scrollTop =
          elementRef.current.scrollHeight - elementRef.current.clientHeight;

        setNewMessage("");
        texteareaRef.current.focus();
      })
      .catch(error => {
        setErrorPostMessage(true);
      });
  };

  const enterCheck = e => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  return (
    <>
      <section className="chat" ref={elementRef}>
        {loading && (
          <span className="loading" data-testid="loading">
            Loading...
          </span>
        )}
        {errorApi && (
          <span className="error">
            Error in fetching the previous messages; please try again later!
          </span>
        )}
        <div className="message-container">
          {prevMessages &&
            prevMessages.map(message => (
              <div
                className="old-message message"
                key={message._id}
                data-testid="past-messages"
              >
                <span className="name">{message.author}</span>
                <p className="user-message"> {message.message}</p>
                <span className="date">
                  <Timestamp
                    date={message.timestamp}
                    options={{ includeDay: true, twentyFourHour: true }}
                  />
                </span>
              </div>
            ))}

          {messagesPosted.map(message => (
            <div className="new-message-posted message" key={message._id}>
              <p className="user-message"> {message.message}</p>
              <span className="date date-new-message">
                <Timestamp
                  date={message.timestamp}
                  options={{ includeDay: true, twentyFourHour: true }}
                />
              </span>
            </div>
          ))}
        </div>

        {errorPostMessage && (
          <span className="error">
            Error: your message couldn't be posted. Please try again later!
          </span>
        )}

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
              ref={texteareaRef}
            ></textarea>

            <button onClick={sendMessage}>Send</button>
          </form>
        </div>
      </section>
      {errorEmptyMessage && (
        <span className="error">
          Error: empty messages cannot be sent; please write something.
        </span>
      )}
    </>
  );
}

export default Chat;
