import React, { useEffect, useState } from "react";
import useKeyPressMultiple from "../../helpers/useKeyPressMultiple";

export default function Soccer({ socket }) {
  //----------------------Literals
  const temporaryRoom = "testingSoccer";
  // All values for this myst be integers
  const fieldSpec = { height: 600, width: 800, top: 170, left: 70 };
  // Both width and height are the ratio relative to the fieldSpec's width
  // The MUST be the value between 0 and 1
  const ballSpec = { width: 0.05, height: 0.05 };
  const playerSpec = { width: 0.045, height: 0.06 };
  const config = { frameDuration: 0.07, gameTime: 30 };
  const playerPhysics = {
    maxAbsVel: { x: 0.5, y: 0.5 }, // Ratio to the field width. Per second
    accel: { x: 0.8, y: 0.8 }, // Ratio to the field width. Per second
    reverseAccel: { x: 6, y: 6 }, // Ratio to the field width. Per second
    resistance: { x: 1.2, y: 1.2 }, // Ratio to the field width. Per second
    wallBounce: 0.5, // Speed reduced upon collision with the wall
    ballToPlayerMassRatio: 0.2
  };
  const ballPhysics = {
    resistance: { x: 0.2, y: 0.2 }, // Ratio to the field width. Per second
    wallBounce: 0.9, // Speed reduced upon collision with the wall
    // Think of it as magnitude of acceleration which acts in  the direction opposite
    // to the ball's velocity
    // It is in the ratio wrt the width of the field
    friction: 0.001
  };
  //----------------------

  const [gameStat, setGameStat] = useState(null);

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
      setGameStat(data);
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
      {gameStat && (
        <div>
          <div
            style={{
              position: "absolute",
              top: fieldSpec.top,
              left: fieldSpec.left + fieldSpec.width
            }}
          >
            <h3>
              Score: {gameStat.score.A} - {gameStat.score.A}
            </h3>
            <h3>Time remaining:</h3>
            <h3>{gameStat.timeRemaining} s</h3>
          </div>
          <img
            src="assets/soccer/ball.png"
            style={{
              height: Math.floor(ballSpec.height * fieldSpec.width),
              width: Math.floor(ballSpec.width * fieldSpec.width),
              position: "absolute",
              top: gameStat.ball.y,
              left: gameStat.ball.x
            }}
          ></img>
          {Object.keys(gameStat.players).map(socketId => {
            return (
              <img
                key={socketId}
                src="assets/soccer/player.png"
                style={{
                  height: Math.floor(playerSpec.height * fieldSpec.width),
                  width: Math.floor(playerSpec.width * fieldSpec.width),
                  top: gameStat.players[socketId].y,
                  left: gameStat.players[socketId].x,
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
