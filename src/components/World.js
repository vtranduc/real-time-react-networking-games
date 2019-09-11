import React, { useEffect, useState } from "react";
import "../styles/chatworld.css";
import Phaser from "phaser";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";

let game;
let room = "worldGameRoom";
// let testVar = false;

export default function World({ socket }) {
  let players = {};
  let platforms;
  let texts = {};
  let w, a, s, d, spacebar;

  let Enter = useKeyPress("Enter");
  useEffect(() => {
    console.log("Enter is: ", Enter);
  }, [Enter]);

  // const [chatMode, setChatMode] = useState({
  //   inQueue: false,
  //   mode: false,
  //   msg: ""
  // });
  // const chatMode = false;

  useEffect(() => {
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
          if (!players[socketID] == players[socket.id]) {
            players[socketID].body.setAllowGravity(false);
          }

          this.physics.add.collider(players[socketID], platforms);
          players[socketID].setCollideWorldBounds(true);
        }
      });
      socket.on("worldInsertPlayer", socketID => {
        players[socketID] = this.physics.add.image(100, 100, "player");

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
        players[player.socketID].destroy();
      });
    }
    function update() {
      // if (!testVar) {

      if (players[socket.id]) {
        if (d.isDown) {
          players[socket.id].x = players[socket.id].x + 2;
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
      game.destroy();
      console.log("game destroy");
    };
  }, []);

  return (
    <div>
      <div id="game"></div>
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
          // value={chatMode.msg}
          // onFocus={() => {
          //   // setChatMode({ ...chatMode, mode: true });
          //   console.log("FOCUSSING", chatMode.mode);
          //   // testVa
          //   testVar = true;
          //   setChatMode(oldChatMode => {
          //     return { ...oldChatMode, mode: true };
          //   });
          //   console.log("FOCUSSING", chatMode.mode);
          // }}
          // onBlur={() => {
          //   testVar = false;
          //   // setChatMode({ ...chatMode, mode: false });
          //   // testVar=
          //   console.log("SHOWQ ME");
          //   // setChatMode(false);
          //   setChatMode({ ...chatMode, mode: false });
          // }}
          // onChange={e => {
          //   // setChatMode({ ...chatMode, msg: e.target.value });
          //   setChatMode({ ...chatMode, msg: e.target.value });
          // }}
        ></TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            // if (chatMode.msg) {
            //   // setChatMode({ ...chatMode, inQueue: true });
            // }
          }}
        >
          Chat!
        </Button>
      </div>
    </div>
  );
}
