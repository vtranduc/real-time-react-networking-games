import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Socket } from "net";

function Lobby({ socket, setRoom }) {
  // function handle

  const [roomList, setRoomList] = useState({});
  useEffect(() => {
    const handleSetup = function(data) {
      {
        console.log("this is the lobby! ", data);
        setRoomList(data);
      }
    };
    socket.emit("lobbyConnect");
    socket.on("lobbySetup", handleSetup);

    return () => {
      socket.emit("lobbyDisconnect", "maybe add something later");
      socket.removeListener("lobbySetup", handleSetup);
    };
  }, []);

  return (
    <div>
      {Object.keys(roomList).map(game => {
        return (
          <div>
            <div>{game}</div>
            {roomList[game].map(roomName => {
              return (
                <Link
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
      })}
    </div>
  );
}

export default Lobby;
