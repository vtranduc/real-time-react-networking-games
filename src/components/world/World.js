import React from "react";
import "../../styles/chatBubble.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

cookies.set("myCat", "HEllo world", {
  path: "/"
});
// console.log("LooKKK JERE", cookies.get("myCat")); // Pacman

export default function World({ socket }) {
  return (
    <h1>Test123 HERE</h1>
    // <div className="speech-buble-wrapper">
    //   <div className="speech-bubble">
    //     <p>This is supposed to be a bubble</p>
    //   </div>
    // </div>
  );
}
