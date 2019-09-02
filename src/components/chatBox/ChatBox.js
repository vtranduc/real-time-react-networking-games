import React, { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function ChatBox(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: props.top,
        left: props.left,
        border: "solid",
        width: props.width,
        height: props.height
      }}
    >
      <div style={{ margin: "1em" }}>
        <h1>This is chatbox</h1>
        <div style={{ background: "white", opacity: 0.5 }}>
          <TextField
            label="Send a chat!"
            onFocus={() => {
              console.log("it is being focused now");
            }}
            onChange={e => {
              console.log("hello: ", e.target.value);
            }}
          >
            Hello
          </TextField>
          <Button variant="contained" color="primary">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
