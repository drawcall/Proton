import Pool from '../core/Pool';
import Util from '../utils/Util';
import ColorUtil from '../utils/ColorUtil';
import MathUtils from '../math/MathUtils';
import BaseRenderer from './BaseRenderer';

export default class PixiRenderer extends BaseRenderer {

    constructor(element, stroke) {
        super(element);

        this.stroke = stroke;
        this.setColor = false;
        this.pool.create = (body, particle) => this.createBody(body, particle);
        this.name = 'PixiRenderer';
    }

    onProtonUpdate() { }

    /**
     * @param particle
     */
    onParticleCreated(particle) {
        if (particle.body) {
            particle.body = this.pool.get(particle.body, particle);
        } else {
            particle.body = this.pool.get(this.circleConf, particle);
        }

        this.element.addChild(particle.body);
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
        this.element.removeChild(particle.body);
        this.pool.expire(particle.body);
        particle.body = null;
    }

    destroy(particles) {
        super.destroy();
        this.pool.destroy();

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

    createBody(body, particle) {
        if (body.isCircle)
            return this.createCircle(particle);
        else
            return this.createSprite(body);
    }

    createSprite(body) {
        const sprite = body.isInner ? PIXI.Sprite.fromImage(body.src) : new PIXI.Sprite(body);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;

        return sprite;
    }

    createCircle(particle) {
        const graphics = new PIXI.Graphics();

        if (this.stroke) {
            let stroke = this.stroke instanceof String ? this.stroke : 0x000000;
            graphics.beginStroke(this.stroke);
        }

        graphics.beginFill(particle.color || 0x008ced);
        graphics.drawCircle(0, 0, particle.radius);
        graphics.endFill();

        return graphics;
    }
}