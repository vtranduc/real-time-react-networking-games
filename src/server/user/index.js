const {
  getMessage,
  getUserData,
  postMessage,
  getUserProfile,
  createUser,
  getFriendList,
  getFriendReceiverList
} = require("../../../db/queries/allQueries");

const profileServerData = function(app, pool) {
  // console.log("hug hug mog mog sugar less");
  // app.get("/getmessages/:username", (req, res) => {
  //   getMessage(req.params.username).then(data => {
  //     res.send(data);
  //   });
  // });

  app.post("/postmessage", (req, res) => {
    let sender = req.body.sender;
    let reciever = req.body.reciever;
    let title = req.body.title;
    let message = req.body.message;
    console.log(sender, "jzizzless");
    postMessage(sender, reciever, title, message);
  });

  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================
  //=======================================================

  app.post("/retrieveuserprofile", (req, res) => {
    console.log("I am looking for: ", req.body);

    getUserProfile(req.body.username).then(userData => {
      console.log("hello peon bow to me", userData);
      if (userData) {
        Promise.all([
          getMessage(req.body.username),
          // getFriendList(req.body.username),
          getFriendReceiverList(req.body.username)
        ]).then(response => {
          console.log("============================================");
          console.log("SHOW MEMEMEMEME", response[1]);
          console.log("123============================================");

          // const profileData = {
          //   username: userData.username,
          //   avatar: userData.avatar,
          //   posts: response[0],
          //   friends: [], //getfriendlist function
          //   followings: [], //getfollowers function
          //   followers: [] // get follows function
          // };
          // console.log("profileData", profileData);
          // res.send(profileData);
        });
      } else {
        // console.log("The user does not exists!");
        // res.send(null);
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
