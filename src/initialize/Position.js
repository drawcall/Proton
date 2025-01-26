import Util from "../utils/Util";
import PointZone from "../zone/PointZone";
import Initialize from "./Initialize";

/**
 * Position class for initializing particle positions.
 * @extends Initialize
 */
export default class Position extends Initialize {
  /**
   * @type {PointZone|any}
   * @private
   */
  zone;

  /**
   * @type {string}
   */
  name;

  /**
   * Creates a new Position instance.
   * @param {PointZone|any} [zone] - The zone to use for positioning. Defaults to a new PointZone if not provided.
   */
  constructor(zone) {
    super();
    this.zone = Util.initValue(zone, new PointZone());
    this.name = "Position";
  }

  /**
   * Resets this initializer's parameters.
   * @param {PointZone|any} [zone] - The new zone to use for positioning. Defaults to a new PointZone if not provided.
   */
  reset(zone) {
    this.zone = Util.initValue(zone, new PointZone());
  }

  /**
   * Initializes the particle's position.
   * @param {object} target - The particle to initialize.
   * @param {object} target.p - The particle's position object.
   * @param {number} target.p.x - The particle's x coordinate.
   * @param {number} target.p.y - The particle's y coordinate.
   */
  initialize(target) {
    this.zone.getPosition();

    target.p.x = this.zone.vector.x;
    target.p.y = this.zone.vector.y;
  }
}
