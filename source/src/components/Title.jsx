import React from "react";
import Line from "./Line.jsx";
import "../css/title.css";

const getHt = props => {
  switch (parseInt(props.size)) {
    case 1:
      return (
        <h1 className="h1 has-text-centered section-title">{props.children}</h1>
      );

    case 2:
      return (
        <h2 className="h2 has-text-centered section-title">{props.children}</h2>
      );

    case 3:
      return (
        <h3 className="h3 has-text-centered section-title">{props.children}</h3>
      );

    case 4:
      return (
        <h4 className="h4 has-text-centered section-title">{props.children}</h4>
      );

    case 5:
      return (
        <h5 className="h5 has-text-centered section-title">{props.children}</h5>
      );

    default:
      return (
        <h1 className="h1 has-text-centered section-title">{props.children}</h1>
      );
  }
};

const getLine = props => {
  if (props.size === 1 || props.size === undefined) {
    return <Line />;
  } else if (props.size === 2) {
    // return <Line width={250} height={1} />
  }

  return null;
};

const Title = props => {
  return (
    <div className="column is-12">
      {getHt(props)}
      {getLine(props)}
    </div>
  );
};

export default Title;
