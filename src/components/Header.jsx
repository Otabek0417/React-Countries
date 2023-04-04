import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdLightMode, MdDarkMode } from "react-icons/md";

function Header({ setMode, mode }) {
  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="logo">
          <Link className="logo-text" to="/">
            Where in the world?
          </Link>
        </div>
        <div
          className="mode-toggle"
          onClick={() => {
            setMode((prev) => !prev);
          }}
        >
          {mode === true ? (
            <MdLightMode className="mode-icon" />
          ) : (
            <MdDarkMode className="mode-icon" />
          )}

          <span className="mode-text">
            Mode {mode === true ? "Light" : "Dark"}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
