import React, { useEffect, useState } from "react";
import useKeyPressMultiple from "../../helpers/useKeyPressMultiple";

export default function Soccer({ socket }) {
  //----------------------Literals
  const temporaryRoom = "testingSoccer";
  // All values for this myst be integers
  const fieldSpec = { height: 600, width: 800, top: 170, left: 50 };
  // Both width and height are the ratio relative to the fieldSpec's width
  // The MUST be the value between 0 and 1
  const ballSpec = { width: 0.05, height: 0.05 };
  const playerSpec = { width: 0.045, height: 0.06 };
  const config = { frameDuration: 0.07 };
  const playerPhysics = {
    maxVel: { x: 0.5, y: 0.5 }, // Ratio to the field width. Per second
    accel: { x: 1.2, y: 1.2 }, // Ratio to the field width. Per second
    reverseAccel: { x: 6, y: 6 }, // Ratio to the field width. Per second
    resistance: { x: 1.2, y: 1.2 }, // Ratio to the field width. Per second
    wallBounce: 0.5, // Speed reduced upon collision with the wall
    ballToPlayerMassRatio: 0.3
  };
  const ballPhysics = {
    resistance: { x: 0.2, y: 0.2 }, // Ratio to the field width. Per second
    wallBounce: 0.9 // Speed reduced upon collision with the wall
  };
  //----------------------

  const [spritePos, setSpritePos] = useState(null);

  useEffect(() => {
    socket.emit("soccerInit", {
      room: temporaryRoom,
      fieldSpec,
      config,
      playerPhysics,
      playerSpec,
      ballSpec,
      ballPhysics
    });
    socket.on("soccerUpdateGame", data => {
      setSpritePos(data);
    });
    return () => {
      console.log("Unmounting!");
      socket.removeListener("soccerUpdateGame");

      socket.emit("soccerDisconnect", temporaryRoom);
    };
  }, []);

  const w = useKeyPressMultiple(["w", "ArrowUp"]);
  const a = useKeyPressMultiple(["a", "ArrowLeft"]);
  const d = useKeyPressMultiple(["d", "ArrowRight"]);
  const s = useKeyPressMultiple(["s", "ArrowDown"]);

  useEffect(() => {
    socket.emit("soccerHandleKeyPress", {
      axis: "x",
      dir: a ? (d ? "" : "left") : d ? "right" : "",
      room: temporaryRoom
    });
  }, [a, d]);
  useEffect(() => {
    socket.emit("soccerHandleKeyPress", {
      axis: "y",
      dir: w ? (s ? "" : "up") : s ? "down" : "",
      room: temporaryRoom
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
          {Object.keys(spritePos.players).map(socketId => {
            return (
              <img
                key={socketId}
                src="assets/soccer/player.png"
                style={{
                  height: Math.floor(playerSpec.height * fieldSpec.width),
                  width: Math.floor(playerSpec.width * fieldSpec.width),
                  top: spritePos.players[socketId].y,
                  left: spritePos.players[socketId].x,
                  position: "absolute"
                }}
              ></img>
            );
          })}
        </div>
      )}
    </>
  );
}
