import React from "react";

function About() {
	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-6 img">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvzOpl3-kqfNbPcA_u_qEZcSuvu5Je4Ce_FkTMMjxhB-J1wWin-Q"
							alt=""
							class="img-rounded"
						/>
					</div>
					<div className="col-md-6 details">
						<blockquote>
							<h5>Fiona Gallagher</h5>
							<small>
								<cite title="Source Title">
									Chicago, United States of America{" "}
									<i className="icon-map-marker"></i>
								</cite>
							</small>
						</blockquote>
						<p>
							fionagallager@shameless.com <br />
							www.bootsnipp.com <br />
							June 18, 1990
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
