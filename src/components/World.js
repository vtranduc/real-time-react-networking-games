import React, { useEffect, useState } from "react";
import "../styles/chatworld.css";
import Phaser from "phaser";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
import "../styles/chatBubbleWhite.css";

let game;
let room = "worldGameRoom";
// let testVar = false;

export default function World({ socket }) {
  let players = {};
  let platforms;
  let texts = {};
  let w, a, s, d, spacebar;

  //=START=============================================
  const [chatMode, setChatMode] = useState({
    inQueue: false,
    mode: false,
    msg: ""
  });

  const [bubble, setBubble] = useState({});
  const [bubbleTrigger, setBubbleTrigger] = useState(null);
  // worldChatTextField
  let Enter = useKeyPress("Enter");
  useEffect(() => {
    console.log("Enter is: ", Enter);
    if (Enter) {
      if (chatMode.mode) {
        if (chatMode.msg) {
          setChatMode({ ...chatMode, inQueue: true });
        } else {
          console.log("NEEDS TO REACH HERE");
          document.getElementById("worldChatTextField").blur();
        }
      } else {
        document.getElementById("worldChatTextField").focus();
      }
    }
  }, [Enter]);

  useEffect(() => {
    if (chatMode.inQueue) {
      // socket.emit("rpsReceiveMsg", { room: room, msg: chatMode.msg });
      // console.log("Emit message Please!");
      socket.emit("worldReceiveMsg", { room: room, msg: chatMode.msg });
      setChatMode({ ...chatMode, inQueue: false, msg: "" });
    }
  }, [chatMode.inQueue]);

  useEffect(() => {
    console.log("see you sarah", bubbleTrigger);
    if (bubbleTrigger) {
      console.log("add the bubble NOW");

      setBubble(oldBubble => {
        return {
          ...oldBubble,
          [bubbleTrigger.socketId]: { msg: bubbleTrigger.msg, interval: null }
        };
      });

      setBubbleTrigger(null);
    }
  }, [bubbleTrigger]);

  //=FIN===================================================

  // const [chatMode, setChatMode] = useState({
  //   inQueue: false,
  //   mode: false,
  //   msg: ""
  // });
  // const chatMode = false;

  useEffect(() => {
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================

    console.log("THE WORLD IS MOUNTING!!!!!!!!!!!!!!!");

    const handleReceiveBubble = function(data) {
      console.log("what do I need", data);
      setBubbleTrigger(data);
    };
    socket.on("worldShowBubble", handleReceiveBubble);

    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================
    //===========================================================

    /* FIND THE LINES OF CODE THAT HAVE BEEN DELETED.
     *
     *
     *
     */

    function preload() {
      this.load.image("background", "assets/background/plainblue.jpg");
      this.load.image("player", "assets/world/mage.png");
      this.load.image("ground", "assets/world/platform.png");
    }

    function create() {
      w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      // spacebar = this.input.keyboard.addKey(
      //   Phaser.Input.Keyboard.KeyCodes.UP
      // );
      this.add.image(config.width / 2, config.height / 2, "background");
      //--------------------platforms----------------------------
      platforms = this.physics.add.staticGroup();

      platforms
        .create(400, 800, "ground")
        .setScale(3.8)
        .refreshBody();
      //platforms.create(300, 600, "ground").setScale(1.5);
      platforms.create(1000, 600, "ground");
      platforms.create(550, 300, "ground").setScale(1.3);
      platforms.create(200, 500, "ground");

      //----------------------------------------------------------

      socket.emit("worldRequestPlayers", { socketID: socket.id, room: room });

      socket.on("worldLoadPlayers", socketList => {
        //this loads all players including the client itself into the game
        for (let socketID in socketList) {
          players[socketID] = this.physics.add.image(100, 100, "player");
          players[socketID].setScale(0.2);
          if (players[socketID] != players[socket.id]) {
            players[socketID].body.setAllowGravity(false);
          }

          this.physics.add.collider(players[socketID], platforms);
          players[socketID].setCollideWorldBounds(true);
        }
      });
      socket.on("worldInsertPlayer", socketID => {
        players[socketID] = this.physics.add.image(100, 100, "player");
        if (players[socketID] != players[socket.id]) {
          players[socketID].body.setAllowGravity(false);
        }
        players[socketID].setScale(0.2);
        players[socketID].setCollideWorldBounds(true);
        this.physics.add.collider(players[socketID], platforms);
      });
      socket.on("worldUpdatePlayerPosition", data => {
        if (players[data.playerID]) {
          players[data.playerID].x = data.posX;
          players[data.playerID].y = data.posY;
        } else {
          console.log("why doesnt this work");
        }
      });
      socket.on("worldCleanup", player => {
        console.log("WORLD CLEANUP HAS BEEN TRIGGERED", player);
        if (players[player.socketID]) {
          players[player.socketID].destroy();
        }
      });
    }
    function update() {
      // if (!testVar) {

      if (players[socket.id]) {
        if (d.isDown) {
          players[socket.id].x = players[socket.id].x + 2;
          // console.log(players[socket.id].x + ":" + players[socket.id].y);
        }

        if (a.isDown) {
          players[socket.id].x = players[socket.id].x - 2;
        }
        if (s.isDown) {
          players[socket.id].y = players[socket.id].y + 2;
        }
        if (w.isDown) {
          players[socket.id].setVelocityY(-330);
        }

        socket.emit("worldUpdatePlayerPosition", {
          playerID: socket.id,
          posX: players[socket.id].x,
          posY: players[socket.id].y
        });
      }

      if (players[socket.id]) {
      }

      // }
    }

    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 800,
      physics: {
        default: "arcade",
        arcade: {
          debug: false,
          fps: 40,
          gravity: { y: 400 }
        }
      },
      scene: {
        preload,
        create,
        update
      },
      parent: "game"
    };

    game = new Phaser.Game(config);

    return function cleanup() {
      socket.emit("worldDestroyPlayer", { playerID: socket.id });
      socket.removeListener("worldUpdatePlayerPosition");
      socket.removeListener("worldLoadPlayers");
      socket.removeListener("worldRequestPlayers");
      socket.removeListener("worldShowBubble", handleReceiveBubble);
      game.destroy();
      console.log("game destroy");
    };
  }, []);

  return (
    <div>
      <div id="game" style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          {/* {bubble[socket.id] && (
            <p style={{ color: "black" }}>{bubble[socket.id].msg}</p>
          )} */}
          {bubble[socket.id] && (
            <div className="playerBubble">
              <div
                style={{
                  marginBottom: "2vh",
                  margingTop: "-60px"
                }}
              >
                <div className="speech-buble-wrapper-white">
                  <div className="speech-bubble-white">
                    <p>{bubble[socket.id].msg}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
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
          id="worldChatTextField"
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
    </div>
  );
}
