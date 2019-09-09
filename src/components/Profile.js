import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import Posts from "./Post";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useKeyPress from "../helpers/useKeyPress";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import { SSL_OP_NO_TLSv1_2 } from "constants";

function Profile({ profileInfo, httpServer, loginStatus, socket, match }) {
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

  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================

  const [wall, setWall] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [toOtherUser, setToOtherUser] = useState({
    trigger: false,
    username: null
  });
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
          username: toOtherUser.username
        })
        .then(res => {
          if (res.data) {
            const userData = {
              username: toOtherUser.username,
              avatar: res.data.avatar,
              bio: res.data.bio,
              followings: res.data.followings,
              followers: res.data.followers,
              friends: [
                ...new Set([
                  ...res.data.friends.receivers,
                  ...res.data.friends.senders
                ])
              ]
            };
            setProfileData(userData);
            // console.log("posts are: ", res.data.posts);
            setWall(res.data.posts);
            console.log(
              "naze naze koi niwaaaa: ",
              userData.followers
                .map(follower => follower.username)
                .includes(profileInfo.username)
            );
            setRelationship({
              friendship: null,
              follow: userData.followers
                .map(follower => follower.username)
                .includes(profileInfo.username)
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
    console.log("yaminomA~~~~~~~~~~~~!");
    console.log("DUMMY DATA HERE! TO BE REPLACED!==========================");
    // userMessage.title.length > 1 &&
    //   userMessage.message.length > 1
    if (userMessage.title.length === 0 || userMessage.message.length === 0) {
      alert("The title and the message cannot be empty!");
    } else {
      socket.emit("userPostWall", {
        sender_username: "a", // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        // sender_username: profileInfo.username,
        receiver_username: getLastItemFromURL(window.location.href),
        message_title: userMessage.title,
        sent_message: userMessage.message
      });
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
    socket.emit("userFollow", {
      follower: "b", // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      followed: getLastItemFromURL(window.location.href)
    });
  };

  const handleAddFriend = function() {
    console.log("attempt to add friend here");
    socket.emit("profileAddFriend", {
      sender: "c", // FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      receiver: getLastItemFromURL(window.location.href)
    });
  };

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
                <div id="profile">
                  {/* {!profileInfo && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
              id="profile-img"
            />
          )} */}

                  <img src={profileData.avatar} id="profile-img" />
                  <h2 style={{ color: "white" }}>{profileData.username}</h2>
                  <div id="profile-button">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddFriend}
                    >
                      Add Friend
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleUserFollow}
                    >
                      Follow
                    </Button>
                  </div>
                  <div id="profile-about">{profileData.bio}</div>
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
                    }}
                  >
                    {profileData.friends.map(friend => {
                      return (
                        <ListItem
                          key={`friend-${friend.username}`}
                          style={{ height: "100%" }}
                        >
                          <Link
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
                      return (
                        <ListItem
                          key={`follower-${follower.username}`}
                          style={{ height: "100%" }}
                        >
                          <Link
                            to={`/user/${follower.username}`}
                            style={{
                              height: "100%",
                              borderRadius: "50%"
                            }}
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: follower.username
                              });
                            }}
                          >
                            <img
                              style={{ borderRadius: "50%", height: "100%" }}
                              src={follower.avatar}
                            ></img>
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
                          style={{ height: "100%" }}
                        >
                          <Link
                            to={`/user/${following.username}`}
                            onClick={() => {
                              setToOtherUser({
                                trigger: true,
                                username: following.username
                              });
                            }}
                            style={{
                              height: "100%",
                              borderRadius: "50%"
                            }}
                          >
                            <img
                              style={{ borderRadius: "50%", height: "100%" }}
                              src={following.avatar}
                            ></img>
                          </Link>
                        </ListItem>
                      );
                    })}
                  </List>
                </Paper>
              </div>
              <div className="right">
                <form id="form-post">
                  <Input
                    onChange={updateInput}
                    name="title"
                    value={userMessage.title}
                    type="text"
                    placeholder="Title"
                  />
                  <Input
                    onChange={updateInput}
                    name="message"
                    value={userMessage.message}
                    type="text"
                    placeholder="Add Message"
                  />

                  <Button onClick={handleWallPost}>Submit</Button>
                </form>
                {/* {postList} */}
                <List>
                  {wall
                    .slice(0)
                    .reverse()
                    .map(post => {
                      // console.log(post, "army");
                      return (
                        <ListItem
                          key={`wall${post.username}${post.time_of_post}`}
                        >
                          <div>
                            <Link
                              to={`/user/${post.username}`}
                              style={{
                                height: "100%",
                                borderRadius: "50%"
                              }}
                              onClick={() => {
                                setToOtherUser({
                                  trigger: true,
                                  username: post.username
                                });
                              }}
                            >
                              <img
                                src={post.avatar}
                                alt={post.avatar}
                                width="70vw"
                                style={{
                                  borderRadius: "50%",
                                  marginRight: "0.5em"
                                }}
                              ></img>
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

                            <p style={{ color: "black" }}>
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

const getLastItemFromURL = function(url) {
  let index = 0;
  for (let i = url.length - 1; i > 0; i--) {
    if (url[i] === "/") {
      index = i;
      break;
    }
  }
  return url.slice(index + 1, url.length);
};
