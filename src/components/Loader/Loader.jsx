import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="sk-folding-cube">
      <div className="sk-cube1 sk-cube btn-light"></div>
      <div className="sk-cube2 sk-cube btn-light"></div>
      <div className="sk-cube4 sk-cube btn-light"></div>
      <div className="sk-cube3 sk-cube btn-light"></div>
    </div>
  );
};

export { Loader };
