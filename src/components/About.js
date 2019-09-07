import React from "react";
import { Link } from "react-router-dom";
import "../styles/about.css";
function About() {
	return (
		<div className="everything">
			<figure className="snip1336">
				<img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
					alt="sample87"
				/>
				<figcaption>
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample4.jpg"
						alt="profile-sample4"
						className="profile"
					/>
					<h2>
						Hans Down<span>Engineer</span>
					</h2>
					<p>
						I'm looking for something that can deliver a 50-pound payload of
						snow on a small feminine target. Can you suggest something?
						Hello...?{" "}
					</p>
					<a href="#" className="follow">
						Follow
					</a>
					<a href="#" className="info">
						More Info
					</a>
				</figcaption>
			</figure>

			<figure className="snip1336">
				<img
					src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample74.jpg"
					alt="sample74"
				/>
				<figcaption>
					<img
						src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample2.jpg"
						alt="profile-sample2"
						className="profile"
					/>
					<h2>
						Wisteria Widget<span>Photographer</span>
					</h2>
					<p>
						Calvin: I'm a genius, but I'm a misunderstood genius. Hobbes: What's
						misunderstood about you? Calvin: Nobody thinks I'm a genius.
					</p>
					<a href="#" className="follow">
						Follow
					</a>
					<a href="#" className="info">
						More Info
					</a>
				</figcaption>
			</figure>
		</div>
	);
}

export default About;
