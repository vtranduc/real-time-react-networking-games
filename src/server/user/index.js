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

  app.post("retrieveuserprofile", (req, res) => {
    console.log("I am looking for: ", req.body);
  });
};

module.exports = profileServerData;
