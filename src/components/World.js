import React, {useEffect} from "react";
import "../styles/chatworld.css";
import Phaser from "phaser";



let game;
let room = "worldGameRoom";



export default function World({socket}) {
    let players = {};
    let w, a, s, d;
    useEffect(()=>{

        

        function preload(){
            this.load.image("background", "assets/background/plainblue.jpg");
            this.load.image("player", "assets/soccer/ball.png")
        }


        function create(){
            w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
            this.add.image(config.width/2, config.height/2, 'background')



            socket.emit("worldRequestPlayers", { socketID: socket.id, room: room });

            socket.on("worldLoadPlayers", socketList => {
                //this loads all players including the client itself into the game
                for (let socketID in socketList) {
                  players[socketID] = this.physics.add.sprite(100, 100, "player");
                  players[socketID].setScale(0.5);
                }
              });
              socket.on("worldInsertPlayer", socketID => {
                players[socketID] = this.physics.add.sprite(100, 100, "player");
                players[socketID].setScale(0.5);
              });
              socket.on("worldUpdatePlayerPosition", data => {
                if (players[data.playerID]) {
                  players[data.playerID].x = data.posX;
                  players[data.playerID].y = data.posY;
                } else {
                  console.log("why doesnt this work");
                }
              });
        
        
        }
        function update(){
            if (d.isDown) {
                if (players[socket.id]) {
                  players[socket.id].x = players[socket.id].x + 2;
         
                  socket.emit("worldUpdatePlayerPosition", {
                    playerID: socket.id,
                    posX: players[socket.id].x,
                    posY: players[socket.id].y
                  });
                }
              }
              if (a.isDown) {
                if (players[socket.id]) {
                  players[socket.id].x = players[socket.id].x - 2;
                  socket.emit("worldUpdatePlayerPosition", {
                    playerID: socket.id,
                    posX: players[socket.id].x,
                    posY: players[socket.id].y
                  });
                }
              }
              if (w.isDown) {
                if (players[socket.id]) {
                  players[socket.id].y = players[socket.id].y - 2;
                  socket.emit("worldUpdatePlayerPosition", {
                    playerID: socket.id,
                    posX: players[socket.id].x,
                    posY: players[socket.id].y
                  });
                }
              }
              if (s.isDown) {
                if (players[socket.id]) {
                  players[socket.id].y = players[socket.id].y + 2;
                  socket.emit("worldUpdatePlayerPosition", {
                    playerID: socket.id,
                    posX: players[socket.id].x,
                    posY: players[socket.id].y
                  });
                }
              }
        
        }




        const config = {
            type: Phaser.AUTO,
            width: 1200,
            height: 800,
            physics: {
              default: "arcade",
              arcade: {
                debug: false
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


          return function cleanup(){
              game.destroy();
              console.log("game destroy")
          }


    }, [])



	return (
		<div className = "game">
			testing this
		</div>
	);
}