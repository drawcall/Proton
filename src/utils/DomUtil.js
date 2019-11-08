export default {
  /**
   * Creates and returns a new canvas. The opacity is by default set to 0
   *
   * @memberof Proton#Proton.DomUtil
   * @method createCanvas
   *
   * @param {String} $id the canvas' id
   * @param {Number} $width the canvas' width
   * @param {Number} $height the canvas' height
   * @param {String} [$position=absolute] the canvas' position, default is 'absolute'
   *
   * @return {Object}
   */
  createCanvas(id, width, height, position = "absolute") {
    const dom = document.createElement("canvas");

    dom.id = id;
    dom.width = width;
    dom.height = height;
    dom.style.opacity = 0;
    dom.style.position = position;
    this.transform(dom, -500, -500, 0, 0);

    return dom;
  },

  createDiv(id, width, height) {
    const dom = document.createElement("div");

    dom.id = id;
    dom.style.position = "absolute";
    this.resize(dom, width, height);

    return dom;
  },

  resize(dom, width, height) {
    dom.style.width = width + "px";
    dom.style.height = height + "px";
    dom.style.marginLeft = -width / 2 + "px";
    dom.style.marginTop = -height / 2 + "px";
  },

  /**
   * Adds a transform: translate(), scale(), rotate() to a given div dom for all browsers
   *
   * @memberof Proton#Proton.DomUtil
   * @method transform
   *
   * @param {HTMLDivElement} div
   * @param {Number} $x
   * @param {Number} $y
   * @param {Number} $scale
   * @param {Number} $rotate
   */
  transform(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    const transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`;
    this.css3(div, "transform", transform);
  },

  transform3d(div, x, y, scale, rotate) {
    div.style.willChange = "transform";
    const transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
    this.css3(div, "backfaceVisibility", "hidden");
    this.css3(div, "transform", transform);
  },

  css3(div, key, val) {
    const bkey = key.charAt(0).toUpperCase() + key.substr(1);

    div.style[`Webkit${bkey}`] = val;
    div.style[`Moz${bkey}`] = val;
    div.style[`O${bkey}`] = val;
    div.style[`ms${bkey}`] = val;
    div.style[`${key}`] = val;
  }
};
