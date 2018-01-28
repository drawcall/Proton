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
		src: 'pixijs-game',
		url: 'game/pixijs/pixi-game'
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



	////////////////////////////// INIT //////////////////////////////
	function init() {
		hljs.initHighlightingOnLoad();

		// set example
		setExample('Sparks', sparksArr);
		setExample('Behaviour', behaviourArr);
		setExample('Game', gameArr);
		setExample('Renderer', renderArr);
		setExample('Emitter', emitterArr);
		setExample('Zone', zoneArr);

		// set scroll 
		setScrollTo($('#about'), $('#about-page'));
		setScrollTo($('#examples'), $('#examples-page'), 400);
		setScrollTo($('#demo2'), $('#examples-page'), 400);
		setScrollTo($('#home'), 0);

		setHeadBtn();
	}

	function setHeadBtn() {
		$('.head-btn').on('mouseenter', function () {
			//AniX.to($(this).find('span')[0], .35, { scale: .88, color: '#eee' });
			AniX.to($(this)[0], .35, { y: 4 });
		});

		$('.head-btn').on('mouseleave', function () {
			//AniX.to($(this).find('span')[0], .2, { scale: 1, color: '#fff'  });
			AniX.to($(this)[0], .35, { y: 0 });
		});
	}

	function setExample(bt, demos) {
		var container = $('<div class="container all_demos"></div>');
		var bT = $('<h3>' + bt + '</h3>');
		container.append(bT);

		for (var i = 0; i < demos.length; i++) {
			var demoImgCon = $('<div class="demo-pic"><img src="image/examples/' + demos[i].src + '.jpg"></img></div>').css({
				width: '210px',
				height: '120px',
				overflow: 'hidden'
			});
			var div = $('<div class="span3 demo"></div>');
			var title = $('<span class="demo-title">' + demos[i].src + '</span>');
			var src = './example/' + demos[i].url + '.html';

			div.append(demoImgCon);
			div.append(title);
			container.append(div);

			makeButton(div);
			div.click({
				src: src
			}, function (e) {
				window.open(e.data.src, '_blank');
			});
		}
		$('#demos').append(container);
	}

	function makeButton(div) {
		div.on('mouseenter', function () {
			var time = .5;
			var img = $(this).find('.demo-pic img');
			var title = $(this).find('.demo-title');

			AniX.to(this, time, { opacity: .75 });
			AniX.to(img[0], time, { scale: 1.3 });
			AniX.to(title[0], time, { color: '#000' });
		});

		div.on('mouseleave', function () {
			var time = .3;
			var img = $(this).find('.demo-pic img');
			var title = $(this).find('.demo-title');

			AniX.to(this, time, { opacity: 1 });
			AniX.to(img[0], time, { scale: 1 });
			AniX.to(title[0], time, { color: '#999' });
		});
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