import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Socket } from "net";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

function Lobby({ socket, setRoom }) {
  // function handle

  const [lobbyData, setLobbyData] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  // const [roomStatus, getRoomStatys] = useState(null);
  useEffect(() => {
    socket.emit("lobbyConnect");
    const handleLobbyUpdate = function(data) {
      {
        // console.log("this is the lobby! ", data);
        setLobbyData(data);
      }
    };
    socket.on("lobbyUpdate", handleLobbyUpdate);
    // const updateLobby

    return () => {
      socket.emit("lobbyDisconnect", "maybe add something later");
      socket.removeListener("lobbyUpdate", handleLobbyUpdate);
    };
  }, []);

  return (
    <>
      <Paper
        style={{
          margin: "2em",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        {/* 1--------------------------------------------- */}
        <div
          style={{
            borderRight: "none",
            borderRight: "1px solid grey",
            width: "15%"
            // border: "solid"
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
                  key={`lobby${game}`}
                  onClick={e => {
                    if (selectedRoom) {
                      socket.emit("lobbyJoinLeaveRoom", null);
                    }
                    setSelectedGame(e.target.innerText);
                    setSelectedRoom(null);
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
            borderRight: "1px solid grey",
            width: "15%"
            // border: "solid"
          }}
        >
          {selectedGame ? (
            <h3 style={{ display: "flex", justifyContent: "center" }}>
              Rooms for {selectedGame}
            </h3>
          ) : (
            <h3 style={{ display: "flex", justifyContent: "center" }}>Rooms</h3>
          )}
          <List
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            {selectedGame ? (
              <div style={{ width: "100%" }}>
                {Object.keys(lobbyData[selectedGame]).map(room => {
                  return (
                    <ListItem
                      key={`room${selectedGame}${room}`}
                      button
                      onClick={() => {
                        // console.log("room selected is this: ", room);
                        setSelectedRoom(room);
                        socket.emit("lobbyJoinRoom", {
                          game: selectedGame,
                          room: room
                        });
                      }}
                    >
                      {room}
                    </ListItem>
                  );
                })}
              </div>
            ) : (
              <ListItem>Please select a game</ListItem>
            )}
          </List>
        </div>
        {/* 3--------------------------------------------- */}
        <div
          style={{
            borderRight: "1px solid grey",
            width: "20%"
          }}
        >
          <h3
            style={{
              // borderBottom: "solid",
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
                {Object.keys(lobbyData[selectedGame][selectedRoom].players).map(
                  player => {
                    return (
                      <ListItem
                        key={`room${selectedGame}${selectedRoom}${player}`}
                        button
                        // onClick={() => {
                        //   console.log("room selected is this: ", room);
                        //   setSelectedRoom(room);
                        // }}
                      >
                        {player}
                      </ListItem>
                    );
                  }
                )}
              </div>
            ) : (
              <ListItem>Please join a room</ListItem>
            )}
          </List>
        </div>
        {/* 4--------------------------------------------- */}
        <div
          style={{
            // borderRight: "1px solid grey",
            width: "50%"
          }}
        >
          <h3
            style={{
              // borderBottom: "solid",
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
                  <TextField style={{ marginLeft: "2%", width: "80%" }} />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "2%" }}
                    // className={classes.button}
                    // onClick={() => {
                    // sendChatAction({
                    //   from: user,
                    //   msg: textValue,
                    //   topic: activeTopic
                    // });
                    // changeTextValue("");
                    // }}
                  >
                    Send
                  </Button>
                </div>

                {lobbyData[selectedGame][selectedRoom].chats.map(chat => {
                  return (
                    <ListItem
                      key={chat.key}
                      button
                      // onClick={() => {
                      //   console.log("room selected is this: ", room);
                      //   setSelectedRoom(room);
                      // }}
                    >
                      <Chip
                        label={chat.user}
                        style={{
                          fontSize: "0.8em",
                          backgroundColor: "gray"
                        }}
                      ></Chip>
                      {chat.msg}
                    </ListItem>
                  );
                })}
              </div>
            ) : (
              <ListItem>Please join a room</ListItem>
            )}
          </List>
        </div>

        {/* <div
          style={{
            borderRight: "none",
            width: "20%"
          }}
        >
          <h3
            style={{
              borderBottom: "solid",
              width: "100%",
              display: "flex",
              justifyContent: "center"
            }}
          >
            Create New Room
          </h3>
        </div> */}

        {/* {Object.keys(roomList).map(game => {
          return (
            <div key={`lobby${game}`}>
              <div>{game}</div>
              {roomList[game].map(roomName => {
                return (
                  <Link
                    key={`lobby${roomName}`}
                    to="/soccer"
                    onClick={() => {
                      setRoom(roomName);
                    }}
                  >
                    {roomName}
                  </Link>
                );
              })}
            </div>
          );
        })} */}
      </Paper>
    </>
  );
}

export default Lobby;
