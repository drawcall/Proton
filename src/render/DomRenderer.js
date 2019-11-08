import DomUtil from "../utils/DomUtil";
import ImgUtil from "../utils/ImgUtil";
import BaseRenderer from "./BaseRenderer";

export default class DomRenderer extends BaseRenderer {
  constructor(element) {
    super(element);

    this.stroke = null;
    this.pool.create = (body, particle) => this.createBody(body, particle);
    this.addImg2Body = this.addImg2Body.bind(this);

    this.transform3d = false;
    this.name = "DomRenderer";
  }

  onParticleCreated(particle) {
    if (particle.body) {
      ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
    } else {
      particle.body = this.pool.get(this.circleConf, particle);
      this.element.appendChild(particle.body);
    }
  }

  onParticleUpdate(particle) {
    if (this.bodyReady(particle)) {
      if (this.transform3d)
        DomUtil.transform3d(
          particle.body,
          particle.p.x,
          particle.p.y,
          particle.scale,
          particle.rotation
        );
      else
        DomUtil.transform(
          particle.body,
          particle.p.x,
          particle.p.y,
          particle.scale,
          particle.rotation
        );

      particle.body.style.opacity = particle.alpha;
      if (particle.body.isCircle) {
        particle.body.style.backgroundColor = particle.color || "#ff0000";
      }
    }
  }

  onParticleDead(particle) {
    if (this.bodyReady(particle)) {
      this.element.removeChild(particle.body);
      this.pool.expire(particle.body);
      particle.body = null;
    }
  }

  bodyReady(particle) {
    return (
      typeof particle.body === "object" &&
      particle.body &&
      !particle.body.isInner
    );
  }

  // private
  addImg2Body(img, particle) {
    if (particle.dead) return;
    particle.body = this.pool.get(img, particle);
    DomUtil.resize(particle.body, img.width, img.height);

    this.element.appendChild(particle.body);
  }

  createBody(body, particle) {
    if (body.isCircle) return this.createCircle(particle);
    else return this.createSprite(body, particle);
  }

  // private --
  createCircle(particle) {
    const dom = DomUtil.createDiv(
      `${particle.id}_dom`,
      2 * particle.radius,
      2 * particle.radius
    );
    dom.style.borderRadius = `${particle.radius}px`;

    if (this.stroke) {
      dom.style.borderColor = this.stroke.color;
      dom.style.borderWidth = `${this.stroke.thinkness}px`;
    }
    dom.isCircle = true;

    return dom;
  }

  createSprite(body, particle) {
    const url = typeof body === "string" ? body : body.src;
    const dom = DomUtil.createDiv(
      `${particle.id}_dom`,
      body.width,
      body.height
    );
    dom.style.backgroundImage = `url(${url})`;

    return dom;
  }
}
