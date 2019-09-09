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
import "../styles/lobby.css";

import Cookies from "universal-cookie";
//=======================================
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import Input from "@material-ui/core/Input";
// import FormHelperText from "@material-ui/core/FormHelperText";
//========================================
// import ToggleButton from "@material-ui/lab/ToggleButton";
// import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
// import MenuItem from "@material-ui/core/MenuItem";

export default function Lobby({ socket, setRoom, profileInfo }) {
  // function handle

  const [lobbyData, setLobbyData] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatMode, setChatMode] = useState(false);
  const [entry, setEntry] = useState({ inQueue: false, msg: "" });
  const [createRoomMode, setCreateRoomMode] = useState(false);
  const [passcodeMode, setPasscodeMode] = useState(false);
  // const [roomStatus, getRoomStatys] = useState(null);

  let cookies = new Cookies();

  const handlePasscodeSend = function() {
    socket.emit("lobbyValidatePasscode", {
      game: selectedGame,
      room: passcodeMode,
      passcode: document.getElementById("lobbyPasscodeInputField").value,
      username: profileInfo.username,
      avatar: profileInfo.avatar
    });
    document.getElementById("lobbyPasscodeInputField").value = "";
    setPasscodeMode(false);
  };

  const handleCreateRoom = function() {
    const validatedRoom = spaceRemover(
      document.getElementById("lobbyNewRoomName").value
    );
    if (validatedRoom && !validatedRoom.includes("-")) {
      socket.emit("lobbyCreateRoom", {
        room: document.getElementById("lobbyNewRoomName").value,
        passcode: document.getElementById("lobbyNewPasscode").value,
        game: selectedGame
      });
    } else {
      alert(`Invalid room name! Room name cannot be empty and contain "-"`);
    }
    document.getElementById("lobbyNewRoomName").value = "";
    document.getElementById("lobbyNewPasscode").value = "";
  };

  useEffect(() => {
    socket.emit("lobbyConnect");

    const handleLobbyUpdate = function(data) {
      setLobbyData(data);
    };
    socket.on("lobbyUpdate", handleLobbyUpdate);
    //======sept 7======================
    const handleLobbyJoinedUserUpdate = function(data) {
      console.log("this guy has joined!");
    };
    socket.on("lobbyJoinedUserUpdate", handleLobbyJoinedUserUpdate);

    // const handleLobbyUserJoin = function(data) {
    //   console.log("new user has just joined");
    //   setLobbyData(data.lobbyData);
    // };
    // socket.on("lobbyUserJoin", handleLobbyUserJoin);

    console.log("watch meeeeeeeeeeeeeeee: ", cookies.get("profile"));

    //===================================
    const handleLobbyRoomCreation = function(data) {
      if (data) {
        setLobbyData(data.lobbyStat);
        setSelectedGame(data.game);
        setSelectedRoom(data.room);
        setCreateRoomMode(false);
        socket.emit("lobbyJoinLeaveRoom", {
          game: data.game,
          room: data.room,
          username: profileInfo.username,
          avatar: profileInfo.avatar
        });
        setEntry({ ...entry, msg: "" });
      } else {
        alert("The room name is not available!");
      }
      setCreateRoomMode(false);
    };
    socket.on("lobbyRoomCreation", handleLobbyRoomCreation);
    const handleLobbyPasscodeValidation = function(data) {
      if (data) {
        setSelectedGame(data.game);
        setSelectedRoom(data.room);
        setCreateRoomMode(false);
        socket.emit("lobbyJoinLeaveRoom", {
          game: data.game,
          room: data.room,
          username: profileInfo.username,
          avatar: profileInfo.avatar
        });
        setEntry({ ...entry, msg: "" });
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
        "lobbyJoinedUserUpdate",
        handleLobbyJoinedUserUpdate
      );
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
    if (Enter) {
      if (
        passcodeMode &&
        document.getElementById("lobbyPasscodeInputField") ===
          document.activeElement
      ) {
        handlePasscodeSend();
      } else if (
        createRoomMode &&
        (document.getElementById("lobbyNewRoomName") ===
          document.activeElement ||
          document.getElementById("lobbyNewPasscode") ===
            document.activeElement)
      ) {
        handleCreateRoom();
      } else if (selectedRoom) {
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
    }
  }, [Enter]);

  useEffect(() => {
    if (entry.inQueue) {
      console.log("time to send up the chat!");
      const player = lobbyData[selectedGame][selectedRoom].players[socket.id];
      socket.emit("lobbyReceiveChat", {
        game: selectedGame,
        room: selectedRoom,
        msg: entry.msg,
        user: player ? player.username : "need to refresh!",
        avatar: player
          ? player.avatar
          : "https://www.drupal.org/files/issues/default-avatar.png"
      });
      setEntry({ inQueue: false, msg: "" });
    }
  }, [entry.inQueue]);

  return (
    <>
      {lobbyData ? (
        <Paper
          id="paper"
          style={{
            margin: "2em",
            display: "flex",
            justifyContent: "space-between",
            height: "70vh",
            border: "solid black 0.5em",
            backgroundColor: "white"
          }}
        >
          {/* 1--------------------------------------------- */}
          <div className = "games-rooms-seperate">
            <div
            
          >
            
            <h3
              className = "room-header"
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
                      if (
                        selectedGame &&
                        selectedRoom &&
                        Object.keys(
                          lobbyData[selectedGame][selectedRoom].players
                        ).length === 1 &&
                        lobbyData[selectedGame][selectedRoom].status ===
                          "closed"
                      ) {
                        alert("Room's passcode will be removed!");
                      }
                      if (selectedRoom) {
                        socket.emit("lobbyJoinLeaveRoom", null);
                      }
                      setSelectedGame(e.target.innerText);
                      setSelectedRoom(null);
                      setCreateRoomMode(false);
                      setPasscodeMode(false);
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
            
          >
            <h3 className = "room-header">Rooms</h3>
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
                {/* <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">
                  We'll never share your email.
                </FormHelperText>
              </FormControl> */}
                {/* <form> */}
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
                    onClick={handlePasscodeSend}
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
                {/* </form> */}
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
                            onClick={handleCreateRoom}
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
                    )}
                    {Object.keys(lobbyData[selectedGame]).map(room => {
                      return (
                        <ListItem
                          selected={room === selectedRoom}
                          key={`lobbyroom${selectedGame}${room}`}
                          button
                          onClick={() => {
                            if (
                              selectedGame &&
                              selectedRoom &&
                              Object.keys(
                                lobbyData[selectedGame][selectedRoom].players
                              ).length === 1 &&
                              lobbyData[selectedGame][selectedRoom].status ===
                                "closed"
                            ) {
                              alert("Room's passcode will be removed!");
                            }
                            if (
                              lobbyData[selectedGame][room].status === "open"
                            ) {
                              setSelectedRoom(room);
                              setCreateRoomMode(false);
                              socket.emit("lobbyJoinLeaveRoom", {
                                game: selectedGame,
                                room: room,
                                username: profileInfo.username,
                                avatar: profileInfo.avatar
                              });
                              setEntry({ ...entry, msg: "" });
                            } else {
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
          </div >
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
              className = "room-header"
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
                    {lobbyData[selectedGame][selectedRoom].players[socket.id] &&
                    lobbyData[selectedGame][selectedRoom].players[socket.id]
                      .ready ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          socket.emit("lobbySetReady", {
                            room: selectedRoom,
                            game: selectedGame,
                            ready: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          socket.emit("lobbySetReady", {
                            room: selectedRoom,
                            game: selectedGame,
                            ready: true
                          });
                        }}
                      >
                        Ready!
                      </Button>
                    )}

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
                  {Object.keys(
                    lobbyData[selectedGame][selectedRoom].players
                  ).map(player => {
                    // console.log("ayami", player);
                    const playerInfo =
                      lobbyData[selectedGame][selectedRoom].players[player];
                    return (
                      <ListItem
                        key={`lobbyroom${selectedGame}${selectedRoom}${player}`}
                        // button
                        style={{
                          backgroundColor: lobbyData[selectedGame][selectedRoom]
                            .players[player].ready
                            ? "lightgreen"
                            : "transparent"
                        }}
                      >
                        <img
                          src={`${playerInfo.avatar}`}
                          alt={playerInfo.avatar}
                          // borderRadius="50%"
                          width="50vw"
                          style={{ borderRadius: "50%", marginRight: "0.5em" }}
                          // width="50vw"
                          // height="50vw"
                          // style={{width="50vw", height="50vw"}}
                        ></img>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "100%"
                          }}
                        >
                          {playerInfo.username}
                          {lobbyData[selectedGame][selectedRoom].players[player]
                            .ready && (
                            <div style={{ color: "green", fontSize: "0.8em" }}>
                              Ready!
                            </div>
                          )}
                        </div>
                      </ListItem>
                    );
                  })}
                </div>
              ) : (
                <ListItem style={{ color: "gray" }}>
                  Please join a room
                </ListItem>
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
              className = "room-header"
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
                        <img
                          src={chat.avatar}
                          // width="7%"
                          width="50vw"
                          style={{ borderRadius: "50%" }}
                        ></img>
                        <Chip
                          label={chat.user}
                          style={{
                            fontSize: "0.8em",
                            backgroundColor: "gray",
                            marginRight: "1em",
                            marginLeft: "1em"
                          }}
                        ></Chip>
                        {chat.msg}
                      </ListItem>
                    );
                  })}
                </div>
              ) : (
                <ListItem style={{ color: "gray" }}>
                  Please join a room
                </ListItem>
              )}
            </List>
          </div>
        </Paper>
      ) : (
        <Paper style={{ margin: "2em" }}>
          <div style={{ margin: "2em" }}>
            <h2>Waiting for server's responser...</h2>
            <h3>
              (If this takes too long, please contact admin or come back later)
            </h3>
          </div>
        </Paper>
      )}
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
