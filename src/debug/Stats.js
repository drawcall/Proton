export default class Stats {
  constructor(proton) {
    this.proton = proton;
    this.container = null;
    this.type = 1;

    this.emitterIndex = 0;
    this.rendererIndex = 0;
  }

  update(style, body) {
    this.add(style, body);

    const emitter = this.getEmitter();
    const renderer = this.getRenderer();
    let str = "";

    switch (this.type) {
      case 2:
        str += "emitter:" + this.proton.emitters.length + "<br>";
        if (emitter) str += "em speed:" + emitter.emitSpeed + "<br>";
        if (emitter) str += "pos:" + this.getEmitterPos(emitter);
        break;

      case 3:
        if (emitter)
          str += "initializes:" + emitter.initializes.length + "<br>";
        if (emitter)
          str +=
            '<span style="display:inline-block;">' +
            this.concatArr(emitter.initializes) +
            "</span><br>";
        if (emitter) str += "behaviours:" + emitter.behaviours.length + "<br>";
        if (emitter)
          str +=
            '<span style="display:inline-block;">' +
            this.concatArr(emitter.behaviours) +
            "</span><br>";
        break;

      case 4:
        if (renderer) str += renderer.name + "<br>";
        if (renderer) str += "body:" + this.getCreatedNumber(renderer) + "<br>";
        break;

      default:
        str += "particles:" + this.proton.getCount() + "<br>";
        str += "pool:" + this.proton.pool.getCount() + "<br>";
        str += "total:" + this.proton.pool.total;
    }

    this.container.innerHTML = str;
  }

  add(style, body) {
    if (!this.container) {
      this.type = 1;

      this.container = document.createElement("div");
      this.container.style.cssText = [
        "position:absolute;bottom:0px;left:0;cursor:pointer;",
        "opacity:0.9;z-index:10000;padding:10px;font-size:12px;font-family:Helvetica,Arial,sans-serif;",
        "width:120px;height:50px;background-color:#002;color:#0ff;"
      ].join("");

      this.container.addEventListener(
        "click",
        e => {
          this.type++;
          if (this.type > 4) this.type = 1;
        },
        false
      );

      let bg, color;
      switch (style) {
        case 2:
          bg = "#201";
          color = "#f08";
          break;

        case 3:
          bg = "#020";
          color = "#0f0";
          break;

        default:
          bg = "#002";
          color = "#0ff";
      }

      this.container.style["background-color"] = bg;
      this.container.style["color"] = color;
    }

    if (!this.container.parentNode) {
      body = body || this.body || document.body;
      body.appendChild(this.container);
    }
  }

  getEmitter() {
    return this.proton.emitters[this.emitterIndex];
  }

  getRenderer() {
    return this.proton.renderers[this.rendererIndex];
  }

  concatArr(arr) {
    let result = "";
    if (!arr || !arr.length) return result;

    for (let i = 0; i < arr.length; i++) {
      result += (arr[i].name || "").substr(0, 1) + ".";
    }

    return result;
  }

  getCreatedNumber(renderer) {
    return renderer.pool.total || (renderer.cpool && renderer.cpool.total) || 0;
  }

  getEmitterPos(e) {
    return Math.round(e.p.x) + "," + Math.round(e.p.y);
  }
}
