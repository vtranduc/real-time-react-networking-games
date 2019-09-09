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
  getFollowerList
} = require("../../../db/queries/allQueries");

const userProfileServerSocket = function(socket, sockets, io) {
  console.log("preparing socket for user profile page!");
};

module.exports = userProfileServerSocket;
