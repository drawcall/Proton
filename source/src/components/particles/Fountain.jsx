import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Fountain extends React.Component {
    constructor(props) {
        super(props);

        this.colors = [
            "#529B88",
            "#CDD180",
            "#FFFA32",
            "#FB6255",
            "#FB4A53",
            "#FF4E50",
            "#F9D423"
        ];
    }

    onCanvasInited(canvas, width, height) {
        this.createProton(canvas, width, height);
        this.renderProton();
    }

    onResize() { }

    createProton(canvas, width, height) {
        this.proton = new Proton();
        const emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(
            new Proton.Span(4, 8),
            new Proton.Span(0.1, 0.25)
        );

        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(20, 200));
        emitter.addInitialize(new Proton.Life(2, 4));
        emitter.addInitialize(new Proton.Velocity(new Proton.Span(4, 7), new Proton.Span(0, 360), 'polar'));
        emitter.addInitialize(
            new Proton.Position(new Proton.CircleZone(width / 2, height / 2, 100))
        );

        emitter.addBehaviour(new Proton.Alpha(1, 0));
        emitter.addBehaviour(new Proton.Scale(0.2, 1));
        emitter.addBehaviour(this.createCustomBehaviour());
        emitter.addBehaviour(new Proton.Color(this.colors, "random"));
        emitter.emit();
        this.proton.addEmitter(emitter);

        const renderer = new Proton.CanvasRenderer(canvas);
        this.proton.addRenderer(renderer);
    }

    createCustomBehaviour() {
        const f = 10 * 100;
        return {
            initialize: function (particle) {
                particle.f = new Proton.Vector2D(0, 0);
            },
            applyBehaviour: (particle) => {
                let length = particle.v.length() / 1000;
                let gradient = particle.v.getGradient();
                gradient += 3.14 / 2;

                particle.f.x = f * length * Math.cos(gradient);
                particle.f.y = f * length * Math.sin(gradient);
                particle.a.add(particle.f);
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
                globalCompositeOperation="xor"
                onCanvasInited={this.onCanvasInited.bind(this)}
                onResize={this.onResize.bind(this)}
            />
        );
    }
}
