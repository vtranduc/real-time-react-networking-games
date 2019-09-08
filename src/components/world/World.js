import React, { useEffect } from "react";
import "../../styles/chatBubble.css";

// import Cookies from "universal-cookie";

// const cookies = new Cookies();

// cookies.set("myCat", "HEllo world", {
//   path: "/"
// });
// console.log("LooKKK JERE", cookies.get("myCat")); // Pacman

export default function World({ match, testStr }) {
  useEffect(() => {
    console.log("show meeeeeeee", testStr, match);
  }, []);
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        width: "30%",
        height: "100%",
        border: "solid"
      }}
    >
      <h1>Test123 HERE</h1>
    </div>
  );
}
