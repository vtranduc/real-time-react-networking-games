import React from "react";
import "../styles/profile.css";
function Profile() {
	return (
		<div class="container">
			<div class="row profile">
				<div class="col-md-3">
					<div class="profile-sidebar">
						<div class="profile-userpic">
							<img
								src="https://static.change.org/profile-img/default-user-profile.svg"
								class="img-responsive"
								alt=""
							/>
						</div>

						<div class="profile-usertitle">
							<div class="profile-usertitle-name">Marcus Doe</div>
							<div class="profile-usertitle-job">Developer</div>
						</div>

						<div class="profile-userbuttons">
							<button type="button" class="btn btn-success btn-sm">
								Follow
							</button>
							<button type="button" class="btn btn-danger btn-sm">
								Message
							</button>
						</div>

						<div class="profile-usermenu">
							<ul class="nav">
								<li class="active">
									<a href="#">
										<i class="glyphicon glyphicon-home"></i>
										Overview{" "}
									</a>
								</li>
								<li>
									<a href="#">
										<i class="glyphicon glyphicon-user"></i>
										Account Settings{" "}
									</a>
								</li>
								<li>
									<a href="#" target="_blank">
										<i class="glyphicon glyphicon-ok"></i>
										Tasks{" "}
									</a>
								</li>
								<li>
									<a href="#">
										<i class="glyphicon glyphicon-flag"></i>
										Help{" "}
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
