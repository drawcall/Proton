import ppo from "ppo";
import React from "react";
import forEach from "lodash/forEach";
import Container from "./Container.jsx";
import Title from "./Title.jsx";
import Card from "./Card.jsx";
import { ALL_EXAMPLES } from "../config/examples-conf";
import "../css/examples.css";

const COLORS = {
  Sparks: "#1e3799",
  Behaviour: "#079992",
  Game: "#fa983a",
  Renderer: "#6a89cc",
  Emitter: "#34495e",
  Zone: "#b71540"
};

const getUrl = conf => {
  if (ppo.isMobile()) {
    return conf.local || conf.url;
  }

  return conf.url || conf.local;
};

const getItemsList = () => {
  const list = [];
  let index = 0;

  forEach(ALL_EXAMPLES, (examples, keys) => {
    index++;

    list.push(
      <div
        key={keys.toLowerCase()}
        className={
          index === 1
            ? "column is-12 thumb-list first-list"
            : "column is-12 thumb-list"
        }
      >
        <Title size="2">{`< ${keys} >`}</Title>
        <div className="columns is-multiline is-variable is-5">
          {examples.map((val, i) => {
            return (
              <div key={i} className="column is-one-quarter">
                <Card
                  thumb={val.thumb}
                  title={val.thumb}
                  url={getUrl(val)}
                  color={COLORS[keys]}
                ></Card>
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return list;
};

const Page3 = () => {
  return (
    <Container>
      <div id="examples"></div>
      <Title>Examples</Title>
      <Title size={3}>
        Proton can be applied to various scenes. The following contains a
        variety of different demos.
      </Title>
      {getItemsList()}
    </Container>
  );
};

export default Page3;
