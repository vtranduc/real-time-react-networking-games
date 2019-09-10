import React, { useEffect } from "react";
import "../styles/chatworld.css";
import Phaser from "phaser";

let game;
let room = "worldGameRoom";

export default function World({ socket }) {
	let players = {};
	let platforms;
	let texts = {};
	let w, a, s, d, spacebar;
	useEffect(() => {
		function preload() {
			this.load.image("background", "assets/background/plainblue.jpg");
			this.load.image("player", "assets/soccer/ball.png");
			this.load.image("ground", "assets/world/platform.png");
		}

		function create() {
			w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
			s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
			spacebar = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.SPACE
			);
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
					players[socketID] = this.physics.add.sprite(100, 100, "player");
					players[socketID].setScale(0.2);
					this.physics.add.collider(players[socketID], platforms);
					players[socketID].setCollideWorldBounds(true);
				}
			});
			socket.on("worldInsertPlayer", socketID => {
				players[socketID] = this.physics.add.sprite(100, 100, "player");

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

			if (spacebar.isDown) {
				if (players[socket.id]) {
					players[socket.id].setVelocityY(-330);
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
					debug: false,
					fps: 100,
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

	return <div id="game">testing this</div>;
}
