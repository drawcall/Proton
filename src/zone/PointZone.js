import Zone from "./Zone";

export default class PointZone extends Zone {
  constructor(x, y) {
    super();

    this.x = x;
    this.y = y;
  }

  getPosition() {
    this.vector.x = this.x;
    this.vector.y = this.y;

    return this.vector;
  }

  crossing(particle) {
    if (this.alert) {
      console.error("Sorry, PointZone does not support crossing method!");
      this.alert = false;
    }
  }
}
