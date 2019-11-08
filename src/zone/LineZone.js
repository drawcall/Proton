import Zone from "./Zone";
import Util from "../utils/Util";
import MathUtil from "../math/MathUtil";

export default class LineZone extends Zone {
  constructor(x1, y1, x2, y2, direction) {
    super();

    if (x2 - x1 >= 0) {
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
    } else {
      this.x1 = x2;
      this.y1 = y2;
      this.x2 = x1;
      this.y2 = y1;
    }

    this.dx = this.x2 - this.x1;
    this.dy = this.y2 - this.y1;

    this.minx = Math.min(this.x1, this.x2);
    this.miny = Math.min(this.y1, this.y2);
    this.maxx = Math.max(this.x1, this.x2);
    this.maxy = Math.max(this.y1, this.y2);

    this.dot = this.x2 * this.y1 - this.x1 * this.y2;
    this.xxyy = this.dx * this.dx + this.dy * this.dy;

    this.gradient = this.getGradient();
    this.length = this.getLength();
    this.direction = Util.initValue(direction, ">");
  }

  getPosition() {
    this.random = Math.random();

    this.vector.x =
      this.x1 + this.random * this.length * Math.cos(this.gradient);
    this.vector.y =
      this.y1 + this.random * this.length * Math.sin(this.gradient);

    return this.vector;
  }

  getDirection(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = B === 0 ? 1 : B;

    if ((A * x + B * y + C) * D > 0) return true;
    else return false;
  }

  getDistance(x, y) {
    const A = this.dy;
    const B = -this.dx;
    const C = this.dot;
    const D = A * x + B * y + C;

    return D / Math.sqrt(this.xxyy);
  }

  getSymmetric(v) {
    const tha2 = v.getGradient();
    const tha1 = this.getGradient();
    const tha = 2 * (tha1 - tha2);

    const oldx = v.x;
    const oldy = v.y;

    v.x = oldx * Math.cos(tha) - oldy * Math.sin(tha);
    v.y = oldx * Math.sin(tha) + oldy * Math.cos(tha);

    return v;
  }

  getGradient() {
    return Math.atan2(this.dy, this.dx);
  }

  rangeOut(particle) {
    const angle = Math.abs(this.getGradient());

    if (angle <= MathUtil.PI / 4) {
      if (particle.p.x <= this.maxx && particle.p.x >= this.minx) return true;
    } else {
      if (particle.p.y <= this.maxy && particle.p.y >= this.miny) return true;
    }

    return false;
  }

  getLength() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
  }

  crossing(particle) {
    if (this.crossType === "dead") {
      if (
        this.direction === ">" ||
        this.direction === "R" ||
        this.direction === "right" ||
        this.direction === "down"
      ) {
        if (!this.rangeOut(particle)) return;
        if (this.getDirection(particle.p.x, particle.p.y)) particle.dead = true;
      } else {
        if (!this.rangeOut(particle)) return;
        if (!this.getDirection(particle.p.x, particle.p.y))
          particle.dead = true;
      }
    } else if (this.crossType === "bound") {
      if (!this.rangeOut(particle)) return;

      if (this.getDistance(particle.p.x, particle.p.y) <= particle.radius) {
        if (this.dx === 0) {
          particle.v.x *= -1;
        } else if (this.dy === 0) {
          particle.v.y *= -1;
        } else {
          this.getSymmetric(particle.v);
        }
      }
    } else if (this.crossType === "cross") {
      if (this.alert) {
        console.error("Sorry, LineZone does not support cross method!");
        this.alert = false;
      }
    }
  }
}
