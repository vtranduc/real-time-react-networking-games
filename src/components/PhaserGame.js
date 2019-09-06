import React, { useState, useEffect } from "react";
import getRandomInt from "../helpers/getRandomInt";
import Phaser, { RIGHT } from "phaser";
import "../styles/phaserGame.css";

function PhaserGame() {
	const [highscore, setHighscore] = useState(0);
	let thiis;
	let physics;
	let player;
	let star;
	let timedEventBomb;
	let timedEventStar;
	let bombs;
	let bombs2;
	let platforms;
	let movementSpeed = 4;
	let cursors;
	let score = 0;
	let gameOver = false;
	let debris;
	let ground;
	let stars;
	let background;
	let scoreText;
	let lasers;
	let timer = 0;
	let limit = 100;
	let intervalStars;
	let intervalBombs;
	let intervalStarTimer;
	let intervalBombTimer = 1000;
	let levelTimer = 1000;
	let p1, p2, p3;
	let downFlag = false;
	let scene;

	let timeoutArr = [];
	let intervalArr = [];
	let timedEvent;
	let w, a, s, d, spacebar, shift, m, n;

	useEffect(() => {
		let config = {
			type: Phaser.AUTO,
			width: 1200,
			height: 600,
			physics: {
				default: "arcade",
				parent: "phaser",
				arcade: { debug: true, fps: 100, gravity: { y: 200 } }
			},
			parent: "phaser",
			scene: { preload, create, update },
			transparent: true
		};

		let game = new Phaser.Game(config);

		function levelIncrementInit() {
			thiis.time.addEvent({
				delay: 5000,
				callback: () => {
					thiis.time.addEvent({
						delay: 800,
						callback: createBomb,
						callbackScope: thiis,
						loop: true
					});
				},
				callbackScope: thiis,
				loop: true
			});
			//this.time.delayedCall(5000, ()=>{this.time.addEvent({ delay: 800, callback: createBomb, callbackScope: this, loop: true })}, [], this);
		}
		function createBomb() {
			let bomb = physics.add.image(
				Math.floor(Math.random() * Math.floor(config.width)),
				0,
				"bomb"
			);
			bomb.setScale(getRandomInt(20, 35) / 200);
			bomb.body.setCircle(150);
			bombs.add(bomb);
			physics.add.overlap(player, bomb, hitBomb, null, this);
		}

		function createLaser() {
			let laser = physics.add.image(player.x, player.y - 30, "laser");
			laser.setScale(0.04);
			laser.body.velocity.y = -200;
			laser.body.setAllowGravity(false);

			lasers.add(laser);
		}

		function createStar() {
			let star = physics.add.image(
				Math.floor(Math.random() * Math.floor(800)),
				0,
				"star"
			);
			stars.add(star);
			physics.add.overlap(player, star, collectStar, null, this);
		}

		function setStarInterval() {
			intervalStars = setInterval(() => {
				physics.add.image(
					Math.floor(Math.random() * Math.floor(800)),
					0,
					"star"
				);
				physics.add.overlap(player, star, collectStar, null, this);
			}, 1000);
		}
		function collectStar(player, star) {
			star.disableBody(true, true);

			score += 10;
			scoreText.setText("Score: " + score);
		}

		function destroyBomb() {
			//lasers.disableBody(true, true);
			//bombs.disableBody(true, true);
			score += 2;
			scoreText.setText("Score: " + score);
		}
		function hitBomb(player, bomb) {
			player.setTint(0xff0000);

			for (let interval of intervalArr) {
				clearInterval(interval);
			}
			for (let interval of timeoutArr) {
				clearTimeout(interval);
			}

			clearInterval(intervalStars);
			intervalStars = undefined;

			physics.pause();
			gameOver = true;

			if (highscore < score) {
				setHighscore(score);
			}
			score = 0;

			scene.restart();

			//window.location.reload();
		}
		function preload() {
			thiis = this;
			scene = this.scene;
			physics = this.physics;
			// this.load.image("debris", "assets/dodgingBullets/debris.png")
			this.load.spritesheet("space", "assets/dodgingBullets/background.png", {
				frameWidth: 500,
				frameHeight: 500
			});
			this.load.image("laser", "assets/dodgingBullets/PixelArt.png");

			this.load.image("star", "assets/dodgingBullets/star.png");
			this.load.image("bomb", "assets/dodgingBullets/bomb.png");
			this.load.image("dude", "assets/dodgingBullets/dude.png");
			cursors = this.input.keyboard.createCursorKeys();
			// console.log(cursors);
			// console.log(Phaser.Input.Keyboard.KeyCodes);
		}
		function create() {
			bombs = this.add.group();
			lasers = this.add.group();
			stars = this.add.group();
			this.physics.add.overlap(bombs, lasers, destroyBomb, null, this);
			//----------Key Config-------------------------------------
			spacebar = this.input.keyboard.addKey(
				Phaser.Input.Keyboard.KeyCodes.SPACE
			);
			w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
			a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
			s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
			d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
			m = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
			n = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

			shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
			//---------------------------------------------------------
			//----------Adding Background------------------------------
			//background = this.add.image(config.width / 2, config.height / 2, "sky");

			//----------------------------------------------------------
			//-----------Score Text------------------------------------
			scoreText = this.add.text(16, 16, "score: 0", {
				fontSize: "32px",
				fill: "#999"
			});

			//----------------------playerSetup---------------------------
			player = this.physics.add.image(100, 450, "dude");
			player.setScale(0.12);
			player.body.setAllowGravity(false);
			// player.setBounce(0.2);
			player.setCollideWorldBounds(true);

			//=====================================INTERVALS========================================

			//setLevelInterval(1400, 5000,timeoutArr, intervalArr)
			this.time.addEvent({
				delay: 500,
				callback: createBomb,
				callbackScope: this,
				loop: true
			});
			levelIncrementInit();
			this.time.addEvent({
				delay: 1000,
				callback: createStar,
				callbackScope: this,
				loop: true
			});

			//-------------------------------------------------------------
			//------------------------collisions---------------------------
			// this.physics.add.collider(player, platforms);

			//this.physics.add.collider(bombs, platforms);
			//this.physics.add.collider(player, ground);
			//this.physics.add.collider(player, bombs, hitBomb, null, this);
			// this.physics.add.collider(player,p1)
			// this.physics.add.collider(player,p2)
			// this.physics.add.collider(player,p3)
			//this.physics.add.collider(stars, ground);
			// this.physics.add.collider(stars, p1);
			// this.physics.add.collider(stars, p2);
			// this.physics.add.collider(stars, p3);
			//-------------------------------------------------------------
		}
		function update() {
			//console.log(timedEvent.progress())
			if (a.isDown) {
				player.x -= movementSpeed;
			}
			if (d.isDown) {
				player.x += movementSpeed;
			}
			if (w.isDown) {
				player.y -= movementSpeed;
			}
			if (s.isDown) {
				player.y += movementSpeed;
			}
			if (Phaser.Input.Keyboard.JustDown(spacebar)) {
				createLaser();
			}
		}

		return function cleanup() {
			//clearInterval(intervalBombs2)
			game.destroy();
		};
	}, []);
	return (
		<div>
			<h3>HighScore: {highscore}</h3>
			<div id="phaser"></div>;
		</div>
	);
}

export default PhaserGame;
