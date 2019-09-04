import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Socket } from "net";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import MenuItem from "@material-ui/core/MenuItem";

export default function Lobby({ socket, setRoom }) {
  // function handle

  const [lobbyData, setLobbyData] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatMode, setChatMode] = useState(false);
  const [entry, setEntry] = useState({ inQueue: false, msg: "" });
  const [createRoomMode, setCreateRoomMode] = useState(false);
  const [passcodeMode, setPasscodeMode] = useState(false);
  // const [roomStatus, getRoomStatys] = useState(null);
  useEffect(() => {
    socket.emit("lobbyConnect");
    const handleLobbyUpdate = function(data) {
      // console.log("heyheyhey", data);
      setLobbyData(data);
    };
    socket.on("lobbyUpdate", handleLobbyUpdate);
    const handleLobbyRoomCreation = function(data) {
      if (!data) {
        alert("The room name is not available!");
      }
      setCreateRoomMode(false);
    };
    socket.on("lobbyRoomCreation", handleLobbyRoomCreation);
    const handleLobbyPasscodeValidation = function(data) {
      console.log("has received back!", data);
      if (data) {
        ////////WHERE I LEFT OFF///////////////////////////////////////
        // setSelectedRoom(data);
        // setCreateRoomMode(false);
        // socket.emit("lobbyJoinLeaveRoom", {
        //   game: selectedGame,
        //   room: data
        // });
        // setEntry({ ...entry, msg: "" });
      } else {
        alert("Passcode is wrong!");
      }
    };
    socket.on("lobbyPasscodeValidation", handleLobbyPasscodeValidation);

    return () => {
      socket.emit("lobbyDisconnect", "maybe add something later");
      socket.removeListener("lobbyUpdate", handleLobbyUpdate);
      socket.removeListener("lobbyRoomCreation", handleLobbyRoomCreation);
      socket.removeListener(
        "lobbyPasscodeValidation",
        handleLobbyPasscodeValidation
      );
    };
  }, []);

  useEffect(() => {
    if (
      selectedGame &&
      selectedRoom &&
      !Object.keys(lobbyData[selectedGame]).includes(selectedRoom)
    ) {
      setSelectedRoom(null);
    }
  }, [lobbyData]);

  const Enter = useKeyPress("Enter");
  useEffect(() => {
    if (Enter && selectedRoom) {
      if (chatMode) {
        if (entry.msg) {
          setEntry({ ...entry, inQueue: true });
        } else {
          document.getElementById("lobbyChatTextBox").blur();
        }
      } else {
        document.getElementById("lobbyChatTextBox").focus();
      }
    }
  }, [Enter]);

  useEffect(() => {
    if (entry.inQueue) {
      console.log("time to send up the chat!");
      socket.emit("lobbyReceiveChat", {
        game: selectedGame,
        room: selectedRoom,
        msg: entry.msg
      });
      setEntry({ inQueue: false, msg: "" });
    }
  }, [entry.inQueue]);

  return (
    <>
      <Paper
        style={{
          margin: "2em",
          display: "flex",
          justifyContent: "space-between",
          height: "70vh"
        }}
      >
        {/* 1--------------------------------------------- */}
        <div
          style={{
            borderRight: "none",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            width: "15%",
            overflow: "auto",
            marginTop: "1em",
            marginBottom: "1em"
            // margin: "0em",
            // marginRight: 0,
            // marginLeft: 0
          }}
        >
          <h3
            style={{
              borderBottom: "none",
              display: "flex",
              justifyContent: "center"
            }}
          >
            Games
          </h3>
          <List>
            {Object.keys(lobbyData).map(game => {
              return (
                <ListItem
                  selected={game === selectedGame}
                  key={`lobby${game}`}
                  onClick={e => {
                    if (selectedRoom) {
                      socket.emit("lobbyJoinLeaveRoom", null);
                    }
                    setSelectedGame(e.target.innerText);
                    setSelectedRoom(null);
                    setCreateRoomMode(false);
                    // setEntry({ ...entry, msg: "" });
                  }}
                  button
                >
                  {game}
                </ListItem>
              );
            })}
          </List>
        </div>
        {/* 2--------------------------------------------- */}
        <div
          style={{
            border: "none",
            borderRight: "1px solid rgba(0,0,0,0.1)",
            width: "15%",
            overflow: "auto",
            marginTop: "1em",
            marginBottom: "1em"
            // margin: "0em",
            // marginRight: 0
          }}
        >
          <h3 style={{ display: "flex", justifyContent: "center" }}>Rooms</h3>
          {passcodeMode ? (
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.1)",
                // border: "solid",
                height: "16vh"
              }}
            >
              <div style={{ fontSize: "0.8em", margin: "0.5em" }}>
                Passcode is required
              </div>
              <TextField
                id="lobbyPasscodeInputField"
                label="Passcode"
                style={{ marginLeft: "1em" }}
              ></TextField>
              <div
                style={{
                  margin: "0.5em",
                  display: "flex",
                  justifyContent: "space-evenly"
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    console.log("Send passcode to server NOW!");

                    socket.emit("lobbyValidatePasscode", {
                      game: selectedGame,
                      room: passcodeMode,
                      passcode: document.getElementById(
                        "lobbyPasscodeInputField"
                      ).value
                    });
                    document.getElementById("lobbyPasscodeInputField").value =
                      "";
                    setPasscodeMode(false);
                  }}
                >
                  Join
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setPasscodeMode(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <List
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%"
              }}
            >
              {selectedGame ? (
                <div style={{ width: "100%" }}>
                  {createRoomMode ? (
                    <div style={{ margin: "1em", marginTop: 0 }}>
                      <TextField
                        id="lobbyNewRoomName"
                        label="Room name"
                      ></TextField>
                      <TextField
                        id="lobbyNewPasscode"
                        label="Passcode (Optional)"
                      ></TextField>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "0.8em"
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            // console.log("create room NOW");
                            // // document.getElementById("lobbyNewRoomName").value = "";
                            // console.log(
                            //   document.getElementById("lobbyNewRoomName").value
                            // );
                            // document.getElementById("lobbyNewRoomName").value = "";
                            const validatedRoom = spaceRemover(
                              document.getElementById("lobbyNewRoomName").value
                            );
                            if (validatedRoom && !validatedRoom.includes("-")) {
                              socket.emit("lobbyCreateRoom", {
                                room: document.getElementById(
                                  "lobbyNewRoomName"
                                ).value,
                                passcode: document.getElementById(
                                  "lobbyNewPasscode"
                                ).value,
                                game: selectedGame
                              });
                            } else {
                              // console.log(specifications);
                              // console.log(
                              //   document.getElementById("lobbyNewRoomName").value
                              // );
                              alert(
                                `Invalid room name! Room name cannot be empty and contain "-"`
                              );
                            }
                            document.getElementById("lobbyNewRoomName").value =
                              "";
                            document.getElementById("lobbyNewPasscode").value =
                              "";
                          }}
                        >
                          Create
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setCreateRoomMode(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ margin: "1em" }}
                      onClick={() => {
                        setCreateRoomMode(true);
                      }}
                    >
                      Start a new room!
                    </Button>
                    // </div>
                  )}
                  {Object.keys(lobbyData[selectedGame]).map(room => {
                    return (
                      <ListItem
                        selected={room === selectedRoom}
                        key={`lobbyroom${selectedGame}${room}`}
                        button
                        onClick={() => {
                          // console.log(
                          //   "GTO",
                          //   lobbyData[selectedGame][room]
                          // );
                          if (lobbyData[selectedGame][room].status === "open") {
                            setSelectedRoom(room);
                            setCreateRoomMode(false);
                            socket.emit("lobbyJoinLeaveRoom", {
                              game: selectedGame,
                              room: room
                            });
                            setEntry({ ...entry, msg: "" });
                          } else {
                            // console.log(
                            //   "Require user to insert passcode here!"
                            // );
                            setPasscodeMode(room);
                          }
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                          }}
                        >
                          {room}
                          {lobbyData[selectedGame][room].status ===
                            "closed" && (
                            <p style={{ fontSize: "0.8em", color: "grey" }}>
                              Locked
                            </p>
                          )}
                        </div>
                      </ListItem>
                    );
                  })}
                </div>
              ) : (
                <ListItem style={{ color: "gray" }}>
                  Please select a game
                </ListItem>
              )}
            </List>
          )}
        </div>
        {/* 3--------------------------------------------- */}
        <div
          style={{
            borderRight: "1px solid rgba(0,0,0,0.1)",
            width: "20%",
            overflow: "auto",
            marginTop: "1em",
            marginBottom: "1em"
            // margin: "1em",
            // border: "solid"
          }}
        >
          <h3
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            Currently joined
          </h3>
          <List
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            {selectedRoom ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    margin: "0.5em",
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%"
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      socket.emit("lobbySetReady", {
                        room: selectedRoom,
                        game: selectedGame
                      });
                    }}
                  >
                    Ready!
                  </Button>
                  {Object.keys(lobbyData[selectedGame][selectedRoom].players)
                    .length === 1 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      // style={{ margin: "1em" }}
                      onClick={() => {
                        // console.log("trigger delete response!");
                        setSelectedRoom(null);
                        // setSelectedGame(null);
                        socket.emit("lobbyDeleteRoom", {
                          room: selectedRoom,
                          game: selectedGame
                        });
                      }}
                    >
                      Delete the room
                    </Button>
                  )}
                </div>
                {/* {true && } */}
                {Object.keys(lobbyData[selectedGame][selectedRoom].players).map(
                  player => {
                    return (
                      <ListItem
                        key={`lobbyroom${selectedGame}${selectedRoom}${player}`}
                        // button
                        style={{
                          backgroundColor: lobbyData[selectedGame][selectedRoom]
                            .players[player].ready
                            ? "lightgreen"
                            : "none"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                          }}
                        >
                          {player}
                          {lobbyData[selectedGame][selectedRoom].players[player]
                            .ready && (
                            <div style={{ color: "green", fontSize: "0.8em" }}>
                              Ready!
                            </div>
                          )}
                        </div>
                      </ListItem>
                    );
                  }
                )}
              </div>
            ) : (
              <ListItem style={{ color: "gray" }}>Please join a room</ListItem>
            )}
          </List>
        </div>
        {/* 4--------------------------------------------- */}
        <div
          style={{
            width: "50%",
            overflow: "auto",
            marginTop: "1em",
            marginBottom: "1em"
          }}
        >
          <h3
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            Chats
          </h3>
          <List
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            {selectedRoom ? (
              <div style={{ width: "100%" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <TextField
                    id="lobbyChatTextBox"
                    style={{ marginLeft: "2%", width: "80%" }}
                    value={entry.msg}
                    onChange={e => {
                      setEntry({ ...entry, msg: e.target.value });
                    }}
                    onFocus={() => {
                      // console.log("has been focussed!");
                      setChatMode(true);
                    }}
                    onBlur={() => {
                      // console.log("has been blurred!");
                      setChatMode(false);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "2%" }}
                    onClick={() => {
                      if (entry.msg) {
                        setEntry({ ...entry, inQueue: true });
                      }
                    }}
                  >
                    Send
                  </Button>
                </div>

                {lobbyData[selectedGame][selectedRoom].chats.map(chat => {
                  return (
                    <ListItem key={chat.key} button>
                      <Chip
                        label={chat.user}
                        style={{
                          fontSize: "0.8em",
                          backgroundColor: "gray",
                          marginRight: "1em"
                        }}
                      ></Chip>
                      {chat.msg}
                    </ListItem>
                  );
                })}
              </div>
            ) : (
              <ListItem style={{ color: "gray" }}>Please join a room</ListItem>
            )}
          </List>
        </div>
      </Paper>
    </>
  );
}

const spaceRemover = function(str) {
  let marker = null;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      marker = i;
      break;
    }
  }
  if (marker === null) {
    return "";
  }
  let output = str.slice(marker);
  for (let i = output.length - 1; i >= 0; i--) {
    if (output[i] !== " ") {
      marker = i;
      break;
    }
  }
  return output.slice(0, marker + 1);
};
