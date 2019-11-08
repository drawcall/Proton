import React from "react";
import Proton from "proton-engine";
import RAFManager from "raf-manager";
import Canvas from "./Canvas.jsx";

export default class Lines extends React.Component {
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
        emitter.damping = 0.008;
        emitter.rate = new Proton.Rate(250);
        emitter.addInitialize(new Proton.Mass(1));
        emitter.addInitialize(new Proton.Radius(4));
        emitter.addInitialize(new Proton.Velocity(new Proton.Span(1.5), new Proton.Span(0, 360), 'polar'));
        const mouseObj = {
            x: width / 2,
            y: height / 2
        };

        const attractionBehaviour = new Proton.Attraction(mouseObj, 0, 0);
        const crossZoneBehaviour = new Proton.CrossZone(new Proton.RectZone(0, 0, canvas.width, canvas.height), 'cross');
        emitter.addBehaviour(new Proton.Color('random'));
        emitter.addBehaviour(attractionBehaviour, crossZoneBehaviour);
        emitter.addBehaviour(new Proton.RandomDrift(10, 10, .05));
        emitter.p.x = canvas.width / 2;
        emitter.p.y = canvas.height / 2;
        emitter.emit('once');

        this.proton.addEmitter(emitter);
        this.proton.addRenderer(this.createRenderer(canvas));
    }

    createRenderer(canvas) {
        const context = canvas.getContext("2d");
        const renderer = new Proton.CanvasRenderer(canvas);
        renderer.onProtonUpdate = function () {
            context.fillStyle = "rgba(0, 0, 0, 0.02)";
            context.fillRect(0, 0, canvas.width, canvas.height);
        };

        renderer.onParticleUpdate = function (particle) {
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
