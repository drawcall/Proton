import MathUtil from "./MathUtil";

export default {
  easeLinear(value) {
    return value;
  },

  easeInQuad(value) {
    return Math.pow(value, 2);
  },

  easeOutQuad(value) {
    return -(Math.pow(value - 1, 2) - 1);
  },

  easeInOutQuad(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 2);

    return -0.5 * ((value -= 2) * value - 2);
  },

  easeInCubic(value) {
    return Math.pow(value, 3);
  },

  easeOutCubic(value) {
    return Math.pow(value - 1, 3) + 1;
  },

  easeInOutCubic(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 3);

    return 0.5 * (Math.pow(value - 2, 3) + 2);
  },

  easeInQuart(value) {
    return Math.pow(value, 4);
  },

  easeOutQuart(value) {
    return -(Math.pow(value - 1, 4) - 1);
  },

  easeInOutQuart(value) {
    if ((value /= 0.5) < 1) return 0.5 * Math.pow(value, 4);

    return -0.5 * ((value -= 2) * Math.pow(value, 3) - 2);
  },

  easeInSine(value) {
    return -Math.cos(value * MathUtil.PI_2) + 1;
  },

  easeOutSine(value) {
    return Math.sin(value * MathUtil.PI_2);
  },

  easeInOutSine(value) {
    return -0.5 * (Math.cos(Math.PI * value) - 1);
  },

  easeInExpo(value) {
    return value === 0 ? 0 : Math.pow(2, 10 * (value - 1));
  },

  easeOutExpo(value) {
    return value === 1 ? 1 : -Math.pow(2, -10 * value) + 1;
  },

  easeInOutExpo(value) {
    if (value === 0) return 0;

    if (value === 1) return 1;

    if ((value /= 0.5) < 1) return 0.5 * Math.pow(2, 10 * (value - 1));

    return 0.5 * (-Math.pow(2, -10 * --value) + 2);
  },

  easeInCirc(value) {
    return -(Math.sqrt(1 - value * value) - 1);
  },

  easeOutCirc(value) {
    return Math.sqrt(1 - Math.pow(value - 1, 2));
  },

  easeInOutCirc(value) {
    if ((value /= 0.5) < 1) return -0.5 * (Math.sqrt(1 - value * value) - 1);
    return 0.5 * (Math.sqrt(1 - (value -= 2) * value) + 1);
  },

  easeInBack(value) {
    let s = 1.70158;
    return value * value * ((s + 1) * value - s);
  },

  easeOutBack(value) {
    let s = 1.70158;
    return (value = value - 1) * value * ((s + 1) * value + s) + 1;
  },

  easeInOutBack(value) {
    let s = 1.70158;
    if ((value /= 0.5) < 1)
      return 0.5 * (value * value * (((s *= 1.525) + 1) * value - s));
    return 0.5 * ((value -= 2) * value * (((s *= 1.525) + 1) * value + s) + 2);
  },

  getEasing(ease) {
    if (typeof ease === "function") return ease;
    else return this[ease] || this.easeLinear;
  }
};
