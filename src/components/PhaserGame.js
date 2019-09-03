import React, { useEffect } from "react";

import Phaser, { RIGHT } from "phaser";
function PhaserGame() {
	let player;
	let stars;
	let bombs;
	let platforms;
	let cursors;
	let score = 0;
	let gameOver = false;
	let ground;
	let scoreText;
	let background;
	let p1, p2, p3;
	let downFlag = false;

	let w, a, s, d, spacebar, shift, m, n;

	useEffect(() => {
		let config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			physics: {
				default: "arcade",
				parent: "phaser",
				arcade: { debug: true, fps: 100, gravity: { y: 600 } }
			},
			parent: "phaser",
			scene: { preload, create, update }
		};

		let game = new Phaser.Game(config);
		// function preload() {}
		// function create() {}
		// function update() {
		// 	console.log("this is doing something");
		// }
		function collectStar(player, star) {
			star.disableBody(true, true);

			score += 10;
			scoreText.setText("Score: " + score);

			if (stars.countActive(true) === 0) {
				stars.children.iterate(function(child) {
					child.enableBody(true, child.x, 0, true, true);
				});

				var x =
					player.x < 400
						? Phaser.Math.Between(400, 800)
						: Phaser.Math.Between(0, 400);

				var bomb = bombs.create(x, 16, "bomb");
				bomb.setBounce(1);
				bomb.setCollideWorldBounds(true);
				bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
			}
		}
		function hitBomb(player, bomb) {
			this.physics.pause();

			player.setTint(0xff0000);

			player.anims.play("turn");

			gameOver = true;
		}
		function preload() {
			this.load.image("sky", "assets/dodgingBullets/sky.png");
			this.load.image("ground", "assets/dodgingBullets/platform.png");
			this.load.image(
				"shortplatform",
				"assets/dodgingBullets/shortplatform.png"
			);
			this.load.image("star", "assets/dodgingBullets/star.png");
			this.load.image("bomb", "assets/dodgingBullets/bomb.png");
			this.load.spritesheet("dude", "assets/dodgingBullets/dude.png", {
				frameWidth: 32,
				frameHeight: 48
			});
			cursors = this.input.keyboard.createCursorKeys();
			console.log(cursors);
			console.log(Phaser.Input.Keyboard.KeyCodes);
		}
		function create() {
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
			background = this.add.image(config.width / 2, config.height / 2, "sky");

			//----------------------------------------------------------
			//-----------Score Text------------------------------------
			scoreText = this.add.text(16, 16, "score: 0", {
				fontSize: "32px",
				fill: "#000"
			});
			//---------------------------------------------------------
			//------------------------Platforms-------------------------
			// platforms = this.physics.add.staticGroup();
			// platforms.create(600, 400, "shortplatform");
			// platforms.create(50, 250, "shortplatform");
			// platforms.create(750, 220, "shortplatform");
			p1 = this.physics.add.image(600, 400, "shortplatform").setImmovable(true);
			p2 = this.physics.add.image(50, 250, "shortplatform").setImmovable(true);
			p3 = this.physics.add.image(750, 220, "shortplatform").setImmovable(true);
			ground = this.physics.add.image(400, 568, "ground").setImmovable(true);

			ground.body.setAllowGravity(false);
			p1.body.setAllowGravity(false);
			p2.body.setAllowGravity(false);
			p3.body.setAllowGravity(false);
			//------------------------------------------------------------
			//----------------------bombs---------------------------------
			bombs = this.physics.add.group();
			//console.log(platforms, "LOOK HERE");
			//------------------------------------------------------------
			//----------------------playerSetup---------------------------
			player = this.physics.add.sprite(100, 450, "dude");

			player.setBounce(0.2);
			player.setCollideWorldBounds(true);
			this.anims.create({
				key: "left",
				frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
				frameRate: 10,
				repeat: -1
			});

			this.anims.create({
				key: "turn",
				frames: [{ key: "dude", frame: 4 }],
				frameRate: 20
			});

			this.anims.create({
				key: "right",
				frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
				frameRate: 10,
				repeat: -1
			});
			//-------------------------------------------------------------
			console.log("ground.body", ground.body);
			this.tweens.timeline({
				targets: ground.body.velocity,
				loop: -1,
				tweens: [
					{ x: 500, y: 0, duration: 1000, ease: "Stepped" },
					{ x: 0, y: 0, duration: 1000, ease: "Stepped" },
					{ x: -500, y: 0, duration: 1000, ease: "Stepped" },
					{ x: 0, y: 0, duration: 1000, ease: "Stepped" }
					// { x: 300, y: 0, duration: 1000, ease: "Stepped" }
				]
			});
			//------------------------stars--------------------------------
			stars = this.physics.add.group({
				key: "star",
				repeat: 11,
				setXY: { x: 12, y: 0, stepX: 70 }
			});

			stars.children.iterate(function(child) {
				child.setBounceY(Phaser.Math.FloatBetween(0.4, 1));
			});
			//-------------------------------------------------------------
			//------------------------collisions---------------------------
			this.physics.add.collider(player, platforms);
			this.physics.add.collider(stars, platforms);
			this.physics.add.overlap(player, stars, collectStar, null, this);
			this.physics.add.collider(bombs, platforms);
			this.physics.add.collider(player, ground);
			this.physics.add.collider(player, bombs, hitBomb, null, this);
			//-------------------------------------------------------------
		}
		function update() {
			//--------------------handle movements------------------
			//-----------sprint---------
			if (a.isDown && shift.isDown) {
				player.setVelocityX(-300);
				player.anims.play("left", true);
			} else if (d.isDown && shift.isDown) {
				player.setVelocityX(300);
				player.anims.play("right", true);
				//---------------------------
				//-----------walk------------
			} else if (a.isDown) {
				player.setVelocityX(-160);

				player.anims.play("left", true);
			} else if (d.isDown) {
				player.setVelocityX(160);

				player.anims.play("right", true);
				//------------------------
			} else if (player.body.touching.down) {
				player.setVelocityX(0);

				player.anims.play("turn");
			}
			//-------------------------------------------------------------------
			//--------------------------------dashing------------------

			if (Phaser.Input.Keyboard.JustDown(w) && player.body.touching.down) {
				player.setVelocityY(-660);
			}
			if (Phaser.Input.Keyboard.JustDown(s)) {
				player.setVelocityY(600);
			}

			if (Phaser.Input.Keyboard.JustDown(m)) {
				console.log("printing m");
				player.setVelocityX(600);
			}
			if (Phaser.Input.Keyboard.JustDown(n)) {
				console.log("printing m");
				player.setVelocityX(-600);
			}
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
			game.destroy();
		};
	}, []);
	return <container id="phaser"></container>;
}

export default PhaserGame;
