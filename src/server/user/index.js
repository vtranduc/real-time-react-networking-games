const {
  getMessage,
  getUserData,
  postMessage,
  getUserProfile,
  createUser
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

  app.post("/retrieveuserprofile", (req, res) => {
    console.log("I am looking for: ", req.body);

    Promise.all([
      pool.query({
        text: `SELECT id, username, avatar FROM users WHERE username = $1`,
        values: [req.body.username]
      }),
      pool.query({
        text: `SELECT * FROM user_posts JOIN users ON users.id = user_posts.reciever_id WHERE users.username = $1`,
        values: [req.body.username]
      })
    ]).then(results => {
      // console.log("Have obtained the results!");
      // console.log(results[0].rows);
      if (results[0].rows === 0) {
        console.log("USER DOES NOT EXISTS!");
        // const profileData = {
        //   username: null,
        //   avatar: null
        // };
        res.send(null);
      } else {
        console.log("getting the user");
        console.log(results[0].rows);
        const profileData = {
          username: results[0].rows[0].username,
          avatar: results[0].rows[0].username
        };
        console.log("car coming!: ", profileData);
        console.log("how am I?: ", results[1].rows[0]);
        res.send(profileData);
      }
    });
    // .then(res => res.rows);
  });
};

module.exports = profileServerData;
