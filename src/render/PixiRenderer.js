import ColorUtil from '../utils/ColorUtil';
import MathUtils from '../math/MathUtils';
import BaseRenderer from './BaseRenderer';
import FastPool from "../core/FastPool";

export default class PixiRenderer extends BaseRenderer {

    // element must be Particle Container
    constructor(element, stroke) {
        super(element);

        this.stroke = stroke;
        this.setColor = false;

        this.fastPool = new FastPool();
        this.name = 'PixiRenderer';
    }

    onProtonUpdate() { }

    /**
     * @param particle
     */
    onParticleCreated(particle) {
        if (this.fastPool.count > 0) {
            particle.body = this.fastPool.get();
            particle.body.visible = true;
        } else {
            particle.body = this.createSprite(particle.body);
            this.element.addChild(particle.body);
        }
    }

    /**
     * @param particle
     */
    onParticleUpdate(particle) {
        this.transform(particle, particle.body);
        if (this.setColor) particle.body.tint = ColorUtil.getHex16FromParticle(particle);
    }

    /**
     * @param particle
     */
    onParticleDead(particle) {
        particle.body.alpha = 0;
        this.fastPool.add(particle.body);
    }

    destroy(particles) {
        super.destroy();
        this.fastPool.destroy();

        let i = particles.length;
        while (i--) {
            let particle = particles[i];
            if (particle.body) {
                this.element.removeChild(particle.body);
            }
        }
    }

    transform(particle, target) {
        target.x = particle.p.x;
        target.y = particle.p.y;

        target.alpha = particle.alpha;

        target.scale.x = particle.scale;
        target.scale.y = particle.scale;

        // using cached version of MathUtils.PI_180 for slight performance increase.
        target.rotation = particle.rotation * MathUtils.PI_180; // MathUtils.PI_180;
    }

    createSprite(body) {
        const sprite = body.isInner ? PIXI.Sprite.from(body.src) : new PIXI.Sprite(body);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        return sprite;
    }
}