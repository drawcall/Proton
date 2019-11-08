import Zone from "./Zone";
import MathUtil from "../math/MathUtil";

export default class CircleZone extends Zone {
  constructor(x, y, radius) {
    super();

    this.x = x;
    this.y = y;
    this.radius = radius;

    this.angle = 0;
    this.center = { x, y };
  }

  getPosition() {
    this.angle = MathUtil.PIx2 * Math.random();
    this.randomRadius = Math.random() * this.radius;

    this.vector.x = this.x + this.randomRadius * Math.cos(this.angle);
    this.vector.y = this.y + this.randomRadius * Math.sin(this.angle);

    return this.vector;
  }

  setCenter(x, y) {
    this.center.x = x;
    this.center.y = y;
  }

  crossing(particle) {
    const d = particle.p.distanceTo(this.center);

    if (this.crossType === "dead") {
      if (d - particle.radius > this.radius) particle.dead = true;
    } else if (this.crossType === "bound") {
      if (d + particle.radius >= this.radius) this.getSymmetric(particle);
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, CircleZone does not support cross method!");
        this.alert = false;
      }
    }
  }

  getSymmetric(particle) {
    let tha2 = particle.v.getGradient();
    let tha1 = this.getGradient(particle);

    let tha = 2 * (tha1 - tha2);
    let oldx = particle.v.x;
    let oldy = particle.v.y;

    particle.v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    particle.v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);
  }

  getGradient(particle) {
    return (
      -MathUtil.PI_2 +
      Math.atan2(particle.p.y - this.center.y, particle.p.x - this.center.x)
    );
  }
}
