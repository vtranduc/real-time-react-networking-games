import React, { useEffect, useState } from "react";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from "react-chat-widget";

import "react-chat-widget/lib/styles.css";

// import logo from "./logo.svg";

export default function Pmbox({ viewer, target, socket }) {
  //  const addResponseMessage = function() {
  //    console.log("what do i do")
  //  }
  // use

  const [targetProfile, setTargetProfile] = useState(null);

  useEffect(() => {
    console.log("Good morning");
    socket.emit("pmRetrieveChat", { viewer, target });
    // socket.on("pmCatchPastMsg", data => {
    //   console.log("GOT THE DATA");
    //   console.log(data);
    // });

    const handlePmCatchMsg = function(data) {
      // console.log("have caught the msg");
      console.log(data);
      for (let msgItem of data.msgData) {
        if (msgItem.viewer_wrote) {
          addUserMessage(msgItem.msg);
        } else {
          addResponseMessage(msgItem.msg);
        }
      }
      setTargetProfile({
        username: data.targetData.username,
        avatar: data.targetData.avatar
      });
    };
    socket.on("pmCatchPastMsg", handlePmCatchMsg);
    // });
    // console.log("adding more message");
    // setInterval(() => {
    //   console.log("logging something");
    //   addResponseMessage("5 seconds");
    // }, 5000);
    // setInterval(() => {
    //   console.log("hello");
    //   addUserMessage("1 second");
    // }, 1000);
    return () => {
      socket.removeListener("pmCatchPastMsg", handlePmCatchMsg);
    };
  }, []);
  return (
    // <div className="App">
    //   <Widget handleNewUserMessage={this.handleNewUserMessage} />
    // </div>
    <div>
      {targetProfile && (
        <Widget
          title={targetProfile.username}
          titleAvatar={targetProfile.avatar}
          profileAvatar={targetProfile.avatar}
          subtitle={`Welcome to chat, ${viewer}`}
          handleNewUserMessage={msg => {
            // console.log("kanaetai", msg);
            socket.emit("pmHandleNewUserMessage", { viewer, target, msg });
          }}
          // // handleNewUserMessage={this.handleNewUserMessage}
          // handleNewUserMessage={e => {
          //   console.log("hello", e);
          //   // addResponseMessage(response);
          // }}
          // // profileAvatar={logo}
          // title="Name"
          // // subtitle="And my cool subtitle"
          // titleAvatar={
          //   "https://fsmedia.imgix.net/07/05/10/11/b2e4/4575/937c/7b9a134d6ae4/5pikachu-1gif.gif?rect=0%2C0%2C1000%2C500&auto=compress&dpr=2&w=650&fm=jpg"
          // }
        />
      )}
    </div>
  );
}
