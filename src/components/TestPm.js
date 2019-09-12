import React, { useEffect } from "react";
import Pmbox from "./pmbox/Pmbox";

export default function TestPm({ socket }) {
  return (
    <>
      <h1>This is a chat message</h1>
      <Pmbox viewer={"oblunn4"} target={"cdohms3"} socket={socket}></Pmbox>
    </>
  );
}
