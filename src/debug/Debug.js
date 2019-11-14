import ColorUtil from "../utils/ColorUtil";
import CircleZone from "../zone/CircleZone";
import PointZone from "../zone/PointZone";
import LineZone from "../zone/LineZone";
import RectZone from "../zone/RectZone";

export default {
  addEventListener(proton, func) {
    proton.addEventListener("PROTON_UPDATE_AFTER", () => func());
  },

  getStyle(color = "#ff0000") {
    const rgb = ColorUtil.hexToRgb(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
  },

  drawZone(proton, canvas, zone, clear) {
    const context = canvas.getContext("2d");
    const style = this.getStyle();

    this.addEventListener(proton, () => {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      if (zone instanceof PointZone) {
        context.beginPath();
        context.fillStyle = style;
        context.arc(zone.x, zone.y, 10, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
      } else if (zone instanceof LineZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.moveTo(zone.x1, zone.y1);
        context.lineTo(zone.x2, zone.y2);
        context.stroke();
        context.closePath();
      } else if (zone instanceof RectZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.drawRect(zone.x, zone.y, zone.width, zone.height);
        context.stroke();
        context.closePath();
      } else if (zone instanceof CircleZone) {
        context.beginPath();
        context.strokeStyle = style;
        context.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2, true);
        context.stroke();
        context.closePath();
      }
    });
  },

  drawEmitter(proton, canvas, emitter, clear) {
    const context = canvas.getContext("2d");
    const style = this.getStyle();

    this.addEventListener(proton, () => {
      if (clear) context.clearRect(0, 0, canvas.width, canvas.height);

      context.beginPath();
      context.fillStyle = style;
      context.arc(emitter.p.x, emitter.p.y, 10, 0, Math.PI * 2, true);
      context.fill();
      context.closePath();
    });
  }
};
