import Pool from "../core/Pool";

export default class BaseRenderer {
    constructor(element, stroke) {
        this.pool = new Pool();
        this.element = element;
        this.stroke = stroke;
        this.circleConf = { isCircle: true };

        this.initHandler();
        this.name = "BaseRenderer";
    }

    setStroke(color = "#000000", thinkness = 1) {
        this.stroke = { color, thinkness };
    }

    initHandler() {
        this._protonUpdateHandler = () => {
            this.onProtonUpdate.call(this);
        };

        this._protonUpdateAfterHandler = () => {
            this.onProtonUpdateAfter.call(this);
        };

        this._emitterAddedHandler = emitter => {
            this.onEmitterAdded.call(this, emitter);
        };

        this._emitterRemovedHandler = emitter => {
            this.onEmitterRemoved.call(this, emitter);
        };

        this._particleCreatedHandler = particle => {
            this.onParticleCreated.call(this, particle);
        };

        this._particleUpdateHandler = particle => {
            this.onParticleUpdate.call(this, particle);
        };

        this._particleDeadHandler = particle => {
            this.onParticleDead.call(this, particle);
        };
    }

    init(proton) {
        this.parent = proton;

        proton.addEventListener("PROTON_UPDATE", this._protonUpdateHandler);
        proton.addEventListener(
            "PROTON_UPDATE_AFTER",
            this._protonUpdateAfterHandler
        );

        proton.addEventListener("EMITTER_ADDED", this._emitterAddedHandler);
        proton.addEventListener("EMITTER_REMOVED", this._emitterRemovedHandler);

        proton.addEventListener(
            "PARTICLE_CREATED",
            this._particleCreatedHandler
        );
        proton.addEventListener("PARTICLE_UPDATE", this._particleUpdateHandler);
        proton.addEventListener("PARTICLE_DEAD", this._particleDeadHandler);
    }

    resize(width, height) {}

    destroy() {
        this.remove();
    }

    remove(proton) {
        this.parent.removeEventListener(
            "PROTON_UPDATE",
            this._protonUpdateHandler
        );
        this.parent.removeEventListener(
            "PROTON_UPDATE_AFTER",
            this._protonUpdateAfterHandler
        );

        this.parent.removeEventListener(
            "EMITTER_ADDED",
            this._emitterAddedHandler
        );
        this.parent.removeEventListener(
            "EMITTER_REMOVED",
            this._emitterRemovedHandler
        );

        this.parent.removeEventListener(
            "PARTICLE_CREATED",
            this._particleCreatedHandler
        );
        this.parent.removeEventListener(
            "PARTICLE_UPDATE",
            this._particleUpdateHandler
        );
        this.parent.removeEventListener(
            "PARTICLE_DEAD",
            this._particleDeadHandler
        );

        this.parent = null;
    }

    onProtonUpdate() {}
    onProtonUpdateAfter() {}

    onEmitterAdded(emitter) {}
    onEmitterRemoved(emitter) {}

    onParticleCreated(particle) {}
    onParticleUpdate(particle) {}
    onParticleDead(particle) {}
}
