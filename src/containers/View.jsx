// import logo from "./logo.svg";
import React from "react";
import Home from "./home";

const View = () => {
  return (
    <div className="App">
      <header className="header">
        <h4 style={{ marginInline: 10 }}>Movies list</h4>
      </header>
      <div className="contentAndFooter">
        <div className="content">
          <Home />
        </div>
        <div className="footer">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginLeft: "5%",
            }}
          >
            <h4>Author : Vijaya Srikar PORALLA</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
