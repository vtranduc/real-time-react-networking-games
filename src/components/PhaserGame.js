import React, { useEffect } from "react";
import Phaser from "phaser";
function PhaserGame() {
	useEffect(() => {
		let config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			physics: {
				default: "arcade",
				parent: "phaser",
				arcade: {
					gravity: {},
					debug: true
				}
			},
			parent: "phaser",
			scene: {
				preload,
				create,
				update
			}
		};

		let game = new Phaser.Game(config);
		function preload() {}
		function create() {}
		function update() {
			console.log("this is doing something");
		}

		return function cleanup() {
			game.destroy();
		};
	}, []);
	return <container id="phaser"></container>;
}

export default PhaserGame;
