import Span from "../math/Span";
import Initialize from "./Initialize";

export default class Radius extends Initialize {
  constructor(a, b, c) {
    super();
    this.radius = Span.setSpanValue(a, b, c);

    this.name = "Radius";
  }

  reset(a, b, c) {
    this.radius = Span.setSpanValue(a, b, c);
  }

  initialize(particle) {
    particle.radius = this.radius.getValue();
    particle.data.oldRadius = particle.radius;
  }
}
