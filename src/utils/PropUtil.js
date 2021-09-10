export default {
  hasProp(target, key) {
    if (!target) return false;
    return target[key] !== undefined;
    // return obj.hasOwnProperty(key);
  },

  /**
   * set the prototype in a given prototypeObject
   *
   * @memberof Proton#Proton.Util
   * @method setProp
   *
   * @todo add description for param `target`
   * @todo translate desription from chinese to english
   *
   * @param {Object} target
   * @param {Object} prototypeObject An object of single prototypes
   *
   * @return {Object} target
   */
  setProp(target, props) {
    for (let prop in props) {
      if (target.hasOwnProperty(prop)) {
        target[prop] = Span.getSpanValue(props[prop]);
      }
    }

    return target;
  },

  /**
   * @memberof Proton#Proton.Util
   * @method setVectorVal
   *
   * @todo add description for param `target`
   * @todo add description for param `conf`
   * @todo add description for function
   *
   * @param {Object} target
   * @param {Object} conf
   */
  setVectorVal(particle, conf = null) {
    if (!conf) return;

    if (this.hasProp(conf, "x")) particle.p.x = conf["x"];
    if (this.hasProp(conf, "y")) particle.p.y = conf["y"];

    if (this.hasProp(conf, "vx")) particle.v.x = conf["vx"];
    if (this.hasProp(conf, "vy")) particle.v.y = conf["vy"];

    if (this.hasProp(conf, "ax")) particle.a.x = conf["ax"];
    if (this.hasProp(conf, "ay")) particle.a.y = conf["ay"];

    if (this.hasProp(conf, "p")) particle.p.copy(conf["p"]);
    if (this.hasProp(conf, "v")) particle.v.copy(conf["v"]);
    if (this.hasProp(conf, "a")) particle.a.copy(conf["a"]);

    if (this.hasProp(conf, "position")) particle.p.copy(conf["position"]);
    if (this.hasProp(conf, "velocity")) particle.v.copy(conf["velocity"]);
    if (this.hasProp(conf, "accelerate")) particle.a.copy(conf["accelerate"]);
  }
};
