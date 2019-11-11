import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

const COLOR = [
  "#f6b93b",
  "#18dcff",
  "#cd84f1",
  "#ED4C67",
  "#ffffff",
  "#b71540",
  "#32ff7e",
  "#ff3838"
];

export default class Flower extends React.Component {
  constructor(props) {
    super(props);
  }

  onCanvasInited(canvas, width, height) {
    this.createProton(canvas);
    this.createEmitter({
      canvas,
      x: width / 2,
      y: height / 2,
      mainEmitter: true,
      zone: "bound"
    });
    this.renderProton();
  }

  onResize() {}

  createProton(canvas) {
    this.proton = new Proton();
    const renderer = this.createRenderer(canvas);
    this.proton.addRenderer(renderer);
  }

  createRenderer(canvas) {
    const context = canvas.getContext("2d");
    const renderer = new Proton.CustomRenderer();

    renderer.onProtonUpdate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };

    renderer.onParticleCreated = particle => {
      particle.data.count = Proton.MathUtil.randomAToB(3, 10, true);
    };

    renderer.onParticleUpdate = particle => {
      context.save();
      context.globalAlpha = particle.alpha;
      context.fillStyle = particle.color;

      context.translate(particle.p.x, particle.p.y);
      context.rotate(Proton.MathUtil.degreeTransform(particle.rotation));
      context.translate(-particle.p.x, -particle.p.y);

      context.beginPath();
      drawPolygon(particle, particle.data.count);

      context.closePath();
      context.fill();
      context.globalAlpha = 1;
      context.restore();
    };

    renderer.onParticleDead = particle => {};

    const drawPolygon = (particle, count) => {
      if (count >= 7) {
        context.arc(
          particle.p.x,
          particle.p.y,
          particle.radius,
          0,
          Math.PI * 2,
          true
        );
      } else {
        const radius = particle.radius;

        for (let i = 0; i <= count; i++) {
          let x =
            particle.p.x +
            radius * Math.cos((((Math.PI / 180) * 360) / count) * i);
          let y =
            particle.p.y +
            radius * Math.sin((((Math.PI / 180) * 360) / count) * i);

          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
      }
    };

    return renderer;
  }

  createEmitter({
    mainEmitter,
    canvas,
    x,
    y,
    radius,
    color = COLOR,
    zone = "dead",
    once = "all",
    alpha = 0.85,
    gravity = 3.5
  }) {
    const emitter = this.proton.pool.get(Proton.Emitter);

    if (!emitter.completed) {
      emitter.rate = new Proton.Rate(
        new Proton.Span(5, 8),
        new Proton.Span(1.6, 2.2)
      );

      const radiusInit = mainEmitter
        ? new Proton.Radius(10, 110)
        : new Proton.Radius(3, radius);
      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(radiusInit);
      emitter.addInitialize(new Proton.Life(3, 6));
      emitter.addInitialize(
        new Proton.Velocity(
          new Proton.Span(4, 6),
          new Proton.Span(-90, 90),
          "polar"
        )
      );

      emitter.addBehaviour(new Proton.Alpha(alpha, 0.2));
      emitter.addBehaviour(new Proton.Color(color));
      emitter.addBehaviour(new Proton.Scale(1, 0.3));
      emitter.addBehaviour(new Proton.Rotate());
      emitter.addBehaviour(new Proton.Gravity(gravity));

      emitter.addBehaviour(this.customDeadBehaviour(canvas));
      emitter.addBehaviour(
        new Proton.CrossZone(
          new Proton.RectZone(0, 0, canvas.width, canvas.height),
          zone
        )
      );
    }

    emitter.p.x = x;
    emitter.p.y = y;
    if (once === "once") emitter.emit("once");
    else emitter.emit();

    this.proton.addEmitter(emitter);
    //this.expireEmitter(emitter);
  }

  expireEmitter(emitter) {
    setTimeout(() => {
      emitter.completed = true;
      this.proton.pool.expire(emitter);
      this.proton.removeEmitter(emitter);
    }, 500);
  }

  customDeadBehaviour(canvas) {
    return {
      initialize: particle => {
        particle.data = particle.data || {};
        particle.data.oldRadius = particle.radius;
        particle.data.emitterCount = 0;
      },
      applyBehaviour: particle => {
        if (particle.radius < 5) return;
        if (particle.data.emitterCount >= 2) return;

        if (particle.radius <= (1 / 3) * particle.data.oldRadius) {
          particle.data.emitterCount++;
          this.createEmitter({
            canvas,
            x: particle.p.x,
            y: particle.p.y,
            radius: particle.radius * (1 / 2),
            alpha: 0.5,
            gravity: 5,
            color: particle.color,
            once: "once"
          });
        }
      }
    };
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
        globalCompositeOperation="darker"
        onCanvasInited={this.onCanvasInited.bind(this)}
        onResize={this.onResize.bind(this)}
      />
    );
  }
}
