var collie=collie||{};(function(){collie.version="1.1.0";collie.Class=function(g,f){var d=null;if("$init" in g){d=g.$init;
delete g.$init}var e=function(){if(d!==null){d.apply(this,arguments)}};if(typeof f!=="undefined"){e=function(){f.apply(this,arguments);
if(d!==null){d.apply(this,arguments)}};var c=function(){};c.prototype=f.prototype;e.$super=f.prototype;e.prototype=new c();
e.prototype.constructor=e}for(var b in g){if(g.hasOwnProperty(b)&&b!=="prototype"){e.prototype[b]=g[b]}}return e};collie.util=new (collie.Class({$init:function(){this._sCSSPrefix=null;
this._htDeviceInfo=null;this._bSupport3d=null;this._bSupportCSS3=null;this._htBoundary={left:0,right:0,top:0,bottom:0}},getDisplayObjectById:function(b){return collie.DisplayObject.htFactory[b]
},getDisplayObjectByName:function(c){for(var b in collie.DisplayObject.htFactory){if(collie.DisplayObject.htFactory[b].get("name")===c){return collie.DisplayObject.htFactory[b]
}}return false},getDeviceInfo:function(d){if(this._htDeviceInfo!==null&&typeof d==="undefined"){return this._htDeviceInfo
}var h=null;var k=false;var e=typeof CanvasRenderingContext2D!=="undefined";var c=false;var g=false;var b=false;var j=(/chrome/i.test(d))?true:false;
var d=d||navigator.userAgent;var f=0;if(/android/i.test(d)){c=true;h=d.toString().match(/android ([0-9]\.[0-9])\.?([0-9]?)/i);
if(h&&h[1]){f=(parseFloat(h[1])+(h[2]?h[2]*0.01:0)).toFixed(2)}}else{if(/(iphone|ipad|ipod)/i.test(d)){g=true;h=d.toString().match(/([0-9]_[0-9])/i);
if(h&&h[1]){f=parseFloat(h[1].replace(/_/,"."))}}else{k=true;if(/(MSIE)/i.test(d)){b=true;h=d.toString().match(/MSIE ([0-9])/i);
if(h&&h[1]){f=parseInt(h[1],10)}}}}this._htDeviceInfo={supportCanvas:e,desktop:k,android:c?f:false,ios:g?f:false,ie:b?f:false,chrome:j};
return this._htDeviceInfo},getCSSPrefix:function(g,c){var e="";if(this._sCSSPrefix===null){this._sCSSPrefix="";if(typeof document.body.style.webkitTransform!=="undefined"){this._sCSSPrefix="-webkit-"
}else{if(typeof document.body.style.MozTransform!=="undefined"){this._sCSSPrefix="-moz-"}else{if(typeof document.body.style.OTransform!=="undefined"){this._sCSSPrefix="-o-"
}else{if(typeof document.body.style.msTransform!=="undefined"){this._sCSSPrefix="-ms-"}}}}}e=this._sCSSPrefix+(g?g:"");if(c){var f=e.split("-");
e="";for(var d=0,b=f.length;d<b;d++){if(f[d]){e+=e?f[d].substr(0,1).toUpperCase()+f[d].substr(1):f[d]}}if(this._sCSSPrefix==="-moz-"||this._sCSSPrefix==="-o-"){e=e.substr(0,1).toUpperCase()+e.substr(1)
}}return e},getSupportCSS3:function(){if(this._bSupportCSS3===null){this._bSupportCSS3=typeof document.body.style[collie.util.getCSSPrefix("transform",true)]!=="undefined"||typeof document.body.style.transform!="undefined"
}return this._bSupportCSS3},getSupportCSS3d:function(){if(this._bSupport3d===null){this._bSupport3d=(typeof document.body.style[collie.util.getCSSPrefix("perspective",true)]!=="undefined"||typeof document.body.style.perspective!="undefined")&&(!collie.util.getDeviceInfo().android||collie.util.getDeviceInfo().android>=4)
}return this._bSupport3d},toRad:function(b){return b*Math.PI/180},toDeg:function(b){return b*180/Math.PI},approximateValue:function(b){return Math.round(b*10000000)/10000000
},fixAngle:function(b){var c=collie.util.toDeg(b);c-=Math.floor(c/360)*360;return collie.util.toRad(c)},getDistance:function(c,e,b,d){return Math.sqrt(Math.pow(b-c,2)+Math.pow(d-e,2))
},getBoundary:function(c){var h=c[0][0];var f=c[0][0];var g=c[0][1];var e=c[0][1];for(var d=1,b=c.length;d<b;d++){h=Math.min(h,c[d][0]);
f=Math.max(f,c[d][0]);g=Math.min(g,c[d][1]);e=Math.max(e,c[d][1])}return{left:h,right:f,top:g,bottom:e}},getBoundaryToPoints:function(b){return[[b.left,b.top],[b.right,b.top],[b.right,b.bottom],[b.left,b.bottom]]
},queryString:function(){var c={};if(location.search){var f=location.search.substr(1).split("&");for(var d=0,b=f.length;d<b;
d++){var e=f[d].split("=");c[e.shift()]=e.join("=")}}return c},cloneObject:function(b){var d={};for(var c in b){d[c]=b[c]
}return d},pushWithSort:function(f,e){var c=false;for(var d=0,b=f.length;d<b;d++){if(f[d]._htOption.zIndex>e._htOption.zIndex){f.splice(d,0,e);
c=true;break}}if(!c){f.push(e)}},addEventListener:function(c,e,d,b){if("addEventListener" in c){c.addEventListener(e,d,b)
}else{c.attachEvent("on"+e,d,b)}},removeEventListener:function(c,e,d,b){if("removeEventListener" in c){c.removeEventListener(e,d,b)
}else{c.detachEvent("on"+e,d,b)}},stopEventDefault:function(b){b=b||window.event;if("preventDefault" in b){b.preventDefault()
}b.returnValue=false},getPosition:function(d){var h=d.ownerDocument||d.document||document;var b=h.documentElement;var f=h.body;
var e={};if("getBoundingClientRect" in d){var c=d.getBoundingClientRect();e.x=c.left;e.x+=b.scrollLeft||f.scrollLeft;e.y=c.top;
e.y+=b.scrollTop||f.scrollTop;e.width=c.width;e.height=c.height}else{e.x=0;e.y=0;e.width=d.offsetWidth;e.height=d.offsetHeight;
for(var g=d;g;g=g.offsetParent){e.x+=g.offsetLeft;e.y+=g.offsetTop}for(var g=d.parentNode;g;g=g.parentNode){if(g.tagName==="BODY"){break
}if(g.tagName==="TR"){e.y+=2}e.x-=g.scrollLeft;e.y-=g.scrollTop}}return e}}))();if(collie.util.getDeviceInfo().ios){window.addEventListener("load",function(){setTimeout(function(){document.body.scrollTop=0
},300)})}if(!Function.prototype.bind){Function.prototype.bind=function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable")
}var f=Array.prototype.slice.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b,f.concat(Array.prototype.slice.call(arguments)))
};c.prototype=this.prototype;d.prototype=new c();return d}}var a=window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype;
if(a&&a.lineTo){a._dashedLineProperty={index:0,length:0};a.resetDashedLine=function(){this._dashedLineProperty={index:0,length:0}
};a.dashedLine=function(n,k,b,l,q,d){if(!q){q=[10,5]}var r=(b-n),p=(l-k);var g=Math.sqrt(r*r+p*p);var c=Math.atan2(p,r);var o=q.length;
var h=this._dashedLineProperty.index||0;var f=this._dashedLineProperty.length||0;var e=0;var m=0;var j=0;while(g>f){if(m!==0||f===0){f+=q[h++%o]*d
}if(f>g){this._dashedLineProperty.length=f-g;f=g}m=n+f*Math.cos(c);j=k+f*Math.sin(c);h%2===1?this.lineTo(m,j):this.moveTo(m,j)
}this._dashedLineProperty.index=h}}collie.raphaelDashArray={"":[0],none:[0],"-":[3,1],".":[1,1],"-.":[3,1,1,1],"-..":[3,1,1,1,1,1],". ":[1,3],"- ":[4,3],"--":[8,3],"- .":[4,3,1,3],"--.":[8,3,1,3],"--..":[8,3,1,3,1,3]}
})();collie.Effect=function(e){if(this instanceof arguments.callee){throw new Error("You can't create a instance of this")
}var c=/^(\-?[0-9\.]+)(%|px|pt|em)?$/,d=/^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i,f=/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i,b=/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i;
var a=function(h){var j=h,g;if(c.test(h)){j=parseFloat(h);g=RegExp.$2||""}else{if(d.test(h)){j=[parseInt(RegExp.$1,10),parseInt(RegExp.$2,10),parseInt(RegExp.$3,10)];
g="color"}else{if(f.test(h=h.replace(b,"#$1$1$2$2$3$3"))){j=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)];
g="color"}}}return{nValue:j,sUnit:g}};return function(j,k){var g;if(arguments.length>1){j=a(j);k=a(k);g=k.sUnit}else{k=a(j);
j=null;g=k.sUnit}if(j&&k&&j.sUnit!=k.sUnit){throw new Error("unit error")}j=j&&j.nValue;k=k&&k.nValue;var h=function(o){var m=e(o),q=function(p,r){return(r-p)*m+p+g
};if(g=="color"){var n=Math.max(0,Math.min(255,parseInt(q(j[0],k[0]),10)))<<16;n|=Math.max(0,Math.min(255,parseInt(q(j[1],k[1]),10)))<<8;
n|=Math.max(0,Math.min(255,parseInt(q(j[2],k[2]),10)));n=n.toString(16).toUpperCase();for(var l=0;6-n.length;l++){n="0"+n
}return"#"+n}return q(j,k)};if(j===null){h.setStart=function(l){l=a(l);if(l.sUnit!=g){throw new Error("unit eror")}j=l.nValue
}}return h}};collie.Effect.linear=collie.Effect(function(a){return a});collie.Effect.easeInSine=collie.Effect(function(a){return(a==1)?1:-Math.cos(a*(Math.PI/2))+1
});collie.Effect.easeOutSine=collie.Effect(function(a){return Math.sin(a*(Math.PI/2))});collie.Effect.easeInOutSine=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInSine(0,1)(2*a)*0.5:collie.Effect.easeOutSine(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInSine=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutSine(0,1)(2*a)*0.5:collie.Effect.easeInSine(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInQuad=collie.Effect(function(a){return a*a});collie.Effect.easeOutQuad=collie.Effect(function(a){return -(a*(a-2))
});collie.Effect.easeInOutQuad=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInQuad(0,1)(2*a)*0.5:collie.Effect.easeOutQuad(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInQuad=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutQuad(0,1)(2*a)*0.5:collie.Effect.easeInQuad(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInCubic=collie.Effect(function(a){return Math.pow(a,3)});collie.Effect.easeOutCubic=collie.Effect(function(a){return Math.pow((a-1),3)+1
});collie.Effect.easeInOutCubic=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeIn(0,1)(2*a)*0.5:collie.Effect.easeOut(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInCubic=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOut(0,1)(2*a)*0.5:collie.Effect.easeIn(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInQuart=collie.Effect(function(a){return Math.pow(a,4)});collie.Effect.easeOutQuart=collie.Effect(function(a){return -(Math.pow(a-1,4)-1)
});collie.Effect.easeInOutQuart=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInQuart(0,1)(2*a)*0.5:collie.Effect.easeOutQuart(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInQuart=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutQuart(0,1)(2*a)*0.5:collie.Effect.easeInQuart(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInQuint=collie.Effect(function(a){return Math.pow(a,5)});collie.Effect.easeOutQuint=collie.Effect(function(a){return Math.pow(a-1,5)+1
});collie.Effect.easeInOutQuint=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInQuint(0,1)(2*a)*0.5:collie.Effect.easeOutQuint(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInQuint=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutQuint(0,1)(2*a)*0.5:collie.Effect.easeInQuint(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInCircle=collie.Effect(function(a){return -(Math.sqrt(1-(a*a))-1)});collie.Effect.easeOutCircle=collie.Effect(function(a){return Math.sqrt(1-(a-1)*(a-1))
});collie.Effect.easeInOutCircle=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInCircle(0,1)(2*a)*0.5:collie.Effect.easeOutCircle(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInCircle=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutCircle(0,1)(2*a)*0.5:collie.Effect.easeInCircle(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInBack=collie.Effect(function(a){var b=1.70158;return(a==1)?1:(a/1)*(a/1)*((1+b)*a-b)});collie.Effect.easeOutBack=collie.Effect(function(a){var b=1.70158;
return(a===0)?0:(a=a/1-1)*a*((b+1)*a+b)+1});collie.Effect.easeInOutBack=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInBack(0,1)(2*a)*0.5:collie.Effect.easeOutBack(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInElastic=collie.Effect(function(c){var d=0,b=0,e;if(c===0){return 0}if((c/=1)==1){return 1}if(!d){d=0.3
}if(!b||b<1){b=1;e=d/4}else{e=d/(2*Math.PI)*Math.asin(1/b)}return -(b*Math.pow(2,10*(c-=1))*Math.sin((c-1)*(2*Math.PI)/d))
});collie.Effect.easeOutElastic=collie.Effect(function(c){var d=0,b=0,e;if(c===0){return 0}if((c/=1)==1){return 1}if(!d){d=0.3
}if(!b||b<1){b=1;e=d/4}else{e=d/(2*Math.PI)*Math.asin(1/b)}return(b*Math.pow(2,-10*c)*Math.sin((c-e)*(2*Math.PI)/d)+1)});
collie.Effect.easeInOutElastic=collie.Effect(function(c){var d=0,b=0,e;if(c===0){return 0}if((c/=1/2)==2){return 1}if(!d){d=(0.3*1.5)
}if(!b||b<1){b=1;e=d/4}else{e=d/(2*Math.PI)*Math.asin(1/b)}if(c<1){return -0.5*(b*Math.pow(2,10*(c-=1))*Math.sin((c-e)*(2*Math.PI)/d))
}return b*Math.pow(2,-10*(c-=1))*Math.sin((c-e)*(2*Math.PI)/d)*0.5+1});collie.Effect.easeOutBounce=collie.Effect(function(a){if(a<(1/2.75)){return(7.5625*a*a)
}else{if(a<(2/2.75)){return(7.5625*(a-=(1.5/2.75))*a+0.75)}else{if(a<(2.5/2.75)){return(7.5625*(a-=(2.25/2.75))*a+0.9375)
}else{return(7.5625*(a-=(2.625/2.75))*a+0.984375)}}}});collie.Effect.easeInBounce=collie.Effect(function(a){return 1-collie.Effect.easeOutBounce(0,1)(1-a)
});collie.Effect.easeInOutBounce=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInBounce(0,1)(2*a)*0.5:collie.Effect.easeOutBounce(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeInExpo=collie.Effect(function(a){return(a===0)?0:Math.pow(2,10*(a-1))});collie.Effect.easeOutExpo=collie.Effect(function(a){return(a==1)?1:-Math.pow(2,-10*a/1)+1
});collie.Effect.easeInOutExpo=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeInExpo(0,1)(2*a)*0.5:collie.Effect.easeOutExpo(0,1)((2*a)-1)*0.5+0.5
});collie.Effect.easeOutInExpo=collie.Effect(function(a){return(a<0.5)?collie.Effect.easeOutExpo(0,1)(2*a)*0.5:collie.Effect.easeInExpo(0,1)((2*a)-1)*0.5+0.5
});collie.Effect._cubicBezier=function(b,d,a,c){return function(o){var l=3*b,n=3*(a-b)-l,e=1-l-n,k=3*d,m=3*(c-d)-k,p=1-k-m;
function j(q){return((e*q+n)*q+l)*q}function h(q){return((p*q+m)*q+k)*q}function f(q){return(3*e*q+2*n)*q+l}function g(q,y){var w,v,t,r,u,s;
for(t=q,s=0;s<8;s++){r=j(t)-q;if(Math.abs(r)<y){return t}u=f(t);if(Math.abs(u)<0.000001){break}t=t-r/u}w=0;v=1;t=q;if(t<w){return w
}if(t>v){return v}while(w<v){r=j(t);if(Math.abs(r-q)<y){return t}if(q>r){w=t}else{v=t}t=(v-w)*0.5+w}return t}return h(g(o,1/200))
}};collie.Effect.cubicBezier=function(b,d,a,c){return collie.Effect(collie.Effect._cubicBezier(b,d,a,c))};collie.Effect.cubicEase=collie.Effect.cubicBezier(0.25,0.1,0.25,1);
collie.Effect.cubicEaseIn=collie.Effect.cubicBezier(0.42,0,1,1);collie.Effect.cubicEaseOut=collie.Effect.cubicBezier(0,0,0.58,1);
collie.Effect.cubicEaseInOut=collie.Effect.cubicBezier(0.42,0,0.58,1);collie.Effect.cubicEaseOutIn=collie.Effect.cubicBezier(0,0.42,1,0.58);
collie.Effect.overphase=collie.Effect(function(a){a/=0.652785;return(Math.sqrt((2-a)*a)+(0.1*a)).toFixed(5)});collie.Effect.sinusoidal=collie.Effect(function(a){return(-Math.cos(a*Math.PI)/2)+0.5
});collie.Effect.mirror=collie.Effect(function(a){return(a<0.5)?collie.Effect.sinusoidal(0,1)(a*2):collie.Effect.sinusoidal(0,1)(1-(a-0.5)*2)
});collie.Effect.pulse=function(a){return collie.Effect(function(b){return(-Math.cos((b*(a-0.5)*2)*Math.PI)/2)+0.5})};collie.Effect.wave=function(b,a){return collie.Effect(function(c){return(a||1)*(Math.sin(b*(c*360)*Math.PI/180)).toFixed(5)
})};collie.Effect.easeIn=collie.Effect.easeInCubic;collie.Effect.easeOut=collie.Effect.easeOutCubic;collie.Effect.easeInOut=collie.Effect.easeInOutCubic;
collie.Effect.easeOutIn=collie.Effect.easeOutInCubic;collie.Effect.bounce=collie.Effect.easeOutBounce;collie.Effect.elastic=collie.Effect.easeInElastic;
collie.Component=collie.Class({$init:function(){this._bInitOption=false;this._htOption={};this._htOptionSetter={};this._htHandler={}
},option:function(b,d,c){if(typeof b==="object"){if(!this._bInitOption){this._htOption=collie.util.cloneObject(b);this._bInitOption=true
}else{for(var a in b){this.option(a,b[a],c)}}}else{if(typeof b==="string"){if(d!==undefined){if(!c||typeof this._htOption[b]==="undefined"){this._htOption[b]=d;
if(this._htOptionSetter[b]!==undefined){this._htOptionSetter[b](d)}this._bInitOption=true}}else{return this._htOption[b]}}else{return this._htOption
}}},get:function(a){return this.option(a)},set:function(c,b,a){this.option(c,b,a);return this},unset:function(a){if(this._htOption&&typeof this._htOption[a]!=="undefined"){delete this._htOption[a]
}},optionSetter:function(b,a){this._htOptionSetter[b]=a},fireEvent:function(e,c){if(typeof this._htHandler[e]!=="undefined"&&this._htHandler[e].length>0){c=c||{};
oCustomEvent=new collie.ComponentEvent(e,c);var f=this._htHandler[e].concat();var b=false;for(var d=0,a=f.length;d<a;d++){this._htHandler[e][d](oCustomEvent);
if(oCustomEvent.isStop()){b=true}}if(b){return false}}return true},attach:function(c,d){if(typeof c!=="string"){for(var b in c){this.attach(b,c[b])
}}else{this._htHandler[c]=this._htHandler[c]||[];var e=this._htHandler[c];if(!d){return this}for(var b=0,a=e.length;b<a;b++){if(e[b]===d){return this
}}e.push(d)}return this},detach:function(c,d){if(typeof c!=="string"){for(var b in c){this.detach(b,c[b])}}else{if(this._htHandler[c]!==undefined){var e=this._htHandler[c];
if(!d){delete this._htHandler[c]}else{for(var b=0,a=e.length;b<a;b++){if(e[b]===d){this._htHandler[c].splice(b,1);if(this._htHandler[c].length<1){delete this._htHandler[c]
}break}}}}}},detachAll:function(a){if(a){if(this._htHandler[a]!==undefined){this._htHandler[a]=[]}}else{this._htHandler={}
}}});collie.ComponentEvent=collie.Class({$init:function(c,a){this.type=c;this._bCanceled=false;if(a){for(var b in a){this[b]=a[b]
}}},stop:function(){this._bCanceled=true},isStop:function(){return this._bCanceled}});collie.SpriteSheet=collie.Class({$init:function(){this._htSpriteSheet={}
},add:function(a,d,e,c,h,j,f){if(typeof d==="object"){if(d instanceof Array){for(var g=0,b=d.length;g<b;g++){this.add.apply(this,[a,g].concat(d[g]))
}}else{for(var g in d){this.add.apply(this,[a,g].concat(d[g]))}}}else{this._htSpriteSheet[a]=this._htSpriteSheet[a]||{};if(typeof h!=="undefined"){collie.ImageManager.getImage(a,function(k){this._addWithSpriteLength(k,a,d,e,c,h,j,f)
}.bind(this))}else{this._htSpriteSheet[a][d]=[e,c]}}},_addWithSpriteLength:function(a,c,b,e,d,j,l,h){var g=this._htSpriteSheet[c][b]=[];
var n=a.width;var f=a.height;if(collie.Renderer.isRetinaDisplay()){n/=2;f/=2}var m=e;var k=d;for(i=0;i<h;i++){if(m>=n){m=0;
k+=l}if(k>=f){break}g.push([m,k]);m+=j}},remove:function(a){if(this._htSpriteSheet[a]){delete this._htSpriteSheet[a]}},get:function(a){return this._htSpriteSheet[a]?this._htSpriteSheet[a]:false
},reset:function(){this._htSpriteSheet={}}});collie.ImageManager=collie.ImageManager||new (collie.Class({RETRY_COUNT:3,RETRY_DELAY:500,USE_PRERENDERING_DOM:false,$init:function(){this._aImages=[];
this._htImageNames={};this._htImageRetryCount={};this._htImageWhileLoading={};this._nCount=0;this._oSpriteSheet=new collie.SpriteSheet()
},_addImage:function(e,f){var d=this._aImages.push({element:e,name:f});var b=this._htImageNames[f];this._htImageNames[f]=d-1;
delete this._htImageRetryCount[f];if(b&&b instanceof Array){for(var c=0,a=b.length;c<a;c++){b[c](e,f)}b=null}this.fireEvent("process",{name:f,url:e.src,count:d,total:this._nCount,ratio:Math.round((d/this._nCount)*1000)/1000});
if(this._nCount===d){this.fireEvent("complete")}},_markImage:function(a){if(!this._htImageNames[a]){this._htImageNames[a]=[]
}if(!this._htImageRetryCount[a]){this._htImageRetryCount[a]=0}},_makeHash:function(){this._htImageNames={};for(var b=0,a=this._aImages.length;
b<a;b++){this._htImageNames[this._aImages[b].name]=b}},getImage:function(a,b){if(!a&&a!==0){return false}if(!(a in this._htImageNames)){this._markImage(a)
}if(this._htImageNames[a] instanceof Array){return(b&&this._addMarkCallback(a,b))}else{if(b){b(this._aImages[this._htImageNames[a]].element)
}else{return this._aImages[this._htImageNames[a]].element}}},_addMarkCallback:function(c,d,a){if((c in this._htImageNames)&&this._htImageNames[c] instanceof Array){if(a){var b=function b(e){if(e.name===c){a();
this.detach("error",b)}};this.attach("error",b)}if(d){this._htImageNames[c].push(d)}return true}else{return false}},removeImage:function(b){if(!(b in this._htImageNames)){return false
}var a=this._aImages.splice(this._htImageNames[b],1);this._makeHash();a.onload=null;a.onerror=null;a.src=null;a=null;this._oSpriteSheet.remove(b)
},remove:function(a){this.removeImage(a)},add:function(){if(typeof arguments[0]==="object"){this.addImages.apply(this,arguments)
}else{this.addImage.apply(this,arguments)}},addImages:function(f,h,e){var a=null;var d=null;var j=0;var g=0;var b=[];for(var c in f){j++
}if(h&&h!==null){a=(function(){g++;if(g>=j){h(f)}}).bind(this)}if(e&&e!==null){d=(function(k,m,l){b.push([k,m,l]);if(b.length+g>=j){e(b)
}}).bind(this)}for(var c in f){this.addImage(c,f[c],a,d)}},addImage:function(d,c,e,b){if(this.getImage(d)){if(e&&e!==null){e(this.getImage(d),d,c)
}return}if((d in this._htImageWhileLoading)&&this._addMarkCallback(d,e,b)){return}this._nCount++;this._markImage(d);var a=new Image();
if(this.USE_PRERENDERING_DOM&&collie.Renderer.getRenderingMode()==="dom"&&collie.util.getSupportCSS3d()&&!collie.util.getDeviceInfo().android){a.style.webkitTransform="translateZ(0)";
a.style.position="absolute";a.style.visibility="hidden";collie.Renderer.getElement().appendChild(a)}this._htImageWhileLoading[d]=a;
a.onload=(function(f){this._addImage(a,d);if(e&&e!==null){e(a,d,c)}a.onerror=a.onload=null;this._deleteWhileLoading(d)}).bind(this);
a.onerror=(function(f){if(this._htImageRetryCount[d]<this.RETRY_COUNT){this._htImageRetryCount[d]++;this.fireEvent("retry",{count:this._aImages.length,total:this._nCount,name:d,url:c,delay:this.RETRY_DELAY,retryCount:this._htImageRetryCount[d]});
setTimeout(function(){a.src="about:blank";a.src=c},this.RETRY_DELAY);return}if(b&&b!==null){b(a,d,c)}this.fireEvent("error",{count:this._aImages.length,total:this._nCount,name:d,url:c});
a.onerror=a.onload=null;this._deleteWhileLoading(d)}).bind(this);a.src=c},_deleteWhileLoading:function(a){delete this._htImageWhileLoading[a]
},abort:function(){for(var a in this._htImageWhileLoading){this._htImageWhileLoading[a].onload=this._htImageWhileLoading[a].onerror=null;
this._htImageWhileLoading[a].src=null;this._htImageWhileLoading[a]=null}this._htImageWhileLoading={};this._htImageStartedLoading={}
},reset:function(){this.abort();this._aImages=[];this._htImageNames={};this._htImageRetryCount={};this._htImageWhileLoading={};
this._nCount=0;this._oSpriteSheet.reset()},cancelGetImage:function(c,d){if(this._htImageNames[c] instanceof Array){for(var b=0,a=this._htImageNames[c].length;
b<a;b++){if(this._htImageNames[c][b]===d){this._htImageNames[c].splice(b,1);return}}}},addSprite:function(b,c,a,d){this._oSpriteSheet.add(b,c,a,d)
},getSprite:function(a){return this._oSpriteSheet.get(a)},removeSprite:function(a){this._oSpriteSheet.remove(a)}},collie.Component))();
collie.Matrix={multiple:function(c,b){var j=[];for(var k=0,g=b.length;k<g;k++){var a=[];for(var f=0,e=b[0].length;f<e;f++){var l=0;
for(var h=0,d=c[0].length;h<d;h++){l+=c[k][h]*b[h][f]}a.push(l)}j.push(a)}return j},translate:function(b,a){return[[1,0,b],[0,1,a],[0,0,1]]
},scale:function(b,a){return[[b,0,0],[0,a,0],[0,0,1]]},rotate:function(b){var c=collie.util.toRad(b);var a=Math.cos(c);var d=Math.sin(c);
return[[a,-d,0],[d,a,0],[0,0,1]]},transform:function(b,e,d){var c=this.multiple(b,[[e],[d],[1]]);return{x:c[0][0],y:c[1][0]}
}};collie.Transform={_htBoundary:{left:0,top:0,right:0,bottom:0},_bIsIEUnder8:collie.util.getDeviceInfo().ie&&collie.util.getDeviceInfo().ie<9,getBoundary:function(d,e){var c=d.get();
var a=[[0,0],[c.width,0],[c.width,c.height],[0,c.height]];var f=this.points(d,a);var b=collie.util.getBoundary(f);this._htBoundary.left=b.left;
this._htBoundary.right=b.right;this._htBoundary.bottom=b.bottom;this._htBoundary.top=b.top;this._htBoundary.isTransform=this.isUseTransform(d);
if(e){this._htBoundary.points=f}return this._htBoundary},points:function(f,c){var b;if(!this._bIsIEUnder8){b=this.getMatrixRecusively(f)
}if(!b){return c}var e=[];for(var d=0,a=c.length;d<a;d++){var g=collie.Matrix.transform(b,c[d][0],c[d][1]);e.push([g.x,g.y])
}return e},getMatrixRecusively:function(c){var b=c;var a=null;var f=0;var e=0;while(b){if(this.isUseTransform(b)){var d=this.getMatrix(b,f,e);
a=a!==null?collie.Matrix.multiple(a,d):d}f-=b._htOption.x;e-=b._htOption.y;b=b.getParent()}return a},getMatrix:function(d,f,e){if(typeof f==="undefined"){f=0
}if(typeof e==="undefined"){e=0}var b=d.getOrigin();var c=d.get();var a=collie.Matrix.translate(b.x+f,b.y+e);if(c.angle!==0){a=collie.Matrix.multiple(a,collie.Matrix.rotate(c.angle))
}if(c.scaleX!==1||c.scaleY!==1){a=collie.Matrix.multiple(a,collie.Matrix.scale(c.scaleX,c.scaleY))}a=collie.Matrix.multiple(a,collie.Matrix.translate(-(b.x+f),-(b.y+e)));
return a},isUseTransform:function(a){return(a._htOption.scaleX!==1||a._htOption.scaleY!==1||a._htOption.angle!==0)}};collie.LayerCanvas=collie.Class({$init:function(a){this._oLayer=a;
this._oEvent=a.getEvent();this._htDeviceInfo=collie.util.getDeviceInfo();this._initCanvas()},_initCanvas:function(){var a=this._getLayerSize();
this._elCanvas=document.createElement("canvas");this._elCanvas.width=a.width;this._elCanvas.height=a.height;this._elCanvas.className="_collie_layer";
this._elCanvas.style.position="absolute";this._elCanvas.style.left=this._oLayer.option("x")+"px";this._elCanvas.style.top=this._oLayer.option("y")+"px";
if(collie.Renderer.isRetinaDisplay()){this._elCanvas.style.width=(a.width/2)+"px";this._elCanvas.style.height=(a.height/2)+"px"
}this._oContext=this._elCanvas.getContext("2d")},_getLayerSize:function(b,a){b=b||this._oLayer.option("width");a=a||this._oLayer.option("height");
if(collie.Renderer.isRetinaDisplay()){b*=2;a*=2}return{width:b,height:a}},getContext:function(){return this._oContext},getElement:function(){return this._elCanvas
},clear:function(a){a=a||this.getContext();if(!this._htDeviceInfo.android||(this._htDeviceInfo.android<4.12&&this._htDeviceInfo.android>=4.2)){a.clearRect(0,0,this._elCanvas.width+1,this._elCanvas.height+1)
}else{this._elCanvas.width=this._elCanvas.width}},resize:function(c,b,f){var a=this._getLayerSize(c,b);if(f){this._elCanvas.style.width=c+"px";
this._elCanvas.style.height=b+"px";var d=c/this._oLayer.option("width");var h=b/this._oLayer.option("height");this._oEvent.setEventRatio(d,h)
}else{var e=typeof c==="number"?a.width:this._elCanvas.width;var g=typeof b==="number"?a.height:this._elCanvas.height;this.clear(this._oContext);
this._oLayer.setChanged();this._elCanvas.width=e;this._elCanvas.height=g;if(collie.Renderer.isRetinaDisplay()){this._elCanvas.style.width=e/2+"px";
this._elCanvas.style.height=g/2+"px"}}}});collie.LayerDOM=collie.Class({$init:function(a){this._oLayer=a;this._oEvent=a.getEvent();
this._htOption=a.option();this._initElement();this._rxDisplayObjectId=new RegExp(collie.DisplayObjectDOM.ID+"([0-9]+)")},_initElement:function(){this._el=document.createElement("div");
this._el.className="_collie_layer";this._el.style.position="absolute";this._el.style.left=this._htOption.x+"px";this._el.style.top=this._htOption.y+"px";
this._el.style.width=this._htOption.width+"px";this._el.style.height=this._htOption.height+"px"},findDisplayObjectElement:function(a){while(a&&a.nodeType==1){if(this.isDisplayObjectElement(a)&&a.parentNode===this._el){return a
}a=a.parentNode}return false},isDisplayObjectElement:function(a){if("classList" in a){return a.classList.contains(collie.DisplayObjectDOM.CLASSNAME)
}else{return(" "+a.className+" ").indexOf(" "+collie.DisplayObjectDOM.CLASSNAME+" ")>-1}},getElement:function(){return this._el
},clear:function(){return true},resize:function(b,a,d){if(d){var c=b/this._oLayer.option("width");var e=a/this._oLayer.option("height");
this._oEvent.setEventRatio(c,e);this._el.style[collie.util.getCSSPrefix("transform-origin",true)]="0 0";if(collie.util.getSupportCSS3d()){this._el.style[collie.util.getCSSPrefix("transform",true)]="scale3d("+c+", "+e+", 1)"
}else{if(collie.util.getSupportCSS3()){this._el.style[collie.util.getCSSPrefix("transform",true)]="scale("+c+", "+e+")"}else{this._el.style.filter="progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand',M11="+c+",M12=0,M21=0,M22="+e+");"
}}}else{this._el.style.width=b+"px";this._el.style.height=a+"px"}}});collie.LayerEvent=collie.Class({THRESHOLD_CLICK:7,$init:function(a){this._oLayer=a;
this._bHasTouchEvent=!!("ontouchstart" in window);this._fOnEvent=this._onEvent.bind(this);this._oMousedownObject=null;this._htEventRatio={width:1,height:1};
this._bAttached=false},attachEvent:function(){var a=this._oLayer.getParent();if(this._bHasTouchEvent){collie.util.addEventListener(a,"touchstart",this._fOnEvent);
collie.util.addEventListener(a,"touchend",this._fOnEvent);collie.util.addEventListener(a,"touchmove",this._fOnEvent);collie.util.addEventListener(a,"touchcancel",this._fOnEvent)
}else{collie.util.addEventListener(a,"mousedown",this._fOnEvent);collie.util.addEventListener(a,"mouseup",this._fOnEvent);
collie.util.addEventListener(a,"mousemove",this._fOnEvent)}this._bAttached=true},detachEvent:function(){var a=this._oLayer.getParent();
if(this._bAttached){if(this._bHasTouchEvent){collie.util.removeEventListener(a,"touchstart",this._fOnEvent);collie.util.removeEventListener(a,"touchend",this._fOnEvent);
collie.util.removeEventListener(a,"touchmove",this._fOnEvent);collie.util.removeEventListener(a,"touchcancel",this._fOnEvent)
}else{collie.util.removeEventListener(a,"mousedown",this._fOnEvent);collie.util.removeEventListener(a,"mouseup",this._fOnEvent);
collie.util.removeEventListener(a,"mousemove",this._fOnEvent)}this._bAttached=false}},_onEvent:function(n){if(!this._oLayer._htOption.useEvent){return
}n=n||window.event;var p=this._bHasTouchEvent?n.changedTouches[0]:n||window.event;var g=this._bHasTouchEvent?this._getEventTargetElement(n):n.target||n.srcElement;
var m=g.ownerDocument||document;var h=m.body||m.documentElement;var q=this._bHasTouchEvent?p.pageX:p.pageX||p.clientX+h.scrollLeft-m.body.clientLeft;
var o=this._bHasTouchEvent?p.pageY:p.pageY||p.clientY+h.scrollTop-m.body.clientTop;var b=n.type;var l=null;var f=this._oLayer.getParentPosition();
var k=q-f.x-this._oLayer._htOption.x;var j=o-f.y-this._oLayer._htOption.y;k=k/this._htEventRatio.width;j=j/this._htEventRatio.height;
if(b==="touchcancel"){if(this._htEventStartPos!==null){k=this._htEventStartPos.x;j=this._htEventStartPos.y}}b=this._convertEventType(b);
if(b==="mousemove"||b==="mousedown"){if(collie.Renderer.isPreventDefault()){collie.util.stopEventDefault(n)}}if(b==="mousedown"){this._htEventStartPos={x:k,y:j}
}var a=this._fireEvent(n,b,k,j);if(b==="mouseup"){var d=this.THRESHOLD_CLICK;var c=this.THRESHOLD_CLICK;if(this._htEventStartPos&&this._htEventStartPos.x-d<=k&&k<=this._htEventStartPos.x+d&&this._htEventStartPos.y-c<=j&&j<=this._htEventStartPos.y+c){this._fireEvent(n,"click",k,j)
}this._htEventStartPos=null}collie.Renderer.setEventStatus(b,a)},_fireEvent:function(d,h,g,f){var b=null;var a=true;if(h!=="mousemove"&&!collie.Renderer.isStopEvent(h)){var c=this._oLayer.getChildren();
b=this._getTargetOnHitEvent(c,g,f);if(b){a=this._bubbleEvent(b,h,d,g,f);if(h==="mousedown"){this._setMousedownObject(b)}if(h==="mouseup"){this._unsetMousedownObject(b)
}}}if(h==="mouseup"&&this._getMousedownObject()!==null){b=this._getMousedownObject();this._bubbleEvent(b,h,d,g,f);this._unsetMousedownObject(b)
}if(a){this._oLayer.fireEvent(h,{event:d,displayObject:b,x:g,y:f})}return !!b},_getTargetOnHitEvent:function(a,e,d){var b=null;
if(a instanceof Array){for(var c=a.length-1;c>=0;c--){if(a[c].hasChild()){b=this._getTargetOnHitEvent(a[c].getChildren(),e,d);
if(b){return b}}b=this._getTargetOnHitEvent(a[c],e,d);if(b){return b}}}else{return this._isPointInDisplayObjectBoundary(a,e,d)?a:false
}},_convertEventType:function(b){var a=b;switch(b){case"touchstart":a="mousedown";break;case"touchmove":a="mousemove";break;
case"touchend":case"touchcancel":a="mouseup";break;case"tap":a="click";break}return a},_getEventTargetElement:function(b){var a=b.target;
while(a.nodeType!=1){a=a.parentNode}return a},_bubbleEvent:function(a,g,b,f,c,d){if(a.fireEvent(g,{displayObject:d||a,event:b,x:f,y:c})===false){return false
}if(a.getParent()&&!this._bubbleEvent(a.getParent(),g,b,f,c,a)){return false}return true},_isPointInDisplayObjectBoundary:function(d,a,f){if(!d._htOption.useEvent||!d._htOption.visible||!d._htOption.width||!d._htOption.height||(d._htOption.useEvent==="auto"&&!d.hasAttachedHandler())){return false
}var b=d.getHitAreaBoundary();if(b.left<=a&&a<=b.right&&b.top<=f&&f<=b.bottom){if(!d._htOption.hitArea){return true}else{var e=d.getRelatedPosition();
a-=e.x;f-=e.y;var c=d._htOption.hitArea;c=collie.Transform.points(d,c);return this._isPointInPolygon(c,a,f)}}return false
},_isPointInPolygon:function(c,g,f){var e=false;for(var d=0,b=c.length-1,a=c.length;d<a;b=d++){if((c[d][1]>f)!==(c[b][1]>f)&&(g<(c[b][0]-c[d][0])*(f-c[d][1])/(c[b][1]-c[d][1])+c[d][0])){e=!e
}}return e},_setMousedownObject:function(a){this._oMousedownObject=a},_unsetMousedownObject:function(a){if(this._oMousedownObject===a){this._oMousedownObject=null
}},_getMousedownObject:function(){return this._oMousedownObject},setEventRatio:function(b,a){this._htEventRatio.width=b||this._htEventRatio.width;
this._htEventRatio.height=a||this._htEventRatio.height},getEventRatio:function(){return this._htEventRatio}});collie.Layer=collie.Class({type:"layer",$init:function(a){this.option({x:0,y:0,width:320,height:480,useEvent:true,visible:true,freeze:false,renderingMode:"inherit"});
this._sAlignLeft=null;this._sAlignTop=null;if(a!==undefined){if(("x" in a)&&(a.x==="left"||a.x==="right"||a.x==="center")){this._sAlignLeft=a.x;
a.x=0}if(("y" in a)&&(a.y==="top"||a.y==="bottom"||a.y==="center")){this._sAlignTop=a.y;a.y=0}this.option(a)}this._renderingMode=this._htOption.renderingMode==="inherit"?collie.Renderer.getRenderingMode():this._htOption.renderingMode;
if(this._renderingMode==="canvas"&&!collie.util.getDeviceInfo().supportCanvas){this._renderingMode="dom"}this.drawCount=0;
this.optionSetter("visible",this._setVisible.bind(this));this._elParent=null;this._bChanged=false;this._aDisplayObjects=[];
this._bLoaded=false;this._oEvent=new collie.LayerEvent(this);this._makeDrawing();this._setVisible()},_makeDrawing:function(){this._oDrawing=this._renderingMode==="dom"?new collie.LayerDOM(this):new collie.LayerCanvas(this)
},getDrawing:function(){return this._oDrawing},getRenderingMode:function(){return this._renderingMode},getEvent:function(){return this._oEvent
},getParent:function(){return this._elParent||false},load:function(b,a){this.unload();this._bLoaded=true;this._elParent=this._elParent||b;
this._elParent.style.width=Math.max(parseInt(this._elParent.style.width||0,10),this.option("width"))+"px";this._elParent.style.height=Math.max(parseInt(this._elParent.style.height||0,10),this.option("height"))+"px";
this.getElement().style.zIndex=a;if(this._sAlignLeft!==null){this.offset(this._sAlignLeft,null,true)}if(this._sAlignTop!==null){this.offset(null,this._sAlignTop,true)
}this._elParent.appendChild(this.getElement())},unload:function(){if(this.isLoaded()){this._oEvent.detachEvent();this._elParent.removeChild(this.getElement());
this._elParent=null;this._bLoaded=false}},attachEvent:function(){this._oEvent.attachEvent()},detachEvent:function(){this._oEvent.detachEvent()
},_setVisible:function(){if(this.getElement()){this.getElement().style.display=this.option("visible")?"block":"none"}},isLoaded:function(){return this._bLoaded
},addChild:function(a){collie.util.pushWithSort(this._aDisplayObjects,a);a.setLayer(this);this.setChanged()},addChildren:function(b){for(var c=0,a=b.length;
c<a;c++){this.addChild(b[c])}},removeChild:function(c,d){c.unsetLayer();if(typeof d!=="undefined"){this._aDisplayObjects.splice(d,1)
}else{for(var b=0,a=this._aDisplayObjects.length;b<a;b++){if(this._aDisplayObjects[b]===c){this._aDisplayObjects.splice(b,1);
break}}}this.setChanged()},removeChildren:function(a){for(var b=a.length-1;b>=0;b--){if(a[b]){this.removeChild(a[b],b)}}},addTo:function(a){a=a||collie.Renderer;
a.addLayer(this);return this},changeDisplayObjectZIndex:function(a){this.removeChild(a);this.addChild(a)},getChildren:function(){return this._aDisplayObjects
},hasChild:function(){return this._aDisplayObjects&&this._aDisplayObjects.length>0},setChanged:function(){this._bChanged=true
},isChanged:function(){return this._bChanged},unsetChanged:function(){this._bChanged=false},getContext:function(){return("getContext" in this._oDrawing)?this._oDrawing.getContext():false
},getElement:function(){return("getElement" in this._oDrawing)?this._oDrawing.getElement():false},update:function(e){this.drawCount=0;
if(!this.isChanged()||this.option("freeze")){return}this.clear();this.unsetChanged();var c=this.option("width");var b=this.option("height");
for(var d=0,a=this._aDisplayObjects.length;d<a;d++){this._aDisplayObjects[d].update(e,0,0,c,b)}},clear:function(){this._oDrawing.clear()
},resize:function(b,a,c){if(!c){this.option("width",b||this._htOption.width);this.option("height",a||this._htOption.height)
}if(this._oDrawing){this._oDrawing.resize(b,a,c)}if(this._elParent){this._elParent.style.width=Math.max(parseInt(this._elParent.style.width||0,10),b||this.option("width"))+"px";
this._elParent.style.height=Math.max(parseInt(this._elParent.style.height||0,10),a||this.option("height"))+"px"}this.fireEvent("resize")
},offset:function(d,c,b){var a=this.getElement();if(typeof d!=="undefined"&&d!==null){switch(d){case"left":d=0;break;case"right":d=parseInt(this._elParent.style.width,10)-this._htOption.width;
break;case"center":d=parseInt(this._elParent.style.width,10)/2-this._htOption.width/2;break}this.option("x",d);a.style.left=d+"px";
if(!b){this._sAlignLeft=null}}if(typeof c!=="undefined"&&c!==null){switch(c){case"top":c=0;break;case"bottom":c=parseInt(this._elParent.style.height,10)-this._htOption.height;
break;case"center":c=parseInt(this._elParent.style.height,10)/2-this._htOption.height/2;break}this.option("y",c);a.style.top=c+"px";
if(!b){this._sAlignTop=null}}},setParent:function(a){if(this._bLoaded){this._oEvent.detachEvent();this._elParent.removeChild(this.getElement());
this._elParent=a;this._elParent.appendChild(this.getElement());this._oEvent.attachEvent()}else{this._elParent=a}},getParentPosition:function(){if(this._elParent!==null){return this._elParent===collie.Renderer.getElement()?collie.Renderer.getPosition():collie.util.getPosition(this._elParent)
}},clone:function(d){var a=new this.constructor(this._htOption);if(d&&this._aDisplayObjects.length){for(var c=0,b=this._aDisplayObjects.length;
c<b;c++){this._aDisplayObjects[c].clone(true).addTo(a)}}return a}},collie.Component);collie.DisplayObjectCanvas=collie.Class({$init:function(a){this._oDisplayObject=a;
this._bUseCache=false;this._oDebugHitArea=null;this._htEvent={};this._oLayer=null;this._htInfo=this._oDisplayObject.get();
this._bIsRetinaDisplay=null;if(this._htInfo.useCache){this.loadCache()}},loadCache:function(){if(!this._bUseCache){this._bUseCache=true;
this._elCache=document.createElement("canvas");this._elCache.width=this._htInfo.width;this._elCache.height=this._htInfo.height;
this._oContextCache=this._elCache.getContext("2d")}},unloadCache:function(){if(this._bUseCache){this._oContextCache=null;
this._elCache=null;this._bUseCache=false}},clearCache:function(){if(this._bUseCache){this._oContextCache.clearRect(0,0,this._elCache.width,this._elCache.height);
this._elCache.width=this._htInfo.width*(this._bIsRetinaDisplay?2:1);this._elCache.height=this._htInfo.height*(this._bIsRetinaDisplay?2:1)
}},drawImage:function(m,k,h,l,c,o,n,a,g){var d=this._oDisplayObject.getImage();var j=this._oDisplayObject._nImageWidth;var b=this._oDisplayObject._nImageHeight;
if(collie.Renderer.isRetinaDisplay()){for(i=1,len=arguments.length;i<len;i++){arguments[i]*=2}j*=2;b*=2}try{m.drawImage(d,k,h,l,c,o,n,a,g)
}catch(f){throw new Error("invalid drawImage value : "+k+","+h+","+l+","+c+","+o+","+n+","+a+","+g+","+this._oDisplayObject.getImage().src+", original : "+this._oDisplayObject.getImage().width+","+this._oDisplayObject.getImage().height+",source : "+d.width+","+d.height+", isCached : "+(this._elImageCached!==null?"true":"false"))
}},load:function(){this._oLayer=this._oDisplayObject.getLayer();this._oContext=this._oDisplayObject.getLayer().getContext();
this._bIsRetinaDisplay=collie.Renderer.isRetinaDisplay()},unload:function(){this._oLayer=null;this._oContext=null},draw:function(C,c,b,t,J,x){var I=x?true:false;
x=x||this._oContext;var h=this._bUseCache?this._oContextCache:x;var K=x;var A=this._htInfo;var l=this._oDisplayObject.getDirty();
var E=this._oDisplayObject.getOrigin();var z=A.width;var N=A.height;var e=E.x;var d=E.y;var D=c;var B=b;var k=(this._bIsRetinaDisplay?2:1);
var a=c*k;var u=b*k;var p=0;var y=false;var q=x;if(A.useCache){x=this._oContextCache}if(this._bIsRetinaDisplay){c*=2;b*=2;
e*=2;d*=2;z*=2;N*=2}if(this._bUseCache||A.scaleX!==1||A.scaleY!==1||A.angle!==0||A.opacity!==1){y=true;if(this._bUseCache){q=!I?this._oContext:K
}q.save();q.translate(c+e,b+d);if(A.opacity!==1){p=q.globalAlpha;q.globalAlpha=q.globalAlpha===0?A.opacity:q.globalAlpha*A.opacity
}if(A.angle!==0){q.rotate(collie.util.toRad(A.angle))}if(A.scaleX!==1||A.scaleY!==1){q.scale(A.scaleX,A.scaleY)}q.translate(-e,-d);
c=b=0}this._htEvent.displayObject=this;this._htEvent.context=h;this._htEvent.x=c;this._htEvent.y=b;if(!this._bUseCache||(this._oDisplayObject.isChanged()&&!this._oDisplayObject.isChanged(true))){this.clearCache();
if(A.backgroundColor){h.fillStyle=A.backgroundColor;h.fillRect(c,b,z,N)}if(this._oDisplayObject.getImage()){var j=this._oDisplayObject.getImage();
var M=this._oDisplayObject.getImageSize();if(A.backgroundRepeat&&A.backgroundRepeat!=="no-repeat"){var n=(A.backgroundRepeat==="repeat"||A.backgroundRepeat==="repeat-x")?Math.ceil(A.width/M.width):1;
var H=(A.backgroundRepeat==="repeat"||A.backgroundRepeat==="repeat-y")?Math.ceil(A.height/M.height):1;if(n>0||H>0){for(var o=0;
o<n;o++){for(var G=0;G<H;G++){var g=o*M.width+M.width;var f=G*M.height+M.height;var s=g>A.width?M.width-(g-A.width):M.width;
var w=f>A.height?M.height-(f-A.height):M.height;this.drawImage(h,0,0,s,w,(c/k)+o*M.width,(b/k)+G*M.height,s,w)}}}}else{var F=Math.min(M.width,A.width);
var v=Math.min(M.height,A.height);this.drawImage(h,A.offsetX,A.offsetY,A.fitImage?M.width:F,A.fitImage?M.height:v,c/k,b/k,A.fitImage?A.width:F,A.fitImage?A.height:v)
}}if("onCanvasDraw" in this._oDisplayObject){this._oDisplayObject.onCanvasDraw(this._htEvent)}}if(A.debugHitArea&&A.hitArea){if(this._oDebugHitArea===null){this._oDebugHitArea=new collie.Polyline({x:0,y:0,width:A.width,height:A.height,strokeColor:A.debugHitArea===true?"yellow":A.debugHitArea,strokeWidth:3}).addTo(this._oDisplayObject);
this._oDebugHitArea.setPointData(A.hitArea)}}if(this._oDisplayObject.hasChild()&&(!A.useCache||(this._oDisplayObject.isChanged()&&!this._oDisplayObject.isChanged(true)))){var m=this._oDisplayObject.getChildren();
for(var L=0,r=m.length;L<r;L++){m[L].update(C,A.useCache||y?0:D,A.useCache||y?0:B,t,J,I||A.useCache?x:null);m[L].unsetChanged();
m[L]._resetDirty()}}if(A.useCache){(I?K:this._oContext).drawImage(x.canvas,0,0)}this._oLayer.drawCount++;if(y){q.restore()
}}});collie.DisplayObjectDOM=collie.Class({$init:function(a){this._oDisplayObject=a;this._htInfo=this._oDisplayObject.get();
this._oLayer=null;this._elImage=null;this._aTransformValue=[];this._sTransformValue=null;this._sTransform=collie.util.getCSSPrefix("transform",true);
this._sOrigin=collie.util.getCSSPrefix("transform-origin",true);this._bSupportCSS3=collie.util.getSupportCSS3();this._bSupportCSS3d=collie.util.getSupportCSS3d();
this._bUseTransform=this._bSupportCSS3||this._bSupportCSS3d;this._htDeviceInfo=collie.util.getDeviceInfo();this._bIsAndroid=!!this._htDeviceInfo.android;
this._nAndroidVersion=this._htDeviceInfo.android;this._bIsIEUnder8=this._htDeviceInfo.ie&&this._htDeviceInfo.ie<9;this._bUseTranslateZ=true;
this._bIsRetinaDisplay=null;this._htEvent={};this._oEmptyObject={};this._sCacheTransformValue=null;this._initElement()},_initElement:function(){this._elContainer=document.createElement("div");
this._elContainer.id=collie.DisplayObjectDOM.ID+this._oDisplayObject.getId()+(this._htInfo.name?"_"+this._htInfo.name:"");
this._elContainer.className=collie.DisplayObjectDOM.CLASSNAME;this._elContainerStyle=this._elContainer.style;this._elContainerStyle.position="absolute";
if(this._bIsIEUnder8){this._elContainerStyle.width=this._htInfo.width+"px";this._elContainerStyle.height=this._htInfo.height+"px"
}this._el=document.createElement("div");this._elStyle=this._el.style;if(this._bSupportCSS3d){this._elStyle[this._sTransform]="translateZ(0)"
}this._elStyle.position="absolute";this._elStyle.width=this._htInfo.width+"px";this._elStyle.height=this._htInfo.height+"px";
this._elStyle.overflow="hidden";this._elContainer.appendChild(this._el)},load:function(){this._oLayer=this._oDisplayObject.getLayer();
if(this._oDisplayObject.getParent()){this._oDisplayObject.getParent().getDrawing().getElement().appendChild(this._elContainer)
}else{this._oLayer.getElement().appendChild(this._elContainer)}this._bIsRetinaDisplay=collie.Renderer.isRetinaDisplay()},unload:function(){this._oLayer=null;
this._elContainer.parentNode.removeChild(this._elContainer)},getElement:function(){return this._elContainer},getItemElement:function(){return this._el
},draw:function(d,j,g,b,f){this._htEvent.displayObject=this;this._htEvent.element=this._el;this._htEvent.x=j;this._htEvent.y=g;
var e=this._htInfo;var h=this._oDisplayObject.getDirty()||this._oEmptyObject;var c=this._oDisplayObject.getOrigin();var a=(this._bIsRetinaDisplay?2:1);
if(h.visible){this._elContainerStyle.display=e.visible?"block":"none"}if(h.width){this._elStyle.width=e.width+"px";if(this._bIsIEUnder8){this._elContainerStyle.width=e.width+"px"
}}if(h.height){this._elStyle.height=e.height+"px"}if(h.opacity){if(this._bIsIEUnder8){this._elContainerStyle.filter="alpha(opacity="+(e.opacity*100)+")"
}else{this._elContainerStyle.opacity=e.opacity;if(this._elImage&&this._nAndroidVersion&&this._nAndroidVersion>=4.1){this._elImage.style.opacity=e.opacity
}}}if(h.zIndex){this._elContainerStyle.zIndex=e.zIndex}if(h.backgroundColor){this._elStyle.backgroundColor=e.backgroundColor
}if(this._bUseTransform){this._aTransformValue.push(this._makeTranslate(e.x,e.y,e.zIndex))}else{if(h.x||h.y){this._elContainerStyle.left=e.x+"px";
this._elContainerStyle.top=e.y+"px"}}if(this._bUseTransform){if(h.originX||h.originY||h.width||h.height){this._elContainerStyle[this._sOrigin]=c.x+"px "+c.y+"px"
}if(e.angle!==0){this._aTransformValue.push("rotate",(this._bSupportCSS3d&&!this._bIsAndroid?"Z":""),"(",e.angle,"deg) ")
}if(e.scaleX!==1||e.scaleY!==1){this._aTransformValue.push("scale(",e.scaleX,", ",e.scaleY,") ")}}if(this._bUseTransform){this._applyTransform()
}this._drawImage(e,h);if("onDOMDraw" in this._oDisplayObject){this._oDisplayObject.onDOMDraw(this._htEvent)}this._oLayer.drawCount++
},_drawImage:function(f,d){var b=this._oDisplayObject.getImage();var e=f.backgroundRepeat&&f.backgroundRepeat!=="no-repeat";
var a=0;var h=0;if(this._oDisplayObject._htOption.fitImage){a=this._oDisplayObject._htOption.width;h=this._oDisplayObject._htOption.height
}else{var g=this._oDisplayObject.getImageSize();a=g.width;h=g.height}if(d.backgroundImage||d.backgroundRepeat){if(this._elImage!==null&&(!f.backgroundImage||(f.backgroundRepeat&&f.backgroundRepeat!=="no-repeat"))){this._el.removeChild(this._elImage);
this._elImage=null}if(f.backgroundImage&&b){if(!e&&f.backgroundImage){var c;if(this._elImage===null){this._elImage=b.cloneNode();
c=this._elImage.style;c.position="absolute";c.top=0;c.left=0;c.width=a+"px";c.height=h+"px";c.visibility="visible";if(this._nAndroidVersion&&this._nAndroidVersion>=4.1){c.opacity=f.opacity
}if(this._bSupportCSS3d&&this._bUseTranslateZ){c[this._sTransform]="translateZ(0)"}if(this._el.hasChildNodes()){this._el.insertBefore(this._elImage,this._el.childNodes[0])
}else{this._el.appendChild(this._elImage)}}else{this._elImage.src=b.src;c=this._elImage.style;c.width=a+"px";c.height=h+"px";
c.visibility="visible"}}else{if(e){this._elStyle.backgroundImage='url("'+b.src+'")';this._elStyle.backgroundRepeat=f.backgroundRepeat
}}}}if(f.backgroundImage&&this._elImage!==null){if(this._bIsRetinaDisplay&&e&&(d.width||htDirth.height||d.backgroundRepeat||d.backgroundImage)){this._elStyle.backgroundSize=f.width+"px "+f.height+"px"
}if(d.offsetX||d.offsetY){if(this._bUseTransform){this._elImage.style[this._sTransform]=this._makeTranslate(-f.offsetX,-f.offsetY,1)
}else{this._elImage.style.left=-f.offsetX+"px";this._elImage.style.top=-f.offsetY+"px"}}}},_makeTranslate:function(e,d,c){var a="";
var b=(this._htInfo.angle!==0&&this._bIsAndroid)?false:this._bSupportCSS3d;if(b){a="translate3d("+e+"px, "+d+"px, "+c+"px) "
}else{if(this._bSupportCSS3){a="translate("+e+"px, "+d+"px) "}}return a},_applyTransform:function(){var a=this._aTransformValue.join("");
if(this._sCacheTransformValue!==a){this._elContainerStyle[this._sTransform]=a;this._sCacheTransformValue=a;if(this._bIsAndroid&&this._bUseTranslateZ&&this._htInfo.angle!==0){this._elStyle[this._sTransform]="";
if(this._elImage){this._oDisplayObject.setChanged()}this._bUseTranslateZ=false}else{if(!this._bUseTranslateZ&&(this._htInfo.angle===0||!this._bIsAndroid)&&this._bSupportCSS3d){this._elStyle[this._sTransform]="translateZ(0)";
if(this._elImage){this._oDisplayObject.setChanged()}this._bUseTranslateZ=true}}}this._aTransformValue=[]}},collie.Component);
collie.DisplayObjectDOM.CLASSNAME="_collie_displayObject";collie.DisplayObjectDOM.ID="_collie_displayObject_";collie.DisplayObject=collie.Class({type:"displayobject",$init:function(a){this._bInitOption=true;
this._htOption={name:"",width:"auto",height:"auto",x:0,y:0,zIndex:0,opacity:1,angle:0,scaleX:1,scaleY:1,originX:"center",originY:"center",offsetX:0,offsetY:0,spriteX:null,spriteY:null,spriteLength:0,spriteSheet:null,rangeX:null,rangeY:null,positionRepeat:false,backgroundColor:"",backgroundImage:"",backgroundRepeat:"no-repeat",hitArea:null,debugHitArea:false,useCache:false,useEvent:"auto",fitImage:false,velocityX:0,velocityY:0,velocityRotate:0,forceX:0,forceY:0,forceRotate:0,mass:1,friction:0,useRealTime:true,visible:true};
if(a){this.option(a)}this._htDirty={};this._htMatrix={};this._sId=++collie.DisplayObject._idx;this._elImage=null;this._aDisplayObjects=[];
this._oLayer=null;this._oParent=null;this._oDrawing=null;this._bIsSetOption=false;this._bChanged=true;this._bChangedTransforms=true;
this._bCustomSize=false;this._aChangedQueue=null;this._htGetImageData=null;this._htRelatedPosition={};this._htParentRelatedPosition={};
this._htBoundary={};this._sRenderingMode=null;this._bRetinaDisplay=collie.Renderer.isRetinaDisplay();this._oTimerMove=null;
this._nPositionRight=null;this._nPositionBottom=null;this._nImageWidth=0;this._nImageHeight=0;this._htImageSize=null;this._htSpriteSheet=null;
this._htOrigin={x:0,y:0};this.set(this._htOption);this._bIsSetOption=true},set:function(e,d,b,a){if(typeof e==="object"){for(var c in e){this.set(c,e[c])
}}else{if(this._bIsSetOption&&this._htOption[e]===d){return}if(e==="width"||e==="height"){if(d!=="auto"){this._bCustomSize=true
}else{if(d==="auto"&&this.getImage()!==null){d=this.getImageSize()[e]}else{d=100}}}this._htOption[e]=d;this.setDirty(e);if(!b){this._setter(e,d)
}if(!a){this.setChanged((e==="x"||e==="y"||e==="angle"||e==="scaleX"||e==="scaleY"||e==="opacity")?true:false)}}return this
},_setter:function(b,a){if(b==="zIndex"){if(this._oParent){this._oParent.changeDisplayObjectZIndex(this)}else{if(this.getLayer()){this._oLayer.changeDisplayObjectZIndex(this)
}}}if(b==="x"||b==="y"){if(typeof a==="string"){this.align(b==="x"?a:false,b==="y"?a:false)}this._fixPosition();this.resetPositionCache()
}if(b==="backgroundImage"){this.setImage(a)}if(b==="spriteX"||b==="spriteY"||b==="spriteSheet"){this._setSpritePosition(b,a)
}if(b==="hitArea"&&a instanceof Array){this._makeHitAreaBoundary()}if(b==="width"||b==="height"||b==="originX"||b==="originY"){this._setOrigin()
}if((b==="backgroundRepeat"&&a!=="no-repeat")){this.set("useCache",true)}if(b==="useCache"&&this._oDrawing!==null&&this._oDrawing.loadCache){if(a){this._oDrawing.loadCache()
}else{this._oDrawing.unloadCache()}}},get:function(a){if(!a){return this._htOption}else{return this._htOption[a]}},setDirty:function(b){if(this._htDirty===null){this._htDirty={}
}if(typeof b==="undefined"){for(var a in this._htOption){this._htDirty[a]=true}}else{this._htDirty[b]=true}},getDirty:function(a){if(!a){return this._htDirty
}else{return this._htDirty[a]?true:false}},_resetDirty:function(){this._htDirty=null},addChild:function(a){collie.util.pushWithSort(this._aDisplayObjects,a);
a.setParent(this);if(this._oLayer!==null){a.setLayer(this._oLayer)}this.setChanged()},removeChild:function(c,d){if(typeof d!=="undefined"){this._aDisplayObjects[d].unsetLayer();
this._aDisplayObjects[d].unsetParent();this._aDisplayObjects.splice(d,1)}else{for(var b=0,a=this._aDisplayObjects.length;
b<a;b++){if(this._aDisplayObjects[b]===c){this._aDisplayObjects[b].unsetLayer();this._aDisplayObjects[b].unsetParent();this._aDisplayObjects.splice(b,1);
break}}}this.setChanged()},changeDisplayObjectZIndex:function(a){this.removeChild(a);this.addChild(a)},addTo:function(a){if(this._oLayer||this._oParent){if(this._oLayer===a||this._oParent===a){return this
}else{this.leave()}}a.addChild(this);return this},hasChild:function(){return this._aDisplayObjects.length>0},getChildren:function(){return this._aDisplayObjects
},getParent:function(){return this._oParent||false},setParent:function(a){this._oParent=a},unsetParent:function(){this._oParent=null
},leave:function(){var a=null;if(this._oParent!==null){a=this._oParent}else{if(this._oLayer){a=this.getLayer()}}if(a){a.removeChild(this)
}return this},getId:function(){return this._sId},getImage:function(){return this._elImage||null},getImageSize:function(){return this._htImageSize||false
},setImage:function(a){if(typeof a==="string"||!a){if(this._htGetImageData!==null&&this._htGetImageData.name!==a){collie.ImageManager.cancelGetImage(this._htGetImageData.name,this._htGetImageData.callback);
this._htGetImageData=null}if(!a){this._elImage=null;this.setChanged()}else{this._htGetImageData={name:a,callback:(function(b){this.setImage(b)
}).bind(this)};collie.ImageManager.getImage(this._htGetImageData.name,this._htGetImageData.callback)}return}if(this._elImage&&this._elImage===a){return
}this._elImage=a;this._nImageWidth=a.width;this._nImageHeight=a.height;this._htImageSize={width:this._bRetinaDisplay?this._nImageWidth/2:this._nImageWidth,height:this._bRetinaDisplay?this._nImageHeight/2:this._nImageHeight};
this._htSpriteSheet=collie.ImageManager.getSprite(this._htOption.backgroundImage);if(!this._bCustomSize){this.set({width:this._htImageSize.width,height:this._htImageSize.height})
}this._setSpritePosition("spriteSheet",this._htOption.spriteSheet);this._setSpritePosition("spriteX",this._htOption.spriteX);
this._setSpritePosition("spriteY",this._htOption.spriteY);this.setDirty("backgroundImage");this.setChanged()},getDrawing:function(){return this._oDrawing
},setChanged:function(a){if(this._bChanged||(a&&this._bChangedTransforms)){return}if(this._oLayer!==null){this._oLayer.setChanged()
}if(!a){this._bChanged=true}this._bChangedTransforms=true;if(this._oParent){this._oParent.setChanged(false)}},unsetChanged:function(){this._bChanged=false;
this._bChangedTransforms=false},isChanged:function(a){return !a?(this._bChanged||this._bChangedTransforms):!this._bChanged&&this._bChangedTransforms
},setLayer:function(b){if(this._sId in collie.DisplayObject.htFactory){throw new Error("Exists DisplayObject Id "+this._sId)
}collie.DisplayObject.htFactory[this._sId]=this;this._oLayer=b;this._sRenderingMode=this._oLayer.getRenderingMode();this._makeDrawing();
this._oDrawing.load();this.setChanged();if(typeof this._htOption.x==="string"||typeof this._htOption.y==="string"){this.align(typeof this._htOption.x==="string"?this._htOption.x:false,typeof this._htOption.y==="string"?this._htOption.y:false)
}if(this._nPositionRight!==null){this.right(this._nPositionRight);this._nPositionRight=null}if(this._nPositionBottom!==null){this.bottom(this._nPositionBottom);
this._nPositionBottom=null}for(var c=0,a=this._aDisplayObjects.length;c<a;c++){this._aDisplayObjects[c].setLayer(b)}},unsetLayer:function(){if(this.getLayer()){for(var b=0,a=this._aDisplayObjects.length;
b<a;b++){this._aDisplayObjects[b].unsetLayer()}this._oDrawing.unload();this.setDirty();this.setChanged();this._sRenderingMode=null;
this._oDrawing=null;this._oLayer=null;delete collie.DisplayObject.htFactory[this._sId]}},_makeDrawing:function(){if(this._oDrawing===null){this._oDrawing=this._sRenderingMode==="dom"?new collie.DisplayObjectDOM(this):new collie.DisplayObjectCanvas(this)
}},getLayer:function(){return this._oLayer||false},addMatrix:function(b){if(b instanceof Array){for(var c=0,a=b.length;c<a;
c++){this.addMatrix(b[c])}return}this._htMatrix[b.name]=b;delete this._htMatrix[b.name].name},changeMatrix:function(a){if(a in this._htMatrix){this.set(this._htMatrix[a])
}},update:function(f,h,g,d,e,c){this._updateMovableOption(f);if(this._sRenderingMode==="canvas"&&!this._htOption.visible){this.unsetChanged();
return}h+=this._htOption.x;g+=this._htOption.y;if((this._sRenderingMode==="dom"&&this.isChanged())||(this._sRenderingMode==="canvas"&&(h+this._htOption.width>=0||h<=d||g+this._htOption.height>=0||g<=e))){this._oDrawing.draw(f,h,g,d,e,c)
}this.unsetChanged();this._resetDirty();if(this._htOption.velocityX!==0||this._htOption.velocityY!==0||this._htOption.velocityRotate!==0||this._htOption.forceX!==0||this._htOption.forceY!==0||this._htOption.forceRotate!==0){this.setChanged(true)
}if(this._sRenderingMode==="canvas"||!this._htOption.visible){return}if(this.hasChild()){for(var b=0,a=this._aDisplayObjects.length;
b<a;b++){this._aDisplayObjects[b].update(f,h,g,d,e)}}},_updateMovableOption:function(e){if(this._htOption.velocityX!==0||this._htOption.velocityY!==0||this._htOption.velocityRotate!==0||this._htOption.forceX!==0||this._htOption.forceY!==0||this._htOption.forceRotate!==0){var f=Math.max(17,e)/1000;
if(!this._htOption.useRealTime){f=1}var c=this._htOption.velocityX;var b=this._htOption.velocityY;var h=this._htOption.x;
var g=this._htOption.y;c+=(this._htOption.forceX/this._htOption.mass)*f;b+=(this._htOption.forceY/this._htOption.mass)*f;
var a=this._htOption.friction*c*this._htOption.mass*f;var j=this._htOption.friction*b*this._htOption.mass*f;if(c!==0){c=(Math.abs(c)/c!==Math.abs(c-a)/(c-a))?0:c-a
}if(b!==0){b=(Math.abs(b)/b!==Math.abs(b-j)/(b-j))?0:b-j}h+=c*f;g+=b*f;c=Math.floor(c*1000)/1000;b=Math.floor(b*1000)/1000;
if(this._htOption.friction&&Math.abs(c)<0.05){c=0}if(this._htOption.friction&&Math.abs(b)<0.05){b=0}if(h!==this._htOption.x||g!==this._htOption.y||c!==this._htOption.velocityX||b!==this._htOption.velocityY){this.set("x",h);
this.set("y",g);this.set("velocityX",c);this.set("velocityY",b)}if(this._htOption.forceRotate!==0){this.set("velocityRotate",this._htOption.velocityRotate+this._htOption.forceRotate)
}if(this._htOption.velocityRotate!==0){var d=collie.util.fixAngle(collie.util.toRad(this._htOption.angle+this._htOption.velocityRotate*f));
this.set("angle",Math.round(collie.util.toDeg(d)*1000)/1000)}}},getRelatedPosition:function(){if(this._htRelatedPosition.x===null){this._htRelatedPosition.x=this._htOption.x;
this._htRelatedPosition.y=this._htOption.y;if(this._oParent){var a=this._oParent.getRelatedPosition();this._htRelatedPosition.x+=a.x;
this._htRelatedPosition.y+=a.y}}return this._htRelatedPosition},getBoundary:function(b,e){var d=collie.Transform.getBoundary(this,e);
this._htBoundary.left=d.left;this._htBoundary.right=d.right;this._htBoundary.top=d.top;this._htBoundary.bottom=d.bottom;this._htBoundary.isTransform=d.isTransform;
this._htBoundary.points=d.points;if(b){var f=this.getRelatedPosition();if(this._htBoundary.points){for(var c=0,a=this._htBoundary.points.length;
c<a;c++){this._htBoundary.points[c][0]+=f.x;this._htBoundary.points[c][1]+=f.y}}this._htBoundary.left+=f.x;this._htBoundary.right+=f.x;
this._htBoundary.top+=f.y;this._htBoundary.bottom+=f.y}return this._htBoundary},resetPositionCache:function(){this._htRelatedPosition.x=null;
this._htRelatedPosition.y=null;if(this.hasChild()){for(var b=0,a=this._aDisplayObjects.length;b<a;b++){this._aDisplayObjects[b].resetPositionCache()
}}},getHitAreaBoundary:function(){if(!this._htOption.hitArea){return this.getBoundary(true)}else{if(this._htOption.hitArea instanceof Array){var a=collie.Transform.points(this,collie.util.getBoundaryToPoints(this._htHitAreaBoundary));
var b=collie.util.getBoundary(a);var c=this.getRelatedPosition();return{left:b.left+c.x,right:b.right+c.x,top:b.top+c.y,bottom:b.bottom+c.y}
}else{return this._htOption.hitArea.getBoundary(true)}}},getOrigin:function(){return this._htOrigin},_setOrigin:function(){switch(this._htOption.originX){case"left":this._htOrigin.x=0;
break;case"right":this._htOrigin.x=this._htOption.width;break;case"center":this._htOrigin.x=this._htOption.width/2;break;
default:this._htOrigin.x=parseInt(this._htOption.originX,10)}switch(this._htOption.originY){case"top":this._htOrigin.y=0;
break;case"bottom":this._htOrigin.y=this._htOption.height;break;case"center":this._htOrigin.y=this._htOption.height/2;break;
default:this._htOrigin.y=parseInt(this._htOption.originY,10)}},_fixPosition:function(){var f=this._htOption.x;var e=this._htOption.y;
var d;var b;var c;var a;if(this._htOption.rangeX){d=this._htOption.rangeX[0];b=this._htOption.rangeX[1];if(this._htOption.positionRepeat){if(f<d){do{f+=(b-d)
}while(f<d)}else{if(f>b){do{f-=(b-d)}while(f>b)}}}else{f=Math.max(d,f);f=Math.min(b,f)}if(f!==this._htOption.x){this.set("x",f,true)
}}if(this._htOption.rangeY){c=this._htOption.rangeY[0];a=this._htOption.rangeY[1];if(this._htOption.positionRepeat){if(e<c){do{e+=(a-c)
}while(e<c)}else{if(e>a){do{e-=(a-c)}while(e>a)}}}else{e=Math.max(c,e);e=Math.min(a,e)}if(e!==this._htOption.y){this.set("y",e,true)
}}},_makeHitAreaBoundary:function(){this._htHitAreaBoundary=collie.util.getBoundary(this._htOption.hitArea)},align:function(e,b,d){if(!this.getLayer()){return
}d=d||this.getParent();var c=0;var a=0;var g=0;var f=0;if(d){c=d._htOption.width;a=d._htOption.height}else{c=this._oLayer._htOption.width;
a=this._oLayer._htOption.height}if(e!==false){g=(e==="right")?c-this._htOption.width:c/2-this._htOption.width/2;this.set("x",g)
}if(b!==false){f=(b==="bottom")?a-this._htOption.height:a/2-this._htOption.height/2;this.set("y",f)}},right:function(b){var a=0;
if(this._oParent){a=this._oParent._htOption.width}if(!a&&this._oLayer){a=this._oLayer._htOption.width}if(a){this.set("x",a-(this._htOption.width+b))
}else{this._nPositionRight=b}return this},bottom:function(b){var a=0;if(this._oParent){a=this._oParent.get("height")}if(!a&&this._oLayer){a=this._oLayer.option("height")
}if(a){this.set("y",a-(this._htOption.height+b))}else{this._nPositionBottom=b}return this},resizeFixedRatio:function(c,b){if(this.getImage()){var a=this.getImage().width;
var d=this.getImage().height;if(c){b=c*(d/a)}else{if(b){c=b*(a/d)}}this.set("width",Math.round(c));this.set("height",Math.round(b))
}},_setSpritePosition:function(n,e){if(this._elImage&&e!==null){if(this._htOption.spriteSheet!==null){var k=this._htSpriteSheet[this._htOption.spriteSheet];
var f;var d;if(n==="spriteSheet"&&this._htSpriteSheet&&this._htSpriteSheet[e]){if(typeof k[0][0]!=="undefined"){if(this._htOption.spriteX!==null){f=k[this._htOption.spriteX][0];
d=k[this._htOption.spriteX][1]}else{f=k[0][0];d=k[0][1]}}else{f=k[0];d=k[1]}this.set("offsetX",f,true);this.set("offsetY",d,true)
}else{if(n==="spriteX"&&typeof k[e]!=="undefined"){this.set("offsetX",k[e][0],true);this.set("offsetY",k[e][1],true)}}}else{var a=this.getImageSize();
var l=this._htOption.width;var m=this._htOption.height;var g=this._htOption.spriteLength-1;var j=(a.width/this._htOption.width)-1;
var h=(a.height/this._htOption.height)-1;var c=a.width-1;var b=a.height-1;if(g>=0&&m<a.height){c=j*a.width;b=h*a.height}switch(n){case"spriteX":var f=0;
var d=0;if(g>j&&m<a.height){d=Math.floor(e/(j+1))*m;f=(e%(j+1))*l}else{f=Math.min(e,j)*l}this.set("offsetX",f,true);this.set("offsetY",d,true);
break;case"spriteY":e=Math.min(e,h);this.set("offsetY",e*m,true);break}}}},hasAttachedHandler:function(){if(this._htHandler&&(("click" in this._htHandler)&&this._htHandler.click.length>0)||(("mousedown" in this._htHandler)&&this._htHandler.mousedown.length>0)||(("mouseup" in this._htHandler)&&this._htHandler.mouseup.length>0)){return true
}else{return false}},move:function(h,f,e,j){var c=this._htOption.x;var b=this._htOption.y;var a=collie.util.getDistance(c,b,h,f);
var d=Math.round((a/e)*1000);if(this._oTimerMove!==null){this._oTimerMove.stop();this._oTimerMove=null}if(!e||d<collie.Renderer.getInfo().fps){this.set({x:h,y:f});
if(j){j(this)}}else{var g={from:[c,b],to:[h,f],set:["x","y"]};if(j){g.onComplete=function(){j(this)}}this._oTimerMove=collie.Timer.transition(this,d,g);
return this._oTimerMove}},moveBy:function(f,d,e,c){var b=this._htOption.x;var a=this._htOption.y;return this.move(b+f,a+d,e,c)
},toString:function(){return"DisplayObject"+(this._htOption.name?" "+this._htOption.name:"")+" #"+this.getId()+(this.getImage()?"(image:"+this.getImage().src+")":"")
},clone:function(d){var c=new this.constructor(this._htOption);if(d&&this._aDisplayObjects.length){for(var b=0,a=this._aDisplayObjects.length;
b<a;b++){this._aDisplayObjects[b].clone(true).addTo(c)}}return c}},collie.Component);collie.DisplayObject._idx=0;collie.DisplayObject.htFactory={};
collie.MovableObject=collie.Class({$init:function(a){}},collie.DisplayObject);collie.Rectangle=collie.Class({$init:function(a){this.option({radius:0,strokeColor:"",strokeWidth:0,fillColor:"",fillImage:""},null,true);
this._sBorderRadius=collie.util.getCSSPrefix("border-radius",true)},onDOMDraw:function(a){if(this._bChanged){if(this._htOption.radius){a.element.style[this._sBorderRadius]=this._htOption.radius+"px";
a.element.style.borderRadius=this._htOption.radius+"px"}if(this._htOption.fillImage){collie.ImageManager.getImage(this._htOption.fillImage,function(b){a.element.style.backgroundImage="url('"+b.src+"')"
})}else{if(this._htOption.fillColor){a.element.style.backgroundColor=this._htOption.fillColor}}if(this._htOption.strokeWidth){a.element.style.border=this._htOption.strokeWidth+"px solid "+this._htOption.strokeColor
}this._bChanged=false}},onCanvasDraw:function(j){var h=j.context;var b=this._htOption.radius;var d=collie.Renderer.isRetinaDisplay();
var e=this._htOption.width;var g=this._htOption.height;var f=this._htOption.strokeWidth;if(d){e*=2;g*=2;b*=2;f*=2}if(htInfo.fillImage){var a=collie.ImageManager.getImage(htInfo.fillImage);
if(!a){collie.ImageManager.getImage(htInfo.fillImage,function(){this.setChanged()}.bind(this))}else{var c=h.createPattern(a,"repeat");
h.fillStyle=c}}else{if(htInfo.fillColor){h.fillStyle=htInfo.fillColor}}if(this._htOption.strokeColor){h.strokeStyle=this._htOption.strokeColor
}if(this._htOption.strokeWidth){h.lineWidth=f}if(b){h.save();h.translate(j.x,j.y);h.beginPath();h.moveTo(b,0);h.lineTo(e-b,0);
h.quadraticCurveTo(e,0,e,b);h.lineTo(e,g-b);h.quadraticCurveTo(e,g,e-b,g);h.lineTo(b,g);h.quadraticCurveTo(0,g,0,g-b);h.lineTo(0,b);
h.quadraticCurveTo(0,0,b,0);h.closePath();h.restore();if(this._htOption.fillColor||this._htOption.fillImage){h.fill()}if(this._htOption.strokeWidth){h.stroke()
}}else{if(this._htOption.fillColor||this._htOption.fillImage){h.fillRect(j.x,j.y,e,g)}if(this._htOption.strokeWidth){h.strokeRect(j.x,j.y,e,g)
}}this._bChanged=false},toString:function(){return"Rectangle"+(this.get("name")?" "+this.get("name"):"")+" #"+this.getId()+(this.getImage()?"(image:"+this.getImage().src+")":"")
}},collie.DisplayObject);collie.Circle=collie.Class({$init:function(a){this.option({radius:0,strokeColor:"#000000",strokeWidth:0,fillColor:"",fillImage:"",startAngle:0,endAngle:360,closePath:false,anticlockwise:false,autoExpand:true},null,true);
this._oPaper=null;this.optionSetter("radius",this._expandSize.bind(this));this._expandSize()},_expandSize:function(){if(this._htOption.autoExpand&&this._htOption.radius){var a=this._htOption.radius*2+this._htOption.strokeWidth;
this.set("width",a);this.set("height",a)}},onDOMDraw:function(l){var a=l.element;if(typeof Raphael==="undefined"){return}var h=this.get();
var b=h.strokeWidth;var k=h.radius;var j=h.width;var s=h.height;var m=this.getDirty();var e;if(this._oPaper===null){this._oPaper=Raphael(a,j+b,s+b);
this._oPaper.canvas.style.zIndex=10}else{if(m&&(m.width||m.height)){this._oPaper.setSize(j,s)}}a.style.left=-(b/2)+"px";a.style.top=-(b/2)+"px";
this._oPaper.clear();if(k){var g=k;var f=k;var q=g+k*Math.cos(collie.util.toRad(h.startAngle));var d=f+k*Math.sin(collie.util.toRad(h.startAngle));
var p=g+k*Math.cos(collie.util.toRad(h.endAngle));var c=f+k*Math.sin(collie.util.toRad(h.endAngle));var r=h.anticlockwise?h.startAngle-h.endAngle:h.endAngle-h.startAngle;
if(Math.abs(r)>=360){r=360}else{if(r<0){r+=360}}var o=(r>180?1:0);var n=h.anticlockwise?0:1;if(r>=360){e=this._oPaper.circle(g,f,k)
}else{e=this._oPaper.path("M"+q+","+d+"a"+k+","+k+",0,"+o+","+n+","+(p-q)+","+(c-d)+(h.closePath?"L"+g+","+f+"L"+q+","+d+"Z":""))
}}if(e){e.transform("t"+(b/2)+","+(b/2));if(h.fillImage){collie.ImageManager.getImage(h.fillImage,function(t){e.attr("fill","url('"+t.src+"')")
})}else{if(h.fillColor){e.attr("fill",h.fillColor)}}if(h.strokeColor){e.attr("stroke",h.strokeColor)}e.attr("stroke-width",h.strokeWidth)
}},onCanvasDraw:function(p){var e=this.get();var n=p.context;var o=p.x;var m=p.y;var g=collie.Renderer.isRetinaDisplay();
var f=e.radius;var k=e.strokeWidth;var j=e.width;var l=e.height;if(g){j*=2;l*=2;f*=2;k*=2}if(e.fillImage){var d=collie.ImageManager.getImage(e.fillImage);
if(!d){collie.ImageManager.getImage(e.fillImage,function(){this.setChanged()}.bind(this))}else{var h=n.createPattern(d,"repeat");
n.fillStyle=h}}else{if(e.fillColor){n.fillStyle=e.fillColor}}if(e.strokeColor){n.strokeStyle=e.strokeColor}if(k){n.lineWidth=k
}if(f){var b=o+f;var a=m+f;var c=Math.abs(e.startAngle-e.endAngle)>=360;n.beginPath();if(e.closePath&&!c){n.moveTo(b,a)}n.arc(b,a,f,collie.util.toRad(e.startAngle),collie.util.toRad(e.endAngle),e.anticlockwise);
if(e.closePath){n.closePath()}if(e.fillColor||e.fillImage){n.fill()}if(e.strokeWidth){n.stroke()}}},center:function(b,a){this.set("x",b-this._htOption.radius);
this.set("y",a-this._htOption.radius);return this},toString:function(){return"Circle"+(this._htOption.name?" "+this._htOption.name:"")+" #"+this.getId()+(this.getImage()?"(image:"+this.getImage().src+")":"")
}},collie.DisplayObject);collie.Polyline=collie.Class({$init:function(a){this.option({strokeColor:"#000000",strokeWidth:1,fillColor:"",fillImage:"",lineCap:"butt",lineJoin:"miter",miterLimit:10,dashArray:"",closePath:false},null,true);
this._aPointData=[];this._oPaper=null;this._htPointBoundary={right:null,bottom:null}},setPointData:function(a,b){this._aPointData=a;
this.setChanged();if(!b){this._expandBoundary(a)}},getPointData:function(){return this._aPointData},addPoint:function(c,b,a){this._aPointData.push([c,b]);
this.setChanged();if(!a){this._expandBoundary(c,b)}},moveTo:function(b,a){this._aPointData.push([b,a,true])},lineTo:function(c,b,a){this.addPoint(c,b,a)
},resetPointData:function(){this._aPointData=[];this._htPointBoundary={right:null,bottom:null};this.setChanged()},_expandBoundary:function(h,g,c){if(h instanceof Array){for(var e=0,a=h.length;
e<a;e++){this._expandBoundary(h[e][0],h[e][1],true)}}else{this._htPointBoundary.right=this._htPointBoundary.right===null?h:Math.max(h,this._htPointBoundary.right);
this._htPointBoundary.bottom=this._htPointBoundary.bottom===null?g:Math.max(g,this._htPointBoundary.bottom)}if(!c){var f=this._htOption.strokeWidth*(collie.Renderer.isRetinaDisplay()?2:1);
var d=this._htPointBoundary.right+f*2;var b=this._htPointBoundary.bottom+f*2;this.set({width:d,height:b});if(this._oPaper!==null){this._oPaper.setSize(d,b)
}}},onDOMDraw:function(h){var a=h.element;if(this._aPointData.length<2){return}if(typeof Raphael==="undefined"){return}var b=this.get();
var f=b.strokeWidth;var g=this.getDirty();if(this._oPaper===null){this._oPaper=Raphael(a,b.width,b.height);this._oPaper.canvas.style.zIndex=10
}else{if(g&&(g.width||g.height)){this._oPaper.setSize(b.width,b.height)}}a.style.left=-(f/2)+"px";a.style.top=-(f/2)+"px";
this._oPaper.clear();var e="M"+this._aPointData[0][0]+","+this._aPointData[0][1];for(var c=1,d=this._aPointData.length;c<d;
c++){e+=(this._aPointData[c][2]?"M":"L")+this._aPointData[c][0]+","+this._aPointData[c][1]}if(b.closePath&&(this._aPointData[0][0]!==this._aPointData[this._aPointData.length-1][0]||this._aPointData[0][1]!==this._aPointData[this._aPointData.length-1][1])){e+="L"+this._aPointData[0][0]+","+this._aPointData[0][1]
}var j=this._oPaper.path(e+(b.closePath?"Z":""));j.transform("t"+(f/2)+","+(f/2));if(b.fillImage){collie.ImageManager.getImage(b.fillImage,function(k){j.attr("fill","url('"+k.src+"')")
})}else{if(b.fillColor){j.attr("fill",b.fillColor)}}if(b.lineCap){j.attr("stroke-linecap",b.lineCap)}if(b.lineJoin){j.attr("stroke-linejoin",b.lineJoin)
}if(b.miterLimit!==null){j.attr("stroke-miterlimit",b.miterLimit)}if(b.strokeColor){j.attr("stroke",b.strokeColor)}j.attr("stroke-width",f);
if(b.dashArray){j.attr("stroke-dasharray",b.dashArray)}},onCanvasDraw:function(k){if(this._aPointData.length<2){return}var c=this.get();
var j=k.context;var g=collie.Renderer.isRetinaDisplay();var h=c.strokeWidth;var b=(g?2:1);j.save();j.translate(k.x,k.y);if(g){h*=2
}if(c.fillImage){var a=collie.ImageManager.getImage(c.fillImage);if(!a){collie.ImageManager.getImage(c.fillImage,function(){this.setChanged()
}.bind(this))}else{var f=j.createPattern(a,"repeat");j.fillStyle=f}}else{if(c.fillColor){j.fillStyle=c.fillColor}}if(c.strokeColor){j.strokeStyle=c.strokeColor
}j.lineWidth=h;if(c.lineCap){j.lineCap=c.lineCap}if(c.lineJoin){j.lineJoin=c.lineJoin}if(c.miterLimit){j.miterLimit=c.miterLimit
}if(c.dashArray){if(c.fillColor||c.fillImage){j.beginPath();j.moveTo(this._aPointData[0][0]*b,this._aPointData[0][1]*b);for(var d=1,e=this._aPointData.length;
d<e;d++){if(this._aPointData[d][2]){j.moveTo(this._aPointData[d][0]*b,this._aPointData[d][1]*b);continue}j.lineTo(this._aPointData[d][0]*b,this._aPointData[d][1]*b)
}if(c.closePath){j.closePath()}j.fill()}j.resetDashedLine()}j.beginPath();j.moveTo(this._aPointData[0][0]*b,this._aPointData[0][1]*b);
for(var d=1,e=this._aPointData.length;d<e;d++){if(this._aPointData[d][2]){j.moveTo(this._aPointData[d][0]*b,this._aPointData[d][1]*b);
continue}if(c.dashArray){j.dashedLine(this._aPointData[d-1][0]*b,this._aPointData[d-1][1]*b,this._aPointData[d][0]*b,this._aPointData[d][1]*b,collie.raphaelDashArray[c.dashArray],h)
}else{j.lineTo(this._aPointData[d][0]*b,this._aPointData[d][1]*b)}}if(c.dashArray&&c.closePath&&(this._aPointData[0][0]!==this._aPointData[this._aPointData.length-1][0]||this._aPointData[0][1]!==this._aPointData[this._aPointData.length-1][1])){j.dashedLine(this._aPointData[d-1][0]*b,this._aPointData[d-1][1]*b,this._aPointData[0][0]*b,this._aPointData[0][1]*b,collie.raphaelDashArray[c.dashArray],h)
}if(c.closePath){j.closePath()}if(!c.dashArray&&(c.fillColor||c.fillImage)){j.fill()}if(c.strokeWidth){j.stroke()}j.restore()
},toString:function(){return"Polyline"+(this._htOption.name?" "+this._htOption.name:"")+" #"+this.getId()+(this.getImage()?"(image:"+this.getImage().src+")":"")
}},collie.DisplayObject);collie.Text=collie.Class({$init:function(a){this._sText="";this.option({fontFamily:"Arial",fontWeight:"",fontSize:12,fontColor:"#000000",lineHeight:"auto",textAlign:"left",padding:"0 0 0 0",ellipsisMaxLine:0,ellipsisString:"...",useEllipsis:false,useCache:true},null,true);
this._elText=null;this._nTextWidth=0;this._nRatio=1;this._aCallbackTextWidth=[]},_initElement:function(){if(this._elText===null){this._elText=document.createElement("div");
this._elText.style.display="inline";this.getDrawing().getItemElement().appendChild(this._elText)}},onCanvasDraw:function(a){this._nRatio=this._sRenderingMode==="canvas"&&this._bRetinaDisplay?2:1;
this._oContext=a.context;var b=this._getMaxWidth();this._oContext.font=this._getFontText();this._oContext.fillStyle=this._htOption.fontColor;
this._oContext.textBaseline="top";this._fillTextMultiline(this._wordWrap(b).split("\n"),a.x,a.y);this._triggerGetTextWidth()
},onDOMDraw:function(a){this._initElement();var c=this.getDrawing();var e=a.element;var b=this._sText.replace(/\n/g,"<br />");
var d=e.style;d.font=this._getFontText();d.color=this._htOption.fontColor;d.padding=this._getPadding().replace(/ /g,"px ")+"px";
d.width=this._getMaxWidth()+"px";d.height=this._getMaxHeight()+"px";d.lineHeight=this._getLineHeight()+"px";d.textAlign=this._htOption.textAlign;
if(this._elText.innerHTML!=b){this._elText.innerHTML=b}this.unsetChanged();this._getDOMTextWidth();this._triggerGetTextWidth()
},_getDOMTextWidth:function(){if(this._elText!==null){this._nTextWidth=this._elText.offsetWidth}},_getFontText:function(){return this._htOption.fontWeight+" "+(this._htOption.fontSize*this._nRatio)+"px "+this._htOption.fontFamily
},_getLineHeight:function(){return this._htOption.lineHeight==="auto"?(this._htOption.fontSize*this._nRatio):this._htOption.lineHeight*this._nRatio
},_fillTextMultiline:function(d,g,f){var c=this._getPadding("left");var e=this._htOption.ellipsisMaxLine;this._nTextWidth=0;
for(var b=0;b<d.length;b++){if(e&&b>=e-1){if(d.length>e){d[b]=this._insertEllipsisText(d[b]);d.splice(b+1,d.length-(b+1))
}}var a=this._oContext.measureText(d[b]).width;if(this._htOption.textAlign==="center"){c=this._getMaxWidth()/2-a/2+this._getPadding("left")
}else{if(this._htOption.textAlign==="right"){c=((this._htOption.width*this._nRatio)-this._getPadding("right"))-a}}this._oContext.fillText(d[b],g+c,f+this._getTopPosition(b+1));
this._nTextWidth=Math.max(this._nTextWidth,a)}},_getMaxWidth:function(){return(this._htOption.width*this._nRatio)-(this._getPadding("left")+this._getPadding("right"))
},_getMaxHeight:function(){return(this._htOption.height*this._nRatio)-(this._getPadding("top")+this._getPadding("bottom"))
},_getTopPosition:function(a){return this._getLineHeight()*(a-1)+this._getPadding("top")},_getPadding:function(b){var e=this._htOption.padding||"0 0 0 0";
var c=e.split(" ");for(var d=0,a=c.length;d<a;d++){c[d]=parseInt(c[d],10)*this._nRatio}switch(b){case"top":return c[0];case"right":return c[1];
case"bottom":return c[2];case"left":return c[3];default:return c.join(" ")}},_insertEllipsisText:function(b){var a=this._getMaxWidth();
var d="";for(var c=b.length;c>0;c--){d=b.substr(0,c)+this._htOption.ellipsisString;if(this._oContext.measureText(d).width<=a){return d
}}return b},_wordWrap:function(a,d){var c=d||this._sText;var b=1;if(!c){return""}d=c.substr(0,1);while(this._oContext.measureText(d).width<=a){b++;
if(b>c.length){return d}d=c.substr(0,b);if(c.substr(b-1,1)==="\n"){break}}b=Math.max(1,b-1);d=c.substr(0,b);if(c.substr(b,1)==="\n"){b++
}if(c.length>b){d+="\n"+(this._wordWrap(a,c.substr(b)))}return d},text:function(a){this._nTextWidth=0;this._aCallbackTextWidth=[];
this._sText=a.toString();this.setChanged();return this},getTextWidth:function(a){if(a){this._aCallbackTextWidth.push(a)}if(this._nTextWidth){this._triggerGetTextWidth();
return this._nTextWidth/this._nRatio}},_triggerGetTextWidth:function(){if(this._aCallbackTextWidth.length>0){for(var b=0,a=this._aCallbackTextWidth.length;
b<a;b++){this._aCallbackTextWidth[b](this._nTextWidth/this._nRatio)}this._aCallbackTextWidth=[]}},toString:function(){return"Text"+(this._htOption.name?" "+this._htOption.name:"")+" #"+this.getId()+(this.getImage()?"(image:"+this.getImage().src+")":"")
}},collie.DisplayObject);collie.Animation=collie.Class({$init:function(b,c,a){this._nId=++collie.Animation._idx;this._bIsPlaying=false;
this._fCallback=b;this._oTimerList=null;this.option("useAutoStart",true);this.option((typeof c==="object"?c:a)||{});this.setDuration(c);
this.setOptionEvent(a)},setOptionEvent:function(b){if(b){for(var a in b){if(a.toString().indexOf("on")===0){this.attach(a.toString().replace(/^on/,"").toLowerCase(),b[a])
}}}},triggerCallback:function(e){if(typeof this._fCallback!=="function"&&this._htOption.set){var d={};if(this._htOption.set instanceof Array){for(var c=0,a=this._htOption.set.length;
c<a;c++){d[this._htOption.set[c]]=(e.value instanceof Array)?e.value[c]:e.value}}else{d[this._htOption.set]=e.value}if(this._fCallback instanceof Array){for(var b=0,a=this._fCallback.length;
b<a;b++){this._fCallback[b].set(d)}}else{this._fCallback.set(d)}}else{if(this._fCallback){this._fCallback(e)}}},setDuration:function(a){this._nDuration=parseInt(a,10)
},getDuration:function(){return this._nDuration},setTimerList:function(a){this._oTimerList=a;if(this._htOption.useAutoStart){this.start()
}},getId:function(){return this._nId},run:function(b,a){throw new Error("abstract method")},reset:function(){throw new Error("abstract method")
},stop:function(a){if(this.isPlaying()){if(this._oTimerList!==null){this._oTimerList.remove(this)}this._bIsPlaying=false;
this.reset();if(!a){this.fireEvent("stop")}}},pause:function(){if(this.isPlaying()){this._bIsPlaying=false;this.fireEvent("pause");
if(this._oTimerList!==null){this._oTimerList.remove(this)}}},start:function(){if(!this.isPlaying()){this._bIsPlaying=true;
if(this._oTimerList!==null){this._oTimerList.add(this)}this.fireEvent("start")}},isPlaying:function(){return this._bIsPlaying
},complete:function(){if(this.isPlaying()){if(this._fCallbackComplete){this._fCallbackComplete()}this.stop(true);this.fireEvent("complete")
}}},collie.Component);collie.Animation._idx=0;collie.AnimationTransition=collie.Class({$init:function(c,d,b){this.option({from:null,to:null,set:"",loop:1,effect:collie.Effect.linear});
this._htCallback={};this.option(b||{});var a=this.reset.bind(this);this.optionSetter("from",a);this.optionSetter("to",a);
this._nCount=0;this._nCountCycle=0;this._nFrameAtRunLastest=null;this._nRunningTime=null;this._bIsArrayValue=false},start:function(){if(this._htOption.from===null&&typeof this._fCallback!=="function"){this._setDefaultFromValues()
}if(this._nFrameAtRunLastest===null){this.reset()}this.constructor.$super.start.call(this)},_setDefaultFromValues:function(){var b=null;
if(this._htOption.set){if(this._htOption.set instanceof Array){b=[];for(var c=0,a=this._htOption.set.length;c<a;c++){b.push(this._fCallback.get(this._htOption.set[c]))
}}else{b=this._fCallback.get(this._htOption.set)}this.option("from",b)}},reset:function(){this._nFrameAtRunLastest=null;this._nRunningTime=null;
this._nValue=this._htOption.from;this._bIsArrayValue=this._htOption.from instanceof Array;this._nCount=0;this._nCountCycle=0;
if(this._bIsArrayValue){this._fEffect=[];var c=null;for(var b=0,a=this._htOption.from.length;b<a;b++){c=(this._htOption.effect instanceof Array)?this._htOption.effect[b]:this._htOption.effect;
this._fEffect[b]=c(this._htOption.from[b],this._htOption.to[b])}}else{this._fEffect=this._htOption.effect(this._htOption.from,this._htOption.to)
}},setValue:function(a){this._nValue=a},getValue:function(){return this._nValue},run:function(b,a){if(b===undefined){b=collie.Renderer.getInfo().frame
}if(this._nFrameAtRunLastest>b){this.reset();return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=b;this._nRunningTime=0;
a=0}this._nRunningTime+=a;this._nCount++;if(this._nRunningTime>=this._nDuration){this._nCountCycle++;if(!this._isEndValue()&&this._htOption.loop&&this._htOption.loop<=this._nCountCycle){this._setEndValue()
}else{if(!this._htOption.loop||this._htOption.loop>this._nCountCycle){this.fireEvent("end");this._nFrameAtRunLastest=b;this._nRunningTime=this._nRunningTime-this._nDuration;
this._nValue=this._htOption.from;this._transitionValue(this._nRunningTime)}else{this.complete();return}}}else{if(this._nRunningTime>0){this._transitionValue(this._nRunningTime)
}}this._htCallback.timer=this;this._htCallback.frame=b;this._htCallback.duration=this._nDuration;this._htCallback.cycle=this._nCountCycle;
this._htCallback.runningTime=this._nRunningTime;this._htCallback.from=this._htOption.from;this._htCallback.to=this._htOption.to;
this._htCallback.value=this._nValue;this.triggerCallback(this._htCallback);if(this._nRunningTime>0){this._nFrameAtRunLastest=b
}},_transitionValue:function(c){if(this._bIsArrayValue){this._nValue=[];for(var b=0,a=this._htOption.from.length;b<a;b++){this._nValue[b]=parseFloat(this._fEffect[b](Math.max(0,Math.min(1,c/this._nDuration))))
}}else{this._nValue=parseFloat(this._fEffect(Math.max(0,Math.min(1,c/this._nDuration))))}},_isEndValue:function(){if(this._bIsArrayValue){for(var b=0,a=this._htOption.to.length;
b<a;b++){if(this._nValue[b]!==parseFloat(this._fEffect[b](1))){return false}}return true}else{return this._nValue===parseFloat(this._fEffect(1))
}},_setEndValue:function(){if(this._bIsArrayValue){for(var b=0,a=this._htOption.to.length;b<a;b++){this._nValue[b]=parseFloat(this._fEffect[b](1))
}}else{this._nValue=parseFloat(this._fEffect(1))}}},collie.Animation);collie.AnimationRepeat=collie.Class({$init:function(b,c,a){this.option({beforeDelay:0,afterDelay:0,loop:0,useRealTime:true});
this.option(a||{});this.reset();this.setDuration(c);this._nFrameAtRunLastest=null},setDuration:function(a){a=parseInt(a,10);
if(a<collie.Renderer.getDuration()){a=collie.Renderer.getDuration()}this._nDuration=a},reset:function(){this._nCount=0;this._nFrameAtRunLastest=null;
this._nRunningTime=null;this._nRunLastestTime=null;this._nBeforeDelay=this._htOption.beforeDelay},run:function(c,a){if(c===undefined){c=collie.Renderer.getInfo().frame
}if(this._nFrameAtRunLastest>c){this.reset();return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=c;this._nRunningTime=0;
this._nRunLastestTime=0;a=0}this._nRunningTime+=a;var b=Math.max(1,Math.floor((this._nRunningTime-this._nRunLastestTime)/this._nDuration))-1;
if(this._nCount===0&&this._nBeforeDelay){if(this._nRunLastestTime+this._nBeforeDelay<=this._nRunningTime){this.reset();this._nBeforeDelay=0
}return}if(this._nRunningTime===0||this._nRunLastestTime+this._nDuration<=this._nRunningTime){this._nCount+=this._htOption.useRealTime?1+b:1;
this._fCallback({timer:this,frame:c,duration:this._nDuration,count:this._nCount,skippedCount:b,runningTime:this._nRunningTime});
if(this._htOption.loop&&this._htOption.loop<=this._nCount){this.complete();return}this._nFrameAtRunLastest=c;this._nRunLastestTime=this._nRunningTime
}}},collie.Animation);collie.AnimationCycle=collie.Class({$init:function(b,d,a){this._nFPS=null;this._htCallback={};var c=this._setterFPS.bind(this);
this.optionSetter("valueSet",this._setterValueSet.bind(this));this.optionSetter("to",c);this.optionSetter("from",c);this.option({delay:0,from:0,to:0,step:1,loop:0,set:"spriteX",useRealTime:true,valueSet:null,start:null});
this.option(a||{});this._nFrameAtRunLastest=null;this._nRunLastestTime=null;this._nRunningTime=null;this._nCountCycle=0;this._nCountCycleBefore=0;
this.setDuration(d);this.reset()},reset:function(){this._nCount=0;this._nCountCycle=0;this._nCountCycleBefore=0;this._nFrameAtRunLastest=null;
this._nRunningTime=null;this._nRunLastestTime=null;this._nValue=(this._htOption.start!==null?this._htOption.start:this._htOption.from)-this._htOption.step
},_setterValueSet:function(){var a=this._htOption.valueSet;if(a&&a instanceof Array){this.option({from:0,to:a.length-1,step:1})
}},_setterFPS:function(){if(this._nFPS!==null&&typeof this._htOption.to!=="undefined"&&typeof this._htOption.from!=="undefined"){var a=(this._htOption.to-this._htOption.from)+1;
this._nDuration=Math.round(1000/this._nFPS*a)}},setDuration:function(a){this._nDuration=parseInt(a,10);if(/fps/i.test(a)&&typeof this._htOption.to!=="undefined"&&typeof this._htOption.from!=="undefined"){this._nFPS=parseInt(a,10);
this._setterFPS()}else{this._nFPS=null}},setValue:function(a){this._nValue=a},getValue:function(){return this._htOption.valueSet?this._htOption.valueSet[this._nValue]:this._nValue
},run:function(g,e){if(typeof g==="undefined"){g=collie.Renderer.getInfo().frame}if(this._nFrameAtRunLastest>g){this.reset();
return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=g;this._nRunLastestTime=0;this._nRunningTime=0;e=0}if(!e){e=0
}var d=this._htOption;var c=d.to-d.from;this._nTotalCount=c/d.step;this._nTerm=this._nDuration/this._nTotalCount;this._nRunningTime+=e;
var f=(!d.useRealTime)?0:Math.max(1,Math.floor((this._nRunningTime-this._nRunLastestTime)/this._nTerm))-1;if(this._nRunningTime===0||this._nRunLastestTime+this._nTerm<=this._nRunningTime){if(this._nCountCycleBefore!==this._nCountCycle){this.fireEvent("end")
}if(d.loop&&this._nCountCycle>=d.loop){this.complete();return}if(this._nValue===d.to){this._nValue=d.from-d.step}this._nValue+=(d.step*(1+f));
this._nCount+=(1+f);this._nCountCycleBefore=this._nCountCycle;if(d.from<=d.to?this._nValue>=d.to:this._nValue<=d.to){var b=(this._nValue-d.to)/d.step;
var a=Math.ceil(b/(this._nTotalCount+1));b=b%(this._nTotalCount+1);if(b){this._nCountCycle+=a;this._nValue=d.from+(b-1)*d.step
}else{this._nCountCycle+=1;this._nValue=d.to}}this._htCallback.timer=this;this._htCallback.frame=g;this._htCallback.duration=this._nDuration;
this._htCallback.count=this._nCount;this._htCallback.skippedCount=f;this._htCallback.runningTime=this._nRunningTime;this._htCallback.value=this.getValue();
this._htCallback.cycle=this._nCountCycle;this._htCallback.step=d.step;this._htCallback.from=d.from;this._htCallback.to=d.to;
this.triggerCallback(this._htCallback);this._nFrameAtRunLastest=g;this._nRunLastestTime=this._nRunningTime}}},collie.Animation);
collie.AnimationDelay=collie.Class({$init:function(a,b){this.reset()},reset:function(){this._nFrameAtRunLastest=null;this._nRunningTime=null;
this._nRunLastestTime=null},run:function(b,a){if(b===undefined){b=collie.Renderer.getInfo().frame}if(this._nFrameAtRunLastest>b){this.reset();
return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=b;this._nRunLastestTime=0;this._nRunningTime=0;a=0}this._nRunningTime+=a;
if(this._nRunLastestTime+this._nDuration<=this._nRunningTime){if(this._fCallback){this._fCallback({timer:this,frame:b,duration:this._nDuration,runningTime:this._nRunningTime})
}this.complete()}}},collie.Animation);collie.AnimationTimeline=collie.Class({$init:function(d,c){this.option("loop",1);this.option(c||{});
this.setOptionEvent(c);this._htAnimations={};this._aTimeline=null;this._aRunningAnimation=null;this._nRunningTime=null;this._nCountCycle=0;
if(d){for(var b=0,a=d.length;b<a;b++){this.addTimeline.apply(this,d[b])}}this.reset()},add:function(a,c,d,f,b){var e;switch(c){case"delay":e=new collie.AnimationDelay(d,f,b);
break;case"repeat":e=new collie.AnimationRepeat(d,f,b);break;case"transition":e=new collie.AnimationTransition(d,f,b);break;
case"cycle":e=new collie.AnimationCycle(d,f,b);break;case"queue":e=new collie.AnimationQueue(d);break;default:if(c instanceof collie.Animation){e=c
}else{throw new Error(c+" timer is not defined")}}this._addTimeline(a,e);return e},_addTimeline:function(a,b){a=parseInt(a,10);
this._htAnimations[a]=this._htAnimations[a]||[];this._htAnimations[a].push(b);if(this._aTimeline!==null){this.reset()}},remove:function(b,c){b=parseInt(b,10);
if(this._htAnimations&&this._htAnimations[b]){for(var a=0;a<this._htAnimations[b].length;a++){if(typeof c==="undefined"||c===this._htAnimations[b][a]){this._htAnimations[b][a].stop();
this._htAnimations[b].splice(a,1);a--;if(typeof c!=="undefined"){break}}}if(this._htAnimations[b].length<1){delete this._htAnimations[b];
this._removeTimelineStartTime(b)}}},_removeTimelineStartTime:function(c){if(this._aTimeline){for(var b=0,a=this._aTimeline.length;
b<a;b++){if(this._aTimeline[b]===c){this._aTimeline.splice(b,1);break}}}},_initTimeline:function(){this._aTimeline=[];this._aRunningAnimation=[];
for(var a in this._htAnimations){this._aTimeline.push(parseInt(a,10))}this._aTimeline.sort(function(d,c){return d-c})},getAnimation:function(a){a=parseInt(a,10);
return(this._htAnimations&&this._htAnimations[a])?this._htAnimations[a]:false},getRunningTime:function(){return this._nRunningTime||0
},getCycle:function(){return this._nCountCycle||0},reset:function(){this._nFrameAtRunLastest=null;this._nRunningTime=null;
this._aTimeline=null;this._aRunningAnimation=null;this._nCountCycle=0;this._initTimeline()},run:function(e,d){if(e===undefined){e=collie.Renderer.getInfo().frame
}if(this._nFrameAtRunLastest>e){this.reset();return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=e;this._nRunningTime=0;
d=0}this._nRunningTime+=d;if(this._aTimeline.length>0){while(this._aTimeline[0]<=this._nRunningTime){var c=this._aTimeline.shift();
for(var b=0,a=this._htAnimations[c].length;b<a;b++){this._aRunningAnimation.push(this._htAnimations[c][b]);this._htAnimations[c][b].start()
}}}if(this._aRunningAnimation.length>0){for(var b=0;b<this._aRunningAnimation.length;b++){if(this._aRunningAnimation[b]){this._aRunningAnimation[b].run(e,d)
}if(!this._aRunningAnimation[b]||!this._aRunningAnimation[b].isPlaying()){if(this._aRunningAnimation[b]){this._aRunningAnimation[b].reset()
}this._aRunningAnimation.splice(b,1);b--;this._checkComplete()}}}},_checkComplete:function(){if(this._aRunningAnimation.length<1&&this._aTimeline.length<1){this._nCountCycle++;
if(this._htOption.loop&&this._htOption.loop<=this._nCountCycle){this.complete()}else{this.fireEvent("end");this._nFrameAtRunLastest=null;
this._nRunningTime=null;this._aTimeline=null;this._aRunningAnimation=null;this._initTimeline()}}}},collie.Animation);collie.AnimationQueue=collie.Class({$init:function(a){this.option("loop",1);
this.option(a||{});this.setOptionEvent(a);this._aAnimations=[];this._fOnCompleteAnimation=this._onCompleteAnimation.bind(this);
this.reset()},delay:function(b,c,a){this._add(new collie.AnimationDelay(b,c,a));return this},repeat:function(b,c,a){this._add(new collie.AnimationRepeat(b,c,a));
return this},transition:function(b,c,a){this._add(new collie.AnimationTransition(b,c,a));return this},cycle:function(b,c,a){this._add(new collie.AnimationCycle(b,c,a));
return this},getAnimation:function(a){return this._aAnimations[a]||false},_add:function(a){a.attach("complete",this._fOnCompleteAnimation);
this._aAnimations.push(a)},_onCompleteAnimation:function(){this.next()},next:function(){if(this._nAnimationIdx===null){this._nAnimationIdx=0
}else{this._nAnimationIdx++}if(this._nAnimationIdx>=this._aAnimations.length){this._nCount++;this.fireEvent("end",{count:this._nCount});
if(!this._htOption.loop||this._htOption.loop>this._nCount){this._nAnimationIdx=0}else{this.complete();return}}this._aAnimations[this._nAnimationIdx].stop();
this._aAnimations[this._nAnimationIdx].start()},reset:function(){this._nFrameAtRunLastest=null;this._nAnimationIdx=null;this._nCount=0
},removeAll:function(){this._aAnimations=[];this.reset()},removeAfter:function(){if(this._nAnimationIdx+1<=this._aAnimations.length-1){var a=this._aAnimations.length-(this._nAnimationIdx+1);
this._aAnimations.splice(this._nAnimationIdx+1,a)}},run:function(b,a){if(this._aAnimations.length<1){return}if(b===undefined){b=collie.Renderer.getInfo().frame
}if(this._nFrameAtRunLastest>b){this.reset();return}if(this._nFrameAtRunLastest===null){this._nFrameAtRunLastest=b}if(this._nAnimationIdx===null){this.next()
}this._aAnimations[this._nAnimationIdx].run(b,a)}},collie.Animation);collie.TimerList=collie.Class({$init:function(){this._aList=[]
},add:function(a){this._aList.unshift(a)},remove:function(c){for(var b=0,a=this._aList.length;b<a;b++){if(this._aList[b]===c){this._aList.splice(b,1);
break}}},removeAll:function(){this._aList=[]},stopAll:function(){for(var b=0,a=this._aList.length;b<a;b++){this._aList[b].stop()
}},run:function(c,b){for(var a=this._aList.length-1;a>=0;a--){if(this._aList[a]){if(this._aList[a].isPlaying()){this._aList[a].run(c,b)
}else{this._aList.splice(a,1)}}}}});collie.Timer=collie.Timer||new (collie.Class({$init:function(){this._oList=new collie.TimerList()
},run:function(b,a){this._oList.run(b,a)},stopAll:function(){this._oList.stopAll()},removeAll:function(){this._oList.removeAll()
},queue:function(a){var b=new collie.AnimationQueue(a);b.setTimerList(this._oList);return b},repeat:function(b,d,a){var c=new collie.AnimationRepeat(b,d,a);
c.setTimerList(this._oList);return c},transition:function(b,d,a){var c=new collie.AnimationTransition(b,d,a);c.setTimerList(this._oList);
return c},cycle:function(b,d,a){var c=new collie.AnimationCycle(b,d,a);c.setTimerList(this._oList);return c},delay:function(b,d,a){var c=new collie.AnimationDelay(b,d,a);
c.setTimerList(this._oList);return c},timeline:function(b,a){var c=new collie.AnimationTimeline(b,a);c.setTimerList(this._oList);
return c}}))();collie.Renderer=collie.Renderer||new (collie.Class({DEFAULT_FPS:"60fps",RETINA_DISPLAY:false,DEBUG_USE_DELAY:false,DEBUG_MAX_DELAY:200,DEBUG_RENDERING_MODE:"auto",$init:function(){this._sVisibilityChange=this._getNamePageVisibility();
this._bPlaying=false;this._bPause=false;this._nFPS=0;this._nDuration=0;this._nCurrentFrame=0;this._nSkippedFrame=0;this._nBeforeFrameTime=null;
this._nBeforeRenderingTime=0;this._aLayerList=[];this._fRender=this._render.bind(this);this._fCallback=null;this._htCallback={};
this._elContainer=document.createElement("div");this._elContainer.className="_collie_container";this._elContainer.style.position="relative";
this._elContainer.style.overflow="hidden";this._elParent=null;this._nDebugDelayedTime=0;this._oRenderingTimer=null;this._bLoaded=false;
this._sRenderingMode=null;this._bUseRetinaDisplay=null;this._htEventStatus={};this._htPosition={};this._bIsPreventDefault=true;
this._htDeviceInfo=collie.util.getDeviceInfo();if(this._sVisibilityChange){collie.util.addEventListener(document,this._sVisibilityChange,this._onChangeVisibility.bind(this))
}else{if(!this._htDeviceInfo.desktop){collie.util.addEventListener(window,"pageshow",this._onPageShow.bind(this));collie.util.addEventListener(window,"pagehide",this._onPageHide.bind(this))
}}collie.util.addEventListener(window,"resize",this.refresh.bind(this))},_onPageShow:function(){if(!this.isPlaying()&&this._bPause){this.resume()
}},_onPageHide:function(){if(this.isPlaying()){this.pause()}},_onChangeVisibility:function(){var a=document.visibilityState||document.webkitVisibilityState||document.mozVisibilityState;
if(a==="hidden"){this.pause()}else{if(a==="visible"){this.resume()}}},refresh:function(){if(this._elParent!==null){this._htPosition=collie.util.getPosition(this._elParent)
}},getPosition:function(){return this._bLoaded?this._htPosition:false},addLayer:function(b){if(!b||!("type" in b)||b.type!=="layer"){throw new Error("oLayer is not Layer instnace")
}for(var c=0,a=this._aLayerList.length;c<a;c++){if(this._aLayerList[c]===b){return}}this._aLayerList.push(b);if(this._bLoaded){b.load(this._elContainer,this._aLayerList.length);
this.resetLayerEvent()}},removeLayer:function(b){for(var c=0,a=this._aLayerList.length;c<a;c++){if(this._aLayerList[c]===b){this._aLayerList[c].unload();
this._aLayerList.splice(c,1);return}}},removeAllLayer:function(){for(var a=this._aLayerList.length-1;a>=0;a--){this._aLayerList[a].unload()
}this._aLayerList=[]},getLayers:function(){return this._aLayerList},resetLayerEvent:function(){for(var b=0,a=this._aLayerList.length;
b<a;b++){this._aLayerList[b].detachEvent()}for(var b=this._aLayerList.length-1;b>=0;b--){this._aLayerList[b].attachEvent()
}},getElement:function(){return this._elContainer},getDuration:function(){return this._nDuration},getInfo:function(){this._htCallback.frame=this._nCurrentFrame;
this._htCallback.skippedFrame=this._nSkippedFrame;this._htCallback.fps=this._nFPS;this._htCallback.duration=this._nDuration;
this._htCallback.renderingTime=this._nBeforeRenderingTime;this._htCallback.beforeFrameTime=this._nBeforeFrameTime;return this._htCallback
},getRenderingMode:function(){if(this._sRenderingMode===null){var a=collie.util.getDeviceInfo();this._sRenderingMode=this.DEBUG_RENDERING_MODE;
if(!this._sRenderingMode||this._sRenderingMode==="auto"){if((a.android&&!a.chrome&&((a.android<4.2&&a.android>=3)||a.android<2.2))||!a.supportCanvas||(a.ios&&a.ios<5)){this._sRenderingMode="dom"
}else{this._sRenderingMode="canvas"}}if(!a.supportCanvas){this._sRenderingMode="dom"}}return this._sRenderingMode},setRenderingMode:function(a){this.DEBUG_RENDERING_MODE=a.toString().toLowerCase();
this._sRenderingMode=null},isRetinaDisplay:function(){if(this._bUseRetinaDisplay===null){this._bUseRetinaDisplay=this.RETINA_DISPLAY!=="auto"?this.RETINA_DISPLAY:window.devicePixelRatio>=2&&(!collie.util.getDeviceInfo().android||collie.util.getDeviceInfo().android>=4);
var a=collie.util.getDeviceInfo();if(a.ie&&a.ie<9){this._bUseRetinaDisplay=false}}return this._bUseRetinaDisplay},setRetinaDisplay:function(a){this.RETINA_DISPLAY=a;
this._bUseRetinaDisplay=null},_getNameAnimationFrame:function(a){if(typeof window.requestAnimationFrame!=="undefined"){return a?"cancelAnimationFrame":"requestAnimationFrame"
}else{if(typeof window.webkitRequestAnimationFrame!=="undefined"){return a?"webkitCancelAnimationFrame":"webkitRequestAnimationFrame"
}else{if(typeof window.msRequestAnimationFrame!=="undefined"){return a?"msCancelAnimationFrame":"msRequestAnimationFrame"
}else{if(typeof window.mozRequestAnimationFrame!=="undefined"){return a?"mozCancelAnimationFrame":"mozRequestAnimationFrame"
}else{if(typeof window.oRequestAnimationFrame!=="undefined"){return a?"oCancelAnimationFrame":"oRequestAnimationFrame"}else{return false
}}}}}},_getNamePageVisibility:function(){if("hidden" in document){return"visibilitychange"}else{if("webkitHidden" in document){return"webkitvisibilitychange"
}else{if("mozHidden" in document){return"mozvisibilitychange"}else{return false}}}},load:function(c){this.unload();this._bLoaded=true;
this._elParent=c;this._elParent.appendChild(this._elContainer);this.refresh();if(this._aLayerList.length){for(var b=0,a=this._aLayerList.length;
b<a;b++){this._aLayerList[b].load(this._elContainer,b)}for(var b=this._aLayerList.length-1;b>=0;b--){this._aLayerList[b].attachEvent()
}}},unload:function(){if(this._bLoaded){for(var b=0,a=this._aLayerList.length;b<a;b++){this._aLayerList[b].unload()}this._elParent.removeChild(this._elContainer);
this._elParent=null;this._bLoaded=false}},start:function(a,b){if(!this._bPlaying){a=a||this.DEFAULT_FPS;this._nDuration=(/fps$/i.test(a))?1000/parseInt(a,10):Math.max(16,a);
this._fCallback=b||null;this._bPlaying=true;if(this._nDuration<17){this._sRequestAnimationFrameName=this._getNameAnimationFrame();
this._sCancelAnimationFrameName=this._getNameAnimationFrame(true)}else{this._sRequestAnimationFrameName=false;this._sCancelAnimationFrameName=false
}this.fireEvent("start");this._trigger(0)}},_trigger:function(a){if(!this._sVisibilityChange){if(window.screenTop<-30000){this.pause()
}}if(typeof a==="undefined"){a=0}else{a=parseInt(a,10)}if(this._sRequestAnimationFrameName!==false&&!this.DEBUG_USE_DELAY){this._oRenderingTimer=window[this._sRequestAnimationFrameName](this._fRender)
}else{this._oRenderingTimer=setTimeout(this._fRender,a)}},_render:function(b,a){if(!this._bPlaying&&!a){return}var d=this._getDate();
var g=0;var f=1;if(this._nBeforeFrameTime!==null){g=d-this._nBeforeFrameTime;f=b||Math.max(1,Math.round(g/this._nDuration));
if(this._sRequestAnimationFrameName!==false){b=0;f=1}this._nSkippedFrame+=Math.max(0,f-1);this._nFPS=Math.round(1000/(d-this._nBeforeFrameTime))
}this._nCurrentFrame+=f;var c=this.getInfo();if((this._fCallback===null||this._fCallback(c)!==false)&&this.fireEvent("process",c)!==false){collie.Timer.run(this._nCurrentFrame,g);
this._update(g);var e=0;if(this.DEBUG_USE_DELAY){e=Math.round(Math.random()*this.DEBUG_MAX_DELAY);this._nDebugDelayedTime+=e
}this._nBeforeRenderingTime=this._getDate()-d;this._nBeforeFrameTime=d;if(this._bPlaying){this._trigger(Math.max(0,this._nDuration-this._nBeforeRenderingTime+e*2))
}}else{this.stop()}},draw:function(a){this._fRender(a,true)},_getDate:function(){return(+new Date())+(this.DEBUG_USE_DELAY?this._nDebugDelayedTime:0)
},stop:function(){if(this._bPlaying){this._bPlaying=false;this._resetTimer();this.fireEvent("stop",this.getInfo());this._sRenderingMode=null;
this._bUseRetinaDisplay=null;this._fCallback=null;this._nCurrentFrame=0;this._nBeforeRenderingTime=0;this._nSkippedFrame=0;
this._nBeforeFrameTime=null}},_resetTimer:function(){if(this._oRenderingTimer!==null){if(this._sCancelAnimationFrameName!==false){window[this._sCancelAnimationFrameName](this._oRenderingTimer)
}else{clearTimeout(this._oRenderingTimer)}window.tempTimer=window.tempTimer||[];window.tempTimer.push(this._oRenderingTimer);
this._oRenderingTimer=null}},pause:function(){if(this._bPlaying){this._bPlaying=false;this._bPause=true;this.fireEvent("pause",this.getInfo());
this._resetTimer()}},resume:function(){if(this._bPause){this._nBeforeFrameTime=this._getDate();this._nBeforeRenderingTime=0;
this._bPlaying=true;this._bPause=false;this.fireEvent("resume",this.getInfo());this._trigger(0)}},isPlaying:function(){return this._bPlaying
},_update:function(c){for(var b=0,a=this._aLayerList.length;b<a;b++){this._aLayerList[b].update(c)}},setEventStatus:function(b,a){this._htEventStatus={type:b,firedOnTarget:a}
},isStopEvent:function(a){if(a==="click"){a="mouseup"}return a===this._htEventStatus.type&&this._htEventStatus.firedOnTarget
},getEventStatus:function(){return this._htEventStatus},setPreventDefault:function(a){this._bIsPreventDefault=!!a},isPreventDefault:function(){return this._bIsPreventDefault
},resize:function(c,b,e){for(var d=0,a=this._aLayerList.length;d<a;d++){this._aLayerList[d].resize(c,b,e)}}},collie.Component))();