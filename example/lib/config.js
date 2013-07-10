var configArr = ["domReady"];
var configObj = {
	baseUrl : "../../../src/",
};
var shim = {};
var paths = {
	"Proton" : "core/Proton",
	"EventDispatcher" : "events/EventDispatcher",
	"Event" : "events/Event",
	"Util" : "utils/Util",
	"WebGLUtil" : "utils/WebGLUtil",
	"DomUtil" : "utils/DomUtil",
	"MStack" : "utils/MStack",
	"Particle" : "core/Particle",
	"ParticlePool" : "core/ParticlePool",

	"MathUtils" : "math/MathUtils",
	"NumericalIntegration" : "math/NumericalIntegration",
	"Vector2D" : "math/Vector2D",
	"Polar2D" : "math/Polar2D",
	"Span" : "math/Span",
	"ColorSpan" : "math/ColorSpan",
	"Rectangle" : "math/Rectangle",
	"Mat3" : "math/Mat3",
	"Behaviour" : "behaviour/Behaviour",

	"Rate" : "initialize/Rate",
	"Initialize" : "initialize/Initialize",
	"InitializeUtil" : "initialize/InitializeUtil",
	"Life" : "initialize/Life",
	"Position" : "initialize/Position",
	"Velocity" : "initialize/Velocity",
	"Mass" : "initialize/Mass",
	"Radius" : "initialize/Radius",
	"ImageTarget" : "initialize/ImageTarget",

	"Force" : "behaviour/Force",
	"Attraction" : "behaviour/Attraction",
	"RandomDrift" : "behaviour/RandomDrift",
	"Repulsion" : "behaviour/Repulsion",
	"Gravity" : "behaviour/Gravity",
	"Collision" : "behaviour/Collision",
	"CrossZone" : "behaviour/CrossZone",
	"Alpha" : "behaviour/Alpha",
	"Scale" : "behaviour/Scale",
	"Rotate" : "behaviour/Rotate",
	"Color" : "behaviour/Color",
	"GravityWell" : "behaviour/GravityWell",

	"Emitter" : "emitter/Emitter",
	"BehaviourEmitter" : "emitter/BehaviourEmitter",
	"FollowEmitter" : "emitter/FollowEmitter",

	"ease" : "plus/ease",
	"requestAnimationFrame" : "plus/requestAnimationFrame",

	"Renderer" : "render/Renderer",
	"BaseRender" : "render/BaseRender",
	"DomRender" : "render/DomRender",
	"EaselRender" : "render/EaselRender",
	"CanvasRender" : "render/CanvasRender",
	"PixelRender" : "render/PixelRender",
	"WebGLRender" : "render/WebGLRender",

	"Zone" : "zone/Zone",
	"LineZone" : "zone/LineZone",
	"CircleZone" : "zone/CircleZone",
	"PointZone" : "zone/PointZone",
	"RectZone" : "zone/RectZone",
	"ImageZone" : "zone/ImageZone",

	"log" : "debug/log",
	"Debug" : "debug/Debug"
}

for (var index in paths) {
	configArr.push(index);

	//*****************Proton*****************//
	if (index == "Proton") {
		shim[index] = {
			exports : "Proton"
		};
	}
	//*****************math*****************//
	else if (index == "Span") {
		shim[index] = {
			deps : ["Proton", "MathUtils"]
		};
	} else if (index == "ColorSpan" || index == "SpanAB") {
		shim[index] = {
			deps : ["Proton", "Util", "Span"]
		};
	} else if (index == "Polar2D") {
		shim[index] = {
			deps : ["Proton", "Vector2D"]
		};
	} else if (index == "NumericalIntegration") {
		shim[index] = {
			deps : ["Proton", "Util"]
		};
	}
	//*****************util*****************//
	else if (index == "Util") {
		shim[index] = {
			deps : ["Proton", "Vector2D", "DomUtil"]
		};
	} else if (index == "MStack") {
		shim[index] = {
			deps : ["Proton", "Mat3"]
		};
	}
	//*****************core*****************//
	else if (index == "Particle") {
		shim[index] = {
			deps : ["Proton", "Vector2D", "Util"]
		};
	} else if (index == "ParticlePool") {
		shim[index] = {
			deps : ["Proton", "Particle"]
		};
	}
	//*****************events*****************//
	else if (index == "Event") {
		shim[index] = {
			deps : ["Proton", "Util"]
		};
	}
	//*****************emitter*****************//
	else if (index == "Emitter") {
		shim[index] = {
			deps : ["Proton", "InitializeUtil", "Event", "Util", "EventDispatcher", "Particle", "Rate"]
		};
	} else if (index == "BehaviourEmitter" || index == "FollowEmitter") {
		shim[index] = {
			deps : ["Proton", "Util", "Emitter"]
		};
	}
	//*****************initialize*****************//
	else if (index == "InitializeUtil") {
		shim[index] = {
			deps : ["Proton", "Util"]
		};
	} else if (index == "Initialize") {
		shim[index] = {
			deps : ["Proton", "InitializeUtil"]
		};
	} else if (index == "Color" || index == "Radius" || index == "Life" || index == "Mass" || index == "Position" || index == "Rate" || index == "ImageTarget" || index == "Velocity") {
		shim[index] = {
			deps : ["Proton", "Util", "Initialize"]
		};
	} else if (index == "GravityWell") {
		shim[index] = {
			deps : ["Proton", "Util", "Initialize"]
		};
	}
	//*****************behaviour*****************//
	else if (index == "Behaviour") {
		shim[index] = {
			deps : ["Proton", "Util"]
		};
	} else if (index == "CrossZone" || index == "Attraction" || index == "Collision" || index == "Force" || index == "CrossZone" || index == "RandomDrift" || index == "Scale" || index == "Alpha" || index == "Rotate") {
		shim[index] = {
			deps : ["Proton", "Util", "Behaviour", "Vector2D"]
		};
	} else if (index == "Gravity") {
		shim[index] = {
			deps : ["Proton", "Util", "Force"]
		};
	} else if (index == "Repulsion") {
		shim[index] = {
			deps : ["Proton", "Util", "Attraction"]
		};
	}
	//*****************zone*****************//
	else if (index == "Zone") {
		shim[index] = {
			deps : ["Proton", "Vector2D"]
		};
	} else if (index == "CircleZone" || index == "LineZone" || index == "PointZone" || index == "ImageZone" || index == "RectZone") {
		shim[index] = {
			deps : ["Proton", "Util", "Zone"]
		};
	}
	//*****************render*****************//
	else if (index == "DomRender" || index == "CanvasRender" || index == "EaselRender" || index == "PixelRender") {
		shim[index] = {
			deps : ["Proton", "Util", "BaseRender", "DomUtil"]
		};
	} else if (index == "WebGLRender") {
		shim[index] = {
			deps : ["Proton", "Util", "BaseRender", "MStack", "Mat3", "WebGLUtil"]
		};
	} else if (index == "Renderer") {
		shim[index] = {
			deps : ["Proton", "BaseRender", "CanvasRender", "DomRender", "EaselRender", "PixelRender", "WebGLRender"]
		};
	} else if (index == "Debug") {
		shim[index] = {
			deps : ["Proton", "Util"]
		};
	} else {
		//EventDispatcher\Vector2D\MathUtils\BaseRender\Rectangle\all-plus
		shim[index] = {
			deps : ["Proton"]
		};
	}
}

configObj.paths = paths;
configObj.shim = shim;
configObj.out = 'abc.js';
require.config(configObj);
require(configArr, function(domReady, Proton) {
	domReady(function() {
		Main(Proton);
	});
});
