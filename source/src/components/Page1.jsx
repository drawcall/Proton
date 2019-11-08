import React from "react";
import Title from "./Title.jsx";
import Feature from "./Feature.jsx";
import Container from "./Container.jsx";
import FEATURES_CONF from "../config/features-conf";

function Page1() {
  return (
    <Container dark={false}>
      <Title>Features</Title>

      <div className="column is-12">
        <div className="columns">
          {FEATURES_CONF.map((data, i) => {
            return (
              <div key={i} className="column is-4">
                <Feature data={data}></Feature>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}

export default Page1;
