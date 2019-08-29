import React, { useEffect, useState } from "react";
import useKeyPress from "../../helpers/useKeyPress";
// const useKeyPress = require("../../helpers/useKeyPress");

export default function Soccer({ socket }) {
  //----------------------Literals
  const temporaryRoom = "testingSoccer";
  const fieldSpec = { height: 600, width: 800, top: 150, left: 50 };
  // Both width and height are relative to the fieldSpec's width
  const ballSpec = { width: 0.05, height: 0.05 };
  //----------------------

  const [spritePos, setSpritePos] = useState(null);

  useEffect(() => {
    socket.emit("soccerInit", { room: temporaryRoom, fieldSpec });
    socket.on("soccerUpdateGame", data => {
      console.log("update the game");
      console.log(data);
      setSpritePos(data);
    });
    return () => {
      console.log("Unmounting!");
      socket.emit("soccerDisconnect", temporaryRoom);
    };
  }, []);

  const w = useKeyPress("w");
  const a = useKeyPress("a");
  const d = useKeyPress("d");
  const s = useKeyPress("s");

  useEffect(() => {
    socket.emit("soccerHandleKeyPress", {
      axis: "x",
      dir: a ? (d ? "" : "left") : d ? "right" : ""
    });
  }, [a, d]);
  useEffect(() => {
    socket.emit("soccerHandleKeyPress", {
      axis: "y",
      dir: w ? (s ? "" : "up") : s ? "down" : ""
    });
  }, [w, s]);

  return (
    <>
      <img
        src="assets/soccer/field.jpg"
        style={{
          height: fieldSpec.height,
          width: fieldSpec.width,
          position: "absolute",
          top: fieldSpec.top,
          left: fieldSpec.left
        }}
      ></img>
      {spritePos && (
        <div>
          <img
            src="assets/soccer/ball.png"
            style={{
              height: Math.floor(ballSpec.height * fieldSpec.width),
              width: Math.floor(ballSpec.width * fieldSpec.width),
              position: "absolute",
              top: spritePos.ball.y,
              left: spritePos.ball.x
            }}
          ></img>
        </div>
      )}
    </>
  );
}
