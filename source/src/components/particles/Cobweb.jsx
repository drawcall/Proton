import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Cobweb extends React.Component {
    constructor(props) {
        super(props);
    }

    onCanvasInited(canvas, width, height) {
        this.createProton(canvas, width, height);
        this.renderProton();
    }

    onResize() { }

    createProton(canvas, width, height) {
        this.proton = new Proton();

        const emitter = new Proton.Emitter();
        emitter.rate = new Proton.Rate(new Proton.Span(100), new Proton.Span(.05, .2));

        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(1, 4));
        emitter.addInitialize(new Proton.Life(Infinity));

        const pointZone = new Proton.Position(new Proton.RectZone(0, 0, width, height));
        emitter.addInitialize(pointZone);
        emitter.addInitialize(new Proton.Velocity(new Proton.Span(.3, .6), new Proton.Span(0, 360), 'polar'));

        emitter.addBehaviour(new Proton.Alpha(Proton.getSpan(0.2, .9)));
        emitter.addBehaviour(new Proton.Color('#ffffff'));
        emitter.addBehaviour(new Proton.CrossZone(new Proton.RectZone(0, 0, width, height), 'cross'));

        emitter.emit('once');
        emitter.damping = 0;
        this.proton.addEmitter(emitter);
        this.proton.addRenderer(this.createRenderer(canvas, emitter));
    }

    createRenderer(canvas, emitter) {
        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);
        const R = 140;

        renderer.onProtonUpdateAfter = function () {
            let particles = emitter.particles;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let pA = particles[i];
                    let pB = particles[j];
                    let dis = pA.p.distanceTo(pB.p);

                    if (dis < R) {
                        let alpha = (1 - dis / R) * .5;
                        context.strokeStyle = 'rgba(255,255,255,' + alpha + ')';
                        context.beginPath();
                        context.moveTo(pA.p.x, pA.p.y);
                        context.lineTo(pB.p.x, pB.p.y);
                        context.closePath();
                        context.stroke();
                    }
                }
            }
        }

        return renderer;
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
