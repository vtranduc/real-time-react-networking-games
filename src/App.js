import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav";
import Lobby from "./components/Lobby";
import About from "./components/About";
import Soccer from "./components/soccer/Soccer";

import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import io from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { Socket } from "net";
const serverPORT = 3001;

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "block"
  }
}));

// let socket;
function App() {
  let socket = io(`:${serverPORT}`);
  console.log("initializing app");
  // const classes = useStyles();
  // if (!socket) {
  //   console.log("initializing socket.io from client");
  //   socket = io(`:${serverPORT}`);NavBar />
  // <Button variant="contained" className={classes.button}>
  //   Hello gaafasfd
  // </Button>;
  // }

  return (
    <Router>
      <NavBar />
      {/* <Button variant="contained" claNavBar />
        Hello gaafasfd
      </Button> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/lobby" exact component={Lobby} />
        <Route
          path="/soccer"
          exact
          render={() => {
            return <Soccer socket={socket} />;
          }}
        />
      </Switch>
    </Router>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
