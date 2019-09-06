import React, { useEffect, useState } from "react";
import "../../styles/chatBubble.css";

export default function World({ socket }) {
  return (
    <div className="speech-buble-wrapper">
      <div className="speech-bubble">
        <p>This is supposed to be a bubble</p>
      </div>
    </div>
  );
}
