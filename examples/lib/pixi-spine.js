var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Animation = (function () {
            function Animation(name, timelines, duration) {
                if (name == null)
                    throw new Error("name cannot be null.");
                if (timelines == null)
                    throw new Error("timelines cannot be null.");
                this.name = name;
                this.timelines = timelines;
                this.duration = duration;
            }
            Animation.prototype.apply = function (skeleton, lastTime, time, loop, events, alpha, pose, direction) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (loop && this.duration != 0) {
                    time %= this.duration;
                    if (lastTime > 0)
                        lastTime %= this.duration;
                }
                var timelines = this.timelines;
                for (var i = 0, n = timelines.length; i < n; i++)
                    timelines[i].apply(skeleton, lastTime, time, events, alpha, pose, direction);
            };
            Animation.binarySearch = function (values, target, step) {
                if (step === void 0) { step = 1; }
                var low = 0;
                var high = values.length / step - 2;
                if (high == 0)
                    return step;
                var current = high >>> 1;
                while (true) {
                    if (values[(current + 1) * step] <= target)
                        low = current + 1;
                    else
                        high = current;
                    if (low == high)
                        return (low + 1) * step;
                    current = (low + high) >>> 1;
                }
            };
            Animation.linearSearch = function (values, target, step) {
                for (var i = 0, last = values.length - step; i <= last; i += step)
                    if (values[i] > target)
                        return i;
                return -1;
            };
            return Animation;
        }());
        core.Animation = Animation;
        var MixPose;
        (function (MixPose) {
            MixPose[MixPose["setup"] = 0] = "setup";
            MixPose[MixPose["current"] = 1] = "current";
            MixPose[MixPose["currentLayered"] = 2] = "currentLayered";
        })(MixPose = core.MixPose || (core.MixPose = {}));
        var MixDirection;
        (function (MixDirection) {
            MixDirection[MixDirection["in"] = 0] = "in";
            MixDirection[MixDirection["out"] = 1] = "out";
        })(MixDirection = core.MixDirection || (core.MixDirection = {}));
        var TimelineType;
        (function (TimelineType) {
            TimelineType[TimelineType["rotate"] = 0] = "rotate";
            TimelineType[TimelineType["translate"] = 1] = "translate";
            TimelineType[TimelineType["scale"] = 2] = "scale";
            TimelineType[TimelineType["shear"] = 3] = "shear";
            TimelineType[TimelineType["attachment"] = 4] = "attachment";
            TimelineType[TimelineType["color"] = 5] = "color";
            TimelineType[TimelineType["deform"] = 6] = "deform";
            TimelineType[TimelineType["event"] = 7] = "event";
            TimelineType[TimelineType["drawOrder"] = 8] = "drawOrder";
            TimelineType[TimelineType["ikConstraint"] = 9] = "ikConstraint";
            TimelineType[TimelineType["transformConstraint"] = 10] = "transformConstraint";
            TimelineType[TimelineType["pathConstraintPosition"] = 11] = "pathConstraintPosition";
            TimelineType[TimelineType["pathConstraintSpacing"] = 12] = "pathConstraintSpacing";
            TimelineType[TimelineType["pathConstraintMix"] = 13] = "pathConstraintMix";
            TimelineType[TimelineType["twoColor"] = 14] = "twoColor";
        })(TimelineType = core.TimelineType || (core.TimelineType = {}));
        var CurveTimeline = (function () {
            function CurveTimeline(frameCount) {
                if (frameCount <= 0)
                    throw new Error("frameCount must be > 0: " + frameCount);
                this.curves = core.Utils.newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
            }
            CurveTimeline.prototype.getFrameCount = function () {
                return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
            };
            CurveTimeline.prototype.setLinear = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
            };
            CurveTimeline.prototype.setStepped = function (frameIndex) {
                this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
            };
            CurveTimeline.prototype.getCurveType = function (frameIndex) {
                var index = frameIndex * CurveTimeline.BEZIER_SIZE;
                if (index == this.curves.length)
                    return CurveTimeline.LINEAR;
                var type = this.curves[index];
                if (type == CurveTimeline.LINEAR)
                    return CurveTimeline.LINEAR;
                if (type == CurveTimeline.STEPPED)
                    return CurveTimeline.STEPPED;
                return CurveTimeline.BEZIER;
            };
            CurveTimeline.prototype.setCurve = function (frameIndex, cx1, cy1, cx2, cy2) {
                var tmpx = (-cx1 * 2 + cx2) * 0.03, tmpy = (-cy1 * 2 + cy2) * 0.03;
                var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006, dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
                var ddfx = tmpx * 2 + dddfx, ddfy = tmpy * 2 + dddfy;
                var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667, dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var curves = this.curves;
                curves[i++] = CurveTimeline.BEZIER;
                var x = dfx, y = dfy;
                for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    curves[i] = x;
                    curves[i + 1] = y;
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    x += dfx;
                    y += dfy;
                }
            };
            CurveTimeline.prototype.getCurvePercent = function (frameIndex, percent) {
                percent = core.MathUtils.clamp(percent, 0, 1);
                var curves = this.curves;
                var i = frameIndex * CurveTimeline.BEZIER_SIZE;
                var type = curves[i];
                if (type == CurveTimeline.LINEAR)
                    return percent;
                if (type == CurveTimeline.STEPPED)
                    return 0;
                i++;
                var x = 0;
                for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
                    x = curves[i];
                    if (x >= percent) {
                        var prevX = void 0, prevY = void 0;
                        if (i == start) {
                            prevX = 0;
                            prevY = 0;
                        }
                        else {
                            prevX = curves[i - 2];
                            prevY = curves[i - 1];
                        }
                        return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
                    }
                }
                var y = curves[i - 1];
                return y + (1 - y) * (percent - x) / (1 - x);
            };
            CurveTimeline.LINEAR = 0;
            CurveTimeline.STEPPED = 1;
            CurveTimeline.BEZIER = 2;
            CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
            return CurveTimeline;
        }());
        core.CurveTimeline = CurveTimeline;
        var RotateTimeline = (function (_super) {
            __extends(RotateTimeline, _super);
            function RotateTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount << 1);
                return _this;
            }
            RotateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.rotate << 24) + this.boneIndex;
            };
            RotateTimeline.prototype.setFrame = function (frameIndex, time, degrees) {
                frameIndex <<= 1;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
            };
            RotateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.rotation = bone.data.rotation;
                            return;
                        case MixPose.current:
                            var r_1 = bone.data.rotation - bone.rotation;
                            r_1 -= (16384 - ((16384.499999999996 - r_1 / 360) | 0)) * 360;
                            bone.rotation += r_1 * alpha;
                    }
                    return;
                }
                if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
                    if (pose == MixPose.setup)
                        bone.rotation = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] * alpha;
                    else {
                        var r_2 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION] - bone.rotation;
                        r_2 -= (16384 - ((16384.499999999996 - r_2 / 360) | 0)) * 360;
                        bone.rotation += r_2 * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
                var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + RotateTimeline.PREV_TIME] - frameTime));
                var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
                r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                r = prevRotation + r * percent;
                if (pose == MixPose.setup) {
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation = bone.data.rotation + r * alpha;
                }
                else {
                    r = bone.data.rotation + r - bone.rotation;
                    r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                    bone.rotation += r * alpha;
                }
            };
            RotateTimeline.ENTRIES = 2;
            RotateTimeline.PREV_TIME = -2;
            RotateTimeline.PREV_ROTATION = -1;
            RotateTimeline.ROTATION = 1;
            return RotateTimeline;
        }(CurveTimeline));
        core.RotateTimeline = RotateTimeline;
        var TranslateTimeline = (function (_super) {
            __extends(TranslateTimeline, _super);
            function TranslateTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TranslateTimeline.ENTRIES);
                return _this;
            }
            TranslateTimeline.prototype.getPropertyId = function () {
                return (TimelineType.translate << 24) + this.boneIndex;
            };
            TranslateTimeline.prototype.setFrame = function (frameIndex, time, x, y) {
                frameIndex *= TranslateTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TranslateTimeline.X] = x;
                this.frames[frameIndex + TranslateTimeline.Y] = y;
            };
            TranslateTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.x = bone.data.x;
                            bone.y = bone.data.y;
                            return;
                        case MixPose.current:
                            bone.x += (bone.data.x - bone.x) * alpha;
                            bone.y += (bone.data.y - bone.y) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
                    x = frames[frames.length + TranslateTimeline.PREV_X];
                    y = frames[frames.length + TranslateTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
                    x = frames[frame + TranslateTimeline.PREV_X];
                    y = frames[frame + TranslateTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TranslateTimeline.PREV_TIME] - frameTime));
                    x += (frames[frame + TranslateTimeline.X] - x) * percent;
                    y += (frames[frame + TranslateTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.x = bone.data.x + x * alpha;
                    bone.y = bone.data.y + y * alpha;
                }
                else {
                    bone.x += (bone.data.x + x - bone.x) * alpha;
                    bone.y += (bone.data.y + y - bone.y) * alpha;
                }
            };
            TranslateTimeline.ENTRIES = 3;
            TranslateTimeline.PREV_TIME = -3;
            TranslateTimeline.PREV_X = -2;
            TranslateTimeline.PREV_Y = -1;
            TranslateTimeline.X = 1;
            TranslateTimeline.Y = 2;
            return TranslateTimeline;
        }(CurveTimeline));
        core.TranslateTimeline = TranslateTimeline;
        var ScaleTimeline = (function (_super) {
            __extends(ScaleTimeline, _super);
            function ScaleTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            ScaleTimeline.prototype.getPropertyId = function () {
                return (TimelineType.scale << 24) + this.boneIndex;
            };
            ScaleTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.scaleX = bone.data.scaleX;
                            bone.scaleY = bone.data.scaleY;
                            return;
                        case MixPose.current:
                            bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
                            bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
                    x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
                    y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
                    x = frames[frame + ScaleTimeline.PREV_X];
                    y = frames[frame + ScaleTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ScaleTimeline.PREV_TIME] - frameTime));
                    x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
                    y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
                }
                if (alpha == 1) {
                    bone.scaleX = x;
                    bone.scaleY = y;
                }
                else {
                    var bx = 0, by = 0;
                    if (pose == MixPose.setup) {
                        bx = bone.data.scaleX;
                        by = bone.data.scaleY;
                    }
                    else {
                        bx = bone.scaleX;
                        by = bone.scaleY;
                    }
                    if (direction == MixDirection.out) {
                        x = Math.abs(x) * core.MathUtils.signum(bx);
                        y = Math.abs(y) * core.MathUtils.signum(by);
                    }
                    else {
                        bx = Math.abs(bx) * core.MathUtils.signum(x);
                        by = Math.abs(by) * core.MathUtils.signum(y);
                    }
                    bone.scaleX = bx + (x - bx) * alpha;
                    bone.scaleY = by + (y - by) * alpha;
                }
            };
            return ScaleTimeline;
        }(TranslateTimeline));
        core.ScaleTimeline = ScaleTimeline;
        var ShearTimeline = (function (_super) {
            __extends(ShearTimeline, _super);
            function ShearTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            ShearTimeline.prototype.getPropertyId = function () {
                return (TimelineType.shear << 24) + this.boneIndex;
            };
            ShearTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var frames = this.frames;
                var bone = skeleton.bones[this.boneIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            bone.shearX = bone.data.shearX;
                            bone.shearY = bone.data.shearY;
                            return;
                        case MixPose.current:
                            bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
                            bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
                    }
                    return;
                }
                var x = 0, y = 0;
                if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
                    x = frames[frames.length + ShearTimeline.PREV_X];
                    y = frames[frames.length + ShearTimeline.PREV_Y];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
                    x = frames[frame + ShearTimeline.PREV_X];
                    y = frames[frame + ShearTimeline.PREV_Y];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ShearTimeline.PREV_TIME] - frameTime));
                    x = x + (frames[frame + ShearTimeline.X] - x) * percent;
                    y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
                }
                if (pose == MixPose.setup) {
                    bone.shearX = bone.data.shearX + x * alpha;
                    bone.shearY = bone.data.shearY + y * alpha;
                }
                else {
                    bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
                    bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
                }
            };
            return ShearTimeline;
        }(TranslateTimeline));
        core.ShearTimeline = ShearTimeline;
        var ColorTimeline = (function (_super) {
            __extends(ColorTimeline, _super);
            function ColorTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * ColorTimeline.ENTRIES);
                return _this;
            }
            ColorTimeline.prototype.getPropertyId = function () {
                return (TimelineType.color << 24) + this.slotIndex;
            };
            ColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a) {
                frameIndex *= ColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + ColorTimeline.R] = r;
                this.frames[frameIndex + ColorTimeline.G] = g;
                this.frames[frameIndex + ColorTimeline.B] = b;
                this.frames[frameIndex + ColorTimeline.A] = a;
            };
            ColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            return;
                        case MixPose.current:
                            var color = slot.color, setup = slot.data.color;
                            color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
                    }
                    return;
                }
                var r = 0, g = 0, b = 0, a = 0;
                if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + ColorTimeline.PREV_R];
                    g = frames[i + ColorTimeline.PREV_G];
                    b = frames[i + ColorTimeline.PREV_B];
                    a = frames[i + ColorTimeline.PREV_A];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
                    r = frames[frame + ColorTimeline.PREV_R];
                    g = frames[frame + ColorTimeline.PREV_G];
                    b = frames[frame + ColorTimeline.PREV_B];
                    a = frames[frame + ColorTimeline.PREV_A];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + ColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + ColorTimeline.R] - r) * percent;
                    g += (frames[frame + ColorTimeline.G] - g) * percent;
                    b += (frames[frame + ColorTimeline.B] - b) * percent;
                    a += (frames[frame + ColorTimeline.A] - a) * percent;
                }
                if (alpha == 1)
                    slot.color.set(r, g, b, a);
                else {
                    var color = slot.color;
                    if (pose == MixPose.setup)
                        color.setFromColor(slot.data.color);
                    color.add((r - color.r) * alpha, (g - color.g) * alpha, (b - color.b) * alpha, (a - color.a) * alpha);
                }
            };
            ColorTimeline.ENTRIES = 5;
            ColorTimeline.PREV_TIME = -5;
            ColorTimeline.PREV_R = -4;
            ColorTimeline.PREV_G = -3;
            ColorTimeline.PREV_B = -2;
            ColorTimeline.PREV_A = -1;
            ColorTimeline.R = 1;
            ColorTimeline.G = 2;
            ColorTimeline.B = 3;
            ColorTimeline.A = 4;
            return ColorTimeline;
        }(CurveTimeline));
        core.ColorTimeline = ColorTimeline;
        var TwoColorTimeline = (function (_super) {
            __extends(TwoColorTimeline, _super);
            function TwoColorTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
                return _this;
            }
            TwoColorTimeline.prototype.getPropertyId = function () {
                return (TimelineType.twoColor << 24) + this.slotIndex;
            };
            TwoColorTimeline.prototype.setFrame = function (frameIndex, time, r, g, b, a, r2, g2, b2) {
                frameIndex *= TwoColorTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TwoColorTimeline.R] = r;
                this.frames[frameIndex + TwoColorTimeline.G] = g;
                this.frames[frameIndex + TwoColorTimeline.B] = b;
                this.frames[frameIndex + TwoColorTimeline.A] = a;
                this.frames[frameIndex + TwoColorTimeline.R2] = r2;
                this.frames[frameIndex + TwoColorTimeline.G2] = g2;
                this.frames[frameIndex + TwoColorTimeline.B2] = b2;
            };
            TwoColorTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var frames = this.frames;
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            slot.color.setFromColor(slot.data.color);
                            slot.darkColor.setFromColor(slot.data.darkColor);
                            return;
                        case MixPose.current:
                            var light = slot.color, dark = slot.darkColor, setupLight = slot.data.color, setupDark = slot.data.darkColor;
                            light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
                            dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
                    }
                    return;
                }
                var r = 0, g = 0, b = 0, a = 0, r2 = 0, g2 = 0, b2 = 0;
                if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
                    var i = frames.length;
                    r = frames[i + TwoColorTimeline.PREV_R];
                    g = frames[i + TwoColorTimeline.PREV_G];
                    b = frames[i + TwoColorTimeline.PREV_B];
                    a = frames[i + TwoColorTimeline.PREV_A];
                    r2 = frames[i + TwoColorTimeline.PREV_R2];
                    g2 = frames[i + TwoColorTimeline.PREV_G2];
                    b2 = frames[i + TwoColorTimeline.PREV_B2];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
                    r = frames[frame + TwoColorTimeline.PREV_R];
                    g = frames[frame + TwoColorTimeline.PREV_G];
                    b = frames[frame + TwoColorTimeline.PREV_B];
                    a = frames[frame + TwoColorTimeline.PREV_A];
                    r2 = frames[frame + TwoColorTimeline.PREV_R2];
                    g2 = frames[frame + TwoColorTimeline.PREV_G2];
                    b2 = frames[frame + TwoColorTimeline.PREV_B2];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TwoColorTimeline.PREV_TIME] - frameTime));
                    r += (frames[frame + TwoColorTimeline.R] - r) * percent;
                    g += (frames[frame + TwoColorTimeline.G] - g) * percent;
                    b += (frames[frame + TwoColorTimeline.B] - b) * percent;
                    a += (frames[frame + TwoColorTimeline.A] - a) * percent;
                    r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
                    g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
                    b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
                }
                if (alpha == 1) {
                    slot.color.set(r, g, b, a);
                    slot.darkColor.set(r2, g2, b2, 1);
                }
                else {
                    var light = slot.color, dark = slot.darkColor;
                    if (pose == MixPose.setup) {
                        light.setFromColor(slot.data.color);
                        dark.setFromColor(slot.data.darkColor);
                    }
                    light.add((r - light.r) * alpha, (g - light.g) * alpha, (b - light.b) * alpha, (a - light.a) * alpha);
                    dark.add((r2 - dark.r) * alpha, (g2 - dark.g) * alpha, (b2 - dark.b) * alpha, 0);
                }
            };
            TwoColorTimeline.ENTRIES = 8;
            TwoColorTimeline.PREV_TIME = -8;
            TwoColorTimeline.PREV_R = -7;
            TwoColorTimeline.PREV_G = -6;
            TwoColorTimeline.PREV_B = -5;
            TwoColorTimeline.PREV_A = -4;
            TwoColorTimeline.PREV_R2 = -3;
            TwoColorTimeline.PREV_G2 = -2;
            TwoColorTimeline.PREV_B2 = -1;
            TwoColorTimeline.R = 1;
            TwoColorTimeline.G = 2;
            TwoColorTimeline.B = 3;
            TwoColorTimeline.A = 4;
            TwoColorTimeline.R2 = 5;
            TwoColorTimeline.G2 = 6;
            TwoColorTimeline.B2 = 7;
            return TwoColorTimeline;
        }(CurveTimeline));
        core.TwoColorTimeline = TwoColorTimeline;
        var AttachmentTimeline = (function () {
            function AttachmentTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.attachmentNames = new Array(frameCount);
            }
            AttachmentTimeline.prototype.getPropertyId = function () {
                return (TimelineType.attachment << 24) + this.slotIndex;
            };
            AttachmentTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            AttachmentTimeline.prototype.setFrame = function (frameIndex, time, attachmentName) {
                this.frames[frameIndex] = time;
                this.attachmentNames[frameIndex] = attachmentName;
            };
            AttachmentTimeline.prototype.apply = function (skeleton, lastTime, time, events, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    var attachmentName_1 = slot.data.attachmentName;
                    slot.setAttachment(attachmentName_1 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_1));
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup) {
                        var attachmentName_2 = slot.data.attachmentName;
                        slot.setAttachment(attachmentName_2 == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName_2));
                    }
                    return;
                }
                var frameIndex = 0;
                if (time >= frames[frames.length - 1])
                    frameIndex = frames.length - 1;
                else
                    frameIndex = Animation.binarySearch(frames, time, 1) - 1;
                var attachmentName = this.attachmentNames[frameIndex];
                skeleton.slots[this.slotIndex]
                    .setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
            };
            return AttachmentTimeline;
        }());
        core.AttachmentTimeline = AttachmentTimeline;
        var zeros = null;
        var DeformTimeline = (function (_super) {
            __extends(DeformTimeline, _super);
            function DeformTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount);
                _this.frameVertices = new Array(frameCount);
                if (zeros == null)
                    zeros = core.Utils.newFloatArray(64);
                return _this;
            }
            DeformTimeline.prototype.getPropertyId = function () {
                return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
            };
            DeformTimeline.prototype.setFrame = function (frameIndex, time, vertices) {
                this.frames[frameIndex] = time;
                this.frameVertices[frameIndex] = vertices;
            };
            DeformTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var slot = skeleton.slots[this.slotIndex];
                var slotAttachment = slot.getAttachment();
                if (!(slotAttachment instanceof core.VertexAttachment) || !slotAttachment.applyDeform(this.attachment))
                    return;
                var verticesArray = slot.attachmentVertices;
                var frameVertices = this.frameVertices;
                var vertexCount = frameVertices[0].length;
                var vertices = core.Utils.setArraySize(verticesArray, vertexCount);
                var frames = this.frames;
                if (time < frames[0]) {
                    var vertexAttachment = slotAttachment;
                    switch (pose) {
                        case MixPose.setup:
                            var zeroVertices = void 0;
                            if (vertexAttachment.bones == null) {
                                zeroVertices = vertexAttachment.vertices;
                            }
                            else {
                                zeroVertices = zeros;
                                if (zeroVertices.length < vertexCount)
                                    zeros = zeroVertices = core.Utils.newFloatArray(vertexCount);
                            }
                            core.Utils.arrayCopy(zeroVertices, 0, vertices, 0, vertexCount);
                            return;
                        case MixPose.current:
                            if (alpha == 1)
                                break;
                            if (vertexAttachment.bones == null) {
                                var setupVertices = vertexAttachment.vertices;
                                for (var i_1 = 0; i_1 < vertexCount; i_1++)
                                    vertices[i_1] += (setupVertices[i_1] - vertices[i_1]) * alpha;
                            }
                            else {
                                alpha = 1 - alpha;
                                for (var i = 0; i < vertexCount; i++)
                                    vertices[i] *= alpha;
                            }
                    }
                    return;
                }
                if (time >= frames[frames.length - 1]) {
                    var lastVertices = frameVertices[frames.length - 1];
                    if (alpha == 1) {
                        core.Utils.arrayCopy(lastVertices, 0, vertices, 0, vertexCount);
                    }
                    else if (pose == MixPose.setup) {
                        var vertexAttachment = slotAttachment;
                        if (vertexAttachment.bones == null) {
                            var setupVertices = vertexAttachment.vertices;
                            for (var i_2 = 0; i_2 < vertexCount; i_2++) {
                                var setup = setupVertices[i_2];
                                vertices[i_2] = setup + (lastVertices[i_2] - setup) * alpha;
                            }
                        }
                        else {
                            for (var i_3 = 0; i_3 < vertexCount; i_3++)
                                vertices[i_3] = lastVertices[i_3] * alpha;
                        }
                    }
                    else {
                        for (var i_4 = 0; i_4 < vertexCount; i_4++)
                            vertices[i_4] += (lastVertices[i_4] - vertices[i_4]) * alpha;
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time);
                var prevVertices = frameVertices[frame - 1];
                var nextVertices = frameVertices[frame];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
                if (alpha == 1) {
                    for (var i_5 = 0; i_5 < vertexCount; i_5++) {
                        var prev = prevVertices[i_5];
                        vertices[i_5] = prev + (nextVertices[i_5] - prev) * percent;
                    }
                }
                else if (pose == MixPose.setup) {
                    var vertexAttachment = slotAttachment;
                    if (vertexAttachment.bones == null) {
                        var setupVertices = vertexAttachment.vertices;
                        for (var i_6 = 0; i_6 < vertexCount; i_6++) {
                            var prev = prevVertices[i_6], setup = setupVertices[i_6];
                            vertices[i_6] = setup + (prev + (nextVertices[i_6] - prev) * percent - setup) * alpha;
                        }
                    }
                    else {
                        for (var i_7 = 0; i_7 < vertexCount; i_7++) {
                            var prev = prevVertices[i_7];
                            vertices[i_7] = (prev + (nextVertices[i_7] - prev) * percent) * alpha;
                        }
                    }
                }
                else {
                    for (var i_8 = 0; i_8 < vertexCount; i_8++) {
                        var prev = prevVertices[i_8];
                        vertices[i_8] += (prev + (nextVertices[i_8] - prev) * percent - vertices[i_8]) * alpha;
                    }
                }
            };
            return DeformTimeline;
        }(CurveTimeline));
        core.DeformTimeline = DeformTimeline;
        var EventTimeline = (function () {
            function EventTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.events = new Array(frameCount);
            }
            EventTimeline.prototype.getPropertyId = function () {
                return TimelineType.event << 24;
            };
            EventTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            EventTimeline.prototype.setFrame = function (frameIndex, event) {
                this.frames[frameIndex] = event.time;
                this.events[frameIndex] = event;
            };
            EventTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                if (firedEvents == null)
                    return;
                var frames = this.frames;
                var frameCount = this.frames.length;
                if (lastTime > time) {
                    this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, pose, direction);
                    lastTime = -1;
                }
                else if (lastTime >= frames[frameCount - 1])
                    return;
                if (time < frames[0])
                    return;
                var frame = 0;
                if (lastTime < frames[0])
                    frame = 0;
                else {
                    frame = Animation.binarySearch(frames, lastTime);
                    var frameTime = frames[frame];
                    while (frame > 0) {
                        if (frames[frame - 1] != frameTime)
                            break;
                        frame--;
                    }
                }
                for (; frame < frameCount && time >= frames[frame]; frame++)
                    firedEvents.push(this.events[frame]);
            };
            return EventTimeline;
        }());
        core.EventTimeline = EventTimeline;
        var DrawOrderTimeline = (function () {
            function DrawOrderTimeline(frameCount) {
                this.frames = core.Utils.newFloatArray(frameCount);
                this.drawOrders = new Array(frameCount);
            }
            DrawOrderTimeline.prototype.getPropertyId = function () {
                return TimelineType.drawOrder << 24;
            };
            DrawOrderTimeline.prototype.getFrameCount = function () {
                return this.frames.length;
            };
            DrawOrderTimeline.prototype.setFrame = function (frameIndex, time, drawOrder) {
                this.frames[frameIndex] = time;
                this.drawOrders[frameIndex] = drawOrder;
            };
            DrawOrderTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var drawOrder = skeleton.drawOrder;
                var slots = skeleton.slots;
                if (direction == MixDirection.out && pose == MixPose.setup) {
                    core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frames = this.frames;
                if (time < frames[0]) {
                    if (pose == MixPose.setup)
                        core.Utils.arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
                    return;
                }
                var frame = 0;
                if (time >= frames[frames.length - 1])
                    frame = frames.length - 1;
                else
                    frame = Animation.binarySearch(frames, time) - 1;
                var drawOrderToSetupIndex = this.drawOrders[frame];
                if (drawOrderToSetupIndex == null)
                    core.Utils.arrayCopy(slots, 0, drawOrder, 0, slots.length);
                else {
                    for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++)
                        drawOrder[i] = slots[drawOrderToSetupIndex[i]];
                }
            };
            return DrawOrderTimeline;
        }());
        core.DrawOrderTimeline = DrawOrderTimeline;
        var IkConstraintTimeline = (function (_super) {
            __extends(IkConstraintTimeline, _super);
            function IkConstraintTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * IkConstraintTimeline.ENTRIES);
                return _this;
            }
            IkConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
            };
            IkConstraintTimeline.prototype.setFrame = function (frameIndex, time, mix, bendDirection) {
                frameIndex *= IkConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + IkConstraintTimeline.MIX] = mix;
                this.frames[frameIndex + IkConstraintTimeline.BEND_DIRECTION] = bendDirection;
            };
            IkConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.mix = constraint.data.mix;
                            constraint.bendDirection = constraint.data.bendDirection;
                            return;
                        case MixPose.current:
                            constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
                            constraint.bendDirection = constraint.data.bendDirection;
                    }
                    return;
                }
                if (time >= frames[frames.length - IkConstraintTimeline.ENTRIES]) {
                    if (pose == MixPose.setup) {
                        constraint.mix = constraint.data.mix + (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
                        constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection
                            : frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    else {
                        constraint.mix += (frames[frames.length + IkConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
                        if (direction == MixDirection.in)
                            constraint.bendDirection = frames[frames.length + IkConstraintTimeline.PREV_BEND_DIRECTION];
                    }
                    return;
                }
                var frame = Animation.binarySearch(frames, time, IkConstraintTimeline.ENTRIES);
                var mix = frames[frame + IkConstraintTimeline.PREV_MIX];
                var frameTime = frames[frame];
                var percent = this.getCurvePercent(frame / IkConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + IkConstraintTimeline.PREV_TIME] - frameTime));
                if (pose == MixPose.setup) {
                    constraint.mix = constraint.data.mix + (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
                    constraint.bendDirection = direction == MixDirection.out ? constraint.data.bendDirection : frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
                else {
                    constraint.mix += (mix + (frames[frame + IkConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
                    if (direction == MixDirection.in)
                        constraint.bendDirection = frames[frame + IkConstraintTimeline.PREV_BEND_DIRECTION];
                }
            };
            IkConstraintTimeline.ENTRIES = 3;
            IkConstraintTimeline.PREV_TIME = -3;
            IkConstraintTimeline.PREV_MIX = -2;
            IkConstraintTimeline.PREV_BEND_DIRECTION = -1;
            IkConstraintTimeline.MIX = 1;
            IkConstraintTimeline.BEND_DIRECTION = 2;
            return IkConstraintTimeline;
        }(CurveTimeline));
        core.IkConstraintTimeline = IkConstraintTimeline;
        var TransformConstraintTimeline = (function (_super) {
            __extends(TransformConstraintTimeline, _super);
            function TransformConstraintTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
                return _this;
            }
            TransformConstraintTimeline.prototype.getPropertyId = function () {
                return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
            };
            TransformConstraintTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
                frameIndex *= TransformConstraintTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
                this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
                this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
            };
            TransformConstraintTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
                if (time < frames[0]) {
                    var data = constraint.data;
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = data.rotateMix;
                            constraint.translateMix = data.translateMix;
                            constraint.scaleMix = data.scaleMix;
                            constraint.shearMix = data.shearMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
                            constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
                            constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
                    }
                    return;
                }
                var rotate = 0, translate = 0, scale = 0, shear = 0;
                if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
                    var i = frames.length;
                    rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
                    rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
                    translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
                    scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
                    shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
                    scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
                    shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
                }
                if (pose == MixPose.setup) {
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix + (rotate - data.rotateMix) * alpha;
                    constraint.translateMix = data.translateMix + (translate - data.translateMix) * alpha;
                    constraint.scaleMix = data.scaleMix + (scale - data.scaleMix) * alpha;
                    constraint.shearMix = data.shearMix + (shear - data.shearMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                    constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
                    constraint.shearMix += (shear - constraint.shearMix) * alpha;
                }
            };
            TransformConstraintTimeline.ENTRIES = 5;
            TransformConstraintTimeline.PREV_TIME = -5;
            TransformConstraintTimeline.PREV_ROTATE = -4;
            TransformConstraintTimeline.PREV_TRANSLATE = -3;
            TransformConstraintTimeline.PREV_SCALE = -2;
            TransformConstraintTimeline.PREV_SHEAR = -1;
            TransformConstraintTimeline.ROTATE = 1;
            TransformConstraintTimeline.TRANSLATE = 2;
            TransformConstraintTimeline.SCALE = 3;
            TransformConstraintTimeline.SHEAR = 4;
            return TransformConstraintTimeline;
        }(CurveTimeline));
        core.TransformConstraintTimeline = TransformConstraintTimeline;
        var PathConstraintPositionTimeline = (function (_super) {
            __extends(PathConstraintPositionTimeline, _super);
            function PathConstraintPositionTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
                return _this;
            }
            PathConstraintPositionTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
            };
            PathConstraintPositionTimeline.prototype.setFrame = function (frameIndex, time, value) {
                frameIndex *= PathConstraintPositionTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
            };
            PathConstraintPositionTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.position = constraint.data.position;
                            return;
                        case MixPose.current:
                            constraint.position += (constraint.data.position - constraint.position) * alpha;
                    }
                    return;
                }
                var position = 0;
                if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES])
                    position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
                    position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime));
                    position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
                }
                if (pose == MixPose.setup)
                    constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
                else
                    constraint.position += (position - constraint.position) * alpha;
            };
            PathConstraintPositionTimeline.ENTRIES = 2;
            PathConstraintPositionTimeline.PREV_TIME = -2;
            PathConstraintPositionTimeline.PREV_VALUE = -1;
            PathConstraintPositionTimeline.VALUE = 1;
            return PathConstraintPositionTimeline;
        }(CurveTimeline));
        core.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
        var PathConstraintSpacingTimeline = (function (_super) {
            __extends(PathConstraintSpacingTimeline, _super);
            function PathConstraintSpacingTimeline(frameCount) {
                return _super.call(this, frameCount) || this;
            }
            PathConstraintSpacingTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
            };
            PathConstraintSpacingTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.spacing = constraint.data.spacing;
                            return;
                        case MixPose.current:
                            constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
                    }
                    return;
                }
                var spacing = 0;
                if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES])
                    spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
                    spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime));
                    spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
                }
                if (pose == MixPose.setup)
                    constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
                else
                    constraint.spacing += (spacing - constraint.spacing) * alpha;
            };
            return PathConstraintSpacingTimeline;
        }(PathConstraintPositionTimeline));
        core.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
        var PathConstraintMixTimeline = (function (_super) {
            __extends(PathConstraintMixTimeline, _super);
            function PathConstraintMixTimeline(frameCount) {
                var _this = _super.call(this, frameCount) || this;
                _this.frames = core.Utils.newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
                return _this;
            }
            PathConstraintMixTimeline.prototype.getPropertyId = function () {
                return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
            };
            PathConstraintMixTimeline.prototype.setFrame = function (frameIndex, time, rotateMix, translateMix) {
                frameIndex *= PathConstraintMixTimeline.ENTRIES;
                this.frames[frameIndex] = time;
                this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
                this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
            };
            PathConstraintMixTimeline.prototype.apply = function (skeleton, lastTime, time, firedEvents, alpha, pose, direction) {
                var frames = this.frames;
                var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
                if (time < frames[0]) {
                    switch (pose) {
                        case MixPose.setup:
                            constraint.rotateMix = constraint.data.rotateMix;
                            constraint.translateMix = constraint.data.translateMix;
                            return;
                        case MixPose.current:
                            constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
                            constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
                    }
                    return;
                }
                var rotate = 0, translate = 0;
                if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
                    rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
                }
                else {
                    var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
                    rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
                    translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
                    var frameTime = frames[frame];
                    var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / (frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime));
                    rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
                    translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
                }
                if (pose == MixPose.setup) {
                    constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
                    constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
                }
                else {
                    constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
                    constraint.translateMix += (translate - constraint.translateMix) * alpha;
                }
            };
            PathConstraintMixTimeline.ENTRIES = 3;
            PathConstraintMixTimeline.PREV_TIME = -3;
            PathConstraintMixTimeline.PREV_ROTATE = -2;
            PathConstraintMixTimeline.PREV_TRANSLATE = -1;
            PathConstraintMixTimeline.ROTATE = 1;
            PathConstraintMixTimeline.TRANSLATE = 2;
            return PathConstraintMixTimeline;
        }(CurveTimeline));
        core.PathConstraintMixTimeline = PathConstraintMixTimeline;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationState = (function () {
            function AnimationState(data) {
                this.tracks = new Array();
                this.events = new Array();
                this.listeners = new Array();
                this.queue = new EventQueue(this);
                this.propertyIDs = new core.IntSet();
                this.mixingTo = new Array();
                this.animationsChanged = false;
                this.timeScale = 1;
                this.trackEntryPool = new core.Pool(function () { return new TrackEntry(); });
                this.data = data;
            }
            AnimationState.prototype.update = function (delta) {
                delta *= this.timeScale;
                var tracks = this.tracks;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null)
                        continue;
                    current.animationLast = current.nextAnimationLast;
                    current.trackLast = current.nextTrackLast;
                    var currentDelta = delta * current.timeScale;
                    if (current.delay > 0) {
                        current.delay -= currentDelta;
                        if (current.delay > 0)
                            continue;
                        currentDelta = -current.delay;
                        current.delay = 0;
                    }
                    var next = current.next;
                    if (next != null) {
                        var nextTime = current.trackLast - next.delay;
                        if (nextTime >= 0) {
                            next.delay = 0;
                            next.trackTime = nextTime + delta * next.timeScale;
                            current.trackTime += currentDelta;
                            this.setCurrent(i, next, true);
                            while (next.mixingFrom != null) {
                                next.mixTime += currentDelta;
                                next = next.mixingFrom;
                            }
                            continue;
                        }
                    }
                    else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
                        tracks[i] = null;
                        this.queue.end(current);
                        this.disposeNext(current);
                        continue;
                    }
                    if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
                        var from = current.mixingFrom;
                        current.mixingFrom = null;
                        while (from != null) {
                            this.queue.end(from);
                            from = from.mixingFrom;
                        }
                    }
                    current.trackTime += currentDelta;
                }
                this.queue.drain();
            };
            AnimationState.prototype.updateMixingFrom = function (to, delta) {
                var from = to.mixingFrom;
                if (from == null)
                    return true;
                var finished = this.updateMixingFrom(from, delta);
                if (to.mixTime > 0 && (to.mixTime >= to.mixDuration || to.timeScale == 0)) {
                    if (from.totalAlpha == 0) {
                        to.mixingFrom = from.mixingFrom;
                        to.interruptAlpha = from.interruptAlpha;
                        this.queue.end(from);
                    }
                    return finished;
                }
                from.animationLast = from.nextAnimationLast;
                from.trackLast = from.nextTrackLast;
                from.trackTime += delta * from.timeScale;
                to.mixTime += delta * to.timeScale;
                return false;
            };
            AnimationState.prototype.apply = function (skeleton) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                if (this.animationsChanged)
                    this._animationsChanged();
                var events = this.events;
                var tracks = this.tracks;
                var applied = false;
                for (var i = 0, n = tracks.length; i < n; i++) {
                    var current = tracks[i];
                    if (current == null || current.delay > 0)
                        continue;
                    applied = true;
                    var currentPose = i == 0 ? core.MixPose.current : core.MixPose.currentLayered;
                    var mix = current.alpha;
                    if (current.mixingFrom != null)
                        mix *= this.applyMixingFrom(current, skeleton, currentPose);
                    else if (current.trackTime >= current.trackEnd && current.next == null)
                        mix = 0;
                    var animationLast = current.animationLast, animationTime = current.getAnimationTime();
                    var timelineCount = current.animation.timelines.length;
                    var timelines = current.animation.timelines;
                    if (mix == 1) {
                        for (var ii = 0; ii < timelineCount; ii++)
                            timelines[ii].apply(skeleton, animationLast, animationTime, events, 1, core.MixPose.setup, core.MixDirection.in);
                    }
                    else {
                        var timelineData = current.timelineData;
                        var firstFrame = current.timelinesRotation.length == 0;
                        if (firstFrame)
                            core.Utils.setArraySize(current.timelinesRotation, timelineCount << 1, null);
                        var timelinesRotation = current.timelinesRotation;
                        for (var ii = 0; ii < timelineCount; ii++) {
                            var timeline = timelines[ii];
                            var pose = timelineData[ii] >= AnimationState.FIRST ? core.MixPose.setup : currentPose;
                            if (timeline instanceof core.RotateTimeline) {
                                this.applyRotateTimeline(timeline, skeleton, animationTime, mix, pose, timelinesRotation, ii << 1, firstFrame);
                            }
                            else
                                timeline.apply(skeleton, animationLast, animationTime, events, mix, pose, core.MixDirection.in);
                        }
                    }
                    this.queueEvents(current, animationTime);
                    events.length = 0;
                    current.nextAnimationLast = animationTime;
                    current.nextTrackLast = current.trackTime;
                }
                this.queue.drain();
                return applied;
            };
            AnimationState.prototype.applyMixingFrom = function (to, skeleton, currentPose) {
                var from = to.mixingFrom;
                if (from.mixingFrom != null)
                    this.applyMixingFrom(from, skeleton, currentPose);
                var mix = 0;
                if (to.mixDuration == 0)
                    mix = 1;
                else {
                    mix = to.mixTime / to.mixDuration;
                    if (mix > 1)
                        mix = 1;
                }
                var events = mix < from.eventThreshold ? this.events : null;
                var attachments = mix < from.attachmentThreshold, drawOrder = mix < from.drawOrderThreshold;
                var animationLast = from.animationLast, animationTime = from.getAnimationTime();
                var timelineCount = from.animation.timelines.length;
                var timelines = from.animation.timelines;
                var timelineData = from.timelineData;
                var timelineDipMix = from.timelineDipMix;
                var firstFrame = from.timelinesRotation.length == 0;
                if (firstFrame)
                    core.Utils.setArraySize(from.timelinesRotation, timelineCount << 1, null);
                var timelinesRotation = from.timelinesRotation;
                var pose;
                var alphaDip = from.alpha * to.interruptAlpha, alphaMix = alphaDip * (1 - mix), alpha = 0;
                from.totalAlpha = 0;
                for (var i = 0; i < timelineCount; i++) {
                    var timeline = timelines[i];
                    switch (timelineData[i]) {
                        case AnimationState.SUBSEQUENT:
                            if (!attachments && timeline instanceof core.AttachmentTimeline)
                                continue;
                            if (!drawOrder && timeline instanceof core.DrawOrderTimeline)
                                continue;
                            pose = currentPose;
                            alpha = alphaMix;
                            break;
                        case AnimationState.FIRST:
                            pose = core.MixPose.setup;
                            alpha = alphaMix;
                            break;
                        case AnimationState.DIP:
                            pose = core.MixPose.setup;
                            alpha = alphaDip;
                            break;
                        default:
                            pose = core.MixPose.setup;
                            alpha = alphaDip;
                            var dipMix = timelineDipMix[i];
                            alpha *= Math.max(0, 1 - dipMix.mixTime / dipMix.mixDuration);
                            break;
                    }
                    from.totalAlpha += alpha;
                    if (timeline instanceof core.RotateTimeline)
                        this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, pose, timelinesRotation, i << 1, firstFrame);
                    else {
                        timeline.apply(skeleton, animationLast, animationTime, events, alpha, pose, core.MixDirection.out);
                    }
                }
                if (to.mixDuration > 0)
                    this.queueEvents(from, animationTime);
                this.events.length = 0;
                from.nextAnimationLast = animationTime;
                from.nextTrackLast = from.trackTime;
                return mix;
            };
            AnimationState.prototype.applyRotateTimeline = function (timeline, skeleton, time, alpha, pose, timelinesRotation, i, firstFrame) {
                if (firstFrame)
                    timelinesRotation[i] = 0;
                if (alpha == 1) {
                    timeline.apply(skeleton, 0, time, null, 1, pose, core.MixDirection.in);
                    return;
                }
                var rotateTimeline = timeline;
                var frames = rotateTimeline.frames;
                var bone = skeleton.bones[rotateTimeline.boneIndex];
                if (time < frames[0]) {
                    if (pose == core.MixPose.setup)
                        bone.rotation = bone.data.rotation;
                    return;
                }
                var r2 = 0;
                if (time >= frames[frames.length - core.RotateTimeline.ENTRIES])
                    r2 = bone.data.rotation + frames[frames.length + core.RotateTimeline.PREV_ROTATION];
                else {
                    var frame = core.Animation.binarySearch(frames, time, core.RotateTimeline.ENTRIES);
                    var prevRotation = frames[frame + core.RotateTimeline.PREV_ROTATION];
                    var frameTime = frames[frame];
                    var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / (frames[frame + core.RotateTimeline.PREV_TIME] - frameTime));
                    r2 = frames[frame + core.RotateTimeline.ROTATION] - prevRotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                    r2 = prevRotation + r2 * percent + bone.data.rotation;
                    r2 -= (16384 - ((16384.499999999996 - r2 / 360) | 0)) * 360;
                }
                var r1 = pose == core.MixPose.setup ? bone.data.rotation : bone.rotation;
                var total = 0, diff = r2 - r1;
                if (diff == 0) {
                    total = timelinesRotation[i];
                }
                else {
                    diff -= (16384 - ((16384.499999999996 - diff / 360) | 0)) * 360;
                    var lastTotal = 0, lastDiff = 0;
                    if (firstFrame) {
                        lastTotal = 0;
                        lastDiff = diff;
                    }
                    else {
                        lastTotal = timelinesRotation[i];
                        lastDiff = timelinesRotation[i + 1];
                    }
                    var current = diff > 0, dir = lastTotal >= 0;
                    if (core.MathUtils.signum(lastDiff) != core.MathUtils.signum(diff) && Math.abs(lastDiff) <= 90) {
                        if (Math.abs(lastTotal) > 180)
                            lastTotal += 360 * core.MathUtils.signum(lastTotal);
                        dir = current;
                    }
                    total = diff + lastTotal - lastTotal % 360;
                    if (dir != current)
                        total += 360 * core.MathUtils.signum(lastTotal);
                    timelinesRotation[i] = total;
                }
                timelinesRotation[i + 1] = diff;
                r1 += total * alpha;
                bone.rotation = r1 - (16384 - ((16384.499999999996 - r1 / 360) | 0)) * 360;
            };
            AnimationState.prototype.queueEvents = function (entry, animationTime) {
                var animationStart = entry.animationStart, animationEnd = entry.animationEnd;
                var duration = animationEnd - animationStart;
                var trackLastWrapped = entry.trackLast % duration;
                var events = this.events;
                var i = 0, n = events.length;
                for (; i < n; i++) {
                    var event_1 = events[i];
                    if (event_1.time < trackLastWrapped)
                        break;
                    if (event_1.time > animationEnd)
                        continue;
                    this.queue.event(entry, event_1);
                }
                if (entry.loop ? (trackLastWrapped > entry.trackTime % duration)
                    : (animationTime >= animationEnd && entry.animationLast < animationEnd)) {
                    this.queue.complete(entry);
                }
                for (; i < n; i++) {
                    var event_2 = events[i];
                    if (event_2.time < animationStart)
                        continue;
                    this.queue.event(entry, events[i]);
                }
            };
            AnimationState.prototype.clearTracks = function () {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++)
                    this.clearTrack(i);
                this.tracks.length = 0;
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.clearTrack = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return;
                var current = this.tracks[trackIndex];
                if (current == null)
                    return;
                this.queue.end(current);
                this.disposeNext(current);
                var entry = current;
                while (true) {
                    var from = entry.mixingFrom;
                    if (from == null)
                        break;
                    this.queue.end(from);
                    entry.mixingFrom = null;
                    entry = from;
                }
                this.tracks[current.trackIndex] = null;
                this.queue.drain();
            };
            AnimationState.prototype.setCurrent = function (index, current, interrupt) {
                var from = this.expandToIndex(index);
                this.tracks[index] = current;
                if (from != null) {
                    if (interrupt)
                        this.queue.interrupt(from);
                    current.mixingFrom = from;
                    current.mixTime = 0;
                    if (from.mixingFrom != null && from.mixDuration > 0)
                        current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
                    from.timelinesRotation.length = 0;
                }
                this.queue.start(current);
            };
            AnimationState.prototype.setAnimation = function (trackIndex, animationName, loop) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.setAnimationWith(trackIndex, animation, loop);
            };
            AnimationState.prototype.setAnimationWith = function (trackIndex, animation, loop) {
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var interrupt = true;
                var current = this.expandToIndex(trackIndex);
                if (current != null) {
                    if (current.nextTrackLast == -1) {
                        this.tracks[trackIndex] = current.mixingFrom;
                        this.queue.interrupt(current);
                        this.queue.end(current);
                        this.disposeNext(current);
                        current = current.mixingFrom;
                        interrupt = false;
                    }
                    else
                        this.disposeNext(current);
                }
                var entry = this.trackEntry(trackIndex, animation, loop, current);
                this.setCurrent(trackIndex, entry, interrupt);
                this.queue.drain();
                return entry;
            };
            AnimationState.prototype.addAnimation = function (trackIndex, animationName, loop, delay) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                if (animation == null)
                    throw new Error("Animation not found: " + animationName);
                return this.addAnimationWith(trackIndex, animation, loop, delay);
            };
            AnimationState.prototype.addAnimationWith = function (trackIndex, animation, loop, delay) {
                if (animation == null)
                    throw new Error("animation cannot be null.");
                var last = this.expandToIndex(trackIndex);
                if (last != null) {
                    while (last.next != null)
                        last = last.next;
                }
                var entry = this.trackEntry(trackIndex, animation, loop, last);
                if (last == null) {
                    this.setCurrent(trackIndex, entry, true);
                    this.queue.drain();
                }
                else {
                    last.next = entry;
                    if (delay <= 0) {
                        var duration = last.animationEnd - last.animationStart;
                        if (duration != 0)
                            delay += duration * (1 + ((last.trackTime / duration) | 0)) - this.data.getMix(last.animation, animation);
                        else
                            delay = 0;
                    }
                }
                entry.delay = delay;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimation = function (trackIndex, mixDuration) {
                var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.addEmptyAnimation = function (trackIndex, mixDuration, delay) {
                if (delay <= 0)
                    delay -= mixDuration;
                var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
                entry.mixDuration = mixDuration;
                entry.trackEnd = mixDuration;
                return entry;
            };
            AnimationState.prototype.setEmptyAnimations = function (mixDuration) {
                var oldDrainDisabled = this.queue.drainDisabled;
                this.queue.drainDisabled = true;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var current = this.tracks[i];
                    if (current != null)
                        this.setEmptyAnimation(current.trackIndex, mixDuration);
                }
                this.queue.drainDisabled = oldDrainDisabled;
                this.queue.drain();
            };
            AnimationState.prototype.expandToIndex = function (index) {
                if (index < this.tracks.length)
                    return this.tracks[index];
                core.Utils.ensureArrayCapacity(this.tracks, index - this.tracks.length + 1, null);
                this.tracks.length = index + 1;
                return null;
            };
            AnimationState.prototype.trackEntry = function (trackIndex, animation, loop, last) {
                var entry = this.trackEntryPool.obtain();
                entry.trackIndex = trackIndex;
                entry.animation = animation;
                entry.loop = loop;
                entry.eventThreshold = 0;
                entry.attachmentThreshold = 0;
                entry.drawOrderThreshold = 0;
                entry.animationStart = 0;
                entry.animationEnd = animation.duration;
                entry.animationLast = -1;
                entry.nextAnimationLast = -1;
                entry.delay = 0;
                entry.trackTime = 0;
                entry.trackLast = -1;
                entry.nextTrackLast = -1;
                entry.trackEnd = Number.MAX_VALUE;
                entry.timeScale = 1;
                entry.alpha = 1;
                entry.interruptAlpha = 1;
                entry.mixTime = 0;
                entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
                return entry;
            };
            AnimationState.prototype.disposeNext = function (entry) {
                var next = entry.next;
                while (next != null) {
                    this.queue.dispose(next);
                    next = next.next;
                }
                entry.next = null;
            };
            AnimationState.prototype._animationsChanged = function () {
                this.animationsChanged = false;
                var propertyIDs = this.propertyIDs;
                propertyIDs.clear();
                var mixingTo = this.mixingTo;
                var lastEntry = null;
                for (var i = 0, n = this.tracks.length; i < n; i++) {
                    var entry = this.tracks[i];
                    if (entry != null)
                        entry.setTimelineData(null, mixingTo, propertyIDs);
                }
            };
            AnimationState.prototype.getCurrent = function (trackIndex) {
                if (trackIndex >= this.tracks.length)
                    return null;
                return this.tracks[trackIndex];
            };
            AnimationState.prototype.addListener = function (listener) {
                if (listener == null)
                    throw new Error("listener cannot be null.");
                this.listeners.push(listener);
            };
            AnimationState.prototype.removeListener = function (listener) {
                var index = this.listeners.indexOf(listener);
                if (index >= 0)
                    this.listeners.splice(index, 1);
            };
            AnimationState.prototype.clearListeners = function () {
                this.listeners.length = 0;
            };
            AnimationState.prototype.clearListenerNotifications = function () {
                this.queue.clear();
            };
            AnimationState.prototype.setAnimationByName = function (trackIndex, animationName, loop) {
                if (!AnimationState.deprecatedWarning1) {
                    AnimationState.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationState.setAnimationByName is deprecated, please use setAnimation from now on.");
                }
                this.setAnimation(trackIndex, animationName, loop);
            };
            AnimationState.prototype.addAnimationByName = function (trackIndex, animationName, loop, delay) {
                if (!AnimationState.deprecatedWarning2) {
                    AnimationState.deprecatedWarning2 = true;
                    console.warn("Deprecation Warning: AnimationState.addAnimationByName is deprecated, please use addAnimation from now on.");
                }
                this.addAnimation(trackIndex, animationName, loop, delay);
            };
            AnimationState.prototype.hasAnimation = function (animationName) {
                var animation = this.data.skeletonData.findAnimation(animationName);
                return animation !== null;
            };
            AnimationState.prototype.hasAnimationByName = function (animationName) {
                if (!AnimationState.deprecatedWarning3) {
                    AnimationState.deprecatedWarning3 = true;
                    console.warn("Deprecation Warning: AnimationState.hasAnimationByName is deprecated, please use hasAnimation from now on.");
                }
                return this.hasAnimation(animationName);
            };
            AnimationState.emptyAnimation = new core.Animation("<empty>", [], 0);
            AnimationState.SUBSEQUENT = 0;
            AnimationState.FIRST = 1;
            AnimationState.DIP = 2;
            AnimationState.DIP_MIX = 3;
            AnimationState.deprecatedWarning1 = false;
            AnimationState.deprecatedWarning2 = false;
            AnimationState.deprecatedWarning3 = false;
            return AnimationState;
        }());
        core.AnimationState = AnimationState;
        var TrackEntry = (function () {
            function TrackEntry() {
                this.timelineData = new Array();
                this.timelineDipMix = new Array();
                this.timelinesRotation = new Array();
            }
            TrackEntry.prototype.reset = function () {
                this.next = null;
                this.mixingFrom = null;
                this.animation = null;
                this.listener = null;
                this.timelineData.length = 0;
                this.timelineDipMix.length = 0;
                this.timelinesRotation.length = 0;
            };
            TrackEntry.prototype.setTimelineData = function (to, mixingToArray, propertyIDs) {
                if (to != null)
                    mixingToArray.push(to);
                var lastEntry = this.mixingFrom != null ? this.mixingFrom.setTimelineData(this, mixingToArray, propertyIDs) : this;
                if (to != null)
                    mixingToArray.pop();
                var mixingTo = mixingToArray;
                var mixingToLast = mixingToArray.length - 1;
                var timelines = this.animation.timelines;
                var timelinesCount = this.animation.timelines.length;
                var timelineData = core.Utils.setArraySize(this.timelineData, timelinesCount);
                this.timelineDipMix.length = 0;
                var timelineDipMix = core.Utils.setArraySize(this.timelineDipMix, timelinesCount);
                outer: for (var i = 0; i < timelinesCount; i++) {
                    var id = timelines[i].getPropertyId();
                    if (!propertyIDs.add(id))
                        timelineData[i] = AnimationState.SUBSEQUENT;
                    else if (to == null || !to.hasTimeline(id))
                        timelineData[i] = AnimationState.FIRST;
                    else {
                        for (var ii = mixingToLast; ii >= 0; ii--) {
                            var entry = mixingTo[ii];
                            if (!entry.hasTimeline(id)) {
                                if (entry.mixDuration > 0) {
                                    timelineData[i] = AnimationState.DIP_MIX;
                                    timelineDipMix[i] = entry;
                                    continue outer;
                                }
                            }
                        }
                        timelineData[i] = AnimationState.DIP;
                    }
                }
                return lastEntry;
            };
            TrackEntry.prototype.hasTimeline = function (id) {
                var timelines = this.animation.timelines;
                for (var i = 0, n = timelines.length; i < n; i++)
                    if (timelines[i].getPropertyId() == id)
                        return true;
                return false;
            };
            TrackEntry.prototype.getAnimationTime = function () {
                if (this.loop) {
                    var duration = this.animationEnd - this.animationStart;
                    if (duration == 0)
                        return this.animationStart;
                    return (this.trackTime % duration) + this.animationStart;
                }
                return Math.min(this.trackTime + this.animationStart, this.animationEnd);
            };
            TrackEntry.prototype.setAnimationLast = function (animationLast) {
                this.animationLast = animationLast;
                this.nextAnimationLast = animationLast;
            };
            TrackEntry.prototype.isComplete = function () {
                return this.trackTime >= this.animationEnd - this.animationStart;
            };
            TrackEntry.prototype.resetRotationDirections = function () {
                this.timelinesRotation.length = 0;
            };
            Object.defineProperty(TrackEntry.prototype, "time", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning1) {
                        TrackEntry.deprecatedWarning1 = true;
                        console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TrackEntry.prototype, "endTime", {
                get: function () {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    return this.trackTime;
                },
                set: function (value) {
                    if (!TrackEntry.deprecatedWarning2) {
                        TrackEntry.deprecatedWarning2 = true;
                        console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.");
                    }
                    this.trackTime = value;
                },
                enumerable: true,
                configurable: true
            });
            TrackEntry.prototype.loopsCount = function () {
                return Math.floor(this.trackTime / this.trackEnd);
            };
            TrackEntry.deprecatedWarning1 = false;
            TrackEntry.deprecatedWarning2 = false;
            return TrackEntry;
        }());
        core.TrackEntry = TrackEntry;
        var EventQueue = (function () {
            function EventQueue(animState) {
                this.objects = [];
                this.drainDisabled = false;
                this.animState = animState;
            }
            EventQueue.prototype.start = function (entry) {
                this.objects.push(EventType.start);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.interrupt = function (entry) {
                this.objects.push(EventType.interrupt);
                this.objects.push(entry);
            };
            EventQueue.prototype.end = function (entry) {
                this.objects.push(EventType.end);
                this.objects.push(entry);
                this.animState.animationsChanged = true;
            };
            EventQueue.prototype.dispose = function (entry) {
                this.objects.push(EventType.dispose);
                this.objects.push(entry);
            };
            EventQueue.prototype.complete = function (entry) {
                this.objects.push(EventType.complete);
                this.objects.push(entry);
            };
            EventQueue.prototype.event = function (entry, event) {
                this.objects.push(EventType.event);
                this.objects.push(entry);
                this.objects.push(event);
            };
            EventQueue.prototype.deprecateStuff = function () {
                if (!EventQueue.deprecatedWarning1) {
                    EventQueue.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: onComplete, onStart, onEnd, onEvent art deprecated, please use listeners from now on. 'state.addListener({ complete: function(track, event) { } })'");
                }
                return true;
            };
            EventQueue.prototype.drain = function () {
                if (this.drainDisabled)
                    return;
                this.drainDisabled = true;
                var objects = this.objects;
                var listeners = this.animState.listeners;
                for (var i = 0; i < objects.length; i += 2) {
                    var type = objects[i];
                    var entry = objects[i + 1];
                    switch (type) {
                        case EventType.start:
                            if (entry.listener != null && entry.listener.start)
                                entry.listener.start(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].start)
                                    listeners[ii].start(entry);
                            entry.onStart && this.deprecateStuff() && entry.onStart(entry.trackIndex);
                            this.animState.onStart && this.deprecateStuff() && this.deprecateStuff && this.animState.onStart(entry.trackIndex);
                            break;
                        case EventType.interrupt:
                            if (entry.listener != null && entry.listener.interrupt)
                                entry.listener.interrupt(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].interrupt)
                                    listeners[ii].interrupt(entry);
                            break;
                        case EventType.end:
                            if (entry.listener != null && entry.listener.end)
                                entry.listener.end(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].end)
                                    listeners[ii].end(entry);
                            entry.onEnd && this.deprecateStuff() && entry.onEnd(entry.trackIndex);
                            this.animState.onEnd && this.deprecateStuff() && this.animState.onEnd(entry.trackIndex);
                        case EventType.dispose:
                            if (entry.listener != null && entry.listener.dispose)
                                entry.listener.dispose(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].dispose)
                                    listeners[ii].dispose(entry);
                            this.animState.trackEntryPool.free(entry);
                            break;
                        case EventType.complete:
                            if (entry.listener != null && entry.listener.complete)
                                entry.listener.complete(entry);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].complete)
                                    listeners[ii].complete(entry);
                            var count = core.MathUtils.toInt(entry.loopsCount());
                            entry.onComplete && this.deprecateStuff() && entry.onComplete(entry.trackIndex, count);
                            this.animState.onComplete && this.deprecateStuff() && this.animState.onComplete(entry.trackIndex, count);
                            break;
                        case EventType.event:
                            var event_3 = objects[i++ + 2];
                            if (entry.listener != null && entry.listener.event)
                                entry.listener.event(entry, event_3);
                            for (var ii = 0; ii < listeners.length; ii++)
                                if (listeners[ii].event)
                                    listeners[ii].event(entry, event_3);
                            entry.onEvent && this.deprecateStuff() && entry.onEvent(entry.trackIndex, event_3);
                            this.animState.onEvent && this.deprecateStuff() && this.animState.onEvent(entry.trackIndex, event_3);
                            break;
                    }
                }
                this.clear();
                this.drainDisabled = false;
            };
            EventQueue.prototype.clear = function () {
                this.objects.length = 0;
            };
            EventQueue.deprecatedWarning1 = false;
            return EventQueue;
        }());
        core.EventQueue = EventQueue;
        var EventType;
        (function (EventType) {
            EventType[EventType["start"] = 0] = "start";
            EventType[EventType["interrupt"] = 1] = "interrupt";
            EventType[EventType["end"] = 2] = "end";
            EventType[EventType["dispose"] = 3] = "dispose";
            EventType[EventType["complete"] = 4] = "complete";
            EventType[EventType["event"] = 5] = "event";
        })(EventType = core.EventType || (core.EventType = {}));
        var AnimationStateAdapter2 = (function () {
            function AnimationStateAdapter2() {
            }
            AnimationStateAdapter2.prototype.start = function (entry) {
            };
            AnimationStateAdapter2.prototype.interrupt = function (entry) {
            };
            AnimationStateAdapter2.prototype.end = function (entry) {
            };
            AnimationStateAdapter2.prototype.dispose = function (entry) {
            };
            AnimationStateAdapter2.prototype.complete = function (entry) {
            };
            AnimationStateAdapter2.prototype.event = function (entry, event) {
            };
            return AnimationStateAdapter2;
        }());
        core.AnimationStateAdapter2 = AnimationStateAdapter2;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AnimationStateData = (function () {
            function AnimationStateData(skeletonData) {
                this.animationToMixTime = {};
                this.defaultMix = 0;
                if (skeletonData == null)
                    throw new Error("skeletonData cannot be null.");
                this.skeletonData = skeletonData;
            }
            AnimationStateData.prototype.setMix = function (fromName, toName, duration) {
                var from = this.skeletonData.findAnimation(fromName);
                if (from == null)
                    throw new Error("Animation not found: " + fromName);
                var to = this.skeletonData.findAnimation(toName);
                if (to == null)
                    throw new Error("Animation not found: " + toName);
                this.setMixWith(from, to, duration);
            };
            AnimationStateData.prototype.setMixByName = function (fromName, toName, duration) {
                if (!AnimationStateData.deprecatedWarning1) {
                    AnimationStateData.deprecatedWarning1 = true;
                    console.warn("Deprecation Warning: AnimationStateData.setMixByName is deprecated, please use setMix from now on.");
                }
                this.setMix(fromName, toName, duration);
            };
            AnimationStateData.prototype.setMixWith = function (from, to, duration) {
                if (from == null)
                    throw new Error("from cannot be null.");
                if (to == null)
                    throw new Error("to cannot be null.");
                var key = from.name + to.name;
                this.animationToMixTime[key] = duration;
            };
            AnimationStateData.prototype.getMix = function (from, to) {
                var key = from.name + to.name;
                var value = this.animationToMixTime[key];
                return value === undefined ? this.defaultMix : value;
            };
            AnimationStateData.deprecatedWarning1 = false;
            return AnimationStateData;
        }());
        core.AnimationStateData = AnimationStateData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AtlasAttachmentLoader = (function () {
            function AtlasAttachmentLoader(atlas) {
                this.atlas = atlas;
            }
            AtlasAttachmentLoader.prototype.newRegionAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (region attachment: " + name + ")");
                var attachment = new core.RegionAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newMeshAttachment = function (skin, name, path) {
                var region = this.atlas.findRegion(path);
                if (region == null)
                    throw new Error("Region not found in atlas: " + path + " (mesh attachment: " + name + ")");
                var attachment = new core.MeshAttachment(name);
                attachment.region = region;
                return attachment;
            };
            AtlasAttachmentLoader.prototype.newBoundingBoxAttachment = function (skin, name) {
                return new core.BoundingBoxAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newPathAttachment = function (skin, name) {
                return new core.PathAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newPointAttachment = function (skin, name) {
                return new core.PointAttachment(name);
            };
            AtlasAttachmentLoader.prototype.newClippingAttachment = function (skin, name) {
                return new core.ClippingAttachment(name);
            };
            return AtlasAttachmentLoader;
        }());
        core.AtlasAttachmentLoader = AtlasAttachmentLoader;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BlendMode;
        (function (BlendMode) {
            BlendMode[BlendMode["Normal"] = 0] = "Normal";
            BlendMode[BlendMode["Additive"] = 1] = "Additive";
            BlendMode[BlendMode["Multiply"] = 2] = "Multiply";
            BlendMode[BlendMode["Screen"] = 3] = "Screen";
        })(BlendMode = core.BlendMode || (core.BlendMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Bone = (function () {
            function Bone(data, skeleton, parent) {
                this.matrix = new PIXI.Matrix();
                this.children = new Array();
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 0;
                this.scaleY = 0;
                this.shearX = 0;
                this.shearY = 0;
                this.ax = 0;
                this.ay = 0;
                this.arotation = 0;
                this.ascaleX = 0;
                this.ascaleY = 0;
                this.ashearX = 0;
                this.ashearY = 0;
                this.appliedValid = false;
                this.sorted = false;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.skeleton = skeleton;
                this.parent = parent;
                this.setToSetupPose();
            }
            Object.defineProperty(Bone.prototype, "worldX", {
                get: function () {
                    return this.matrix.tx;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Bone.prototype, "worldY", {
                get: function () {
                    return this.matrix.ty;
                },
                enumerable: true,
                configurable: true
            });
            Bone.prototype.update = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransform = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
            };
            Bone.prototype.updateWorldTransformWith = function (x, y, rotation, scaleX, scaleY, shearX, shearY) {
                this.ax = x;
                this.ay = y;
                this.arotation = rotation;
                this.ascaleX = scaleX;
                this.ascaleY = scaleY;
                this.ashearX = shearX;
                this.ashearY = shearY;
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    var rotationY = rotation + 90 + shearY;
                    var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                    var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                    var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                    var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                    var skeleton = this.skeleton;
                    if (skeleton.flipX) {
                        x = -x;
                        la = -la;
                        lb = -lb;
                    }
                    if (skeleton.flipY !== Bone.yDown) {
                        y = -y;
                        lc = -lc;
                        ld = -ld;
                    }
                    m.a = la;
                    m.c = lb;
                    m.b = lc;
                    m.d = ld;
                    m.tx = x + skeleton.x;
                    m.ty = y + skeleton.y;
                    return;
                }
                var pa = parent.matrix.a, pb = parent.matrix.c, pc = parent.matrix.b, pd = parent.matrix.d;
                m.tx = pa * x + pb * y + parent.matrix.tx;
                m.ty = pc * x + pd * y + parent.matrix.ty;
                switch (this.data.transformMode) {
                    case core.TransformMode.Normal: {
                        var rotationY = rotation + 90 + shearY;
                        var la = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(rotationY) * scaleY;
                        var lc = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(rotationY) * scaleY;
                        m.a = pa * la + pb * lc;
                        m.c = pa * lb + pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        return;
                    }
                    case core.TransformMode.OnlyTranslation: {
                        var rotationY = rotation + 90 + shearY;
                        m.a = core.MathUtils.cosDeg(rotation + shearX) * scaleX;
                        m.c = core.MathUtils.cosDeg(rotationY) * scaleY;
                        m.b = core.MathUtils.sinDeg(rotation + shearX) * scaleX;
                        m.d = core.MathUtils.sinDeg(rotationY) * scaleY;
                        break;
                    }
                    case core.TransformMode.NoRotationOrReflection: {
                        var s = pa * pa + pc * pc;
                        var prx = 0;
                        if (s > 0.0001) {
                            s = Math.abs(pa * pd - pb * pc) / s;
                            pb = pc * s;
                            pd = pa * s;
                            prx = Math.atan2(pc, pa) * core.MathUtils.radDeg;
                        }
                        else {
                            pa = 0;
                            pc = 0;
                            prx = 90 - Math.atan2(pd, pb) * core.MathUtils.radDeg;
                        }
                        var rx = rotation + shearX - prx;
                        var ry = rotation + shearY - prx + 90;
                        var la = core.MathUtils.cosDeg(rx) * scaleX;
                        var lb = core.MathUtils.cosDeg(ry) * scaleY;
                        var lc = core.MathUtils.sinDeg(rx) * scaleX;
                        var ld = core.MathUtils.sinDeg(ry) * scaleY;
                        m.a = pa * la - pb * lc;
                        m.c = pa * lb - pb * ld;
                        m.b = pc * la + pd * lc;
                        m.d = pc * lb + pd * ld;
                        break;
                    }
                    case core.TransformMode.NoScale:
                    case core.TransformMode.NoScaleOrReflection: {
                        var cos = core.MathUtils.cosDeg(rotation);
                        var sin = core.MathUtils.sinDeg(rotation);
                        var za = pa * cos + pb * sin;
                        var zc = pc * cos + pd * sin;
                        var s = Math.sqrt(za * za + zc * zc);
                        if (s > 0.00001)
                            s = 1 / s;
                        za *= s;
                        zc *= s;
                        s = Math.sqrt(za * za + zc * zc);
                        var r = Math.PI / 2 + Math.atan2(zc, za);
                        var zb = Math.cos(r) * s;
                        var zd = Math.sin(r) * s;
                        var la = core.MathUtils.cosDeg(shearX) * scaleX;
                        var lb = core.MathUtils.cosDeg(90 + shearY) * scaleY;
                        var lc = core.MathUtils.sinDeg(shearX) * scaleX;
                        var ld = core.MathUtils.sinDeg(90 + shearY) * scaleY;
                        m.a = za * la + zb * lc;
                        m.c = za * lb + zb * ld;
                        m.b = zc * la + zd * lc;
                        m.d = zc * lb + zd * ld;
                        if (this.data.transformMode != core.TransformMode.NoScaleOrReflection ? pa * pd - pb * pc < 0 : ((this.skeleton.flipX != this.skeleton.flipY) != Bone.yDown)) {
                            m.c = -m.c;
                            m.d = -m.d;
                        }
                        return;
                    }
                }
                if (this.skeleton.flipX) {
                    m.a = -m.a;
                    m.c = -m.c;
                }
                if (this.skeleton.flipY != Bone.yDown) {
                    m.b = -m.b;
                    m.d = -m.d;
                }
            };
            Bone.prototype.setToSetupPose = function () {
                var data = this.data;
                this.x = data.x;
                this.y = data.y;
                this.rotation = data.rotation;
                this.scaleX = data.scaleX;
                this.scaleY = data.scaleY;
                this.shearX = data.shearX;
                this.shearY = data.shearY;
            };
            Bone.prototype.getWorldRotationX = function () {
                return Math.atan2(this.matrix.b, this.matrix.a) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldRotationY = function () {
                return Math.atan2(this.matrix.d, this.matrix.c) * core.MathUtils.radDeg;
            };
            Bone.prototype.getWorldScaleX = function () {
                var m = this.matrix;
                return Math.sqrt(m.a * m.a + m.c * m.c);
            };
            Bone.prototype.getWorldScaleY = function () {
                var m = this.matrix;
                return Math.sqrt(m.b * m.b + m.d * m.d);
            };
            Bone.prototype.updateAppliedTransform = function () {
                this.appliedValid = true;
                var parent = this.parent;
                var m = this.matrix;
                if (parent == null) {
                    this.ax = m.tx;
                    this.ay = m.ty;
                    this.arotation = Math.atan2(m.b, m.a) * core.MathUtils.radDeg;
                    this.ascaleX = Math.sqrt(m.a * m.a + m.b * m.b);
                    this.ascaleY = Math.sqrt(m.c * m.c + m.d * m.d);
                    this.ashearX = 0;
                    this.ashearY = Math.atan2(m.a * m.c + m.b * m.d, m.a * m.d - m.b * m.c) * core.MathUtils.radDeg;
                    return;
                }
                var pm = parent.matrix;
                var pid = 1 / (pm.a * pm.d - pm.b * pm.c);
                var dx = m.tx - pm.tx, dy = m.ty - pm.ty;
                this.ax = (dx * pm.d * pid - dy * pm.c * pid);
                this.ay = (dy * pm.a * pid - dx * pm.b * pid);
                var ia = pid * pm.d;
                var id = pid * pm.a;
                var ib = pid * pm.c;
                var ic = pid * pm.b;
                var ra = ia * m.a - ib * m.b;
                var rb = ia * m.c - ib * m.d;
                var rc = id * m.b - ic * m.a;
                var rd = id * m.d - ic * m.c;
                this.ashearX = 0;
                this.ascaleX = Math.sqrt(ra * ra + rc * rc);
                if (this.ascaleX > 0.0001) {
                    var det = ra * rd - rb * rc;
                    this.ascaleY = det / this.ascaleX;
                    this.ashearY = Math.atan2(ra * rb + rc * rd, det) * core.MathUtils.radDeg;
                    this.arotation = Math.atan2(rc, ra) * core.MathUtils.radDeg;
                }
                else {
                    this.ascaleX = 0;
                    this.ascaleY = Math.sqrt(rb * rb + rd * rd);
                    this.ashearY = 0;
                    this.arotation = 90 - Math.atan2(rd, rb) * core.MathUtils.radDeg;
                }
            };
            Bone.prototype.worldToLocal = function (world) {
                var m = this.matrix;
                var a = m.a, b = m.c, c = m.b, d = m.d;
                var invDet = 1 / (a * d - b * c);
                var x = world.x - m.tx, y = world.y - m.ty;
                world.x = (x * d * invDet - y * b * invDet);
                world.y = (y * a * invDet - x * c * invDet);
                return world;
            };
            Bone.prototype.localToWorld = function (local) {
                var m = this.matrix;
                var x = local.x, y = local.y;
                local.x = x * m.a + y * m.c + m.tx;
                local.y = x * m.b + y * m.d + m.ty;
                return local;
            };
            Bone.prototype.worldToLocalRotation = function (worldRotation) {
                var sin = core.MathUtils.sinDeg(worldRotation), cos = core.MathUtils.cosDeg(worldRotation);
                var mat = this.matrix;
                return Math.atan2(mat.a * sin - mat.b * cos, mat.d * cos - mat.c * sin) * core.MathUtils.radDeg;
            };
            Bone.prototype.localToWorldRotation = function (localRotation) {
                var sin = core.MathUtils.sinDeg(localRotation), cos = core.MathUtils.cosDeg(localRotation);
                var mat = this.matrix;
                return Math.atan2(cos * mat.b + sin * mat.d, cos * mat.a + sin * mat.c) * core.MathUtils.radDeg;
            };
            Bone.prototype.rotateWorld = function (degrees) {
                var mat = this.matrix;
                var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                var cos = core.MathUtils.cosDeg(degrees), sin = core.MathUtils.sinDeg(degrees);
                mat.a = cos * a - sin * c;
                mat.c = cos * b - sin * d;
                mat.b = sin * a + cos * c;
                mat.d = sin * b + cos * d;
                this.appliedValid = false;
            };
            Bone.yDown = false;
            return Bone;
        }());
        core.Bone = Bone;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoneData = (function () {
            function BoneData(index, name, parent) {
                this.x = 0;
                this.y = 0;
                this.rotation = 0;
                this.scaleX = 1;
                this.scaleY = 1;
                this.shearX = 0;
                this.shearY = 0;
                this.transformMode = TransformMode.Normal;
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                this.index = index;
                this.name = name;
                this.parent = parent;
            }
            return BoneData;
        }());
        core.BoneData = BoneData;
        var TransformMode;
        (function (TransformMode) {
            TransformMode[TransformMode["Normal"] = 0] = "Normal";
            TransformMode[TransformMode["OnlyTranslation"] = 1] = "OnlyTranslation";
            TransformMode[TransformMode["NoRotationOrReflection"] = 2] = "NoRotationOrReflection";
            TransformMode[TransformMode["NoScale"] = 3] = "NoScale";
            TransformMode[TransformMode["NoScaleOrReflection"] = 4] = "NoScaleOrReflection";
        })(TransformMode = core.TransformMode || (core.TransformMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Event = (function () {
            function Event(time, data) {
                if (data == null)
                    throw new Error("data cannot be null.");
                this.time = time;
                this.data = data;
            }
            return Event;
        }());
        core.Event = Event;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var EventData = (function () {
            function EventData(name) {
                this.name = name;
            }
            return EventData;
        }());
        core.EventData = EventData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraint = (function () {
            function IkConstraint(data, skeleton) {
                this.mix = 1;
                this.bendDirection = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.mix = data.mix;
                this.bendDirection = data.bendDirection;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            IkConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            IkConstraint.prototype.apply = function () {
                this.update();
            };
            IkConstraint.prototype.update = function () {
                var target = this.target;
                var bones = this.bones;
                switch (bones.length) {
                    case 1:
                        this.apply1(bones[0], target.worldX, target.worldY, this.mix);
                        break;
                    case 2:
                        this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.mix);
                        break;
                }
            };
            IkConstraint.prototype.apply1 = function (bone, targetX, targetY, alpha) {
                if (!bone.appliedValid)
                    bone.updateAppliedTransform();
                var p = bone.parent.matrix;
                var id = 1 / (p.a * p.d - p.b * p.c);
                var x = targetX - p.tx, y = targetY - p.ty;
                var tx = (x * p.d - y * p.c) * id - bone.ax, ty = (y * p.a - x * p.b) * id - bone.ay;
                var rotationIK = Math.atan2(ty, tx) * core.MathUtils.radDeg - bone.ashearX - bone.arotation;
                if (bone.ascaleX < 0)
                    rotationIK += 180;
                if (rotationIK > 180)
                    rotationIK -= 360;
                else if (rotationIK < -180)
                    rotationIK += 360;
                bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, bone.ascaleX, bone.ascaleY, bone.ashearX, bone.ashearY);
            };
            IkConstraint.prototype.apply2 = function (parent, child, targetX, targetY, bendDir, alpha) {
                if (alpha == 0) {
                    child.updateWorldTransform();
                    return;
                }
                if (!parent.appliedValid)
                    parent.updateAppliedTransform();
                if (!child.appliedValid)
                    child.updateAppliedTransform();
                var px = parent.ax, py = parent.ay, psx = parent.ascaleX, psy = parent.ascaleY, csx = child.ascaleX;
                var pmat = parent.matrix;
                var os1 = 0, os2 = 0, s2 = 0;
                if (psx < 0) {
                    psx = -psx;
                    os1 = 180;
                    s2 = -1;
                }
                else {
                    os1 = 0;
                    s2 = 1;
                }
                if (psy < 0) {
                    psy = -psy;
                    s2 = -s2;
                }
                if (csx < 0) {
                    csx = -csx;
                    os2 = 180;
                }
                else
                    os2 = 0;
                var cx = child.ax, cy = 0, cwx = 0, cwy = 0, a = pmat.a, b = pmat.c, c = pmat.b, d = pmat.d;
                var u = Math.abs(psx - psy) <= 0.0001;
                if (!u) {
                    cy = 0;
                    cwx = a * cx + pmat.tx;
                    cwy = c * cx + pmat.ty;
                }
                else {
                    cy = child.ay;
                    cwx = a * cx + b * cy + pmat.tx;
                    cwy = c * cx + d * cy + pmat.ty;
                }
                var pp = parent.parent.matrix;
                a = pp.a;
                b = pp.c;
                c = pp.b;
                d = pp.d;
                var id = 1 / (a * d - b * c), x = targetX - pp.tx, y = targetY - pp.ty;
                var tx = (x * d - y * b) * id - px, ty = (y * a - x * c) * id - py;
                x = cwx - pp.tx;
                y = cwy - pp.ty;
                var dx = (x * d - y * b) * id - px, dy = (y * a - x * c) * id - py;
                var l1 = Math.sqrt(dx * dx + dy * dy), l2 = child.data.length * csx, a1 = 0, a2 = 0;
                outer: if (u) {
                    l2 *= psx;
                    var cos = (tx * tx + ty * ty - l1 * l1 - l2 * l2) / (2 * l1 * l2);
                    if (cos < -1)
                        cos = -1;
                    else if (cos > 1)
                        cos = 1;
                    a2 = Math.acos(cos) * bendDir;
                    a = l1 + l2 * cos;
                    b = l2 * Math.sin(a2);
                    a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
                }
                else {
                    a = psx * l2;
                    b = psy * l2;
                    var aa = a * a, bb = b * b, dd = tx * tx + ty * ty, ta = Math.atan2(ty, tx);
                    c = bb * l1 * l1 + aa * dd - aa * bb;
                    var c1 = -2 * bb * l1, c2 = bb - aa;
                    d = c1 * c1 - 4 * c2 * c;
                    if (d >= 0) {
                        var q = Math.sqrt(d);
                        if (c1 < 0)
                            q = -q;
                        q = -(c1 + q) / 2;
                        var r0 = q / c2, r1 = c / q;
                        var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
                        if (r * r <= dd) {
                            y = Math.sqrt(dd - r * r) * bendDir;
                            a1 = ta - Math.atan2(y, r);
                            a2 = Math.atan2(y / psy, (r - l1) / psx);
                            break outer;
                        }
                    }
                    var minAngle = core.MathUtils.PI, minX = l1 - a, minDist = minX * minX, minY = 0;
                    var maxAngle = 0, maxX = l1 + a, maxDist = maxX * maxX, maxY = 0;
                    c = -a * l1 / (aa - bb);
                    if (c >= -1 && c <= 1) {
                        c = Math.acos(c);
                        x = a * Math.cos(c) + l1;
                        y = b * Math.sin(c);
                        d = x * x + y * y;
                        if (d < minDist) {
                            minAngle = c;
                            minDist = d;
                            minX = x;
                            minY = y;
                        }
                        if (d > maxDist) {
                            maxAngle = c;
                            maxDist = d;
                            maxX = x;
                            maxY = y;
                        }
                    }
                    if (dd <= (minDist + maxDist) / 2) {
                        a1 = ta - Math.atan2(minY * bendDir, minX);
                        a2 = minAngle * bendDir;
                    }
                    else {
                        a1 = ta - Math.atan2(maxY * bendDir, maxX);
                        a2 = maxAngle * bendDir;
                    }
                }
                var os = Math.atan2(cy, cx) * s2;
                var rotation = parent.arotation;
                a1 = (a1 - os) * core.MathUtils.radDeg + os1 - rotation;
                if (a1 > 180)
                    a1 -= 360;
                else if (a1 < -180)
                    a1 += 360;
                parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, parent.ascaleX, parent.ascaleY, 0, 0);
                rotation = child.arotation;
                a2 = ((a2 + os) * core.MathUtils.radDeg - child.ashearX) * s2 + os2 - rotation;
                if (a2 > 180)
                    a2 -= 360;
                else if (a2 < -180)
                    a2 += 360;
                child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
            };
            return IkConstraint;
        }());
        core.IkConstraint = IkConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IkConstraintData = (function () {
            function IkConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.bendDirection = 1;
                this.mix = 1;
                this.name = name;
            }
            return IkConstraintData;
        }());
        core.IkConstraintData = IkConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraint = (function () {
            function PathConstraint(data, skeleton) {
                this.position = 0;
                this.spacing = 0;
                this.rotateMix = 0;
                this.translateMix = 0;
                this.spaces = new Array();
                this.positions = new Array();
                this.world = new Array();
                this.curves = new Array();
                this.lengths = new Array();
                this.segments = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0, n = data.bones.length; i < n; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findSlot(data.target.name);
                this.position = data.position;
                this.spacing = data.spacing;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
            }
            PathConstraint.prototype.apply = function () {
                this.update();
            };
            PathConstraint.prototype.update = function () {
                var attachment = this.target.getAttachment();
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var rotateMix = this.rotateMix, translateMix = this.translateMix;
                var translate = translateMix > 0, rotate = rotateMix > 0;
                if (!translate && !rotate)
                    return;
                var data = this.data;
                var spacingMode = data.spacingMode;
                var lengthSpacing = spacingMode == core.SpacingMode.Length;
                var rotateMode = data.rotateMode;
                var tangents = rotateMode == core.RotateMode.Tangent, scale = rotateMode == core.RotateMode.ChainScale;
                var boneCount = this.bones.length, spacesCount = tangents ? boneCount : boneCount + 1;
                var bones = this.bones;
                var spaces = core.Utils.setArraySize(this.spaces, spacesCount), lengths = null;
                var spacing = this.spacing;
                if (scale || lengthSpacing) {
                    if (scale)
                        lengths = core.Utils.setArraySize(this.lengths, boneCount);
                    for (var i = 0, n = spacesCount - 1; i < n;) {
                        var bone = bones[i];
                        var setupLength = bone.data.length, x = setupLength * bone.matrix.a, y = setupLength * bone.matrix.b;
                        var length_1 = Math.sqrt(x * x + y * y);
                        if (scale)
                            lengths[i] = length_1;
                        spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length_1 / setupLength;
                    }
                }
                else {
                    for (var i = 1; i < spacesCount; i++)
                        spaces[i] = spacing;
                }
                var positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode == core.PositionMode.Percent, spacingMode == core.SpacingMode.Percent);
                var boneX = positions[0], boneY = positions[1], offsetRotation = data.offsetRotation;
                var tip = false;
                if (offsetRotation == 0)
                    tip = rotateMode == core.RotateMode.Chain;
                else {
                    tip = false;
                    var p = this.target.bone.matrix;
                    offsetRotation *= p.a * p.d - p.b * p.c > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                }
                for (var i = 0, p = 3; i < boneCount; i++, p += 3) {
                    var bone = bones[i];
                    var mat = bone.matrix;
                    mat.tx += (boneX - mat.tx) * translateMix;
                    mat.ty += (boneY - mat.ty) * translateMix;
                    var x = positions[p], y = positions[p + 1], dx = x - boneX, dy = y - boneY;
                    if (scale) {
                        var length_2 = lengths[i];
                        if (length_2 != 0) {
                            var s = (Math.sqrt(dx * dx + dy * dy) / length_2 - 1) * rotateMix + 1;
                            mat.a *= s;
                            mat.b *= s;
                        }
                    }
                    boneX = x;
                    boneY = y;
                    if (rotate) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d, r = 0, cos = 0, sin = 0;
                        if (tangents)
                            r = positions[p - 1];
                        else if (spaces[i + 1] == 0)
                            r = positions[p + 2];
                        else
                            r = Math.atan2(dy, dx);
                        r -= Math.atan2(c, a);
                        if (tip) {
                            cos = Math.cos(r);
                            sin = Math.sin(r);
                            var length_3 = bone.data.length;
                            boneX += (length_3 * (cos * a - sin * c) - dx) * rotateMix;
                            boneY += (length_3 * (sin * a + cos * c) - dy) * rotateMix;
                        }
                        else {
                            r += offsetRotation;
                        }
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        cos = Math.cos(r);
                        sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                    }
                    bone.appliedValid = false;
                }
            };
            PathConstraint.prototype.computeWorldPositions = function (path, spacesCount, tangents, percentPosition, percentSpacing) {
                var target = this.target;
                var position = this.position;
                var spaces = this.spaces, out = core.Utils.setArraySize(this.positions, spacesCount * 3 + 2), world = null;
                var closed = path.closed;
                var verticesLength = path.worldVerticesLength, curveCount = verticesLength / 6, prevCurve = PathConstraint.NONE;
                if (!path.constantSpeed) {
                    var lengths = path.lengths;
                    curveCount -= closed ? 1 : 2;
                    var pathLength_1 = lengths[curveCount];
                    if (percentPosition)
                        position *= pathLength_1;
                    if (percentSpacing) {
                        for (var i = 0; i < spacesCount; i++)
                            spaces[i] *= pathLength_1;
                    }
                    world = core.Utils.setArraySize(this.world, 8);
                    for (var i = 0, o = 0, curve = 0; i < spacesCount; i++, o += 3) {
                        var space = spaces[i];
                        position += space;
                        var p = position;
                        if (closed) {
                            p %= pathLength_1;
                            if (p < 0)
                                p += pathLength_1;
                            curve = 0;
                        }
                        else if (p < 0) {
                            if (prevCurve != PathConstraint.BEFORE) {
                                prevCurve = PathConstraint.BEFORE;
                                path.computeWorldVertices(target, 2, 4, world, 0, 2);
                            }
                            this.addBeforePosition(p, world, 0, out, o);
                            continue;
                        }
                        else if (p > pathLength_1) {
                            if (prevCurve != PathConstraint.AFTER) {
                                prevCurve = PathConstraint.AFTER;
                                path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
                            }
                            this.addAfterPosition(p - pathLength_1, world, 0, out, o);
                            continue;
                        }
                        for (;; curve++) {
                            var length_4 = lengths[curve];
                            if (p > length_4)
                                continue;
                            if (curve == 0)
                                p /= length_4;
                            else {
                                var prev = lengths[curve - 1];
                                p = (p - prev) / (length_4 - prev);
                            }
                            break;
                        }
                        if (curve != prevCurve) {
                            prevCurve = curve;
                            if (closed && curve == curveCount) {
                                path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                                path.computeWorldVertices(target, 0, 4, world, 4, 2);
                            }
                            else
                                path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
                        }
                        this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || (i > 0 && space == 0));
                    }
                    return out;
                }
                if (closed) {
                    verticesLength += 2;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
                    path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
                    world[verticesLength - 2] = world[0];
                    world[verticesLength - 1] = world[1];
                }
                else {
                    curveCount--;
                    verticesLength -= 4;
                    world = core.Utils.setArraySize(this.world, verticesLength);
                    path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
                }
                var curves = core.Utils.setArraySize(this.curves, curveCount);
                var pathLength = 0;
                var x1 = world[0], y1 = world[1], cx1 = 0, cy1 = 0, cx2 = 0, cy2 = 0, x2 = 0, y2 = 0;
                var tmpx = 0, tmpy = 0, dddfx = 0, dddfy = 0, ddfx = 0, ddfy = 0, dfx = 0, dfy = 0;
                for (var i = 0, w = 2; i < curveCount; i++, w += 6) {
                    cx1 = world[w];
                    cy1 = world[w + 1];
                    cx2 = world[w + 2];
                    cy2 = world[w + 3];
                    x2 = world[w + 4];
                    y2 = world[w + 5];
                    tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
                    tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
                    dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
                    dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
                    ddfx = tmpx * 2 + dddfx;
                    ddfy = tmpy * 2 + dddfy;
                    dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
                    dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    ddfx += dddfx;
                    ddfy += dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx;
                    dfy += ddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    dfx += ddfx + dddfx;
                    dfy += ddfy + dddfy;
                    pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
                    curves[i] = pathLength;
                    x1 = x2;
                    y1 = y2;
                }
                if (percentPosition)
                    position *= pathLength;
                if (percentSpacing) {
                    for (var i = 0; i < spacesCount; i++)
                        spaces[i] *= pathLength;
                }
                var segments = this.segments;
                var curveLength = 0;
                for (var i = 0, o = 0, curve = 0, segment = 0; i < spacesCount; i++, o += 3) {
                    var space = spaces[i];
                    position += space;
                    var p = position;
                    if (closed) {
                        p %= pathLength;
                        if (p < 0)
                            p += pathLength;
                        curve = 0;
                    }
                    else if (p < 0) {
                        this.addBeforePosition(p, world, 0, out, o);
                        continue;
                    }
                    else if (p > pathLength) {
                        this.addAfterPosition(p - pathLength, world, verticesLength - 4, out, o);
                        continue;
                    }
                    for (;; curve++) {
                        var length_5 = curves[curve];
                        if (p > length_5)
                            continue;
                        if (curve == 0)
                            p /= length_5;
                        else {
                            var prev = curves[curve - 1];
                            p = (p - prev) / (length_5 - prev);
                        }
                        break;
                    }
                    if (curve != prevCurve) {
                        prevCurve = curve;
                        var ii = curve * 6;
                        x1 = world[ii];
                        y1 = world[ii + 1];
                        cx1 = world[ii + 2];
                        cy1 = world[ii + 3];
                        cx2 = world[ii + 4];
                        cy2 = world[ii + 5];
                        x2 = world[ii + 6];
                        y2 = world[ii + 7];
                        tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
                        tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
                        dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
                        dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
                        ddfx = tmpx * 2 + dddfx;
                        ddfy = tmpy * 2 + dddfy;
                        dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
                        dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
                        curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[0] = curveLength;
                        for (ii = 1; ii < 8; ii++) {
                            dfx += ddfx;
                            dfy += ddfy;
                            ddfx += dddfx;
                            ddfy += dddfy;
                            curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                            segments[ii] = curveLength;
                        }
                        dfx += ddfx;
                        dfy += ddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[8] = curveLength;
                        dfx += ddfx + dddfx;
                        dfy += ddfy + dddfy;
                        curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
                        segments[9] = curveLength;
                        segment = 0;
                    }
                    p *= curveLength;
                    for (;; segment++) {
                        var length_6 = segments[segment];
                        if (p > length_6)
                            continue;
                        if (segment == 0)
                            p /= length_6;
                        else {
                            var prev = segments[segment - 1];
                            p = segment + (p - prev) / (length_6 - prev);
                        }
                        break;
                    }
                    this.addCurvePosition(p * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents || (i > 0 && space == 0));
                }
                return out;
            };
            PathConstraint.prototype.addBeforePosition = function (p, temp, i, out, o) {
                var x1 = temp[i], y1 = temp[i + 1], dx = temp[i + 2] - x1, dy = temp[i + 3] - y1, r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addAfterPosition = function (p, temp, i, out, o) {
                var x1 = temp[i + 2], y1 = temp[i + 3], dx = x1 - temp[i], dy = y1 - temp[i + 1], r = Math.atan2(dy, dx);
                out[o] = x1 + p * Math.cos(r);
                out[o + 1] = y1 + p * Math.sin(r);
                out[o + 2] = r;
            };
            PathConstraint.prototype.addCurvePosition = function (p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
                if (p == 0 || isNaN(p))
                    p = 0.0001;
                var tt = p * p, ttt = tt * p, u = 1 - p, uu = u * u, uuu = uu * u;
                var ut = u * p, ut3 = ut * 3, uut3 = u * ut3, utt3 = ut3 * p;
                var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt, y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
                out[o] = x;
                out[o + 1] = y;
                if (tangents)
                    out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
            };
            PathConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            PathConstraint.NONE = -1;
            PathConstraint.BEFORE = -2;
            PathConstraint.AFTER = -3;
            return PathConstraint;
        }());
        core.PathConstraint = PathConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathConstraintData = (function () {
            function PathConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.name = name;
            }
            return PathConstraintData;
        }());
        core.PathConstraintData = PathConstraintData;
        var PositionMode;
        (function (PositionMode) {
            PositionMode[PositionMode["Fixed"] = 0] = "Fixed";
            PositionMode[PositionMode["Percent"] = 1] = "Percent";
        })(PositionMode = core.PositionMode || (core.PositionMode = {}));
        var SpacingMode;
        (function (SpacingMode) {
            SpacingMode[SpacingMode["Length"] = 0] = "Length";
            SpacingMode[SpacingMode["Fixed"] = 1] = "Fixed";
            SpacingMode[SpacingMode["Percent"] = 2] = "Percent";
        })(SpacingMode = core.SpacingMode || (core.SpacingMode = {}));
        var RotateMode;
        (function (RotateMode) {
            RotateMode[RotateMode["Tangent"] = 0] = "Tangent";
            RotateMode[RotateMode["Chain"] = 1] = "Chain";
            RotateMode[RotateMode["ChainScale"] = 2] = "ChainScale";
        })(RotateMode = core.RotateMode || (core.RotateMode = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skeleton = (function () {
            function Skeleton(data) {
                this._updateCache = new Array();
                this.updateCacheReset = new Array();
                this.time = 0;
                this.flipX = false;
                this.flipY = false;
                this.x = 0;
                this.y = 0;
                if (data == null)
                    throw new Error("data cannot be null.");
                this.data = data;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++) {
                    var boneData = data.bones[i];
                    var bone = void 0;
                    if (boneData.parent == null)
                        bone = new core.Bone(boneData, this, null);
                    else {
                        var parent_1 = this.bones[boneData.parent.index];
                        bone = new core.Bone(boneData, this, parent_1);
                        parent_1.children.push(bone);
                    }
                    this.bones.push(bone);
                }
                this.slots = new Array();
                this.drawOrder = new Array();
                for (var i = 0; i < data.slots.length; i++) {
                    var slotData = data.slots[i];
                    var bone = this.bones[slotData.boneData.index];
                    var slot = new core.Slot(slotData, bone);
                    this.slots.push(slot);
                    this.drawOrder.push(slot);
                }
                this.ikConstraints = new Array();
                for (var i = 0; i < data.ikConstraints.length; i++) {
                    var ikConstraintData = data.ikConstraints[i];
                    this.ikConstraints.push(new core.IkConstraint(ikConstraintData, this));
                }
                this.transformConstraints = new Array();
                for (var i = 0; i < data.transformConstraints.length; i++) {
                    var transformConstraintData = data.transformConstraints[i];
                    this.transformConstraints.push(new core.TransformConstraint(transformConstraintData, this));
                }
                this.pathConstraints = new Array();
                for (var i = 0; i < data.pathConstraints.length; i++) {
                    var pathConstraintData = data.pathConstraints[i];
                    this.pathConstraints.push(new core.PathConstraint(pathConstraintData, this));
                }
                this.color = new core.Color(1, 1, 1, 1);
                this.updateCache();
            }
            Skeleton.prototype.updateCache = function () {
                var updateCache = this._updateCache;
                updateCache.length = 0;
                this.updateCacheReset.length = 0;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].sorted = false;
                var ikConstraints = this.ikConstraints;
                var transformConstraints = this.transformConstraints;
                var pathConstraints = this.pathConstraints;
                var ikCount = ikConstraints.length, transformCount = transformConstraints.length, pathCount = pathConstraints.length;
                var constraintCount = ikCount + transformCount + pathCount;
                outer: for (var i = 0; i < constraintCount; i++) {
                    for (var ii = 0; ii < ikCount; ii++) {
                        var constraint = ikConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortIkConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < transformCount; ii++) {
                        var constraint = transformConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortTransformConstraint(constraint);
                            continue outer;
                        }
                    }
                    for (var ii = 0; ii < pathCount; ii++) {
                        var constraint = pathConstraints[ii];
                        if (constraint.data.order == i) {
                            this.sortPathConstraint(constraint);
                            continue outer;
                        }
                    }
                }
                for (var i = 0, n = bones.length; i < n; i++)
                    this.sortBone(bones[i]);
            };
            Skeleton.prototype.sortIkConstraint = function (constraint) {
                var target = constraint.target;
                this.sortBone(target);
                var constrained = constraint.bones;
                var parent = constrained[0];
                this.sortBone(parent);
                if (constrained.length > 1) {
                    var child = constrained[constrained.length - 1];
                    if (!(this._updateCache.indexOf(child) > -1))
                        this.updateCacheReset.push(child);
                }
                this._updateCache.push(constraint);
                this.sortReset(parent.children);
                constrained[constrained.length - 1].sorted = true;
            };
            Skeleton.prototype.sortPathConstraint = function (constraint) {
                var slot = constraint.target;
                var slotIndex = slot.data.index;
                var slotBone = slot.bone;
                if (this.skin != null)
                    this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
                if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin)
                    this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
                for (var i = 0, n = this.data.skins.length; i < n; i++)
                    this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
                var attachment = slot.getAttachment();
                if (attachment instanceof core.PathAttachment)
                    this.sortPathConstraintAttachmentWith(attachment, slotBone);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                for (var i = 0; i < boneCount; i++)
                    this.sortBone(constrained[i]);
                this._updateCache.push(constraint);
                for (var i = 0; i < boneCount; i++)
                    this.sortReset(constrained[i].children);
                for (var i = 0; i < boneCount; i++)
                    constrained[i].sorted = true;
            };
            Skeleton.prototype.sortTransformConstraint = function (constraint) {
                this.sortBone(constraint.target);
                var constrained = constraint.bones;
                var boneCount = constrained.length;
                if (constraint.data.local) {
                    for (var i = 0; i < boneCount; i++) {
                        var child = constrained[i];
                        this.sortBone(child.parent);
                        if (!(this._updateCache.indexOf(child) > -1))
                            this.updateCacheReset.push(child);
                    }
                }
                else {
                    for (var i = 0; i < boneCount; i++) {
                        this.sortBone(constrained[i]);
                    }
                }
                this._updateCache.push(constraint);
                for (var ii = 0; ii < boneCount; ii++)
                    this.sortReset(constrained[ii].children);
                for (var ii = 0; ii < boneCount; ii++)
                    constrained[ii].sorted = true;
            };
            Skeleton.prototype.sortPathConstraintAttachment = function (skin, slotIndex, slotBone) {
                var attachments = skin.attachments[slotIndex];
                if (!attachments)
                    return;
                for (var key in attachments) {
                    this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
                }
            };
            Skeleton.prototype.sortPathConstraintAttachmentWith = function (attachment, slotBone) {
                if (!(attachment instanceof core.PathAttachment))
                    return;
                var pathBones = attachment.bones;
                if (pathBones == null)
                    this.sortBone(slotBone);
                else {
                    var bones = this.bones;
                    var i = 0;
                    while (i < pathBones.length) {
                        var boneCount = pathBones[i++];
                        for (var n = i + boneCount; i < n; i++) {
                            var boneIndex = pathBones[i];
                            this.sortBone(bones[boneIndex]);
                        }
                    }
                }
            };
            Skeleton.prototype.sortBone = function (bone) {
                if (bone.sorted)
                    return;
                var parent = bone.parent;
                if (parent != null)
                    this.sortBone(parent);
                bone.sorted = true;
                this._updateCache.push(bone);
            };
            Skeleton.prototype.sortReset = function (bones) {
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.sorted)
                        this.sortReset(bone.children);
                    bone.sorted = false;
                }
            };
            Skeleton.prototype.updateWorldTransform = function () {
                var updateCacheReset = this.updateCacheReset;
                for (var i = 0, n = updateCacheReset.length; i < n; i++) {
                    var bone = updateCacheReset[i];
                    bone.ax = bone.x;
                    bone.ay = bone.y;
                    bone.arotation = bone.rotation;
                    bone.ascaleX = bone.scaleX;
                    bone.ascaleY = bone.scaleY;
                    bone.ashearX = bone.shearX;
                    bone.ashearY = bone.shearY;
                    bone.appliedValid = true;
                }
                var updateCache = this._updateCache;
                for (var i = 0, n = updateCache.length; i < n; i++)
                    updateCache[i].update();
            };
            Skeleton.prototype.setToSetupPose = function () {
                this.setBonesToSetupPose();
                this.setSlotsToSetupPose();
            };
            Skeleton.prototype.setBonesToSetupPose = function () {
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    bones[i].setToSetupPose();
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    constraint.bendDirection = constraint.data.bendDirection;
                    constraint.mix = constraint.data.mix;
                }
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    var data = constraint.data;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                    constraint.scaleMix = data.scaleMix;
                    constraint.shearMix = data.shearMix;
                }
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    var data = constraint.data;
                    constraint.position = data.position;
                    constraint.spacing = data.spacing;
                    constraint.rotateMix = data.rotateMix;
                    constraint.translateMix = data.translateMix;
                }
            };
            Skeleton.prototype.setSlotsToSetupPose = function () {
                var slots = this.slots;
                core.Utils.arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
                for (var i = 0, n = slots.length; i < n; i++)
                    slots[i].setToSetupPose();
            };
            Skeleton.prototype.getRootBone = function () {
                if (this.bones.length == 0)
                    return null;
                return this.bones[0];
            };
            Skeleton.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.data.name == boneName)
                        return bone;
                }
                return null;
            };
            Skeleton.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].data.name == boneName)
                        return i;
                return -1;
            };
            Skeleton.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName)
                        return slot;
                }
                return null;
            };
            Skeleton.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].data.name == slotName)
                        return i;
                return -1;
            };
            Skeleton.prototype.setSkinByName = function (skinName) {
                var skin = this.data.findSkin(skinName);
                if (skin == null)
                    throw new Error("Skin not found: " + skinName);
                this.setSkin(skin);
            };
            Skeleton.prototype.setSkin = function (newSkin) {
                if (newSkin != null) {
                    if (this.skin != null)
                        newSkin.attachAll(this, this.skin);
                    else {
                        var slots = this.slots;
                        for (var i = 0, n = slots.length; i < n; i++) {
                            var slot = slots[i];
                            var name_1 = slot.data.attachmentName;
                            if (name_1 != null) {
                                var attachment = newSkin.getAttachment(i, name_1);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                            }
                        }
                    }
                }
                this.skin = newSkin;
            };
            Skeleton.prototype.getAttachmentByName = function (slotName, attachmentName) {
                return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
            };
            Skeleton.prototype.getAttachment = function (slotIndex, attachmentName) {
                if (attachmentName == null)
                    throw new Error("attachmentName cannot be null.");
                if (this.skin != null) {
                    var attachment = this.skin.getAttachment(slotIndex, attachmentName);
                    if (attachment != null)
                        return attachment;
                }
                if (this.data.defaultSkin != null)
                    return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
                return null;
            };
            Skeleton.prototype.setAttachment = function (slotName, attachmentName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.data.name == slotName) {
                        var attachment = null;
                        if (attachmentName != null) {
                            attachment = this.getAttachment(i, attachmentName);
                            if (attachment == null)
                                throw new Error("Attachment not found: " + attachmentName + ", for slot: " + slotName);
                        }
                        slot.setAttachment(attachment);
                        return;
                    }
                }
                throw new Error("Slot not found: " + slotName);
            };
            Skeleton.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var ikConstraint = ikConstraints[i];
                    if (ikConstraint.data.name == constraintName)
                        return ikConstraint;
                }
                return null;
            };
            Skeleton.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.data.name == constraintName)
                        return constraint;
                }
                return null;
            };
            Skeleton.prototype.getBounds = function (offset, size, temp) {
                if (offset == null)
                    throw new Error("offset cannot be null.");
                if (size == null)
                    throw new Error("size cannot be null.");
                var drawOrder = this.drawOrder;
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                for (var i = 0, n = drawOrder.length; i < n; i++) {
                    var slot = drawOrder[i];
                    var verticesLength = 0;
                    var vertices = null;
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.RegionAttachment) {
                        verticesLength = 8;
                        vertices = core.Utils.setArraySize(temp, verticesLength, 0);
                        attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
                    }
                    else if (attachment instanceof core.MeshAttachment) {
                        var mesh = attachment;
                        verticesLength = mesh.worldVerticesLength;
                        vertices = core.Utils.setArraySize(temp, verticesLength, 0);
                        mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
                    }
                    if (vertices != null) {
                        for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
                            var x = vertices[ii], y = vertices[ii + 1];
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }
                offset.set(minX, minY);
                size.set(maxX - minX, maxY - minY);
            };
            Skeleton.prototype.update = function (delta) {
                this.time += delta;
            };
            return Skeleton;
        }());
        core.Skeleton = Skeleton;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonBounds = (function () {
            function SkeletonBounds() {
                this.minX = 0;
                this.minY = 0;
                this.maxX = 0;
                this.maxY = 0;
                this.boundingBoxes = new Array();
                this.polygons = new Array();
                this.polygonPool = new core.Pool(function () {
                    return core.Utils.newFloatArray(16);
                });
            }
            SkeletonBounds.prototype.update = function (skeleton, updateAabb) {
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                var boundingBoxes = this.boundingBoxes;
                var polygons = this.polygons;
                var polygonPool = this.polygonPool;
                var slots = skeleton.slots;
                var slotCount = slots.length;
                boundingBoxes.length = 0;
                polygonPool.freeAll(polygons);
                polygons.length = 0;
                for (var i = 0; i < slotCount; i++) {
                    var slot = slots[i];
                    var attachment = slot.getAttachment();
                    if (attachment instanceof core.BoundingBoxAttachment) {
                        var boundingBox = attachment;
                        boundingBoxes.push(boundingBox);
                        var polygon = polygonPool.obtain();
                        if (polygon.length != boundingBox.worldVerticesLength) {
                            polygon = core.Utils.newFloatArray(boundingBox.worldVerticesLength);
                        }
                        polygons.push(polygon);
                        boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
                    }
                }
                if (updateAabb) {
                    this.aabbCompute();
                }
                else {
                    this.minX = Number.POSITIVE_INFINITY;
                    this.minY = Number.POSITIVE_INFINITY;
                    this.maxX = Number.NEGATIVE_INFINITY;
                    this.maxY = Number.NEGATIVE_INFINITY;
                }
            };
            SkeletonBounds.prototype.aabbCompute = function () {
                var minX = Number.POSITIVE_INFINITY, minY = Number.POSITIVE_INFINITY, maxX = Number.NEGATIVE_INFINITY, maxY = Number.NEGATIVE_INFINITY;
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++) {
                    var polygon = polygons[i];
                    var vertices = polygon;
                    for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
                        var x = vertices[ii];
                        var y = vertices[ii + 1];
                        minX = Math.min(minX, x);
                        minY = Math.min(minY, y);
                        maxX = Math.max(maxX, x);
                        maxY = Math.max(maxY, y);
                    }
                }
                this.minX = minX;
                this.minY = minY;
                this.maxX = maxX;
                this.maxY = maxY;
            };
            SkeletonBounds.prototype.aabbContainsPoint = function (x, y) {
                return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
            };
            SkeletonBounds.prototype.aabbIntersectsSegment = function (x1, y1, x2, y2) {
                var minX = this.minX;
                var minY = this.minY;
                var maxX = this.maxX;
                var maxY = this.maxY;
                if ((x1 <= minX && x2 <= minX) || (y1 <= minY && y2 <= minY) || (x1 >= maxX && x2 >= maxX) || (y1 >= maxY && y2 >= maxY))
                    return false;
                var m = (y2 - y1) / (x2 - x1);
                var y = m * (minX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                y = m * (maxX - x1) + y1;
                if (y > minY && y < maxY)
                    return true;
                var x = (minY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                x = (maxY - y1) / m + x1;
                if (x > minX && x < maxX)
                    return true;
                return false;
            };
            SkeletonBounds.prototype.aabbIntersectsSkeleton = function (bounds) {
                return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
            };
            SkeletonBounds.prototype.containsPoint = function (x, y) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.containsPointPolygon(polygons[i], x, y))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.containsPointPolygon = function (polygon, x, y) {
                var vertices = polygon;
                var nn = polygon.length;
                var prevIndex = nn - 2;
                var inside = false;
                for (var ii = 0; ii < nn; ii += 2) {
                    var vertexY = vertices[ii + 1];
                    var prevY = vertices[prevIndex + 1];
                    if ((vertexY < y && prevY >= y) || (prevY < y && vertexY >= y)) {
                        var vertexX = vertices[ii];
                        if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x)
                            inside = !inside;
                    }
                    prevIndex = ii;
                }
                return inside;
            };
            SkeletonBounds.prototype.intersectsSegment = function (x1, y1, x2, y2) {
                var polygons = this.polygons;
                for (var i = 0, n = polygons.length; i < n; i++)
                    if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2))
                        return this.boundingBoxes[i];
                return null;
            };
            SkeletonBounds.prototype.intersectsSegmentPolygon = function (polygon, x1, y1, x2, y2) {
                var vertices = polygon;
                var nn = polygon.length;
                var width12 = x1 - x2, height12 = y1 - y2;
                var det1 = x1 * y2 - y1 * x2;
                var x3 = vertices[nn - 2], y3 = vertices[nn - 1];
                for (var ii = 0; ii < nn; ii += 2) {
                    var x4 = vertices[ii], y4 = vertices[ii + 1];
                    var det2 = x3 * y4 - y3 * x4;
                    var width34 = x3 - x4, height34 = y3 - y4;
                    var det3 = width12 * height34 - height12 * width34;
                    var x = (det1 * width34 - width12 * det2) / det3;
                    if (((x >= x3 && x <= x4) || (x >= x4 && x <= x3)) && ((x >= x1 && x <= x2) || (x >= x2 && x <= x1))) {
                        var y = (det1 * height34 - height12 * det2) / det3;
                        if (((y >= y3 && y <= y4) || (y >= y4 && y <= y3)) && ((y >= y1 && y <= y2) || (y >= y2 && y <= y1)))
                            return true;
                    }
                    x3 = x4;
                    y3 = y4;
                }
                return false;
            };
            SkeletonBounds.prototype.getPolygon = function (boundingBox) {
                if (boundingBox == null)
                    throw new Error("boundingBox cannot be null.");
                var index = this.boundingBoxes.indexOf(boundingBox);
                return index == -1 ? null : this.polygons[index];
            };
            SkeletonBounds.prototype.getWidth = function () {
                return this.maxX - this.minX;
            };
            SkeletonBounds.prototype.getHeight = function () {
                return this.maxY - this.minY;
            };
            return SkeletonBounds;
        }());
        core.SkeletonBounds = SkeletonBounds;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonClipping = (function () {
            function SkeletonClipping() {
                this.triangulator = new core.Triangulator();
                this.clippingPolygon = new Array();
                this.clipOutput = new Array();
                this.clippedVertices = new Array();
                this.clippedTriangles = new Array();
                this.scratch = new Array();
            }
            SkeletonClipping.prototype.clipStart = function (slot, clip) {
                if (this.clipAttachment != null)
                    return 0;
                this.clipAttachment = clip;
                var n = clip.worldVerticesLength;
                var vertices = core.Utils.setArraySize(this.clippingPolygon, n);
                clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
                var clippingPolygon = this.clippingPolygon;
                SkeletonClipping.makeClockwise(clippingPolygon);
                var clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));
                for (var i = 0, n_1 = clippingPolygons.length; i < n_1; i++) {
                    var polygon = clippingPolygons[i];
                    SkeletonClipping.makeClockwise(polygon);
                    polygon.push(polygon[0]);
                    polygon.push(polygon[1]);
                }
                return clippingPolygons.length;
            };
            SkeletonClipping.prototype.clipEndWithSlot = function (slot) {
                if (this.clipAttachment != null && this.clipAttachment.endSlot == slot.data)
                    this.clipEnd();
            };
            SkeletonClipping.prototype.clipEnd = function () {
                if (this.clipAttachment == null)
                    return;
                this.clipAttachment = null;
                this.clippingPolygons = null;
                this.clippedVertices.length = 0;
                this.clippedTriangles.length = 0;
                this.clippingPolygon.length = 0;
            };
            SkeletonClipping.prototype.isClipping = function () {
                return this.clipAttachment != null;
            };
            SkeletonClipping.prototype.clipTriangles = function (vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor) {
                var clipOutput = this.clipOutput, clippedVertices = this.clippedVertices;
                var clippedTriangles = this.clippedTriangles;
                var polygons = this.clippingPolygons;
                var polygonsCount = this.clippingPolygons.length;
                var vertexSize = twoColor ? 12 : 8;
                var index = 0;
                clippedVertices.length = 0;
                clippedTriangles.length = 0;
                outer: for (var i = 0; i < trianglesLength; i += 3) {
                    var vertexOffset = triangles[i] << 1;
                    var x1 = vertices[vertexOffset], y1 = vertices[vertexOffset + 1];
                    var u1 = uvs[vertexOffset], v1 = uvs[vertexOffset + 1];
                    vertexOffset = triangles[i + 1] << 1;
                    var x2 = vertices[vertexOffset], y2 = vertices[vertexOffset + 1];
                    var u2 = uvs[vertexOffset], v2 = uvs[vertexOffset + 1];
                    vertexOffset = triangles[i + 2] << 1;
                    var x3 = vertices[vertexOffset], y3 = vertices[vertexOffset + 1];
                    var u3 = uvs[vertexOffset], v3 = uvs[vertexOffset + 1];
                    for (var p = 0; p < polygonsCount; p++) {
                        var s = clippedVertices.length;
                        if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
                            var clipOutputLength = clipOutput.length;
                            if (clipOutputLength == 0)
                                continue;
                            var d0 = y2 - y3, d1 = x3 - x2, d2 = x1 - x3, d4 = y3 - y1;
                            var d = 1 / (d0 * d2 + d1 * (y1 - y3));
                            var clipOutputCount = clipOutputLength >> 1;
                            var clipOutputItems = this.clipOutput;
                            var clippedVerticesItems = core.Utils.setArraySize(clippedVertices, s + clipOutputCount * vertexSize);
                            for (var ii = 0; ii < clipOutputLength; ii += 2) {
                                var x = clipOutputItems[ii], y = clipOutputItems[ii + 1];
                                clippedVerticesItems[s] = x;
                                clippedVerticesItems[s + 1] = y;
                                clippedVerticesItems[s + 2] = light.r;
                                clippedVerticesItems[s + 3] = light.g;
                                clippedVerticesItems[s + 4] = light.b;
                                clippedVerticesItems[s + 5] = light.a;
                                var c0 = x - x3, c1 = y - y3;
                                var a = (d0 * c0 + d1 * c1) * d;
                                var b = (d4 * c0 + d2 * c1) * d;
                                var c = 1 - a - b;
                                clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                                clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;
                                if (twoColor) {
                                    clippedVerticesItems[s + 8] = dark.r;
                                    clippedVerticesItems[s + 9] = dark.g;
                                    clippedVerticesItems[s + 10] = dark.b;
                                    clippedVerticesItems[s + 11] = dark.a;
                                }
                                s += vertexSize;
                            }
                            s = clippedTriangles.length;
                            var clippedTrianglesItems = core.Utils.setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
                            clipOutputCount--;
                            for (var ii = 1; ii < clipOutputCount; ii++) {
                                clippedTrianglesItems[s] = index;
                                clippedTrianglesItems[s + 1] = (index + ii);
                                clippedTrianglesItems[s + 2] = (index + ii + 1);
                                s += 3;
                            }
                            index += clipOutputCount + 1;
                        }
                        else {
                            var clippedVerticesItems = core.Utils.setArraySize(clippedVertices, s + 3 * vertexSize);
                            clippedVerticesItems[s] = x1;
                            clippedVerticesItems[s + 1] = y1;
                            clippedVerticesItems[s + 2] = light.r;
                            clippedVerticesItems[s + 3] = light.g;
                            clippedVerticesItems[s + 4] = light.b;
                            clippedVerticesItems[s + 5] = light.a;
                            if (!twoColor) {
                                clippedVerticesItems[s + 6] = u1;
                                clippedVerticesItems[s + 7] = v1;
                                clippedVerticesItems[s + 8] = x2;
                                clippedVerticesItems[s + 9] = y2;
                                clippedVerticesItems[s + 10] = light.r;
                                clippedVerticesItems[s + 11] = light.g;
                                clippedVerticesItems[s + 12] = light.b;
                                clippedVerticesItems[s + 13] = light.a;
                                clippedVerticesItems[s + 14] = u2;
                                clippedVerticesItems[s + 15] = v2;
                                clippedVerticesItems[s + 16] = x3;
                                clippedVerticesItems[s + 17] = y3;
                                clippedVerticesItems[s + 18] = light.r;
                                clippedVerticesItems[s + 19] = light.g;
                                clippedVerticesItems[s + 20] = light.b;
                                clippedVerticesItems[s + 21] = light.a;
                                clippedVerticesItems[s + 22] = u3;
                                clippedVerticesItems[s + 23] = v3;
                            }
                            else {
                                clippedVerticesItems[s + 6] = u1;
                                clippedVerticesItems[s + 7] = v1;
                                clippedVerticesItems[s + 8] = dark.r;
                                clippedVerticesItems[s + 9] = dark.g;
                                clippedVerticesItems[s + 10] = dark.b;
                                clippedVerticesItems[s + 11] = dark.a;
                                clippedVerticesItems[s + 12] = x2;
                                clippedVerticesItems[s + 13] = y2;
                                clippedVerticesItems[s + 14] = light.r;
                                clippedVerticesItems[s + 15] = light.g;
                                clippedVerticesItems[s + 16] = light.b;
                                clippedVerticesItems[s + 17] = light.a;
                                clippedVerticesItems[s + 18] = u2;
                                clippedVerticesItems[s + 19] = v2;
                                clippedVerticesItems[s + 20] = dark.r;
                                clippedVerticesItems[s + 21] = dark.g;
                                clippedVerticesItems[s + 22] = dark.b;
                                clippedVerticesItems[s + 23] = dark.a;
                                clippedVerticesItems[s + 24] = x3;
                                clippedVerticesItems[s + 25] = y3;
                                clippedVerticesItems[s + 26] = light.r;
                                clippedVerticesItems[s + 27] = light.g;
                                clippedVerticesItems[s + 28] = light.b;
                                clippedVerticesItems[s + 29] = light.a;
                                clippedVerticesItems[s + 30] = u3;
                                clippedVerticesItems[s + 31] = v3;
                                clippedVerticesItems[s + 32] = dark.r;
                                clippedVerticesItems[s + 33] = dark.g;
                                clippedVerticesItems[s + 34] = dark.b;
                                clippedVerticesItems[s + 35] = dark.a;
                            }
                            s = clippedTriangles.length;
                            var clippedTrianglesItems = core.Utils.setArraySize(clippedTriangles, s + 3);
                            clippedTrianglesItems[s] = index;
                            clippedTrianglesItems[s + 1] = (index + 1);
                            clippedTrianglesItems[s + 2] = (index + 2);
                            index += 3;
                            continue outer;
                        }
                    }
                }
            };
            SkeletonClipping.prototype.clip = function (x1, y1, x2, y2, x3, y3, clippingArea, output) {
                var originalOutput = output;
                var clipped = false;
                var input = null;
                if (clippingArea.length % 4 >= 2) {
                    input = output;
                    output = this.scratch;
                }
                else
                    input = this.scratch;
                input.length = 0;
                input.push(x1);
                input.push(y1);
                input.push(x2);
                input.push(y2);
                input.push(x3);
                input.push(y3);
                input.push(x1);
                input.push(y1);
                output.length = 0;
                var clippingVertices = clippingArea;
                var clippingVerticesLast = clippingArea.length - 4;
                for (var i = 0;; i += 2) {
                    var edgeX = clippingVertices[i], edgeY = clippingVertices[i + 1];
                    var edgeX2 = clippingVertices[i + 2], edgeY2 = clippingVertices[i + 3];
                    var deltaX = edgeX - edgeX2, deltaY = edgeY - edgeY2;
                    var inputVertices = input;
                    var inputVerticesLength = input.length - 2, outputStart = output.length;
                    for (var ii = 0; ii < inputVerticesLength; ii += 2) {
                        var inputX = inputVertices[ii], inputY = inputVertices[ii + 1];
                        var inputX2 = inputVertices[ii + 2], inputY2 = inputVertices[ii + 3];
                        var side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;
                        if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
                            if (side2) {
                                output.push(inputX2);
                                output.push(inputY2);
                                continue;
                            }
                            var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                        }
                        else if (side2) {
                            var c0 = inputY2 - inputY, c2 = inputX2 - inputX;
                            var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
                            output.push(edgeX + (edgeX2 - edgeX) * ua);
                            output.push(edgeY + (edgeY2 - edgeY) * ua);
                            output.push(inputX2);
                            output.push(inputY2);
                        }
                        clipped = true;
                    }
                    if (outputStart == output.length) {
                        originalOutput.length = 0;
                        return true;
                    }
                    output.push(output[0]);
                    output.push(output[1]);
                    if (i == clippingVerticesLast)
                        break;
                    var temp = output;
                    output = input;
                    output.length = 0;
                    input = temp;
                }
                if (originalOutput != output) {
                    originalOutput.length = 0;
                    for (var i = 0, n = output.length - 2; i < n; i++)
                        originalOutput[i] = output[i];
                }
                else
                    originalOutput.length = originalOutput.length - 2;
                return clipped;
            };
            SkeletonClipping.makeClockwise = function (polygon) {
                var vertices = polygon;
                var verticeslength = polygon.length;
                var area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1], p1x = 0, p1y = 0, p2x = 0, p2y = 0;
                for (var i = 0, n = verticeslength - 3; i < n; i += 2) {
                    p1x = vertices[i];
                    p1y = vertices[i + 1];
                    p2x = vertices[i + 2];
                    p2y = vertices[i + 3];
                    area += p1x * p2y - p2x * p1y;
                }
                if (area < 0)
                    return;
                for (var i = 0, lastX = verticeslength - 2, n = verticeslength >> 1; i < n; i += 2) {
                    var x = vertices[i], y = vertices[i + 1];
                    var other = lastX - i;
                    vertices[i] = vertices[other];
                    vertices[i + 1] = vertices[other + 1];
                    vertices[other] = x;
                    vertices[other + 1] = y;
                }
            };
            return SkeletonClipping;
        }());
        core.SkeletonClipping = SkeletonClipping;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonData = (function () {
            function SkeletonData() {
                this.bones = new Array();
                this.slots = new Array();
                this.skins = new Array();
                this.events = new Array();
                this.animations = new Array();
                this.ikConstraints = new Array();
                this.transformConstraints = new Array();
                this.pathConstraints = new Array();
                this.fps = 0;
            }
            SkeletonData.prototype.findBone = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (bone.name == boneName)
                        return bone;
                }
                return null;
            };
            SkeletonData.prototype.findBoneIndex = function (boneName) {
                if (boneName == null)
                    throw new Error("boneName cannot be null.");
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++)
                    if (bones[i].name == boneName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSlot = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++) {
                    var slot = slots[i];
                    if (slot.name == slotName)
                        return slot;
                }
                return null;
            };
            SkeletonData.prototype.findSlotIndex = function (slotName) {
                if (slotName == null)
                    throw new Error("slotName cannot be null.");
                var slots = this.slots;
                for (var i = 0, n = slots.length; i < n; i++)
                    if (slots[i].name == slotName)
                        return i;
                return -1;
            };
            SkeletonData.prototype.findSkin = function (skinName) {
                if (skinName == null)
                    throw new Error("skinName cannot be null.");
                var skins = this.skins;
                for (var i = 0, n = skins.length; i < n; i++) {
                    var skin = skins[i];
                    if (skin.name == skinName)
                        return skin;
                }
                return null;
            };
            SkeletonData.prototype.findEvent = function (eventDataName) {
                if (eventDataName == null)
                    throw new Error("eventDataName cannot be null.");
                var events = this.events;
                for (var i = 0, n = events.length; i < n; i++) {
                    var event_4 = events[i];
                    if (event_4.name == eventDataName)
                        return event_4;
                }
                return null;
            };
            SkeletonData.prototype.findAnimation = function (animationName) {
                if (animationName == null)
                    throw new Error("animationName cannot be null.");
                var animations = this.animations;
                for (var i = 0, n = animations.length; i < n; i++) {
                    var animation = animations[i];
                    if (animation.name == animationName)
                        return animation;
                }
                return null;
            };
            SkeletonData.prototype.findIkConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var ikConstraints = this.ikConstraints;
                for (var i = 0, n = ikConstraints.length; i < n; i++) {
                    var constraint = ikConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findTransformConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var transformConstraints = this.transformConstraints;
                for (var i = 0, n = transformConstraints.length; i < n; i++) {
                    var constraint = transformConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraint = function (constraintName) {
                if (constraintName == null)
                    throw new Error("constraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++) {
                    var constraint = pathConstraints[i];
                    if (constraint.name == constraintName)
                        return constraint;
                }
                return null;
            };
            SkeletonData.prototype.findPathConstraintIndex = function (pathConstraintName) {
                if (pathConstraintName == null)
                    throw new Error("pathConstraintName cannot be null.");
                var pathConstraints = this.pathConstraints;
                for (var i = 0, n = pathConstraints.length; i < n; i++)
                    if (pathConstraints[i].name == pathConstraintName)
                        return i;
                return -1;
            };
            return SkeletonData;
        }());
        core.SkeletonData = SkeletonData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SkeletonJson = (function () {
            function SkeletonJson(attachmentLoader) {
                this.scale = 1;
                this.linkedMeshes = new Array();
                this.attachmentLoader = attachmentLoader;
            }
            SkeletonJson.prototype.readSkeletonData = function (json) {
                var scale = this.scale;
                var skeletonData = new core.SkeletonData();
                var root = typeof (json) === "string" ? JSON.parse(json) : json;
                var skeletonMap = root.skeleton;
                if (skeletonMap != null) {
                    skeletonData.hash = skeletonMap.hash;
                    skeletonData.version = skeletonMap.spine;
                    skeletonData.width = skeletonMap.width;
                    skeletonData.height = skeletonMap.height;
                    skeletonData.fps = skeletonMap.fps;
                    skeletonData.imagesPath = skeletonMap.images;
                }
                if (root.bones) {
                    for (var i = 0; i < root.bones.length; i++) {
                        var boneMap = root.bones[i];
                        var parent_2 = null;
                        var parentName = this.getValue(boneMap, "parent", null);
                        if (parentName != null) {
                            parent_2 = skeletonData.findBone(parentName);
                            if (parent_2 == null)
                                throw new Error("Parent bone not found: " + parentName);
                        }
                        var data = new core.BoneData(skeletonData.bones.length, boneMap.name, parent_2);
                        data.length = this.getValue(boneMap, "length", 0) * scale;
                        data.x = this.getValue(boneMap, "x", 0) * scale;
                        data.y = this.getValue(boneMap, "y", 0) * scale;
                        data.rotation = this.getValue(boneMap, "rotation", 0);
                        data.scaleX = this.getValue(boneMap, "scaleX", 1);
                        data.scaleY = this.getValue(boneMap, "scaleY", 1);
                        data.shearX = this.getValue(boneMap, "shearX", 0);
                        data.shearY = this.getValue(boneMap, "shearY", 0);
                        data.transformMode = SkeletonJson.transformModeFromString(this.getValue(boneMap, "transform", "normal"));
                        skeletonData.bones.push(data);
                    }
                }
                if (root.slots) {
                    for (var i = 0; i < root.slots.length; i++) {
                        var slotMap = root.slots[i];
                        var slotName = slotMap.name;
                        var boneName = slotMap.bone;
                        var boneData = skeletonData.findBone(boneName);
                        if (boneData == null)
                            throw new Error("Slot bone not found: " + boneName);
                        var data = new core.SlotData(skeletonData.slots.length, slotName, boneData);
                        var color = this.getValue(slotMap, "color", null);
                        if (color != null)
                            data.color.setFromString(color);
                        var dark = this.getValue(slotMap, "dark", null);
                        if (dark != null) {
                            data.darkColor = new core.Color(1, 1, 1, 1);
                            data.darkColor.setFromString(dark);
                        }
                        data.attachmentName = this.getValue(slotMap, "attachment", null);
                        data.blendMode = SkeletonJson.blendModeFromString(this.getValue(slotMap, "blend", "normal"));
                        skeletonData.slots.push(data);
                    }
                }
                if (root.ik) {
                    for (var i = 0; i < root.ik.length; i++) {
                        var constraintMap = root.ik[i];
                        var data = new core.IkConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("IK bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("IK target bone not found: " + targetName);
                        data.bendDirection = this.getValue(constraintMap, "bendPositive", true) ? 1 : -1;
                        data.mix = this.getValue(constraintMap, "mix", 1);
                        skeletonData.ikConstraints.push(data);
                    }
                }
                if (root.transform) {
                    for (var i = 0; i < root.transform.length; i++) {
                        var constraintMap = root.transform[i];
                        var data = new core.TransformConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findBone(targetName);
                        if (data.target == null)
                            throw new Error("Transform constraint target bone not found: " + targetName);
                        data.local = this.getValue(constraintMap, "local", false);
                        data.relative = this.getValue(constraintMap, "relative", false);
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.offsetX = this.getValue(constraintMap, "x", 0) * scale;
                        data.offsetY = this.getValue(constraintMap, "y", 0) * scale;
                        data.offsetScaleX = this.getValue(constraintMap, "scaleX", 0);
                        data.offsetScaleY = this.getValue(constraintMap, "scaleY", 0);
                        data.offsetShearY = this.getValue(constraintMap, "shearY", 0);
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        data.scaleMix = this.getValue(constraintMap, "scaleMix", 1);
                        data.shearMix = this.getValue(constraintMap, "shearMix", 1);
                        skeletonData.transformConstraints.push(data);
                    }
                }
                if (root.path) {
                    for (var i = 0; i < root.path.length; i++) {
                        var constraintMap = root.path[i];
                        var data = new core.PathConstraintData(constraintMap.name);
                        data.order = this.getValue(constraintMap, "order", 0);
                        for (var j = 0; j < constraintMap.bones.length; j++) {
                            var boneName = constraintMap.bones[j];
                            var bone = skeletonData.findBone(boneName);
                            if (bone == null)
                                throw new Error("Transform constraint bone not found: " + boneName);
                            data.bones.push(bone);
                        }
                        var targetName = constraintMap.target;
                        data.target = skeletonData.findSlot(targetName);
                        if (data.target == null)
                            throw new Error("Path target slot not found: " + targetName);
                        data.positionMode = SkeletonJson.positionModeFromString(this.getValue(constraintMap, "positionMode", "percent"));
                        data.spacingMode = SkeletonJson.spacingModeFromString(this.getValue(constraintMap, "spacingMode", "length"));
                        data.rotateMode = SkeletonJson.rotateModeFromString(this.getValue(constraintMap, "rotateMode", "tangent"));
                        data.offsetRotation = this.getValue(constraintMap, "rotation", 0);
                        data.position = this.getValue(constraintMap, "position", 0);
                        if (data.positionMode == core.PositionMode.Fixed)
                            data.position *= scale;
                        data.spacing = this.getValue(constraintMap, "spacing", 0);
                        if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                            data.spacing *= scale;
                        data.rotateMix = this.getValue(constraintMap, "rotateMix", 1);
                        data.translateMix = this.getValue(constraintMap, "translateMix", 1);
                        skeletonData.pathConstraints.push(data);
                    }
                }
                if (root.skins) {
                    for (var skinName in root.skins) {
                        var skinMap = root.skins[skinName];
                        var skin = new core.Skin(skinName);
                        for (var slotName in skinMap) {
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotName);
                            var slotMap = skinMap[slotName];
                            for (var entryName in slotMap) {
                                var attachment = this.readAttachment(slotMap[entryName], skin, slotIndex, entryName, skeletonData);
                                if (attachment != null)
                                    skin.addAttachment(slotIndex, entryName, attachment);
                            }
                        }
                        skeletonData.skins.push(skin);
                        if (skin.name == "default")
                            skeletonData.defaultSkin = skin;
                    }
                }
                for (var i = 0, n = this.linkedMeshes.length; i < n; i++) {
                    var linkedMesh = this.linkedMeshes[i];
                    var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
                    if (skin == null)
                        throw new Error("Skin not found: " + linkedMesh.skin);
                    var parent_3 = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
                    if (parent_3 == null)
                        throw new Error("Parent mesh not found: " + linkedMesh.parent);
                    linkedMesh.mesh.setParentMesh(parent_3);
                }
                this.linkedMeshes.length = 0;
                if (root.events) {
                    for (var eventName in root.events) {
                        var eventMap = root.events[eventName];
                        var data = new core.EventData(eventName);
                        data.intValue = this.getValue(eventMap, "int", 0);
                        data.floatValue = this.getValue(eventMap, "float", 0);
                        data.stringValue = this.getValue(eventMap, "string", "");
                        skeletonData.events.push(data);
                    }
                }
                if (root.animations) {
                    for (var animationName in root.animations) {
                        var animationMap = root.animations[animationName];
                        this.readAnimation(animationMap, animationName, skeletonData);
                    }
                }
                return skeletonData;
            };
            SkeletonJson.prototype.readAttachment = function (map, skin, slotIndex, name, skeletonData) {
                var scale = this.scale;
                name = this.getValue(map, "name", name);
                var type = this.getValue(map, "type", "region");
                switch (type) {
                    case "region": {
                        var path = this.getValue(map, "path", name);
                        var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
                        if (region == null)
                            return null;
                        region.path = path;
                        region.x = this.getValue(map, "x", 0) * scale;
                        region.y = this.getValue(map, "y", 0) * scale;
                        region.scaleX = this.getValue(map, "scaleX", 1);
                        region.scaleY = this.getValue(map, "scaleY", 1);
                        region.rotation = this.getValue(map, "rotation", 0);
                        region.width = map.width * scale;
                        region.height = map.height * scale;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            region.color.setFromString(color);
                        return region;
                    }
                    case "boundingbox": {
                        var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
                        if (box == null)
                            return null;
                        this.readVertices(map, box, map.vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            box.color.setFromString(color);
                        return box;
                    }
                    case "mesh":
                    case "linkedmesh": {
                        var path = this.getValue(map, "path", name);
                        var mesh = this.attachmentLoader.newMeshAttachment(skin, name, path);
                        if (mesh == null)
                            return null;
                        mesh.path = path;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            mesh.color.setFromString(color);
                        var parent_4 = this.getValue(map, "parent", null);
                        if (parent_4 != null) {
                            mesh.inheritDeform = this.getValue(map, "deform", true);
                            this.linkedMeshes.push(new LinkedMesh(mesh, this.getValue(map, "skin", null), slotIndex, parent_4));
                            return mesh;
                        }
                        var uvs = map.uvs;
                        this.readVertices(map, mesh, uvs.length);
                        mesh.triangles = map.triangles;
                        mesh.regionUVs = uvs;
                        mesh.hullLength = this.getValue(map, "hull", 0) * 2;
                        return mesh;
                    }
                    case "path": {
                        var path = this.attachmentLoader.newPathAttachment(skin, name);
                        if (path == null)
                            return null;
                        path.closed = this.getValue(map, "closed", false);
                        path.constantSpeed = this.getValue(map, "constantSpeed", true);
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, path, vertexCount << 1);
                        var lengths = core.Utils.newArray(vertexCount / 3, 0);
                        for (var i = 0; i < map.lengths.length; i++)
                            lengths[i] = map.lengths[i] * scale;
                        path.lengths = lengths;
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            path.color.setFromString(color);
                        return path;
                    }
                    case "point": {
                        var point = this.attachmentLoader.newPointAttachment(skin, name);
                        if (point == null)
                            return null;
                        point.x = this.getValue(map, "x", 0) * scale;
                        point.y = this.getValue(map, "y", 0) * scale;
                        point.rotation = this.getValue(map, "rotation", 0);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            point.color.setFromString(color);
                        return point;
                    }
                    case "clipping": {
                        var clip = this.attachmentLoader.newClippingAttachment(skin, name);
                        if (clip == null)
                            return null;
                        var end = this.getValue(map, "end", null);
                        if (end != null) {
                            var slot = skeletonData.findSlot(end);
                            if (slot == null)
                                throw new Error("Clipping end slot not found: " + end);
                            clip.endSlot = slot;
                        }
                        var vertexCount = map.vertexCount;
                        this.readVertices(map, clip, vertexCount << 1);
                        var color = this.getValue(map, "color", null);
                        if (color != null)
                            clip.color.setFromString(color);
                        return clip;
                    }
                }
                return null;
            };
            SkeletonJson.prototype.readVertices = function (map, attachment, verticesLength) {
                var scale = this.scale;
                attachment.worldVerticesLength = verticesLength;
                var vertices = map.vertices;
                if (verticesLength == vertices.length) {
                    var scaledVertices = core.Utils.toFloatArray(vertices);
                    if (scale != 1) {
                        for (var i = 0, n = vertices.length; i < n; i++)
                            scaledVertices[i] *= scale;
                    }
                    attachment.vertices = scaledVertices;
                    return;
                }
                var weights = new Array();
                var bones = new Array();
                for (var i = 0, n = vertices.length; i < n;) {
                    var boneCount = vertices[i++];
                    bones.push(boneCount);
                    for (var nn = i + boneCount * 4; i < nn; i += 4) {
                        bones.push(vertices[i]);
                        weights.push(vertices[i + 1] * scale);
                        weights.push(vertices[i + 2] * scale);
                        weights.push(vertices[i + 3]);
                    }
                }
                attachment.bones = bones;
                attachment.vertices = core.Utils.toFloatArray(weights);
            };
            SkeletonJson.prototype.readAnimation = function (map, name, skeletonData) {
                var scale = this.scale;
                var timelines = new Array();
                var duration = 0;
                if (map.slots) {
                    for (var slotName in map.slots) {
                        var slotMap = map.slots[slotName];
                        var slotIndex = skeletonData.findSlotIndex(slotName);
                        if (slotIndex == -1)
                            throw new Error("Slot not found: " + slotName);
                        for (var timelineName in slotMap) {
                            var timelineMap = slotMap[timelineName];
                            if (timelineName == "attachment") {
                                var timeline = new core.AttachmentTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex++, valueMap.time, valueMap.name);
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                            else if (timelineName == "color") {
                                var timeline = new core.ColorTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var color = new core.Color();
                                    color.setFromString(valueMap.color);
                                    timeline.setFrame(frameIndex, valueMap.time, color.r, color.g, color.b, color.a);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.ColorTimeline.ENTRIES]);
                            }
                            else if (timelineName == "twoColor") {
                                var timeline = new core.TwoColorTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var light = new core.Color();
                                    var dark = new core.Color();
                                    light.setFromString(valueMap.light);
                                    dark.setFromString(valueMap.dark);
                                    timeline.setFrame(frameIndex, valueMap.time, light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TwoColorTimeline.ENTRIES]);
                            }
                            else
                                throw new Error("Invalid timeline type for a slot: " + timelineName + " (" + slotName + ")");
                        }
                    }
                }
                if (map.bones) {
                    for (var boneName in map.bones) {
                        var boneMap = map.bones[boneName];
                        var boneIndex = skeletonData.findBoneIndex(boneName);
                        if (boneIndex == -1)
                            throw new Error("Bone not found: " + boneName);
                        for (var timelineName in boneMap) {
                            var timelineMap = boneMap[timelineName];
                            if (timelineName === "rotate") {
                                var timeline = new core.RotateTimeline(timelineMap.length);
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, valueMap.angle);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.RotateTimeline.ENTRIES]);
                            }
                            else if (timelineName === "translate" || timelineName === "scale" || timelineName === "shear") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "scale")
                                    timeline = new core.ScaleTimeline(timelineMap.length);
                                else if (timelineName === "shear")
                                    timeline = new core.ShearTimeline(timelineMap.length);
                                else {
                                    timeline = new core.TranslateTimeline(timelineMap.length);
                                    timelineScale = scale;
                                }
                                timeline.boneIndex = boneIndex;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    var x = this.getValue(valueMap, "x", 0), y = this.getValue(valueMap, "y", 0);
                                    timeline.setFrame(frameIndex, valueMap.time, x * timelineScale, y * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TranslateTimeline.ENTRIES]);
                            }
                            else
                                throw new Error("Invalid timeline type for a bone: " + timelineName + " (" + boneName + ")");
                        }
                    }
                }
                if (map.ik) {
                    for (var constraintName in map.ik) {
                        var constraintMap = map.ik[constraintName];
                        var constraint = skeletonData.findIkConstraint(constraintName);
                        var timeline = new core.IkConstraintTimeline(constraintMap.length);
                        timeline.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "mix", 1), this.getValue(valueMap, "bendPositive", true) ? 1 : -1);
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.IkConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.transform) {
                    for (var constraintName in map.transform) {
                        var constraintMap = map.transform[constraintName];
                        var constraint = skeletonData.findTransformConstraint(constraintName);
                        var timeline = new core.TransformConstraintTimeline(constraintMap.length);
                        timeline.transformConstraintIndex = skeletonData.transformConstraints.indexOf(constraint);
                        var frameIndex = 0;
                        for (var i = 0; i < constraintMap.length; i++) {
                            var valueMap = constraintMap[i];
                            timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1), this.getValue(valueMap, "scaleMix", 1), this.getValue(valueMap, "shearMix", 1));
                            this.readCurve(valueMap, timeline, frameIndex);
                            frameIndex++;
                        }
                        timelines.push(timeline);
                        duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.TransformConstraintTimeline.ENTRIES]);
                    }
                }
                if (map.paths) {
                    for (var constraintName in map.paths) {
                        var constraintMap = map.paths[constraintName];
                        var index = skeletonData.findPathConstraintIndex(constraintName);
                        if (index == -1)
                            throw new Error("Path constraint not found: " + constraintName);
                        var data = skeletonData.pathConstraints[index];
                        for (var timelineName in constraintMap) {
                            var timelineMap = constraintMap[timelineName];
                            if (timelineName === "position" || timelineName === "spacing") {
                                var timeline = null;
                                var timelineScale = 1;
                                if (timelineName === "spacing") {
                                    timeline = new core.PathConstraintSpacingTimeline(timelineMap.length);
                                    if (data.spacingMode == core.SpacingMode.Length || data.spacingMode == core.SpacingMode.Fixed)
                                        timelineScale = scale;
                                }
                                else {
                                    timeline = new core.PathConstraintPositionTimeline(timelineMap.length);
                                    if (data.positionMode == core.PositionMode.Fixed)
                                        timelineScale = scale;
                                }
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, timelineName, 0) * timelineScale);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintPositionTimeline.ENTRIES]);
                            }
                            else if (timelineName === "mix") {
                                var timeline = new core.PathConstraintMixTimeline(timelineMap.length);
                                timeline.pathConstraintIndex = index;
                                var frameIndex = 0;
                                for (var i = 0; i < timelineMap.length; i++) {
                                    var valueMap = timelineMap[i];
                                    timeline.setFrame(frameIndex, valueMap.time, this.getValue(valueMap, "rotateMix", 1), this.getValue(valueMap, "translateMix", 1));
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[(timeline.getFrameCount() - 1) * core.PathConstraintMixTimeline.ENTRIES]);
                            }
                        }
                    }
                }
                if (map.deform) {
                    for (var deformName in map.deform) {
                        var deformMap = map.deform[deformName];
                        var skin = skeletonData.findSkin(deformName);
                        if (skin == null)
                            throw new Error("Skin not found: " + deformName);
                        for (var slotName in deformMap) {
                            var slotMap = deformMap[slotName];
                            var slotIndex = skeletonData.findSlotIndex(slotName);
                            if (slotIndex == -1)
                                throw new Error("Slot not found: " + slotMap.name);
                            for (var timelineName in slotMap) {
                                var timelineMap = slotMap[timelineName];
                                var attachment = skin.getAttachment(slotIndex, timelineName);
                                if (attachment == null)
                                    throw new Error("Deform attachment not found: " + timelineMap.name);
                                var weighted = attachment.bones != null;
                                var vertices = attachment.vertices;
                                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                                var timeline = new core.DeformTimeline(timelineMap.length);
                                timeline.slotIndex = slotIndex;
                                timeline.attachment = attachment;
                                var frameIndex = 0;
                                for (var j = 0; j < timelineMap.length; j++) {
                                    var valueMap = timelineMap[j];
                                    var deform = void 0;
                                    var verticesValue = this.getValue(valueMap, "vertices", null);
                                    if (verticesValue == null)
                                        deform = weighted ? core.Utils.newFloatArray(deformLength) : vertices;
                                    else {
                                        deform = core.Utils.newFloatArray(deformLength);
                                        var start = this.getValue(valueMap, "offset", 0);
                                        core.Utils.arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                                        if (scale != 1) {
                                            for (var i = start, n = i + verticesValue.length; i < n; i++)
                                                deform[i] *= scale;
                                        }
                                        if (!weighted) {
                                            for (var i = 0; i < deformLength; i++)
                                                deform[i] += vertices[i];
                                        }
                                    }
                                    timeline.setFrame(frameIndex, valueMap.time, deform);
                                    this.readCurve(valueMap, timeline, frameIndex);
                                    frameIndex++;
                                }
                                timelines.push(timeline);
                                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                            }
                        }
                    }
                }
                var drawOrderNode = map.drawOrder;
                if (drawOrderNode == null)
                    drawOrderNode = map.draworder;
                if (drawOrderNode != null) {
                    var timeline = new core.DrawOrderTimeline(drawOrderNode.length);
                    var slotCount = skeletonData.slots.length;
                    var frameIndex = 0;
                    for (var j = 0; j < drawOrderNode.length; j++) {
                        var drawOrderMap = drawOrderNode[j];
                        var drawOrder = null;
                        var offsets = this.getValue(drawOrderMap, "offsets", null);
                        if (offsets != null) {
                            drawOrder = core.Utils.newArray(slotCount, -1);
                            var unchanged = core.Utils.newArray(slotCount - offsets.length, 0);
                            var originalIndex = 0, unchangedIndex = 0;
                            for (var i = 0; i < offsets.length; i++) {
                                var offsetMap = offsets[i];
                                var slotIndex = skeletonData.findSlotIndex(offsetMap.slot);
                                if (slotIndex == -1)
                                    throw new Error("Slot not found: " + offsetMap.slot);
                                while (originalIndex != slotIndex)
                                    unchanged[unchangedIndex++] = originalIndex++;
                                drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
                            }
                            while (originalIndex < slotCount)
                                unchanged[unchangedIndex++] = originalIndex++;
                            for (var i = slotCount - 1; i >= 0; i--)
                                if (drawOrder[i] == -1)
                                    drawOrder[i] = unchanged[--unchangedIndex];
                        }
                        timeline.setFrame(frameIndex++, drawOrderMap.time, drawOrder);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (map.events) {
                    var timeline = new core.EventTimeline(map.events.length);
                    var frameIndex = 0;
                    for (var i = 0; i < map.events.length; i++) {
                        var eventMap = map.events[i];
                        var eventData = skeletonData.findEvent(eventMap.name);
                        if (eventData == null)
                            throw new Error("Event not found: " + eventMap.name);
                        var event_5 = new core.Event(core.Utils.toSinglePrecision(eventMap.time), eventData);
                        event_5.intValue = this.getValue(eventMap, "int", eventData.intValue);
                        event_5.floatValue = this.getValue(eventMap, "float", eventData.floatValue);
                        event_5.stringValue = this.getValue(eventMap, "string", eventData.stringValue);
                        timeline.setFrame(frameIndex++, event_5);
                    }
                    timelines.push(timeline);
                    duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
                }
                if (isNaN(duration)) {
                    throw new Error("Error while parsing animation, duration is NaN");
                }
                skeletonData.animations.push(new core.Animation(name, timelines, duration));
            };
            SkeletonJson.prototype.readCurve = function (map, timeline, frameIndex) {
                if (!map.curve)
                    return;
                if (map.curve === "stepped")
                    timeline.setStepped(frameIndex);
                else if (Object.prototype.toString.call(map.curve) === '[object Array]') {
                    var curve = map.curve;
                    timeline.setCurve(frameIndex, curve[0], curve[1], curve[2], curve[3]);
                }
            };
            SkeletonJson.prototype.getValue = function (map, prop, defaultValue) {
                return map[prop] !== undefined ? map[prop] : defaultValue;
            };
            SkeletonJson.blendModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "normal")
                    return core.BlendMode.Normal;
                if (str == "additive")
                    return core.BlendMode.Additive;
                if (str == "multiply")
                    return core.BlendMode.Multiply;
                if (str == "screen")
                    return core.BlendMode.Screen;
                throw new Error("Unknown blend mode: " + str);
            };
            SkeletonJson.positionModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "fixed")
                    return core.PositionMode.Fixed;
                if (str == "percent")
                    return core.PositionMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.spacingModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "length")
                    return core.SpacingMode.Length;
                if (str == "fixed")
                    return core.SpacingMode.Fixed;
                if (str == "percent")
                    return core.SpacingMode.Percent;
                throw new Error("Unknown position mode: " + str);
            };
            SkeletonJson.rotateModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "tangent")
                    return core.RotateMode.Tangent;
                if (str == "chain")
                    return core.RotateMode.Chain;
                if (str == "chainscale")
                    return core.RotateMode.ChainScale;
                throw new Error("Unknown rotate mode: " + str);
            };
            SkeletonJson.transformModeFromString = function (str) {
                str = str.toLowerCase();
                if (str == "normal")
                    return core.TransformMode.Normal;
                if (str == "onlytranslation")
                    return core.TransformMode.OnlyTranslation;
                if (str == "norotationorreflection")
                    return core.TransformMode.NoRotationOrReflection;
                if (str == "noscale")
                    return core.TransformMode.NoScale;
                if (str == "noscaleorreflection")
                    return core.TransformMode.NoScaleOrReflection;
                throw new Error("Unknown transform mode: " + str);
            };
            return SkeletonJson;
        }());
        core.SkeletonJson = SkeletonJson;
        var LinkedMesh = (function () {
            function LinkedMesh(mesh, skin, slotIndex, parent) {
                this.mesh = mesh;
                this.skin = skin;
                this.slotIndex = slotIndex;
                this.parent = parent;
            }
            return LinkedMesh;
        }());
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Skin = (function () {
            function Skin(name) {
                this.attachments = new Array();
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            Skin.prototype.addAttachment = function (slotIndex, name, attachment) {
                if (attachment == null)
                    throw new Error("attachment cannot be null.");
                var attachments = this.attachments;
                if (slotIndex >= attachments.length)
                    attachments.length = slotIndex + 1;
                if (!attachments[slotIndex])
                    attachments[slotIndex] = {};
                attachments[slotIndex][name] = attachment;
            };
            Skin.prototype.getAttachment = function (slotIndex, name) {
                var dictionary = this.attachments[slotIndex];
                return dictionary ? dictionary[name] : null;
            };
            Skin.prototype.attachAll = function (skeleton, oldSkin) {
                var slotIndex = 0;
                for (var i = 0; i < skeleton.slots.length; i++) {
                    var slot = skeleton.slots[i];
                    var slotAttachment = slot.getAttachment();
                    if (slotAttachment && slotIndex < oldSkin.attachments.length) {
                        var dictionary = oldSkin.attachments[slotIndex];
                        for (var key in dictionary) {
                            var skinAttachment = dictionary[key];
                            if (slotAttachment == skinAttachment) {
                                var attachment = this.getAttachment(slotIndex, name);
                                if (attachment != null)
                                    slot.setAttachment(attachment);
                                break;
                            }
                        }
                    }
                    slotIndex++;
                }
            };
            return Skin;
        }());
        core.Skin = Skin;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Slot = (function () {
            function Slot(data, bone) {
                this.attachmentVertices = new Array();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (bone == null)
                    throw new Error("bone cannot be null.");
                this.data = data;
                this.bone = bone;
                this.color = new core.Color();
                this.darkColor = data.darkColor == null ? null : new core.Color();
                this.setToSetupPose();
                this.blendMode = this.data.blendMode;
            }
            Slot.prototype.getAttachment = function () {
                return this.attachment;
            };
            Slot.prototype.setAttachment = function (attachment) {
                if (this.attachment == attachment)
                    return;
                this.attachment = attachment;
                this.attachmentTime = this.bone.skeleton.time;
                this.attachmentVertices.length = 0;
            };
            Slot.prototype.setAttachmentTime = function (time) {
                this.attachmentTime = this.bone.skeleton.time - time;
            };
            Slot.prototype.getAttachmentTime = function () {
                return this.bone.skeleton.time - this.attachmentTime;
            };
            Slot.prototype.setToSetupPose = function () {
                this.color.setFromColor(this.data.color);
                if (this.darkColor != null)
                    this.darkColor.setFromColor(this.data.darkColor);
                if (this.data.attachmentName == null)
                    this.attachment = null;
                else {
                    this.attachment = null;
                    this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
                }
            };
            return Slot;
        }());
        core.Slot = Slot;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SlotData = (function () {
            function SlotData(index, name, boneData) {
                this.color = new core.Color(1, 1, 1, 1);
                if (index < 0)
                    throw new Error("index must be >= 0.");
                if (name == null)
                    throw new Error("name cannot be null.");
                if (boneData == null)
                    throw new Error("boneData cannot be null.");
                this.index = index;
                this.name = name;
                this.boneData = boneData;
            }
            return SlotData;
        }());
        core.SlotData = SlotData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Texture = (function () {
            function Texture(image) {
                this._image = image;
            }
            Texture.prototype.getImage = function () {
                return this._image;
            };
            Texture.filterFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "nearest": return TextureFilter.Nearest;
                    case "linear": return TextureFilter.Linear;
                    case "mipmap": return TextureFilter.MipMap;
                    case "mipmapnearestnearest": return TextureFilter.MipMapNearestNearest;
                    case "mipmaplinearnearest": return TextureFilter.MipMapLinearNearest;
                    case "mipmapnearestlinear": return TextureFilter.MipMapNearestLinear;
                    case "mipmaplinearlinear": return TextureFilter.MipMapLinearLinear;
                    default: throw new Error("Unknown texture filter " + text);
                }
            };
            Texture.wrapFromString = function (text) {
                switch (text.toLowerCase()) {
                    case "mirroredtepeat": return TextureWrap.MirroredRepeat;
                    case "clamptoedge": return TextureWrap.ClampToEdge;
                    case "repeat": return TextureWrap.Repeat;
                    default: throw new Error("Unknown texture wrap " + text);
                }
            };
            return Texture;
        }());
        core.Texture = Texture;
        var TextureFilter;
        (function (TextureFilter) {
            TextureFilter[TextureFilter["Nearest"] = 9728] = "Nearest";
            TextureFilter[TextureFilter["Linear"] = 9729] = "Linear";
            TextureFilter[TextureFilter["MipMap"] = 9987] = "MipMap";
            TextureFilter[TextureFilter["MipMapNearestNearest"] = 9984] = "MipMapNearestNearest";
            TextureFilter[TextureFilter["MipMapLinearNearest"] = 9985] = "MipMapLinearNearest";
            TextureFilter[TextureFilter["MipMapNearestLinear"] = 9986] = "MipMapNearestLinear";
            TextureFilter[TextureFilter["MipMapLinearLinear"] = 9987] = "MipMapLinearLinear";
        })(TextureFilter = core.TextureFilter || (core.TextureFilter = {}));
        var TextureWrap;
        (function (TextureWrap) {
            TextureWrap[TextureWrap["MirroredRepeat"] = 33648] = "MirroredRepeat";
            TextureWrap[TextureWrap["ClampToEdge"] = 33071] = "ClampToEdge";
            TextureWrap[TextureWrap["Repeat"] = 10497] = "Repeat";
        })(TextureWrap = core.TextureWrap || (core.TextureWrap = {}));
        var TextureRegion = (function () {
            function TextureRegion() {
                this.size = null;
            }
            Object.defineProperty(TextureRegion.prototype, "width", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.width;
                    }
                    if (tex.trim) {
                        return tex.trim.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "height", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        return tex.crop.height;
                    }
                    if (tex.trim) {
                        return tex.trim.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u", {
                get: function () {
                    return this.texture._uvs.x0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v", {
                get: function () {
                    return this.texture._uvs.y0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "u2", {
                get: function () {
                    return this.texture._uvs.x2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "v2", {
                get: function () {
                    return this.texture._uvs.y2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetX", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.x : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "offsetY", {
                get: function () {
                    console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on.");
                    return this.spineOffsetY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "pixiOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return tex.trim ? tex.trim.y : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "spineOffsetY", {
                get: function () {
                    var tex = this.texture;
                    return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalWidth", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.width;
                        }
                        return tex.crop.width;
                    }
                    return tex.orig.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "originalHeight", {
                get: function () {
                    var tex = this.texture;
                    if (PIXI.VERSION[0] == '3') {
                        if (tex.trim) {
                            return tex.trim.height;
                        }
                        return tex.crop.height;
                    }
                    return tex.orig.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "x", {
                get: function () {
                    return this.texture.frame.x;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "y", {
                get: function () {
                    return this.texture.frame.y;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TextureRegion.prototype, "rotate", {
                get: function () {
                    return this.texture.rotate !== 0;
                },
                enumerable: true,
                configurable: true
            });
            return TextureRegion;
        }());
        core.TextureRegion = TextureRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TextureAtlas = (function () {
            function TextureAtlas(atlasText, textureLoader, callback) {
                this.pages = new Array();
                this.regions = new Array();
                if (atlasText) {
                    this.addSpineAtlas(atlasText, textureLoader, callback);
                }
            }
            TextureAtlas.prototype.addTexture = function (name, texture) {
                var pages = this.pages;
                var page = null;
                for (var i = 0; i < pages.length; i++) {
                    if (pages[i].baseTexture === texture.baseTexture) {
                        page = pages[i];
                        break;
                    }
                }
                if (page === null) {
                    page = new TextureAtlasPage();
                    page.name = 'texturePage';
                    var baseTexture = texture.baseTexture;
                    page.width = baseTexture.realWidth;
                    page.height = baseTexture.realHeight;
                    page.baseTexture = baseTexture;
                    page.minFilter = page.magFilter = core.TextureFilter.Nearest;
                    page.uWrap = core.TextureWrap.ClampToEdge;
                    page.vWrap = core.TextureWrap.ClampToEdge;
                    pages.push(page);
                }
                var region = new TextureAtlasRegion();
                region.name = name;
                region.page = page;
                region.texture = texture;
                region.index = -1;
                this.regions.push(region);
                return region;
            };
            TextureAtlas.prototype.addTextureHash = function (textures, stripExtension) {
                for (var key in textures) {
                    if (textures.hasOwnProperty(key)) {
                        this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
                    }
                }
            };
            TextureAtlas.prototype.addSpineAtlas = function (atlasText, textureLoader, callback) {
                return this.load(atlasText, textureLoader, callback);
            };
            TextureAtlas.prototype.load = function (atlasText, textureLoader, callback) {
                var _this = this;
                if (textureLoader == null)
                    throw new Error("textureLoader cannot be null.");
                var reader = new TextureAtlasReader(atlasText);
                var tuple = new Array(4);
                var page = null;
                var iterateParser = function () {
                    while (true) {
                        var line = reader.readLine();
                        if (line == null) {
                            return callback && callback(_this);
                        }
                        line = line.trim();
                        if (line.length == 0)
                            page = null;
                        else if (!page) {
                            page = new TextureAtlasPage();
                            page.name = line;
                            if (reader.readTuple(tuple) == 2) {
                                page.width = parseInt(tuple[0]);
                                page.height = parseInt(tuple[1]);
                                reader.readTuple(tuple);
                            }
                            reader.readTuple(tuple);
                            page.minFilter = core.Texture.filterFromString(tuple[0]);
                            page.magFilter = core.Texture.filterFromString(tuple[1]);
                            var direction = reader.readValue();
                            page.uWrap = core.TextureWrap.ClampToEdge;
                            page.vWrap = core.TextureWrap.ClampToEdge;
                            if (direction == "x")
                                page.uWrap = core.TextureWrap.Repeat;
                            else if (direction == "y")
                                page.vWrap = core.TextureWrap.Repeat;
                            else if (direction == "xy")
                                page.uWrap = page.vWrap = core.TextureWrap.Repeat;
                            textureLoader(line, function (texture) {
                                page.baseTexture = texture;
                                if (!texture.hasLoaded) {
                                    texture.width = page.width;
                                    texture.height = page.height;
                                }
                                _this.pages.push(page);
                                page.setFilters();
                                if (!page.width || !page.height) {
                                    page.width = texture.realWidth;
                                    page.height = texture.realHeight;
                                    if (!page.width || !page.height) {
                                        console.log("ERROR spine atlas page " + page.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)");
                                    }
                                }
                                iterateParser();
                            });
                            _this.pages.push(page);
                            break;
                        }
                        else {
                            var region = new TextureAtlasRegion();
                            region.name = line;
                            region.page = page;
                            var rotate = reader.readValue() == "true" ? 6 : 0;
                            reader.readTuple(tuple);
                            var x = parseInt(tuple[0]);
                            var y = parseInt(tuple[1]);
                            reader.readTuple(tuple);
                            var width = parseInt(tuple[0]);
                            var height = parseInt(tuple[1]);
                            var resolution = page.baseTexture.resolution;
                            x /= resolution;
                            y /= resolution;
                            width /= resolution;
                            height /= resolution;
                            var frame = new PIXI.Rectangle(x, y, rotate ? height : width, rotate ? width : height);
                            if (reader.readTuple(tuple) == 4) {
                                if (reader.readTuple(tuple) == 4) {
                                    reader.readTuple(tuple);
                                }
                            }
                            var originalWidth = parseInt(tuple[0]) / resolution;
                            var originalHeight = parseInt(tuple[1]) / resolution;
                            reader.readTuple(tuple);
                            var offsetX = parseInt(tuple[0]) / resolution;
                            var offsetY = parseInt(tuple[1]) / resolution;
                            var orig = new PIXI.Rectangle(0, 0, originalWidth, originalHeight);
                            var trim = new PIXI.Rectangle(offsetX, originalHeight - height - offsetY, width, height);
                            if (PIXI.VERSION[0] != '3') {
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame, orig, trim, rotate);
                            }
                            else {
                                var frame2 = new PIXI.Rectangle(x, y, width, height);
                                var crop = frame2.clone();
                                trim.width = originalWidth;
                                trim.height = originalHeight;
                                region.texture = new PIXI.Texture(region.page.baseTexture, frame2, crop, trim, rotate);
                            }
                            region.index = parseInt(reader.readValue());
                            region.texture._updateUvs();
                            _this.regions.push(region);
                        }
                    }
                };
                iterateParser();
            };
            TextureAtlas.prototype.findRegion = function (name) {
                for (var i = 0; i < this.regions.length; i++) {
                    if (this.regions[i].name == name) {
                        return this.regions[i];
                    }
                }
                return null;
            };
            TextureAtlas.prototype.dispose = function () {
                for (var i = 0; i < this.pages.length; i++) {
                    this.pages[i].baseTexture.dispose();
                }
            };
            return TextureAtlas;
        }());
        core.TextureAtlas = TextureAtlas;
        var TextureAtlasReader = (function () {
            function TextureAtlasReader(text) {
                this.index = 0;
                this.lines = text.split(/\r\n|\r|\n/);
            }
            TextureAtlasReader.prototype.readLine = function () {
                if (this.index >= this.lines.length)
                    return null;
                return this.lines[this.index++];
            };
            TextureAtlasReader.prototype.readValue = function () {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                return line.substring(colon + 1).trim();
            };
            TextureAtlasReader.prototype.readTuple = function (tuple) {
                var line = this.readLine();
                var colon = line.indexOf(":");
                if (colon == -1)
                    throw new Error("Invalid line: " + line);
                var i = 0, lastMatch = colon + 1;
                for (; i < 3; i++) {
                    var comma = line.indexOf(",", lastMatch);
                    if (comma == -1)
                        break;
                    tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
                    lastMatch = comma + 1;
                }
                tuple[i] = line.substring(lastMatch).trim();
                return i + 1;
            };
            return TextureAtlasReader;
        }());
        var TextureAtlasPage = (function () {
            function TextureAtlasPage() {
            }
            TextureAtlasPage.prototype.setFilters = function () {
                var tex = this.baseTexture;
                var filter = this.minFilter;
                if (filter == core.TextureFilter.Linear) {
                    tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                }
                else if (this.minFilter == core.TextureFilter.Nearest) {
                    tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                }
                else {
                    tex.mipmap = true;
                    if (filter == core.TextureFilter.MipMapNearestNearest) {
                        tex.scaleMode = PIXI.SCALE_MODES.NEAREST;
                    }
                    else {
                        tex.scaleMode = PIXI.SCALE_MODES.LINEAR;
                    }
                }
            };
            return TextureAtlasPage;
        }());
        core.TextureAtlasPage = TextureAtlasPage;
        var TextureAtlasRegion = (function (_super) {
            __extends(TextureAtlasRegion, _super);
            function TextureAtlasRegion() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return TextureAtlasRegion;
        }(core.TextureRegion));
        core.TextureAtlasRegion = TextureAtlasRegion;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraint = (function () {
            function TransformConstraint(data, skeleton) {
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.temp = new core.Vector2();
                if (data == null)
                    throw new Error("data cannot be null.");
                if (skeleton == null)
                    throw new Error("skeleton cannot be null.");
                this.data = data;
                this.rotateMix = data.rotateMix;
                this.translateMix = data.translateMix;
                this.scaleMix = data.scaleMix;
                this.shearMix = data.shearMix;
                this.bones = new Array();
                for (var i = 0; i < data.bones.length; i++)
                    this.bones.push(skeleton.findBone(data.bones[i].name));
                this.target = skeleton.findBone(data.target.name);
            }
            TransformConstraint.prototype.apply = function () {
                this.update();
            };
            TransformConstraint.prototype.update = function () {
                if (this.data.local) {
                    if (this.data.relative)
                        this.applyRelativeLocal();
                    else
                        this.applyAbsoluteLocal();
                }
                else {
                    if (this.data.relative)
                        this.applyRelativeWorld();
                    else
                        this.applyAbsoluteWorld();
                }
            };
            TransformConstraint.prototype.applyAbsoluteWorld = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                var targetMat = target.matrix;
                var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
                var degRadReflect = ta * td - tb * tc > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                var offsetRotation = this.data.offsetRotation * degRadReflect;
                var offsetShearY = this.data.offsetShearY * degRadReflect;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;
                    var mat = bone.matrix;
                    if (rotateMix != 0) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                        var r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        var cos = Math.cos(r), sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                        modified = true;
                    }
                    if (translateMix != 0) {
                        var temp = this.temp;
                        target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                        mat.tx += (temp.x - mat.tx) * translateMix;
                        mat.ty += (temp.y - mat.ty) * translateMix;
                        modified = true;
                    }
                    if (scaleMix > 0) {
                        var s = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
                        var ts = Math.sqrt(ta * ta + tc * tc);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
                        mat.a *= s;
                        mat.b *= s;
                        s = Math.sqrt(mat.c * mat.c + mat.d * mat.d);
                        ts = Math.sqrt(tb * tb + td * td);
                        if (s > 0.00001)
                            s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
                        mat.c *= s;
                        mat.d *= s;
                        modified = true;
                    }
                    if (shearMix > 0) {
                        var b = mat.c, d = mat.d;
                        var by = Math.atan2(d, b);
                        var r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(mat.b, mat.a));
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r = by + (r + offsetShearY) * shearMix;
                        var s = Math.sqrt(b * b + d * d);
                        mat.c = Math.cos(r) * s;
                        mat.d = Math.sin(r) * s;
                        modified = true;
                    }
                    if (modified)
                        bone.appliedValid = false;
                }
            };
            TransformConstraint.prototype.applyRelativeWorld = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                var targetMat = target.matrix;
                var ta = targetMat.a, tb = targetMat.c, tc = targetMat.b, td = targetMat.d;
                var degRadReflect = ta * td - tb * tc > 0 ? core.MathUtils.degRad : -core.MathUtils.degRad;
                var offsetRotation = this.data.offsetRotation * degRadReflect, offsetShearY = this.data.offsetShearY * degRadReflect;
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    var modified = false;
                    var mat = bone.matrix;
                    if (rotateMix != 0) {
                        var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                        var r = Math.atan2(tc, ta) + offsetRotation;
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        r *= rotateMix;
                        var cos = Math.cos(r), sin = Math.sin(r);
                        mat.a = cos * a - sin * c;
                        mat.c = cos * b - sin * d;
                        mat.b = sin * a + cos * c;
                        mat.d = sin * b + cos * d;
                        modified = true;
                    }
                    if (translateMix != 0) {
                        var temp = this.temp;
                        target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
                        mat.tx += temp.x * translateMix;
                        mat.ty += temp.y * translateMix;
                        modified = true;
                    }
                    if (scaleMix > 0) {
                        var s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * scaleMix + 1;
                        mat.a *= s;
                        mat.b *= s;
                        s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * scaleMix + 1;
                        mat.c *= s;
                        mat.d *= s;
                        modified = true;
                    }
                    if (shearMix > 0) {
                        var r = Math.atan2(td, tb) - Math.atan2(tc, ta);
                        if (r > core.MathUtils.PI)
                            r -= core.MathUtils.PI2;
                        else if (r < -core.MathUtils.PI)
                            r += core.MathUtils.PI2;
                        var b = mat.c, d = mat.d;
                        r = Math.atan2(d, b) + (r - core.MathUtils.PI / 2 + offsetShearY) * shearMix;
                        var s = Math.sqrt(b * b + d * d);
                        mat.c = Math.cos(r) * s;
                        mat.d = Math.sin(r) * s;
                        modified = true;
                    }
                    if (modified)
                        bone.appliedValid = false;
                }
            };
            TransformConstraint.prototype.applyAbsoluteLocal = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                if (!target.appliedValid)
                    target.updateAppliedTransform();
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid)
                        bone.updateAppliedTransform();
                    var rotation = bone.arotation;
                    if (rotateMix != 0) {
                        var r = target.arotation - rotation + this.data.offsetRotation;
                        r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                        rotation += r * rotateMix;
                    }
                    var x = bone.ax, y = bone.ay;
                    if (translateMix != 0) {
                        x += (target.ax - x + this.data.offsetX) * translateMix;
                        y += (target.ay - y + this.data.offsetY) * translateMix;
                    }
                    var scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                    if (scaleMix > 0) {
                        if (scaleX > 0.00001)
                            scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * scaleMix) / scaleX;
                        if (scaleY > 0.00001)
                            scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * scaleMix) / scaleY;
                    }
                    var shearY = bone.ashearY;
                    if (shearMix > 0) {
                        var r = target.ashearY - shearY + this.data.offsetShearY;
                        r -= (16384 - ((16384.499999999996 - r / 360) | 0)) * 360;
                        bone.shearY += r * shearMix;
                    }
                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                }
            };
            TransformConstraint.prototype.applyRelativeLocal = function () {
                var rotateMix = this.rotateMix, translateMix = this.translateMix, scaleMix = this.scaleMix, shearMix = this.shearMix;
                var target = this.target;
                if (!target.appliedValid)
                    target.updateAppliedTransform();
                var bones = this.bones;
                for (var i = 0, n = bones.length; i < n; i++) {
                    var bone = bones[i];
                    if (!bone.appliedValid)
                        bone.updateAppliedTransform();
                    var rotation = bone.arotation;
                    if (rotateMix != 0)
                        rotation += (target.arotation + this.data.offsetRotation) * rotateMix;
                    var x = bone.ax, y = bone.ay;
                    if (translateMix != 0) {
                        x += (target.ax + this.data.offsetX) * translateMix;
                        y += (target.ay + this.data.offsetY) * translateMix;
                    }
                    var scaleX = bone.ascaleX, scaleY = bone.ascaleY;
                    if (scaleMix > 0) {
                        if (scaleX > 0.00001)
                            scaleX *= ((target.ascaleX - 1 + this.data.offsetScaleX) * scaleMix) + 1;
                        if (scaleY > 0.00001)
                            scaleY *= ((target.ascaleY - 1 + this.data.offsetScaleY) * scaleMix) + 1;
                    }
                    var shearY = bone.ashearY;
                    if (shearMix > 0)
                        shearY += (target.ashearY + this.data.offsetShearY) * shearMix;
                    bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
                }
            };
            TransformConstraint.prototype.getOrder = function () {
                return this.data.order;
            };
            return TransformConstraint;
        }());
        core.TransformConstraint = TransformConstraint;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var TransformConstraintData = (function () {
            function TransformConstraintData(name) {
                this.order = 0;
                this.bones = new Array();
                this.rotateMix = 0;
                this.translateMix = 0;
                this.scaleMix = 0;
                this.shearMix = 0;
                this.offsetRotation = 0;
                this.offsetX = 0;
                this.offsetY = 0;
                this.offsetScaleX = 0;
                this.offsetScaleY = 0;
                this.offsetShearY = 0;
                this.relative = false;
                this.local = false;
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return TransformConstraintData;
        }());
        core.TransformConstraintData = TransformConstraintData;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Triangulator = (function () {
            function Triangulator() {
                this.convexPolygons = new Array();
                this.convexPolygonsIndices = new Array();
                this.indicesArray = new Array();
                this.isConcaveArray = new Array();
                this.triangles = new Array();
                this.polygonPool = new core.Pool(function () {
                    return new Array();
                });
                this.polygonIndicesPool = new core.Pool(function () {
                    return new Array();
                });
            }
            Triangulator.prototype.triangulate = function (verticesArray) {
                var vertices = verticesArray;
                var vertexCount = verticesArray.length >> 1;
                var indices = this.indicesArray;
                indices.length = 0;
                for (var i = 0; i < vertexCount; i++)
                    indices[i] = i;
                var isConcave = this.isConcaveArray;
                isConcave.length = 0;
                for (var i = 0, n = vertexCount; i < n; ++i)
                    isConcave[i] = Triangulator.isConcave(i, vertexCount, vertices, indices);
                var triangles = this.triangles;
                triangles.length = 0;
                while (vertexCount > 3) {
                    var previous = vertexCount - 1, i = 0, next = 1;
                    while (true) {
                        outer: if (!isConcave[i]) {
                            var p1 = indices[previous] << 1, p2 = indices[i] << 1, p3 = indices[next] << 1;
                            var p1x = vertices[p1], p1y = vertices[p1 + 1];
                            var p2x = vertices[p2], p2y = vertices[p2 + 1];
                            var p3x = vertices[p3], p3y = vertices[p3 + 1];
                            for (var ii = (next + 1) % vertexCount; ii != previous; ii = (ii + 1) % vertexCount) {
                                if (!isConcave[ii])
                                    continue;
                                var v = indices[ii] << 1;
                                var vx = vertices[v], vy = vertices[v + 1];
                                if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                                    if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                                        if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy))
                                            break outer;
                                    }
                                }
                            }
                            break;
                        }
                        if (next == 0) {
                            do {
                                if (!isConcave[i])
                                    break;
                                i--;
                            } while (i > 0);
                            break;
                        }
                        previous = i;
                        i = next;
                        next = (next + 1) % vertexCount;
                    }
                    triangles.push(indices[(vertexCount + i - 1) % vertexCount]);
                    triangles.push(indices[i]);
                    triangles.push(indices[(i + 1) % vertexCount]);
                    indices.splice(i, 1);
                    isConcave.splice(i, 1);
                    vertexCount--;
                    var previousIndex = (vertexCount + i - 1) % vertexCount;
                    var nextIndex = i == vertexCount ? 0 : i;
                    isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
                    isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
                }
                if (vertexCount == 3) {
                    triangles.push(indices[2]);
                    triangles.push(indices[0]);
                    triangles.push(indices[1]);
                }
                return triangles;
            };
            Triangulator.prototype.decompose = function (verticesArray, triangles) {
                var vertices = verticesArray;
                var convexPolygons = this.convexPolygons;
                this.polygonPool.freeAll(convexPolygons);
                convexPolygons.length = 0;
                var convexPolygonsIndices = this.convexPolygonsIndices;
                this.polygonIndicesPool.freeAll(convexPolygonsIndices);
                convexPolygonsIndices.length = 0;
                var polygonIndices = this.polygonIndicesPool.obtain();
                polygonIndices.length = 0;
                var polygon = this.polygonPool.obtain();
                polygon.length = 0;
                var fanBaseIndex = -1, lastWinding = 0;
                for (var i = 0, n = triangles.length; i < n; i += 3) {
                    var t1 = triangles[i] << 1, t2 = triangles[i + 1] << 1, t3 = triangles[i + 2] << 1;
                    var x1 = vertices[t1], y1 = vertices[t1 + 1];
                    var x2 = vertices[t2], y2 = vertices[t2 + 1];
                    var x3 = vertices[t3], y3 = vertices[t3 + 1];
                    var merged = false;
                    if (fanBaseIndex == t1) {
                        var o = polygon.length - 4;
                        var winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
                        var winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);
                        if (winding1 == lastWinding && winding2 == lastWinding) {
                            polygon.push(x3);
                            polygon.push(y3);
                            polygonIndices.push(t3);
                            merged = true;
                        }
                    }
                    if (!merged) {
                        if (polygon.length > 0) {
                            convexPolygons.push(polygon);
                            convexPolygonsIndices.push(polygonIndices);
                        }
                        else {
                            this.polygonPool.free(polygon);
                            this.polygonIndicesPool.free(polygonIndices);
                        }
                        polygon = this.polygonPool.obtain();
                        polygon.length = 0;
                        polygon.push(x1);
                        polygon.push(y1);
                        polygon.push(x2);
                        polygon.push(y2);
                        polygon.push(x3);
                        polygon.push(y3);
                        polygonIndices = this.polygonIndicesPool.obtain();
                        polygonIndices.length = 0;
                        polygonIndices.push(t1);
                        polygonIndices.push(t2);
                        polygonIndices.push(t3);
                        lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
                        fanBaseIndex = t1;
                    }
                }
                if (polygon.length > 0) {
                    convexPolygons.push(polygon);
                    convexPolygonsIndices.push(polygonIndices);
                }
                for (var i = 0, n = convexPolygons.length; i < n; i++) {
                    polygonIndices = convexPolygonsIndices[i];
                    if (polygonIndices.length == 0)
                        continue;
                    var firstIndex = polygonIndices[0];
                    var lastIndex = polygonIndices[polygonIndices.length - 1];
                    polygon = convexPolygons[i];
                    var o = polygon.length - 4;
                    var prevPrevX = polygon[o], prevPrevY = polygon[o + 1];
                    var prevX = polygon[o + 2], prevY = polygon[o + 3];
                    var firstX = polygon[0], firstY = polygon[1];
                    var secondX = polygon[2], secondY = polygon[3];
                    var winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);
                    for (var ii = 0; ii < n; ii++) {
                        if (ii == i)
                            continue;
                        var otherIndices = convexPolygonsIndices[ii];
                        if (otherIndices.length != 3)
                            continue;
                        var otherFirstIndex = otherIndices[0];
                        var otherSecondIndex = otherIndices[1];
                        var otherLastIndex = otherIndices[2];
                        var otherPoly = convexPolygons[ii];
                        var x3 = otherPoly[otherPoly.length - 2], y3 = otherPoly[otherPoly.length - 1];
                        if (otherFirstIndex != firstIndex || otherSecondIndex != lastIndex)
                            continue;
                        var winding1 = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, x3, y3);
                        var winding2 = Triangulator.winding(x3, y3, firstX, firstY, secondX, secondY);
                        if (winding1 == winding && winding2 == winding) {
                            otherPoly.length = 0;
                            otherIndices.length = 0;
                            polygon.push(x3);
                            polygon.push(y3);
                            polygonIndices.push(otherLastIndex);
                            prevPrevX = prevX;
                            prevPrevY = prevY;
                            prevX = x3;
                            prevY = y3;
                            ii = 0;
                        }
                    }
                }
                for (var i = convexPolygons.length - 1; i >= 0; i--) {
                    polygon = convexPolygons[i];
                    if (polygon.length == 0) {
                        convexPolygons.splice(i, 1);
                        this.polygonPool.free(polygon);
                        polygonIndices = convexPolygonsIndices[i];
                        convexPolygonsIndices.splice(i, 1);
                        this.polygonIndicesPool.free(polygonIndices);
                    }
                }
                return convexPolygons;
            };
            Triangulator.isConcave = function (index, vertexCount, vertices, indices) {
                var previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
                var current = indices[index] << 1;
                var next = indices[(index + 1) % vertexCount] << 1;
                return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
            };
            Triangulator.positiveArea = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
            };
            Triangulator.winding = function (p1x, p1y, p2x, p2y, p3x, p3y) {
                var px = p2x - p1x, py = p2y - p1y;
                return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
            };
            return Triangulator;
        }());
        core.Triangulator = Triangulator;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var IntSet = (function () {
            function IntSet() {
                this.array = new Array();
            }
            IntSet.prototype.add = function (value) {
                var contains = this.contains(value);
                this.array[value | 0] = value | 0;
                return !contains;
            };
            IntSet.prototype.contains = function (value) {
                return this.array[value | 0] != undefined;
            };
            IntSet.prototype.remove = function (value) {
                this.array[value | 0] = undefined;
            };
            IntSet.prototype.clear = function () {
                this.array.length = 0;
            };
            return IntSet;
        }());
        core.IntSet = IntSet;
        var Color = (function () {
            function Color(r, g, b, a) {
                if (r === void 0) { r = 0; }
                if (g === void 0) { g = 0; }
                if (b === void 0) { b = 0; }
                if (a === void 0) { a = 0; }
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
            }
            Color.prototype.set = function (r, g, b, a) {
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.clamp();
                return this;
            };
            Color.prototype.setFromColor = function (c) {
                this.r = c.r;
                this.g = c.g;
                this.b = c.b;
                this.a = c.a;
                return this;
            };
            Color.prototype.setFromString = function (hex) {
                hex = hex.charAt(0) == '#' ? hex.substr(1) : hex;
                this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
                this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
                this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
                this.a = (hex.length != 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
                return this;
            };
            Color.prototype.add = function (r, g, b, a) {
                this.r += r;
                this.g += g;
                this.b += b;
                this.a += a;
                this.clamp();
                return this;
            };
            Color.prototype.clamp = function () {
                if (this.r < 0)
                    this.r = 0;
                else if (this.r > 1)
                    this.r = 1;
                if (this.g < 0)
                    this.g = 0;
                else if (this.g > 1)
                    this.g = 1;
                if (this.b < 0)
                    this.b = 0;
                else if (this.b > 1)
                    this.b = 1;
                if (this.a < 0)
                    this.a = 0;
                else if (this.a > 1)
                    this.a = 1;
                return this;
            };
            Color.WHITE = new Color(1, 1, 1, 1);
            Color.RED = new Color(1, 0, 0, 1);
            Color.GREEN = new Color(0, 1, 0, 1);
            Color.BLUE = new Color(0, 0, 1, 1);
            Color.MAGENTA = new Color(1, 0, 1, 1);
            return Color;
        }());
        core.Color = Color;
        var MathUtils = (function () {
            function MathUtils() {
            }
            MathUtils.clamp = function (value, min, max) {
                if (value < min)
                    return min;
                if (value > max)
                    return max;
                return value;
            };
            MathUtils.cosDeg = function (degrees) {
                return Math.cos(degrees * MathUtils.degRad);
            };
            MathUtils.sinDeg = function (degrees) {
                return Math.sin(degrees * MathUtils.degRad);
            };
            MathUtils.signum = function (value) {
                return value > 0 ? 1 : value < 0 ? -1 : 0;
            };
            MathUtils.toInt = function (x) {
                return x > 0 ? Math.floor(x) : Math.ceil(x);
            };
            MathUtils.cbrt = function (x) {
                var y = Math.pow(Math.abs(x), 1 / 3);
                return x < 0 ? -y : y;
            };
            MathUtils.randomTriangular = function (min, max) {
                return MathUtils.randomTriangularWith(min, max, (min + max) * 0.5);
            };
            MathUtils.randomTriangularWith = function (min, max, mode) {
                var u = Math.random();
                var d = max - min;
                if (u <= (mode - min) / d)
                    return min + Math.sqrt(u * d * (mode - min));
                return max - Math.sqrt((1 - u) * d * (max - mode));
            };
            MathUtils.PI = 3.1415927;
            MathUtils.PI2 = MathUtils.PI * 2;
            MathUtils.radiansToDegrees = 180 / MathUtils.PI;
            MathUtils.radDeg = MathUtils.radiansToDegrees;
            MathUtils.degreesToRadians = MathUtils.PI / 180;
            MathUtils.degRad = MathUtils.degreesToRadians;
            return MathUtils;
        }());
        core.MathUtils = MathUtils;
        var Interpolation = (function () {
            function Interpolation() {
            }
            Interpolation.prototype.apply = function (start, end, a) {
                return start + (end - start) * this.applyInternal(a);
            };
            return Interpolation;
        }());
        core.Interpolation = Interpolation;
        var Pow = (function (_super) {
            __extends(Pow, _super);
            function Pow(power) {
                var _this = _super.call(this) || this;
                _this.power = 2;
                _this.power = power;
                return _this;
            }
            Pow.prototype.applyInternal = function (a) {
                if (a <= 0.5)
                    return Math.pow(a * 2, this.power) / 2;
                return Math.pow((a - 1) * 2, this.power) / (this.power % 2 == 0 ? -2 : 2) + 1;
            };
            return Pow;
        }(Interpolation));
        core.Pow = Pow;
        var PowOut = (function (_super) {
            __extends(PowOut, _super);
            function PowOut(power) {
                return _super.call(this, power) || this;
            }
            PowOut.prototype.applyInternal = function (a) {
                return Math.pow(a - 1, this.power) * (this.power % 2 == 0 ? -1 : 1) + 1;
            };
            return PowOut;
        }(Pow));
        core.PowOut = PowOut;
        var Utils = (function () {
            function Utils() {
            }
            Utils.arrayCopy = function (source, sourceStart, dest, destStart, numElements) {
                for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
                    dest[j] = source[i];
                }
            };
            Utils.setArraySize = function (array, size, value) {
                if (value === void 0) { value = 0; }
                var oldSize = array.length;
                if (oldSize == size)
                    return array;
                array.length = size;
                if (oldSize < size) {
                    for (var i = oldSize; i < size; i++)
                        array[i] = value;
                }
                return array;
            };
            Utils.ensureArrayCapacity = function (array, size, value) {
                if (value === void 0) { value = 0; }
                if (array.length >= size)
                    return array;
                return Utils.setArraySize(array, size, value);
            };
            Utils.newArray = function (size, defaultValue) {
                var array = new Array(size);
                for (var i = 0; i < size; i++)
                    array[i] = defaultValue;
                return array;
            };
            Utils.newFloatArray = function (size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Float32Array(size);
                }
                else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++)
                        array[i] = 0;
                    return array;
                }
            };
            Utils.newShortArray = function (size) {
                if (Utils.SUPPORTS_TYPED_ARRAYS) {
                    return new Int16Array(size);
                }
                else {
                    var array = new Array(size);
                    for (var i = 0; i < array.length; i++)
                        array[i] = 0;
                    return array;
                }
            };
            Utils.toFloatArray = function (array) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
            };
            Utils.toSinglePrecision = function (value) {
                return Utils.SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
            };
            Utils.SUPPORTS_TYPED_ARRAYS = typeof (Float32Array) !== "undefined";
            return Utils;
        }());
        core.Utils = Utils;
        var DebugUtils = (function () {
            function DebugUtils() {
            }
            DebugUtils.logBones = function (skeleton) {
                for (var i = 0; i < skeleton.bones.length; i++) {
                    var bone = skeleton.bones[i];
                    var mat = bone.matrix;
                    console.log(bone.data.name + ", " + mat.a + ", " + mat.b + ", " + mat.c + ", " + mat.d + ", " + mat.tx + ", " + mat.ty);
                }
            };
            return DebugUtils;
        }());
        core.DebugUtils = DebugUtils;
        var Pool = (function () {
            function Pool(instantiator) {
                this.items = new Array();
                this.instantiator = instantiator;
            }
            Pool.prototype.obtain = function () {
                return this.items.length > 0 ? this.items.pop() : this.instantiator();
            };
            Pool.prototype.free = function (item) {
                if (item.reset)
                    item.reset();
                this.items.push(item);
            };
            Pool.prototype.freeAll = function (items) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].reset)
                        items[i].reset();
                    this.items[i] = items[i];
                }
            };
            Pool.prototype.clear = function () {
                this.items.length = 0;
            };
            return Pool;
        }());
        core.Pool = Pool;
        var Vector2 = (function () {
            function Vector2(x, y) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                this.x = x;
                this.y = y;
            }
            Vector2.prototype.set = function (x, y) {
                this.x = x;
                this.y = y;
                return this;
            };
            Vector2.prototype.length = function () {
                var x = this.x;
                var y = this.y;
                return Math.sqrt(x * x + y * y);
            };
            Vector2.prototype.normalize = function () {
                var len = this.length();
                if (len != 0) {
                    this.x /= len;
                    this.y /= len;
                }
                return this;
            };
            return Vector2;
        }());
        core.Vector2 = Vector2;
        var TimeKeeper = (function () {
            function TimeKeeper() {
                this.maxDelta = 0.064;
                this.framesPerSecond = 0;
                this.delta = 0;
                this.totalTime = 0;
                this.lastTime = Date.now() / 1000;
                this.frameCount = 0;
                this.frameTime = 0;
            }
            TimeKeeper.prototype.update = function () {
                var now = Date.now() / 1000;
                this.delta = now - this.lastTime;
                this.frameTime += this.delta;
                this.totalTime += this.delta;
                if (this.delta > this.maxDelta)
                    this.delta = this.maxDelta;
                this.lastTime = now;
                this.frameCount++;
                if (this.frameTime > 1) {
                    this.framesPerSecond = this.frameCount / this.frameTime;
                    this.frameTime = 0;
                    this.frameCount = 0;
                }
            };
            return TimeKeeper;
        }());
        core.TimeKeeper = TimeKeeper;
        var WindowedMean = (function () {
            function WindowedMean(windowSize) {
                if (windowSize === void 0) { windowSize = 32; }
                this.addedValues = 0;
                this.lastValue = 0;
                this.mean = 0;
                this.dirty = true;
                this.values = new Array(windowSize);
            }
            WindowedMean.prototype.hasEnoughData = function () {
                return this.addedValues >= this.values.length;
            };
            WindowedMean.prototype.addValue = function (value) {
                if (this.addedValues < this.values.length)
                    this.addedValues++;
                this.values[this.lastValue++] = value;
                if (this.lastValue > this.values.length - 1)
                    this.lastValue = 0;
                this.dirty = true;
            };
            WindowedMean.prototype.getMean = function () {
                if (this.hasEnoughData()) {
                    if (this.dirty) {
                        var mean = 0;
                        for (var i = 0; i < this.values.length; i++) {
                            mean += this.values[i];
                        }
                        this.mean = mean / this.values.length;
                        this.dirty = false;
                    }
                    return this.mean;
                }
                else {
                    return 0;
                }
            };
            return WindowedMean;
        }());
        core.WindowedMean = WindowedMean;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var Attachment = (function () {
            function Attachment(name) {
                if (name == null)
                    throw new Error("name cannot be null.");
                this.name = name;
            }
            return Attachment;
        }());
        core.Attachment = Attachment;
        var VertexAttachment = (function (_super) {
            __extends(VertexAttachment, _super);
            function VertexAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.id = (VertexAttachment.nextID++ & 65535) << 11;
                _this.worldVerticesLength = 0;
                return _this;
            }
            VertexAttachment.prototype.computeWorldVerticesOld = function (slot, worldVertices) {
                this.computeWorldVertices(slot, 0, this.worldVerticesLength, worldVertices, 0, 2);
            };
            VertexAttachment.prototype.computeWorldVertices = function (slot, start, count, worldVertices, offset, stride) {
                count = offset + (count >> 1) * stride;
                var skeleton = slot.bone.skeleton;
                var deformArray = slot.attachmentVertices;
                var vertices = this.vertices;
                var bones = this.bones;
                if (bones == null) {
                    if (deformArray.length > 0)
                        vertices = deformArray;
                    var mat = slot.bone.matrix;
                    var x = mat.tx;
                    var y = mat.ty;
                    var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                    for (var v_1 = start, w = offset; w < count; v_1 += 2, w += stride) {
                        var vx = vertices[v_1], vy = vertices[v_1 + 1];
                        worldVertices[w] = vx * a + vy * b + x;
                        worldVertices[w + 1] = vx * c + vy * d + y;
                    }
                    return;
                }
                var v = 0, skip = 0;
                for (var i = 0; i < start; i += 2) {
                    var n = bones[v];
                    v += n + 1;
                    skip += n;
                }
                var skeletonBones = skeleton.bones;
                if (deformArray.length == 0) {
                    for (var w = offset, b = skip * 3; w < count; w += stride) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3) {
                            var mat = skeletonBones[bones[v]].matrix;
                            var vx = vertices[b], vy = vertices[b + 1], weight = vertices[b + 2];
                            wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                            wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
                else {
                    var deform = deformArray;
                    for (var w = offset, b = skip * 3, f = skip << 1; w < count; w += stride) {
                        var wx = 0, wy = 0;
                        var n = bones[v++];
                        n += v;
                        for (; v < n; v++, b += 3, f += 2) {
                            var mat = skeletonBones[bones[v]].matrix;
                            var vx = vertices[b] + deform[f], vy = vertices[b + 1] + deform[f + 1], weight = vertices[b + 2];
                            wx += (vx * mat.a + vy * mat.c + mat.tx) * weight;
                            wy += (vx * mat.b + vy * mat.d + mat.ty) * weight;
                        }
                        worldVertices[w] = wx;
                        worldVertices[w + 1] = wy;
                    }
                }
            };
            VertexAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment;
            };
            VertexAttachment.nextID = 0;
            return VertexAttachment;
        }(Attachment));
        core.VertexAttachment = VertexAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var AttachmentType;
        (function (AttachmentType) {
            AttachmentType[AttachmentType["Region"] = 0] = "Region";
            AttachmentType[AttachmentType["BoundingBox"] = 1] = "BoundingBox";
            AttachmentType[AttachmentType["Mesh"] = 2] = "Mesh";
            AttachmentType[AttachmentType["LinkedMesh"] = 3] = "LinkedMesh";
            AttachmentType[AttachmentType["Path"] = 4] = "Path";
            AttachmentType[AttachmentType["Point"] = 5] = "Point";
        })(AttachmentType = core.AttachmentType || (core.AttachmentType = {}));
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var BoundingBoxAttachment = (function (_super) {
            __extends(BoundingBoxAttachment, _super);
            function BoundingBoxAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(1, 1, 1, 1);
                return _this;
            }
            return BoundingBoxAttachment;
        }(core.VertexAttachment));
        core.BoundingBoxAttachment = BoundingBoxAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var ClippingAttachment = (function (_super) {
            __extends(ClippingAttachment, _super);
            function ClippingAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(0.2275, 0.2275, 0.8078, 1);
                return _this;
            }
            return ClippingAttachment;
        }(core.VertexAttachment));
        core.ClippingAttachment = ClippingAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var MeshAttachment = (function (_super) {
            __extends(MeshAttachment, _super);
            function MeshAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(1, 1, 1, 1);
                _this.inheritDeform = false;
                _this.tempColor = new core.Color(0, 0, 0, 0);
                return _this;
            }
            MeshAttachment.prototype.updateUVs = function (region, uvs) {
                var regionUVs = this.regionUVs;
                var n = regionUVs.length;
                if (!uvs || uvs.length != n) {
                    uvs = core.Utils.newFloatArray(n);
                }
                if (region == null) {
                    return;
                }
                var texture = region.texture;
                var r = texture._uvs;
                var w1 = region.width, h1 = region.height, w2 = region.originalWidth, h2 = region.originalHeight;
                var x = region.offsetX, y = region.pixiOffsetY;
                for (var i = 0; i < n; i += 2) {
                    var u = this.regionUVs[i], v = this.regionUVs[i + 1];
                    u = (u * w2 - x) / w1;
                    v = (v * h2 - y) / h1;
                    uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1 - v) + (r.x3 * (1 - u) + r.x2 * u) * v;
                    uvs[i + 1] = (r.y0 * (1 - u) + r.y1 * u) * (1 - v) + (r.y3 * (1 - u) + r.y2 * u) * v;
                }
                return uvs;
            };
            MeshAttachment.prototype.applyDeform = function (sourceAttachment) {
                return this == sourceAttachment || (this.inheritDeform && this.parentMesh == sourceAttachment);
            };
            MeshAttachment.prototype.getParentMesh = function () {
                return this.parentMesh;
            };
            MeshAttachment.prototype.setParentMesh = function (parentMesh) {
                this.parentMesh = parentMesh;
                if (parentMesh != null) {
                    this.bones = parentMesh.bones;
                    this.vertices = parentMesh.vertices;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                    this.regionUVs = parentMesh.regionUVs;
                    this.triangles = parentMesh.triangles;
                    this.hullLength = parentMesh.hullLength;
                    this.worldVerticesLength = parentMesh.worldVerticesLength;
                }
            };
            return MeshAttachment;
        }(core.VertexAttachment));
        core.MeshAttachment = MeshAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PathAttachment = (function (_super) {
            __extends(PathAttachment, _super);
            function PathAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.closed = false;
                _this.constantSpeed = false;
                _this.color = new core.Color(1, 1, 1, 1);
                return _this;
            }
            return PathAttachment;
        }(core.VertexAttachment));
        core.PathAttachment = PathAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var PointAttachment = (function (_super) {
            __extends(PointAttachment, _super);
            function PointAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.color = new core.Color(0.38, 0.94, 0, 1);
                return _this;
            }
            PointAttachment.prototype.computeWorldPosition = function (bone, point) {
                var mat = bone.matrix;
                point.x = this.x * mat.a + this.y * mat.c + bone.worldX;
                point.y = this.x * mat.b + this.y * mat.d + bone.worldY;
                return point;
            };
            PointAttachment.prototype.computeWorldRotation = function (bone) {
                var mat = bone.matrix;
                var cos = core.MathUtils.cosDeg(this.rotation), sin = core.MathUtils.sinDeg(this.rotation);
                var x = cos * mat.a + sin * mat.c;
                var y = cos * mat.b + sin * mat.d;
                return Math.atan2(y, x) * core.MathUtils.radDeg;
            };
            return PointAttachment;
        }(core.VertexAttachment));
        core.PointAttachment = PointAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var RegionAttachment = (function (_super) {
            __extends(RegionAttachment, _super);
            function RegionAttachment(name) {
                var _this = _super.call(this, name) || this;
                _this.x = 0;
                _this.y = 0;
                _this.scaleX = 1;
                _this.scaleY = 1;
                _this.rotation = 0;
                _this.width = 0;
                _this.height = 0;
                _this.color = new core.Color(1, 1, 1, 1);
                _this.offset = core.Utils.newFloatArray(8);
                _this.uvs = core.Utils.newFloatArray(8);
                _this.tempColor = new core.Color(1, 1, 1, 1);
                return _this;
            }
            RegionAttachment.prototype.updateOffset = function () {
                var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
                var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
                var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
                var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
                var localX2 = localX + this.region.width * regionScaleX;
                var localY2 = localY + this.region.height * regionScaleY;
                var radians = this.rotation * Math.PI / 180;
                var cos = Math.cos(radians);
                var sin = Math.sin(radians);
                var localXCos = localX * cos + this.x;
                var localXSin = localX * sin;
                var localYCos = localY * cos + this.y;
                var localYSin = localY * sin;
                var localX2Cos = localX2 * cos + this.x;
                var localX2Sin = localX2 * sin;
                var localY2Cos = localY2 * cos + this.y;
                var localY2Sin = localY2 * sin;
                var offset = this.offset;
                offset[RegionAttachment.OX1] = localXCos - localYSin;
                offset[RegionAttachment.OY1] = localYCos + localXSin;
                offset[RegionAttachment.OX2] = localXCos - localY2Sin;
                offset[RegionAttachment.OY2] = localY2Cos + localXSin;
                offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
                offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
                offset[RegionAttachment.OX4] = localX2Cos - localYSin;
                offset[RegionAttachment.OY4] = localYCos + localX2Sin;
            };
            RegionAttachment.prototype.setRegion = function (region) {
                this.region = region;
                var uvs = this.uvs;
                if (region.rotate) {
                    uvs[2] = region.u;
                    uvs[3] = region.v2;
                    uvs[4] = region.u;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v;
                    uvs[0] = region.u2;
                    uvs[1] = region.v2;
                }
                else {
                    uvs[0] = region.u;
                    uvs[1] = region.v2;
                    uvs[2] = region.u;
                    uvs[3] = region.v;
                    uvs[4] = region.u2;
                    uvs[5] = region.v;
                    uvs[6] = region.u2;
                    uvs[7] = region.v2;
                }
            };
            RegionAttachment.prototype.computeWorldVertices = function (bone, worldVertices, offset, stride) {
                var vertexOffset = this.offset;
                var mat = bone.matrix;
                var x = mat.tx, y = mat.ty;
                var a = mat.a, b = mat.c, c = mat.b, d = mat.d;
                var offsetX = 0, offsetY = 0;
                offsetX = vertexOffset[RegionAttachment.OX1];
                offsetY = vertexOffset[RegionAttachment.OY1];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX2];
                offsetY = vertexOffset[RegionAttachment.OY2];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX3];
                offsetY = vertexOffset[RegionAttachment.OY3];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
                offset += stride;
                offsetX = vertexOffset[RegionAttachment.OX4];
                offsetY = vertexOffset[RegionAttachment.OY4];
                worldVertices[offset] = offsetX * a + offsetY * b + x;
                worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
            };
            RegionAttachment.OX1 = 0;
            RegionAttachment.OY1 = 1;
            RegionAttachment.OX2 = 2;
            RegionAttachment.OY2 = 3;
            RegionAttachment.OX3 = 4;
            RegionAttachment.OY3 = 5;
            RegionAttachment.OX4 = 6;
            RegionAttachment.OY4 = 7;
            RegionAttachment.X1 = 0;
            RegionAttachment.Y1 = 1;
            RegionAttachment.C1R = 2;
            RegionAttachment.C1G = 3;
            RegionAttachment.C1B = 4;
            RegionAttachment.C1A = 5;
            RegionAttachment.U1 = 6;
            RegionAttachment.V1 = 7;
            RegionAttachment.X2 = 8;
            RegionAttachment.Y2 = 9;
            RegionAttachment.C2R = 10;
            RegionAttachment.C2G = 11;
            RegionAttachment.C2B = 12;
            RegionAttachment.C2A = 13;
            RegionAttachment.U2 = 14;
            RegionAttachment.V2 = 15;
            RegionAttachment.X3 = 16;
            RegionAttachment.Y3 = 17;
            RegionAttachment.C3R = 18;
            RegionAttachment.C3G = 19;
            RegionAttachment.C3B = 20;
            RegionAttachment.C3A = 21;
            RegionAttachment.U3 = 22;
            RegionAttachment.V3 = 23;
            RegionAttachment.X4 = 24;
            RegionAttachment.Y4 = 25;
            RegionAttachment.C4R = 26;
            RegionAttachment.C4G = 27;
            RegionAttachment.C4B = 28;
            RegionAttachment.C4A = 29;
            RegionAttachment.U4 = 30;
            RegionAttachment.V4 = 31;
            return RegionAttachment;
        }(core.Attachment));
        core.RegionAttachment = RegionAttachment;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var JitterEffect = (function () {
            function JitterEffect(jitterX, jitterY) {
                this.jitterX = 0;
                this.jitterY = 0;
                this.jitterX = jitterX;
                this.jitterY = jitterY;
            }
            JitterEffect.prototype.begin = function (skeleton) {
            };
            JitterEffect.prototype.transform = function (position, uv, light, dark) {
                position.x += core.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
                position.y += core.MathUtils.randomTriangular(-this.jitterX, this.jitterY);
            };
            JitterEffect.prototype.end = function () {
            };
            return JitterEffect;
        }());
        core.JitterEffect = JitterEffect;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    var core;
    (function (core) {
        var SwirlEffect = (function () {
            function SwirlEffect(radius) {
                this.centerX = 0;
                this.centerY = 0;
                this.radius = 0;
                this.angle = 0;
                this.worldX = 0;
                this.worldY = 0;
                this.radius = radius;
            }
            SwirlEffect.prototype.begin = function (skeleton) {
                this.worldX = skeleton.x + this.centerX;
                this.worldY = skeleton.y + this.centerY;
            };
            SwirlEffect.prototype.transform = function (position, uv, light, dark) {
                var radAngle = this.angle * core.MathUtils.degreesToRadians;
                var x = position.x - this.worldX;
                var y = position.y - this.worldY;
                var dist = Math.sqrt(x * x + y * y);
                if (dist < this.radius) {
                    var theta = SwirlEffect.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius);
                    var cos = Math.cos(theta);
                    var sin = Math.sin(theta);
                    position.x = cos * x - sin * y + this.worldX;
                    position.y = sin * x + cos * y + this.worldY;
                }
            };
            SwirlEffect.prototype.end = function () {
            };
            SwirlEffect.interpolation = new core.PowOut(2);
            return SwirlEffect;
        }());
        core.SwirlEffect = SwirlEffect;
    })(core = pixi_spine.core || (pixi_spine.core = {}));
})(pixi_spine || (pixi_spine = {}));
var pixi_spine;
(function (pixi_spine) {
    function isJson(resource) {
        return resource.type === PIXI.loaders.Resource.TYPE.JSON;
    }
    function atlasParser() {
        return function (resource, next) {
            if (!resource.data ||
                !isJson(resource) ||
                !resource.data.bones) {
                return next();
            }
            var metadata = resource.metadata || {};
            var metadataSkeletonScale = metadata ? resource.metadata.spineSkeletonScale : null;
            var metadataAtlas = metadata ? resource.metadata.spineAtlas : null;
            if (metadataAtlas === false) {
                return next();
            }
            if (metadataAtlas && metadataAtlas.pages) {
                var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(metadataAtlas));
                var skeletonData = spineJsonParser.readSkeletonData(resource.data);
                resource.spineData = skeletonData;
                resource.spineAtlas = metadataAtlas;
                return next();
            }
            var metadataAtlasSuffix = metadata.spineAtlasSuffix || '.atlas';
            var atlasPath = resource.url.substr(0, resource.url.lastIndexOf('.')) + metadataAtlasSuffix;
            atlasPath = atlasPath.replace(this.baseUrl, '');
            var atlasOptions = {
                crossOrigin: resource.crossOrigin,
                xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
                metadata: metadata.spineMetadata || null,
                parentResource: resource
            };
            var imageOptions = {
                crossOrigin: resource.crossOrigin,
                metadata: metadata.imageMetadata || null,
                parentResource: resource
            };
            var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
            baseUrl = baseUrl.replace(this.baseUrl, '');
            var adapter = metadata.images ? staticImageLoader(metadata.images)
                : metadata.image ? staticImageLoader({ 'default': metadata.image })
                    : metadata.imageLoader ? metadata.imageLoader(this, resource.name + '_atlas_page_', baseUrl, imageOptions)
                        : imageLoaderAdapter(this, resource.name + '_atlas_page_', baseUrl, imageOptions);
            this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
                new pixi_spine.core.TextureAtlas(atlasResource.xhr.responseText, adapter, function (spineAtlas) {
                    var spineJsonParser = new pixi_spine.core.SkeletonJson(new pixi_spine.core.AtlasAttachmentLoader(spineAtlas));
                    if (metadataSkeletonScale) {
                        spineJsonParser.scale = metadataSkeletonScale;
                    }
                    resource.spineData = spineJsonParser.readSkeletonData(resource.data);
                    resource.spineAtlas = spineAtlas;
                    next();
                });
            });
        };
    }
    pixi_spine.atlasParser = atlasParser;
    function imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            var name = namePrefix + line;
            var url = baseUrl + line;
            loader.add(name, url, imageOptions, function (resource) {
                callback(resource.texture.baseTexture);
            });
        };
    }
    pixi_spine.imageLoaderAdapter = imageLoaderAdapter;
    function syncImageLoaderAdapter(baseUrl, crossOrigin) {
        if (baseUrl && baseUrl.lastIndexOf('/') !== (baseUrl.length - 1)) {
            baseUrl += '/';
        }
        return function (line, callback) {
            callback(PIXI.BaseTexture.fromImage(line, crossOrigin));
        };
    }
    pixi_spine.syncImageLoaderAdapter = syncImageLoaderAdapter;
    function staticImageLoader(pages) {
        return function (line, callback) {
            var page = pages[line] || pages['default'];
            if (page && page.baseTexture)
                callback(page.baseTexture);
            else
                callback(page);
        };
    }
    pixi_spine.staticImageLoader = staticImageLoader;
    PIXI.loaders.Loader.addPixiMiddleware(atlasParser);
    PIXI.loader.use(atlasParser());
})(pixi_spine || (pixi_spine = {}));
(function () {
    if (!Math.fround) {
        Math.fround = Math.fround = (function (array) {
            return function (x) {
                return array[0] = x, array[0];
            };
        })(new Float32Array(1));
    }
})();
var pixi_spine;
(function (pixi_spine) {
    pixi_spine.core.Bone.yDown = true;
    var tempRgb = [0, 0, 0];
    var SpineSprite = (function (_super) {
        __extends(SpineSprite, _super);
        function SpineSprite() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.region = null;
            return _this;
        }
        return SpineSprite;
    }(PIXI.Sprite));
    pixi_spine.SpineSprite = SpineSprite;
    var SpineMesh = (function (_super) {
        __extends(SpineMesh, _super);
        function SpineMesh(texture, vertices, uvs, indices, drawMode) {
            return _super.call(this, texture, vertices, uvs, indices, drawMode) || this;
        }
        return SpineMesh;
    }(PIXI.mesh.Mesh));
    pixi_spine.SpineMesh = SpineMesh;
    var Spine = (function (_super) {
        __extends(Spine, _super);
        function Spine(spineData) {
            var _this = _super.call(this) || this;
            if (!spineData) {
                throw new Error('The spineData param is required.');
            }
            if ((typeof spineData) === "string") {
                throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            }
            _this.spineData = spineData;
            _this.skeleton = new pixi_spine.core.Skeleton(spineData);
            _this.skeleton.updateWorldTransform();
            _this.stateData = new pixi_spine.core.AnimationStateData(spineData);
            _this.state = new pixi_spine.core.AnimationState(_this.stateData);
            _this.slotContainers = [];
            _this.tempClipContainers = [];
            for (var i = 0, n = _this.skeleton.slots.length; i < n; i++) {
                var slot = _this.skeleton.slots[i];
                var attachment = slot.attachment;
                var slotContainer = _this.newContainer();
                _this.slotContainers.push(slotContainer);
                _this.addChild(slotContainer);
                _this.tempClipContainers.push(null);
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var spriteName = attachment.region.name;
                    var sprite = _this.createSprite(slot, attachment, spriteName);
                    slot.currentSprite = sprite;
                    slot.currentSpriteName = spriteName;
                    slotContainer.addChild(sprite);
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    var mesh = _this.createMesh(slot, attachment);
                    slot.currentMesh = mesh;
                    slot.currentMeshName = attachment.name;
                    slotContainer.addChild(mesh);
                }
                else if (attachment instanceof pixi_spine.core.ClippingAttachment) {
                    _this.createGraphics(slot, attachment);
                    slotContainer.addChild(slot.clippingContainer);
                    slotContainer.addChild(slot.currentGraphics);
                }
                else {
                    continue;
                }
            }
            _this.autoUpdate = true;
            _this.tintRgb = new Float32Array([1, 1, 1]);
            return _this;
        }
        Object.defineProperty(Spine.prototype, "autoUpdate", {
            get: function () {
                return (this.updateTransform === Spine.prototype.autoUpdateTransform);
            },
            set: function (value) {
                this.updateTransform = value ? Spine.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spine.prototype, "tint", {
            get: function () {
                return PIXI.utils.rgb2hex(this.tintRgb);
            },
            set: function (value) {
                this.tintRgb = PIXI.utils.hex2rgb(value, this.tintRgb);
            },
            enumerable: true,
            configurable: true
        });
        Spine.prototype.update = function (dt) {
            this.state.update(dt);
            this.state.apply(this.skeleton);
            this.skeleton.updateWorldTransform();
            var slots = this.skeleton.slots;
            var globalClr = this.color;
            var light = null, dark = null;
            if (globalClr) {
                light = globalClr.light;
                dark = globalClr.dark;
            }
            else {
                light = this.tintRgb;
            }
            var thack = PIXI.TransformBase && (this.transformHack() == 1);
            for (var i = 0, n = slots.length; i < n; i++) {
                var slot = slots[i];
                var attachment = slot.attachment;
                var slotContainer = this.slotContainers[i];
                if (!attachment) {
                    slotContainer.visible = false;
                    continue;
                }
                var spriteColor = null;
                var attColor = attachment.color;
                if (attachment instanceof pixi_spine.core.RegionAttachment) {
                    var region = attachment.region;
                    if (region) {
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                            slot.currentMesh = null;
                            slot.currentMeshName = undefined;
                        }
                        var ar = region;
                        if (!slot.currentSpriteName || slot.currentSpriteName !== ar.name) {
                            var spriteName = ar.name;
                            if (slot.currentSprite) {
                                slot.currentSprite.visible = false;
                            }
                            slot.sprites = slot.sprites || {};
                            if (slot.sprites[spriteName] !== undefined) {
                                slot.sprites[spriteName].visible = true;
                            }
                            else {
                                var sprite = this.createSprite(slot, attachment, spriteName);
                                slotContainer.addChild(sprite);
                            }
                            slot.currentSprite = slot.sprites[spriteName];
                            slot.currentSpriteName = spriteName;
                        }
                    }
                    if (slotContainer.transform) {
                        var transform = slotContainer.transform;
                        var transAny = transform;
                        var lt = null;
                        if (transAny.matrix2d) {
                            lt = transAny.matrix2d;
                            transAny._dirtyVersion++;
                            transAny.version = transAny._dirtyVersion;
                            transAny.isStatic = true;
                            transAny.operMode = 0;
                        }
                        else {
                            if (thack) {
                                if (transAny.position) {
                                    transform = new PIXI.TransformBase();
                                    slotContainer.transform = transform;
                                }
                                lt = transform.localTransform;
                            }
                            else {
                                transAny.setFromMatrix(slot.bone.matrix);
                            }
                        }
                        if (lt) {
                            slot.bone.matrix.copy(lt);
                        }
                    }
                    else {
                        var lt = slotContainer.localTransform || new PIXI.Matrix();
                        slot.bone.matrix.copy(lt);
                        slotContainer.localTransform = lt;
                        slotContainer.displayObjectUpdateTransform = SlotContainerUpdateTransformV3;
                    }
                    if (slot.currentSprite.color) {
                        spriteColor = slot.currentSprite.color;
                    }
                    else {
                        tempRgb[0] = light[0] * slot.color.r * attColor.r;
                        tempRgb[1] = light[1] * slot.color.g * attColor.g;
                        tempRgb[2] = light[2] * slot.color.b * attColor.b;
                        slot.currentSprite.tint = PIXI.utils.rgb2hex(tempRgb);
                    }
                    slot.currentSprite.blendMode = slot.blendMode;
                }
                else if (attachment instanceof pixi_spine.core.MeshAttachment) {
                    if (slot.currentSprite) {
                        slot.currentSprite.visible = false;
                        slot.currentSprite = null;
                        slot.currentSpriteName = undefined;
                        if (slotContainer.transform) {
                            slotContainer.transform = new PIXI.TransformStatic();
                        }
                        else {
                            slotContainer.localTransform = new PIXI.Matrix();
                            slotContainer.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform;
                        }
                    }
                    if (!slot.currentMeshName || slot.currentMeshName !== attachment.name) {
                        var meshName = attachment.name;
                        if (slot.currentMesh) {
                            slot.currentMesh.visible = false;
                        }
                        slot.meshes = slot.meshes || {};
                        if (slot.meshes[meshName] !== undefined) {
                            slot.meshes[meshName].visible = true;
                        }
                        else {
                            var mesh = this.createMesh(slot, attachment);
                            slotContainer.addChild(mesh);
                        }
                        slot.currentMesh = slot.meshes[meshName];
                        slot.currentMeshName = meshName;
                    }
                    attachment.computeWorldVerticesOld(slot, slot.currentMesh.vertices);
                    if (slot.currentMesh.color) {
                        spriteColor = slot.currentMesh.color;
                    }
                    else if (PIXI.VERSION[0] !== '3') {
                        var tintRgb = slot.currentMesh.tintRgb;
                        tintRgb[0] = light[0] * slot.color.r * attColor.r;
                        tintRgb[1] = light[1] * slot.color.g * attColor.g;
                        tintRgb[2] = light[2] * slot.color.b * attColor.b;
                    }
                    slot.currentMesh.blendMode = slot.blendMode;
                }
                else if (attachment instanceof pixi_spine.core.ClippingAttachment) {
                    if (!slot.currentGraphics) {
                        this.createGraphics(slot, attachment);
                        slotContainer.addChild(slot.clippingContainer);
                        slotContainer.addChild(slot.currentGraphics);
                    }
                    this.updateGraphics(slot, attachment);
                }
                else {
                    slotContainer.visible = false;
                    continue;
                }
                slotContainer.visible = true;
                if (spriteColor) {
                    var r0 = slot.color.r * attColor.r;
                    var g0 = slot.color.g * attColor.g;
                    var b0 = slot.color.b * attColor.b;
                    spriteColor.setLight(light[0] * r0 + dark[0] * (1.0 - r0), light[1] * g0 + dark[1] * (1.0 - g0), light[2] * b0 + dark[2] * (1.0 - b0));
                    if (slot.darkColor) {
                        r0 = slot.darkColor.r;
                        g0 = slot.darkColor.g;
                        b0 = slot.darkColor.b;
                    }
                    else {
                        r0 = 0.0;
                        g0 = 0.0;
                        b0 = 0.0;
                    }
                    spriteColor.setDark(light[0] * r0 + dark[0] * (1 - r0), light[1] * g0 + dark[1] * (1 - g0), light[2] * b0 + dark[2] * (1 - b0));
                }
                slotContainer.alpha = slot.color.a;
            }
            var drawOrder = this.skeleton.drawOrder;
            var clippingAttachment = null;
            var clippingContainer = null;
            for (var i = 0, n = drawOrder.length; i < n; i++) {
                var slot = slots[drawOrder[i].data.index];
                var slotContainer = this.slotContainers[drawOrder[i].data.index];
                if (!clippingContainer) {
                    if (slotContainer.parent !== this) {
                        slotContainer.parent.removeChild(slotContainer);
                        slotContainer.parent = this;
                    }
                }
                if (slot.currentGraphics && slot.attachment) {
                    clippingContainer = slot.clippingContainer;
                    clippingAttachment = slot.attachment;
                    clippingContainer.children.length = 0;
                    this.children[i] = slotContainer;
                    if (clippingAttachment.endSlot == slot.data) {
                        clippingContainer.renderable = false;
                        clippingContainer = null;
                        clippingAttachment = null;
                    }
                }
                else {
                    if (clippingContainer) {
                        var c = this.tempClipContainers[i];
                        if (!c) {
                            c = this.tempClipContainers[i] = this.newContainer();
                            c.visible = false;
                        }
                        this.children[i] = c;
                        slotContainer.parent = null;
                        clippingContainer.addChild(slotContainer);
                        if (clippingAttachment.endSlot == slot.data) {
                            clippingContainer.renderable = true;
                            clippingContainer = null;
                            clippingAttachment = null;
                        }
                    }
                    else {
                        this.children[i] = slotContainer;
                    }
                }
            }
        };
        ;
        Spine.prototype.setSpriteRegion = function (attachment, sprite, region) {
            sprite.region = region;
            sprite.texture = region.texture;
            if (!region.size) {
                sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
                sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
            }
            else {
                sprite.scale.x = region.size.width / region.originalWidth;
                sprite.scale.y = -region.size.height / region.originalHeight;
            }
        };
        Spine.prototype.setMeshRegion = function (attachment, mesh, region) {
            mesh.region = region;
            mesh.texture = region.texture;
            region.texture._updateUvs();
            attachment.updateUVs(region, mesh.uvs);
            mesh.dirty++;
        };
        Spine.prototype.autoUpdateTransform = function () {
            if (Spine.globalAutoUpdate) {
                this.lastTime = this.lastTime || Date.now();
                var timeDelta = (Date.now() - this.lastTime) * 0.001;
                this.lastTime = Date.now();
                this.update(timeDelta);
            }
            else {
                this.lastTime = 0;
            }
            PIXI.Container.prototype.updateTransform.call(this);
        };
        ;
        Spine.prototype.createSprite = function (slot, attachment, defName) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var texture = region.texture;
            var sprite = this.newSprite(texture);
            sprite.rotation = attachment.rotation * pixi_spine.core.MathUtils.degRad;
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.position.x = attachment.x;
            sprite.position.y = attachment.y;
            sprite.alpha = attachment.color.a;
            sprite.region = attachment.region;
            this.setSpriteRegion(attachment, sprite, attachment.region);
            slot.sprites = slot.sprites || {};
            slot.sprites[defName] = sprite;
            return sprite;
        };
        ;
        Spine.prototype.createMesh = function (slot, attachment) {
            var region = attachment.region;
            if (slot.tempAttachment === attachment) {
                region = slot.tempRegion;
                slot.tempAttachment = null;
                slot.tempRegion = null;
            }
            var strip = this.newMesh(region.texture, new Float32Array(attachment.regionUVs.length), new Float32Array(attachment.regionUVs.length), new Uint16Array(attachment.triangles), PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
            strip.canvasPadding = 1.5;
            strip.alpha = attachment.color.a;
            strip.region = attachment.region;
            this.setMeshRegion(attachment, strip, region);
            slot.meshes = slot.meshes || {};
            slot.meshes[attachment.name] = strip;
            return strip;
        };
        ;
        Spine.prototype.createGraphics = function (slot, clip) {
            var graphics = this.newGraphics();
            var poly = new PIXI.Polygon([]);
            graphics.clear();
            graphics.beginFill(0xffffff, 1);
            graphics.drawPolygon(poly);
            graphics.renderable = false;
            slot.currentGraphics = graphics;
            slot.clippingContainer = this.newContainer();
            slot.clippingContainer.mask = slot.currentGraphics;
            return graphics;
        };
        Spine.prototype.updateGraphics = function (slot, clip) {
            var vertices = slot.currentGraphics.graphicsData[0].shape.points;
            var n = clip.worldVerticesLength;
            vertices.length = n;
            clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
            slot.currentGraphics.dirty++;
            slot.currentGraphics.clearDirty++;
        };
        Spine.prototype.hackTextureBySlotIndex = function (slotIndex, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var slot = this.skeleton.slots[slotIndex];
            if (!slot) {
                return false;
            }
            var attachment = slot.attachment;
            var region = attachment.region;
            if (texture) {
                region = new pixi_spine.core.TextureRegion();
                region.texture = texture;
                region.size = size;
            }
            if (slot.currentSprite && slot.currentSprite.region != region) {
                this.setSpriteRegion(attachment, slot.currentSprite, region);
                slot.currentSprite.region = region;
            }
            else if (slot.currentMesh && slot.currentMesh.region != region) {
                this.setMeshRegion(attachment, slot.currentMesh, region);
            }
            else {
                slot.tempRegion = region;
                slot.tempAttachment = attachment;
            }
            return true;
        };
        Spine.prototype.hackTextureBySlotName = function (slotName, texture, size) {
            if (texture === void 0) { texture = null; }
            if (size === void 0) { size = null; }
            var index = this.skeleton.findSlotIndex(slotName);
            if (index == -1) {
                return false;
            }
            return this.hackTextureBySlotIndex(index, texture, size);
        };
        Spine.prototype.newContainer = function () {
            return new PIXI.Container();
        };
        Spine.prototype.newSprite = function (tex) {
            return new SpineSprite(tex);
        };
        Spine.prototype.newGraphics = function () {
            return new PIXI.Graphics();
        };
        Spine.prototype.newMesh = function (texture, vertices, uvs, indices, drawMode) {
            return new SpineMesh(texture, vertices, uvs, indices, drawMode);
        };
        Spine.prototype.transformHack = function () {
            return 1;
        };
        Spine.globalAutoUpdate = true;
        Spine.clippingPolygon = [];
        return Spine;
    }(PIXI.Container));
    pixi_spine.Spine = Spine;
    function SlotContainerUpdateTransformV3() {
        var pt = this.parent.worldTransform;
        var wt = this.worldTransform;
        var lt = this.localTransform;
        wt.a = lt.a * pt.a + lt.b * pt.c;
        wt.b = lt.a * pt.b + lt.b * pt.d;
        wt.c = lt.c * pt.a + lt.d * pt.c;
        wt.d = lt.c * pt.b + lt.d * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;
        this.worldAlpha = this.alpha * this.parent.worldAlpha;
        this._currentBounds = null;
    }
})(pixi_spine || (pixi_spine = {}));
PIXI.spine = pixi_spine;
//# sourceMappingURL=pixi-spine.js.map