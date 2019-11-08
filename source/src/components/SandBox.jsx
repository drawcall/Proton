import React from "react";
import "../css/header.css";

export default function SandBox() {
  return (
    <iframe
      src="https://codesandbox.io/embed/proton-emitter-h2y9z?fontsize=14&hidenavigation=1"
      style={{
        width: "100%",
        height: 380,
        border: 0,
        borderRadius: 4,
        overflow: "hidden"
      }}
      title="proton-emitter"
      allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
    />
  );
}
