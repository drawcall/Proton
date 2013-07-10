(function(Proton, undefined) {
	function WebGLRender(proton, element) {
		WebGLRender._super_.call(this, proton, element);
		this.gl = this.element.getContext('experimental-webgl', {
			antialias : true,
			stencil : false,
			depth : false
		});
		if (!this.gl)
			alert("Sorry your browser do not suppest WebGL!");
		this.initVar();
		this.setMaxRadius();
		this.initShaders();
		this.initBuffers();
		this.gl.blendEquation(this.gl.FUNC_ADD);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.BLEND);
	}


	Proton.Util.inherits(WebGLRender, Proton.BaseRender);
	WebGLRender.prototype.resize = function(width, height) {
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

	WebGLRender.prototype.setMaxRadius = function(radius) {
		this.circleCanvasURL = this.createCircle(radius);
	}

	WebGLRender.prototype.getVertexShader = function() {
		var vsSource = ["uniform vec2 viewport;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 tMat;", "varying vec2 vTextureCoord;", "varying float alpha;", "void main() {", "vec3 v = tMat * vec3(aVertexPosition, 1.0);", "gl_Position = vec4(v.x, v.y, 0, 1);", "vTextureCoord = aTextureCoord;", "alpha = tMat[0][2];", "}"].join("\n");
		return vsSource;
	}

	WebGLRender.prototype.getFragmentShader = function() {
		var fsSource = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying float alpha;", "uniform sampler2D uSampler;", "uniform vec4 color;", "uniform bool useTexture;", "uniform vec3 uColor;", "void main() {", "vec4 textureColor = texture2D(uSampler, vTextureCoord);", "gl_FragColor = textureColor * vec4(uColor, 1.0);", "gl_FragColor.w *= alpha;", "}"].join("\n");
		return fsSource;
	}

	WebGLRender.prototype.initVar = function() {
		this.mstack = new Proton.MStack();
		this.umat = Proton.Mat3.create([2, 0, 1, 0, -2, 0, -1, 1, 1]);
		this.smat = Proton.Mat3.create([1 / 100, 0, 1, 0, 1 / 100, 0, 0, 0, 1]);
		this.texturebuffers = {};
	}

	WebGLRender.prototype.start = function() {
		WebGLRender._super_.prototype.start.call(this);
		this.resize(this.element.width, this.element.height);
	}

	WebGLRender.prototype.blendEquation = function(A) {
		this.gl.blendEquation(this.gl[A]);
	}

	WebGLRender.prototype.blendFunc = function(A, B) {
		this.gl.blendFunc(this.gl[A], this.gl[B]);
	}

	WebGLRender.prototype.getShader = function(gl, str, fs) {
		var shader;
		if (fs)
			shader = gl.createShader(gl.FRAGMENT_SHADER);
		else
			shader = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			alert(gl.getShaderInfoLog(shader));
			return null;
		}
		return shader;
	}

	WebGLRender.prototype.initShaders = function() {
		var fragmentShader = this.getShader(this.gl, this.getFragmentShader(), true);
		var vertexShader = this.getShader(this.gl, this.getVertexShader(), false);

		this.sprogram = this.gl.createProgram();
		this.gl.attachShader(this.sprogram, vertexShader);
		this.gl.attachShader(this.sprogram, fragmentShader);
		this.gl.linkProgram(this.sprogram);
		if (!this.gl.getProgramParameter(this.sprogram, this.gl.LINK_STATUS))
			alert("Could not initialise shaders");

		this.gl.useProgram(this.sprogram);
		this.sprogram.vpa = this.gl.getAttribLocation(this.sprogram, "aVertexPosition");
		this.sprogram.tca = this.gl.getAttribLocation(this.sprogram, "aTextureCoord");
		this.gl.enableVertexAttribArray(this.sprogram.tca);
		this.gl.enableVertexAttribArray(this.sprogram.vpa);

		this.sprogram.tMatUniform = this.gl.getUniformLocation(this.sprogram, "tMat");
		this.sprogram.samplerUniform = this.gl.getUniformLocation(this.sprogram, "uSampler");
		this.sprogram.useTex = this.gl.getUniformLocation(this.sprogram, "useTexture");
		this.sprogram.color = this.gl.getUniformLocation(this.sprogram, "uColor");
		this.gl.uniform1i(this.sprogram.useTex, 1);
	};

	WebGLRender.prototype.initBuffers = function() {
		this.unitIBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
		var vs = [0, 3, 1, 0, 2, 3];
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vs), this.gl.STATIC_DRAW);

		var ids = [];
		for (var i = 0; i < 100; i++)
			ids.push(i);

		idx = new Uint16Array(ids);
		this.unitI33 = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitI33);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);

		ids = [];
		for ( i = 0; i < 100; i++)
			ids.push(i, i + 1, i + 2);

		idx = new Uint16Array(ids);
		this.stripBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.stripBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, idx, this.gl.STATIC_DRAW);
	};

	WebGLRender.prototype.createCircle = function(raidus) {
		this.circleCanvasRadius = Proton.WebGLUtil.nhpot(Proton.Util.initValue(raidus, 32));
		var canvas = Proton.DomUtil.createCanvas('circle_canvas', this.circleCanvasRadius * 2, this.circleCanvasRadius * 2);
		var context = canvas.getContext('2d');
		context.beginPath();
		context.arc(this.circleCanvasRadius, this.circleCanvasRadius, this.circleCanvasRadius, 0, Math.PI * 2, true);
		context.closePath();
		context.fillStyle = '#FFF';
		context.fill();
		return canvas.toDataURL();
	};

	WebGLRender.prototype.setImgInCanvas = function(particle) {
		var _w = particle.target.width;
		var _h = particle.target.height;
		var _width = Proton.WebGLUtil.nhpot(particle.target.width);
		var _height = Proton.WebGLUtil.nhpot(particle.target.height);
		var _scaleX = particle.target.width / _width;
		var _scaleY = particle.target.height / _height;

		if (!this.texturebuffers[particle.transform.src])
			this.texturebuffers[particle.transform.src] = [this.gl.createTexture(), this.gl.createBuffer(), this.gl.createBuffer()];
		particle.transform.texture = this.texturebuffers[particle.transform.src][0];
		particle.transform.vcBuffer = this.texturebuffers[particle.transform.src][1];
		particle.transform.tcBuffer = this.texturebuffers[particle.transform.src][2];
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.tcBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _scaleX, 0.0, 0.0, _scaleY, _scaleY, _scaleY]), this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.vcBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, _w, 0.0, 0.0, _h, _w, _h]), this.gl.STATIC_DRAW);

		var context = particle.transform.canvas.getContext('2d');
		var data = context.getImageData(0, 0, _width, _height);

		this.gl.bindTexture(this.gl.TEXTURE_2D, particle.transform.texture);
		this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, data);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST);
		this.gl.generateMipmap(this.gl.TEXTURE_2D);
		particle.transform.textureLoaded = true;
		particle.transform.textureWidth = _w;
		particle.transform.textureHeight = _h;
	}

	WebGLRender.prototype.setStroke = function(color, thinkness) {

	}

	WebGLRender.prototype.onProtonUpdate = function() {
		//this.gl.clearColor(0, 0, 0, 1);
		//this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	WebGLRender.prototype.onParticleCreated = function(particle) {
		var self = this;
		particle.transform.textureLoaded = false;
		particle.transform.tmat = Proton.Mat3.create();
		particle.transform.tmat[8] = 1;
		particle.transform.imat = Proton.Mat3.create();
		particle.transform.imat[8] = 1;
		if (particle.target) {
			Proton.Util.getImage(particle.target, particle, true, function(particle) {
				self.setImgInCanvas.call(self, particle);
				particle.transform.oldScale = 1;
			});
		} else {
			Proton.Util.getImage(this.circleCanvasURL, particle, true, function(particle) {
				self.setImgInCanvas.call(self, particle);
				particle.transform.oldScale = particle.radius / self.circleCanvasRadius;
			});
		}
	}

	WebGLRender.prototype.onParticleUpdate = function(particle) {
		if (particle.transform.textureLoaded) {
			this.updateMatrix(particle);
			this.gl.uniform3f(this.sprogram.color, particle.transform.rgb.r / 255, particle.transform.rgb.g / 255, particle.transform.rgb.b / 255);
			this.gl.uniformMatrix3fv(this.sprogram.tMatUniform, false, this.mstack.top());
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.vcBuffer);
			this.gl.vertexAttribPointer(this.sprogram.vpa, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.bindBuffer(this.gl.ARRAY_BUFFER, particle.transform.tcBuffer);
			this.gl.vertexAttribPointer(this.sprogram.tca, 2, this.gl.FLOAT, false, 0, 0);
			this.gl.bindTexture(this.gl.TEXTURE_2D, particle.transform.texture);
			this.gl.uniform1i(this.sprogram.samplerUniform, 0);
			this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.unitIBuffer);
			this.gl.drawElements(this.gl.TRIANGLES, 6, this.gl.UNSIGNED_SHORT, 0);
			this.mstack.pop();
		}
	}

	WebGLRender.prototype.onParticleDead = function(particle) {
		
	}

	WebGLRender.prototype.updateMatrix = function(particle) {
		var moveOriginMatrix = Proton.WebGLUtil.makeTranslation(-particle.transform.textureWidth / 2, -particle.transform.textureHeight / 2);
		var translationMatrix = Proton.WebGLUtil.makeTranslation(particle.p.x, particle.p.y);
		var angel = particle.rotation * (Math.PI / 180);
		var rotationMatrix = Proton.WebGLUtil.makeRotation(angel);
		var scale = particle.scale * particle.transform.oldScale;
		var scaleMatrix = Proton.WebGLUtil.makeScale(scale, scale);

		var matrix = Proton.WebGLUtil.matrixMultiply(moveOriginMatrix, scaleMatrix);
		matrix = Proton.WebGLUtil.matrixMultiply(matrix, rotationMatrix);
		matrix = Proton.WebGLUtil.matrixMultiply(matrix, translationMatrix);

		Proton.Mat3.inverse(matrix, particle.transform.imat);
		matrix[2] = particle.alpha;
		this.mstack.push(matrix);
	}

	Proton.WebGLRender = WebGLRender;
})(Proton);
