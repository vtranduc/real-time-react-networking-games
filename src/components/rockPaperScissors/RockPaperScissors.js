import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import "../../styles/chatBubble.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../../helpers/useKeyPress";
import "./rockPaperScissors.css";
import Chip from "@material-ui/core/Chip";

import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

// const bubbleMirror = {};

export default function RockPaperScissors({ socket }) {
  //---Temporary data---
  const room = "testRockPaperScissors123qweasd";
  const nPlayers = 2;
  //--------------------

  const classes = useStyles();
  const chatBubbleTimeOut = 5000;
  const [rpsData, setRpsData] = useState(null);
  const [selection, setSelection] = useState("");
  const [readyNextGame, setReadyNextGame] = useState(false);
  const [chatMode, setChatMode] = useState({
    inQueue: false,
    mode: false,
    msg: ""
  });
  const [bubble, setBubble] = useState({});
  const [bubbleTrigger, setBubbleTrigger] = useState(null);
  const [logMode, setLogMode] = useState(false);

  const handleRpsSelection = function(choice) {
    setSelection(choice);
    socket.emit("rpsReceiveResponse", { room, choice });
  };

  useEffect(() => {
    socket.emit("rpsInitialize", { room, nPlayers });
    const handleRpsUpdate = function(data) {
      if (data.status.switchStage) {
        if (data.status.stage === "show") {
          setReadyNextGame(false);
        } else if (data.status.stage === "awaiting") {
          setSelection("");
        }
      }
      setRpsData(data);
    };
    socket.on("rpsUpdate", handleRpsUpdate);

    const handleRpsAddBubble = function(data) {
      setRpsData(data.gameData);
      setBubbleTrigger({ sender: data.sender, msg: data.bubble });
    };
    socket.on("rpsAddBubble", handleRpsAddBubble);

    return () => {
      socket.removeListener("rpsUpdate", handleRpsUpdate);
      socket.removeListener("rpsAddBubble", handleRpsAddBubble);
      socket.emit("rpsDisconnect", room);
    };
  }, []);

  useEffect(() => {
    if (bubbleTrigger) {
      console.log("nan");
      setBubble(oldBubble => {
        if (
          oldBubble[bubbleTrigger.sender] &&
          oldBubble[bubbleTrigger.sender].interval
        ) {
          clearTimeout(oldBubble[bubbleTrigger.sender].interval);
        }
        return {
          ...oldBubble,
          [bubbleTrigger.sender]: {
            msg: bubbleTrigger.msg,
            interval: setTimeout(() => {
              setBubble(oldBubble => {
                return {
                  ...oldBubble,
                  [bubbleTrigger.sender]: { msg: null, interval: null }
                };
              });
            }, chatBubbleTimeOut)
          }
        };
      });
      setBubbleTrigger(null);

      //=================================================
    }
  }, [bubbleTrigger]);

  useEffect(() => {
    if (chatMode.inQueue) {
      socket.emit("rpsReceiveMsg", { room: room, msg: chatMode.msg });
      setChatMode({ ...chatMode, inQueue: false, msg: "" });
    }
  }, [chatMode.inQueue]);

  const Enter = useKeyPress("Enter");
  useEffect(() => {
    if (Enter) {
      if (chatMode.mode) {
        if (chatMode.msg) {
          setChatMode({ ...chatMode, inQueue: true });
        } else {
          document.getElementById("rpsChatTextField").blur();
        }
      } else {
        document.getElementById("rpsChatTextField").focus();
      }
    }
  }, [Enter]);

  return (
    <>
      <Paper
        id="rpsPaper"
        style={{
          position: "relative",
          marginRight: "3vw",
          marginLeft: "3vw",
          marginBottom: "2vh",
          height: "60vh",
          marginTop: "3vh"
        }}
      >
        <Fab
          variant="extended"
          aria-label="delete"
          className={classes.fab}
          style={{
            zIndex: 1,
            position: "absolute",
            bottom: "1vh",
            right: "1vw",
            display: "inline-block"
          }}
          onClick={() => {
            if (logMode) {
              setLogMode(false);
            } else {
              setLogMode(true);
            }
          }}
        >
          <NavigationIcon className={classes.extendedIcon} />
          Chat log
        </Fab>
        {rpsData && logMode ? (
          <div style={{ overflow: "auto", maxHeight: "100%" }}>
            {rpsData && (
              <List style={{ overflow: "auto", height: "100%" }}>
                {rpsData.chats.map(chat => {
                  return (
                    <ListItem key={chat.id}>
                      <Chip
                        label={chat.user}
                        style={{ marginRight: "1em" }}
                      ></Chip>
                      <p>{chat.msg}</p>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        ) : (
          <div>
            {rpsData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  height: "100%"
                }}
              >
                <List
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: 0
                  }}
                >
                  {rpsSortPlayers(rpsData.players).map(player => {
                    return (
                      <ListItem
                        key={`displayPlayers${player}`}
                        className="playerScoreBox"
                      >
                        <div className="eachBoxPlayer">
                          <div className="playerBubble">
                            {bubble[player] && bubble[player].msg && (
                              <div
                                style={{
                                  marginBottom: "2vh",
                                  margingTop: "-60px"
                                }}
                              >
                                <div className="speech-buble-wrapper">
                                  <div className="speech-bubble">
                                    <p>{bubble[player].msg}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="yellowBox">
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
                              <div>
                                <h4 className="playerName">{player}</h4>
                              </div>
                            )}
                            <div>
                              <h4 className="playerScore">
                                Score: {rpsData.players[player].score}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    );
                  })}
                </List>
                {rpsData.status.stage === "show" && (
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
                          flexDirection: "column"
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
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
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
          </div>
        )}
      </Paper>

      <div
        style={{
          marginLeft: "2vw",
          marginRight: "2vw",
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "white"
        }}
      >
        <TextField
          id="rpsChatTextField"
          label="Send a chat!"
          style={{ width: "100%", marginRight: "1em" }}
          value={chatMode.msg}
          onFocus={() => {
            setChatMode({ ...chatMode, mode: true });
          }}
          onBlur={() => {
            setChatMode({ ...chatMode, mode: false });
          }}
          onChange={e => {
            setChatMode({ ...chatMode, msg: e.target.value });
          }}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (chatMode.msg) {
              setChatMode({ ...chatMode, inQueue: true });
            }
          }}
        >
          Chat!
        </Button>
      </div>
    </>
  );
}

const rpsSortPlayers = function(players) {
  let output = [];
  for (let i = 1; i <= Object.keys(players).length; i++) {
    output.push(Object.keys(players).find(player => players[player].id === i));
  }
  return output;
};
