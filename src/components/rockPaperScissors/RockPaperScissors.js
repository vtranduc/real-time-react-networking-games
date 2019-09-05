import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { objectTypeSpreadProperty } from "@babel/types";

export default function RockPaperScissors({ socket }) {
  //---Temporary data---
  const room = "testRockPaperScissors123qweasd";
  const nPlayers = 3;
  //--------------------

  const [rpsData, setRpsData] = useState(null);
  const [selection, setSelection] = useState("");
  const [readyNextGame, setReadyNextGame] = useState(false);

  const handleRpsSelection = function(choice) {
    console.log("the choice 55lFDAS: ", choice);
    setSelection(choice);
    socket.emit("rpsReceiveResponse", { room, choice });
  };

  useEffect(() => {
    socket.emit("rpsInitialize", { room, nPlayers });
    const handleRpsUpdate = function(data) {
      // console.log("Current status IS: ", rpsData);
      // console.log("Prepaaping for setupa: ", data);
      // if (rpsData) {
      //   if (
      //     rpsData.status.stage === "awaiting" &&
      //     data.status.stage === "show"
      //   ) {
      //     setReadyNextGame(false);
      //   } else if (
      //     rpsData.status.stage === "show" &&
      //     data.status.stage === "awaiting"
      //   ) {
      //     console.log("MUST COME HERE!");
      //     setSelection("");
      //   }

      //   console.log("sage: ", rpsData.status.stage);
      //   console.log(data.status.stage);
      // }

      if (data.status.switchStage) {
        // console.log("CHANGE STATE NOW");
        // if (data.)
        if (data.status.stage === "show") {
          setReadyNextGame(false);
        } else if (data.status.stage === "awaiting") {
          setSelection("");
        }
      }

      // console.log(
      //   "TESTING THE SORTING STUFFS!: ",
      //   rpsSortPlayers(data.players)
      // );
      // console.log("INCOMING: ", data);
      setRpsData(data);
    };
    socket.on("rpsUpdate", handleRpsUpdate);

    return () => {
      socket.removeListener("rpsUpdate", handleRpsUpdate);
      socket.emit("rpsDisconnect", room);
    };
  }, []);

  return (
    <Paper style={{ margin: "3vw", height: "50vh" }}>
      {rpsData ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            // border: "solid",
            height: "100%"
          }}
        >
          <List
            style={{
              // border: "solid",
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            {rpsSortPlayers(rpsData.players).map(player => {
              return (
                <ListItem
                  key={`displayPlayers${player}`}
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  {rpsData.players[player].response ? (
                    <div>
                      {rpsData.status.stage === "show" ? (
                        <div>
                          <h4>{player}</h4>
                          <h5>has selected</h5>
                          <img
                            src={`assets/rockPaperScissors/${rpsData.players[player].response}.png`}
                            alt={`assets/rockPaperScissors/${rpsData.players[player].response}.png`}
                            style={{
                              width: "10vw",
                              margin: "auto",
                              display: "flex",
                              justifyContent: "center"
                            }}
                          ></img>
                        </div>
                      ) : (
                        <h4 style={{ color: "green" }}>
                          {player} Ready&#10004;
                        </h4>
                      )}
                    </div>
                  ) : (
                    <h4>{player}</h4>
                  )}
                  <h4>Score: {rpsData.players[player].score}</h4>
                </ListItem>
              );
            })}
          </List>
          {rpsData.status.stage === "show" && (
            // <div
            //   style={{
            //     display: "flex",
            //     flexDirection: "column"
            //   }}
            // >
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {rpsData.status.winner ? (
                  <div>
                    {selection === rpsData.status.winner ? (
                      <h2>You win!</h2>
                    ) : (
                      <h2>You lose...</h2>
                    )}
                  </div>
                ) : (
                  <h3>It is a tie</h3>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {readyNextGame ? (
                  <p>Waiting for other players...</p>
                ) : (
                  <button
                    onClick={() => {
                      // console.log("getting ready here...");
                      setReadyNextGame(true);
                      socket.emit("rpsGetReady", { room });
                    }}
                  >
                    Get ready for next game
                  </button>
                )}
              </div>
            </div>
          )}
          {rpsData.status.stage === "awaiting" && (
            <div>
              {selection ? (
                <div
                  style={{
                    display: "flex",
                    // justifyContent: "center",
                    flexDirection: "column"
                    // paddingRight: "10vw",
                    // paddingLeft: "10vw",
                  }}
                >
                  <h3 style={{ margin: "auto" }}>
                    You have selected {selection}!
                  </h3>
                  <br></br>
                  <img
                    src={`assets/rockPaperScissors/${selection}.png`}
                    alt={`assets/rockPaperScissors/${selection}.png`}
                    style={{ width: "10vw", margin: "auto" }}
                  ></img>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <h4>What will you choose?</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      paddingRight: "20vw",
                      paddingLeft: "20vw"
                    }}
                  >
                    <button
                      onClick={() => {
                        handleRpsSelection("rock");
                      }}
                    >
                      <img
                        src="assets/rockPaperScissors/rock.png"
                        alt="rpsRock"
                        style={{ width: "10vw" }}
                      ></img>
                    </button>
                    <button
                      onClick={() => {
                        handleRpsSelection("paper");
                      }}
                    >
                      <img
                        src="assets/rockPaperScissors/paper.png"
                        alt="rpsRock"
                        style={{ width: "10vw" }}
                      ></img>
                    </button>
                    <button
                      onClick={() => {
                        handleRpsSelection("scissor");
                      }}
                    >
                      <img
                        src="assets/rockPaperScissors/scissor.png"
                        alt="rpsRock"
                        style={{ width: "10vw" }}
                      ></img>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <h3>Waiting for all users to join the game...</h3>
      )}
    </Paper>
  );
}

const rpsSortPlayers = function(players) {
  let output = [];
  for (let i = 1; i <= Object.keys(players).length; i++) {
    output.push(Object.keys(players).find(player => players[player].id === i));
  }
  return output;
};
