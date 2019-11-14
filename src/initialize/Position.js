import Util from "../utils/Util";
import PointZone from "../zone/PointZone";
import Initialize from "./Initialize";

export default class Position extends Initialize {
  constructor(zone) {
    super();
    this.zone = Util.initValue(zone, new PointZone());
    this.name = "Position";
  }

  reset(zone) {
    this.zone = Util.initValue(zone, new PointZone());
  }

  initialize(target) {
    this.zone.getPosition();

    target.p.x = this.zone.vector.x;
    target.p.y = this.zone.vector.y;
  }
}
