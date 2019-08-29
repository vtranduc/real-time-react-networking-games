import React from "react";
import { red } from "@material-ui/core/colors";
// import { View, Text } from "react-native";
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/lobby">
          <li>Game</li>
        </Link>
        <Link to="/soccer">
          <li>Soccer</li>
        </Link>
      </ul>
    </nav>
  );
};

export default nav;
