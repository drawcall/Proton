import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

const COLOR = ["#FDA7DF", "#4cd137", "#FFC312", "#ED4C67", "#ffffff", "#FDA7DF"];

export default class Flower extends React.Component {
    constructor(props) {
        super(props);
    }

    onCanvasInited(canvas, width, height) {
        this.createProton(canvas);
        this.createEmitter({
            canvas,
            x: width / 2, y: height / 2,
            mainEmitter: true,
            zone: "bound"
        });
        this.renderProton();
    }

    onResize() { }

    createProton(canvas) {
        this.proton = new Proton();

        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);
        // renderer.onProtonUpdate = () => {
        //     context.fillStyle = "rgba(0, 122, 197, 0.2)";
        //     context.fillRect(0, 0, canvas.width, canvas.height + 100);
        // };
        this.proton.addRenderer(renderer);
    }

    createEmitter({
        mainEmitter, canvas, x, y, radius, color = COLOR,
        zone = "dead", once = "all", alpha = 0.8, gravity = 3.5
    }) {
        const emitter = this.proton.pool.get(Proton.Emitter);

        if (!emitter.completed) {
            emitter.rate = new Proton.Rate(new Proton.Span(4, 6), new Proton.Span(1.6, 2.2));

            const radiusInit = mainEmitter ? new Proton.Radius(10, 110) : new Proton.Radius(radius);
            emitter.addInitialize(new Proton.Mass(1));
            emitter.addInitialize(radiusInit);
            emitter.addInitialize(new Proton.Life(3, 6));
            emitter.addInitialize(new Proton.Velocity(new Proton.Span(4, 6), new Proton.Span(-90, 90), 'polar'));

            emitter.addBehaviour(new Proton.Alpha(alpha, 0.1));
            emitter.addBehaviour(new Proton.Color(color));
            emitter.addBehaviour(new Proton.Scale(1, .3));
            emitter.addBehaviour(new Proton.Gravity(gravity));

            emitter.addBehaviour(this.customDeadBehaviour(canvas));
            emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), zone));
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
            initialize: (particle) => {
                particle.data = particle.data || {};
                particle.data.oldRadius = particle.radius;
                particle.data.emitterCount = 0;
            },
            applyBehaviour: (particle) => {
                if (particle.radius < 5) return;
                if (particle.data.emitterCount >= 2) return;

                if (particle.radius <= (1 / 3) * particle.data.oldRadius) {
                    particle.data.emitterCount++;
                    this.createEmitter({
                        canvas,
                        x: particle.p.x, y: particle.p.y,
                        radius: particle.radius * (1 / 2),
                        alpha: 0.5, gravity : 5,
                        color: particle.color, once: "once"
                    });
                }
            }
        }
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
