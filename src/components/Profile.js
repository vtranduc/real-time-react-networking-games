import React, { useState, useEffect } from "react";
import "../styles/profile.css";
// import Posts from "./Post";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
// import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { Link } from "react-router-dom";
// import { SSL_OP_NO_TLSv1_2 } from "constants";

import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
// import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import getLastItemFromURL from "../helpers/getLastItemFromURL";
import CustomizePopover from "./customizePopover/CustomizePopover";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

function Profile({
  profileInfo,
  httpServer,
  loginStatus,
  socket,
  toOtherUser,
  setToOtherUser,
  match
}) {
  // const [postList, setPostList] = useState([]);
  //axios call to get user messages
  // const [posts, setPosts] = useState(null);

  // function handleSubmit() {
  //   console.log(profileInfo);
  //   if (
  //     profileInfo &&
  //     userMessage.title.length > 1 &&
  //     userMessage.message.length > 1
  //   ) {
  //     axios
  //       .post(`${httpServer}postmessage`, {
  //         title: userMessage.title,
  //         message: userMessage.message,
  //         sender: profileInfo.username,
  //         receiver: "a"
  //       })
  //       .then(function(response) {
  //         console.log(response);
  //       })
  //       .catch(function(error) {
  //         console.log(error);
  //       });
  //   } else {
  //     alert("not logged in, or empty title or message");
  //   }
  // }

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================

  const [wall, setWall] = useState(null);
  const [profileData, setProfileData] = useState(null);
  // const [toOtherUser, setToOtherUser] = useState({
  //   trigger: false,
  //   username: null
  // });
  const [userMessage, setUserMessage] = useState({
    title: "",
    message: ""
  });
  const [relationship, setRelationship] = useState(null);
  // relationship = {friendship: ..., follow: ...}
  // friendship is one of: "established", "received", "sending", "none", "self"
  // follow is boolean
  // both are null

  useEffect(() => {
    setToOtherUser({ trigger: true, username: match.params.username });
    const handleProfileReload = function() {
      // console.log("triggering reload chain reaction!");
      setToOtherUser({
        trigger: true,
        username: getLastItemFromURL(window.location.href)
      });
      setUserMessage({
        title: "",
        message: ""
      });
    };
    socket.on("profileReload", handleProfileReload);
    const handleBackFromUserToAnother = function() {
      // console.log("SWITCHED NINTENDO!");
      setToOtherUser({
        trigger: true,
        username: getLastItemFromURL(window.location.href)
      });
    };
    window.addEventListener("popstate", handleBackFromUserToAnother);
    return () => {
      window.removeEventListener("popstate", handleBackFromUserToAnother);
      socket.removeListener("profileReload", handleProfileReload);
    };
  }, []);

  useEffect(() => {
    console.log("changed trigger");
    if (toOtherUser.trigger) {
      setToOtherUser({ ...toOtherUser, trigger: false });
      axios
        .post(`${httpServer}retrieveuserprofile`, {
          username: toOtherUser.username,
          requester: loginStatus ? profileInfo.username : null
        })
        .then(res => {
          if (res.data) {
            const userData = {
              username: toOtherUser.username,
              avatar: res.data.avatar,
              bio: res.data.bio,
              background: res.data.background,
              followings: res.data.followings,
              followers: res.data.followers,
              friends: [
                ...new Set([
                  ...res.data.friends.receivers,
                  ...res.data.friends.senders
                ])
              ]
            };

            // console.log(
            //   "SHOW ME THE DATA HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEE",
            //   res.data
            // );

            setProfileData(userData);
            // console.log("posts are: ", res.data.posts);
            setWall(res.data.posts);
            // console.log(
            //   "naze naze koi niwaaaa: ",
            //   userData.followers
            //     .map(follower => follower.username)
            //     .includes(profileInfo.username)
            // );

            console.log("SHOW MY RELATIONSHIP HERE", {
              friendship: loginStatus ? res.data.friendship : null,
              follow: loginStatus
                ? userData.followers
                    .map(follower => follower.username)
                    .includes(profileInfo.username)
                : null
            });

            setRelationship({
              friendship: loginStatus ? res.data.friendship : null,
              follow: loginStatus
                ? userData.followers
                    .map(follower => follower.username)
                    .includes(profileInfo.username)
                : null
            });
          } else {
            setProfileData(false);
            setWall([]);
            setRelationship({});
          }
        });
    }
  }, [toOtherUser.trigger]);

  const handleWallPost = function() {
    if (loginStatus) {
      console.log("yaminomA~~~~~~~~~~~~!");
      console.log("DUMMY DATA HERE! TO BE REPLACED!==========================");
      // userMessage.title.length > 1 &&
      //   userMessage.message.length > 1
      if (userMessage.title.length === 0 || userMessage.message.length === 0) {
        alert("The title and the message cannot be empty!");
      } else {
        socket.emit("userPostWall", {
          sender_username: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
          // sender_username: profileInfo.username,
          receiver_username: getLastItemFromURL(window.location.href),
          message_title: userMessage.title,
          sent_message: userMessage.message
        });
      }
    } else {
      alert("You must log in to post to the user!");
    }
  };

  function updateInput(event) {
    switch (event.target.name) {
      case "title":
        setUserMessage({ ...userMessage, title: event.target.value });
        break;
      case "message":
        setUserMessage({ ...userMessage, message: event.target.value });
        break;
      default:
        break;
    }
  }

  const handleUserFollow = function() {
    // console.log("yaminoma! ohayo!");
    if (loginStatus) {
      socket.emit("userFollow", {
        follower: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        followed: getLastItemFromURL(window.location.href)
      });
    } else {
      alert("Please register for an account to use this feature");
    }
  };

  const handleAddFriend = function() {
    console.log("attempt to add friend here");
    if (loginStatus) {
      socket.emit("profileAddFriend", {
        sender: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        receiver: getLastItemFromURL(window.location.href)
      });
    } else {
      alert("Please register for an account to use this feature");
    }
  };

  const handleUnfollow = function() {
    console.log("unfollow NOW");
    socket.emit("userUnfollow", {
      sender: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      unfollowed: getLastItemFromURL(window.location.href)
    });
  };

  const handleRemoveFriend = function() {
    console.log("remove friend NOW");
    socket.emit("userRemoveFriend", {
      remover: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      removed: getLastItemFromURL(window.location.href)
    });
  };

  const handleCancelRequest = function() {
    console.log("Cancel friend");
    socket.emit("userCancelRequest", {
      canceller: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      cancelled: getLastItemFromURL(window.location.href)
    });
  };

  const handleDeclineRequest = function() {
    console.log("Declining"); // WHERE I LEFT OFF-----------------------------
    socket.emit("userDeclineRequest", {
      denier: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      denied: getLastItemFromURL(window.location.href)
    });
  };

  const handleAcceptRequest = function() {
    socket.emit("userAcceptRequest", {
      accepter: profileInfo.username, // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      sender: getLastItemFromURL(window.location.href)
    });
  };

  // const handleEditUserProfile = function() {
  //   console.log("editing the profile now");

  //   socket.emit("userEditProfile");
  // };

  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================

  // useEffect(() => {
  //   let postHistory = [];
  //   if (posts) {
  //     for (let messageData of posts) {
  //       postHistory.push(
  //         <Posts
  //           title={messageData.message_title}
  //           message={messageData.sent_message}
  //           sender={"not sure"}
  //         />
  //       );
  //     }

  //     setPostList(postHistory);
  //   }
  // }, [posts]);

  return (
    <div>
      {wall && relationship && profileData !== null ? (
        //--------------------------------------------
        <div>
          {profileData ? (
            <div id="divider">
              <div id="left">
                <div
                  id="profile"
                  style={{
                    // border: "solid green",
                    backgroundImage: `url("${profileData.background}")`
                  }}
                >
                  <br></br>
                  {/* <img
                    id="profilebackground"
                    src="https://images5.alphacoders.com/587/587597.jpg"
                    alt="https://images5.alphacoders.com/587/587597.jpg"
                  ></img> */}
                  {/* <img src="https://images5.alphacoders.com/587/587597.jpg"></img> */}
                  {/* {!profileInfo && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
              id="profile-img"
            />
          )} */}

                  {/* <div id="profileOverlay"> */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%"
                    }}
                  >
                    <img src={profileData.avatar} id="profile-img" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      // border: "solid",
                      width: "100%"
                    }}
                  >
                    <h2
                      style={{
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        borderRadius: "20px"
                        // opacity: 0.8
                      }}
                    >
                      {profileData.username}
                    </h2>
                  </div>
                  <div id="profile-button">
                    {/* //================================================ */}
                    {(relationship.friendship === null ||
                      relationship.friendship === "none") && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddFriend}
                      >
                        Add Friend
                      </Button>
                    )}
                    {relationship.friendship === "established" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRemoveFriend}
                      >
                        Remove friend
                      </Button>
                    )}

                    {relationship.friendship === "received" && (
                      <div>
                        <Button
                          aria-describedby={id}
                          variant="contained"
                          color="primary"
                          onClick={handleClick}
                          // style={{ color: "red" }}
                        >
                          Respond to Friend Request
                        </Button>
                        <Popper
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          transition
                        >
                          {({ TransitionProps }) => (
                            <Fade {...TransitionProps} timeout={350}>
                              <Paper
                              // style={{
                              //   backgroundColor: "white",
                              //   margin: "0.5em",
                              //   // border: "solid green",
                              //   width: "30vw"
                              // }}
                              >
                                {/* <Typography className={classes.typography}> */}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    width: "100%"
                                  }}
                                >
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAcceptRequest}
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleDeclineRequest}
                                  >
                                    Decline
                                  </Button>
                                </div>
                                {/* </Typography> */}
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                      </div>
                    )}

                    {relationship.friendship === "pending" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCancelRequest}
                      >
                        Cancel request
                      </Button>
                    )}

                    {relationship.friendship === "self" && (
                      <CustomizePopover
                        avatar={profileData.avatar}
                        background={profileData.background}
                        bio={profileData.bio}
                        socket={socket}
                        username={profileInfo.username}
                      />
                      // <Button
                      //   variant="contained"
                      //   color="primary"
                      //   onClick={handleEditUserProfile}
                      // >
                      //   Edit
                      // </Button>
                    )}

                    {/* //=============================================================== */}

                    {relationship.follow ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleUnfollow}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleUserFollow}
                      >
                        Follow
                      </Button>
                    )}
                    {/* <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUserFollow}
                    >
                      Follow
                    </Button> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%"
                    }}
                  >
                    <div
                      id="profile-about"
                      style={{ margin: "1em", overflowWrap: "break-word" }}
                    >
                      {profileData.bio}
                    </div>
                  </div>
                  {/* </div> */}
                </div>

                {/* -------------FRIENDS------------------------------------------------- */}

                <Paper className="big3">
                  <h3 style={{ display: "flex", justifyContent: "center" }}>
                    Friends ({profileData.friends.length})
                  </h3>
                  <List
                    style={{
                      margin: 5,
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "row",
                      height: "100%"
                      // justifyContent: "flex-end",
                      // width: "100%",
                      // border: "solid"
                    }}
                  >
                    {profileData.friends.map(friend => {
                      // console.log("logging....: ", profileData.background);
                      return (
                        <ListItem
                          key={`friend-${friend.username}`}
                          style={{
                            height: "100%",
                            // border: "solid green",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          {/* <Link
                            to={`/user/${friend.username}`}
                            // to="/aboutus"
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: friend.username
                              });
                            }}
                            style={{
                              height: "100%",
                              borderRadius: "50%"
                            }}
                          >
                            <img
                              style={{ borderRadius: "50%", height: "100%" }}
                              src={friend.avatar}
                            ></img>
                          </Link> */}
                          <Link
                            to={`/user/${friend.username}`}
                            // to="/aboutus"
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: friend.username
                              });
                            }}
                            // style={{
                            //   height: "100%",
                            //   borderRadius: "50%"
                            // }}
                          >
                            <div
                              // className="imageCropper"
                              style={{
                                width: "10vh",
                                height: "10vh",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "50%"
                              }}
                            >
                              <img
                                // className="croppedImage"
                                style={{
                                  display: "inline",
                                  margin: "0 auto",
                                  height: "100%",
                                  width: "auto"
                                }}
                                src={friend.avatar}
                              ></img>
                            </div>
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>

                {/* -------------FOLLOWERS------------------------------------------------- */}

                <Paper className="big3">
                  <h3 style={{ display: "flex", justifyContent: "center" }}>
                    Followers ({profileData.followers.length})
                  </h3>
                  <List
                    style={{
                      margin: 5,
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "row",
                      height: "100%"
                    }}
                  >
                    {profileData.followers.map(follower => {
                      // console.log("FLOWERRRRR: ", profileData.background);
                      return (
                        <ListItem
                          key={`follower-${follower.username}`}
                          style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <Link
                            to={`/user/${follower.username}`}
                            // style={{
                            //   height: "100%",
                            //   borderRadius: "50%"
                            // }}
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: follower.username
                              });
                            }}
                          >
                            <div
                              // className="imageCropper"
                              style={{
                                width: "10vh",
                                height: "10vh",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "50%"
                              }}
                            >
                              <img
                                // className="croppedImage"
                                style={{
                                  display: "inline",
                                  margin: "0 auto",
                                  height: "100%",
                                  width: "auto"
                                }}
                                src={follower.avatar}
                              ></img>
                            </div>
                            {/* <img
                              style={{
                                borderRadius: "50%",
                                height: "100%"
                                // width: "auto"
                              }}
                              src={follower.avatar}
                            ></img> */}
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>

                {/* -------------FOLLOWING------------------------------------------------- */}
                <Paper className="big3">
                  <h3 style={{ display: "flex", justifyContent: "center" }}>
                    Following ({profileData.followings.length})
                  </h3>
                  <List
                    style={{
                      margin: 5,
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "row",
                      height: "100%"
                    }}
                  >
                    {profileData.followings.map(following => {
                      return (
                        <ListItem
                          key={`following-${following.username}`}
                          style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center"
                          }}
                        >
                          <Link
                            to={`/user/${following.username}`}
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: following.username
                              });
                            }}
                            // style={{
                            //   height: "100%",
                            //   borderRadius: "50%"
                            // }}
                          >
                            <div
                              // className="imageCropper"
                              style={{
                                width: "10vh",
                                height: "10vh",
                                position: "relative",
                                overflow: "hidden",
                                borderRadius: "50%"
                              }}
                            >
                              <img
                                // className="croppedImage"
                                style={{
                                  display: "inline",
                                  margin: "0 auto",
                                  height: "100%",
                                  width: "auto"
                                }}
                                src={following.avatar}
                              ></img>
                            </div>
                            {/* <img
                              style={{ borderRadius: "50%", height: "100%" }}
                              src={following.avatar}
                            ></img> */}
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </div>
              <div className="right">
                <form id="form-post">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextField
                      label="Title"
                      placeholder="Enter a title here"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true
                      }}
                      name="title"
                      onChange={updateInput}
                      value={userMessage.title}
                      style={{ backgroundColor: "lightgray" }}
                    />
                    <TextField
                      name="message"
                      label="Message"
                      placeholder="Send a post!"
                      fullWidth
                      margin="normal"
                      multiline
                      InputLabelProps={{
                        shrink: true
                      }}
                      rows="10"
                      style={{ backgroundColor: "lightgray" }}
                      value={userMessage.message}
                      onChange={updateInput}
                    />
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleWallPost}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </form>
                {/* {postList} */}
                <List>
                  {wall
                    .slice(0)
                    .reverse()
                    .map((post, index) => {
                      // console.log(post, "army");
                      return (
                        <ListItem
                          key={`wall${post.username}${post.time_of_post}${index}`}
                        >
                          <div>
                            <Link
                              to={`/user/${post.username}`}
                              // style={{
                              //   height: "100%",
                              //   borderRadius: "50%"
                              // }}
                              onClick={() => {
                                setToOtherUser({
                                  trigger: true,
                                  username: post.username
                                });
                              }}
                            >
                              <div
                                // className="imageCropper"
                                style={{
                                  width: "10vh",
                                  height: "10vh",
                                  position: "relative",
                                  overflow: "hidden",
                                  borderRadius: "50%"
                                }}
                              >
                                <img
                                  // className="croppedImage"
                                  style={{
                                    display: "inline",
                                    margin: "0 auto",
                                    height: "100%",
                                    width: "auto"
                                  }}
                                  src={post.avatar}
                                ></img>
                              </div>
                              {/* <img
                                src={post.avatar}
                                alt={post.avatar}
                                width="70vw"
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "0.5em"
                                }}
                              ></img> */}
                            </Link>
                            <h4
                              style={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center"
                              }}
                            >
                              {post.username}
                            </h4>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              width: "100%"
                            }}
                          >
                            <Chip
                              label={post.message_title}
                              style={{
                                fontSize: "1.2em",
                                backgroundColor: "gray",
                                marginRight: "1em",
                                marginLeft: "1em"
                              }}
                            ></Chip>

                            <p style={{ color: "black", margin: "1em" }}>
                              {post.sent_message}
                            </p>
                            <p
                              style={{
                                display: "flex",
                                justifyContent: "flex-end"
                              }}
                            >
                              {post.time_of_post}
                            </p>
                          </div>
                        </ListItem>
                      );
                    })}
                </List>
              </div>
            </div>
          ) : (
            <h3>The user does not exist!</h3>
          )}
        </div>
      ) : (
        //-----------------------------------------

        <h3>Waiting for response from the server...</h3>
      )}
    </div>
  );
}

export default Profile;
