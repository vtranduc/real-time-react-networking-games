import React from "react";
import { Link } from "react-router-dom";
import "../styles/aboutus.css";
function Aboutus() {
	return (
		<div id="background">
			<div id="split">
				<div
					className="about"
					style={{ width: "50%", height: "100%", overflowY: "auto" }}
				>
					<div className="home2">
						<div className="pimg12">
							<div className="ptext2">
								<span className="border2">
									<h2>Viet-Nhien Tran Duc</h2>
								</span>
							</div>
						</div>
						<section className="section2 section-light2">
							<h2>Introducing Viet</h2>
							<p>
								Viet-Nhien Tran Duc has a rich background in scientific research
								and extensive coding experience from several disciplines,
								including web development and numerical modeling. His passion
								for computing science has driven him to pursue a career in
								becoming a full stack web-developer.
							</p>
						</section>
						<div className="pimg22">
							<div className="ptext2">
								<span className="border2">
									<Link className="route-link2" to="/soccer">
										<h1 className="header">Achievements</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section2 section-dark2">
							<h2 className="header">
								Custom Physics Engines - Python Javascript / React
							</h2>
							<p>
								With his extensive knowledge in computer science, mathematics,
								physics, and chemical engineering, Viet has created and
								successfully implemented physics engines for multiple games
								within his projects. His most recent physics engine is
								demonstrated in his soccer game on this website.
							</p>
						</section>
						<div className="pimg32">
							<div className="ptext2">
								<span className="border2">
									<Link className="route-link2" to="/phaser-game">
										<h1>Projects</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section2 section-dark2">
							<h2>
								Multiplayer Online - Card Games - Scheduler - Anime Puzzle -
								Tweeter
							</h2>
							<p>
								Projects displayed above defines Viets deidication and passion
								for web development. Each and every project showcases his
								extensive background knowledge as well as knowledge acquired
								through the course of Lighthouse Labs.<br></br>
								<a href="https://github.com/vtranduc/real-time-react-networking-games.git">
									Multiplayer Online
								</a>
								<br></br>
								<a href="https://github.com/vtranduc/multiPlayersMiniGameGallery.git">
									Card Games
								</a>
								<br></br>
								<a href="https://play.google.com/store/apps/details?id=ca.ualberta.customizableanimeartpuzzle&hl=en">
									Anime Puzzle
								</a>
								<br></br>
								<a href="https://github.com/vtranduc/tweeter">Tweeter</a>
							</p>
						</section>
						<div className="pimg42">
							<div className="ptext2">
								<span className="border2">
									<Link className="route-link2" to="/lobby">
										<h1>About</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section2 section-dark2">
							<h2>More About Viet</h2>
							<p>
								To know more about Viet, please checkout the following links
								below: GitHub, Resume, LinkedIn
							</p>
						</section>
						{/* <div className="pimg5">
						<div className="ptext">
							<span className="border">
								<Link className="route-link" to="/about">
									<h1>About</h1>
								</Link>
							</span>
						</div>
					</div> */}
					</div>
				</div>

				{/* split */}
				<div
					style={{
						width: "50%",
						height: "100%",
						overflowY: "auto",
						borderRadius: "30%"
					}}
				>
					<div className="home1">
						<div className="pimg11">
							<div className="ptext1">
								<span className="border1">
									<h2>Jay Jay Ting</h2>
								</span>
							</div>
						</div>
						<section className="section1 section-light1">
							<h2>Section One</h2>
							<p>
								Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
								veniam et sit pariatur incididunt. Enim in tempor cupidatat
								Lorem consequat. Proident nisi cupidatat eiusmod ullamco tempor
								sunt minim culpa adipisicing incididunt cupidatat eiusmod. Ut
								quis voluptate deserunt proident. Duis sunt sunt incididunt
								laborum deserunt. Aliqua aliquip deserunt aliqua ullamco
								cupidatat elit voluptate ex ex adipisicing Lorem eu officia sit.
								Cillum enim nostrud aliquip amet sit proident cillum dolor
								aliquip. Non consectetur irure ad sint proident sint qui ex
								consequat sunt laboris eiusmod est. Nulla proident ex
								adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur
								elit Lorem deserunt. Ex nulla deserunt irure voluptate dolore
								sit non eiusmod. Laboris qui exercitation amet officia ex elit
								esse duis cupidatat sunt nostrud sunt minim velit. Et pariatur
								culpa nostrud occaecat ea incididunt Lorem qui consectetur
								laboris consectetur. Sit et deserunt nostrud irure laboris
								elit.v
							</p>
						</section>
						<div className="pimg21">
							<div className="ptext1">
								<span className="border1">
									<Link className="route-link1" to="/soccer">
										<h1>Anime Soccer</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section1 section-dark">
							<h2>Sockets + React + Custom Engine</h2>
							<p>
								Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
								veniam et sit pariatur incididunt. Enim in tempor cupidatat
								Lorem consequat. Proident nisi cupidatat eiusmod ullamco tempor
								sunt minim culpa adipisicing incididunt cupidatat eiusmod. Ut
								quis voluptate deserunt proident. Duis sunt sunt incididunt
								laborum deserunt. Aliqua aliquip deserunt aliqua ullamco
								cupidatat elit voluptate ex ex adipisicing Lorem eu officia sit.
								Cillum enim nostrud aliquip amet sit proident cillum dolor
								aliquip. Non consectetur irure ad sint proident sint qui ex
								consequat sunt laboris eiusmod est. Nulla proident ex
								adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur
								elit Lorem deserunt. Ex nulla deserunt irure voluptate dolore
								sit non eiusmod. Laboris qui exercitation amet officia ex elit
								esse duis cupidatat sunt nostrud sunt minim velit. Et pariatur
								culpa nostrud occaecat ea incididunt Lorem qui consectetur
								laboris consectetur. Sit et deserunt nostrud irure laboris elit.
							</p>
						</section>
						<div className="pimg31">
							<div className="ptext1">
								<span className="border1">
									<Link className="route-link1" to="/phaser-game">
										<h1>Flappy Bird</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section1 section-dark1">
							<h2>Sockets + React + Custom Engine</h2>
							<p>
								Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
								veniam et sit pariatur incididunt. Enim in tempor cupidatat
								Lorem consequat. Proident nisi cupidatat eiusmod ullamco tempor
								sunt minim culpa adipisicing incididunt cupidatat eiusmod. Ut
								quis voluptate deserunt proident. Duis sunt sunt incididunt
								laborum deserunt. Aliqua aliquip deserunt aliqua ullamco
								cupidatat elit voluptate ex ex adipisicing Lorem eu officia sit.
								Cillum enim nostrud aliquip amet sit proident cillum dolor
								aliquip. Non consectetur irure ad sint proident sint qui ex
								consequat sunt laboris eiusmod est. Nulla proident ex
								adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur
								elit Lorem deserunt. Ex nulla deserunt irure voluptate dolore
								sit non eiusmod. Laboris qui exercitation amet officia ex elit
								esse duis cupidatat sunt nostrud sunt minim velit. Et pariatur
								culpa nostrud occaecat ea incididunt Lorem qui consectetur
								laboris consectetur. Sit et deserunt nostrud irure laboris elit.
							</p>
						</section>
						<div className="pimg41">
							<div className="ptext1">
								<span className="border1">
									<Link className="route-link1" to="/lobby">
										<h1>Lobby</h1>
									</Link>
								</span>
							</div>
						</div>
						<section className="section1 section-dark1">
							<h2>React + Sockets + PhaserEngine</h2>
							<p>
								Ex irure fugiat dolore consectetur aliqua aliquip irure deserunt
								veniam et sit pariatur incididunt. Enim in tempor cupidatat
								Lorem consequat. Proident nisi cupidatat eiusmod ullamco tempor
								sunt minim culpa adipisicing incididunt cupidatat eiusmod. Ut
								quis voluptate deserunt proident. Duis sunt sunt incididunt
								laborum deserunt. Aliqua aliquip deserunt aliqua ullamco
								cupidatat elit voluptate ex ex adipisicing Lorem eu officia sit.
								Cillum enim nostrud aliquip amet sit proident cillum dolor
								aliquip. Non consectetur irure ad sint proident sint qui ex
								consequat sunt laboris eiusmod est. Nulla proident ex
								adipisicing Lorem reprehenderit ut Lorem anim fugiat excepteur
								elit Lorem deserunt. Ex nulla deserunt irure voluptate dolore
								sit non eiusmod. Laboris qui exercitation amet officia ex elit
								esse duis cupidatat sunt nostrud sunt minim velit. Et pariatur
								culpa nostrud occaecat ea incididunt Lorem qui consectetur
								laboris consectetur. Sit et deserunt nostrud irure laboris elit.
							</p>
						</section>
						<div className="pimg51">
							<div className="ptext1">
								<span className="border1">
									<Link className="route-link1" to="/about">
										<h1>About</h1>
									</Link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Aboutus;
