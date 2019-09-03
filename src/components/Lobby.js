import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Socket } from "net";

import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function Lobby({ socket, setRoom }) {
  // function handle

  const [roomList, setRoomList] = useState({});
  const [selectedGame, setSelectedGame] = useState(null);
  const [roomStatus, getRoomStatys] = useState(null);
  useEffect(() => {
    socket.emit("lobbyConnect");
    const handleLobbyUpdate = function(data) {
      {
        console.log("this is the lobby! ", data);
        setRoomList(data);
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
            width: "20%"
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
            {Object.keys(roomList).map(game => {
              return (
                <ListItem
                  key={`lobby${game}`}
                  onClick={e => {
                    setSelectedGame(e.target.innerText);
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
            width: "30%"
            // border: "solid"
          }}
        >
          <h3 style={{ display: "flex", justifyContent: "center" }}>Rooms</h3>
          <List
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            {selectedGame ? (
              <div style={{ width: "100%" }}>
                {Object.keys(roomList[selectedGame]).map(room => {
                  return <ListItem button>{room}</ListItem>;
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
            Room Status
          </h3>
        </div>
        {/* 4--------------------------------------------- */}
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
