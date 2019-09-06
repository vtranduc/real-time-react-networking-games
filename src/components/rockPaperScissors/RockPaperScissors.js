import React, { useEffect, useState, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import { objectTypeSpreadProperty } from "@babel/types";
import "../../styles/chatBubble.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../../helpers/useKeyPress";
// import ChatBox from "../chatBox/ChatBox";
import "./rockPaperScissors.css";
import Chip from "@material-ui/core/Chip";

const bubbleMirror = {};

export default function RockPaperScissors({ socket }) {
  //---Temporary data---
  const room = "testRockPaperScissors123qweasd";
  const nPlayers = 2;
  //--------------------

  const chatBubbleTimeOut = 5000;

  // const interv

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

    const handleRpsAddBubble = function(data) {
      // console.log("received back :D ", data);

      setRpsData(data.gameData);
      // --------------------------------------
      console.log("BUBBLE: ", bubble);
      setBubbleTrigger({ sender: data.sender, msg: data.bubble });

      // bubbleIntervals[data.sender] = { msg: data.bubble };

      // if (bubbleIntervals[data.sender]) {
      //   clearInterval(bubbleIntervals[data.sender]);
      //   setBubble({ ...bubble, [data.sender]: { msg: null } });
      //   delete bubbleIntervals[data.sender];
      // }

      // setBubble({ ...bubble, [data.sender]: { msg: data.bubble } });
      // bubbleIntervals[data.sender] = setTimeout(() => {
      //   setBubble({ ...bubble, [data.sender]: { msg: null } });
      //   delete bubbleIntervals[data.sender];
      // }, chatBubbleTimeOut);

      // setBubble({
      //   ...bubble,
      //   [data.sender]: {
      //     msg: data.bubble,
      //     interval: setInterval(() => {
      //       console.log("be gone!");
      //       console.log([data.sender]);
      //       console.log();
      //       clearInterval(bubble[data.sender].interval);
      //       setBubble({
      //         ...bubble,
      //         [data.sender]: { msg: "", interval: null }
      //       });
      //     }, chatBubbleTimeOut)
      // }
      // });
    };
    socket.on("rpsAddBubble", handleRpsAddBubble);

    return () => {
      socket.removeListener("rpsUpdate", handleRpsUpdate);
      socket.removeListener("rpsAddBubble", handleRpsAddBubble);
      socket.emit("rpsDisconnect", room);
    };
  }, []);

  useEffect(() => {
    console.log("trigger the bubble here");
    if (bubbleTrigger) {
      const bubbleOnlyMsg = function(bubbleMirror) {
        let output = {};
        for (let player in bubbleMirror) {
          output[player] = { msg: bubbleMirror[player].msg };
        }
        return output;
      };

      if (
        bubbleMirror[bubbleTrigger.sender] &&
        bubbleMirror[bubbleTrigger.sender].interval
      ) {
        clearTimeout(bubbleMirror[bubbleTrigger.sender].interval);
      }

      bubbleMirror[bubbleTrigger.sender] = {
        msg: bubbleTrigger.msg,
        interval: null
      };
      setBubble({
        ...bubbleOnlyMsg(bubbleMirror),
        [bubbleTrigger.sender]: {
          msg: bubbleTrigger.msg
        }
      });
      bubbleMirror[bubbleTrigger.sender].interval = setTimeout(() => {
        bubbleMirror[bubbleTrigger.sender] = { msg: null, interval: null };
        setBubble({
          ...bubbleOnlyMsg(bubbleMirror)
        });
      }, chatBubbleTimeOut);
      setBubbleTrigger(null);
    }
  }, [bubbleTrigger, bubble]);

  useEffect(() => {
    console.log("Going in");
    if (chatMode.inQueue) {
      console.log("EMIT THE MSG TO THE SERVER HERE!");

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
          // setChatMode({ ...chatMode, mode: false });
          document.getElementById("rpsChatTextField").blur();
        }
      } else {
        // setChatMode({ ...chatMode, mode: true });
        document.getElementById("rpsChatTextField").focus();
      }
    }
  }, [Enter]);

  return (
    <>
      <Paper
        style={{
          marginRight: "3vw",
          marginLeft: "3vw",
          marginBottom: "2vh",
          height: "50vh",
          marginTop: "3vh"
        }}
      >
        {logMode ? (
          <div
            style={{
              border: "solid",
              // margin: "2em",
              // width: "96%",
              height: "100%"
              // marginLeft: "2%",
              // marginRight: "2%",
              // marginTop: "2%",
              // marginBottom: "2%"
            }}
          >
            {rpsData && (
              <List style={{ overflow: "auto", height: "100%" }}>
                {rpsData.chats.map(chat => {
                  console.log("it would be goods", chat);
                  return (
                    <ListItem>
                      <Chip label={chat.user}></Chip>
                      <p>{chat.msg}</p>
                    </ListItem>
                  );
                })}
              </List>
            )}
          </div>
        ) : (
          //   ListItem key={chat.key} button>
          //   <Chip
          //     label={chat.user}
          //     style={{
          //       fontSize: "0.8em",
          //       backgroundColor: "gray",
          //       marginRight: "1em"
          //     }}
          //   ></Chip>
          //   {chat.msg}
          // </ListItem>
          <div>
            {rpsData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  // border: "solid",
                  height: "100%"
                  // border: "blue 3px dotted",
                  // marginBottom: 0
                }}
              >
                <List
                  style={{
                    // border: "solid",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: 0
                    // border: "red 3px dotted"
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

                          {/* <div>
                        {bubble[player] && (
                          <div
                            style={{ marginBottom: "2vh", margingTop: "-60px" }}
                          >
                            <div className="speech-buble-wrapper">
                              <div className="speech-bubble">
                                <p>{bubble[player].msg}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div> */}

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
          // border: "solid",
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
            // console.log("jelfads", e.target.value);
            setChatMode({ ...chatMode, msg: e.target.value });
          }}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          // button
          onClick={() => {
            if (chatMode.msg) {
              setChatMode({ ...chatMode, inQueue: true });
            }
            // console.log("sned up teh chat for rps please");
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
