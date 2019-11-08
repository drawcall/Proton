import React from "react";
import ppo from "ppo";
import { AniX } from "anix";
import "../css/card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.textRef = React.createRef();
    this.thumbRef = React.createRef();
    this.detailsRef = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  componentDidMount() {
    if (ppo.isMobile()) {
      this.detailsRef.current.style.opacity = 0.8;
      this.detailsRef.current.style.bottom = "-60px";
    }
  }

  handleMouseEnter(e) {
    if (ppo.isMobile()) return;

    AniX.to(this.thumbRef.current, 0.5, {
      y: -20,
      ease: AniX.ease.easeOutCirc
    });

    AniX.fromTo(
      this.textRef.current,
      0.4,
      {
        y: -50
      },
      {
        y: 0,
        delay: 0.2,
        ease: AniX.ease.easeOutBack
      }
    );

    AniX.to(this.detailsRef.current, 0.5, {
      y: -50,
      ease: AniX.ease.easeOutBack
    });
  }

  handleMouseLeave(e) {
    if (ppo.isMobile()) return;

    AniX.to(this.thumbRef.current, 0.3, {
      y: 0
    });

    AniX.to(this.detailsRef.current, 0.4, {
      y: 0
    });
  }

  render() {
    return (
      <a target={ppo.isMobile() ? "_self" : "_blank"} href={this.props.url}>
        <div
          className="card-con box-shadow"
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <div
            className="thumb"
            ref={this.thumbRef}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/images/examples/${this.props.thumb}.jpg)`
            }}
          ></div>

          <div
            className="details"
            ref={this.detailsRef}
            style={{ backgroundColor: this.props.color }}
          >
            <div ref={this.textRef}>{this.props.title.toUpperCase()}</div>
          </div>
        </div>
      </a>
    );
  }
}

export default Card;
