import Pool from '../core/Pool';
import Util from '../utils/Util';

export default class BaseRenderer {

    constructor(element, stroke) {
        this.element = element;
        this.stroke = stroke;

        this.initHandler();

        this.circleConf = { isCircle: true };
        this.pool = new Pool();
        this.name = 'BaseRenderer';
    }

    setStroke(color, thinkness) {
        color = Util.initValue(color, '#000000');
        thinkness = Util.initValue(thinkness, 1);

        this.stroke = { color, thinkness };
    }

    initHandler() {
        this._protonUpdateHandler = () => { this.onProtonUpdate.call(this) };
        this._protonUpdateAfterHandler = () => { this.onProtonUpdateAfter.call(this) };
        this._emitterAddedHandler = (emitter) => { this.onEmitterAdded.call(this, emitter) };
        this._emitterRemovedHandler = (emitter) => { this.onEmitterRemoved.call(this, emitter) };
        this._particleCreatedHandler = (particle) => { this.onParticleCreated.call(this, particle) };
        this._particleUpdateHandler = (particle) => { this.onParticleUpdate.call(this, particle) };
        this._particleDeadHandler = (particle) => { this.onParticleDead.call(this, particle) };
    }

    init(proton) {
        this.parent = proton;

        proton.addEventListener(Proton.PROTON_UPDATE, this._protonUpdateHandler);
        proton.addEventListener(Proton.PROTON_UPDATE_AFTER, this._protonUpdateAfterHandler);

        proton.addEventListener(Proton.EMITTER_ADDED, this._emitterAddedHandler);
        proton.addEventListener(Proton.EMITTER_REMOVED, this._emitterRemovedHandler);

        proton.addEventListener(Proton.PARTICLE_CREATED, this._particleCreatedHandler);
        proton.addEventListener(Proton.PARTICLE_UPDATE, this._particleUpdateHandler);
        proton.addEventListener(Proton.PARTICLE_DEAD, this._particleDeadHandler);
    }

    resize(width, height) {}

    remove(proton) {
        this.parent.removeEventListener(Proton.PROTON_UPDATE, this._protonUpdateHandler);
        this.parent.removeEventListener(Proton.PROTON_UPDATE_AFTER, this._protonUpdateAfterHandler);

        this.parent.removeEventListener(Proton.EMITTER_ADDED, this._emitterAddedHandler);
        this.parent.removeEventListener(Proton.EMITTER_REMOVED, this._emitterRemovedHandler);

        this.parent.removeEventListener(Proton.PARTICLE_CREATED, this._particleCreatedHandler);
        this.parent.removeEventListener(Proton.PARTICLE_UPDATE, this._particleUpdateHandler);
        this.parent.removeEventListener(Proton.PARTICLE_DEAD, this._particleDeadHandler);

        this.parent = null;
    }

    destroy(){
        this.remove();
    }
    
    onProtonUpdate() {}
    onProtonUpdateAfter() {}

    onEmitterAdded(emitter) {}
    onEmitterRemoved(emitter) {}

    onParticleCreated(particle) {}
    onParticleUpdate(particle) {}
    onParticleDead(particle) {}
}