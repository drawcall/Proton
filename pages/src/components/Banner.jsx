import ppo from "ppo";
import React from "react";
import Fountain from "./particles/Fountain.jsx";
import Cobweb from "./particles/Cobweb.jsx";
import Flower from "./particles/Flower.jsx";
import Color from "./particles/Color.jsx";
import Circle from "./particles/Circle.jsx";
import Mlines from "./particles/Mlines.jsx";
import Lines from "./particles/Lines.jsx";
import Ball from "./particles/Ball.jsx";
import Rand from "../utils/Rand.js";

import macbook from "../assets/images/banner/macbook.png";
import banner from "../assets/images/banner/banner1.jpg";
import "../css/banner.css";

class Banner extends React.Component {
  constructor(props) {
    super(props);

    this.rand = new Rand();
    this.rand.set(1110.3, <Color />);
    this.rand.set(0.2, <Ball />);
    this.rand.set(0.2, <Lines />);
    this.rand.set(0.15, <Mlines />);
    this.rand.set(0.15, <Circle />);
    this.rand.set(0.04, <Cobweb />);
    this.rand.set(0.08, <Flower />);
    this.rand.set(0.15, <Fountain />);
  }

  handlerClick(type) {
    if (type === "GITHUB") {
      ppo.open("https://github.com/a-jie/Proton");
    } else {
      window.location.href = "#examples";
    }
  }

  isNarrow() {
    const width = document.getElementById("root").offsetWidth;

    if (width < 760 || ppo.isMobile()) return true;
    else return false;
  }

  getStyle() {
    return this.isNarrow()
      ? {
          background: `url(${banner}) repeat-x transparent`,
          backgroundPosition: "0% 50%",
          backgroundSize: "cover"
        }
      : null;
  }

  getBgParticles() {
    const P = this.rand.getResult();
    return this.isNarrow() ? null : P;
  }

  render() {
    const style = this.getStyle();
    const particles = this.getBgParticles();

    return (
      <section style={style} className="hero is-info is-medium banner-con">
        {particles}
        <div className="hero-body">
          <div className="container is-0 has-text-centered">
            <div className="columns">
              <div className="column is-8">
                <img src={macbook} />
              </div>

              <div className="column digital is-4">
                <div className="t1">Proton</div>
                <div className="t2">Javascript particle animation engine</div>
                <div className="buttons">
                  <button
                    className="button is-light"
                    onClick={this.handlerClick.bind(this, "EXAMPLES")}
                  >
                    EXAMPLES
                  </button>
                  <button
                    className="button is-light"
                    onClick={this.handlerClick.bind(this, "GITHUB")}
                  >
                    GITHUB
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Banner;
