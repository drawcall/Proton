const SPARKS_ARR = [
  {
    thumb: "sun",
    url:
      "https://codesandbox.io/s/proton-sun-fwyt8?fontsize=14&module=%2Fsrc%2Fcomponents%2FParticles.jsx",
    local: "./examples/sparks/sun/sun.html"
  },
  {
    thumb: "fireball",
    local: "./examples/sparks/sun/fireball.html"
  },
  {
    thumb: "eight-diagrams",
    local: "./examples/sparks/eightDiagrams/eightDiagrams.html"
  },
  {
    thumb: "bomb",
    url:
      "https://codesandbox.io/s/proton-bomb-iowjm?fontsize=14&hidenavigation=1&view=preview",
    local: "./examples/sparks/bomb/bomb.html"
  },
  {
    thumb: "fire-dragon",
    url: "https://codesandbox.io/s/proton-fire-dragon-k6ozi"
  },
  {
    thumb: "fireworks",
    local: "./examples/sparks/firework/fireworks.html"
  },
  {
    thumb: "bigfire",
    local: "./examples/sparks/bigfire/bigfire.html"
  },
  {
    thumb: "drugs",
    local: "./examples/sparks/drugs/drugs.html"
  }
];

const BEHAVIOUR_ARR = [
  {
    thumb: "attraction",
    local: "./examples/behaviour/attraction/attraction1.html"
  },
  {
    thumb: "gravitation",
    local: "./examples/behaviour/attraction/attraction2.html"
  },
  {
    thumb: "tadpole",
    url:
      "https://codesandbox.io/s/proton-tadpole-yt6qu?fontsize=14&module=%2Fsrc%2Fcomponents%2FParticles.vue"
  },
  {
    thumb: "collision",
    local: "./examples/behaviour/collision/collision.html"
  },
  {
    thumb: "collision-ball",
    local: "./examples/behaviour/collision/collisionBall.html"
  },
  {
    thumb: "circle",
    local: "./examples/behaviour/custom/circle.html"
  },
  {
    thumb: "star",
    local: "./examples/behaviour/force/star.html"
  },
  {
    thumb: "randomdirft2",
    local: "./examples/behaviour/randomDirft/randomdirft2.html"
  },
  {
    thumb: "randomdirft3",
    url:
      "https://codesandbox.io/s/proton-randomdirft3-syk9b?fontsize=14&module=%2Fsrc%2Fcomponents%2FParticles.vue"
  },
  {
    thumb: "rotate",
    local: "./examples/behaviour/rotate/rotate.html"
  },
  {
    thumb: "fireflies",
    local: "./examples/behaviour/repulsion/fireflies.html"
  },
  {
    thumb: "repulsion",
    local: "./examples/behaviour/repulsion/repulsion.html"
  },
  {
    thumb: "color",
    local: "./examples/behaviour/color/color.html"
  },
  {
    thumb: "cyclone",
    url: "https://codesandbox.io/s/proton-cyclone-rzweu?fontsize=14&hidenavigation=1&module=%2Fsrc%2Fcomponents%2FParticles.vue&theme=dark"
  }
];

const GAME_ARR = [
  {
    thumb: "pixijs",
    local: "./examples/game/pixijs/pixi-game.html"
  },
  {
    thumb: "easeljs",
    local: "./examples/game/easeljs/easeljs.html"
  },
  {
    thumb: "phaser",
    local: "./examples/game/phaser/phaser.html"
  },
  {
    thumb: "asteroids",
    local: "./examples/game/crafty/asteroids.html"
  },
  {
    thumb: "collie",
    local: "./examples/game/colliejs/collie.html"
  },
  {
    thumb: "spritejs",
    url: "http://spritejs.org/demo/#/proton/fire"
  },
  {
    thumb: "quarkjs",
    local: "./examples/game/quarkjs/squirrel.html"
  },
  {
    thumb: "threejs",
    url:
      "https://a-jie.github.io/three.proton/"
  }
];

const RENDERER_ARR = [
  {
    thumb: "pixelrenderer",
    local: "./examples/render/pixel/pixelrender.html"
  },
  {
    thumb: "pixelrenderer-2",
    local: "./examples/render/pixel/google.html"
  },
  {
    thumb: "pixelrenderer-3",
    local: "./examples/render/pixel/thousand.html"
  },
  {
    thumb: "canvasrenderer",
    local: "./examples/render/dom/canvasVSdom.html"
  },
  {
    thumb: "domrenderer",
    local: "./examples/render/dom/domrender.html"
  },
  {
    thumb: "easelrenderer",
    local: "./examples/render/easeljs/easeljs.html"
  },
  {
    thumb: "webglrenderer",
    local: "./examples/render/webgl/webglrender.html"
  },
  {
    thumb: "pixirenderer",
    local: "./examples/render/pixi/pixirender.html"
  },
  {
    thumb: "pixirenderer-2",
    local: "./examples/render/pixi/pixi-mulirender.html"
  },
  {
    thumb: "customrenderer",
    local: "./examples/render/custom/custom-renderer.html"
  }
];

const EMITTER_ARR = [
  {
    thumb: "emitter",
    local: "./examples/helloworld/emitter/emitter.html"
  },
  {
    thumb: "follow-emitter",
    local: "./examples/emitter/followEmitter/followEmitter.html"
  },
  {
    thumb: "mouse-emitter",
    local: "./examples/emitter/followEmitter/mouseDown.html"
  },
  {
    thumb: "spitfire",
    local: "./examples/initialize/imagetarget/spitfire.html"
  },
  {
    thumb: "imagetarget",
    local: "./examples/initialize/imagetarget/imagetarget.html"
  },
  {
    thumb: "rock",
    local: "./examples/initialize/imagetarget/fire2.html"
  },
  {
    thumb: "bg-particle",
    local: "./examples/initialize/position/bg-particle.html"
  }
];

const ZONE_ARR = [
  {
    thumb: "circlezone",
    local: "./examples/zone/circlezone/circlezone.html"
  },
  {
    thumb: "imagezone",
    local: "./examples/zone/imagezone/imagezone.html"
  },
  {
    thumb: "linezone",
    local: "./examples/zone/linezone/bound.html"
  },
  {
    thumb: "pointzone",
    local: "./examples/zone/pointzone/pointzone.html"
  }
];

const ALL_EXAMPLES = {
  Sparks: SPARKS_ARR,
  Behaviour: BEHAVIOUR_ARR,
  Game: GAME_ARR,
  Renderer: RENDERER_ARR,
  Emitter: EMITTER_ARR,
  Zone: ZONE_ARR
};

export {
  ALL_EXAMPLES,
  SPARKS_ARR,
  BEHAVIOUR_ARR,
  GAME_ARR,
  RENDERER_ARR,
  EMITTER_ARR,
  ZONE_ARR
};
