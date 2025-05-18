import React from "react";
import "./Terminal.css";

const Terminal = ({ text, title }) => {
    return (
      <div className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">{title}</div>
        </div>
        <div className="terminal-content">
          {text}
        </div>
      </div>
    );
  };

export default Terminal;