import React, { useEffect, useState } from "react";
import "../styles/chatworld.css";
import Phaser from "phaser";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
import "../styles/chatBubbleWhite.css";

let game;
let room = "worldGameRoom";
let count = 0;

// let testVar = false;

export default function World({ socket, count, setCount }) {
  
  let players = {};
  let posTracker = {};
  let platforms;
  // let texts = {};
  let w, a, s, d;
  //=START=============================================
  const chatBubbleDuration = 2000;
  const [chatMode, setChatMode] = useState({
    inQueue: false,
    mode: false,
    msg: ""
  });

  const [bubble, setBubble] = useState({});
  const [bubbleTrigger, setBubbleTrigger] = useState(null);
  const [playersPos, setPlayersPos] = useState({});

  // worldChatTextField
  let Enter = useKeyPress("Enter");
  useEffect(() => {
    // console.log("Enter is: ", Enter);
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
    // console.log("see you sarah", bubbleTrigger);
    if (bubbleTrigger) {
      console.log("add the bubble NOW");

      setBubble(oldBubble => {
        if (
          oldBubble[bubbleTrigger.socketId] &&
          oldBubble[bubbleTrigger.socketId].interval
        ) {
          clearTimeout(oldBubble[bubbleTrigger.socketId].interval);
        }
        return {
          ...oldBubble,
          [bubbleTrigger.socketId]: {
            msg: bubbleTrigger.msg,
            interval: setTimeout(() => {
              // console.log("what is up with you");
              // setBubble(()
              setBubble(oldBubble => {
                return {
                  ...oldBubble,
                  [bubbleTrigger.socketId]: { msg: null, interval: null }
                };
              });
            }, chatBubbleDuration)
          }
        };
      });

      setBubbleTrigger(null);
    }
  }, [bubbleTrigger]);

  // useEffect(() => {
  //   // console.log("update?", playersPos);
  //   console.log("WATCH", playersPos);
  // }, [playersPos]);

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
    const startingPoint = { x: 100, y: 100 };
    posTracker.x = startingPoint.x;
    posTracker.y = startingPoint.y;
    const handleReceiveBubble = function(data) {
      // console.log("what do I need", data);
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
      this.load.image("background", "assets/world/background.png");
      this.load.image("player", `assets/world/mage${count}.png`);
      this.load.image("ground", "assets/world/platform.png");
      this.load.image("stairs", "assets/world/stairs.png");
      this.load.image("chair", "assets/world/chair.png");
      this.load.image("chair2", "assets/world/chair2.png");
      this.load.image("chair2r", "assets/world/chair2r.png");
      this.load.image("temple", "assets/world/temple.png");
      this.load.image("sideladder", "assets/world/sideladder.png");
      this.load.image("sideladder2", "assets/world/sideladder2.png");
      this.load.image("grass", "assets/world/grass.png");
      
      setCount(count + 1);
      console.log("this is the count: " + count)
      if(count > 2){
        setCount(0);
      }
    }

    function create() {
      w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
      a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
      s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
      d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      // spacebar = this.input.keyboard.addKey(
      //   Phaser.Input.Keyboard.KeyCodes.UP
      // );
      this.add.image(config.width / 2, config.height / 2, "background").setScale(1.6);
      //--------------------platforms----------------------------
      platforms = this.physics.add.staticGroup();
      
      platforms
        .create(400, 800, "ground")
        .setScale(3.8)
        .refreshBody();
        this.add.image(0,780, 'grass')
        this.add.image(600,780, 'grass')
        this.add.image(1200,780, 'grass')
      //platforms.create(300, 600, "ground").setScale(1.5);
      platforms.create(1000, 600, "ground").setVisible(false);
      platforms.create(550, 300, "ground").setScale(1.3).setVisible(false);
      platforms.create(200, 500, "ground").setVisible(false);

      //----------------------------------------------------------
      this.add.image(550,260, "stairs");
      this.add.image(1000,450, "temple");
      this.add.image(800, 720, 'chair')
      this.add.image(200, 720, 'chair2r')
     
      this.add.image(300, 500, 'sideladder2')
      this.add.image(100, 500, 'sideladder')

      this.add.image(720, 300, 'sideladder2')
      this.add.image(420, 300, 'sideladder')

      this.add.image(1120, 600, 'sideladder2')
      this.add.image(840, 600, 'sideladder')
      socket.emit("worldRequestPlayers", { room, startingPoint });

      socket.on("worldLoadPlayers", socketList => {
        //this loads all players including the client itself into the game
        // console.log("loaded chiecke: ", socketList);
        for (let socketID in socketList) {
          players[socketID] = this.physics.add.image(
            socketList[socketID].x,
            socketList[socketID].y,
            "player"
          );
          players[socketID].setScale(0.2);
          if (players[socketID] != players[socket.id]) {
            players[socketID].body.setAllowGravity(false);
          } else {
            this.physics.add.collider(players[socketID], platforms);
            // players[socketID].physics.arcade.gravity.y = 400;
            players[socketID].setCollideWorldBounds(true);
          }
        }
      });
      socket.on("worldInsertPlayer", data => {
        players[data.socketID] = this.physics.add.image(
          data.startingPoint.x,
          data.startingPoint.y,
          "player"
        );
        // This should always be true
        if (players[data.socketID] != players[socket.id]) {
          players[data.socketID].body.setAllowGravity(false);
        }
        players[data.socketID].setScale(0.2);
        // players[data.socketID].setCollideWorldBounds(true);
        // this.physics.add.collider(players[data.socketID], platforms);
      });
      socket.on("worldUpdatePlayerPosition", data => {
        // console.log("updating everyone's pos NOW", data);
        // console.log("DOWN", Object.keys(players));
        // console.log("UP", Object.keys(data));
        // console.log(data);
        for (let socketId in data) {
          if (players[socketId]) {
            if (socketId !== socket.id) {
              players[socketId].x = data[socketId].x;
              players[socketId].y = data[socketId].y;
            }
          }
        }
        setPlayersPos(data);
       
        // if (players[data.playerID]) {
        //   players[data.playerID].x = data.posX;\

        //   players[data.playerID].y = data.posY;
        //   setPlayersPos(oldPos => {
        //     return {
        //       ...oldPos,
        //       [data.playerID]: {
        //         x: players[data.playerID].x,
        //         y: players[data.playerID].y
        //       }
        //     };
        //   });
        // } else {
        //   console.log("why doesnt this work");
        // }

       
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
        // console.log("is this not true?");
        if (d.isDown) {
          players[socket.id].x = players[socket.id].x + 2;
          players[socket.id].flipX = true;
          // socket.emit("worldUpdatePlayerPosition", {
          //   room,
          //   xy: { x: players[socket.id].x, y: players[socket.id].y }
          // });
          // console.log(players[socket.id].x + ":" + players[socket.id].y);
          // setPlayersPos(oldPos => {
          //   return {
          //     ...oldPos,
          //     [socket.id]: { x: players[socket.id].x, y: players[socket.id].y }
          //   };
          // });
        }

        if (a.isDown) {
          players[socket.id].x = players[socket.id].x - 2;
          players[socket.id].flipX = false;
          // socket.emit("worldUpdatePlayerPosition", {
          //   room,
          //   xy: { x: players[socket.id].x, y: players[socket.id].y }
          // });
          // setPlayersPos(oldPos => {
          //   return {
          //     ...oldPos,
          //     [socket.id]: { x: players[socket.id].x, y: players[socket.id].y }
          //   };
          // });
        }
        if (s.isDown) {
          players[socket.id].y = players[socket.id].y + 2;
          // socket.emit("worldUpdatePlayerPosition", {
          //   room,
          //   xy: { x: players[socket.id].x, y: players[socket.id].y }
          // });
          // setPlayersPos(oldPos => {
          //   return {
          //     ...oldPos,
          //     [socket.id]: { x: players[socket.id].x, y: players[socket.id].y }
          //   };
          // });
        }
        if (w.isDown) {
          players[socket.id].setVelocityY(-330);

          // setPlayersPos(oldPos => {
          //   return {
          //     ...oldPos,
          //     [socket.id]: { x: players[socket.id].x, y: players[socket.id].y }
          //   };
          // });
        }

        // IF STATEMENT HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE------------------------------------

        // if (posTracker[])
        if (
          posTracker.x !== players[socket.id].x ||
          posTracker.y !== players[socket.id].y
        ) {
          // console.log("MOVING");
          posTracker.x = players[socket.id].x;
          posTracker.y = players[socket.id].y;
          socket.emit("worldUpdatePlayerPosition", {
            room,
            xy: posTracker
          });
        }

        // console.log("push position");

        // socket.emit("worldUpdatePlayerPosition", {
        //   playerID: socket.id,
        //   posX: players[socket.id].x,
        //   posY: players[socket.id].y
        // });
        // setPlayersPos(oldPos => {
        //   return {
        //     ...oldPos,
        //     [socket.id]: { x: players[socket.id].x, y: players[socket.id].y }
        //   };
        // });
      }
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
          gravity: { y: 800 }
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
      socket.emit("worldDestroyPlayer", { room });
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
        {Object.keys(bubble).map(socketId => {
          // console.log("show you", socketId);
          return (
            <div key={`charbubbling${socketId}`}>
              {bubble[socketId] && bubble[socketId].msg && (
                <div
                  style={{
                    position: "absolute",
                    left: playersPos[socketId].x,
                    top: playersPos[socketId].y - 90
                  }}
                >
                  <div className="playerBubble">
                    <div
                      style={{
                        marginBottom: "2vh",
                        margingTop: "-60px"
                      }}
                    >
                      <div className="speech-buble-wrapper-white">
                        <div className="speech-bubble-white">
                          <p>{bubble[socketId].msg}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {/* {bubble[socket.id] && bubble[socket.id].msg && (
          <div
            style={{
              position: "absolute",
              left: playersPos[socket.id].x,
              top: playersPos[socket.id].y - 90
            }}
          >
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
          </div>
        )} */}
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
