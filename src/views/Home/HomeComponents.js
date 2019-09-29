import React from "react";
import { NavLink } from "react-router-dom";
import "./home.css";
import { Button } from "@chakra-ui/core";

export const Header = () => {
  return (
    <div className="header-container">
      <nav>
        <div>
          <NavLink to="/login">Login</NavLink>
        </div>
        <div>
          <NavLink to="/signup">Signup</NavLink>
        </div>
      </nav>
      <div className="header-content">
        <h2 className="game-title">Wordy!</h2>
        <div className="play-btn-div">
        <NavLink to="/game/sample">
          <Button
          size="md"
          height="48px"
          width="200px"
          border="2px"
          fontSize="2em"
          borderRadius="20px"
          >
          Play
        </Button>
        </NavLink>
        </div>
      </div>
    </div>
  );
};
