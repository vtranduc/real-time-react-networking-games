import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default function RockPaperScissors({ socket }) {
  //---Temporary data---
  const room = "testRockPaperScissors123qweasd";
  const nPlayers = 6;
  //--------------------

  const [rpsData, setRpsData] = useState(null);

  useEffect(() => {
    // console.log("run initial setup here");
    socket.emit("rpsInitialize", { room });
    const handleRpsSetUp = function(data) {
      console.log("Prepping for setup: ", data);
      setRpsData(data);
    };
    socket.on("rpsSetUp", handleRpsSetUp);
    return () => {
      socket.removeListener("rpsSetUp", handleRpsSetUp);
    };
  }, []);

  return (
    <Paper style={{ margin: "3vw", height: "50vh", border: "none" }}>
      {rpsData ? (
        <div>
          <List
            style={{
              border: "none",
              height: "100%",
              display: "flex",
              justifyContent: "space-evenly"
            }}
          >
            {Object.keys(rpsData.players).map(player => {
              return (
                <ListItem
                  key={`displayPlayers${player}`}
                  style={{
                    border: "solid",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <div>{player}</div>
                </ListItem>
              );
            })}
          </List>
          <div>
            <button>
              <img
                src="assets/rockPaperScissors/rock.png"
                alt="rpsRock"
                style={{ width: "5vw", border: "solid" }}
              ></img>
            </button>
          </div>
        </div>
      ) : (
        <h3>Awaiting response from the server...</h3>
      )}
    </Paper>
  );
}
