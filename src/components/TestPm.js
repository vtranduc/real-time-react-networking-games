import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";

class Example extends React.Component {
  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Success message", "Title here");
          break;
        case "warning":
          NotificationManager.warning(
            "Warning message",
            "Close after 3000ms",
            3000
          );
          break;
        case "error":
          NotificationManager.error("Error message", "Click me!", 5000, () => {
            alert("callback");
          });
          break;
      }
    };
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-info"
          onClick={this.createNotification("info")}
        >
          Info
        </button>
        <hr />
        <button
          className="btn btn-success"
          onClick={this.createNotification("success")}
        >
          Success
        </button>
        <hr />
        <button
          className="btn btn-warning"
          onClick={this.createNotification("warning")}
        >
          Warning
        </button>
        <hr />
        <button
          className="btn btn-danger"
          onClick={this.createNotification("error")}
        >
          Error
        </button>

        <NotificationContainer />
      </div>
    );
  }
}

export default Example;

// import React, { Component } from "react";
// import { render } from "react-dom";
// import { Launcher } from "../../src";

// class Demo extends Component {
//   constructor() {
//     super();
//     this.state = {
//       messageList: messageHistory
//     };
//   }

//   _onMessageWasSent(message) {
//     this.setState({
//       messageList: [...this.state.messageList, message]
//     });
//   }

//   _sendMessage(text) {
//     if (text.length > 0) {
//       this.setState({
//         messageList: [
//           ...this.state.messageList,
//           {
//             author: "them",
//             type: "text",
//             data: { text }
//           }
//         ]
//       });
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Launcher
//           agentProfile={{
//             teamName: "react-live-chat",
//             imageUrl:
//               "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png"
//           }}
//           onMessageWasSent={this._onMessageWasSent.bind(this)}
//           messageList={this.state.messageList}
//           showEmoji
//         />
//       </div>
//     );
//   }
// }

// import React, { useEffect } from "react";
// import Pmbox from "./pmbox/Pmbox";

// export default function TestPm({ socket }) {
//   return (
//     <>
//       <h1>This is a chat message</h1>
//       <Pmbox viewer={"oblunn4"} target={"cdohms3"} socket={socket}></Pmbox>
//     </>
//   );
// }
