import ImgUtil from "../utils/ImgUtil";
import ColorUtil from "../utils/ColorUtil";
import MathUtil from "../math/MathUtil";
import BaseRenderer from "./BaseRenderer";

export default class CanvasRenderer extends BaseRenderer {
    constructor(element) {
        super(element);

        this.stroke = null;
        this.context = this.element.getContext("2d");
        this.bufferCache = {};
        this.name = "CanvasRenderer";
    }

    resize(width, height) {
        this.element.width = width;
        this.element.height = height;
    }

    onProtonUpdate() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    onParticleCreated(particle) {
        if (particle.body) {
            ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
        } else {
            particle.color = particle.color || "#ff0000";
        }
    }

    onParticleUpdate(particle) {
        if (particle.body) {
            if (particle.body instanceof Image) this.drawImage(particle);
        } else {
            this.drawCircle(particle);
        }
    }

    onParticleDead(particle) {
        particle.body = null;
    }

    // private
    addImg2Body(img, particle) {
        particle.body = img;
    }

    // private drawCircle
    drawImage(particle) {
        const w = (particle.body.width * particle.scale) | 0;
        const h = (particle.body.height * particle.scale) | 0;
        const x = particle.p.x - w / 2;
        const y = particle.p.y - h / 2;

        if (!!particle.color) {
            if (!particle.data["buffer"])
                particle.data.buffer = this.createBuffer(particle.body);

            const bufContext = particle.data.buffer.getContext("2d");
            bufContext.clearRect(
                0,
                0,
                particle.data.buffer.width,
                particle.data.buffer.height
            );
            bufContext.globalAlpha = particle.alpha;
            bufContext.drawImage(particle.body, 0, 0);

            bufContext.globalCompositeOperation = "source-atop";
            bufContext.fillStyle = ColorUtil.rgbToHex(particle.rgb);
            bufContext.fillRect(
                0,
                0,
                particle.data.buffer.width,
                particle.data.buffer.height
            );
            bufContext.globalCompositeOperation = "source-over";
            bufContext.globalAlpha = 1;

            this.context.drawImage(
                particle.data.buffer,
                0,
                0,
                particle.data.buffer.width,
                particle.data.buffer.height,
                x,
                y,
                w,
                h
            );
        } else {
            this.context.save();

            this.context.globalAlpha = particle.alpha;
            this.context.translate(particle.p.x, particle.p.y);
            this.context.rotate(MathUtil.degreeTransform(particle.rotation));
            this.context.translate(-particle.p.x, -particle.p.y);
            this.context.drawImage(
                particle.body,
                0,
                0,
                particle.body.width,
                particle.body.height,
                x,
                y,
                w,
                h
            );

            this.context.globalAlpha = 1;
            this.context.restore();
        }
    }

    // private drawCircle --
    drawCircle(particle) {
        if (particle.rgb) {
            this.context.fillStyle = `rgba(${particle.rgb.r},${particle.rgb.g},${particle.rgb.b},${particle.alpha})`;
        } else {
            this.context.fillStyle = particle.color;
        }

        // draw circle
        this.context.beginPath();
        this.context.arc(
            particle.p.x,
            particle.p.y,
            particle.radius,
            0,
            Math.PI * 2,
            true
        );

        if (this.stroke) {
            this.context.strokeStyle = this.stroke.color;
            this.context.lineWidth = this.stroke.thinkness;
            this.context.stroke();
        }

        this.context.closePath();
        this.context.fill();
    }

    // private createBuffer
    createBuffer(image) {
        if (image instanceof Image) {
            const size = image.width + "_" + image.height;
            let canvas = this.bufferCache[size];

            if (!canvas) {
                canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                this.bufferCache[size] = canvas;
            }

            return canvas;
        }
    }
}
