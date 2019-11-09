import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Circle extends React.Component {
  constructor(props) {
    super(props);

    this.colors = [
      "#74b9ff",
      "#e84393",
      "#6c5ce7",
      "#00b894",
      "#fdcb6e",
      "#006266",
      "#1B1464"
    ];
  }

  onCanvasInited(canvas, width, height) {
    this.createProton(canvas, width, height);
    this.renderProton();
  }

  onResize() {}

  createProton(canvas, width, height) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.rate = new Proton.Rate(20);
    emitter.damping = 0.008;

    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(30, 600));
    emitter.addInitialize(
      new Proton.Velocity(
        new Proton.Span(0.5),
        new Proton.Span(0, 360),
        "polar"
      )
    );
    emitter.addInitialize(
      new Proton.Position(
        new Proton.RectZone(0, 0, canvas.width, canvas.height)
      )
    );

    emitter.addBehaviour(
      new Proton.CrossZone(
        new Proton.RectZone(0, 0, canvas.width, canvas.height),
        "cross"
      )
    );
    emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.35, 0.55)));
    emitter.addBehaviour(new Proton.Color(this.colors, "random"));
    emitter.addBehaviour(new Proton.RandomDrift(50, 50, 0.5));

    emitter.emit("once");
    this.proton.addEmitter(emitter);

    const renderer = new Proton.CanvasRenderer(canvas);
    this.proton.addRenderer(renderer);
  }

  renderProton() {
    RAFManager.add(() => {
      this.proton.update();
      //this.proton.stats.update();
    });
  }

  render() {
    return (
      <Canvas
        globalCompositeOperation="darken"
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}
