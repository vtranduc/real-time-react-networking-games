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

const userProfileServerSocket = function(socket, sockets, io, pool) {
  // console.log("preparing socket for user profile page!");

  socket.on("userPostWall", data => {
    // console.log("posting something", data);
    Promise.all([
      getIdFromUsername(data.sender_username),
      getIdFromUsername(data.receiver_username)
    ])
      .then(res => {
        // console.log("doki doki");
        // console.log(res);
        return pool.query({
          text: `INSERT INTO user_posts(sender_id, receiver_id, message_title,sent_message) VALUES($1, $2, $3, $4)`,
          values: [res[0], res[1], data.message_title, data.sent_message]
        });
      })
      .then(() => {
        // console.log("HAVE INSERTED INTO DATABASE!!!!!!");
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userFollow", data => {
    // console.log("start following chain reaction", data);

    Promise.all([
      getIdFromUsername(data.follower),
      getIdFromUsername(data.followed)
    ])
      .then(res1 => {
        // console.log("res1: ", res1);
        return pool.query({
          text: `SELECT id FROM follow WHERE user_id = $1 AND follow_id = $2`,
          values: [res1[0], res1[1]]
        });
      })
      .then(res2 => res2.rows)
      .then(res3 => {
        // console.log("res3: ", res3);
        if (res3.length > 0) {
          return null;
        } else {
          return Promise.all([
            getIdFromUsername(data.follower),
            getIdFromUsername(data.followed)
          ]);
        }
      })
      .then(res4 => {
        // console.log("res4: ", res4);
        if (res4) {
          return pool.query({
            text: `INSERT INTO follow(user_id, follow_id) VALUES($1, $2)`,
            values: [res4[0], res4[1]]
          });
        } else {
          return null;
        }
      })
      .then(() => {
        // if (res5) {
        io.to(socket.id).emit("profileReload");
        // }
      });
  });

  socket.on("profileAddFriend", data => {
    // THIS SHALL ALSO HANDLE FRIENDSHIP ESTABLISHMENTS!
    // console.log("add friend has reached server!", data);
    let ids = { sender: null, receiver: null };
    Promise.all([
      getIdFromUsername(data.sender),
      getIdFromUsername(data.receiver)
    ]).then(res1 => {
      // console.log("res1: ", res1);
      ids.sender = res1[0];
      ids.receiver = res1[1];
      // console.log("ids: ", ids);
      return pool
        .query({
          text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2`,
          values: [ids.sender, ids.receiver]
        })
        .then(res2 => res2.rows)
        .then(res3 => {
          // console.log("res3: ", res3);
          if (res3.length > 0) {
            return null;
          } else {
            // console.log("ok let us check the next one");
            return pool.query({
              text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2`,
              values: [ids.receiver, ids.sender]
            });
          }
        })
        .then(res4 => (res4 ? res4.rows : null))
        .then(res5 => {
          // console.log("res5: ", res5);
          if (res5) {
            // console.log("kikoeru");
            if (res5.length > 0) {
              // query to make friendship true
              return pool.query({
                text: `UPDATE friendship SET request_status = TRUE where user_id = $1 AND receiver_id = $2`,
                values: [ids.receiver, ids.sender]
              });
            } else {
              // initialize friendship with false
              return pool.query({
                text: `INSERT INTO friendship(user_id, receiver_id, request_status) VALUES($1, $2, $3)`,
                values: [ids.sender, ids.receiver, false]
              });
            }
          } else {
            return null;
          }
        })
        .then(() => {
          // console.log("tell user to reload");
          io.to(socket.id).emit("profileReload");
        });
    });
  });

  socket.on("userUnfollow", data => {
    // console.log("unfollow has reached the server");
    // pool.query({ text: ``, values: [] });
    Promise.all([
      getIdFromUsername(data.sender),
      getIdFromUsername(data.unfollowed)
    ])
      .then(res1 => {
        // console.log("res1: ", res1);
        return pool.query({
          text: `SELECT id FROM follow WHERE user_id = $1 AND follow_id = $2`,
          values: [res1[0], res1[1]]
        });
      })
      .then(res2 => res2.rows)
      .then(res3 => {
        // console.log("res3: ", res3);
        if (res3.length >= 1) {
          // console.log("deleting");
          return pool.query({
            text: `DELETE FROM follow WHERE id = $1`,
            values: [res3[0].id]
          });
        } else {
          return null;
        }
      })
      .then(() => {
        // console.log("DONE!");
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userRemoveFriend", data => {
    // console.log("removing friend on the server");
    Promise.all([
      getIdFromUsername(data.remover),
      getIdFromUsername(data.removed)
    ]).then(res1 => {
      // console.log("res1: ", res1);
      return Promise.all([
        pool.query({
          text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2 AND request_status = TRUE`,
          values: [res1[0], res1[1]]
        }),
        pool.query({
          text: `SELECT id FROM friendship WHERE user_id = $1 AND receiver_id = $2 AND request_status = TRUE`,
          values: [res1[1], res1[0]]
        })
      ])
        .then(res2 =>
          res2[0].rows.length >= 1 ? res2[0].rows[0].id : res2[1].rows[0].id
        )
        .then(res3 => {
          return pool.query({
            text: `DELETE FROM friendship WHERE id = $1`,
            values: [res3]
          });
        })
        .then(() => {
          io.to(socket.id).emit("profileReload");
        });
    });
  });

  socket.on("userCancelRequest", data => {
    // console.log("SERVER", data);
    Promise.all([
      getIdFromUsername(data.canceller),
      getIdFromUsername(data.cancelled)
    ])
      .then(res1 => {
        // console.log(res1);
        return pool.query({
          text: `DELETE FROM friendship WHERE user_id = $1 AND receiver_id = $2 AND request_status = FALSE`,
          values: res1
        });
      })
      .then(() => {
        // console.log("have canceled!");
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userDeclineRequest", data => {
    // console.log("declining on the server"); /////// WHERE I LEFT OFF--------------------

    Promise.all([
      getIdFromUsername(data.denier),
      getIdFromUsername(data.denied)
    ])
      .then(res1 => {
        // console.log("res1: ", res1);
        return pool.query({
          text: `DELETE FROM friendship WHERE user_id = $1 AND receiver_id = $2 AND request_status = FALSE`,
          values: [res1[1], res1[0]]
        });
      })
      .then(() => {
        // console.log("shoot!");
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userAcceptRequest", data => {
    // console.log("accepting reached server");
    Promise.all([
      getIdFromUsername(data.accepter),
      getIdFromUsername(data.sender)
    ])
      .then(res1 => {
        // console.log("res1: ", res1);
        return pool.query({
          text: `UPDATE friendship SET request_status = TRUE WHERE user_id = $1 AND receiver_id = $2`,
          values: [res1[1], res1[0]]
        });
      })
      .then(res2 => {
        // console.log("shoot");
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userEditProfile", data => {
    // console.log("edition has reached the server");
    getIdFromUsername(data.username)
      .then(res1 => {
        // console.log("res1: ", res1);
        return pool.query({
          text: `UPDATE users SET avatar = $1, background = $2, bio = $3 WHERE id = $4`,
          values: [data.avatar, data.background, data.bio, res1]
        });
      })
      .then(() => {
        io.to(socket.id).emit("profileReload");
      });
  });

  socket.on("userDeletePost", data => {
    console.log("deletion on server");
  });
};

module.exports = userProfileServerSocket;
