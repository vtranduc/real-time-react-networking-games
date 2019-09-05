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
	let background;
	let scoreText;

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
				arcade: { debug: false, fps: 100, gravity: { y: 200 } }
			},
			parent: "phaser",
			scene: { preload, create, update },
			transparent: true
		};

		let game = new Phaser.Game(config);
		// function preload() {}
		// function create() {}
		// function update() {
		// 	console.log("this is doing something");
		// }

		// function setUpLevels(){
		// 	for(let i = 0; i < 10; i ++){
		// 		setTimeout(()=>{

		// 		}, levelTimer -= )
		// 	}
		// }

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
			let bombs = physics.add.image(
				Math.floor(Math.random() * Math.floor(config.width)),
				0,
				"bomb"
			);
			bombs.setScale(getRandomInt(20, 35) / 200);
			bombs.body.setCircle(150);
			physics.add.overlap(player, bombs, hitBomb, null, this);
		}

		function createStar() {
			let star = physics.add.image(
				Math.floor(Math.random() * Math.floor(800)),
				0,
				"star"
			);
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
		// 	if (stars.countActive(true) === 0) {
		// 		stars.children.iterate(function(child) {
		// 			child.enableBody(true, child.x, 0, true, true);
		// 		});

		// 		var x =
		// 			player.x < 400
		// 				? Phaser.Math.Between(400, 800)
		// 				: Phaser.Math.Between(0, 400);

		// 		var bomb = bombs.create(x, 16, "bomb");
		// 		bomb.setBounce(1);
		// 		bomb.setCollideWorldBounds(true);
		// 		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		// 	}
		// }
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
			//this.load.image("sky", "assets/dodgingBullets/sky.png");
			// this.load.image("ground", "assets/dodgingBullets/platform.png");
			// this.load.image(
			// 	"shortplatform",
			// 	"assets/dodgingBullets/shortplatform.png"
			// );
			this.load.image("star", "assets/dodgingBullets/star.png");
			this.load.image("bomb", "assets/dodgingBullets/bomb.png");
			this.load.image("dude", "assets/dodgingBullets/dude.png");
			cursors = this.input.keyboard.createCursorKeys();
			// console.log(cursors);
			// console.log(Phaser.Input.Keyboard.KeyCodes);
		}
		function create() {
			// const sky = this.add.sprite(
			// 	config.width / 2,
			// 	config.height / 2,
			// 	"sky",
			// 	0
			// );
			//background.setScale(0.3)

			//--
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
			//---------------------------------------------------------
			//------------------------Platforms-------------------------
			// platforms = this.physics.add.staticGroup();
			// platforms.create(600, 400, "shortplatform");
			// platforms.create(50, 250, "shortplatform");
			// platforms.create(750, 220, "shortplatform");
			// debris = this.physics.add.image(150, 150, "debris")
			// p1 = this.physics.add.image(600, 400, "shortplatform").setImmovable(true);
			// p2 = this.physics.add.image(50, 250, "shortplatform").setImmovable(true);
			// p3 = this.physics.add.image(750, 220, "shortplatform").setImmovable(true);
			// ground = this.physics.add.image(400, 568, "ground").setImmovable(true);
			// ground.setScale(2)
			// debris.setScale(0.3)
			// ground.body.setAllowGravity(false);
			// p1.body.setAllowGravity(false);
			// p2.body.setAllowGravity(false);
			// p3.body.setAllowGravity(false);
			//------------------------------------------------------------
			//----------------------bombs---------------------------------
			bombs = this.physics.add.group();
			//console.log(platforms, "LOOK HERE");
			//------------------------------------------------------------
			//----------------------playerSetup---------------------------
			player = this.physics.add.image(100, 450, "dude");
			player.setScale(0.12);
			player.body.setAllowGravity(false);
			// player.setBounce(0.2);
			player.setCollideWorldBounds(true);
			// this.anims.create({
			// 	key: "left",
			// 	frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
			// 	frameRate: 10,
			// 	repeat: -1
			// });

			// this.anims.create({
			// 	key: "turn",
			// 	frames: [{ key: "dude", frame: 4 }],
			// 	frameRate: 20
			// });

			// this.anims.create({
			// 	key: "right",
			// 	frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
			// 	frameRate: 10,
			// 	repeat: -1
			// });
			//-------------------------------------------------------------

			//------------------------stars--------------------------------

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

			//setStarInterval();

			// 	intervalBombs = setInterval(()=>{
			// 		console.log("setinterval 1")
			// 		let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);
			// }, 1000)

			// 	timeouts.push(setTimeout(()=>{
			// 		console.log("doing something")
			// 		clearInterval(intervalBombs)
			// 		intervalBombs = setInterval(()=>{
			// 			let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);

			// 		}, 800)
			// 	}, 4000))

			// 	timeouts.push(setTimeout(()=>{
			// 		console.log("doing something")
			// 		clearInterval(intervalBombs)
			// 		intervalBombs = setInterval(()=>{
			// 			let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);

			// 		}, 600)
			// 	}, 8000))

			// 	timeouts.push(setTimeout(()=>{
			// 		console.log("doing something")
			// 		clearInterval(intervalBombs)
			// 		intervalBombs = setInterval(()=>{
			// 			let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);

			// 		}, 400)
			// 	}, 10000))

			// 	timeouts.push(setTimeout(()=>{
			// 		console.log("doing something")
			// 		clearInterval(intervalBombs)
			// 		intervalBombs = setInterval(()=>{
			// 			let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);

			// 		}, 200)
			// 	}, 12000))

			// 	timeouts.push(setTimeout(()=>{
			// 		console.log("doing something")
			// 		clearInterval(intervalBombs)
			// 		intervalBombs = setInterval(()=>{
			// 			let bombs = this.physics.add.image(Math.floor(Math.random() * Math.floor(800)), 0 , 'bomb')
			// 		bombs.setScale(2)
			// 		this.physics.add.overlap(player, bombs, hitBomb, null, this);
			// 		}, 50)
			// 	}, 14000))
			//=====================================INTERVALS========================================

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

			//--------------------handle movements------------------
			//-----------sprint---------
			// if (a.isDown && shift.isDown) {
			// 	player.setVelocityX(-300);
			// 	player.anims.play("left", true);
			// } else if (d.isDown && shift.isDown) {
			// 	player.setVelocityX(300);
			// 	player.anims.play("right", true);
			// 	//---------------------------
			// 	//-----------walk------------
			// } else if (a.isDown) {
			// 	player.setVelocityX(-160);

			// 	player.anims.play("left", true);
			// } else if (d.isDown) {
			// 	player.setVelocityX(160);

			// 	player.anims.play("right", true);
			// 	//------------------------
			// } else if (player.body.touching.down) {
			// 	player.setVelocityX(0);

			// 	player.anims.play("turn");
			// }
			//-------------------------------------------------------------------
			//--------------------------------dashing------------------

			// if (Phaser.Input.Keyboard.JustDown(w) && player.body.touching.down) {
			// 	player.setVelocityY(-660);
			// }
			// if (Phaser.Input.Keyboard.JustDown(s)) {
			// 	player.setVelocityY(600);
			// }

			// if (Phaser.Input.Keyboard.JustDown(m)) {
			// 	console.log("printing m");
			// 	player.setVelocityX(600);
			// }
			// if (Phaser.Input.Keyboard.JustDown(n)) {
			// 	console.log("printing m");
			// 	player.setVelocityX(-600);
			// }
			//--------------------------------------------------
			//--------------------------------dashing------------------
			// if (cursors.left.isDown && cursors.) {
			// 	player.setVelocityX(-160);

			// 	player.anims.play("left", true);
			// } else if (cursors.right.isDown) {
			// 	player.setVelocityX(160);

			// 	player.anims.play("right", true);
			// } else {
			// 	player.setVelocityX(0);

			// 	player.anims.play("turn");
			// }
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
