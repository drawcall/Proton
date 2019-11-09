import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Mlines extends React.Component {
  constructor(props) {
    super(props);
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
    emitter.rate = new Proton.Rate(250);
    emitter.addInitialize(new Proton.Mass(1));
    emitter.addInitialize(new Proton.Radius(4));
    emitter.addInitialize(
      new Proton.Velocity(new Proton.Span(3), new Proton.Span(-45, 45), "polar")
    );

    const crossZoneBehaviour = new Proton.CrossZone(
      new Proton.RectZone(0, 0, canvas.width, canvas.height),
      "cross"
    );
    emitter.addBehaviour(new Proton.Color("random"));
    emitter.addBehaviour(crossZoneBehaviour);
    emitter.addBehaviour(new Proton.RandomDrift(15, 15, 0.15));

    this.repulsion = new Proton.Repulsion(
      {
        x: canvas.width / 2,
        y: canvas.height / 2 - 100
      },
      15,
      300
    );

    this.attraction = new Proton.Attraction(
      {
        x: canvas.width / 2,
        y: canvas.height / 2
      },
      20,
      200
    );
    emitter.addBehaviour(this.attraction, this.repulsion);

    emitter.p.x = canvas.width / 2;
    emitter.p.y = canvas.height - 50;
    emitter.emit("once");

    this.proton.addEmitter(emitter);
    this.proton.addRenderer(this.createRenderer(canvas));
    this.crossZoneBehaviour = crossZoneBehaviour;
  }

  createRenderer(canvas) {
    const context = canvas.getContext("2d");
    const renderer = new Proton.CanvasRenderer(canvas);
    renderer.onProtonUpdate = function() {
      context.fillStyle = "rgba(0, 0, 0, 0.02)";
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    renderer.onParticleUpdate = function(particle) {
      context.beginPath();
      context.strokeStyle = particle.color;
      context.lineWidth = 1;
      context.moveTo(particle.old.p.x, particle.old.p.y);
      context.lineTo(particle.p.x, particle.p.y);
      context.closePath();
      context.stroke();
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
        globalCompositeOperation="darken"
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}
