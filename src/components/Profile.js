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

function Profile({ profileInfo, httpServer, loginStatus, socket, match }) {
  //axios call to get user messages
  const [posts, setPosts] = useState(null);
  const [postList, setPostList] = useState([]);
  const [userMessage, setUserMessage] = useState({
    title: "",
    message: ""
  });

  function handleSubmit() {
    console.log(profileInfo);
    if (
      profileInfo &&
      userMessage.title.length > 1 &&
      userMessage.message.length > 1
    ) {
      axios
        .post(`${httpServer}postmessage`, {
          title: userMessage.title,
          message: userMessage.message,
          sender: profileInfo.username,
          receiver: "a"
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      alert("not logged in, or empty title or message");
    }
  }

  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================
  // =========ALL LOADING============================

  const [wall, setWall] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    axios
      .post(`${httpServer}retrieveuserprofile`, {
        username: match.params.username
      })
      .then(res => {
        console.log("Data received by client: ", res.data);
        if (res.data) {
          const hello = {
            username: match.params.username,
            avatar: res.data.avatar,
            followings: res.data.followings,
            followers: res.data.followers
          };
          setProfileData(hello);
          //---------
          setWall([]);
          console.log("Hello is this: ", hello);
          // setProfileData({
          //   username: match.params.username,
          //   avatar: res.data.avatar
          // });
        } else {
          console.log("User does not exist!");
          setProfileData(false);
          setWall([]);
        }
      });
  }, []);

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

  return (
    <div>
      {wall && profileData !== null ? (
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

                  <img src={profileInfo.avatar} id="profile-img" />

                  <div id="profile-button">
                    <Button variant="contained" color="primary">
                      Add Friend
                    </Button>
                    <Button variant="contained" color="secondary">
                      Follow
                    </Button>
                  </div>
                  <div id="profile-about">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit.
                  </div>
                </div>

                {/* -------------FOLLOWERS------------------------------------------------- */}

                <Paper
                  style={{
                    width: "100%",
                    marginTop: "2vh",
                    display: "flex",
                    flexDirection: "column",
                    height: "20vh"
                  }}
                >
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
                <Paper
                  style={{
                    width: "100%",
                    marginTop: "2vh",
                    display: "flex",
                    flexDirection: "column",
                    height: "20vh"
                  }}
                >
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

                  <Button onClick={handleSubmit}>Submit</Button>
                </form>
                {postList}
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
