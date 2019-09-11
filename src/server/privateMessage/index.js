const { getIdFromUsername } = require("../../../db/queries/allQueries");
const privateMessage = function(socket, sockets, io, pool) {
  // console.log("starting the socket for pm");

  socket.on("pmRetrieveChat", data => {
    // console.log("start chat retrieveing process", data);
    let viewerId;
    Promise.all([
      getIdFromUsername(data.viewer),
      getIdFromUsername(data.target)
    ])
      .then(res1 => {
        // console.log("res1: ", res1);
        viewerId = res1[0];
        return Promise.all([
          pool.query({
            text: `SELECT sender_id, sent_message, time_of_post FROM private_message WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1) ORDER BY time_of_post ASC`,
            values: res1
          }),
          pool.query({
            text: `SELECT username, avatar FROM users WHERE username = $1`,
            values: [data.target]
          })
        ]);
      })
      .then(res2 => {
        // console.log("first", res2[0].rows);

        io.to(socket.id).emit("pmCatchPastMsg", {
          targetData: res2[1].rows[0],
          msgData: res2[0].rows.map(e => {
            return {
              msg: e.sent_message,
              time_of_post: e.time_of_post,
              viewer_wrote: e.sender_id === viewerId
            };
          })
        });
      });
  });

  socket.on("pmHandleNewUserMessage", data => {
    console.log("got it on the server yo", data);
    Promise.all([
      getIdFromUsername(data.viewer),
      getIdFromUsername(data.target)
    ])
      .then(res1 => {
        console.log("res1: ", res1);
        return pool.query({
          text: `INSERT INTO private_message(sender_id, receiver_id, sent_message) VALUES($1, $2, $3)`,
          values: [res1[0], res1[1], data.msg]
        });
      })
      .then(() => {
        console.log("successful insert?");
      });
  });
};

module.exports = privateMessage;
