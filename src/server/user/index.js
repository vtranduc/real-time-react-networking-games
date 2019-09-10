const {
  getMessage,
  getUserData,
  postMessage,
  getUserProfile,
  createUser,
  getFriendList,
  getFriendReceiverList,
  getFriendSenderList,
  getFollowingList,
  getFollowerList,
  getIdFromUsername
} = require("../../../db/queries/allQueries");

const profileServerData = function(app, pool) {
  // console.log("hug hug mog mog sugar less");
  // app.get("/getmessages/:username", (req, res) => {
  //   getMessage(req.params.username).then(data => {
  //     res.send(data);
  //   });
  // });

  // app.post("/postmessage", (req, res) => {
  //   let sender = req.body.sender;
  //   let receiver = req.body.receiver;
  //   let title = req.body.title;
  //   let message = req.body.message;
  //   console.log(sender, "jzizzless");
  //   postMessage(sender, receiver, title, message);
  // });

  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================

  app.post("/retrieveuserprofile", (req, res) => {
    // console.log("I am looking for: ", req.body);

    getUserProfile(req.body.username).then(userData => {
      // console.log("hello peon bow to me", userData);
      if (userData) {
        Promise.all([
          getMessage(req.body.username),
          // getFriendList(req.body.username),
          getFriendReceiverList(req.body.username),
          getFriendSenderList(req.body.username),
          getFollowingList(req.body.username),
          getFollowerList(req.body.username)
        ]).then(response => {
          // console.log("============================================");
          // console.log("SHOW MEMEMEMEME", response[4]);
          // console.log("123============================================");

          const profileData = {
            username: userData.username,
            avatar: userData.avatar,
            bio: userData.bio,
            friendship: null,
            background: userData.background,
            posts: response[0] ? response[0] : [],
            friends: {
              receivers: response[1] ? response[1] : [],
              senders: response[2] ? response[2] : []
            }, //getfriendlist function
            followings: response[3] ? response[3] : [], //getfollowers function
            followers: response[4] ? response[4] : [] // get follows function
          };

          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // ==============================TRYING TO FIGURE OUT RELATIONSHIP==================================
          // console.log("=========TRYING TO FIGURE OUT RELATIONSHIP===========");
          // let friendship;

          if (req.body.requester) {
            // console.log(
            //   "Friendship is being attempted!!!!",
            //   req.body.requester
            // );
            if (
              profileData.friends.receivers
                .map(friend => friend.username)
                .includes(req.body.requester) ||
              profileData.friends.senders
                .map(friend => friend.username)
                .includes(req.body.requester)
            ) {
              // console.log("This guy is a friend");
              profileData.friendship = "established";
              res.send(profileData);
            } else {
              // console.log("gotta check further for request status");
              if (req.body.requester === req.body.username) {
                // console.log("looking at your own now");
                profileData.friendship = "self";
                res.send(profileData);
              } else {
                // console.log(
                //   "now for this part, I gotta check for any possible pending friendship"
                // );

                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------

                let ids = { requester: null, profile: null };

                Promise.all([
                  getIdFromUsername(req.body.requester),
                  getIdFromUsername(req.body.username)
                ]).then(res1 => {
                  // console.log("res1: ", res1);
                  ids.requester = res1[0];
                  ids.profile = res1[1];
                  return pool
                    .query({
                      text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2`,
                      values: [ids.requester, ids.profile]
                    })
                    .then(res2 => res2.rows)
                    .then(res3 => {
                      // console.log("res3: ", res3);
                      if (res3.length >= 1) {
                        // console.log("friend request has already been sent!");
                        profileData.friendship = "pending";
                        res.send(profileData);
                      } else {
                        // console.log(
                        //   "Last check is to check whether friend request has come yet"
                        // );
                        pool
                          .query({
                            text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2`,
                            values: [ids.profile, ids.requester]
                          })
                          .then(res4 => res4.rows)
                          .then(res5 => {
                            // console.log("res5: ", res5);
                            if (res5.length >= 1) {
                              // console.log("receiving");
                              profileData.friendship = "received";
                              res.send(profileData);
                            } else {
                              // console.log("no friendship");
                              profileData.friendship = "none";
                              res.send(profileData);
                            }
                          });
                      }
                    });
                });

                // pool
                //   .query({
                //     text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2`,
                //     values: [req.body.requester, req.body.username]
                //   })
                //   .then(res1 => res1.rows)
                //   .then(res2 => {
                //     console.log("res2: ", res2);
                //   });

                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
                //--------------------------------------------------------------------------
              }
            }
          } else {
            // console.log("not logged in");
            // friendship = null;
            res.send(profileData);
          }

          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================
          // =================================================================================================

          // console.log("profileData", profileData);
          // console.log("in deapth", profileData.friends);
        });
      } else {
        console.log("The user does not exists!");
        res.send(null);
      }
    });

    //=======================================================
    //=======================================================
    //=======================================================
    //=======================================================
    //=======================================================
    //=======================================================

    // Promise.all([
    //   getUserProfile(req.body.username),
    //   getMessage(req.body.username)
    // ]).then(results => {
    //   // console.log("Have obtained the results!");
    //   // console.log(results[0].rows);
    //   if (results[0].rows === 0) {
    //     console.log("USER DOES NOT EXISTS!");
    //     // const profileData = {
    //     //   username: null,
    //     //   avatar: null
    //     // };
    //     res.send(null);
    //   } else {
    //     // console.log("league", results[0])
    //     const profileData = {
    //       username: results[0].username,
    //       avatar: results[0].avatar,
    //       posts: results[1]
    //     };
    //     console.log("profileData", profileData);
    //   }

    //   // const profileData = {
    //   //   id: results[0][0].id,
    //   //   avatar: results[0][0].avatar,
    //   //   posts: results[1]
    //   // };

    //   // console.log(profileData);

    //   // res.send({id : })
    // });
    // .then(res => res.rows);
  });
};

module.exports = profileServerData;
