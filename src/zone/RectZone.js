import Zone from "./Zone";

export default class RectZone extends Zone {
  constructor(x, y, width, height) {
    super();

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  getPosition() {
    this.vector.x = this.x + Math.random() * this.width;
    this.vector.y = this.y + Math.random() * this.height;

    return this.vector;
  }

  crossing(particle) {
    // particle dead zone
    if (this.crossType === "dead") {
      if (particle.p.x + particle.radius < this.x) particle.dead = true;
      else if (particle.p.x - particle.radius > this.x + this.width)
        particle.dead = true;

      if (particle.p.y + particle.radius < this.y) particle.dead = true;
      else if (particle.p.y - particle.radius > this.y + this.height)
        particle.dead = true;
    }

    // particle bound zone
    else if (this.crossType === "bound") {
      if (particle.p.x - particle.radius < this.x) {
        particle.p.x = this.x + particle.radius;
        particle.v.x *= -1;
      } else if (particle.p.x + particle.radius > this.x + this.width) {
        particle.p.x = this.x + this.width - particle.radius;
        particle.v.x *= -1;
      }

      if (particle.p.y - particle.radius < this.y) {
        particle.p.y = this.y + particle.radius;
        particle.v.y *= -1;
      } else if (particle.p.y + particle.radius > this.y + this.height) {
        particle.p.y = this.y + this.height - particle.radius;
        particle.v.y *= -1;
      }
    }

    // particle cross zone
    else if (this.crossType === "cross") {
      if (particle.p.x + particle.radius < this.x && particle.v.x <= 0)
        particle.p.x = this.x + this.width + particle.radius;
      else if (
        particle.p.x - particle.radius > this.x + this.width &&
        particle.v.x >= 0
      )
        particle.p.x = this.x - particle.radius;

      if (particle.p.y + particle.radius < this.y && particle.v.y <= 0)
        particle.p.y = this.y + this.height + particle.radius;
      else if (
        particle.p.y - particle.radius > this.y + this.height &&
        particle.v.y >= 0
      )
        particle.p.y = this.y - particle.radius;
    }
  }
}
