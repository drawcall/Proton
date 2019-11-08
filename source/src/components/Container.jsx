import React from "react";
import "../css/container.css";

export default function Container(props) {
  return (
    <section
      className={
        props.dark ? "dark section box-container" : "section box-container"
      }
    >
      <div className="container">
        <div className="columns is-multiline">{props.children}</div>
      </div>
    </section>
  );
}
