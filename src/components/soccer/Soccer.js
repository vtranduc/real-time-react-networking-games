import React, { useEffect, useState } from "react";
import useKeyPressMultiple from "../../helpers/useKeyPressMultiple";
import useKeyPress from "../../helpers/useKeyPress";
import ChatBox from "../chatBox/ChatBox";

// const ReactDOM = require("react-dom");

export default function Soccer({ socket }) {
  //----------------------Literals
  const temporaryRoom = "testingSoccer";
  // All values for this myst be integers
  const fieldSpec = { height: 700, width: 1100, top: 250, left: 70 };
  // Both width and height are the ratio relative to the fieldSpec's width
  // The MUST be the value between 0 and 1
  const ballSpec = { width: 0.05, height: 0.05 };
  const playerSpec = { width: 0.045, height: 0.09 };
  const config = { frameDuration: 0.07, gameTime: 30 };
  const playerPhysics = {
    reverseAccel: { x: 2, y: 2 }, // Ratio to the field width. Per second
    wallBounce: 0.5, // Speed reduced upon collision with the wall
    ballToPlayerMassRatio: 1,
    accelMag: 0.8,
    maxSpeed: 0.2,
    accelReverseMag: 1.7,
    kickPower: 0.7
  };
  const ballPhysics = {
    // resistance: { x: 0.2, y: 0.2 }, // Ratio to the field width. Per second
    wallBounce: 0.9, // Speed reduced upon collision with the wall
    // Think of it as magnitude of acceleration which acts in  the direction opposite
    // to the ball's velocity
    // It is in the ratio wrt the width of the field
    friction: 0.4
  };
  const pinSpec = { width: 40, height: 40 };
  //----------------------

  const [gameStat, setGameStat] = useState(null);
  const [flagged, setFlagged] = useState(true);

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
    socket.on("soccerRemoveFlag", () => {
      console.log("Have kicked the ball!");
      setFlagged(false);
    });
    return () => {
      console.log("Unmounting!");
      socket.removeListener("soccerUpdateGame");
      socket.removeListener("soccerRemoveFlag");

      socket.emit("soccerDisconnect", temporaryRoom);
    };
  }, []);

  const w = useKeyPressMultiple(["w", "W", "ArrowUp"]);
  const a = useKeyPressMultiple(["a", "A", "ArrowLeft"]);
  const d = useKeyPressMultiple(["d", "D", "ArrowRight"]);
  const s = useKeyPressMultiple(["s", "S", "ArrowDown"]);

  useEffect(() => {
    // console.log("sagi", document.activeElement);

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

  const spaceBar = useKeyPress(" ");
  const Shift = useKeyPress("Shift");
  useEffect(() => {
    socket.emit("soccerChaseBall", { chase: spaceBar, room: temporaryRoom });
  }, [spaceBar]);
  useEffect(() => {
    // console.log("braking HEREEEEEEEEEEEEEEEEfffff", f);
    socket.emit("soccerApplyBrake", { brake: Shift, room: temporaryRoom });
  }, [Shift]);

  const mousing = useMouseClick(fieldSpec);
  useEffect(() => {
    if (flagged) {
      socket.emit("soccerAim", { room: temporaryRoom, aim: null });
      setFlagged(false);
    } else {
      socket.emit("soccerAim", { room: temporaryRoom, aim: mousing });
      setFlagged(true);
    }
  }, [mousing]);

  return (
    <div
    // onFocus={() => {
    //   console.log("being a target now");
    // }}
    >
      <img
        src="assets/soccer/field.png"
        style={{
          height: fieldSpec.height,
          width: fieldSpec.width,
          position: "absolute",
          top: fieldSpec.top,
          left: fieldSpec.left
        }}
      ></img>
      <ChatBox
        left={fieldSpec.left + fieldSpec.width + 20}
        top={fieldSpec.top}
        height={fieldSpec.height}
        width={500}
      ></ChatBox>
      {gameStat && (
        <div>
          <div
            style={{
              position: "absolute",
              top: fieldSpec.top - 50,
              left: fieldSpec.left + fieldSpec.width / 3
            }}
          >
            {gameStat.timeRemaining > 0 ? (
              <h3>
                Score: {gameStat.score.A} - {gameStat.score.A} Time remaining:{" "}
                {gameStat.timeRemaining} s
              </h3>
            ) : (
              <h3>
                Score: {gameStat.score.A} - {gameStat.score.A} Game Over
              </h3>
            )}
          </div>

          {Object.keys(gameStat.players).map(socketId => {
            return (
              <img
                key={socketId}
                src="assets/soccer/nozomi.png"
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
          {flagged && (
            <img
              src="assets/soccer/pin.png"
              style={{
                width: pinSpec.width,
                hegith: pinSpec.height,
                top: mousing.y - pinSpec.height,
                left: mousing.x - pinSpec.width / 2,
                position: "absolute",
                border: "solid"
              }}
            ></img>
          )}
        </div>
      )}
      <img src="assets/soccer/background.jpg" />
    </div>
  );
}

//=============================================================

const useMouseClick = function(fieldSpec) {
  const [mousing, setMousing] = useState({ x: null, y: null });
  const handleMouseUp = function(event) {
    if (
      event.clientX >= fieldSpec.left &&
      event.clientX <= fieldSpec.left + fieldSpec.width &&
      event.clientY >= fieldSpec.top &&
      event.clientY <= fieldSpec.top + fieldSpec.height
    ) {
      setMousing({ x: event.clientX, y: event.clientY });
    }
  };
  useEffect(() => {
    // window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      // window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return mousing;
};
