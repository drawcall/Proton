import Util from '../utils/Util';
import ImgUtil from '../utils/ImgUtil';
import ColorUtil from '../utils/ColorUtil';
import MathUtils from '../math/MathUtils';
import BaseRenderer from './BaseRenderer';

export default class CanvasRenderer extends BaseRenderer {

    constructor(element) {
        super(element);

        this.stroke = null;
        this.context = this.element.getContext("2d");
        this.bufferCache = {};

        this.name = 'CanvasRenderer';
    }

    resize(width, height) {
        this.element.width = width;
        this.element.height = height;
    }

    onProtonUpdate() {
        this.context.clearRect(0, 0, this.element.width, this.element.height);
    }

    onParticleCreated(particle) {
        if (particle.body)
            ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
        else
            particle.color = particle.color || '#ff0000';
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

    // private drawCircle --
    drawImage(particle) {
        const w = particle.body.width * particle.scale | 0;
        const h = particle.body.height * particle.scale | 0;
        const x = particle.p.x - w / 2;
        const y = particle.p.y - h / 2;

        if (!!particle.color) {
            if (!particle.transform["buffer"]) particle.transform.buffer = this.createBuffer(particle.body);

            const bufferContext = particle.transform.buffer.getContext('2d');
            bufferContext.clearRect(0, 0, particle.transform.buffer.width, particle.transform.buffer.height);
            bufferContext.globalAlpha = particle.alpha;
            bufferContext.drawImage(particle.body, 0, 0);

            bufferContext.globalCompositeOperation = "source-atop";
            bufferContext.fillStyle = ColorUtil.rgbToHex(particle.transform.rgb);
            bufferContext.fillRect(0, 0, particle.transform.buffer.width, particle.transform.buffer.height);
            bufferContext.globalCompositeOperation = "source-over";
            bufferContext.globalAlpha = 1;

            this.context.drawImage(particle.transform.buffer, 0, 0, particle.transform.buffer.width, particle.transform.buffer.height, x, y, w, h);
        } else {
            this.context.save();

            this.context.globalAlpha = particle.alpha;
            this.context.translate(particle.p.x, particle.p.y);
            this.context.rotate(MathUtils.degreeTransform(particle.rotation));
            this.context.translate(-particle.p.x, -particle.p.y);
            this.context.drawImage(particle.body, 0, 0, particle.body.width, particle.body.height, x, y, w, h);

            this.context.globalAlpha = 1;
            this.context.restore();
        }
    }

    // private drawCircle --
    drawCircle(particle) {
        if (particle.transform["rgb"])
            this.context.fillStyle = 'rgba(' + particle.transform.rgb.r + ',' + particle.transform.rgb.g + ',' + particle.transform.rgb.b + ',' + particle.alpha + ')';
        else
            this.context.fillStyle = particle.color;

        // draw circle
        this.context.beginPath();
        this.context.arc(particle.p.x, particle.p.y, particle.radius, 0, Math.PI * 2, true);

        if (this.stroke) {
            this.context.strokeStyle = this.stroke.color;
            this.context.lineWidth = this.stroke.thinkness;
            this.context.stroke();
        }

        this.context.closePath();
        this.context.fill();
    }

    // private createBuffer --
    createBuffer(image) {
        if (image instanceof Image) {
            const size = image.width + '_' + image.height;
            let canvas = this.bufferCache[size];

            if (!canvas) {
                canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;
                this.bufferCache[size] = canvas;
            }

            return canvas;
        }
    }
}