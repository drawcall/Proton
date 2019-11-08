import React from "react";
import "../css/line.css";

function Line(props) {
  const width = props.width || 40;
  const height = props.height || 2;

  return <div className="short-line" style={{ width, height }}></div>;
}

export default Line;
