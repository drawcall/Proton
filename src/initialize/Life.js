import Span from "../math/Span";
import Initialize from "./Initialize";

export default class Life extends Initialize {
  constructor(a, b, c) {
    super();

    this.lifePan = Span.setSpanValue(a, b, c);
    this.name = "Life";
  }

  initialize(target) {
    if (this.lifePan.a === Infinity) target.life = Infinity;
    else target.life = this.lifePan.getValue();
  }
}
