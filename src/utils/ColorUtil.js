export default {
  /**
   * @typedef  {Object} rgbObject
   * @property {Number} r red value
   * @property {Number} g green value
   * @property {Number} b blue value
   */
  /**
   * converts a hex value to a rgb object
   *
   * @memberof Proton#Proton.Util
   * @method hexToRgb
   *
   * @param {String} h any hex value, e.g. #000000 or 000000 for black
   *
   * @return {rgbObject}
   */
  hexToRgb(h) {
    const hex16 = h.charAt(0) === "#" ? h.substring(1, 7) : h;
    const r = parseInt(hex16.substring(0, 2), 16);
    const g = parseInt(hex16.substring(2, 4), 16);
    const b = parseInt(hex16.substring(4, 6), 16);

    return { r, g, b };
  },

  /**
   * converts a rgb value to a rgb string
   *
   * @memberof Proton#Proton.Util
   * @method rgbToHex
   *
   * @param {Object | Proton.hexToRgb} rgb a rgb object like in {@link Proton#Proton.}
   *
   * @return {String} rgb()
   */
  rgbToHex(rbg) {
    return `rgb(${rbg.r}, ${rbg.g}, ${rbg.b})`;
  },

  getHex16FromParticle(p) {
    return Number(p.rgb.r) * 65536 + Number(p.rgb.g) * 256 + Number(p.rgb.b);
  }
};
