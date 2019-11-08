import React from "react";
import RAFManager from "raf-manager";
import { Waypoint } from "react-waypoint";
import "../../css/canvas.css";

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.initCanvas();
      this.resize = this.resize.bind(this);
      window.addEventListener("resize", this.resize);
    }, 80);
  }

  initCanvas() {
    const canvas = this.canvasRef.current;
    if (this.props.globalCompositeOperation) {
      const context = canvas.getContext("2d");
      context.globalCompositeOperation = this.props.globalCompositeOperation;
    }

    const { width, height } = this.setCanvasSize(canvas);
    this.props.onCanvasInited(canvas, width, height);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  resize() {
    const canvas = this.canvasRef.current;
    const { width, height } = this.setCanvasSize(canvas);
    this.props.onResize && this.props.onResize(width, height);
  }

  setCanvasSize(canvas) {
    const width = this.canvasRef.current.clientWidth;
    const height = this.canvasRef.current.clientHeight;
    canvas.width = width;
    canvas.height = height;
    
    return { width, height };
  }

  handleWaypointEnter() {
    RAFManager.start();
  }

  handleWaypointLeave() {
    RAFManager.stop();
  }

  render() {
    return (
      <Waypoint
        onEnter={this.handleWaypointEnter}
        onLeave={this.handleWaypointLeave}
      >
        <div className="hero-video">
          <canvas ref={this.canvasRef} className="canvas" />
        </div>
      </Waypoint>
    );
  }
}
