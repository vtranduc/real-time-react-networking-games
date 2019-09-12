import React from "react";
import "../styles/homepage.css";
import { Link } from "react-router-dom";
function Home() {
	return (
		<div className="home">
			<div className="pimg1">
				<div className="ptext">
					<span className="border">
						<h1>Welcome</h1>
					</span>
				</div>
			</div>
			<section className="section section-light">
				<h2>Hello There!</h2>
				<p>
					This is a website created by Jay Jay and Viet for the final project in
					Lighthouse Labs. Within this project, we integrated as many things we
					have learned throughout the whole curriculem and applied them in this
					website. We included as little npm packages as possible and at the
					same time utilized the ones we needed to the best of our abilities.
				</p>
			</section>
			<div className="pimg2">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/soccer">
							<h1>Divine Soccer</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>Sockets + React + Custom Engine</h2>
				<p>
					We had many complications building this website. One of the biggest
					hurdles that we had to overcome was the implementing server side logic
					to all players within a created game instance. In this game, Viet has
					created a server side physics engine to relay server inputs to the
					respective clients. All physics and movements of players are all
					created and refreshed on CSS and html on the DOM.
				</p>
			</section>
			<div className="pimg3">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/phaser-game">
							<h1>Comet Race</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>Profile Page</h2>
				<p>
					The profile page is another hurdle that we had to overcome. As there
					are numerous functionalities on the page itself (includes adding
					friends and follow cool people). A deep knowledge of handling database
					queries and design is crucial to make this work. Within the profile
					page, the players are able to submit tweets, follow other people, as
					well as request others as friends.
				</p>
			</section>
			<div className="pimg4">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/Chat World">
							<h1>Chat World</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>React + Sockets + PhaserEngine</h2>
				<p>
					We initially wanted to use Phaser to implement out multiplayer game.
					However, we did not have enough time to experiment with this amazing
					game engine. We faced many problems because the game engine ran on the
					DOM itself, thus there is not server side logic within the game. The
					created complications in which global objects within the game will go
					out of sync and render the game unplayable. However, there is a mini
					game that was created for the player to have fun with within out
					website.
				</p>
			</section>
			<div className="pimg5">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/aboutus">
							<h1>About</h1>
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Home;
