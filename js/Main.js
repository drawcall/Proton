$(document).ready(function () {

	var sparksArr = [{
		src: 'sun',
		url: 'sparks/sun/sun'
	}, {
		src: 'fireball',
		url: 'sparks/sun/fireball'
	}, {
		src: 'eightDiagrams',
		url: 'sparks/eightDiagrams/eightDiagrams'
	}, {
		src: 'bomb',
		url: 'sparks/bomb/bomb'
	}, {
		src: 'drugs',
		url: 'sparks/drugs/drugs'
	}, {
		src: 'fireworks',
		url: 'sparks/firework/fireworks'
	}, {
		src: 'bigfire',
		url: 'sparks/bigfire/bigfire'
	}];

	var behaviourArr = [{
		src: 'attraction1',
		url: 'behaviour/attraction/attraction1'
	}, {
		src: 'attraction2',
		url: 'behaviour/attraction/attraction2'
	}, {
		src: 'collision',
		url: 'behaviour/collision/collision'
	}, {
		src: 'collisionBall',
		url: 'behaviour/collision/collisionBall'
	}, {
		src: 'circle',
		url: 'behaviour/custom/circle'
	}, {
		src: 'star',
		url: 'behaviour/force/star'
	}, {
		src: 'randomdirft2',
		url: 'behaviour/randomDirft/randomdirft2'
	}, {
		src: 'randomdirft3',
		url: 'behaviour/randomDirft/randomdirft3'
	}, {
		src: 'rotate',
		url: 'behaviour/rotate/rotate'
	}, {
		src: 'fireflies',
		url: 'behaviour/repulsion/fireflies'
	}, {
		src: 'repulsion',
		url: 'behaviour/repulsion/repulsion'
	}, {
		src: 'color',
		url: 'behaviour/color/color'
	}];

	var gameArr = [{
		src: 'collie',
		url: 'game/colliejs/collie'
	}, {
		src: 'easeljs',
		url: 'game/easeljs/easeljs'
	}, {
		src: 'asteroids',
		url: 'game/crafty/asteroids'
	}, {
		src: 'quarkjs',
		url: 'game/quarkjs/squirrel'
	}];

	var renderArr = [{
		src: 'pixelrender',
		url: 'render/pixel/pixelrender'
	}, {
		src: 'google',
		url: 'render/pixel/google'
	}, {
		src: 'dom',
		url: 'render/dom/domrender'
	}, {
		src: 'createjs',
		url: 'render/easeljs/easeljs'
	}, {
		src: 'webglrender',
		url: 'render/webgl/webglrender'
	}, {
		src: 'pixijs',
		url: 'render/pixi/pixirender'
	}];

	var emitterArr = [{
		src: 'emitter',
		url: 'helloworld/emitter/emitter'
	}, {
		src: 'followEmitter',
		url: 'emitter/followEmitter/followEmitter'
	}, {
		src: 'mouseDown',
		url: 'emitter/followEmitter/mouseDown'
	}, {
		src: 'Spitfire',
		url: 'initialize/imagetarget/Spitfire'
	}, {
		src: 'imagetarget',
		url: 'initialize/imagetarget/imagetarget'
	}];

	var zoneArr = [{
		src: 'circlezone',
		url: 'zone/circlezone/circlezone'
	}, {
		src: 'imagezone',
		url: 'zone/imagezone/imagezone'
	}, {
		src: 'linezone',
		url: 'zone/linezone/bound'
	}, {
		src: 'pointzone',
		url: 'zone/pointzone/pointzone'
	}];
	function init() {
		hljs.initHighlightingOnLoad();
		setExample('Sparks', sparksArr);
		setExample('Behaviour', behaviourArr);
		setExample('Game', gameArr);
		setExample('Renderer', renderArr);
		setExample('Emitter', emitterArr);
		setExample('Zone', zoneArr);

		setScrollTo($('#about'), $('#about-page'));
		setScrollTo($('#examples'), $('#examples-page'), 400);
		setScrollTo($('#demo2'), $('#examples-page'), 400);
		setScrollTo($('#home'), 0);
	}

	function setExample(bt, demos) {
		var container = $('<div class="container all_demos"></div>');
		var bT = $('<h3>' + bt + '</h3>');
		container.append(bT);
		for (var i = 0; i < demos.length; i++) {
			var image = $('<img src=image/examples/' + demos[i].src + '.jpg>');
			var div = $('<div class="span3 demo"></div>');
			var title = $('<span>' + demos[i].src + '</span>');
			var src = './example/' + demos[i].url + '.html';
			div.append(image);
			div.append(title);
			container.append(div);

			div.click({
				src: src
			}, function (e) {
				window.open(e.data.src, '_blank');
			});
		}
		$('#demos').append(container);
	}

	function setScrollTo($btn, $target, $time) {
		var time = $time ? $time : 500;
		var top = $target === 0 ? 0 : $target.offset().top;

		$btn.click(function () {
			$('html, body').animate({
				scrollTop: top
			}, time);
		});
	}

	init();
})