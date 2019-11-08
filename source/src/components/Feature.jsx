import React from "react";
import { AniX } from "anix";
import "../css/feature.css";

class Feature extends React.Component {
  constructor(props) {
    super(props);

    this.iconRef = React.createRef();
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter(e) {
    AniX.to(this.iconRef.current, 0.4, {
      scaleX: 1.2,
      scaleY: 1.2,
      ease: AniX.ease.easeOutSine
    });
  }

  handleMouseLeave(e) {
    AniX.to(this.iconRef.current, 0.3, {
      scaleX: 1,
      scaleY: 1
    });
  }

  render() {
    const { data } = this.props;

    return (
      <div
        className="card is-shady feature"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="feature-img card-image has-text-centered">
          <img className="feature-icon" ref={this.iconRef} src={data.icon} />
        </div>
        <div className="card-content">
          <div className="content">
            <h3 style={{ textAlign: "center" }}>{data.title}</h3>
            <p className="feature-message">{data.message}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Feature;
