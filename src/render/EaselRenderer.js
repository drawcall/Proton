import BaseRenderer from "./BaseRenderer";

export default class EaselRenderer extends BaseRenderer {
  constructor(element, stroke) {
    super(element);

    this.stroke = stroke;
    this.name = "EaselRenderer";
  }

  onParticleCreated(particle) {
    if (particle.body) {
      this.createSprite(particle);
    } else {
      this.createCircle(particle);
    }

    this.element.addChild(particle.body);
  }

  onParticleUpdate(particle) {
    if (particle.body) {
      particle.body.x = particle.p.x;
      particle.body.y = particle.p.y;

      particle.body.alpha = particle.alpha;
      particle.body.scaleX = particle.body.scaleY = particle.scale;
      particle.body.rotation = particle.rotation;
    }
  }

  onParticleDead(particle) {
    if (particle.body) {
      particle.body.parent && particle.body.parent.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    }

    if (particle.graphics) this.pool.expire(particle.graphics);
  }

  // private
  createSprite(particle) {
    particle.body = this.pool.get(particle.body);

    if (particle.body.parent) return;
    if (particle.body["image"]) {
      particle.body.regX = particle.body.image.width / 2;
      particle.body.regY = particle.body.image.height / 2;
    }
  }

  createCircle(particle) {
    const graphics = this.pool.get(createjs.Graphics);

    if (this.stroke) {
      if (this.stroke instanceof String) graphics.beginStroke(this.stroke);
      else graphics.beginStroke("#000000");
    }
    graphics
      .beginFill(particle.color || "#ff0000")
      .drawCircle(0, 0, particle.radius);

    const shape = this.pool.get(createjs.Shape, [graphics]);

    particle.body = shape;
    particle.graphics = graphics;
  }
}
