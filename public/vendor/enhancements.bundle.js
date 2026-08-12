//#region node_modules/motion-utils/dist/es/array.mjs
function e(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function t(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var n = (e, t, n) => n > t ? t : n < e ? e : n;
//#endregion
//#region node_modules/motion-utils/dist/es/format-error-message.mjs
function r(e, t) {
	return t ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${t}` : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/errors.mjs
var i = () => {}, a = () => {};
typeof process < "u" && process.env.NODE_ENV !== "production" && (i = (e, t, n) => {
	!e && typeof console < "u" && console.warn(r(t, n));
}, a = (e, t, n) => {
	if (!e) throw Error(r(t, n));
});
//#endregion
//#region node_modules/motion-utils/dist/es/global-config.mjs
var o = {}, s = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), c = (e) => typeof e == "object" && !!e, l = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function u(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var d = /* @__NO_SIDE_EFFECTS__ */ (e) => e, f = (...e) => e.reduce((e, t) => (n) => t(e(n))), p = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, m = class {
	constructor() {
		this.subscriptions = [];
	}
	add(n) {
		return e(this.subscriptions, n), () => t(this.subscriptions, n);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) {
			if (r === 1) this.subscriptions[0](e, t, n);
			else for (let i = 0; i < r; i++) {
				let r = this.subscriptions[i];
				r && r(e, t, n);
			}
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, h = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, g = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, _ = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, v = /* @__PURE__ */ new Set();
function y(e, t, n) {
	e || v.has(t) || (console.warn(r(t, n)), v.add(t));
}
//#endregion
//#region node_modules/motion-utils/dist/es/wrap.mjs
var b = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, x = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, S = 1e-7, C = 12;
function w(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = x(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > S && ++s < C);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function T(e, t, n, r) {
	if (e === t && n === r) return d;
	let i = (t) => w(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : x(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var E = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, D = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), O = /*@__PURE__*/ T(.33, 1.53, .69, .99), k = /*@__PURE__*/ D(O), ee = /*@__PURE__*/ E(k), A = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * k(e) : .5 * (2 - 2 ** (-10 * (e - 1))), te = (e) => 1 - Math.sin(Math.acos(e)), j = /* @__PURE__ */ D(te), M = /* @__PURE__ */ E(te), N = /*@__PURE__*/ T(.42, 0, 1, 1), ne = /*@__PURE__*/ T(0, 0, .58, 1), re = /*@__PURE__*/ T(.42, 0, .58, 1), ie = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function ae(e, t) {
	return /* @__PURE__ */ ie(e) ? e[b(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var oe = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", se = {
	linear: d,
	easeIn: N,
	easeInOut: re,
	easeOut: ne,
	circIn: te,
	circInOut: M,
	circOut: j,
	backIn: k,
	backInOut: ee,
	backOut: O,
	anticipate: A
}, ce = (e) => typeof e == "string", le = (e) => {
	if (/* @__PURE__ */ oe(e)) {
		a(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [t, n, r, i] = e;
		return /* @__PURE__ */ T(t, n, r, i);
	}
	return ce(e) ? (a(se[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), se[e]) : e;
}, ue = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function de(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new WeakSet(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (c.schedule(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var fe = 40;
function pe(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, s = ue.reduce((e, t) => (e[t] = de(a), e), {}), { setup: c, read: l, resolveKeyframes: u, preUpdate: d, update: f, preRender: p, render: m, postRender: h } = s, g = () => {
		let a = o.useManualTiming, s = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(s - i.timestamp, fe), 1)), i.timestamp = s, i.isProcessing = !0, c.process(i), l.process(i), u.process(i), d.process(i), f.process(i), p.process(i), m.process(i), h.process(i), i.isProcessing = !1, n && t && (r = !1, e(g));
	}, _ = () => {
		n = !0, r = !0, i.isProcessing || e(g);
	};
	return {
		schedule: ue.reduce((e, t) => {
			let r = s[t];
			return e[t] = (e, t = !1, i = !1) => (n || _(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < ue.length; t++) s[ue[t]].cancel(e);
		},
		state: i,
		steps: s
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: P, cancel: me, state: he, steps: ge } = /* @__PURE__ */ pe(typeof requestAnimationFrame < "u" ? requestAnimationFrame : d, !0), _e;
function ve() {
	_e = void 0;
}
var F = {
	now: () => (_e === void 0 && F.set(he.isProcessing || o.useManualTiming ? he.timestamp : performance.now()), _e),
	set: (e) => {
		_e = e, queueMicrotask(ve);
	}
}, ye = (e) => (t) => typeof t == "string" && t.startsWith(e), be = /*@__PURE__*/ ye("--"), xe = /*@__PURE__*/ ye("var(--"), Se = (e) => xe(e) ? Ce.test(e.split("/*")[0].trim()) : !1, Ce = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function we(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var Te = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, Ee = {
	...Te,
	transform: (e) => n(0, 1, e)
}, De = {
	...Te,
	default: 1
}, Oe = (e) => Math.round(e * 1e5) / 1e5, ke = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function Ae(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var je = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Me = (e, t) => (n) => !!(typeof n == "string" && je.test(n) && n.startsWith(e) || t && !Ae(n) && Object.prototype.hasOwnProperty.call(n, t)), Ne = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ke);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, Pe = (e) => n(0, 255, e), Fe = {
	...Te,
	transform: (e) => Math.round(Pe(e))
}, I = {
	test: /*@__PURE__*/ Me("rgb", "red"),
	parse: /*@__PURE__*/ Ne("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Fe.transform(e) + ", " + Fe.transform(t) + ", " + Fe.transform(n) + ", " + Oe(Ee.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function Ie(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var Le = {
	test: /*@__PURE__*/ Me("#"),
	parse: Ie,
	transform: I.transform
}, Re = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), L = /*@__PURE__*/ Re("deg"), ze = /*@__PURE__*/ Re("%"), R = /*@__PURE__*/ Re("px"), Be = /*@__PURE__*/ Re("vh"), Ve = /*@__PURE__*/ Re("vw"), He = {
	...ze,
	parse: (e) => ze.parse(e) / 100,
	transform: (e) => ze.transform(e * 100)
}, Ue = {
	test: /*@__PURE__*/ Me("hsl", "hue"),
	parse: /*@__PURE__*/ Ne("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + ze.transform(Oe(t)) + ", " + ze.transform(Oe(n)) + ", " + Oe(Ee.transform(r)) + ")"
}, z = {
	test: (e) => I.test(e) || Le.test(e) || Ue.test(e),
	parse: (e) => I.test(e) ? I.parse(e) : Ue.test(e) ? Ue.parse(e) : Le.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? I.transform(e) : Ue.transform(e),
	getAnimatableNone: (e) => {
		let t = z.parse(e);
		return t.alpha = 0, z.transform(t);
	}
}, We = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function Ge(e) {
	return isNaN(e) && typeof e == "string" && (e.match(ke)?.length || 0) + (e.match(We)?.length || 0) > 0;
}
var Ke = "number", qe = "color", Je = "var", Ye = "var(", Xe = "${}", Ze = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function Qe(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Ze, (e) => (z.test(e) ? (r.color.push(a), i.push(qe), n.push(z.parse(e))) : e.startsWith(Ye) ? (r.var.push(a), i.push(Je), n.push(e)) : (r.number.push(a), i.push(Ke), n.push(parseFloat(e))), ++a, Xe)).split(Xe),
		indexes: r,
		types: i
	};
}
function $e(e) {
	return Qe(e).values;
}
function et({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Ke ? Oe(r[a]) : e === qe ? z.transform(r[a]) : r[a];
		}
		return i;
	};
}
function tt(e) {
	return et(Qe(e));
}
var nt = (e) => typeof e == "number" ? 0 : z.test(e) ? z.getAnimatableNone(e) : e, rt = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : nt(e);
function it(e) {
	let t = Qe(e);
	return et(t)(t.values.map((e, n) => rt(e, t.split[n])));
}
var B = {
	test: Ge,
	parse: $e,
	createTransformer: tt,
	getAnimatableNone: it
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function at(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function ot({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = at(s, r, e + 1 / 3), a = at(s, r, e), o = at(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function st(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var ct = (e, t, n) => e + (t - e) * n, lt = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, ut = [
	Le,
	I,
	Ue
], dt = (e) => ut.find((t) => t.test(e));
function ft(e) {
	let t = dt(e);
	if (i(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !t) return !1;
	let n = t.parse(e);
	return t === Ue && (n = ot(n)), n;
}
var pt = (e, t) => {
	let n = ft(e), r = ft(t);
	if (!n || !r) return st(e, t);
	let i = { ...n };
	return (e) => (i.red = lt(n.red, r.red, e), i.green = lt(n.green, r.green, e), i.blue = lt(n.blue, r.blue, e), i.alpha = ct(n.alpha, r.alpha, e), I.transform(i));
}, mt = /* @__PURE__ */ new Set(["none", "hidden"]);
function ht(e, t) {
	return mt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function gt(e, t) {
	return (n) => ct(e, t, n);
}
function _t(e) {
	return typeof e == "number" ? gt : typeof e == "string" ? Se(e) ? st : z.test(e) ? pt : xt : Array.isArray(e) ? vt : typeof e == "object" ? z.test(e) ? pt : yt : st;
}
function vt(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => _t(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function yt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = _t(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function bt(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]], s = e.values[o] ?? 0;
		n[i] = s, r[a]++;
	}
	return n;
}
var xt = (e, t) => {
	let n = B.createTransformer(t), r = Qe(e), a = Qe(t);
	return r.indexes.var.length === a.indexes.var.length && r.indexes.color.length === a.indexes.color.length && r.indexes.number.length >= a.indexes.number.length ? mt.has(e) && !a.values.length || mt.has(t) && !r.values.length ? ht(e, t) : f(vt(bt(r, a), a.values), n) : (i(!0, `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), st(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function St(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? ct(e, t, n) : _t(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var Ct = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => P.update(t, e),
		stop: () => me(t),
		now: () => he.isProcessing ? he.timestamp : F.now()
	};
}, wt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Tt = 2e4;
function Et(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Dt(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(Et(r), Tt);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ g(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var V = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function Ot(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var kt = 12;
function At(e, t, n) {
	let r = n;
	for (let n = 1; n < kt; n++) r -= e(r) / t(r);
	return r;
}
var jt = .001;
function Mt({ duration: e = V.duration, bounce: t = V.bounce, velocity: r = V.velocity, mass: a = V.mass }) {
	let o, s;
	i(e <= /* @__PURE__ */ h(V.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let c = 1 - t;
	c = n(V.minDamping, V.maxDamping, c), e = n(V.minDuration, V.maxDuration, /* @__PURE__ */ g(e)), c < 1 ? (o = (t) => {
		let n = t * c, i = n * e, a = n - r, o = Ot(t, c), s = Math.exp(-i);
		return jt - a / o * s;
	}, s = (t) => {
		let n = t * c * e, i = n * r + r, a = c ** 2 * t ** 2 * e, s = Math.exp(-n), l = Ot(t ** 2, c);
		return (-o(t) + jt > 0 ? -1 : 1) * ((i - a) * s) / l;
	}) : (o = (t) => -.001 + Math.exp(-t * e) * ((t - r) * e + 1), s = (t) => Math.exp(-t * e) * ((r - t) * (e * e)));
	let l = 5 / e, u = At(o, s, l);
	if (e = /* @__PURE__ */ h(e), isNaN(u)) return {
		stiffness: V.stiffness,
		damping: V.damping,
		duration: e
	};
	{
		let t = u ** 2 * a;
		return {
			stiffness: t,
			damping: c * 2 * Math.sqrt(a * t),
			duration: e
		};
	}
}
var Nt = ["duration", "bounce"], Pt = [
	"stiffness",
	"damping",
	"mass"
];
function Ft(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function It(e) {
	let t = {
		velocity: V.velocity,
		stiffness: V.stiffness,
		damping: V.damping,
		mass: V.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Ft(e, Pt) && Ft(e, Nt)) {
		if (t.velocity = 0, e.visualDuration) {
			let r = e.visualDuration, i = 2 * Math.PI / (r * 1.2), a = i * i, o = 2 * n(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a);
			t = {
				...t,
				mass: V.mass,
				stiffness: a,
				damping: o
			};
		} else {
			let n = Mt({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: V.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function Lt(e = V.visualDuration, t = V.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: f, isResolvedFromDuration: p } = It({
		...n,
		velocity: -/* @__PURE__ */ g(n.velocity || 0)
	}), m = f || 0, _ = l / (2 * Math.sqrt(c * u)), v = o - a, y = /* @__PURE__ */ g(Math.sqrt(c / u)), b = Math.abs(v) < 5;
	r ||= b ? V.restSpeed.granular : V.restSpeed.default, i ||= b ? V.restDelta.granular : V.restDelta.default;
	let x, S, C, w, T, E;
	if (_ < 1) C = Ot(y, _), w = (m + _ * y * v) / C, x = (e) => {
		let t = Math.exp(-_ * y * e);
		return o - t * (w * Math.sin(C * e) + v * Math.cos(C * e));
	}, T = _ * y * w + v * C, E = _ * y * v - w * C, S = (e) => Math.exp(-_ * y * e) * (T * Math.sin(C * e) + E * Math.cos(C * e));
	else if (_ === 1) {
		x = (e) => o - Math.exp(-y * e) * (v + (m + y * v) * e);
		let e = m + y * v;
		S = (t) => Math.exp(-y * t) * (y * e * t - m);
	} else {
		let e = y * Math.sqrt(_ * _ - 1);
		x = (t) => {
			let n = Math.exp(-_ * y * t), r = Math.min(e * t, 300);
			return o - n * ((m + _ * y * v) * Math.sinh(r) + e * v * Math.cosh(r)) / e;
		};
		let t = (m + _ * y * v) / e, n = _ * y * t - v * e, r = _ * y * v - t * e;
		S = (t) => {
			let i = Math.exp(-_ * y * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let D = {
		calculatedDuration: p && d || null,
		velocity: (e) => /* @__PURE__ */ h(S(e)),
		next: (e) => {
			if (!p && _ < 1) {
				let t = Math.exp(-_ * y * e), n = Math.sin(C * e), a = Math.cos(C * e), c = o - t * (w * n + v * a), l = /* @__PURE__ */ h(t * (T * n + E * a));
				return s.done = Math.abs(l) <= r && Math.abs(o - c) <= i, s.value = s.done ? o : c, s;
			}
			let t = x(e);
			if (p) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ h(S(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(Et(D), Tt), t = wt((t) => D.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return D;
}
Lt.applyToOptions = (e) => {
	let t = Dt(e, 100, Lt);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ h(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var Rt = 5;
function zt(e, t, n) {
	let r = Math.max(t - Rt, 0);
	return /* @__PURE__ */ _(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function Bt({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = Lt({
			keyframes: [f.value, m(f.value)],
			velocity: zt(y, e, f.value),
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return C(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !S && x === void 0 && (t = !0, b(e), C(e)), x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function Vt(e, t, n) {
	let r = [], i = n || o.mix || St, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = f(Array.isArray(t) ? t[n] || d : t, a)), r.push(a);
	}
	return r;
}
function Ht(e, t, { clamp: r = !0, ease: i, mixer: o } = {}) {
	let s = e.length;
	if (a(s === t.length, "Both input and output ranges must be the same length", "range-length"), s === 1) return () => t[0];
	if (s === 2 && t[0] === t[1]) return () => t[1];
	let c = e[0] === e[1];
	e[0] > e[s - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let l = Vt(t, i, o), u = l.length, d = (n) => {
		if (c && n < e[0]) return t[0];
		let r = 0;
		if (u > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ p(e[r], e[r + 1], n);
		return l[r](i);
	};
	return r ? (t) => d(n(e[0], e[s - 1], t)) : d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Ut(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ p(0, t, r);
		e.push(ct(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Wt(e) {
	let t = [0];
	return Ut(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Gt(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function Kt(e, t) {
	return e.map(() => t || re).splice(0, e.length - 1);
}
function H({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ ie(r) ? r.map(le) : le(r), a = {
		done: !1,
		value: t[0]
	}, o = Ht(Gt(n && n.length === t.length ? n : Wt(t), e), t, { ease: Array.isArray(i) ? i : Kt(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var qt = (e) => e !== null;
function Jt(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(qt), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var Yt = {
	decay: Bt,
	inertia: Bt,
	tween: H,
	keyframes: H,
	spring: Lt
};
function Xt(e) {
	typeof e.type == "string" && (e.type = Yt[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Zt = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, Qt = (e) => e / 100, $t = class extends Zt {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== F.now() && this.tick(F.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		Xt(e);
		let { type: t = H, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: o = 0 } = e, { keyframes: s } = e, c = t || H;
		process.env.NODE_ENV !== "production" && c !== H && a(s.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${s}`, "spring-two-frames"), c !== H && typeof s[0] != "number" && (this.mixKeyframes = f(Qt, St(s[0], s[1])), s = [0, 100]);
		let l = c({
			...e,
			keyframes: s
		});
		i === "mirror" && (this.mirroredGenerator = c({
			...e,
			keyframes: [...s].reverse(),
			velocity: -o
		})), l.calculatedDuration === null && (l.calculatedDuration = Et(l));
		let { calculatedDuration: u } = l;
		this.calculatedDuration = u, this.resolvedDuration = u + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = l;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.currentTime = this.holdTime === null ? t : this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: r, totalDuration: i, mixKeyframes: a, mirroredGenerator: o, resolvedDuration: s, calculatedDuration: c } = this;
		if (this.startTime === null) return r.next(0);
		let { delay: l = 0, keyframes: u, repeat: d, repeatType: f, repeatDelay: p, type: m, onUpdate: h, finalKeyframe: g } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - i / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let _ = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? _ < 0 : _ > i;
		this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = i);
		let y = this.currentTime, b = r;
		if (d) {
			let e = Math.min(this.currentTime, i) / s, t = Math.floor(e), r = e % 1;
			!r && e >= 1 && (r = 1), r === 1 && t--, t = Math.min(t, d + 1), t % 2 && (f === "reverse" ? (r = 1 - r, p && (r -= p / s)) : f === "mirror" && (b = o)), y = n(0, 1, r) * s;
		}
		let x;
		v ? (this.delayState.value = u[0], x = this.delayState) : x = b.next(y), a && !v && (x.value = a(x.value));
		let { done: S } = x;
		!v && c !== null && (S = this.playbackSpeed >= 0 ? this.currentTime >= i : this.currentTime <= 0);
		let C = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
		return C && m !== Bt && (x.value = Jt(u, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ g(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ g(e);
	}
	get time() {
		return /* @__PURE__ */ g(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ h(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return zt((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(F.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ g(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = Ct, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(F.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function en(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var U = (e) => e * 180 / Math.PI, tn = (e) => rn(U(Math.atan2(e[1], e[0]))), nn = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: tn,
	rotateZ: tn,
	skewX: (e) => U(Math.atan(e[1])),
	skewY: (e) => U(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, rn = (e) => (e %= 360, e < 0 && (e += 360), e), an = tn, on = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), sn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), cn = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: on,
	scaleY: sn,
	scale: (e) => (on(e) + sn(e)) / 2,
	rotateX: (e) => rn(U(Math.atan2(e[6], e[5]))),
	rotateY: (e) => rn(U(Math.atan2(-e[2], e[0]))),
	rotateZ: an,
	rotate: an,
	skewX: (e) => U(Math.atan(e[4])),
	skewY: (e) => U(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function ln(e) {
	return +!!e.includes("scale");
}
function un(e, t) {
	if (!e || e === "none") return ln(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = cn, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = nn, i = t;
	}
	if (!i) return ln(t);
	let a = r[t], o = i[1].split(",").map(fn);
	return typeof a == "function" ? a(o) : o[a];
}
var dn = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return un(n, t);
};
function fn(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var W = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], pn = /* @__PURE__ */ new Set([...W, "pathRotation"]), mn = (e) => e === Te || e === R, hn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), gn = W.filter((e) => !hn.has(e));
function _n(e) {
	let t = [];
	return gn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var G = {
	width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => un(t, "x"),
	y: (e, { transform: t }) => un(t, "y")
};
G.translateX = G.x, G.translateY = G.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var K = /* @__PURE__ */ new Set(), vn = !1, yn = !1, bn = !1;
function xn() {
	if (yn) {
		let e = Array.from(K).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = _n(e);
			t.length && (n.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = n.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	yn = !1, vn = !1, K.forEach((e) => e.complete(bn)), K.clear();
}
function Sn() {
	K.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (yn = !0);
	});
}
function Cn() {
	bn = !0, Sn(), xn(), bn = !1;
}
var wn = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (K.add(this), vn || (vn = !0, P.read(Sn), P.resolveKeyframes(xn))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = n.readValue(t, a);
				r != null && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		en(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), K.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (K.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, Tn = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function En(e, t, n) {
	Tn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Dn = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function On(e, t) {
	let n = /* @__PURE__ */ u(e);
	return () => Dn[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var kn = /* @__PURE__ */ On(() => window.ScrollTimeline !== void 0, "scrollTimeline"), An = /* @__PURE__ */ On(() => window.ViewTimeline !== void 0, "viewTimeline"), jn = /*@__PURE__*/ On(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Mn = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Nn = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Mn([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Mn([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Mn([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Mn([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function Pn(e, t) {
	if (e) return typeof e == "function" ? jn() ? wt(e, t) : "ease-out" : /* @__PURE__ */ oe(e) ? Mn(e) : Array.isArray(e) ? e.map((e) => Pn(e, t) || Nn.easeOut) : Nn[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function Fn(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = Pn(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function In(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Ln({ type: e, ...t }) {
	return In(e) && jn() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Rn = class extends Zt {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: o = !1, finalKeyframe: s, onComplete: c } = e;
		this.isPseudoElement = !!i, this.allowFlatten = o, this.options = e, a(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let l = Ln(e);
		this.animation = Fn(t, n, r, l, i), l.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Jt(r, this.options, s, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), En(t, n, e), this.animation.cancel();
			}
			c?.(), this.notifyFinished();
		};
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ g(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ g(e);
	}
	get time() {
		return /* @__PURE__ */ g(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ h(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && kn() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), d) : r(this);
	}
}, zn = {
	anticipate: A,
	backInOut: ee,
	circInOut: M
};
function Bn(e) {
	return e in zn;
}
function Vn(e) {
	typeof e.ease == "string" && Bn(e.ease) && (e.ease = zn[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var Hn = 10, Un = class extends Rn {
	constructor(e) {
		Vn(e), Xt(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: r, onComplete: i, element: a, ...o } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let s = new $t({
			...o,
			autoplay: !1
		}), c = Math.max(Hn, F.now() - this.startTime), l = n(0, Hn, c - Hn), u = s.sample(c).value, { name: d } = this.options;
		a && d && En(a, d, u), t.setWithVelocity(s.sample(Math.max(0, c - l)).value, u, l), s.stop();
	}
}, Wn = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (B.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function Gn(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Kn(e, t, n, r) {
	let a = e[0];
	if (a === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let o = e[e.length - 1], s = Wn(a, t), c = Wn(o, t);
	return i(s === c, `You are trying to animate ${t} from "${a}" to "${o}". "${s ? o : a}" is not an animatable value.`, "value-not-animatable"), !s || !c ? !1 : Gn(e) || (n === "spring" || In(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function qn(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var Jn = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Yn = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Xn(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Yn.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var Zn = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), Qn = /*@__PURE__*/ u(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function $n(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Qn() && n && (Jn.has(n) || Zn.has(n) && Xn(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var er = 40, tr = class extends Zt {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = F.now();
		let d = {
			autoplay: e,
			delay: t,
			type: n,
			repeat: r,
			repeatDelay: i,
			repeatType: a,
			name: s,
			motionValue: c,
			element: l,
			...u
		}, f = l?.KeyframeResolver || wn;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: s, delay: c, isHandoff: l, onUpdate: u } = n;
		this.resolvedAt = F.now();
		let f = !0;
		Kn(e, i, a, s) || (f = !1, (o.instantAnimations || !c) && u?.(Jt(e, n, t)), e[0] = e[e.length - 1], qn(n), n.repeat = 0);
		let p = {
			startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > er ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, m = f && !l && $n(p), h = p.motionValue?.owner?.current, g;
		if (m) try {
			g = new Un({
				...p,
				element: h
			});
		} catch {
			g = new $t(p);
		}
		else g = new $t(p);
		g.finished.then(() => {
			this.notifyFinished();
		}).catch(d), this.pendingTimeline &&= (this.stopTimeline = g.attachTimeline(this.pendingTimeline), void 0), this._animation = g;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), Cn()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, nr = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return rr(this.animations, "duration");
	}
	get iterationDuration() {
		return rr(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function rr(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var ir = class extends nr {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, ar = 30, or = (e) => !isNaN(parseFloat(e)), sr = { current: void 0 }, cr = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = F.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = F.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = or(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && y(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new m());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), P.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : n;
	}
	clearListeners() {
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return sr.current && sr.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = F.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > ar) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, ar);
		return /* @__PURE__ */ _(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0, this.animation = e(t), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function q(e, t) {
	return new cr(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function lr(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function ur(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : lr(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var dr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, fr = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), pr = {
	type: "keyframes",
	duration: .8
}, mr = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, hr = (e, { keyframes: t }) => t.length > 2 ? pr : pn.has(e) ? e.startsWith("scale") ? fr(t[1]) : dr : mr, gr = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function _r(e) {
	for (let t in e) if (!gr.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var vr = (e, t, n, r = {}, i, a) => (s) => {
	let c = ur(r, e) || {}, l = c.delay || r.delay || 0, { elapsed: u = 0 } = r;
	u -= /* @__PURE__ */ h(l);
	let d = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...c,
		delay: -u,
		onUpdate: (e) => {
			t.set(e), c.onUpdate && c.onUpdate(e);
		},
		onComplete: () => {
			s(), c.onComplete && c.onComplete();
		},
		name: e,
		motionValue: t,
		element: a ? void 0 : i
	};
	_r(c) || Object.assign(d, hr(e, d)), d.duration &&= /* @__PURE__ */ h(d.duration), d.repeatDelay &&= /* @__PURE__ */ h(d.repeatDelay), d.from !== void 0 && (d.keyframes[0] = d.from);
	let f = !1;
	if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (qn(d), d.delay === 0 && (f = !0)), (o.instantAnimations || o.skipAnimations || i?.shouldSkipAnimations || c.skipAnimations) && (f = !0, qn(d), d.delay = 0), d.allowFlatten = !c.type && !c.ease, f && !a && t.get() !== void 0) {
		let e = Jt(d.keyframes, c);
		if (e !== void 0) {
			P.update(() => {
				d.onUpdate(e), d.onComplete();
			});
			return;
		}
	}
	return c.isSync ? new $t(d) : new tr(d);
}, yr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function br(e) {
	let t = yr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
var xr = 4;
function Sr(e, t, n = 1) {
	a(n <= xr, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [r, i] = br(e);
	if (!r) return;
	let o = window.getComputedStyle(t).getPropertyValue(r);
	if (o) {
		let e = o.trim();
		return s(e) ? parseFloat(e) : e;
	}
	return Se(i) ? Sr(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function Cr(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function wr(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = Cr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = Cr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function Tr(e, t, n) {
	let r = e.getProps();
	return wr(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var Er = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...W
]), Dr = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Or(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, q(n));
}
function kr(e) {
	return Dr(e) ? e[e.length - 1] || 0 : e;
}
function Ar(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = Tr(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Or(e, t, kr(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var J = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function jr(e) {
	return !!(J(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Mr(e, t) {
	let n = e.getValue("willChange");
	if (jr(n)) return n.add(t);
	if (!n && o.WillChange) {
		let n = new o.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Nr(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var Pr = "data-" + Nr("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Fr(e) {
	return e.props[Pr];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function Ir({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function Lr(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? lr(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && Ir(f, t)) continue;
		let o = {
			delay: n,
			...ur(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			P.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (window.MotionHandoffAnimation) {
			let n = Fr(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, P);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Mr(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(vr(t, r, i, m && Er.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => P.update(() => {
			o && Ar(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var Rr = {
	test: (e) => e === "auto",
	parse: (e) => e
}, zr = (e) => (t) => t.test(e), Br = [
	Te,
	R,
	ze,
	L,
	Ve,
	Be,
	Rr
], Vr = (e) => Br.find(zr(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Hr(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || l(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var Ur = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function Wr(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ke) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!Ur.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Gr = /\b([a-z-]*)\(.*?\)/gu, Kr = {
	...B,
	getAnimatableNone: (e) => {
		let t = e.match(Gr);
		return t ? t.map(Wr).join(" ") : e;
	}
}, qr = {
	...B,
	getAnimatableNone: (e) => {
		let t = B.parse(e);
		return B.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Jr = {
	...Te,
	transform: Math.round
}, Yr = {
	borderWidth: R,
	borderTopWidth: R,
	borderRightWidth: R,
	borderBottomWidth: R,
	borderLeftWidth: R,
	borderRadius: R,
	borderTopLeftRadius: R,
	borderTopRightRadius: R,
	borderBottomRightRadius: R,
	borderBottomLeftRadius: R,
	width: R,
	maxWidth: R,
	height: R,
	maxHeight: R,
	top: R,
	right: R,
	bottom: R,
	left: R,
	inset: R,
	insetBlock: R,
	insetBlockStart: R,
	insetBlockEnd: R,
	insetInline: R,
	insetInlineStart: R,
	insetInlineEnd: R,
	padding: R,
	paddingTop: R,
	paddingRight: R,
	paddingBottom: R,
	paddingLeft: R,
	paddingBlock: R,
	paddingBlockStart: R,
	paddingBlockEnd: R,
	paddingInline: R,
	paddingInlineStart: R,
	paddingInlineEnd: R,
	margin: R,
	marginTop: R,
	marginRight: R,
	marginBottom: R,
	marginLeft: R,
	marginBlock: R,
	marginBlockStart: R,
	marginBlockEnd: R,
	marginInline: R,
	marginInlineStart: R,
	marginInlineEnd: R,
	fontSize: R,
	backgroundPositionX: R,
	backgroundPositionY: R,
	rotate: L,
	pathRotation: L,
	rotateX: L,
	rotateY: L,
	rotateZ: L,
	scale: De,
	scaleX: De,
	scaleY: De,
	scaleZ: De,
	skew: L,
	skewX: L,
	skewY: L,
	distance: R,
	translateX: R,
	translateY: R,
	translateZ: R,
	x: R,
	y: R,
	z: R,
	perspective: R,
	transformPerspective: R,
	opacity: Ee,
	originX: He,
	originY: He,
	originZ: R,
	zIndex: Jr,
	fillOpacity: Ee,
	strokeOpacity: Ee,
	numOctaves: Jr
}, Xr = {
	...Yr,
	color: z,
	backgroundColor: z,
	outlineColor: z,
	fill: z,
	stroke: z,
	borderColor: z,
	borderTopColor: z,
	borderRightColor: z,
	borderBottomColor: z,
	borderLeftColor: z,
	filter: Kr,
	WebkitFilter: Kr,
	mask: qr,
	WebkitMask: qr
}, Zr = (e) => Xr[e], Qr = /*@__PURE__*/ new Set([Kr, qr]);
function $r(e, t) {
	let n = Zr(e);
	return Qr.has(n) || (n = B), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var ei = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function ti(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !ei.has(t) && Qe(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = $r(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var ni = class extends wn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), Se(r))) {
				let i = Sr(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !Er.has(n) || e.length !== 2) return;
		let [r, i] = e, a = Vr(r), o = Vr(i);
		if (we(r) !== we(i) && G[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (mn(a) && mn(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else G[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Hr(e[t])) && n.push(t);
		n.length && ti(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = G[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = G[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, ri = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function ii(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/get-as-type.mjs
var ai = (e, t) => t && typeof e == "number" ? t.transform(e) : e;
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-html-element.mjs
function oi(e) {
	return c(e) && "offsetHeight" in e && !("ownerSVGElement" in e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/microtask.mjs
var { schedule: si, cancel: ci } = /* @__PURE__ */ pe(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function li(e) {
	return c(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-element.mjs
var ui = /* @__PURE__ */ new WeakMap(), di, fi = (e, t, n) => (r, i) => i && i[0] ? i[0][e + "Size"] : li(r) && "getBBox" in r ? r.getBBox()[t] : r[n], pi = /*@__PURE__*/ fi("inline", "width", "offsetWidth"), mi = /*@__PURE__*/ fi("block", "height", "offsetHeight");
function hi({ target: e, borderBoxSize: t }) {
	ui.get(e)?.forEach((n) => {
		n(e, {
			get width() {
				return pi(e, t);
			},
			get height() {
				return mi(e, t);
			}
		});
	});
}
function gi(e) {
	e.forEach(hi);
}
function _i() {
	typeof ResizeObserver > "u" || (di = new ResizeObserver(gi));
}
function vi(e, t) {
	di || _i();
	let n = ii(e);
	return n.forEach((e) => {
		let n = ui.get(e);
		n || (n = /* @__PURE__ */ new Set(), ui.set(e, n)), n.add(t), di?.observe(e);
	}), () => {
		n.forEach((e) => {
			let n = ui.get(e);
			n?.delete(t), n?.size || di?.unobserve(e);
		});
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/handle-window.mjs
var yi = /* @__PURE__ */ new Set(), bi;
function xi() {
	bi = () => {
		let e = {
			get width() {
				return window.innerWidth;
			},
			get height() {
				return window.innerHeight;
			}
		};
		yi.forEach((t) => t(e));
	}, window.addEventListener("resize", bi);
}
function Si(e) {
	return yi.add(e), bi || xi(), () => {
		yi.delete(e), !yi.size && typeof bi == "function" && (window.removeEventListener("resize", bi), bi = void 0);
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/resize/index.mjs
function Ci(e, t) {
	return typeof e == "function" ? Si(e) : vi(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/scroll/observe.mjs
function wi(e, t) {
	let n, r = () => {
		let { currentTime: r } = t, i = (r === null ? 0 : r.value) / 100;
		n !== i && e(i), n = i;
	};
	return P.preUpdate(r, !0), () => me(r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function Ti(e) {
	return li(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var Ei = [
	...Br,
	z,
	B
], Di = (e) => Ei.find(zr(e)), Oi = () => ({
	min: 0,
	max: 0
}), ki = () => ({
	x: Oi(),
	y: Oi()
}), Ai = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function ji(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function Mi(e) {
	return typeof e == "string" || Array.isArray(e);
}
var Ni = [
	"initial",
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function Pi(e) {
	return ji(e.animate) || Ni.some((t) => Mi(e[t]));
}
function Fi(e) {
	return !!(Pi(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function Ii(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (J(i)) e.addValue(r, i);
		else if (J(a)) e.addValue(r, q(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, q(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var Li = { current: null }, Ri = { current: !1 }, zi = typeof window < "u";
function Bi() {
	if (Ri.current = !0, zi) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => Li.current = e.matches;
			e.addEventListener("change", t), t();
		} else Li.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var Vi = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Hi = {}, Ui = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = wn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = F.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, P.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = Pi(t), this.isVariantNode = Fi(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && J(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, Ai.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Ri.current || Bi(), this.shouldReduceMotion = Li.current), process.env.NODE_ENV !== "production" && y(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), me(this.notifyUpdate), me(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && Jn.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new Rn({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ h(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = pn.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && P.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in Hi) {
			let t = Hi[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ki();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < Vi.length; t++) {
			let n = Vi[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = Ii(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(e) {
		let t = this.getClosestVariantNode();
		if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
	}
	addValue(e, t) {
		let n = this.values.get(e);
		t !== n && (n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t), this.latestValues[e] = t.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = q(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (s(n) || l(n)) ? n = parseFloat(n) : !Di(n) && B.test(t) && (n = $r(e, t)), this.setBaseTarget(e, J(n) ? n.get() : n)), J(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = wr(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !J(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new m()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		si.render(this.render);
	}
}, Wi = class extends Ui {
	constructor() {
		super(...arguments), this.KeyframeResolver = ni;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		J(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Gi({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function Ki(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function qi(e, t) {
	return Gi(Ki(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var Ji = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, Yi = W.length;
function Xi(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < Yi; a++) {
		let o = W[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = ai(s, Yr[o]);
			if (!c) {
				i = !1;
				let t = Ji[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${ai(a, Yr.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function Zi(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (pn.has(e)) {
			o = !0;
			continue;
		}
		if (be(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = ai(n, Yr[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Xi(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function Qi(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function $i(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var ea = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (R.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${$i(e, t.target.x)}% ${$i(e, t.target.y)}%`;
} }, ta = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = B.parse(e);
	if (i.length > 5) return r;
	let a = B.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = ct(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, na = {
	borderRadius: {
		...ea,
		applyTo: [...ri]
	},
	borderTopLeftRadius: ea,
	borderTopRightRadius: ea,
	borderBottomLeftRadius: ea,
	borderBottomRightRadius: ea,
	boxShadow: ta
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function ra(e, { layout: t, layoutId: n }) {
	return pn.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!na[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function ia(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (J(r[t]) || i && J(i[t]) || ra(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function aa(e) {
	return window.getComputedStyle(e);
}
var oa = class extends Wi {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = Qi;
	}
	mount(e) {
		a(!!e.style, "motion.create() components must forward their ref to a HTML or SVG element", "custom-component-ref"), super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (pn.has(t)) return this.projection?.isProjecting ? ln(t) : dn(e, t);
		{
			let n = aa(e), r = (be(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return qi(e, t);
	}
	build(e, t, n) {
		Zi(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ia(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function sa(e, t) {
	return e in t;
}
var ca = class extends Ui {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (sa(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return ki();
	}
	build(e, t) {
		Object.assign(e.output, t);
	}
	renderInstance(e, { output: t }) {
		Object.assign(e, t);
	}
	sortInstanceNodePosition() {
		return 0;
	}
}, la = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, ua = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function da(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? la : ua;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var fa = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function pa(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (Zi(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of fa) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && da(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var ma = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), ha = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function ga(e, t, n, r) {
	Qi(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(ma.has(n) ? n : Nr(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function _a(e, t, n) {
	let r = ia(e, t, n);
	for (let n in e) if (J(e[n]) || J(t[n])) {
		let t = W.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var va = class extends Wi {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ki;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (pn.has(t)) {
			let e = Zr(t);
			return e && e.default || 0;
		}
		if (fa.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = ma.has(t) ? t : Nr(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return _a(e, t, n);
	}
	build(e, t, n) {
		pa(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		ga(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = ha(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function ya(e, t, n) {
	let r = J(e) ? e : q(e);
	return r.start(vr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ba(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function xa(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ba(t) ? ii(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function Sa(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function Ca(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function wa(e, n, r) {
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		a.at > n && a.at < r && (t(e, a), i--);
	}
}
function Ta(e, t, n, r, i, a) {
	wa(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: ct(i, a, r[o]),
		easing: /* @__PURE__ */ ae(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function Ea(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function Da(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var Oa = "easeInOut", ka = 20;
function Aa(e, { defaultTransition: t = {}, ...n } = {}, r, a) {
	let o = t.duration || .3, s = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), l = {}, u = /* @__PURE__ */ new Map(), d = 0, f = 0, m = 0;
	for (let n = 0; n < e.length; n++) {
		let s = e[n];
		if (typeof s == "string") {
			u.set(s, f);
			continue;
		}
		if (!Array.isArray(s)) {
			u.set(s.name, Ca(f, s.at, d, u));
			continue;
		}
		let [p, g, _ = {}] = s;
		_.at !== void 0 && (f = Ca(f, _.at, d, u));
		let v = 0, y = (e, n, r, s = 0, c = 0) => {
			let l = Na(e), { delay: u = 0, times: d = Wt(l), type: p = t.type || "keyframes", repeat: g, repeatType: _, repeatDelay: y = 0, ...b } = n, { ease: x = t.ease || "easeOut", duration: S } = n, C = typeof u == "function" ? u(s, c) : u, w = l.length, T = In(p) ? p : a?.[p || "keyframes"];
			if (w <= 2 && T) {
				let e = 100;
				if (w === 2 && Ia(l)) {
					let t = l[1] - l[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...b
				};
				S !== void 0 && (n.duration = /* @__PURE__ */ h(S));
				let r = Dt(n, e, T);
				x = r.ease, S = r.duration;
			}
			S ??= o;
			let E = f + C;
			d.length === 1 && d[0] === 0 && (d[1] = 1);
			let O = d.length - l.length;
			if (O > 0 && Ut(d, O), l.length === 1 && l.unshift(null), g && i(g < ka, `Sequence segments can't repeat ${g} times — ignoring repeat option. Use a value below ${ka} or apply repeat at the sequence level instead.`), g && g < ka) {
				let e = S > 0 ? y / S : 0;
				S = Sa(S, g, y);
				let t = [...l], n = [...d];
				x = Array.isArray(x) ? [...x] : [x];
				let r = [...x], i = _ === "reverse" || _ === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), _ === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ D(e) : e)));
				for (let s = 0; s < g; s++) {
					let c = i && s % 2 == 0, u = c ? a : t, f = c ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (l.push(l[l.length - 1]), d.push(p), x.push("linear")), l.push(...u);
					for (let e = 0; e < u.length; e++) d.push(n[e] + p), x.push(e === 0 ? "linear" : /* @__PURE__ */ ae(f, e - 1));
				}
				Ea(d, g, e);
			}
			let k = E + S;
			Ta(r, l, x, d, E, k), v = Math.max(C + S, v), m = Math.max(k, m);
		};
		if (J(p)) {
			let e = ja(p, c);
			y(g, _, Ma("default", e));
		} else {
			let e = xa(p, g, r, l), t = e.length;
			for (let n = 0; n < t; n++) {
				g = g, _ = _;
				let r = e[n], i = ja(r, c);
				for (let e in g) y(g[e], Pa(_, e), Ma(e, i), n, t);
			}
		}
		d = f, f += v;
	}
	return c.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(Da);
			let o = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				o.push(n), c.push(/* @__PURE__ */ p(0, m, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), o.unshift(o[0]), l.unshift(Oa)), c[c.length - 1] !== 1 && (c.push(1), o.push(null)), s.has(r) || s.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = s.get(r);
			u.keyframes[i] = o;
			let { type: d, ...f } = t;
			u.transition[i] = {
				...f,
				duration: m,
				ease: l,
				times: c,
				...n
			};
		}
	}), s;
}
function ja(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function Ma(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function Na(e) {
	return Array.isArray(e) ? e : [e];
}
function Pa(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var Fa = (e) => typeof e == "number", Ia = (e) => e.every(Fa);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function La(e) {
	let t = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	}, n = li(e) && !Ti(e) ? new va(t) : new oa(t);
	n.mount(e), Ai.set(e, n);
}
function Ra(e) {
	let t = new ca({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), Ai.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function za(e, t) {
	return J(e) || typeof e == "number" || typeof e == "string" && !ba(t);
}
function Ba(e, t, n, r) {
	let i = [];
	if (za(e, t)) i.push(ya(e, ba(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let o = xa(e, t, r), s = o.length;
		a(!!s, "No valid elements provided.", "no-valid-elements");
		for (let e = 0; e < s; e++) {
			let r = o[e], a = r instanceof Element ? La : Ra;
			Ai.has(r) || a(r);
			let c = Ai.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, s)), i.push(...Lr(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function Va(e, t, n) {
	let r = [];
	return Aa(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = q(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: Lt }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...Ba(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Ha(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Ua(e = {}) {
	let { scope: n, reduceMotion: r, skipAnimations: i } = e;
	function a(e, a, o) {
		let s = [], c, l = {};
		if (r !== void 0 && (l.reduceMotion = r), i !== void 0 && (l.skipAnimations = i), Ha(e)) {
			let { onComplete: t, ...r } = a || {};
			typeof t == "function" && (c = t), s = Va(e, {
				...l,
				...r
			}, n);
		} else {
			let { onComplete: t, ...r } = o || {};
			typeof t == "function" && (c = t), s = Ba(e, a, {
				...l,
				...r
			}, n);
		}
		let u = new ir(s);
		return c && u.finished.then(c), n && (n.animations.push(u), u.finished.then(() => {
			t(n.animations, u);
		})), u;
	}
	return a;
}
var Wa = Ua();
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/utils/can-use-native-timeline.mjs
function Ga(e) {
	return typeof window > "u" ? !1 : e ? An() : kn();
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/info.mjs
var Ka = 50, qa = () => ({
	current: 0,
	offset: [],
	progress: 0,
	scrollLength: 0,
	targetOffset: 0,
	targetLength: 0,
	containerLength: 0,
	velocity: 0
}), Ja = () => ({
	time: 0,
	x: qa(),
	y: qa()
}), Ya = {
	x: {
		length: "Width",
		position: "Left"
	},
	y: {
		length: "Height",
		position: "Top"
	}
};
function Xa(e, t, n, r) {
	let i = n[t], { length: a, position: o } = Ya[t], s = i.current, c = n.time;
	i.current = Math.abs(e[`scroll${o}`]), i.scrollLength = e[`scroll${a}`] - e[`client${a}`], i.offset.length = 0, i.offset[0] = 0, i.offset[1] = i.scrollLength, i.progress = /* @__PURE__ */ p(0, i.scrollLength, i.current);
	let l = r - c;
	i.velocity = l > Ka ? 0 : /* @__PURE__ */ _(i.current - s, l);
}
function Za(e, t, n) {
	Xa(e, "x", t, n), Xa(e, "y", t, n), t.time = n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/inset.mjs
function Qa(e, t) {
	let n = {
		x: 0,
		y: 0
	}, r = e;
	for (; r && r !== t;) if (oi(r)) n.x += r.offsetLeft, n.y += r.offsetTop, r = r.offsetParent;
	else if (r.tagName === "svg") {
		let e = r.getBoundingClientRect();
		r = r.parentElement;
		let t = r.getBoundingClientRect();
		n.x += e.left - t.left, n.y += e.top - t.top;
	} else if (r instanceof SVGGraphicsElement) {
		let { x: e, y: t } = r.getBBox();
		n.x += e, n.y += t;
		let i = null, a = r.parentNode;
		for (; !i;) a.tagName === "svg" && (i = a), a = r.parentNode;
		r = i;
	} else break;
	return n;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/edge.mjs
var $a = {
	start: 0,
	center: .5,
	end: 1
};
function eo(e, t, n = 0) {
	let r = 0;
	if (e in $a && (e = $a[e]), typeof e == "string") {
		let t = parseFloat(e);
		e.endsWith("px") ? r = t : e.endsWith("%") ? e = t / 100 : e.endsWith("vw") ? r = t / 100 * document.documentElement.clientWidth : e.endsWith("vh") ? r = t / 100 * document.documentElement.clientHeight : e = t;
	}
	return typeof e == "number" && (r = t * e), n + r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/offset.mjs
var to = [0, 0];
function no(e, t, n, r) {
	let i = Array.isArray(e) ? e : to, a = 0, o = 0;
	return typeof e == "number" ? i = [e, e] : typeof e == "string" && (e = e.trim(), i = e.includes(" ") ? e.split(" ") : [e, $a[e] ? e : "0"]), a = eo(i[0], n, r), o = eo(i[1], t), a - o;
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/offsets/presets.mjs
var ro = {
	Enter: [[0, 1], [1, 1]],
	Exit: [[0, 0], [1, 0]],
	Any: [[1, 0], [0, 1]],
	All: [[0, 0], [1, 1]]
}, io = {
	x: 0,
	y: 0
};
function ao(e) {
	return "getBBox" in e && e.tagName !== "svg" ? e.getBBox() : {
		width: e.clientWidth,
		height: e.clientHeight
	};
}
function oo(e, t, r) {
	let { offset: i = ro.All } = r, { target: a = e, axis: o = "y" } = r, s = o === "y" ? "height" : "width", c = a === e ? io : Qa(a, e), l = a === e ? {
		width: e.scrollWidth,
		height: e.scrollHeight
	} : ao(a), u = {
		width: e.clientWidth,
		height: e.clientHeight
	};
	t[o].offset.length = 0;
	let d = !t[o].interpolate, f = i.length;
	for (let e = 0; e < f; e++) {
		let n = no(i[e], u[s], l[s], c[o]);
		!d && n !== t[o].interpolatorOffsets[e] && (d = !0), t[o].offset[e] = n;
	}
	d && (t[o].interpolate = Ht(t[o].offset, Wt(i), { clamp: !1 }), t[o].interpolatorOffsets = [...t[o].offset]), t[o].progress = n(0, 1, t[o].interpolate(t[o].current));
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/on-scroll-handler.mjs
function so(e, t = e, n) {
	if (n.x.targetOffset = 0, n.y.targetOffset = 0, t !== e) {
		let r = t;
		for (; r && r !== e;) n.x.targetOffset += r.offsetLeft, n.y.targetOffset += r.offsetTop, r = r.offsetParent;
	}
	n.x.targetLength = t === e ? t.scrollWidth : t.clientWidth, n.y.targetLength = t === e ? t.scrollHeight : t.clientHeight, n.x.containerLength = e.clientWidth, n.y.containerLength = e.clientHeight, process.env.NODE_ENV !== "production" && e && t && t !== e && e !== document.documentElement && e !== document.scrollingElement && e !== document.body && y(getComputedStyle(e).position !== "static", "Please ensure that the container has a non-static position, like 'relative', 'fixed', or 'absolute' to ensure scroll offset is calculated correctly.");
}
function co(e, t, n, r = {}) {
	return {
		measure: (t) => {
			so(e, r.target, n), Za(e, n, t), (r.offset || r.target) && oo(e, n, r);
		},
		notify: () => t(n)
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/track.mjs
var lo = /* @__PURE__ */ new WeakMap(), uo = /* @__PURE__ */ new WeakMap(), fo = /* @__PURE__ */ new WeakMap(), po = /* @__PURE__ */ new WeakMap(), mo = /* @__PURE__ */ new WeakMap(), ho = (e) => e === document.scrollingElement ? window : e;
function go(e, { container: t = document.scrollingElement, trackContentSize: n = !1, ...r } = {}) {
	if (!t) return d;
	let i = fo.get(t);
	i || (i = /* @__PURE__ */ new Set(), fo.set(t, i));
	let a = co(t, e, Ja(), r);
	if (i.add(a), !lo.has(t)) {
		let e = () => {
			for (let e of i) e.measure(he.timestamp);
			P.preUpdate(n);
		}, n = () => {
			for (let e of i) e.notify();
		}, r = () => P.read(e);
		lo.set(t, r);
		let a = ho(t);
		window.addEventListener("resize", r), t !== document.documentElement && uo.set(t, Ci(t, r)), a.addEventListener("scroll", r), r();
	}
	if (n && !mo.has(t)) {
		let e = lo.get(t), n = {
			width: t.scrollWidth,
			height: t.scrollHeight
		};
		po.set(t, n);
		let r = P.read(() => {
			let r = t.scrollWidth, i = t.scrollHeight;
			(n.width !== r || n.height !== i) && (e(), n.width = r, n.height = i);
		}, !0);
		mo.set(t, r);
	}
	let o = lo.get(t);
	return P.read(o, !1, !0), () => {
		me(o);
		let e = fo.get(t);
		if (!e || (e.delete(a), e.size)) return;
		let n = lo.get(t);
		lo.delete(t), n && (ho(t).removeEventListener("scroll", n), uo.get(t)?.(), window.removeEventListener("resize", n));
		let r = mo.get(t);
		r && (me(r), mo.delete(t)), po.delete(t);
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/utils/offset-to-range.mjs
var _o = [
	[ro.Enter, "entry"],
	[ro.Exit, "exit"],
	[ro.Any, "cover"],
	[ro.All, "contain"]
], vo = {
	start: 0,
	end: 1
};
function yo(e) {
	let t = e.trim().split(/\s+/);
	if (t.length !== 2) return;
	let n = vo[t[0]], r = vo[t[1]];
	if (n !== void 0 && r !== void 0) return [n, r];
}
function bo(e) {
	if (e.length !== 2) return;
	let t = [];
	for (let n of e) if (Array.isArray(n)) t.push(n);
	else if (typeof n == "string") {
		let e = yo(n);
		if (!e) return;
		t.push(e);
	} else return;
	return t;
}
function xo(e, t) {
	let n = bo(e);
	if (!n) return !1;
	for (let e = 0; e < 2; e++) {
		let r = n[e], i = t[e];
		if (r[0] !== i[0] || r[1] !== i[1]) return !1;
	}
	return !0;
}
function So(e) {
	if (!e) return {
		rangeStart: "contain 0%",
		rangeEnd: "contain 100%"
	};
	for (let [t, n] of _o) if (xo(e, t)) return {
		rangeStart: `${n} 0%`,
		rangeEnd: `${n} 100%`
	};
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/utils/get-timeline.mjs
var Co = /* @__PURE__ */ new Map();
function wo(e) {
	let t = { value: 0 };
	return {
		currentTime: t,
		cancel: go((n) => {
			t.value = n[e.axis].progress * 100;
		}, e)
	};
}
function To({ source: e, container: t, ...n }) {
	let { axis: r } = n;
	e && (t = e);
	let i = Co.get(t);
	i || (i = /* @__PURE__ */ new Map(), Co.set(t, i));
	let a = n.target ?? "self", o = i.get(a);
	o || (o = {}, i.set(a, o));
	let s = r + (n.offset ?? []).join(",");
	return o[s] || (n.target && Ga(n.target) ? So(n.offset) ? o[s] = new ViewTimeline({
		subject: n.target,
		axis: r
	}) : o[s] = wo({
		container: t,
		...n
	}) : Ga() ? o[s] = new ScrollTimeline({
		source: t,
		axis: r
	}) : o[s] = wo({
		container: t,
		...n
	})), o[s];
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/attach-animation.mjs
function Eo(e, t) {
	let n = To(t), r = t.target ? So(t.offset) : void 0, i = t.target ? Ga(t.target) && !!r : Ga();
	return e.attachTimeline({
		timeline: i ? n : void 0,
		...r && i && {
			rangeStart: r.rangeStart,
			rangeEnd: r.rangeEnd
		},
		observe: (e) => (e.pause(), wi((t) => {
			e.time = e.iterationDuration * t;
		}, n))
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/utils/is-element-tracking.mjs
function Do(e) {
	return e && (e.target || e.offset);
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/attach-function.mjs
function Oo(e) {
	return e.length === 2;
}
function ko(e, t) {
	return Oo(e) || Do(t) ? go((n) => {
		e(n[t.axis].progress, n);
	}, t) : wi(e, To(t));
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/scroll/index.mjs
function Ao(e, { axis: t = "y", container: n = document.scrollingElement, ...r } = {}) {
	if (!n) return d;
	let i = {
		axis: t,
		container: n,
		...r
	};
	return typeof e == "function" ? ko(e, i) : Eo(e, i);
}
//#endregion
//#region node_modules/framer-motion/dist/es/render/dom/viewport/index.mjs
var jo = {
	some: 0,
	all: 1
};
function Mo(e, t, { root: n, margin: r, amount: i = "some" } = {}) {
	let a = ii(e), o = /* @__PURE__ */ new WeakMap(), s = new IntersectionObserver((e) => {
		e.forEach((e) => {
			let n = o.get(e.target);
			if (e.isIntersecting !== !!n) {
				if (e.isIntersecting) {
					let n = t(e.target, e);
					typeof n == "function" ? o.set(e.target, n) : s.unobserve(e.target);
				} else typeof n == "function" && (n(e), o.delete(e.target));
			}
		});
	}, {
		root: n,
		rootMargin: r,
		threshold: typeof i == "number" ? i : jo[i]
	});
	return a.forEach((e) => s.observe(e)), () => s.disconnect();
}
//#endregion
//#region node_modules/swiper/shared/utils.mjs
function No(e = "") {
	return e.trim().split(" ").filter((e) => !!e.trim());
}
function Po(e) {
	Object.keys(e).forEach((t) => {
		try {
			e[t] = null;
		} catch {}
		try {
			delete e[t];
		} catch {}
	});
}
function Fo(e, t = 0) {
	return setTimeout(e, t);
}
function Io() {
	return Date.now();
}
function Lo(e) {
	return window.getComputedStyle(e, null);
}
function Ro(e, t = "x") {
	let n = Lo(e), r = n.transform || n.webkitTransform;
	if (!r || r === "none") return 0;
	let i = new DOMMatrixReadOnly(r);
	return t === "x" ? i.m41 : i.m42;
}
function zo(e) {
	return typeof e == "object" && !!e && !!e.constructor && Object.prototype.toString.call(e).slice(8, -1) === "Object";
}
function Bo(e) {
	return typeof HTMLElement < "u" && e instanceof HTMLElement || !!e && typeof e == "object" && (e.nodeType === 1 || e.nodeType === 11);
}
function Y(e, ...t) {
	let n = Object(e);
	for (let e = 0; e < t.length; e += 1) {
		let r = t[e];
		if (r == null || Bo(r)) continue;
		let i = r, a = Object.keys(Object(i)).filter((e) => e !== "__proto__" && e !== "constructor" && e !== "prototype");
		for (let e of a) {
			let t = Object.getOwnPropertyDescriptor(i, e);
			if (!t || !t.enumerable) continue;
			let r = i[e];
			zo(n[e]) && zo(r) ? r.__swiper__ ? n[e] = r : Y(n[e], r) : !zo(n[e]) && zo(r) ? (n[e] = {}, r.__swiper__ ? n[e] = r : Y(n[e], r)) : n[e] = r;
		}
	}
	return n;
}
function Vo(e, t, n) {
	e.style.setProperty(t, n);
}
function X(e, t = "") {
	let n = [...e.children];
	return e instanceof HTMLSlotElement && n.push(...e.assignedElements()), t ? n.filter((e) => e.matches(t)) : n;
}
function Ho(e, t) {
	let n = [t];
	for (; n.length > 0;) {
		let t = n.shift();
		if (e === t) return !0;
		n.push(...t.children, ...t.shadowRoot ? t.shadowRoot.children : [], ...t.assignedElements ? t.assignedElements() : []);
	}
	return !1;
}
function Uo(e, t) {
	let n = t.contains(e);
	return !n && t instanceof HTMLSlotElement && (n = [...t.assignedElements()].includes(e), n ||= Ho(e, t)), n;
}
function Wo(e) {
	try {
		console.warn(e);
	} catch {}
}
function Go(e, t = []) {
	let n = document.createElement(e);
	return n.classList.add(...Array.isArray(t) ? t : No(t)), n;
}
function Ko(e) {
	let t = e.getBoundingClientRect();
	return {
		top: t.top - (e.clientTop || 0),
		left: t.left - (e.clientLeft || 0)
	};
}
function qo(e, t) {
	let n = [], r = e.previousElementSibling;
	for (; r;) (!t || r.matches(t)) && n.push(r), r = r.previousElementSibling;
	return n;
}
function Jo(e, t) {
	let n = [], r = e.nextElementSibling;
	for (; r;) (!t || r.matches(t)) && n.push(r), r = r.nextElementSibling;
	return n;
}
function Z(e, t) {
	return window.getComputedStyle(e, null).getPropertyValue(t);
}
function Yo(e) {
	if (!(!e || !e.parentNode)) return [...e.parentNode.children].indexOf(e);
}
function Xo(e, t) {
	let n = [], r = e.parentElement;
	for (; r;) (!t || r.matches(t)) && n.push(r), r = r.parentElement;
	return n;
}
function Zo(e, t, n) {
	{
		let n = window.getComputedStyle(e, null);
		return e[t === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(n.getPropertyValue(t === "width" ? "margin-right" : "margin-top")) + parseFloat(n.getPropertyValue(t === "width" ? "margin-left" : "margin-bottom"));
	}
}
function Q(e) {
	return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
}
function Qo(e, t = "") {
	let n = globalThis.trustedTypes;
	e.innerHTML = n === void 0 ? t : n.createPolicy("html", { createHTML: (e) => e }).createHTML(t);
}
//#endregion
//#region node_modules/swiper/shared/swiper-core.mjs
var $o;
function es() {
	return typeof window > "u" ? { touch: !1 } : { touch: "ontouchstart" in window || navigator.maxTouchPoints > 0 };
}
function ts() {
	return $o ||= es(), $o;
}
var ns;
function rs({ userAgent: e } = {}) {
	if (typeof window > "u") return {
		ios: !1,
		android: !1
	};
	let t = ts(), n = navigator.platform, r = e || navigator.userAgent, i = {
		ios: !1,
		android: !1
	}, a = /(Android);?[\s/]+([\d.]+)?/.test(r), o = /(iPhone\sOS|iOS|iPod)/.test(r), s = /iPad/.test(r), c = n === "MacIntel" && t.touch && navigator.maxTouchPoints > 1, l = s || c;
	return a && n !== "Win32" && (i.os = "android", i.android = !0), (l || o) && (i.os = "ios", i.ios = !0), i;
}
function is(e = {}) {
	return ns ||= rs(e), ns;
}
var as;
function os() {
	if (typeof window > "u") return {
		isSafari: !1,
		isWebView: !1,
		need3dFix: !1
	};
	let e = is(), t = navigator.userAgent, n = t.toLowerCase(), r = n.includes("safari") && !n.includes("chrome") && !n.includes("android"), i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);
	return {
		isSafari: r,
		isWebView: i,
		need3dFix: r || i && e.ios
	};
}
function ss() {
	return as ||= os(), as;
}
var cs = (e, t) => {
	if (!e || e.destroyed || !e.params) return;
	let n = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
	if (n) {
		let t = n.querySelector(`.${e.params.lazyPreloaderClass}`);
		!t && e.isElement && (n.shadowRoot ? t = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
			if (n.shadowRoot) {
				let t = n.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`);
				t && !t.lazyPreloaderManaged && t.remove();
			}
		})), t && !t.lazyPreloaderManaged && t.remove();
	}
}, ls = (e, t) => {
	if (!e.slides[t]) return;
	let n = e.slides[t].querySelector("[loading=\"lazy\"]");
	n && n.removeAttribute("loading");
}, us = (e) => {
	if (!e || e.destroyed || !e.params) return;
	let t = e.params.lazyPreloadPrevNext, n = e.slides.length;
	if (!n || !t || t < 0) return;
	t = Math.min(t, n);
	let r = e.params.slidesPerView === "auto" ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView), i = e.activeIndex;
	if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
		let n = i, a = [n - t];
		a.push(...Array.from({ length: t }).map((e, t) => n + r + t)), e.slides.forEach((t, n) => {
			t.column !== void 0 && a.includes(t.column) && ls(e, n);
		});
		return;
	}
	let a = i + r - 1;
	if (e.params.rewind || e.params.loop) for (let r = i - t; r <= a + t; r += 1) {
		let t = (r % n + n) % n;
		(t < i || t > a) && ls(e, t);
	}
	else for (let r = Math.max(i - t, 0); r <= Math.min(a + t, n - 1); r += 1) r !== i && (r > a || r < i) && ls(e, r);
};
function ds(e, t = "window", n) {
	if (!e || t === "container" && !n) return;
	let r = !1, i = t === "window" ? window.innerHeight : n.clientHeight, a = Object.keys(e).map((e) => {
		if (typeof e == "string" && e.indexOf("@") === 0) {
			let t = parseFloat(e.substr(1));
			return {
				value: i * t,
				point: e
			};
		}
		return {
			value: e,
			point: e
		};
	});
	a.sort((e, t) => parseInt(String(e.value), 10) - parseInt(String(t.value), 10));
	for (let e = 0; e < a.length; e += 1) {
		let { point: i, value: o } = a[e];
		t === "window" ? window.matchMedia(`(min-width: ${o}px)`).matches && (r = i) : o <= n.clientWidth && (r = i);
	}
	return r || "max";
}
var fs = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
function ps() {
	let e = this, { realIndex: t, initialized: n, params: r, el: i } = e, a = r.breakpoints;
	if (!a || a && Object.keys(a).length === 0) return;
	let o = r.breakpointsBase === "window" || !r.breakpointsBase ? r.breakpointsBase : "container", s = ["window", "container"].includes(r.breakpointsBase) || !r.breakpointsBase ? e.el : document.querySelector(r.breakpointsBase), c = e.getBreakpoint(a, o, s);
	if (!c || e.currentBreakpoint === c) return;
	let l = a, u = (c in l ? l[c] : void 0) || e.originalParams, d = fs(e, r), f = fs(e, u), p = e.params.grabCursor, m = u.grabCursor, h = r.enabled;
	d && !f ? (i.classList.remove(`${r.containerModifierClass}grid`, `${r.containerModifierClass}grid-column`), e.emitContainerClasses()) : !d && f && (i.classList.add(`${r.containerModifierClass}grid`), (u.grid.fill && u.grid.fill === "column" || !u.grid.fill && r.grid.fill === "column") && i.classList.add(`${r.containerModifierClass}grid-column`), e.emitContainerClasses()), p && !m ? e.unsetGrabCursor() : !p && m && e.setGrabCursor();
	let g = (e, t) => e[t];
	[
		"navigation",
		"pagination",
		"scrollbar"
	].forEach((t) => {
		let n = g(u, t);
		if (n === void 0) return;
		let i = g(r, t), a = typeof i == "object" && !!i && i.enabled, o = typeof n == "object" && !!n && n.enabled, s = e[t];
		a && !o && s?.disable?.(), !a && o && s?.enable?.();
	});
	let _ = u.direction && u.direction !== r.direction, v = r.loop && (u.slidesPerView !== r.slidesPerView || _), y = r.loop;
	_ && n && e.changeDirection(), Y(e.params, u);
	let b = e.params.enabled, x = e.params.loop;
	Object.assign(e, {
		allowTouchMove: e.params.allowTouchMove,
		allowSlideNext: e.params.allowSlideNext,
		allowSlidePrev: e.params.allowSlidePrev
	}), h && !b ? e.disable() : !h && b && e.enable(), e.currentBreakpoint = c, e.emit("_beforeBreakpoint", u), n && (v ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides()) : !y && x ? (e.loopCreate(t), e.updateSlides()) : y && !x && e.loopDestroy()), e.emit("breakpoint", u);
}
var ms = {
	setBreakpoint: ps,
	getBreakpoint: ds
};
function hs() {
	let e = this, { isLocked: t, params: n } = e, { slidesOffsetBefore: r } = n;
	if (r) {
		let t = e.slides.length - 1, n = e.slidesGrid[t] + e.slidesSizesGrid[t] + r * 2;
		e.isLocked = e.size > n;
	} else e.isLocked = e.snapGrid.length === 1;
	n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked), n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
var gs = { checkOverflow: hs };
function _s(e, t) {
	let n = [];
	return e.forEach((e) => {
		typeof e == "object" ? Object.keys(e).forEach((r) => {
			e[r] && n.push(t + r);
		}) : typeof e == "string" && n.push(t + e);
	}), n;
}
function vs() {
	let e = this, { classNames: t, params: n, rtl: r, el: i, device: a } = e, o = _s([
		"initialized",
		n.direction,
		{ "free-mode": e.params.freeMode && n.freeMode.enabled },
		{ autoheight: n.autoHeight },
		{ rtl: r },
		{ grid: n.grid && n.grid.rows > 1 },
		{ "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column" },
		{ android: a.android },
		{ ios: a.ios },
		{ "css-mode": n.cssMode },
		{ centered: n.cssMode && n.centeredSlides },
		{ "watch-progress": n.watchSlidesProgress }
	], n.containerModifierClass);
	t.push(...o), i.classList.add(...t), e.emitContainerClasses();
}
function ys() {
	let e = this, { el: t, classNames: n } = e;
	!t || typeof t == "string" || (t.classList.remove(...n), e.emitContainerClasses());
}
var bs = {
	addClasses: vs,
	removeClasses: ys
}, xs = {
	init: !0,
	direction: "horizontal",
	oneWayMovement: !1,
	swiperElementNodeName: "SWIPER-CONTAINER",
	touchEventsTarget: "wrapper",
	initialSlide: 0,
	speed: 300,
	cssMode: !1,
	updateOnWindowResize: !0,
	resizeObserver: !0,
	nested: !1,
	createElements: !1,
	eventsPrefix: "swiper",
	enabled: !0,
	focusableElements: "input, select, option, textarea, button, video, label",
	width: null,
	height: null,
	preventInteractionOnTransition: !1,
	userAgent: null,
	url: null,
	edgeSwipeDetection: !1,
	edgeSwipeThreshold: 20,
	autoHeight: !1,
	setWrapperSize: !1,
	virtualTranslate: !1,
	effect: "slide",
	breakpoints: void 0,
	breakpointsBase: "window",
	spaceBetween: 0,
	slidesPerView: 1,
	slidesPerGroup: 1,
	slidesPerGroupSkip: 0,
	slidesPerGroupAuto: !1,
	centeredSlides: !1,
	centeredSlidesBounds: !1,
	slidesOffsetBefore: 0,
	slidesOffsetAfter: 0,
	normalizeSlideIndex: !0,
	centerInsufficientSlides: !1,
	snapToSlideEdge: !1,
	watchOverflow: !0,
	roundLengths: !1,
	touchRatio: 1,
	touchAngle: 45,
	simulateTouch: !0,
	shortSwipes: !0,
	longSwipes: !0,
	longSwipesRatio: .5,
	longSwipesMs: 300,
	followFinger: !0,
	allowTouchMove: !0,
	threshold: 5,
	touchMoveStopPropagation: !1,
	touchStartPreventDefault: !0,
	touchStartForcePreventDefault: !1,
	touchReleaseOnEdges: !1,
	uniqueNavElements: !0,
	resistance: !0,
	resistanceRatio: .85,
	watchSlidesProgress: !1,
	grabCursor: !1,
	preventClicks: !0,
	preventClicksPropagation: !0,
	slideToClickedSlide: !1,
	loop: !1,
	loopAddBlankSlides: !0,
	loopAdditionalSlides: 0,
	loopPreventsSliding: !0,
	rewind: !1,
	allowSlidePrev: !0,
	allowSlideNext: !0,
	swipeHandler: null,
	noSwiping: !0,
	noSwipingClass: "swiper-no-swiping",
	noSwipingSelector: null,
	passiveListeners: !0,
	maxBackfaceHiddenSlides: 10,
	containerModifierClass: "swiper-",
	slideClass: "swiper-slide",
	slideBlankClass: "swiper-slide-blank",
	slideActiveClass: "swiper-slide-active",
	slideVisibleClass: "swiper-slide-visible",
	slideFullyVisibleClass: "swiper-slide-fully-visible",
	slideNextClass: "swiper-slide-next",
	slidePrevClass: "swiper-slide-prev",
	wrapperClass: "swiper-wrapper",
	lazyPreloaderClass: "swiper-lazy-preloader",
	lazyPreloadPrevNext: 0,
	runCallbacksOnInit: !0,
	_emitClasses: !1
}, Ss = {
	on(e, t, n) {
		let r = this;
		if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
		let i = n ? "unshift" : "push";
		return e.split(" ").forEach((e) => {
			r.eventsListeners[e] || (r.eventsListeners[e] = []), r.eventsListeners[e][i](t);
		}), r;
	},
	once(e, t, n) {
		let r = this;
		if (!r.eventsListeners || r.destroyed || typeof t != "function") return r;
		let i = function(...n) {
			r.off(e, i), i.__emitterProxy && delete i.__emitterProxy, t.apply(r, n);
		};
		return i.__emitterProxy = t, r.on(e, i, n);
	},
	onAny(e, t) {
		let n = this;
		if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
		let r = t ? "unshift" : "push";
		return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[r](e), n;
	},
	offAny(e) {
		let t = this;
		if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
		let n = t.eventsAnyListeners.indexOf(e);
		return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
	},
	off(e, t) {
		let n = this;
		return !n.eventsListeners || n.destroyed || !n.eventsListeners || e.split(" ").forEach((e) => {
			t === void 0 ? n.eventsListeners[e] = [] : n.eventsListeners[e] && n.eventsListeners[e].forEach((r, i) => {
				(r === t || r.__emitterProxy && r.__emitterProxy === t) && n.eventsListeners[e].splice(i, 1);
			});
		}), n;
	},
	emit(...e) {
		let t = this;
		if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
		let n, r, i;
		if (typeof e[0] == "string" || Array.isArray(e[0])) n = e[0], r = e.slice(1, e.length), i = t;
		else {
			let a = e[0];
			n = a.events, r = a.data ?? [], i = a.context || t;
		}
		return r.unshift(i), (Array.isArray(n) ? n : n.split(" ")).forEach((e) => {
			t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach((t) => {
				t.apply(i, [e, ...r]);
			}), t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach((e) => {
				e.apply(i, r);
			});
		}), t;
	}
};
function Cs(e) {
	let t = this;
	t.destroyed || t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation())));
}
function ws() {
	let e = this;
	e.destroyed || e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0, e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
}
function Ts(e) {
	let t = this;
	t.destroyed || (cs(t, e.target), !(t.params.cssMode || t.params.slidesPerView !== "auto" && !t.params.autoHeight) && t.update());
}
function Es() {
	let e = this, { params: t, el: n } = e;
	if (n && n.offsetWidth === 0) return;
	t.breakpoints && e.setBreakpoint();
	let { allowSlideNext: r, allowSlidePrev: i, snapGrid: a } = e, o = e.virtual && e.params.virtual?.enabled;
	e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses();
	let s = o && t.loop;
	if ((t.slidesPerView === "auto" || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides && !s) {
		let t = o ? e.virtual.slides.length : e.slides.length;
		e.slideTo(t - 1, 0, !1, !0);
	} else e.params.loop && !o ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0);
	if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
		let t = e.autoplay;
		clearTimeout(t.resizeTimeout), t.resizeTimeout = setTimeout(() => {
			e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume();
		}, 500);
	}
	e.allowSlidePrev = i, e.allowSlideNext = r, e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow();
}
function Ds() {
	let e = this;
	if (e.destroyed) return;
	let { wrapperEl: t, rtlTranslate: n, enabled: r } = e;
	if (!r) return;
	e.previousTranslate = e.translate, e.translate = e.isHorizontal() ? -t.scrollLeft : -t.scrollTop, e.translate === 0 && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
	let i, a = e.maxTranslate() - e.minTranslate();
	i = a === 0 ? 0 : (e.translate - e.minTranslate()) / a, i !== e.progress && e.updateProgress(n ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1);
}
function Os(e) {
	let t = this;
	if (t.destroyed) return;
	let n = t.touchEventsData, r = e.originalEvent ?? e;
	if (r.type !== "touchend" && r.type !== "touchcancel") {
		if (n.touchId !== null || r.pointerId !== n.pointerId) return;
	} else {
		let e = [...r.changedTouches].find((e) => e.identifier === n.touchId);
		if (!e || e.identifier !== n.touchId) return;
	}
	if ([
		"pointercancel",
		"pointerout",
		"pointerleave",
		"contextmenu"
	].includes(r.type) && !(["pointercancel", "contextmenu"].includes(r.type) && (t.browser.isSafari || t.browser.isWebView))) return;
	n.pointerId = null, n.touchId = null;
	let { params: i, touches: a, rtlTranslate: o, slidesGrid: s, enabled: c } = t;
	if (!c || !i.simulateTouch && r.pointerType === "mouse") return;
	if (n.allowTouchCallbacks && t.emit("touchEnd", r), n.allowTouchCallbacks = !1, !n.isTouched) {
		n.isMoved && i.grabCursor && t.setGrabCursor(!1), n.isMoved = !1, n.startMoving = !1;
		return;
	}
	i.grabCursor && n.isMoved && n.isTouched && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!1);
	let l = Io(), u = l - n.touchStartTime;
	if (t.allowClick) {
		let e = r.path ?? (r.composedPath && r.composedPath());
		t.updateClickedSlide(e && e[0], e), t.emit("tap click", r), u < 300 && l - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", r);
	}
	if (n.lastClickTime = Io(), Fo(() => {
		t.destroyed || (t.allowClick = !0);
	}), !n.isTouched || !n.isMoved || !t.swipeDirection || a.diff === 0 && !n.loopSwapReset || n.currentTranslate === n.startTranslate && !n.loopSwapReset) {
		n.isTouched = !1, n.isMoved = !1, n.startMoving = !1;
		return;
	}
	n.isTouched = !1, n.isMoved = !1, n.startMoving = !1;
	let d;
	if (d = i.followFinger ? o ? t.translate : -t.translate : -(n.currentTranslate ?? 0), i.cssMode) return;
	if (i.freeMode && i.freeMode.enabled) {
		t.freeMode.onTouchEnd({ currentPos: d });
		return;
	}
	let f = d >= -t.maxTranslate() && !t.params.loop, p = 0, m = t.slidesSizesGrid[0];
	for (let e = 0; e < s.length; e += e < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
		let t = e < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
		s[e + t] === void 0 ? (f || d >= s[e]) && (p = e, m = s[s.length - 1] - s[s.length - 2]) : (f || d >= s[e] && d < s[e + t]) && (p = e, m = s[e + t] - s[e]);
	}
	let h = null, g = null;
	i.rewind && (t.isBeginning ? g = i.virtual?.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (h = 0));
	let _ = (d - s[p]) / m, v = p < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
	if (u > i.longSwipesMs) {
		if (!i.longSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.swipeDirection === "next" && (_ >= i.longSwipesRatio ? t.slideTo(i.rewind && t.isEnd ? h : p + v) : t.slideTo(p)), t.swipeDirection === "prev" && (_ > 1 - i.longSwipesRatio ? t.slideTo(p + v) : g !== null && _ < 0 && Math.abs(_) > i.longSwipesRatio ? t.slideTo(g) : t.slideTo(p));
	} else {
		if (!i.shortSwipes) {
			t.slideTo(t.activeIndex);
			return;
		}
		t.navigation && (r.target === t.navigation.nextEl || r.target === t.navigation.prevEl) ? r.target === t.navigation.nextEl ? t.slideTo(p + v) : t.slideTo(p) : (t.swipeDirection === "next" && t.slideTo(h === null ? p + v : h), t.swipeDirection === "prev" && t.slideTo(g === null ? p : g));
	}
}
function ks(e) {
	let t = this;
	if (t.destroyed) return;
	let n = t.touchEventsData, { params: r, touches: i, rtlTranslate: a, enabled: o } = t;
	if (!o || !r.simulateTouch && e.pointerType === "mouse") return;
	let s = e, c = s.originalEvent ?? s;
	if (c.type === "pointermove" && (n.touchId !== null || c.pointerId !== n.pointerId)) return;
	let l;
	if (c.type === "touchmove") {
		let e = [...c.changedTouches].find((e) => e.identifier === n.touchId);
		if (!e || e.identifier !== n.touchId) return;
		l = e;
	} else l = c;
	if (!n.isTouched) {
		n.startMoving && n.isScrolling && t.emit("touchMoveOpposite", c);
		return;
	}
	let u = l.pageX, d = l.pageY;
	if (c.preventedByNestedSwiper) {
		i.startX = u, i.startY = d;
		return;
	}
	if (!t.allowTouchMove) {
		c.target.matches(n.focusableElements) || (t.allowClick = !1), n.isTouched && (Object.assign(i, {
			startX: u,
			startY: d,
			currentX: u,
			currentY: d
		}), n.touchStartTime = Io());
		return;
	}
	if (r.touchReleaseOnEdges && !r.loop) {
		if (t.isVertical()) {
			if (d < i.startY && t.translate <= t.maxTranslate() || d > i.startY && t.translate >= t.minTranslate()) {
				n.isTouched = !1, n.isMoved = !1;
				return;
			}
		} else if (a && (u > i.startX && -t.translate <= t.maxTranslate() || u < i.startX && -t.translate >= t.minTranslate())) return;
		else if (!a && (u < i.startX && t.translate <= t.maxTranslate() || u > i.startX && t.translate >= t.minTranslate())) return;
	}
	if (document.activeElement && document.activeElement.matches(n.focusableElements) && document.activeElement !== c.target && c.pointerType !== "mouse" && document.activeElement.blur(), document.activeElement && c.target === document.activeElement && c.target.matches(n.focusableElements)) {
		n.isMoved = !0, t.allowClick = !1;
		return;
	}
	n.allowTouchCallbacks && t.emit("touchMove", c), i.previousX = i.currentX, i.previousY = i.currentY, i.currentX = u, i.currentY = d;
	let f = i.currentX - i.startX, p = i.currentY - i.startY;
	if (t.params.threshold && Math.sqrt(f ** 2 + p ** 2) < t.params.threshold) return;
	if (n.isScrolling === void 0) {
		let e;
		t.isHorizontal() && i.currentY === i.startY || t.isVertical() && i.currentX === i.startX ? n.isScrolling = !1 : f * f + p * p >= 25 && (e = Math.atan2(Math.abs(p), Math.abs(f)) * 180 / Math.PI, n.isScrolling = t.isHorizontal() ? e > r.touchAngle : 90 - e > r.touchAngle);
	}
	if (n.isScrolling && t.emit("touchMoveOpposite", c), n.startMoving === void 0 && (i.currentX !== i.startX || i.currentY !== i.startY) && (n.startMoving = !0), n.isScrolling || c.type === "touchmove" && n.preventTouchMoveFromPointerMove) {
		n.isTouched = !1;
		return;
	}
	if (!n.startMoving) return;
	t.allowClick = !1, !r.cssMode && c.cancelable && c.preventDefault(), r.touchMoveStopPropagation && !r.nested && c.stopPropagation();
	let m = t.isHorizontal() ? f : p, h = t.isHorizontal() ? i.currentX - i.previousX : i.currentY - i.previousY;
	r.oneWayMovement && (m = Math.abs(m) * (a ? 1 : -1), h = Math.abs(h) * (a ? 1 : -1)), i.diff = m, m *= r.touchRatio, a && (m = -m, h = -h);
	let g = t.touchesDirection;
	t.swipeDirection = m > 0 ? "prev" : "next", t.touchesDirection = h > 0 ? "prev" : "next";
	let _ = t.params.loop && !r.cssMode, v = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
	if (!n.isMoved) {
		if (_ && v && t.loopFix({ direction: t.swipeDirection }), n.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
			let e = new window.CustomEvent("transitionend", {
				bubbles: !0,
				cancelable: !0,
				detail: { bySwiperTouchMove: !0 }
			});
			t.wrapperEl.dispatchEvent(e);
		}
		n.allowMomentumBounce = !1, r.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", c);
	}
	if ((/* @__PURE__ */ new Date()).getTime(), r._loopSwapReset !== !1 && n.isMoved && n.allowThresholdMove && g !== t.touchesDirection && _ && v && Math.abs(m) >= 1) {
		Object.assign(i, {
			startX: u,
			startY: d,
			currentX: u,
			currentY: d,
			startTranslate: n.currentTranslate
		}), n.loopSwapReset = !0, n.startTranslate = n.currentTranslate;
		return;
	}
	t.emit("sliderMove", c), n.isMoved = !0;
	let y = n.startTranslate ?? 0;
	n.currentTranslate = m + y;
	let b = !0, x = r.resistanceRatio;
	if (r.touchReleaseOnEdges && (x = 0), m > 0 ? (_ && v && n.allowThresholdMove && n.currentTranslate > (r.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
		direction: "prev",
		setTranslate: !0,
		activeSlideIndex: 0
	}), n.currentTranslate > t.minTranslate() && (b = !1, r.resistance && (n.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + y + m) ** x))) : m < 0 && (_ && v && n.allowThresholdMove && n.currentTranslate < (r.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (r.slidesPerView !== "auto" && t.slides.length - r.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
		direction: "next",
		setTranslate: !0,
		activeSlideIndex: t.slides.length - (r.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(String(r.slidesPerView))))
	}), n.currentTranslate < t.maxTranslate() && (b = !1, r.resistance && (n.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - y - m) ** x))), b && (c.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && (n.currentTranslate ?? 0) < y && (n.currentTranslate = y), !t.allowSlidePrev && t.swipeDirection === "prev" && (n.currentTranslate ?? 0) > y && (n.currentTranslate = y), !t.allowSlidePrev && !t.allowSlideNext && (n.currentTranslate = y), r.threshold > 0) {
		if (Math.abs(m) > r.threshold || n.allowThresholdMove) {
			if (!n.allowThresholdMove) {
				n.allowThresholdMove = !0, i.startX = i.currentX, i.startY = i.currentY, n.currentTranslate = n.startTranslate, i.diff = t.isHorizontal() ? i.currentX - i.startX : i.currentY - i.startY;
				return;
			}
		} else {
			n.currentTranslate = n.startTranslate;
			return;
		}
	}
	!r.followFinger || r.cssMode || ((r.freeMode && r.freeMode.enabled && t.freeMode || r.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), r.freeMode && r.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(n.currentTranslate), t.setTranslate(n.currentTranslate ?? 0));
}
function As(e, t) {
	function n(t) {
		if (!t || t === document || t === window) return null;
		let r = t;
		r.assignedSlot && (r = r.assignedSlot);
		let i = r.closest(e);
		if (!i && !r.getRootNode) return null;
		let a = r.getRootNode();
		return i || n(a.host);
	}
	return n(t);
}
function js(e, t, n) {
	let { params: r } = e, i = r.edgeSwipeDetection, a = r.edgeSwipeThreshold;
	return i && (n <= a || n >= window.innerWidth - a) ? i === "prevent" && (t.preventDefault(), !0) : !0;
}
function Ms(e) {
	let t = this;
	if (t.destroyed) return;
	let n = e.originalEvent ?? e, r = t.touchEventsData;
	if (n.type === "pointerdown") {
		let e = n;
		if (r.pointerId !== null && r.pointerId !== e.pointerId) return;
		r.pointerId = e.pointerId;
	} else n.type === "touchstart" && n.targetTouches.length === 1 && (r.touchId = n.targetTouches[0].identifier);
	if (n.type === "touchstart") {
		js(t, n, n.targetTouches[0].pageX);
		return;
	}
	let { params: i, touches: a, enabled: o } = t;
	if (!o || !i.simulateTouch && n.pointerType === "mouse" || t.animating && i.preventInteractionOnTransition) return;
	!t.animating && i.cssMode && i.loop && t.loopFix();
	let s = n.target;
	if (i.touchEventsTarget === "wrapper" && !Uo(s, t.wrapperEl)) return;
	let c = n;
	if (typeof c.which == "number" && c.which === 3 || typeof c.button == "number" && c.button > 0 || r.isTouched && r.isMoved) return;
	let l = !!i.noSwipingClass && i.noSwipingClass !== "", u = n.composedPath ? n.composedPath() : n.path;
	l && n.target && n.target.shadowRoot && u && (s = u[0]);
	let d = i.noSwipingSelector ? i.noSwipingSelector : `.${i.noSwipingClass}`, f = !!(n.target && n.target.shadowRoot);
	if (i.noSwiping && (f ? As(d, s) : s.closest(d))) {
		t.allowClick = !0;
		return;
	}
	if (i.swipeHandler && typeof i.swipeHandler == "string" && !s.closest(i.swipeHandler)) return;
	let p = n;
	a.currentX = p.pageX, a.currentY = p.pageY;
	let m = a.currentX, h = a.currentY;
	if (!js(t, n, m)) return;
	Object.assign(r, {
		isTouched: !0,
		isMoved: !1,
		allowTouchCallbacks: !0,
		isScrolling: void 0,
		startMoving: void 0
	}), a.startX = m, a.startY = h, r.touchStartTime = Io(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, i.threshold > 0 && (r.allowThresholdMove = !1);
	let g = !0;
	s.matches(r.focusableElements) && (g = !1, s.nodeName === "SELECT" && (r.isTouched = !1)), document.activeElement && document.activeElement.matches(r.focusableElements) && document.activeElement !== s && (p.pointerType === "mouse" || p.pointerType !== "mouse" && !s.matches(r.focusableElements)) && document.activeElement.blur();
	let _ = g && t.allowTouchMove && i.touchStartPreventDefault;
	(i.touchStartForcePreventDefault || _) && !s.isContentEditable && n.preventDefault(), i.freeMode && i.freeMode.enabled && t.freeMode && t.animating && !i.cssMode && t.freeMode.onTouchStart(), t.emit("touchStart", n);
}
var Ns = (e, t) => {
	let { params: n, el: r, wrapperEl: i, device: a } = e, o = !!n.nested, s = t === "on" ? "addEventListener" : "removeEventListener", c = t;
	if (!r || typeof r == "string") return;
	document[s]("touchstart", e.onDocumentTouchStart, {
		passive: !1,
		capture: o
	}), r[s]("touchstart", e.onTouchStart, { passive: !1 }), r[s]("pointerdown", e.onTouchStart, { passive: !1 }), document[s]("touchmove", e.onTouchMove, {
		passive: !1,
		capture: o
	}), document[s]("pointermove", e.onTouchMove, {
		passive: !1,
		capture: o
	}), document[s]("touchend", e.onTouchEnd, { passive: !0 }), document[s]("pointerup", e.onTouchEnd, { passive: !0 }), document[s]("pointercancel", e.onTouchEnd, { passive: !0 }), document[s]("touchcancel", e.onTouchEnd, { passive: !0 }), document[s]("pointerout", e.onTouchEnd, { passive: !0 }), document[s]("pointerleave", e.onTouchEnd, { passive: !0 }), document[s]("contextmenu", e.onTouchEnd, { passive: !0 }), (n.preventClicks || n.preventClicksPropagation) && r[s]("click", e.onClick, !0), n.cssMode && i[s]("scroll", e.onScroll);
	let l = (t) => {
		e[c](t, Es, !0);
	};
	n.updateOnWindowResize ? l(a.ios || a.android ? "resize orientationchange observerUpdate" : "resize observerUpdate") : l("observerUpdate"), r[s]("load", e.onLoad, { capture: !0 });
};
function Ps() {
	let e = this, { params: t } = e;
	e.onTouchStart = Ms.bind(e), e.onTouchMove = ks.bind(e), e.onTouchEnd = Os.bind(e), e.onDocumentTouchStart = ws.bind(e), t.cssMode && (e.onScroll = Ds.bind(e)), e.onClick = Cs.bind(e), e.onLoad = Ts.bind(e), Ns(e, "on");
}
function Fs() {
	Ns(this, "off");
}
var Is = {
	attachEvents: Ps,
	detachEvents: Fs
};
function Ls(e) {
	let t = this;
	if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode) return;
	let n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
	t.isElement && (t.__preventObserver__ = !0), n.style.cursor = "move", n.style.cursor = e ? "grabbing" : "grab", t.isElement && requestAnimationFrame(() => {
		t.__preventObserver__ = !1;
	});
}
function Rs() {
	let e = this;
	e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0), e[e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", e.isElement && requestAnimationFrame(() => {
		e.__preventObserver__ = !1;
	}));
}
var zs = {
	setGrabCursor: Ls,
	unsetGrabCursor: Rs
};
function Bs(e, t) {
	let n = this, { params: r, slidesEl: i } = n;
	if (!r.loop || n.virtual && n.params.virtual?.enabled) return;
	let a = () => {
		X(i, `.${r.slideClass}, swiper-slide`).forEach((e, t) => {
			e.setAttribute("data-swiper-slide-index", String(t));
		});
	}, o = () => {
		let e = X(i, `.${r.slideBlankClass}`);
		e.forEach((e) => {
			e.remove();
		}), e.length > 0 && (n.recalcSlides(), n.updateSlides());
	}, s = n.grid && r.grid && r.grid.rows > 1;
	r.loopAddBlankSlides && (r.slidesPerGroup > 1 || s) && o();
	let c = r.slidesPerGroup * (s ? r.grid.rows : 1), l = n.slides.length % c !== 0, u = s && n.slides.length % r.grid.rows !== 0, d = (e) => {
		for (let t = 0; t < e; t += 1) {
			let e = n.isElement ? Go("swiper-slide", [r.slideBlankClass]) : Go("div", [r.slideClass, r.slideBlankClass]);
			n.slidesEl.append(e);
		}
	};
	l ? (r.loopAddBlankSlides ? (d(c - n.slides.length % c), n.recalcSlides(), n.updateSlides()) : Wo("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"), a()) : (u && (r.loopAddBlankSlides ? (d(r.grid.rows - n.slides.length % r.grid.rows), n.recalcSlides(), n.updateSlides()) : Wo("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)")), a());
	let f = r.centeredSlides || !!r.slidesOffsetBefore || !!r.slidesOffsetAfter;
	n.loopFix({
		slideRealIndex: e,
		direction: f ? void 0 : "next",
		initial: t
	});
}
function Vs() {
	let e = this, { params: t, slidesEl: n } = e;
	if (!t.loop || !n || e.virtual && e.params.virtual?.enabled) return;
	e.recalcSlides();
	let r = [];
	e.slides.forEach((e) => {
		let t = e, n = t.swiperSlideIndex === void 0 ? Number(e.getAttribute("data-swiper-slide-index")) : t.swiperSlideIndex;
		r[n] = e;
	}), e.slides.forEach((e) => {
		e.removeAttribute("data-swiper-slide-index");
	}), r.forEach((e) => {
		n.append(e);
	}), e.recalcSlides(), e.slideTo(e.realIndex, 0);
}
function Hs(e = {}) {
	let { slideRealIndex: t, slideTo: n = !0, direction: r, setTranslate: i, activeSlideIndex: a, initial: o, byController: s, byMousewheel: c } = e, l = a, u = this;
	if (!u.params.loop) return;
	u.emit("beforeLoopFix");
	let { slides: d, allowSlidePrev: f, allowSlideNext: p, slidesEl: m, params: h } = u, { centeredSlides: g, slidesOffsetBefore: _, slidesOffsetAfter: v, initialSlide: y } = h, b = g || !!_ || !!v;
	if (u.allowSlidePrev = !0, u.allowSlideNext = !0, u.virtual && h.virtual?.enabled) {
		if (n) {
			let e = u.virtual.slides.length, t = u.virtual.slidesBefore ?? 0;
			!b && u.snapIndex === 0 ? u.slideTo(e, 0, !1, !0) : b && u.snapIndex < h.slidesPerView ? u.slideTo(e + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(t, 0, !1, !0);
		}
		u.allowSlidePrev = f, u.allowSlideNext = p, u.emit("loopFix");
		return;
	}
	let x = h.slidesPerView;
	x === "auto" ? x = u.slidesPerViewDynamic() : (x = Math.ceil(parseFloat(String(h.slidesPerView))), b && x % 2 == 0 && (x += 1));
	let S = h.slidesPerGroupAuto ? x : h.slidesPerGroup, C = b ? Math.max(S, Math.ceil(x / 2)) : S;
	C % S !== 0 && (C += S - C % S), C += h.loopAdditionalSlides, u.loopedSlides = C;
	let w = u.grid && h.grid && h.grid.rows > 1;
	d.length < x + C || u.params.effect === "cards" && d.length < x + C * 2 ? Wo("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : w && h.grid.fill === "row" && Wo("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
	let T = [], E = [], D = w ? Math.ceil(d.length / h.grid.rows) : d.length, O = o && D - y < x && !b, k = O ? y : u.activeIndex;
	l === void 0 ? l = u.getSlideIndex(d.find((e) => e.classList.contains(h.slideActiveClass))) : k = l;
	let ee = r === "next" || !r, A = r === "prev" || !r, te = 0, j = 0, M = (w ? d[l].column ?? 0 : l) + (b && i === void 0 ? -x / 2 + .5 : 0);
	if (M < C) {
		te = Math.max(C - M, S);
		for (let e = 0; e < C - M; e += 1) {
			let t = e - Math.floor(e / D) * D;
			if (w) {
				let e = D - t - 1;
				for (let t = d.length - 1; t >= 0; --t) d[t].column === e && T.push(t);
			} else T.push(D - t - 1);
		}
	} else if (M + x > D - C) {
		j = Math.max(M - (D - C * 2), S), O && (j = Math.max(j, x - D + y + 1));
		for (let e = 0; e < j; e += 1) {
			let t = e - Math.floor(e / D) * D;
			w ? d.forEach((e, n) => {
				e.column === t && E.push(n);
			}) : E.push(t);
		}
	}
	if (u.__preventObserver__ = !0, requestAnimationFrame(() => {
		u.__preventObserver__ = !1;
	}), u.params.effect === "cards" && d.length < x + C * 2 && (E.includes(l) && E.splice(E.indexOf(l), 1), T.includes(l) && T.splice(T.indexOf(l), 1)), A && T.forEach((e) => {
		let t = d[e];
		t.swiperLoopMoveDOM = !0, m.prepend(t), t.swiperLoopMoveDOM = !1;
	}), ee && E.forEach((e) => {
		let t = d[e];
		t.swiperLoopMoveDOM = !0, m.append(t), t.swiperLoopMoveDOM = !1;
	}), u.recalcSlides(), h.slidesPerView === "auto" ? u.updateSlides() : w && (T.length > 0 && A || E.length > 0 && ee) && u.slides.forEach((e, t) => {
		u.grid.updateSlide(t, e, u.slides);
	}), h.watchSlidesProgress && u.updateSlidesOffset(), n) {
		if (T.length > 0 && A) {
			if (t === void 0) {
				let e = u.slidesGrid[k], t = u.slidesGrid[k + te] - e;
				c ? u.setTranslate(u.translate - t) : (u.slideTo(k + Math.ceil(te), 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - t, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - t));
			} else if (i) {
				let e = w ? T.length / h.grid.rows : T.length;
				u.slideTo(u.activeIndex + e, 0, !1, !0), u.touchEventsData.currentTranslate = u.translate;
			}
		} else if (E.length > 0 && ee) {
			if (t === void 0) {
				let e = u.slidesGrid[k], t = u.slidesGrid[k - j] - e;
				c ? u.setTranslate(u.translate - t) : (u.slideTo(k - j, 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - t, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - t));
			} else {
				let e = w ? E.length / h.grid.rows : E.length;
				u.slideTo(u.activeIndex - e, 0, !1, !0);
			}
		}
	}
	u.allowSlidePrev = f, u.allowSlideNext = p;
	let N = u.controller?.control;
	if (N && !s) {
		let e = {
			slideRealIndex: t,
			direction: r,
			setTranslate: i,
			activeSlideIndex: l,
			byController: !0
		};
		Array.isArray(N) ? N.forEach((t) => {
			!t.destroyed && t.params.loop && t.loopFix({
				...e,
				slideTo: t.params.slidesPerView === h.slidesPerView && n
			});
		}) : N instanceof u.constructor && N.params.loop && N.loopFix({
			...e,
			slideTo: N.params.slidesPerView === h.slidesPerView && n
		});
	}
	u.emit("loopFix");
}
var Us = {
	loopCreate: Bs,
	loopFix: Hs,
	loopDestroy: Vs
};
function Ws(e, t) {
	return function(n = {}) {
		let r = Object.keys(n)[0], i = n[r];
		if (typeof i != "object" || !i) {
			Y(t, n);
			return;
		}
		if (e[r] === !0 && (e[r] = { enabled: !0 }), r === "navigation" && e[r] && e[r].enabled && !e[r].prevEl && !e[r].nextEl && (e[r].auto = !0), ["pagination", "scrollbar"].indexOf(r) >= 0 && e[r] && e[r].enabled && !e[r].el && (e[r].auto = !0), !(r in e && "enabled" in i)) {
			Y(t, n);
			return;
		}
		typeof e[r] == "object" && !("enabled" in e[r]) && (e[r].enabled = !0), e[r] || (e[r] = { enabled: !1 }), Y(t, n);
	};
}
var Gs = ({ swiper: e, extendParams: t, on: n }) => {
	let r = [], i = (t, n = {}) => {
		let i = window.MutationObserver || window.WebkitMutationObserver;
		if (!i) return;
		let a = new i((t) => {
			if (e.__preventObserver__) return;
			if (t.length === 1) {
				e.emit("observerUpdate", t[0]);
				return;
			}
			let n = function() {
				e.emit("observerUpdate", t[0]);
			};
			window.requestAnimationFrame ? window.requestAnimationFrame(n) : window.setTimeout(n, 0);
		});
		a.observe(t, {
			attributes: n.attributes === void 0 || n.attributes,
			childList: e.isElement || n.childList === void 0 || n.childList,
			characterData: n.characterData === void 0 || n.characterData
		}), r.push(a);
	};
	t({
		observer: !1,
		observeParents: !1,
		observeSlideChildren: !1
	}), n("init", () => {
		if (e.params.observer) {
			if (e.params.observeParents) {
				let t = Xo(e.hostEl);
				for (let e = 0; e < t.length; e += 1) i(t[e]);
			}
			i(e.hostEl, { childList: e.params.observeSlideChildren }), i(e.wrapperEl, { attributes: !1 });
		}
	}), n("destroy", () => {
		r.forEach((e) => {
			e.disconnect();
		}), r.splice(0, r.length);
	});
}, Ks = ({ swiper: e, on: t, emit: n }) => {
	let r = null, i = null, a = () => {
		!e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
	}, o = () => {
		!e || e.destroyed || !e.initialized || (r = new ResizeObserver((t) => {
			i = window.requestAnimationFrame(() => {
				let { width: n, height: r } = e, i = n, o = r;
				t.forEach(({ contentBoxSize: t, contentRect: n, target: r }) => {
					if (r && r !== e.el) return;
					let a = Array.isArray(t) ? t[0] : t;
					i = n ? n.width : a.inlineSize, o = n ? n.height : a.blockSize;
				}), (i !== n || o !== r) && a();
			});
		}), r.observe(e.el));
	}, s = () => {
		i && window.cancelAnimationFrame(i), r && r.unobserve && e.el && (r.unobserve(e.el), r = null);
	}, c = () => {
		!e || e.destroyed || !e.initialized || n("orientationchange");
	};
	t("init", () => {
		if (e.params.resizeObserver && window.ResizeObserver !== void 0) {
			o();
			return;
		}
		window.addEventListener("resize", a), window.addEventListener("orientationchange", c);
	}), t("destroy", () => {
		s(), window.removeEventListener("resize", a), window.removeEventListener("orientationchange", c);
	});
};
function qs(e, t = !0, n) {
	let r = this, { enabled: i, params: a, animating: o } = r;
	if (!i || r.destroyed) return r;
	e === void 0 && (e = r.params.speed);
	let s = a.slidesPerGroup;
	a.slidesPerView === "auto" && a.slidesPerGroup === 1 && a.slidesPerGroupAuto && (s = Math.max(r.slidesPerViewDynamic("current", !0), 1));
	let c = r.activeIndex < a.slidesPerGroupSkip ? 1 : s, l = r.virtual && a.virtual?.enabled;
	if (a.loop) {
		if (o && !l && a.loopPreventsSliding) return !1;
		if (r.loopFix({ direction: "next" }), r._clientLeft = r.wrapperEl.clientLeft, r.activeIndex === r.slides.length - 1 && a.cssMode) return requestAnimationFrame(() => {
			r.slideTo(r.activeIndex + c, e, t, n);
		}), !0;
	}
	return a.rewind && r.isEnd ? r.slideTo(0, e, t, n) : r.slideTo(r.activeIndex + c, e, t, n);
}
function Js(e, t = !0, n) {
	let r = this, { params: i, snapGrid: a, slidesGrid: o, rtlTranslate: s, enabled: c, animating: l } = r;
	if (!c || r.destroyed) return r;
	e === void 0 && (e = r.params.speed);
	let u = r.virtual && i.virtual?.enabled;
	if (i.loop) {
		if (l && !u && i.loopPreventsSliding) return !1;
		r.loopFix({ direction: "prev" }), r._clientLeft = r.wrapperEl.clientLeft;
	}
	let d = s ? r.translate : -r.translate;
	function f(e) {
		return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
	}
	let p = f(d), m = a.map((e) => f(e)), h = i.freeMode && i.freeMode.enabled, g = a[m.indexOf(p) - 1];
	if (g === void 0 && (i.cssMode || h)) {
		let e;
		a.forEach((t, n) => {
			p >= t && (e = n);
		}), e !== void 0 && (g = h ? a[e] : a[e > 0 ? e - 1 : e]);
	}
	let _ = 0;
	if (g !== void 0 && (_ = o.indexOf(g), _ < 0 && (_ = r.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (_ = _ - r.slidesPerViewDynamic("previous", !0) + 1, _ = Math.max(_, 0))), i.rewind && r.isBeginning) {
		let i = r.params.virtual?.enabled && r.virtual ? r.virtual.slides.length - 1 : r.slides.length - 1;
		return r.slideTo(i, e, t, n);
	}
	return i.loop && r.activeIndex === 0 && i.cssMode ? (requestAnimationFrame(() => {
		r.slideTo(_, e, t, n);
	}), !0) : r.slideTo(_, e, t, n);
}
function Ys(e, t = !0, n) {
	let r = this;
	if (!r.destroyed) return e === void 0 && (e = r.params.speed), r.slideTo(r.activeIndex, e, t, n);
}
function Xs(e = 0, t, n = !0, r, i) {
	typeof e == "string" && (e = parseInt(e, 10));
	let a = this, o = e;
	o < 0 && (o = 0);
	let { params: s, snapGrid: c, slidesGrid: l, previousIndex: u, activeIndex: d, rtlTranslate: f, wrapperEl: p, enabled: m } = a;
	if (!m && !r && !i || a.destroyed || a.animating && s.preventInteractionOnTransition) return !1;
	t === void 0 && (t = a.params.speed);
	let h = Math.min(a.params.slidesPerGroupSkip, o), g = h + Math.floor((o - h) / a.params.slidesPerGroup);
	g >= c.length && (g = c.length - 1);
	let _ = -c[g];
	if (s.normalizeSlideIndex) for (let e = 0; e < l.length; e += 1) {
		let t = -Math.floor(_ * 100), n = Math.floor(l[e] * 100), r = Math.floor(l[e + 1] * 100);
		l[e + 1] === void 0 ? t >= n && (o = e) : t >= n && t < r - (r - n) / 2 ? o = e : t >= n && t < r && (o = e + 1);
	}
	if (a.initialized && o !== d && (!a.allowSlideNext && (f ? _ > a.translate && _ > a.minTranslate() : _ < a.translate && _ < a.minTranslate()) || !a.allowSlidePrev && _ > a.translate && _ > a.maxTranslate() && (d || 0) !== o)) return !1;
	o !== (u || 0) && n && a.emit("beforeSlideChangeStart"), a.updateProgress(_);
	let v;
	v = o > d ? "next" : o < d ? "prev" : "reset";
	let y = a.virtual && a.params.virtual?.enabled;
	if (!(y && i) && (f && -_ === a.translate || !f && _ === a.translate)) return a.updateActiveIndex(o), s.autoHeight && a.updateAutoHeight(), a.updateSlidesClasses(), s.effect !== "slide" && a.setTranslate(_), v !== "reset" && (a.transitionStart(n, v), a.transitionEnd(n, v)), !1;
	if (s.cssMode) {
		let e = a.isHorizontal(), n = f ? _ : -_;
		return t === 0 ? (y && (a.wrapperEl.style.scrollSnapType = "none", a._immediateVirtual = !0), y && !a._cssModeVirtualInitialSet && (a.params.initialSlide ?? 0) > 0 ? (a._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
			p[e ? "scrollLeft" : "scrollTop"] = n;
		})) : p[e ? "scrollLeft" : "scrollTop"] = n, y && requestAnimationFrame(() => {
			a.wrapperEl.style.scrollSnapType = "", a._immediateVirtual = !1;
		})) : p.scrollTo({
			[e ? "left" : "top"]: n,
			behavior: "smooth"
		}), !0;
	}
	let b = ss().isSafari;
	return y && !i && b && a.isElement && a.virtual.update(!1, !1, o), a.setTransition(t), a.setTranslate(_), a.updateActiveIndex(o), a.updateSlidesClasses(), a.emit("beforeTransitionStart", t, r), a.transitionStart(n, v), t === 0 ? a.transitionEnd(n, v) : a.animating || (a.animating = !0, a.onSlideToWrapperTransitionEnd ||= function(e) {
		!a || a.destroyed || e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onSlideToWrapperTransitionEnd), a.onSlideToWrapperTransitionEnd = null, delete a.onSlideToWrapperTransitionEnd, a.transitionEnd(n, v));
	}, a.wrapperEl.addEventListener("transitionend", a.onSlideToWrapperTransitionEnd)), !0;
}
function Zs() {
	let e = this;
	if (e.destroyed) return;
	let { params: t, slidesEl: n, clickedSlide: r, clickedIndex: i } = e;
	if (r === void 0 || i === void 0) return;
	let a = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView, o = e.getSlideIndexWhenGrid(i), s, c = e.isElement ? "swiper-slide" : `.${t.slideClass}`, l = e.grid && e.params.grid && e.params.grid.rows > 1;
	if (t.loop) {
		if (e.animating) return;
		s = parseInt(r.getAttribute("data-swiper-slide-index"), 10), t.centeredSlides ? e.slideToLoop(s) : o > (l ? (e.slides.length - a) / 2 - (e.params.grid.rows - 1) : e.slides.length - a) ? (e.loopFix(), o = e.getSlideIndex(X(n, `${c}[data-swiper-slide-index="${s}"]`)[0]), Fo(() => {
			e.slideTo(o);
		})) : e.slideTo(o);
	} else e.slideTo(o);
}
function Qs(e, t = !0, n, r = .5) {
	let i = this;
	if (i.destroyed) return;
	e === void 0 && (e = i.params.speed);
	let a = i.activeIndex, o = Math.min(i.params.slidesPerGroupSkip, a), s = o + Math.floor((a - o) / i.params.slidesPerGroup), c = i.rtlTranslate ? i.translate : -i.translate;
	if (c >= i.snapGrid[s]) {
		let e = i.snapGrid[s], t = i.snapGrid[s + 1];
		c - e > (t - e) * r && (a += i.params.slidesPerGroup);
	} else {
		let e = i.snapGrid[s - 1], t = i.snapGrid[s];
		c - e <= (t - e) * r && (a -= i.params.slidesPerGroup);
	}
	return a = Math.max(a, 0), a = Math.min(a, i.slidesGrid.length - 1), i.slideTo(a, e, t, n);
}
function $s(e = 0, t, n = !0, r) {
	typeof e == "string" && (e = parseInt(e, 10));
	let i = this;
	if (i.destroyed) return;
	t === void 0 && (t = i.params.speed);
	let a = i.grid && i.params.grid && i.params.grid.rows > 1, o = e;
	if (i.params.loop) {
		if (i.virtual && i.params.virtual?.enabled) o += i.virtual.slidesBefore ?? 0;
		else {
			let e;
			if (a) {
				let t = o * i.params.grid.rows;
				e = i.slides.find((e) => Number(e.getAttribute("data-swiper-slide-index")) === t)?.column ?? 0;
			} else e = i.getSlideIndexByData(o);
			let t = a ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, { centeredSlides: n, slidesOffsetBefore: s, slidesOffsetAfter: c } = i.params, l = n || !!s || !!c, u;
			i.params.slidesPerView === "auto" ? u = i.slidesPerViewDynamic() : (u = Math.ceil(parseFloat(String(i.params.slidesPerView))), l && u % 2 == 0 && (u += 1));
			let d = t - e < u;
			if (l && (d ||= e < Math.ceil(u / 2)), r && l && i.params.slidesPerView !== "auto" && !a && (d = !1), d) {
				let n = l ? e < i.activeIndex ? "prev" : "next" : e - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
				i.loopFix({
					direction: n,
					slideTo: !0,
					activeSlideIndex: n === "next" ? e + 1 : e - t + 1,
					slideRealIndex: n === "next" ? i.realIndex : void 0
				});
			}
			if (a) {
				let e = o * i.params.grid.rows;
				o = i.slides.find((t) => Number(t.getAttribute("data-swiper-slide-index")) === e)?.column ?? 0;
			} else o = i.getSlideIndexByData(o);
		}
	}
	return requestAnimationFrame(() => {
		i.slideTo(o, t, n, r);
	}), i;
}
var ec = {
	slideTo: Xs,
	slideToLoop: $s,
	slideNext: qs,
	slidePrev: Js,
	slideReset: Ys,
	slideToClosest: Qs,
	slideToClickedSlide: Zs
};
function tc(e, t) {
	let n = this;
	n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`, n.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : ""), n.emit("setTransition", e, t);
}
function nc({ swiper: e, runCallbacks: t, direction: n, step: r }) {
	let { activeIndex: i, previousIndex: a } = e, o = n;
	o ||= i > a ? "next" : i < a ? "prev" : "reset", e.emit(`transition${r}`), t && o === "reset" ? e.emit(`slideResetTransition${r}`) : t && i !== a && (e.emit(`slideChangeTransition${r}`), o === "next" ? e.emit(`slideNextTransition${r}`) : e.emit(`slidePrevTransition${r}`));
}
function rc(e = !0, t) {
	let n = this, { params: r } = n;
	n.animating = !1, !r.cssMode && (n.setTransition(0), nc({
		swiper: n,
		runCallbacks: e,
		direction: t,
		step: "End"
	}));
}
function ic(e = !0, t) {
	let n = this, { params: r } = n;
	r.cssMode || (r.autoHeight && n.updateAutoHeight(), nc({
		swiper: n,
		runCallbacks: e,
		direction: t,
		step: "Start"
	}));
}
var ac = {
	setTransition: tc,
	transitionStart: ic,
	transitionEnd: rc
};
function oc(e = this.isHorizontal() ? "x" : "y") {
	let t = this, { params: n, rtlTranslate: r, translate: i, wrapperEl: a } = t;
	if (n.virtualTranslate) return r ? -i : i;
	if (n.cssMode) return i;
	let o = Ro(a, e);
	return o += t.cssOverflowAdjustment(), r && (o = -o), o || 0;
}
function sc() {
	return -this.snapGrid[this.snapGrid.length - 1];
}
function cc() {
	return -this.snapGrid[0];
}
function lc(e, t) {
	let n = this, { rtlTranslate: r, params: i, wrapperEl: a, progress: o } = n, s = 0, c = 0;
	n.isHorizontal() ? s = r ? -e : e : c = e, i.roundLengths && (s = Math.floor(s), c = Math.floor(c)), n.previousTranslate = n.translate, n.translate = n.isHorizontal() ? s : c, i.cssMode ? a[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal() ? -s : -c : i.virtualTranslate || (n.isHorizontal() ? s -= n.cssOverflowAdjustment() : c -= n.cssOverflowAdjustment(), a.style.transform = `translate3d(${s}px, ${c}px, 0px)`);
	let l, u = n.maxTranslate() - n.minTranslate();
	l = u === 0 ? 0 : (e - n.minTranslate()) / u, l !== o && n.updateProgress(e), n.emit("setTranslate", n.translate, t);
}
function uc(e = 0, t = this.params.speed, n = !0, r = !0, i) {
	let a = this, { params: o, wrapperEl: s } = a;
	if (a.animating && o.preventInteractionOnTransition) return !1;
	let c = a.minTranslate(), l = a.maxTranslate(), u;
	if (u = r && e > c ? c : r && e < l ? l : e, a.updateProgress(u), o.cssMode) {
		let e = a.isHorizontal();
		return t === 0 ? s[e ? "scrollLeft" : "scrollTop"] = -u : s.scrollTo({
			[e ? "left" : "top"]: -u,
			behavior: "smooth"
		}), !0;
	}
	return t === 0 ? (a.setTransition(0), a.setTranslate(u), n && (a.emit("beforeTransitionStart", t, i), a.emit("transitionEnd"))) : (a.setTransition(t), a.setTranslate(u), n && (a.emit("beforeTransitionStart", t, i), a.emit("transitionStart")), a.animating || (a.animating = !0, a.onTranslateToWrapperTransitionEnd ||= function(e) {
		!a || a.destroyed || e.target === this && (a.wrapperEl.removeEventListener("transitionend", a.onTranslateToWrapperTransitionEnd), a.onTranslateToWrapperTransitionEnd = null, delete a.onTranslateToWrapperTransitionEnd, a.animating = !1, n && a.emit("transitionEnd"));
	}, a.wrapperEl.addEventListener("transitionend", a.onTranslateToWrapperTransitionEnd))), !0;
}
var dc = {
	getTranslate: oc,
	setTranslate: lc,
	minTranslate: cc,
	maxTranslate: sc,
	translateTo: uc
};
function fc(e) {
	let { slidesGrid: t, params: n } = e, r = e.rtlTranslate ? e.translate : -e.translate, i;
	for (let e = 0; e < t.length; e += 1) t[e + 1] === void 0 ? r >= t[e] && (i = e) : r >= t[e] && r < t[e + 1] - (t[e + 1] - t[e]) / 2 ? i = e : r >= t[e] && r < t[e + 1] && (i = e + 1);
	return n.normalizeSlideIndex && (i < 0 || i === void 0) && (i = 0), i;
}
function pc(e) {
	let t = this, n = t.rtlTranslate ? t.translate : -t.translate, { snapGrid: r, params: i, activeIndex: a, realIndex: o, snapIndex: s } = t, c = e, l, u = (e) => {
		let n = t.virtual.slides, r = e - (t.virtual.slidesBefore ?? 0);
		return r < 0 && (r = n.length + r), r >= n.length && (r -= n.length), r;
	};
	if (c === void 0 && (c = fc(t)), r.indexOf(n) >= 0) l = r.indexOf(n);
	else {
		let e = Math.min(i.slidesPerGroupSkip, c);
		l = e + Math.floor((c - e) / i.slidesPerGroup);
	}
	if (l >= r.length && (l = r.length - 1), c === a && !t.params.loop) {
		l !== s && (t.snapIndex = l, t.emit("snapIndexChange"));
		return;
	}
	if (c === a && t.params.loop && t.virtual && t.params.virtual?.enabled) {
		t.realIndex = u(c);
		return;
	}
	let d = t.grid && i.grid && i.grid.rows > 1, f;
	if (t.virtual && i.virtual?.enabled) f = i.loop ? u(c) : c;
	else if (d) {
		let e = t.slides.find((e) => e.column === c), n = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
		Number.isNaN(n) && (n = Math.max(t.slides.indexOf(e), 0)), f = Math.floor(n / i.grid.rows);
	} else if (t.slides[c]) {
		let e = t.slides[c].getAttribute("data-swiper-slide-index");
		f = e ? parseInt(e, 10) : c;
	} else f = c;
	Object.assign(t, {
		previousSnapIndex: s,
		snapIndex: l,
		previousRealIndex: o,
		realIndex: f,
		previousIndex: a,
		activeIndex: c
	}), t.initialized && us(t), t.emit("activeIndexChange"), t.emit("snapIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && (o !== f && t.emit("realIndexChange"), t.emit("slideChange"));
}
function mc(e) {
	let t = this, n = [], r = t.virtual && t.params.virtual?.enabled, i = 0, a;
	typeof e == "number" ? t.setTransition(e) : e === !0 && t.setTransition(t.params.speed);
	let o = (e) => r ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
	if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1) {
		if (t.params.centeredSlides) (t.visibleSlides || []).forEach((e) => {
			n.push(e);
		});
		else for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
			let e = t.activeIndex + a;
			if (e > t.slides.length && !r) break;
			let i = o(e);
			i && n.push(i);
		}
	} else {
		let e = o(t.activeIndex);
		e && n.push(e);
	}
	for (a = 0; a < n.length; a += 1) if (n[a] !== void 0) {
		let e = n[a].offsetHeight;
		i = e > i ? e : i;
	}
	(i || i === 0) && (t.wrapperEl.style.height = `${i}px`);
}
function hc(e, t) {
	let n = this, r = n.params, i = e.closest(`.${r.slideClass}, swiper-slide`);
	!i && n.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
		!i && e.matches && e.matches(`.${r.slideClass}, swiper-slide`) && (i = e);
	});
	let a = !1, o;
	if (i) {
		for (let e = 0; e < n.slides.length; e += 1) if (n.slides[e] === i) {
			a = !0, o = e;
			break;
		}
	}
	if (i && a) n.clickedSlide = i, n.clickedIndex = n.virtual && n.params.virtual?.enabled ? parseInt(i.getAttribute("data-swiper-slide-index"), 10) : o;
	else {
		n.clickedSlide = void 0, n.clickedIndex = void 0;
		return;
	}
	r.slideToClickedSlide && n.clickedIndex !== void 0 && n.clickedIndex !== n.activeIndex && n.slideToClickedSlide();
}
function gc(e) {
	let t = this;
	if (e === void 0) {
		let n = t.rtlTranslate ? -1 : 1;
		e = t && t.translate && t.translate * n || 0;
	}
	let n = t.params, r = t.maxTranslate() - t.minTranslate(), { progress: i, isBeginning: a, isEnd: o } = t, s = t.progressLoop, c = a, l = o;
	if (r === 0) i = 0, a = !0, o = !0;
	else {
		i = (e - t.minTranslate()) / r;
		let n = Math.abs(e - t.minTranslate()) < 1, s = Math.abs(e - t.maxTranslate()) < 1;
		a = n || i <= 0, o = s || i >= 1, n && (i = 0), s && (i = 1);
	}
	if (n.loop) {
		let n = t.getSlideIndexByData(0), r = t.getSlideIndexByData(t.slides.length - 1), i = t.slidesGrid[n], a = t.slidesGrid[r], o = t.slidesGrid[t.slidesGrid.length - 1], c = Math.abs(e);
		s = c >= i ? (c - i) / o : (c + o - a) / o, s > 1 && --s;
	}
	Object.assign(t, {
		progress: i,
		progressLoop: s,
		isBeginning: a,
		isEnd: o
	}), (n.watchSlidesProgress || n.centeredSlides && n.autoHeight) && t.updateSlidesProgress(e), a && !c && t.emit("reachBeginning toEdge"), o && !l && t.emit("reachEnd toEdge"), (c && !a || l && !o) && t.emit("fromEdge"), t.emit("progress", i);
}
function _c() {
	let e = this, t, n, r = e.el;
	t = e.params.width !== void 0 && e.params.width !== null ? e.params.width : r.clientWidth, n = e.params.height !== void 0 && e.params.height !== null ? e.params.height : r.clientHeight, !(t === 0 && e.isHorizontal() || n === 0 && e.isVertical()) && (t = t - parseInt(Z(r, "padding-left") || "0", 10) - parseInt(Z(r, "padding-right") || "0", 10), n = n - parseInt(Z(r, "padding-top") || "0", 10) - parseInt(Z(r, "padding-bottom") || "0", 10), Number.isNaN(t) && (t = 0), Number.isNaN(n) && (n = 0), Object.assign(e, {
		width: t,
		height: n,
		size: e.isHorizontal() ? t : n
	}));
}
function vc() {
	let e = this;
	function t(t, n) {
		return parseFloat(t.getPropertyValue(e.getDirectionLabel(n)) || "0");
	}
	let n = e.params, { wrapperEl: r, slidesEl: i, rtlTranslate: a, wrongRTL: o } = e, s = !!(e.virtual && n.virtual?.enabled), c = s ? e.virtual.slides.length : e.slides.length, l = X(i, `.${e.params.slideClass}, swiper-slide`), u = s ? e.virtual.slides.length : l.length, d = [], f = [], p = [], m = (t) => typeof t == "function" ? t.call(e) : t, h = m(n.slidesOffsetBefore), g = m(n.slidesOffsetAfter), _ = e.snapGrid.length, v = e.slidesGrid.length, y = e.size - h - g, b = n.spaceBetween, x = -h, S = 0, C = 0;
	if (y === void 0) return;
	typeof b == "string" && b.indexOf("%") >= 0 ? b = parseFloat(b.replace("%", "")) / 100 * y : typeof b == "string" && (b = parseFloat(b)), e.virtualSize = -b - h - g, l.forEach((e) => {
		a ? e.style.marginLeft = "" : e.style.marginRight = "", e.style.marginBottom = "", e.style.marginTop = "";
	}), n.centeredSlides && n.cssMode && (Vo(r, "--swiper-centered-offset-before", ""), Vo(r, "--swiper-centered-offset-after", "")), n.cssMode && (Vo(r, "--swiper-slides-offset-before", `${h}px`), Vo(r, "--swiper-slides-offset-after", `${g}px`));
	let w = n.grid && n.grid.rows > 1 && e.grid;
	w ? e.grid.initSlides(l) : e.grid && e.grid.unsetSlides();
	let T = 0, E = n.slidesPerView === "auto" && n.breakpoints && Object.keys(n.breakpoints).filter((e) => n.breakpoints[e]?.slidesPerView !== void 0).length > 0;
	for (let r = 0; r < u; r += 1) {
		T = 0;
		let i = l[r];
		if (!(i && (w && e.grid.updateSlide(r, i, l), Z(i, "display") === "none"))) {
			if (s && n.slidesPerView === "auto") n.virtual?.slidesPerViewAutoSlideSize && (T = n.virtual.slidesPerViewAutoSlideSize), T && i && (n.roundLengths && (T = Math.floor(T)), i.style[e.getDirectionLabel("width")] = `${T}px`);
			else if (n.slidesPerView === "auto") {
				E && (i.style[e.getDirectionLabel("width")] = "");
				let r = getComputedStyle(i), a = i.style.transform, o = i.style.webkitTransform;
				if (a && (i.style.transform = "none"), o && (i.style.webkitTransform = "none"), n.roundLengths) T = e.isHorizontal() ? Zo(i, "width") : Zo(i, "height");
				else {
					let e = t(r, "width"), n = t(r, "padding-left"), a = t(r, "padding-right"), o = t(r, "margin-left"), s = t(r, "margin-right"), c = r.getPropertyValue("box-sizing");
					if (c && c === "border-box") T = e + o + s;
					else {
						let { clientWidth: t, offsetWidth: r } = i;
						T = e + n + a + o + s + (r - t);
					}
				}
				a && (i.style.transform = a), o && (i.style.webkitTransform = o), n.roundLengths && (T = Math.floor(T));
			} else T = (y - (n.slidesPerView - 1) * b) / n.slidesPerView, n.roundLengths && (T = Math.floor(T)), i && (i.style[e.getDirectionLabel("width")] = `${T}px`);
			i && (i.swiperSlideSize = T), p.push(T), n.centeredSlides ? (x = x + T / 2 + S / 2 + b, S === 0 && r !== 0 && (x = x - y / 2 - b), r === 0 && (x = x - y / 2 - b), Math.abs(x) < 1 / 1e3 && (x = 0), n.roundLengths && (x = Math.floor(x)), C % n.slidesPerGroup === 0 && d.push(x), f.push(x)) : (n.roundLengths && (x = Math.floor(x)), (C - Math.min(e.params.slidesPerGroupSkip, C)) % e.params.slidesPerGroup === 0 && d.push(x), f.push(x), x = x + T + b), e.virtualSize += T + b, S = T, C += 1;
		}
	}
	if (e.virtualSize = Math.max(e.virtualSize, y) + g, a && o && (n.effect === "slide" || n.effect === "coverflow") && (r.style.width = `${e.virtualSize + b}px`), n.setWrapperSize && (r.style[e.getDirectionLabel("width")] = `${e.virtualSize + b}px`), w && e.grid.updateWrapperSize(T, d), !n.centeredSlides) {
		let t = n.slidesPerView !== "auto" && n.slidesPerView % 1 != 0, r = n.snapToSlideEdge && !n.loop && (n.slidesPerView === "auto" || t), i = d.length;
		if (r) {
			let e;
			if (n.slidesPerView === "auto") {
				e = 1;
				let t = 0;
				for (let n = p.length - 1; n >= 0 && (t += p[n] + (n < p.length - 1 ? b : 0), t <= y); --n) e = p.length - n;
			} else e = Math.floor(n.slidesPerView);
			i = Math.max(u - e, 0);
		}
		let a = [];
		for (let t = 0; t < d.length; t += 1) {
			let o = d[t];
			n.roundLengths && (o = Math.floor(o)), r ? t <= i && a.push(o) : d[t] <= e.virtualSize - y && a.push(o);
		}
		d = a, Math.floor(e.virtualSize - y) - Math.floor(d[d.length - 1]) > 1 && (r || d.push(e.virtualSize - y));
	}
	if (s && n.loop) {
		let t = p[0] + b, r = (e.virtual.slidesBefore ?? 0) + (e.virtual.slidesAfter ?? 0);
		if (n.slidesPerGroup > 1) {
			let e = Math.ceil(r / n.slidesPerGroup), i = t * n.slidesPerGroup;
			for (let t = 0; t < e; t += 1) d.push(d[d.length - 1] + i);
		}
		for (let i = 0; i < r; i += 1) n.slidesPerGroup === 1 && d.push(d[d.length - 1] + t), f.push(f[f.length - 1] + t), e.virtualSize += t;
	}
	if (d.length === 0 && (d = [0]), b !== 0) {
		let t = e.isHorizontal() && a ? "marginLeft" : e.getDirectionLabel("marginRight");
		l.filter((e, t) => !n.cssMode || n.loop ? !0 : t !== l.length - 1).forEach((e) => {
			e.style[t] = `${b}px`;
		});
	}
	if (n.centeredSlides && n.centeredSlidesBounds) {
		let e = 0;
		p.forEach((t) => {
			e += t + (b || 0);
		}), e -= b;
		let t = e > y ? e - y : 0;
		d = d.map((e) => e <= 0 ? -h : e > t ? t + g : e);
	}
	if (n.centerInsufficientSlides) {
		let e = 0;
		if (p.forEach((t) => {
			e += t + (b || 0);
		}), e -= b, e < y) {
			let t = (y - e) / 2;
			d.forEach((e, n) => {
				d[n] = e - t;
			}), f.forEach((e, n) => {
				f[n] = e + t;
			});
		}
	}
	if (Object.assign(e, {
		slides: l,
		snapGrid: d,
		slidesGrid: f,
		slidesSizesGrid: p
	}), n.centeredSlides && n.cssMode && !n.centeredSlidesBounds) {
		Vo(r, "--swiper-centered-offset-before", `${-d[0]}px`), Vo(r, "--swiper-centered-offset-after", `${e.size / 2 - p[p.length - 1] / 2}px`);
		let t = -e.snapGrid[0], n = -e.slidesGrid[0];
		e.snapGrid = e.snapGrid.map((e) => e + t), e.slidesGrid = e.slidesGrid.map((e) => e + n);
	}
	if (u !== c && e.emit("slidesLengthChange"), d.length !== _ && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), f.length !== v && e.emit("slidesGridLengthChange"), n.watchSlidesProgress && e.updateSlidesOffset(), e.emit("slidesUpdated"), !s && !n.cssMode && (n.effect === "slide" || n.effect === "fade")) {
		let t = `${n.containerModifierClass}backface-hidden`, r = e.el.classList.contains(t);
		u <= n.maxBackfaceHiddenSlides ? r || e.el.classList.add(t) : r && e.el.classList.remove(t);
	}
}
var yc = (e, t, n) => {
	t && !e.classList.contains(n) ? e.classList.add(n) : !t && e.classList.contains(n) && e.classList.remove(n);
};
function bc() {
	let e = this, { slides: t, params: n, slidesEl: r, activeIndex: i } = e, a = !!(e.virtual && n.virtual?.enabled), o = e.grid && n.grid && n.grid.rows > 1, s = (e) => X(r, `.${n.slideClass}${e}, swiper-slide${e}`)[0], c, l, u;
	if (a) {
		if (n.loop) {
			let t = e.virtual.slides, n = i - (e.virtual.slidesBefore ?? 0);
			n < 0 && (n = t.length + n), n >= t.length && (n -= t.length), c = s(`[data-swiper-slide-index="${n}"]`);
		} else c = s(`[data-swiper-slide-index="${i}"]`);
	} else o ? (c = t.find((e) => e.column === i), u = t.find((e) => e.column === i + 1), l = t.find((e) => e.column === i - 1)) : c = t[i];
	c && (o || (u = Jo(c, `.${n.slideClass}, swiper-slide`)[0], n.loop && !u && (u = t[0]), l = qo(c, `.${n.slideClass}, swiper-slide`)[0], n.loop)), t.forEach((e) => {
		yc(e, e === c, n.slideActiveClass), yc(e, e === u, n.slideNextClass), yc(e, e === l, n.slidePrevClass);
	}), e.emitSlidesClasses();
}
function xc() {
	let e = this, t = e.slides, n = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
	for (let r = 0; r < t.length; r += 1) t[r].swiperSlideOffset = (e.isHorizontal() ? t[r].offsetLeft : t[r].offsetTop) - n - e.cssOverflowAdjustment();
}
var Sc = (e, t, n) => {
	t && !e.classList.contains(n) ? e.classList.add(n) : !t && e.classList.contains(n) && e.classList.remove(n);
};
function Cc(e = this && this.translate || 0) {
	let t = this, n = t.params, { slides: r, rtlTranslate: i, snapGrid: a } = t;
	if (r.length === 0) return;
	r[0].swiperSlideOffset === void 0 && t.updateSlidesOffset();
	let o = -e;
	i && (o = e), t.visibleSlidesIndexes = [], t.visibleSlides = [];
	let s = n.spaceBetween;
	typeof s == "string" && s.indexOf("%") >= 0 ? s = parseFloat(s.replace("%", "")) / 100 * t.size : typeof s == "string" && (s = parseFloat(s));
	for (let e = 0; e < r.length; e += 1) {
		let c = r[e], l = c.swiperSlideOffset ?? 0;
		n.cssMode && n.centeredSlides && (l -= r[0].swiperSlideOffset ?? 0);
		let u = c.swiperSlideSize ?? 0, d = (o + (n.centeredSlides ? t.minTranslate() : 0) - l) / (u + s), f = (o - a[0] + (n.centeredSlides ? t.minTranslate() : 0) - l) / (u + s), p = -(o - l), m = p + t.slidesSizesGrid[e], h = p >= 0 && p <= t.size - t.slidesSizesGrid[e], g = p >= 0 && p < t.size - 1 || m > 1 && m <= t.size || p <= 0 && m >= t.size;
		g && (t.visibleSlides.push(c), t.visibleSlidesIndexes.push(e)), Sc(c, g, n.slideVisibleClass), Sc(c, h, n.slideFullyVisibleClass), c.progress = i ? -d : d, c.originalProgress = i ? -f : f;
	}
}
var wc = {
	eventsEmitter: Ss,
	update: {
		updateSize: _c,
		updateSlides: vc,
		updateAutoHeight: mc,
		updateSlidesOffset: xc,
		updateSlidesProgress: Cc,
		updateProgress: gc,
		updateSlidesClasses: bc,
		updateActiveIndex: pc,
		updateClickedSlide: hc
	},
	translate: dc,
	transition: ac,
	slide: ec,
	loop: Us,
	grabCursor: zs,
	events: Is,
	breakpoints: ms,
	checkOverflow: gs,
	classes: bs
}, Tc = {}, Ec = class e {
	static extendedDefaults;
	static defaults;
	constructor(...t) {
		let n, r;
		if (t.length === 1 && t[0] !== null && typeof t[0] == "object" && Object.prototype.toString.call(t[0]).slice(8, -1) === "Object" ? r = t[0] : [n, r] = t, r ||= {}, r = Y({}, r), n && !r.el && (r.el = n), r.el && typeof r.el == "string" && typeof document < "u" && document.querySelectorAll(r.el).length > 1) {
			let t = [];
			return document.querySelectorAll(r.el).forEach((n) => {
				let i = Y({}, r, { el: n });
				t.push(new e(i));
			}), t;
		}
		let i = this;
		i.__swiper__ = !0, i.support = ts(), i.device = is({ userAgent: r.userAgent ?? void 0 }), i.browser = ss(), i.eventsListeners = {}, i.eventsAnyListeners = [], i.modules = [...i.__modules__ || []], r.modules && Array.isArray(r.modules) && r.modules.forEach((e) => {
			let t = e;
			typeof t == "function" && i.modules.indexOf(t) < 0 && i.modules.push(t);
		});
		let a = {};
		if (i.modules.forEach((e) => {
			e({
				params: r,
				swiper: i,
				extendParams: Ws(r, a),
				on: i.on.bind(i),
				once: i.once.bind(i),
				off: i.off.bind(i),
				emit: i.emit.bind(i)
			});
		}), i.params = Y({}, Y({}, xs, a), Tc, r), i.originalParams = Y({}, i.params), i.passedParams = Y({}, r), i.params && i.params.on) {
			let e = i.params.on;
			Object.keys(e).forEach((t) => {
				let n = e[t];
				n && i.on(t, n);
			});
		}
		return i.params && i.params.onAny && i.onAny(i.params.onAny), Object.assign(i, {
			enabled: i.params.enabled,
			el: n,
			classNames: [],
			slides: [],
			slidesGrid: [],
			snapGrid: [],
			slidesSizesGrid: [],
			isHorizontal() {
				return i.params.direction === "horizontal";
			},
			isVertical() {
				return i.params.direction === "vertical";
			},
			activeIndex: 0,
			realIndex: 0,
			isBeginning: !0,
			isEnd: !1,
			translate: 0,
			previousTranslate: 0,
			progress: 0,
			velocity: 0,
			animating: !1,
			cssOverflowAdjustment() {
				return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
			},
			allowSlideNext: i.params.allowSlideNext,
			allowSlidePrev: i.params.allowSlidePrev,
			touchEventsData: {
				isTouched: void 0,
				isMoved: void 0,
				allowTouchCallbacks: void 0,
				touchStartTime: void 0,
				isScrolling: void 0,
				currentTranslate: void 0,
				startTranslate: void 0,
				allowThresholdMove: void 0,
				focusableElements: i.params.focusableElements,
				lastClickTime: 0,
				clickTimeout: void 0,
				velocities: [],
				allowMomentumBounce: void 0,
				startMoving: void 0,
				pointerId: null,
				touchId: null
			},
			allowClick: !0,
			allowTouchMove: i.params.allowTouchMove,
			touches: {
				startX: 0,
				startY: 0,
				currentX: 0,
				currentY: 0,
				diff: 0
			},
			imagesToLoad: [],
			imagesLoaded: 0
		}), i.emit("_swiper"), i.params.init && i.init(), i;
	}
	getDirectionLabel(e) {
		return this.isHorizontal() ? e : {
			width: "height",
			"margin-top": "margin-left",
			"margin-bottom ": "margin-right",
			"margin-left": "margin-top",
			"margin-right": "margin-bottom",
			"padding-left": "padding-top",
			"padding-right": "padding-bottom",
			marginRight: "marginBottom"
		}[e];
	}
	isHorizontal() {
		return this.params.direction === "horizontal";
	}
	isVertical() {
		return this.params.direction === "vertical";
	}
	cssOverflowAdjustment() {
		return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
	}
	getSlideIndex(e) {
		let { slidesEl: t, params: n } = this, r = Yo(X(t, `.${n.slideClass}, swiper-slide`)[0]);
		return Yo(e) - (r ?? 0);
	}
	getSlideIndexByData(e) {
		return this.getSlideIndex(this.slides.find((t) => Number(t.getAttribute("data-swiper-slide-index")) === e));
	}
	getSlideIndexWhenGrid(e) {
		return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e %= Math.ceil(this.slides.length / this.params.grid.rows))), e;
	}
	recalcSlides() {
		let { slidesEl: e, params: t } = this;
		this.slides = X(e, `.${t.slideClass}, swiper-slide`);
	}
	enable() {
		this.enabled || (this.enabled = !0, this.params.grabCursor && this.setGrabCursor(), this.emit("enable"));
	}
	disable() {
		this.enabled && (this.enabled = !1, this.params.grabCursor && this.unsetGrabCursor(), this.emit("disable"));
	}
	setProgress(e, t) {
		e = Math.min(Math.max(e, 0), 1);
		let n = this.minTranslate(), r = (this.maxTranslate() - n) * e + n;
		this.translateTo(r, t === void 0 ? 0 : t), this.updateActiveIndex(), this.updateSlidesClasses();
	}
	emitContainerClasses() {
		if (!this.params._emitClasses || !this.el) return;
		let e = this.el.className.split(" ").filter((e) => e.indexOf("swiper") === 0 || e.indexOf(this.params.containerModifierClass) === 0);
		this.emit("_containerClasses", e.join(" "));
	}
	getSlideClasses(e) {
		return this.destroyed ? "" : e.className.split(" ").filter((e) => e.indexOf("swiper-slide") === 0 || e.indexOf(this.params.slideClass) === 0).join(" ");
	}
	emitSlidesClasses() {
		if (!this.params._emitClasses || !this.el) return;
		let e = [];
		this.slides.forEach((t) => {
			let n = this.getSlideClasses(t);
			e.push({
				slideEl: t,
				classNames: n
			}), this.emit("_slideClass", t, n);
		}), this.emit("_slideClasses", e);
	}
	slidesPerViewDynamic(e = "current", t = !1) {
		let { params: n, slides: r, slidesGrid: i, slidesSizesGrid: a, size: o, activeIndex: s } = this, c = 1;
		if (typeof n.slidesPerView == "number") return n.slidesPerView;
		if (!o) return c;
		if (n.centeredSlides) {
			let e = r[s] ? Math.ceil(r[s].swiperSlideSize ?? 0) : 0, t = !1;
			for (let n = s + 1; n < r.length; n += 1) r[n] && !t && (e += Math.ceil(r[n].swiperSlideSize ?? 0), c += 1, e > o && (t = !0));
			for (let n = s - 1; n >= 0; --n) r[n] && !t && (e += r[n].swiperSlideSize ?? 0, c += 1, e > o && (t = !0));
		} else if (e === "current") for (let e = s + 1; e < r.length; e += 1) (t ? i[e] + a[e] - i[s] < o : i[e] - i[s] < o) && (c += 1);
		else for (let e = s - 1; e >= 0; --e) i[s] - i[e] < o && (c += 1);
		return c;
	}
	update() {
		let e = this;
		if (!e || e.destroyed) return;
		let { snapGrid: t, params: n } = e;
		n.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll("[loading=\"lazy\"]")].forEach((t) => {
			t.complete && cs(e, t);
		}), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
		function r() {
			let t = e.rtlTranslate ? e.translate * -1 : e.translate, n = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
			e.setTranslate(n), e.updateActiveIndex(), e.updateSlidesClasses();
		}
		let i;
		if (n.freeMode?.enabled && !n.cssMode) r(), n.autoHeight && e.updateAutoHeight();
		else {
			if ((n.slidesPerView === "auto" || n.slidesPerView > 1) && e.isEnd && !n.centeredSlides) {
				let t = e.virtual && n.virtual?.enabled ? e.virtual.slides.length : e.slides.length;
				i = e.slideTo(t - 1, 0, !1, !0);
			} else i = e.slideTo(e.activeIndex, 0, !1, !0);
			i || r();
		}
		n.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
	}
	changeDirection(e, t = !0) {
		let n = this, r = n.params.direction;
		return e ||= r === "horizontal" ? "vertical" : "horizontal", e === r || e !== "horizontal" && e !== "vertical" ? n : (n.el.classList.remove(`${n.params.containerModifierClass}${r}`), n.el.classList.add(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.forEach((t) => {
			e === "vertical" ? t.style.width = "" : t.style.height = "";
		}), n.emit("changeDirection"), t && n.update(), n);
	}
	changeLanguageDirection(e) {
		let t = this;
		t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
	}
	mount(e) {
		let t = this;
		if (t.mounted) return !0;
		if (typeof document > "u") return !1;
		let n = e ?? t.params.el, r = null;
		if (typeof n == "string" ? r = document.querySelector(n) : n instanceof HTMLElement && (r = n), !r) return !1;
		r.swiper = t;
		let i = r.parentNode;
		i && i.host && i.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
		let a = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`, o = r && r.shadowRoot ? r.shadowRoot.querySelector(a()) : X(r, a())[0];
		!o && t.params.createElements && (o = Go("div", t.params.wrapperClass), r.append(o), X(r, `.${t.params.slideClass}`).forEach((e) => {
			o.append(e);
		}));
		let s = t.isElement ? r.parentNode.host : null;
		return Object.assign(t, {
			el: r,
			wrapperEl: o,
			slidesEl: t.isElement && !s.slideSlots ? s : o,
			hostEl: t.isElement ? s : r,
			mounted: !0,
			rtl: r.dir.toLowerCase() === "rtl" || Z(r, "direction") === "rtl",
			rtlTranslate: t.params.direction === "horizontal" && (r.dir.toLowerCase() === "rtl" || Z(r, "direction") === "rtl"),
			wrongRTL: Z(o, "display") === "-webkit-box"
		}), !0;
	}
	init(e) {
		let t = this;
		if (t.initialized || t.mount(e) === !1) return t;
		t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual?.enabled ? t.slideTo((t.params.initialSlide ?? 0) + (t.virtual.slidesBefore ?? 0), 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
		let n = [...t.el.querySelectorAll("[loading=\"lazy\"]")];
		return t.isElement && n.push(...t.hostEl.querySelectorAll("[loading=\"lazy\"]")), n.forEach((e) => {
			e.complete ? cs(t, e) : e.addEventListener("load", (e) => {
				cs(t, e.target);
			});
		}), us(t), t.initialized = !0, us(t), t.emit("init"), t.emit("afterInit"), t;
	}
	destroy(e = !0, t = !0) {
		let n = this, { params: r, el: i, wrapperEl: a, slides: o } = n;
		return n.params === void 0 || n.destroyed ? null : (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), r.loop && n.loopDestroy(), t && (n.removeClasses(), i && typeof i != "string" && i.removeAttribute("style"), a && a.removeAttribute("style"), o && o.length && o.forEach((e) => {
			e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass, r.slideActiveClass, r.slideNextClass, r.slidePrevClass), e.removeAttribute("style"), e.removeAttribute("data-swiper-slide-index");
		})), n.emit("destroy"), Object.keys(n.eventsListeners).forEach((e) => {
			n.off(e);
		}), e !== !1 && (n.el && typeof n.el != "string" && (n.el.swiper = null), Po(n)), n.destroyed = !0, null);
	}
	static extendDefaults(e) {
		Y(Tc, e);
	}
	static installModule(t) {
		e.prototype.__modules__ || (e.prototype.__modules__ = []);
		let n = e.prototype.__modules__;
		typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
	}
	static use(t) {
		return Array.isArray(t) ? (t.forEach((t) => e.installModule(t)), e) : (e.installModule(t), e);
	}
};
Object.defineProperty(Ec, "extendedDefaults", { get() {
	return Tc;
} }), Object.defineProperty(Ec, "defaults", { get() {
	return xs;
} });
var Dc = wc, Oc = Ec.prototype;
Object.keys(Dc).forEach((e) => {
	let t = Dc[e];
	Object.keys(t).forEach((e) => {
		Oc[e] = t[e];
	});
}), Ec.use([Ks, Gs]);
//#endregion
//#region node_modules/swiper/modules/keyboard.mjs
var kc = ({ swiper: e, extendParams: t, on: n, emit: r }) => {
	t({ keyboard: {
		enabled: !1,
		onlyInViewport: !0,
		pageUpDown: !0,
		speed: void 0
	} });
	function i() {
		return e.params.keyboard;
	}
	function a(t) {
		if (!e.enabled) return;
		let { rtlTranslate: n } = e, a = "originalEvent" in t && t.originalEvent ? t.originalEvent : t, o = a.keyCode || a.charCode, s = i(), c = !!s.pageUpDown, l = c && o === 33, u = c && o === 34, d = o === 37, f = o === 39, p = o === 38, m = o === 40;
		if (!e.allowSlideNext && (e.isHorizontal() && f || e.isVertical() && m || u) || !e.allowSlidePrev && (e.isHorizontal() && d || e.isVertical() && p || l)) return !1;
		if (a.shiftKey || a.altKey || a.ctrlKey || a.metaKey) return;
		let h = document.activeElement;
		if (h && (h.isContentEditable || h.nodeName && (h.nodeName.toLowerCase() === "input" || h.nodeName.toLowerCase() === "textarea"))) return;
		if (s.onlyInViewport && (l || u || d || f || p || m)) {
			let t = !1;
			if (Xo(e.el, `.${e.params.slideClass}, swiper-slide`).length > 0 && Xo(e.el, `.${e.params.slideActiveClass}`).length === 0) return;
			let r = e.el, i = r.clientWidth, a = r.clientHeight, o = window.innerWidth, s = window.innerHeight, c = Ko(r);
			n && (c.left -= r.scrollLeft);
			let l = [
				[c.left, c.top],
				[c.left + i, c.top],
				[c.left, c.top + a],
				[c.left + i, c.top + a]
			];
			for (let e = 0; e < l.length; e += 1) {
				let n = l[e];
				if (n[0] >= 0 && n[0] <= o && n[1] >= 0 && n[1] <= s) {
					if (n[0] === 0 && n[1] === 0) continue;
					t = !0;
				}
			}
			if (!t) return;
		}
		let g = s.speed;
		e.isHorizontal() ? ((l || u || d || f) && a.cancelable && a.preventDefault(), ((u || f) && !n || (l || d) && n) && e.slideNext(g), ((l || d) && !n || (u || f) && n) && e.slidePrev(g)) : ((l || u || p || m) && a.cancelable && a.preventDefault(), (u || m) && e.slideNext(g), (l || p) && e.slidePrev(g)), r("keyPress", o);
	}
	function o() {
		e.keyboard.enabled || (document.addEventListener("keydown", a), e.keyboard.enabled = !0);
	}
	function s() {
		e.keyboard.enabled && (document.removeEventListener("keydown", a), e.keyboard.enabled = !1);
	}
	e.keyboard = {
		enabled: !1,
		enable: o,
		disable: s
	}, n("init", () => {
		i().enabled && o();
	}), n("destroy", () => {
		e.keyboard.enabled && s();
	});
};
//#endregion
//#region node_modules/swiper/shared/create-element-if-not-defined.mjs
function Ac(e, t, n, r) {
	let i = n ?? {}, a = t ?? {};
	return e.params.createElements && Object.keys(r).forEach((t) => {
		if (!i[t] && i.auto === !0) {
			let n = X(e.el, `.${r[t]}`)[0];
			n || (n = Go("div", r[t]), n.className = r[t], e.el.append(n)), i[t] = n, a[t] = n;
		}
	}), i;
}
//#endregion
//#region node_modules/swiper/modules/navigation.mjs
var jc = "<svg class=\"swiper-navigation-icon\" width=\"11\" height=\"20\" viewBox=\"0 0 11 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z\" fill=\"currentColor\"/></svg>", Mc = ({ swiper: e, extendParams: t, on: n, emit: r }) => {
	t({ navigation: {
		nextEl: null,
		prevEl: null,
		addIcons: !0,
		hideOnClick: !1,
		disabledClass: "swiper-button-disabled",
		hiddenClass: "swiper-button-hidden",
		lockClass: "swiper-button-lock",
		navigationDisabledClass: "swiper-navigation-disabled"
	} }), e.navigation = {
		nextEl: null,
		prevEl: null,
		arrowSvg: jc
	};
	function i() {
		return e.params.navigation;
	}
	function a(t) {
		let n;
		return t && typeof t == "string" && e.isElement && (n = e.el.querySelector(t) || e.hostEl.querySelector(t), n) ? n : (t && (typeof t == "string" && (n = [...document.querySelectorAll(t)]), e.params.uniqueNavElements && typeof t == "string" && n && n.length > 1 && e.el.querySelectorAll(t).length === 1 ? n = e.el.querySelector(t) : n && n.length === 1 && (n = n[0])), t && !n ? t : n);
	}
	function o(t, n) {
		let r = i();
		Q(t).forEach((t) => {
			t && (t.classList[n ? "add" : "remove"](...r.disabledClass.split(" ")), t.tagName === "BUTTON" && (t.disabled = n), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](r.lockClass));
		});
	}
	function s() {
		let { nextEl: t, prevEl: n } = e.navigation;
		if (e.params.loop) {
			o(n, !1), o(t, !1);
			return;
		}
		o(n, e.isBeginning && !e.params.rewind), o(t, e.isEnd && !e.params.rewind);
	}
	function c(t) {
		t.preventDefault(), !(e.isBeginning && !e.params.loop && !e.params.rewind) && (e.slidePrev(), r("navigationPrev"));
	}
	function l(t) {
		t.preventDefault(), !(e.isEnd && !e.params.loop && !e.params.rewind) && (e.slideNext(), r("navigationNext"));
	}
	function u() {
		e.params.navigation = Ac(e, e.originalParams.navigation, e.params.navigation, {
			nextEl: "swiper-button-next",
			prevEl: "swiper-button-prev"
		});
		let t = i();
		if (!(t.nextEl || t.prevEl)) return;
		let n = a(t.nextEl), r = a(t.prevEl);
		Object.assign(e.navigation, {
			nextEl: n,
			prevEl: r
		});
		let o = Q(n), s = Q(r), u = (n, r) => {
			if (n) {
				if (t.addIcons && n.matches(".swiper-button-next,.swiper-button-prev") && !n.querySelector("svg")) {
					let e = document.createElement("div");
					Qo(e, jc);
					let t = e.querySelector("svg");
					t && n.appendChild(t), e.remove();
				}
				n.addEventListener("click", r === "next" ? l : c);
			}
			!e.enabled && n && n.classList.add(...t.lockClass.split(" "));
		};
		o.forEach((e) => u(e, "next")), s.forEach((e) => u(e, "prev"));
	}
	function d() {
		let t = i(), { nextEl: n, prevEl: r } = e.navigation, a = Q(n), o = Q(r), s = (e, n) => {
			e.removeEventListener("click", n === "next" ? l : c), e.classList.remove(...t.disabledClass.split(" "));
		};
		a.forEach((e) => s(e, "next")), o.forEach((e) => s(e, "prev"));
	}
	n("init", () => {
		i().enabled === !1 ? p() : (u(), s());
	}), n("toEdge fromEdge lock unlock", () => {
		s();
	}), n("destroy", () => {
		d();
	}), n("enable disable", () => {
		let t = i(), { nextEl: n, prevEl: r } = e.navigation, a = Q(n), o = Q(r);
		if (e.enabled) {
			s();
			return;
		}
		[...a, ...o].filter((e) => !!e).forEach((e) => e.classList.add(t.lockClass));
	}), n("click", (t, n) => {
		let a = i(), { nextEl: o, prevEl: s } = e.navigation, c = Q(o), l = Q(s), u = n.target, d = l.includes(u) || c.includes(u);
		if (e.isElement && !d) {
			let e = n.composedPath ? n.composedPath() : [];
			e.length && (d = e.find((e) => c.includes(e) || l.includes(e)));
		}
		if (a.hideOnClick && !d) {
			if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === u || e.pagination.el.contains(u))) return;
			let t;
			c.length ? t = c[0].classList.contains(a.hiddenClass) : l.length && (t = l[0].classList.contains(a.hiddenClass)), r(t === !0 ? "navigationShow" : "navigationHide"), [...c, ...l].filter((e) => !!e).forEach((e) => e.classList.toggle(a.hiddenClass));
		}
	});
	let f = () => {
		let t = i();
		e.el.classList.remove(...t.navigationDisabledClass.split(" ")), u(), s();
	}, p = () => {
		let t = i();
		e.el.classList.add(...t.navigationDisabledClass.split(" ")), d();
	};
	Object.assign(e.navigation, {
		enable: f,
		disable: p,
		update: s,
		init: u,
		destroy: d
	});
};
//#endregion
//#region node_modules/swiper/shared/classes-to-selector.mjs
function $(e = "") {
	return `.${e.trim().replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`;
}
//#endregion
//#region node_modules/swiper/modules/pagination.mjs
var Nc = (e) => !!e.virtual && !!e.params.virtual?.enabled, Pc = (e) => !!e.params.freeMode?.enabled, Fc = (e) => {
	if (Nc(e)) return e.virtual.slides.length;
	let t = e.params.grid?.rows;
	return e.grid && t && t > 1 ? e.slides.length / Math.ceil(t) : e.slides.length;
}, Ic = ({ swiper: e, extendParams: t, on: n, emit: r }) => {
	let i = "swiper-pagination";
	t({ pagination: {
		el: null,
		bulletElement: "span",
		clickable: !1,
		hideOnClick: !1,
		renderBullet: null,
		renderProgressbar: null,
		renderFraction: null,
		renderCustom: null,
		progressbarOpposite: !1,
		type: "bullets",
		dynamicBullets: !1,
		dynamicMainBullets: 1,
		formatFractionCurrent: (e) => e,
		formatFractionTotal: (e) => e,
		bulletClass: `${i}-bullet`,
		bulletActiveClass: `${i}-bullet-active`,
		modifierClass: `${i}-`,
		currentClass: `${i}-current`,
		totalClass: `${i}-total`,
		hiddenClass: `${i}-hidden`,
		progressbarFillClass: `${i}-progressbar-fill`,
		progressbarOppositeClass: `${i}-progressbar-opposite`,
		clickableClass: `${i}-clickable`,
		lockClass: `${i}-lock`,
		horizontalClass: `${i}-horizontal`,
		verticalClass: `${i}-vertical`,
		paginationDisabledClass: `${i}-disabled`
	} }), e.pagination = {
		el: null,
		bullets: []
	};
	let a, o = 0;
	function s() {
		return e.params.pagination;
	}
	function c() {
		return !s().el || !e.pagination.el || Array.isArray(e.pagination.el) && e.pagination.el.length === 0;
	}
	function l(e, t) {
		let { bulletActiveClass: n } = s();
		if (!e) return;
		let r = e[`${t === "prev" ? "previous" : "next"}ElementSibling`];
		r && (r.classList.add(`${n}-${t}`), r = r[`${t === "prev" ? "previous" : "next"}ElementSibling`], r && r.classList.add(`${n}-${t}-${t}`));
	}
	function u(e, t, n) {
		if (e %= n, t %= n, t === e + 1) return "next";
		if (t === e - 1) return "previous";
	}
	function d(t) {
		let n = t.target.closest($(s().bulletClass));
		if (!n) return;
		t.preventDefault();
		let r = (Yo(n) ?? 0) * (e.params.slidesPerGroup ?? 1);
		if (e.params.loop) {
			if (e.realIndex === r) return;
			let t = u(e.realIndex, r, e.slides.length);
			t === "next" ? e.slideNext() : t === "previous" ? e.slidePrev() : e.slideToLoop(r);
		} else e.slideTo(r);
	}
	function f() {
		let t = e.rtl, n = s();
		if (c()) return;
		let i = Q(e.pagination.el), u, d, f = Fc(e), p = e.params.loop ? Math.ceil(f / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
		if (e.params.loop ? (d = e.previousRealIndex || 0, u = (e.params.slidesPerGroup ?? 1) > 1 ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1)) : e.realIndex) : e.snapIndex === void 0 ? (d = e.previousIndex || 0, u = e.activeIndex || 0) : (u = e.snapIndex, d = e.previousSnapIndex), n.type === "bullets" && e.pagination.bullets && e.pagination.bullets.length > 0) {
			let r = e.pagination.bullets, s = 0, c = 0, f = 0;
			if (n.dynamicBullets) {
				a = Zo(r[0], e.isHorizontal() ? "width" : "height");
				let t = e.isHorizontal() ? "width" : "height";
				i.forEach((e) => {
					e.style[t] = `${(a ?? 0) * (n.dynamicMainBullets + 4)}px`;
				}), n.dynamicMainBullets > 1 && d !== void 0 && (o += u - (d || 0), o > n.dynamicMainBullets - 1 ? o = n.dynamicMainBullets - 1 : o < 0 && (o = 0)), s = Math.max(u - o, 0), c = s + (Math.min(r.length, n.dynamicMainBullets) - 1), f = (c + s) / 2;
			}
			if (r.forEach((e) => {
				let t = [
					"",
					"-next",
					"-next-next",
					"-prev",
					"-prev-prev",
					"-main"
				].map((e) => `${n.bulletActiveClass}${e}`).flatMap((e) => typeof e == "string" && e.includes(" ") ? e.split(" ") : [e]);
				e.classList.remove(...t);
			}), i.length > 1) r.forEach((t) => {
				let r = Yo(t);
				r === u ? t.classList.add(...n.bulletActiveClass.split(" ")) : e.isElement && t.setAttribute("part", "bullet"), n.dynamicBullets && r !== void 0 && (r >= s && r <= c && t.classList.add(...`${n.bulletActiveClass}-main`.split(" ")), r === s && l(t, "prev"), r === c && l(t, "next"));
			});
			else {
				let t = r[u];
				if (t && t.classList.add(...n.bulletActiveClass.split(" ")), e.isElement && r.forEach((e, t) => {
					e.setAttribute("part", t === u ? "bullet-active" : "bullet");
				}), n.dynamicBullets) {
					let e = r[s], t = r[c];
					for (let e = s; e <= c; e += 1) r[e] && r[e].classList.add(...`${n.bulletActiveClass}-main`.split(" "));
					l(e, "prev"), l(t, "next");
				}
			}
			if (n.dynamicBullets) {
				let i = Math.min(r.length, n.dynamicMainBullets + 4), o = ((a ?? 0) * i - (a ?? 0)) / 2 - f * (a ?? 0), s = t ? "right" : "left", c = e.isHorizontal() ? s : "top";
				r.forEach((e) => {
					e.style[c] = `${o}px`;
				});
			}
		}
		i.forEach((t, i) => {
			if (n.type === "fraction" && (t.querySelectorAll($(n.currentClass)).forEach((e) => {
				e.textContent = String(n.formatFractionCurrent(u + 1));
			}), t.querySelectorAll($(n.totalClass)).forEach((e) => {
				e.textContent = String(n.formatFractionTotal(p));
			})), n.type === "progressbar") {
				let r;
				r = n.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
				let i = (u + 1) / p, a = 1, o = 1;
				r === "horizontal" ? a = i : o = i, t.querySelectorAll($(n.progressbarFillClass)).forEach((t) => {
					t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${o})`, t.style.transitionDuration = `${e.params.speed}ms`;
				});
			}
			n.type === "custom" && n.renderCustom ? (Qo(t, n.renderCustom(e, u + 1, p)), i === 0 && r("paginationRender", t)) : (i === 0 && r("paginationRender", t), r("paginationUpdate", t)), e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](n.lockClass);
		});
	}
	function p() {
		let t = s();
		if (c()) return;
		let n = Fc(e), i = Q(e.pagination.el), a = "";
		if (t.type === "bullets") {
			let r = e.params.loop ? Math.ceil(n / (e.params.slidesPerGroup ?? 1)) : e.snapGrid.length;
			e.params.freeMode && Pc(e) && r > n && (r = n);
			for (let n = 0; n < r; n += 1) t.renderBullet ? a += t.renderBullet.call(e, n, t.bulletClass) : a += `<${t.bulletElement} ${e.isElement ? "part=\"bullet\"" : ""} class="${t.bulletClass}"></${t.bulletElement}>`;
		}
		t.type === "fraction" && (a = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`), t.type === "progressbar" && (a = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`), e.pagination.bullets = [], i.forEach((n) => {
			t.type !== "custom" && Qo(n, a || ""), t.type === "bullets" && e.pagination.bullets.push(...Array.from(n.querySelectorAll($(t.bulletClass))));
		}), t.type !== "custom" && r("paginationRender", i[0]);
	}
	function m() {
		e.params.pagination = Ac(e, e.originalParams.pagination, e.params.pagination, { el: "swiper-pagination" });
		let t = s();
		if (!t.el) return;
		let n;
		if (typeof t.el == "string" && e.isElement && (n = e.el.querySelector(t.el)), !n && typeof t.el == "string" && (n = [...document.querySelectorAll(t.el)]), n ||= t.el, !(!n || Array.isArray(n) && n.length === 0)) {
			if (e.params.uniqueNavElements && typeof t.el == "string" && Array.isArray(n) && n.length > 1 && (n = [...e.el.querySelectorAll(t.el)], n.length > 1)) {
				let t = n.find((t) => Xo(t, ".swiper")[0] === e.el);
				t && (n = t);
			}
			Array.isArray(n) && n.length === 1 && (n = n[0]), Object.assign(e.pagination, { el: n }), Q(n).forEach((n) => {
				t.type === "bullets" && t.clickable && n.classList.add(...(t.clickableClass || "").split(" ")), n.classList.add(t.modifierClass + t.type), n.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass), t.type === "bullets" && t.dynamicBullets && (n.classList.add(`${t.modifierClass}${t.type}-dynamic`), o = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), t.type === "progressbar" && t.progressbarOpposite && n.classList.add(t.progressbarOppositeClass), t.clickable && n.addEventListener("click", d), e.enabled || n.classList.add(t.lockClass);
			});
		}
	}
	function h() {
		let t = s();
		if (c()) return;
		let n = e.pagination.el;
		n && Q(n).forEach((n) => {
			n.classList.remove(t.hiddenClass), n.classList.remove(t.modifierClass + t.type), n.classList.remove(e.isHorizontal() ? t.horizontalClass : t.verticalClass), t.clickable && (n.classList.remove(...(t.clickableClass || "").split(" ")), n.removeEventListener("click", d));
		}), e.pagination.bullets && e.pagination.bullets.forEach((e) => e.classList.remove(...t.bulletActiveClass.split(" ")));
	}
	n("changeDirection", () => {
		if (!e.pagination || !e.pagination.el) return;
		let t = s();
		Q(e.pagination.el).forEach((n) => {
			n.classList.remove(t.horizontalClass, t.verticalClass), n.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass);
		});
	}), n("init", () => {
		s().enabled === !1 ? _() : (m(), p(), f());
	}), n("activeIndexChange", () => {
		e.snapIndex === void 0 && f();
	}), n("snapIndexChange", () => {
		f();
	}), n("snapGridLengthChange", () => {
		p(), f();
	}), n("destroy", () => {
		h();
	}), n("enable disable", () => {
		let { el: t } = e.pagination;
		if (t) {
			let n = s();
			Q(t).forEach((t) => t.classList[e.enabled ? "remove" : "add"](n.lockClass));
		}
	}), n("lock unlock", () => {
		f();
	}), n("click", (t, n) => {
		let i = n.target, a = Q(e.pagination.el), o = s();
		if (o.el && o.hideOnClick && a && a.length > 0 && !i.classList.contains(o.bulletClass)) {
			if (e.navigation && (e.navigation.nextEl && i === e.navigation.nextEl || e.navigation.prevEl && i === e.navigation.prevEl)) return;
			a[0].classList.contains(o.hiddenClass) === !0 ? r("paginationShow") : r("paginationHide"), a.forEach((e) => e.classList.toggle(o.hiddenClass));
		}
	});
	let g = () => {
		let t = s();
		e.el.classList.remove(t.paginationDisabledClass);
		let { el: n } = e.pagination;
		n && Q(n).forEach((e) => e.classList.remove(t.paginationDisabledClass)), m(), p(), f();
	}, _ = () => {
		let t = s();
		e.el.classList.add(t.paginationDisabledClass);
		let { el: n } = e.pagination;
		n && Q(n).forEach((e) => e.classList.add(t.paginationDisabledClass)), h();
	};
	Object.assign(e.pagination, {
		enable: g,
		disable: _,
		render: p,
		update: f,
		init: m,
		destroy: h
	});
}, Lc = (e) => !!e.virtual && !!e.params.virtual?.enabled, Rc = ({ swiper: e, extendParams: t, on: n }) => {
	t({ a11y: {
		enabled: !0,
		notificationClass: "swiper-notification",
		prevSlideMessage: "Previous slide",
		nextSlideMessage: "Next slide",
		firstSlideMessage: "This is the first slide",
		lastSlideMessage: "This is the last slide",
		paginationBulletMessage: "Go to slide {{index}}",
		slideLabelMessage: "{{index}} / {{slidesLength}}",
		containerMessage: null,
		containerRoleDescriptionMessage: null,
		containerRole: null,
		itemRoleDescriptionMessage: null,
		slideRole: "group",
		id: null,
		scrollOnFocus: !0,
		wrapperLiveRegion: !0
	} }), e.a11y = { clicked: !1 };
	let r = null, i = !1, a, o = (/* @__PURE__ */ new Date()).getTime();
	function s() {
		return e.params.a11y;
	}
	function c(e) {
		let t = r;
		!t || !e || Qo(t, e);
	}
	function l(e = 16) {
		return "x".repeat(e).replace(/x/g, () => Math.round(16 * Math.random()).toString(16));
	}
	function u(e) {
		Q(e).forEach((e) => {
			e.setAttribute("tabIndex", "0");
		});
	}
	function d(e) {
		Q(e).forEach((e) => {
			e.setAttribute("tabIndex", "-1");
		});
	}
	function f(e, t) {
		Q(e).forEach((e) => {
			e.setAttribute("role", t);
		});
	}
	function p(e, t) {
		Q(e).forEach((e) => {
			e.setAttribute("aria-roledescription", t);
		});
	}
	function m(e, t) {
		Q(e).forEach((e) => {
			e.setAttribute("aria-label", t);
		});
	}
	function h(e, t) {
		Q(e).forEach((e) => {
			e.setAttribute("id", t);
		});
	}
	function g(e, t) {
		Q(e).forEach((e) => {
			e.setAttribute("aria-live", t);
		});
	}
	function _(e) {
		Q(e).forEach((e) => {
			e.setAttribute("aria-disabled", "true");
		});
	}
	function v(e) {
		Q(e).forEach((e) => {
			e.removeAttribute("aria-disabled");
		});
	}
	function y(t) {
		if (t.keyCode !== 13 && t.keyCode !== 32) return;
		let n = s(), r = e.params.pagination, i = t.target;
		if (!(e.pagination && e.pagination.el && (i === e.pagination.el || e.pagination.el.contains(i)) && !i.matches($(r?.bulletClass)))) {
			if (e.navigation && e.navigation.prevEl && e.navigation.nextEl) {
				let t = Q(e.navigation.prevEl);
				Q(e.navigation.nextEl).includes(i) && (e.isEnd && !e.params.loop || e.slideNext(), e.isEnd ? c(n.lastSlideMessage) : c(n.nextSlideMessage)), t.includes(i) && (e.isBeginning && !e.params.loop || e.slidePrev(), e.isBeginning ? c(n.firstSlideMessage) : c(n.prevSlideMessage));
			}
			e.pagination && i.matches($(r?.bulletClass)) && i.click();
		}
	}
	function b() {
		if (e.params.loop || e.params.rewind || !e.navigation) return;
		let { nextEl: t, prevEl: n } = e.navigation;
		n && (e.isBeginning ? (_(n), d(n)) : (v(n), u(n))), t && (e.isEnd ? (_(t), d(t)) : (v(t), u(t)));
	}
	function x() {
		return !!(e.pagination && e.pagination.bullets && e.pagination.bullets.length);
	}
	function S() {
		let t = e.params.pagination;
		return x() && !!t?.clickable;
	}
	function C() {
		let t = s();
		if (!x()) return;
		let n = e.params.pagination;
		e.pagination.bullets.forEach((e) => {
			n.clickable && (u(e), n.renderBullet || (f(e, "button"), m(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, String((Yo(e) ?? 0) + 1))))), e.matches($(n.bulletActiveClass)) ? e.setAttribute("aria-current", "true") : e.removeAttribute("aria-current");
		});
	}
	let w = (e, t, n) => {
		u(e), e.tagName !== "BUTTON" && (f(e, "button"), e.addEventListener("keydown", y)), m(e, n);
	}, T = (t) => {
		a && a !== t.target && !a.contains(t.target) && (i = !0), e.a11y.clicked = !0;
	}, E = () => {
		i = !1, requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				e.destroyed || (e.a11y.clicked = !1);
			});
		});
	}, D = (e) => {
		o = (/* @__PURE__ */ new Date()).getTime();
	}, O = (t) => {
		let n = s();
		if (e.a11y.clicked || !n.scrollOnFocus || (/* @__PURE__ */ new Date()).getTime() - o < 100) return;
		let r = t.target.closest(`.${e.params.slideClass}, swiper-slide`);
		if (!r || !e.slides.includes(r)) return;
		a = r;
		let c = Lc(e), l = (c ? parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10) : e.slides.indexOf(r)) === e.activeIndex, u = e.params.watchSlidesProgress && e.visibleSlides && e.visibleSlides.includes(r);
		if (l || u) return;
		let d = t.sourceCapabilities;
		d && d.firesTouchEvents || (e.isHorizontal() ? e.el.scrollLeft = 0 : e.el.scrollTop = 0, requestAnimationFrame(() => {
			i ||= (e.params.loop ? e.slideToLoop(e.getSlideIndexWhenGrid(parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10)), 0) : c ? e.slideTo(e.getSlideIndexWhenGrid(parseInt(r.getAttribute("data-swiper-slide-index") || "0", 10)), 0) : e.slideTo(e.getSlideIndexWhenGrid(e.slides.indexOf(r)), 0), !1);
		}));
	}, k = () => {
		let t = s();
		t.itemRoleDescriptionMessage && p(e.slides, t.itemRoleDescriptionMessage), t.slideRole && f(e.slides, t.slideRole);
		let n = e.slides.length, r = t.slideLabelMessage;
		r && e.slides.forEach((t, i) => {
			let a = e.params.loop ? parseInt(t.getAttribute("data-swiper-slide-index") || "0", 10) : i;
			m(t, r.replace(/\{\{index\}\}/, String(a + 1)).replace(/\{\{slidesLength\}\}/, String(n)));
		});
	}, ee = () => {
		let t = s();
		r && e.el.append(r);
		let n = e.el;
		t.containerRoleDescriptionMessage && p(n, t.containerRoleDescriptionMessage), t.containerMessage && m(n, t.containerMessage), t.containerRole && f(n, t.containerRole);
		let i = e.wrapperEl, a = String(t.id || i.getAttribute("id") || `swiper-wrapper-${l(16)}`);
		if (h(i, a), t.wrapperLiveRegion) {
			let t = e.params.autoplay;
			g(i, e.params.autoplay && t?.enabled ? "off" : "polite");
		}
		k();
		let o = e.navigation ? e.navigation : {
			nextEl: void 0,
			prevEl: void 0
		}, c = Q(o.nextEl), u = Q(o.prevEl);
		c && c.forEach((e) => w(e, a, t.nextSlideMessage)), u && u.forEach((e) => w(e, a, t.prevSlideMessage)), S() && Q(e.pagination.el).forEach((e) => {
			e.addEventListener("keydown", y);
		}), document.addEventListener("visibilitychange", D), e.el.addEventListener("focus", O, !0), e.el.addEventListener("pointerdown", T, !0), e.el.addEventListener("pointerup", E, !0);
	};
	function A() {
		r && r.remove();
		let t = e.navigation ? e.navigation : {
			nextEl: void 0,
			prevEl: void 0
		}, n = Q(t.nextEl), i = Q(t.prevEl);
		n && n.forEach((e) => e.removeEventListener("keydown", y)), i && i.forEach((e) => e.removeEventListener("keydown", y)), S() && Q(e.pagination.el).forEach((e) => {
			e.removeEventListener("keydown", y);
		}), document.removeEventListener("visibilitychange", D), e.el && typeof e.el != "string" && (e.el.removeEventListener("focus", O, !0), e.el.removeEventListener("pointerdown", T, !0), e.el.removeEventListener("pointerup", E, !0));
	}
	n("beforeInit", () => {
		r = Go("span", s().notificationClass), r.setAttribute("aria-live", "assertive"), r.setAttribute("aria-atomic", "true");
	}), n("afterInit", () => {
		s().enabled && ee();
	}), n("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
		s().enabled && k();
	}), n("fromEdge toEdge afterInit lock unlock", () => {
		s().enabled && b();
	}), n("paginationUpdate", () => {
		s().enabled && C();
	}), n("destroy", () => {
		s().enabled && A();
	});
}, zc = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (document.querySelectorAll("[data-carousel]").forEach((e) => {
	let t = e.querySelector(".post-window"), n = e.querySelector("[data-carousel-count]"), r = new Ec(t, {
		modules: [
			Rc,
			kc,
			Mc,
			Ic
		],
		wrapperClass: "post-track",
		slideClass: "post-slide",
		slidesPerView: 1,
		speed: zc ? 0 : 620,
		resistanceRatio: .7,
		grabCursor: !0,
		watchOverflow: !0,
		keyboard: {
			enabled: !0,
			onlyInViewport: !0
		},
		navigation: {
			previousEl: e.querySelector("[data-carousel-prev]"),
			nextEl: e.querySelector("[data-carousel-next]")
		},
		pagination: {
			el: e.querySelector("[data-carousel-dots]"),
			clickable: !0,
			bulletElement: "button",
			bulletClass: "post-dot",
			bulletActiveClass: "active"
		},
		a11y: { enabled: !0 }
	}), i = () => {
		n.textContent = `${r.activeIndex + 1} / ${r.slides.length}`;
	};
	r.on("slideChange", i), i(), e.querySelector("[aria-label=\"Like this photo\"]")?.addEventListener("click", (e) => {
		let t = e.currentTarget.getAttribute("aria-pressed") === "true";
		e.currentTarget.setAttribute("aria-pressed", String(!t)), e.currentTarget.textContent = t ? "♡" : "♥";
	});
}), !zc) {
	document.querySelectorAll(".project-row, .cert").forEach((e) => {
		e.addEventListener("pointerenter", () => Wa(e, { y: -7 }, {
			type: "spring",
			stiffness: 240,
			damping: 19,
			mass: .75
		})), e.addEventListener("pointerleave", () => Wa(e, { y: 0 }, {
			type: "spring",
			stiffness: 210,
			damping: 22,
			mass: .8
		}));
	}), Mo(".project-card", (e) => {
		let t = e.querySelector(".project-image");
		t && Wa(t, {
			opacity: [0, 1],
			y: [70, 0],
			rotate: [-1.4, 0]
		}, {
			duration: .9,
			easing: [
				.16,
				.75,
				.22,
				1
			]
		});
	}, { margin: "0px 0px -12% 0px" }), Mo(".social-post", (e) => {
		Wa(e, {
			opacity: [0, 1],
			scale: [.94, 1],
			rotate: [-1.5, 0]
		}, {
			duration: .85,
			easing: [
				.16,
				.75,
				.22,
				1
			]
		});
	}, { margin: "0px 0px -10% 0px" });
	let e = document.querySelector(".hero-signal"), t = document.querySelector(".hero");
	e && t && Ao(Wa(e, {
		y: [0, -90],
		rotate: [-3, 4]
	}, { easing: "linear" }), {
		target: t,
		offset: ["start start", "end start"]
	});
}
//#endregion
