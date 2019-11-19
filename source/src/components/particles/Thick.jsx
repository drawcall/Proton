import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Thick extends React.Component {
  constructor(props) {
    super(props);
    this.hue = 0;
    this.colorTemplate = `hsla(hue,80%,50%, 0.75)`;
  }

  onCanvasInited(canvas, width, height) {
    this.createProton(canvas, width, height);
    this.renderProton(canvas);
  }

  onResize(width, height) {
    this.crossZoneBehaviour.zone.width = width;
    this.crossZoneBehaviour.zone.height = height;
    this.proton.renderers[0].resize(width, height);
  }

  createProton(canvas, width, height) {
    this.proton = new Proton();

    const emitter = new Proton.Emitter();
    emitter.damping = 0.008;
    emitter.rate = new Proton.Rate(150);

    // Initialize
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(8));
    emitter.addInitialize(
      new Proton.V(new Proton.Span(0.1, 0.5), new Proton.Span(0, 360), "polar")
    );
    emitter.addInitialize(
      new Proton.Position(
        new Proton.CircleZone(canvas.width / 2, canvas.height / 2, 100)
      )
    );

    // Behaviour
    const crossZoneBehaviour = new Proton.CrossZone(
      new Proton.RectZone(0, 0, canvas.width, canvas.height),
      "cross"
    );
    emitter.addBehaviour(crossZoneBehaviour);
    this.repulsion = new Proton.Repulsion(
      {
        x: canvas.width / 2,
        y: canvas.height / 2 - 100
      },
      3,
      300
    );

    this.attraction = new Proton.Attraction(
      {
        x: canvas.width / 2,
        y: canvas.height / 2
      },
      3,
      200
    );
    emitter.addBehaviour(this.attraction, this.repulsion);
    emitter.addBehaviour(new Proton.Color("random"));
    emitter.addBehaviour(new Proton.RandomDrift(20, 15, 0.15));

    emitter.emit("once");
    this.proton.addEmitter(emitter);
    this.proton.addRenderer(this.createRenderer(canvas));
    this.crossZoneBehaviour = crossZoneBehaviour;
  }

  createRenderer(canvas) {
    const context = canvas.getContext("2d");
    const renderer = new Proton.CanvasRenderer(canvas);

    renderer.onProtonUpdate = () => {
      this.hue += 1;
      context.fillStyle = "rgba(0, 0, 0, 0.02)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    renderer.onParticleCreated = particle => {
      particle.data.begin = Proton.MathUtil.randomAToB(1, 120);
      particle.data.tha = Proton.MathUtil.randomAToB(0, Math.PI * 2);
    };

    renderer.onParticleUpdate = particle => {
      const hue = particle.data.begin + this.hue;
      particle.color = this.colorTemplate.replace("hue", hue % 360);

      const ratio = 3 / 4;
      const radius =
        particle.radius * (1 - ratio) * Math.cos((particle.data.tha += 0.01)) +
        particle.radius * ratio;

      context.beginPath();
      context.fillStyle = particle.color;
      context.arc(particle.p.x, particle.p.y, radius, 0, Math.PI * 2, true);
      context.closePath();
      context.fill();
    };

    return renderer;
  }

  renderProton(canvas) {
    let index = 0;
    RAFManager.add(() => {
      this.proton.update();
      if (index % 200 === 0) {
        this.attraction.targetPosition.x = Math.random() * canvas.width;
        this.attraction.targetPosition.y = Math.random() * canvas.height;

        this.repulsion.targetPosition.x = Math.random() * canvas.width;
        this.repulsion.targetPosition.y = Math.random() * canvas.height;
      }

      index++;
    });
  }

  render() {
    return (
      <Canvas
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}
