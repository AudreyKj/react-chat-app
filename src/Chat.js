import React from "react";
import axios from "axios";

function Chat() {
  return (
    <>
      <section className="chat">
        <div className="message-container"></div>

        <div className="new-message-input">
          <form>
            <label forhtml="newMessage"> </label>
            <textarea
              id="newMessage"
              name="newMessage"
              rows="1"
              cols="50"
              placeholder="Message"
            ></textarea>

            <button>Send</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Chat;
