import React from "react";
import "../styles/homepage.css";
import { Link } from "react-router-dom";
function Home() {
	return (
		<div className="home">
			<div className="pimg1">
				<div className="ptext">
					<span className="border">
						<h2>Welcome</h2>
					</span>
				</div>
			</div>
			<section className="section section-light">
				<h2>Hello There!</h2>
				<p>
					This is a website created by Jay Jay and Viet for our final project in
					Lighthouse Labs. Within this project, we integrated as many things we
					have learned throughout the whole curriculem and applied them in this
					website. We included as little npm packages as possible, and at the
					same time utilized the ones we used to the best abilities that we
					could.
				</p>
			</section>
			<div className="pimg2">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/soccer">
							<h1>Anime Soccer</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>Sockets + React + Custom Engine</h2>
				<p>
					Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
					veniam et sit pariatur incididunt. Enim in tempor cupidatat Lorem
					consequat. Proident nisi cupidatat eiusmod ullamco tempor sunt minim
					culpa adipisicing incididunt cupidatat eiusmod. Ut quis voluptate
					deserunt proident. Duis sunt sunt incididunt laborum deserunt. Aliqua
					aliquip deserunt aliqua ullamco cupidatat elit voluptate ex ex
					adipisicing Lorem eu officia sit. Cillum enim nostrud aliquip amet sit
					proident cillum dolor aliquip. Non consectetur irure ad sint proident
					sint qui ex consequat sunt laboris eiusmod est. Nulla proident ex
					adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur elit
					Lorem deserunt. Ex nulla deserunt irure voluptate dolore sit non
					eiusmod. Laboris qui exercitation amet officia ex elit esse duis
					cupidatat sunt nostrud sunt minim velit. Et pariatur culpa nostrud
					occaecat ea incididunt Lorem qui consectetur laboris consectetur. Sit
					et deserunt nostrud irure laboris elit.
				</p>
			</section>
			<div className="pimg3">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/phaser-game">
							<h1>Flappy Bird</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>Sockets + React + Custom Engine</h2>
				<p>
					Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
					veniam et sit pariatur incididunt. Enim in tempor cupidatat Lorem
					consequat. Proident nisi cupidatat eiusmod ullamco tempor sunt minim
					culpa adipisicing incididunt cupidatat eiusmod. Ut quis voluptate
					deserunt proident. Duis sunt sunt incididunt laborum deserunt. Aliqua
					aliquip deserunt aliqua ullamco cupidatat elit voluptate ex ex
					adipisicing Lorem eu officia sit. Cillum enim nostrud aliquip amet sit
					proident cillum dolor aliquip. Non consectetur irure ad sint proident
					sint qui ex consequat sunt laboris eiusmod est. Nulla proident ex
					adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur elit
					Lorem deserunt. Ex nulla deserunt irure voluptate dolore sit non
					eiusmod. Laboris qui exercitation amet officia ex elit esse duis
					cupidatat sunt nostrud sunt minim velit. Et pariatur culpa nostrud
					occaecat ea incididunt Lorem qui consectetur laboris consectetur. Sit
					et deserunt nostrud irure laboris elit.
				</p>
			</section>
			<div className="pimg4">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/lobby">
							<h1>Lobby</h1>
						</Link>
					</span>
				</div>
			</div>
			<section className="section section-dark">
				<h2>React + Sockets + PhaserEngine</h2>
				<p>
					Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
					veniam et sit pariatur incididunt. Enim in tempor cupidatat Lorem
					consequat. Proident nisi cupidatat eiusmod ullamco tempor sunt minim
					culpa adipisicing incididunt cupidatat eiusmod. Ut quis voluptate
					deserunt proident. Duis sunt sunt incididunt laborum deserunt. Aliqua
					aliquip deserunt aliqua ullamco cupidatat elit voluptate ex ex
					adipisicing Lorem eu officia sit. Cillum enim nostrud aliquip amet sit
					proident cillum dolor aliquip. Non consectetur irure ad sint proident
					sint qui ex consequat sunt laboris eiusmod est. Nulla proident ex
					adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur elit
					Lorem deserunt. Ex nulla deserunt irure voluptate dolore sit non
					eiusmod. Laboris qui exercitation amet officia ex elit esse duis
					cupidatat sunt nostrud sunt minim velit. Et pariatur culpa nostrud
					occaecat ea incididunt Lorem qui consectetur laboris consectetur. Sit
					et deserunt nostrud irure laboris elit.
				</p>
			</section>
			<div className="pimg5">
				<div className="ptext">
					<span className="border">
						<Link className="route-link" to="/about">
							<h1>About</h1>
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Home;
