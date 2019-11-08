import Mat3 from '../math/Mat3';
import BaseRenderer from './BaseRenderer';

import Util from '../utils/Util';
import ImgUtil from '../utils/ImgUtil';
import MStack from '../utils/MStack';
import DomUtil from '../utils/DomUtil';
import WebGLUtil from '../utils/WebGLUtil';
import MathUtil from '../math/MathUtil';

export default class WebGLRenderer extends BaseRenderer {

    constructor(element) {
        super(element);

        this.gl = this.element.getContext('experimental-webgl', { antialias: true, stencil: false, depth: false });
        if (!this.gl) alert('Sorry your browser do not suppest WebGL!');

        this.initVar();
        this.setMaxRadius();
        this.initShaders();
        this.initBuffers();

        this.gl.blendEquation(this.gl.FUNC_ADD);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        this.gl.enable(this.gl.BLEND);

        this.addImg2Body = this.addImg2Body.bind(this);

        this.name = 'WebGLRenderer';
    }

    init(proton) {
        super.init(proton);
        this.resize(this.element.width, this.element.height);
    }

    resize(width, height) {
        this.umat[4] = -2;
        this.umat[7] = 1;

        this.smat[0] = 1 / width;
        this.smat[4] = 1 / height;

        this.mstack.set(this.umat, 0);
        this.mstack.set(this.smat, 1);

        this.gl.viewport(0, 0, width, height);
        this.element.width = width;
        this.element.height = height;
    }

    setMaxRadius(radius) {
        this.circleCanvasURL = this.createCircle(radius);
    }

    getVertexShader() {
        const vsSource = ['uniform vec2 viewport;', 'attribute vec2 aVertexPosition;', 'attribute vec2 aTextureCoord;', 'uniform mat3 tMat;', 'varying vec2 vTextureCoord;', 'varying float alpha;', 'void main() {', 'vec3 v = tMat * vec3(aVertexPosition, 1.0);', 'gl_Position = vec4(v.x, v.y, 0, 1);', 'vTextureCoord = aTextureCoord;', 'alpha = tMat[0][2];', '}'].join('\n');
        return vsSource;
    }

    getFragmentShader() {
        const fsSource = ['precision mediump float;', 'varying vec2 vTextureCoord;', 'varying float alpha;', 'uniform sampler2D uSampler;', 'uniform vec4 color;', 'uniform bool useTexture;', 'uniform vec3 uColor;', 'void main() {', 'vec4 textureColor = texture2D(uSampler, vTextureCoord);', 'gl_FragColor = textureColor * vec4(uColor, 1.0);', 'gl_FragColor.w *= alpha;', '}'].join('\n');
        return fsSource;
    }

    initVar() {
        this.mstack = new MStack();
        this.umat = Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
        this.smat = Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
        this.texturebuffers = {};
    }

    blendEquation(A) {
        this.gl.blendEquation(this.gl[A]);
    }

    blendFunc(A, B) {
        this.gl.blendFunc(this.gl[A], this.gl[B]);
    }

    getShader(gl, str, fs) {
        const shader = fs ? gl.createShader(gl.FRAGMENT_SHADER) : gl.createShader(gl.VERTEX_SHADER);

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    initShaders() {
        const fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
        const vertexShader = this.getShader(this.gl, this.getVertexShader(), false);

        this.sprogram = this.gl.createProgram();
        this.gl.attachShader(this.sprogram, vertexShader);
        this.gl.attachShader(this.sprogram, fragmentShader);
        this.gl.linkProgram(this.sprogram);

        if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS))
            alert('Could not initialise shaders');

        this.gl.useProgram(this.sprogram);
        this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, 'aVertexPosition');
        this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, 'aTextureCoord');
        this.gl.enableVertexAttribArray(this.sprogram.tca);
        this.gl.enableVertexAttribArray(this.sprogram.vpa);

        this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, 'tMat');
        this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, 'uSampler');
        this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, 'useTexture');
        this.sprogram.color = this.gl.getUniformLocation(this.sprogram, 'uColor');
        this.gl.uniform1i(this.sprogram.useTex, 1);
    };

    initBuffers() {
        const vs = [0, 3, 1, 0, 2, 3];
        let idx;

        this.unitIBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);

        let i;
        let ids = [];
        for (i = 0; i < 100; i++) ids.push(i);
        idx = new Uint16Array(ids);

        this.unitI33 = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);

        ids = [];
        for (i = 0; i < 100; i++) ids.push(i, i + 1, i + 2);
        idx = new Uint16Array(ids);

        this.stripBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
    };

    createCircle(raidus) {
        this.circleCanvasRadius = WebGLUtil.nhpot(Util.initValue(raidus, 32));
        const canvas = DomUtil.createCanvas('circle_canvas', this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
        const context = canvas.getContext('2d');

        context.beginPath();
        context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = '#FFF';
        context.fill();

        return canvas.toDataURL();
    };

    drawImg2Canvas(particle) {
        const _w = particle.body.width;
        const _h = particle.body.height;

        const _width = WebGLUtil.nhpot(particle.body.width);
        const _height = WebGLUtil.nhpot(particle.body.height);

        const _scaleX = particle.body.width / _width;
        const _scaleY = particle.body.height / _height;

        if (!this.texturebuffers[particle.data.src])
            this.texturebuffers[particle.data.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];

        particle.data.texture = this.texturebuffers[particle.data.src][0];
        particle.data.vcBuffer = this.texturebuffers[particle.data.src][1];
        particle.data.tcBuffer = this.texturebuffers[particle.data.src][2];

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);

        const context = particle.data.canvas.getContext('2d');
        const data = context.getImageData(0, 0, _width, _height);

        this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);

        particle.data.textureLoaded = true;
        particle.data.textureWidth = _w;
        particle.data.textureHeight = _h;
    }

    onProtonUpdate() {
        // this.gl.clearColor(0, 0, 0, 1);
        // this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    onParticleCreated(particle) {
        particle.data.textureLoaded = false;
        particle.data.tmat = Mat3.create();
        particle.data.tmat[8] = 1;
        particle.data.imat = Mat3.create();
        particle.data.imat[8] = 1;

        if (particle.body) {
            ImgUtil.getImgFromCache(particle.body, this.addImg2Body, particle);
        } else {
            ImgUtil.getImgFromCache(this.circleCanvasURL, this.addImg2Body, particle);
            particle.data.oldScale = particle.radius / this.circleCanvasRadius;
        }
    }

    // private
    addImg2Body(img, particle) {
        if (particle.dead) return;
        particle.body = img;
        particle.data.src = img.src;
        particle.data.canvas = ImgUtil.getCanvasFromCache(img);
        particle.data.oldScale = 1;

        this.drawImg2Canvas(particle);
    }

    onParticleUpdate(particle) {
        if (particle.data.textureLoaded) {
            this.updateMatrix(particle);

            this.gl.uniform3f(this.sprogram.color, particle.rgb.r / 255, particle.rgb.g / 255, particle.rgb.b / 255);
            this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.vcBuffer);
            this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.data.tcBuffer);
            this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
            this.gl.bindTexture(this.gl.TEXTURE_2D, particle.data.texture);
            this.gl.uniform1i(this.sprogram.samplerUniform, 0);
            this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);

            this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);

            this.mstack.pop();
        }
    }

    onParticleDead(particle) { }

    updateMatrix(particle) {
        const moveOriginMatrix = WebGLUtil.makeTranslation(-particle.data.textureWidth / 2, -particle.data.textureHeight / 2);
        const translationMatrix = WebGLUtil.makeTranslation(particle.p.x, particle.p.y);

        const angel = particle.rotation * (MathUtil.PI_180);
        const rotationMatrix = WebGLUtil.makeRotation(angel);

        const scale = particle.scale * particle.data.oldScale;
        const scaleMatrix = WebGLUtil.makeScale(scale, scale);
        let matrix = WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);

        matrix = WebGLUtil.matrixMultiply(matrix, rotationMatrix);
        matrix = WebGLUtil.matrixMultiply(matrix, translationMatrix);

        Mat3.inverse(matrix, particle.data.imat);
        matrix[2] = particle.alpha;

        this.mstack.push(matrix);
    }
}