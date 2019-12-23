import Proton from "./core/Proton";
import Particle from "./core/Particle";
import Pool from "./core/Pool";

import Util from "./utils/Util";
import ColorUtil from "./utils/ColorUtil";
import MathUtil from "./math/MathUtil";
import Vector2D from "./math/Vector2D";
import Polar2D from "./math/Polar2D";
import Mat3 from "./math/Mat3";
import Span from "./math/Span";
import ArraySpan from "./math/ArraySpan";
import Rectangle from "./math/Rectangle";
import ease from "./math/ease";

import Rate from "./initialize/Rate";
import Initialize from "./initialize/Initialize";
import Life from "./initialize/Life";
import Position from "./initialize/Position";
import Velocity from "./initialize/Velocity";
import Mass from "./initialize/Mass";
import Radius from "./initialize/Radius";
import Body from "./initialize/Body";

import Behaviour from "./behaviour/Behaviour";
import Force from "./behaviour/Force";
import Attraction from "./behaviour/Attraction";
import RandomDrift from "./behaviour/RandomDrift";
import Gravity from "./behaviour/Gravity";
import Collision from "./behaviour/Collision";
import CrossZone from "./behaviour/CrossZone";
import Alpha from "./behaviour/Alpha";
import Scale from "./behaviour/Scale";
import Rotate from "./behaviour/Rotate";
import Color from "./behaviour/Color";
import Cyclone from "./behaviour/Cyclone";
import Repulsion from "./behaviour/Repulsion";
import GravityWell from "./behaviour/GravityWell";

import Emitter from "./emitter/Emitter";
import BehaviourEmitter from "./emitter/BehaviourEmitter";
import FollowEmitter from "./emitter/FollowEmitter";

import CanvasRenderer from "./render/CanvasRenderer";
import DomRenderer from "./render/DomRenderer";
import EaselRenderer from "./render/EaselRenderer";
import PixelRenderer from "./render/PixelRenderer";
import PixiRenderer from "./render/PixiRenderer";
import WebGLRenderer from "./render/WebGLRenderer";
import CustomRenderer from "./render/CustomRenderer";

import Zone from "./zone/Zone";
import LineZone from "./zone/LineZone";
import CircleZone from "./zone/CircleZone";
import PointZone from "./zone/PointZone";
import RectZone from "./zone/RectZone";
import ImageZone from "./zone/ImageZone";

import Debug from "./debug/Debug";

// namespace
Proton.Particle = Proton.P = Particle;
Proton.Pool = Pool;

Proton.Util = Util;
Proton.ColorUtil = ColorUtil;
Proton.MathUtil = MathUtil;
Proton.Vector2D = Proton.Vector = Vector2D;
Proton.Polar2D = Proton.Polar = Polar2D;
Proton.ArraySpan = ArraySpan;
Proton.Rectangle = Rectangle;
Proton.Rate = Rate;
Proton.ease = ease;
Proton.Span = Span;
Proton.Mat3 = Mat3;
Proton.getSpan = (a, b, center) => new Span(a, b, center);
Proton.createArraySpan = ArraySpan.createArraySpan;

Proton.Initialize = Proton.Init = Initialize;
Proton.Life = Proton.L = Life;
Proton.Position = Proton.P = Position;
Proton.Velocity = Proton.V = Velocity;
Proton.Mass = Proton.M = Mass;
Proton.Radius = Proton.R = Radius;
Proton.Body = Proton.B = Body;

Proton.Behaviour = Behaviour;
Proton.Force = Proton.F = Force;
Proton.Attraction = Proton.A = Attraction;
Proton.RandomDrift = Proton.RD = RandomDrift;
Proton.Gravity = Proton.G = Gravity;
Proton.Collision = Collision;
Proton.CrossZone = CrossZone;
Proton.Alpha = Proton.A = Alpha;
Proton.Scale = Proton.S = Scale;
Proton.Rotate = Rotate;
Proton.Color = Color;
Proton.Repulsion = Repulsion;
Proton.Cyclone = Cyclone;
Proton.GravityWell = GravityWell;

Proton.Emitter = Emitter;
Proton.BehaviourEmitter = BehaviourEmitter;
Proton.FollowEmitter = FollowEmitter;

Proton.Zone = Zone;
Proton.LineZone = LineZone;
Proton.CircleZone = CircleZone;
Proton.PointZone = PointZone;
Proton.RectZone = RectZone;
Proton.ImageZone = ImageZone;

Proton.CanvasRenderer = CanvasRenderer;
Proton.DomRenderer = DomRenderer;
Proton.EaselRenderer = EaselRenderer;
Proton.PixiRenderer = PixiRenderer;
Proton.PixelRenderer = PixelRenderer;
Proton.WebGLRenderer = Proton.WebGlRenderer = WebGLRenderer;
Proton.CustomRenderer = CustomRenderer;

Proton.Debug = Debug;
Util.assign(Proton, ease);

// export
export default Proton;
