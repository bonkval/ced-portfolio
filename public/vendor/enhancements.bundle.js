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
var n = (e, t, n) => n > t ? t : n < e ? e : n, r = {}, i = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), a = (e) => typeof e == "object" && !!e, o = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function s(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var c = /* @__NO_SIDE_EFFECTS__ */ (e) => e, l = (...e) => e.reduce((e, t) => (n) => t(e(n))), u = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, d = class {
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
}, f = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, p = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, m = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, h = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, g = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, _ = 1e-7, v = 12;
function y(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = g(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > _ && ++s < v);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function b(e, t, n, r) {
	if (e === t && n === r) return c;
	let i = (t) => y(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : g(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var x = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, S = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), C = /*@__PURE__*/ b(.33, 1.53, .69, .99), w = /*@__PURE__*/ S(C), T = /*@__PURE__*/ x(w), E = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * w(e) : .5 * (2 - 2 ** (-10 * (e - 1))), D = (e) => 1 - Math.sin(Math.acos(e)), ee = /* @__PURE__ */ S(D), te = /* @__PURE__ */ x(D), ne = /*@__PURE__*/ b(.42, 0, 1, 1), re = /*@__PURE__*/ b(0, 0, .58, 1), ie = /*@__PURE__*/ b(.42, 0, .58, 1), ae = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function oe(e, t) {
	return /* @__PURE__ */ ae(e) ? e[h(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var se = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", ce = {
	linear: c,
	easeIn: ne,
	easeInOut: ie,
	easeOut: re,
	circIn: D,
	circInOut: te,
	circOut: ee,
	backIn: w,
	backInOut: T,
	backOut: C,
	anticipate: E
}, le = (e) => typeof e == "string", ue = (e) => {
	if (/* @__PURE__ */ se(e)) {
		e.length;
		let [t, n, r, i] = e;
		return /* @__PURE__ */ b(t, n, r, i);
	}
	return le(e) ? (ce[e], `${e}`, ce[e]) : e;
}, de = [
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
function fe(e) {
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
var pe = 40;
function me(e, t) {
	let n = !1, i = !0, a = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, o = () => n = !0, s = de.reduce((e, t) => (e[t] = fe(o), e), {}), { setup: c, read: l, resolveKeyframes: u, preUpdate: d, update: f, preRender: p, render: m, postRender: h } = s, g = () => {
		let o = r.useManualTiming, s = o ? a.timestamp : performance.now();
		n = !1, o || (a.delta = i ? 1e3 / 60 : Math.max(Math.min(s - a.timestamp, pe), 1)), a.timestamp = s, a.isProcessing = !0, c.process(a), l.process(a), u.process(a), d.process(a), f.process(a), p.process(a), m.process(a), h.process(a), a.isProcessing = !1, n && t && (i = !1, e(g));
	}, _ = () => {
		n = !0, i = !0, a.isProcessing || e(g);
	};
	return {
		schedule: de.reduce((e, t) => {
			let r = s[t];
			return e[t] = (e, t = !1, i = !1) => (n || _(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < de.length; t++) s[de[t]].cancel(e);
		},
		state: a,
		steps: s
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: O, cancel: he, state: ge, steps: _e } = /* @__PURE__ */ me(typeof requestAnimationFrame < "u" ? requestAnimationFrame : c, !0), ve;
function ye() {
	ve = void 0;
}
var k = {
	now: () => (ve === void 0 && k.set(ge.isProcessing || r.useManualTiming ? ge.timestamp : performance.now()), ve),
	set: (e) => {
		ve = e, queueMicrotask(ye);
	}
}, be = (e) => (t) => typeof t == "string" && t.startsWith(e), xe = /*@__PURE__*/ be("--"), Se = /*@__PURE__*/ be("var(--"), Ce = (e) => Se(e) ? we.test(e.split("/*")[0].trim()) : !1, we = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Te(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var A = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, Ee = {
	...A,
	transform: (e) => n(0, 1, e)
}, De = {
	...A,
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
	...A,
	transform: (e) => Math.round(Pe(e))
}, j = {
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
	transform: j.transform
}, Re = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), M = /*@__PURE__*/ Re("deg"), ze = /*@__PURE__*/ Re("%"), N = /*@__PURE__*/ Re("px"), Be = /*@__PURE__*/ Re("vh"), Ve = /*@__PURE__*/ Re("vw"), He = {
	...ze,
	parse: (e) => ze.parse(e) / 100,
	transform: (e) => ze.transform(e * 100)
}, P = {
	test: /*@__PURE__*/ Me("hsl", "hue"),
	parse: /*@__PURE__*/ Ne("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + ze.transform(Oe(t)) + ", " + ze.transform(Oe(n)) + ", " + Oe(Ee.transform(r)) + ")"
}, F = {
	test: (e) => j.test(e) || Le.test(e) || P.test(e),
	parse: (e) => j.test(e) ? j.parse(e) : P.test(e) ? P.parse(e) : Le.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? j.transform(e) : P.transform(e),
	getAnimatableNone: (e) => {
		let t = F.parse(e);
		return t.alpha = 0, F.transform(t);
	}
}, Ue = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function We(e) {
	return isNaN(e) && typeof e == "string" && (e.match(ke)?.length || 0) + (e.match(Ue)?.length || 0) > 0;
}
var Ge = "number", Ke = "color", qe = "var", Je = "var(", Ye = "${}", Xe = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function I(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Xe, (e) => (F.test(e) ? (r.color.push(a), i.push(Ke), n.push(F.parse(e))) : e.startsWith(Je) ? (r.var.push(a), i.push(qe), n.push(e)) : (r.number.push(a), i.push(Ge), n.push(parseFloat(e))), ++a, Ye)).split(Ye),
		indexes: r,
		types: i
	};
}
function Ze(e) {
	return I(e).values;
}
function Qe({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Ge ? Oe(r[a]) : e === Ke ? F.transform(r[a]) : r[a];
		}
		return i;
	};
}
function $e(e) {
	return Qe(I(e));
}
var et = (e) => typeof e == "number" ? 0 : F.test(e) ? F.getAnimatableNone(e) : e, tt = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : et(e);
function nt(e) {
	let t = I(e);
	return Qe(t)(t.values.map((e, n) => tt(e, t.split[n])));
}
var L = {
	test: We,
	parse: Ze,
	createTransformer: $e,
	getAnimatableNone: nt
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function rt(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function it({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = rt(s, r, e + 1 / 3), a = rt(s, r, e), o = rt(s, r, e - 1 / 3);
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
function at(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var R = (e, t, n) => e + (t - e) * n, ot = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, st = [
	Le,
	j,
	P
], ct = (e) => st.find((t) => t.test(e));
function lt(e) {
	let t = ct(e);
	if (`${e}`, !t) return !1;
	let n = t.parse(e);
	return t === P && (n = it(n)), n;
}
var ut = (e, t) => {
	let n = lt(e), r = lt(t);
	if (!n || !r) return at(e, t);
	let i = { ...n };
	return (e) => (i.red = ot(n.red, r.red, e), i.green = ot(n.green, r.green, e), i.blue = ot(n.blue, r.blue, e), i.alpha = R(n.alpha, r.alpha, e), j.transform(i));
}, dt = /* @__PURE__ */ new Set(["none", "hidden"]);
function ft(e, t) {
	return dt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function pt(e, t) {
	return (n) => R(e, t, n);
}
function mt(e) {
	return typeof e == "number" ? pt : typeof e == "string" ? Ce(e) ? at : F.test(e) ? ut : vt : Array.isArray(e) ? ht : typeof e == "object" ? F.test(e) ? ut : gt : at;
}
function ht(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => mt(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function gt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = mt(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function _t(e, t) {
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
var vt = (e, t) => {
	let n = L.createTransformer(t), r = I(e), i = I(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? dt.has(e) && !i.values.length || dt.has(t) && !r.values.length ? ft(e, t) : l(ht(_t(r, i), i.values), n) : (`${e}${t}`, at(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function yt(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? R(e, t, n) : mt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var bt = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => O.update(t, e),
		stop: () => he(t),
		now: () => ge.isProcessing ? ge.timestamp : k.now()
	};
}, xt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, St = 2e4;
function Ct(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function wt(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(Ct(r), St);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ p(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var z = {
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
function Tt(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var Et = 12;
function Dt(e, t, n) {
	let r = n;
	for (let n = 1; n < Et; n++) r -= e(r) / t(r);
	return r;
}
var Ot = .001;
function kt({ duration: e = z.duration, bounce: t = z.bounce, velocity: r = z.velocity, mass: i = z.mass }) {
	let a, o;
	z.maxDuration;
	let s = 1 - t;
	s = n(z.minDamping, z.maxDamping, s), e = n(z.minDuration, z.maxDuration, /* @__PURE__ */ p(e)), s < 1 ? (a = (t) => {
		let n = t * s, i = n * e, a = n - r, o = Tt(t, s), c = Math.exp(-i);
		return Ot - a / o * c;
	}, o = (t) => {
		let n = t * s * e, i = n * r + r, o = s ** 2 * t ** 2 * e, c = Math.exp(-n), l = Tt(t ** 2, s);
		return (-a(t) + Ot > 0 ? -1 : 1) * ((i - o) * c) / l;
	}) : (a = (t) => -.001 + Math.exp(-t * e) * ((t - r) * e + 1), o = (t) => Math.exp(-t * e) * ((r - t) * (e * e)));
	let c = 5 / e, l = Dt(a, o, c);
	if (e = /* @__PURE__ */ f(e), isNaN(l)) return {
		stiffness: z.stiffness,
		damping: z.damping,
		duration: e
	};
	{
		let t = l ** 2 * i;
		return {
			stiffness: t,
			damping: s * 2 * Math.sqrt(i * t),
			duration: e
		};
	}
}
var At = ["duration", "bounce"], jt = [
	"stiffness",
	"damping",
	"mass"
];
function Mt(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function Nt(e) {
	let t = {
		velocity: z.velocity,
		stiffness: z.stiffness,
		damping: z.damping,
		mass: z.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Mt(e, jt) && Mt(e, At)) {
		if (t.velocity = 0, e.visualDuration) {
			let r = e.visualDuration, i = 2 * Math.PI / (r * 1.2), a = i * i, o = 2 * n(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a);
			t = {
				...t,
				mass: z.mass,
				stiffness: a,
				damping: o
			};
		} else {
			let n = kt({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: z.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function Pt(e = z.visualDuration, t = z.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: m, isResolvedFromDuration: h } = Nt({
		...n,
		velocity: -/* @__PURE__ */ p(n.velocity || 0)
	}), g = m || 0, _ = l / (2 * Math.sqrt(c * u)), v = o - a, y = /* @__PURE__ */ p(Math.sqrt(c / u)), b = Math.abs(v) < 5;
	r ||= b ? z.restSpeed.granular : z.restSpeed.default, i ||= b ? z.restDelta.granular : z.restDelta.default;
	let x, S, C, w, T, E;
	if (_ < 1) C = Tt(y, _), w = (g + _ * y * v) / C, x = (e) => {
		let t = Math.exp(-_ * y * e);
		return o - t * (w * Math.sin(C * e) + v * Math.cos(C * e));
	}, T = _ * y * w + v * C, E = _ * y * v - w * C, S = (e) => Math.exp(-_ * y * e) * (T * Math.sin(C * e) + E * Math.cos(C * e));
	else if (_ === 1) {
		x = (e) => o - Math.exp(-y * e) * (v + (g + y * v) * e);
		let e = g + y * v;
		S = (t) => Math.exp(-y * t) * (y * e * t - g);
	} else {
		let e = y * Math.sqrt(_ * _ - 1);
		x = (t) => {
			let n = Math.exp(-_ * y * t), r = Math.min(e * t, 300);
			return o - n * ((g + _ * y * v) * Math.sinh(r) + e * v * Math.cosh(r)) / e;
		};
		let t = (g + _ * y * v) / e, n = _ * y * t - v * e, r = _ * y * v - t * e;
		S = (t) => {
			let i = Math.exp(-_ * y * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let D = {
		calculatedDuration: h && d || null,
		velocity: (e) => /* @__PURE__ */ f(S(e)),
		next: (e) => {
			if (!h && _ < 1) {
				let t = Math.exp(-_ * y * e), n = Math.sin(C * e), a = Math.cos(C * e), c = o - t * (w * n + v * a), l = /* @__PURE__ */ f(t * (T * n + E * a));
				return s.done = Math.abs(l) <= r && Math.abs(o - c) <= i, s.value = s.done ? o : c, s;
			}
			let t = x(e);
			if (h) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ f(S(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(Ct(D), St), t = xt((t) => D.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return D;
}
Pt.applyToOptions = (e) => {
	let t = wt(e, 100, Pt);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ f(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var Ft = 5;
function It(e, t, n) {
	let r = Math.max(t - Ft, 0);
	return /* @__PURE__ */ m(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function Lt({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = Pt({
			keyframes: [f.value, m(f.value)],
			velocity: It(y, e, f.value),
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
function Rt(e, t, n) {
	let i = [], a = n || r.mix || yt, o = e.length - 1;
	for (let n = 0; n < o; n++) {
		let r = a(e[n], e[n + 1]);
		t && (r = l(Array.isArray(t) ? t[n] || c : t, r)), i.push(r);
	}
	return i;
}
function zt(e, t, { clamp: r = !0, ease: i, mixer: a } = {}) {
	let o = e.length;
	if (t.length, o === 1) return () => t[0];
	if (o === 2 && t[0] === t[1]) return () => t[1];
	let s = e[0] === e[1];
	e[0] > e[o - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let c = Rt(t, i, a), l = c.length, d = (n) => {
		if (s && n < e[0]) return t[0];
		let r = 0;
		if (l > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ u(e[r], e[r + 1], n);
		return c[r](i);
	};
	return r ? (t) => d(n(e[0], e[o - 1], t)) : d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function Bt(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ u(0, t, r);
		e.push(R(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Vt(e) {
	let t = [0];
	return Bt(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Ht(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function Ut(e, t) {
	return e.map(() => t || ie).splice(0, e.length - 1);
}
function Wt({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ ae(r) ? r.map(ue) : ue(r), a = {
		done: !1,
		value: t[0]
	}, o = zt(Ht(n && n.length === t.length ? n : Vt(t), e), t, { ease: Array.isArray(i) ? i : Ut(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var Gt = (e) => e !== null;
function Kt(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(Gt), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var qt = {
	decay: Lt,
	inertia: Lt,
	tween: Wt,
	keyframes: Wt,
	spring: Pt
};
function Jt(e) {
	typeof e.type == "string" && (e.type = qt[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Yt = class {
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
}, Xt = (e) => e / 100, Zt = class extends Yt {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== k.now() && this.tick(k.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		Jt(e);
		let { type: t = Wt, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || Wt;
		s !== Wt && typeof o[0] != "number" && (this.mixKeyframes = l(Xt, yt(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Ct(c));
		let { calculatedDuration: u } = c;
		this.calculatedDuration = u, this.resolvedDuration = u + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
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
		return C && m !== Lt && (x.value = Kt(u, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ p(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ p(e);
	}
	get time() {
		return /* @__PURE__ */ p(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ f(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return It((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(k.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ p(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = bt, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(k.now()), this.holdTime = this.currentTime;
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
function Qt(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var B = (e) => e * 180 / Math.PI, $t = (e) => tn(B(Math.atan2(e[1], e[0]))), en = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: $t,
	rotateZ: $t,
	skewX: (e) => B(Math.atan(e[1])),
	skewY: (e) => B(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, tn = (e) => (e %= 360, e < 0 && (e += 360), e), nn = $t, rn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), an = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), on = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: rn,
	scaleY: an,
	scale: (e) => (rn(e) + an(e)) / 2,
	rotateX: (e) => tn(B(Math.atan2(e[6], e[5]))),
	rotateY: (e) => tn(B(Math.atan2(-e[2], e[0]))),
	rotateZ: nn,
	rotate: nn,
	skewX: (e) => B(Math.atan(e[4])),
	skewY: (e) => B(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function sn(e) {
	return +!!e.includes("scale");
}
function cn(e, t) {
	if (!e || e === "none") return sn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = on, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = en, i = t;
	}
	if (!i) return sn(t);
	let a = r[t], o = i[1].split(",").map(un);
	return typeof a == "function" ? a(o) : o[a];
}
var ln = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return cn(n, t);
};
function un(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var V = [
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
], H = /* @__PURE__ */ new Set([...V, "pathRotation"]), dn = (e) => e === A || e === N, fn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), pn = V.filter((e) => !fn.has(e));
function mn(e) {
	let t = [];
	return pn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var U = {
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
	x: (e, { transform: t }) => cn(t, "x"),
	y: (e, { transform: t }) => cn(t, "y")
};
U.translateX = U.x, U.translateY = U.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var W = /* @__PURE__ */ new Set(), hn = !1, gn = !1, _n = !1;
function vn() {
	if (gn) {
		let e = Array.from(W).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = mn(e);
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
	gn = !1, hn = !1, W.forEach((e) => e.complete(_n)), W.clear();
}
function yn() {
	W.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (gn = !0);
	});
}
function bn() {
	_n = !0, yn(), vn(), _n = !1;
}
var xn = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (W.add(this), hn || (hn = !0, O.read(yn), O.resolveKeyframes(vn))) : (this.readKeyframes(), this.complete());
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
		Qt(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), W.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (W.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, Sn = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Cn(e, t, n) {
	Sn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var wn = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Tn(e, t) {
	let n = /* @__PURE__ */ s(e);
	return () => wn[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var En = /* @__PURE__ */ Tn(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Dn = /*@__PURE__*/ Tn(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), On = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, kn = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ On([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ On([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ On([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ On([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function An(e, t) {
	if (e) return typeof e == "function" ? Dn() ? xt(e, t) : "ease-out" : /* @__PURE__ */ se(e) ? On(e) : Array.isArray(e) ? e.map((e) => An(e, t) || kn.easeOut) : kn[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function jn(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = An(s, i);
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
function Mn(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Nn({ type: e, ...t }) {
	return Mn(e) && Dn() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Pn = class extends Yt {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = Nn(e);
		this.animation = jn(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Kt(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Cn(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
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
		return /* @__PURE__ */ p(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ p(e);
	}
	get time() {
		return /* @__PURE__ */ p(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ f(e), t && this.animation.pause();
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
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && En() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), c) : r(this);
	}
}, Fn = {
	anticipate: E,
	backInOut: T,
	circInOut: te
};
function In(e) {
	return e in Fn;
}
function Ln(e) {
	typeof e.ease == "string" && In(e.ease) && (e.ease = Fn[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var Rn = 10, zn = class extends Pn {
	constructor(e) {
		Ln(e), Jt(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: r, onComplete: i, element: a, ...o } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let s = new Zt({
			...o,
			autoplay: !1
		}), c = Math.max(Rn, k.now() - this.startTime), l = n(0, Rn, c - Rn), u = s.sample(c).value, { name: d } = this.options;
		a && d && Cn(a, d, u), t.setWithVelocity(s.sample(Math.max(0, c - l)).value, u, l), s.stop();
	}
}, Bn = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (L.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function Vn(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Hn(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = Bn(i, t), s = Bn(a, t);
	return `${t}${i}${a}${o ? a : i}`, !o || !s ? !1 : Vn(e) || (n === "spring" || Mn(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function Un(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var Wn = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Gn = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Kn(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Gn.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var qn = /* @__PURE__ */ new Set([
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
]), Jn = /*@__PURE__*/ s(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Yn(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Jn() && n && (Wn.has(n) || qn.has(n) && Kn(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var Xn = 40, Zn = class extends Yt {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = k.now();
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
		}, f = l?.KeyframeResolver || xn;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, i) {
		this.keyframeResolver = void 0;
		let { name: a, type: o, velocity: s, delay: l, isHandoff: u, onUpdate: d } = n;
		this.resolvedAt = k.now();
		let f = !0;
		Hn(e, a, o, s) || (f = !1, (r.instantAnimations || !l) && d?.(Kt(e, n, t)), e[0] = e[e.length - 1], Un(n), n.repeat = 0);
		let p = {
			startTime: i ? this.resolvedAt && this.resolvedAt - this.createdAt > Xn ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, m = f && !u && Yn(p), h = p.motionValue?.owner?.current, g;
		if (m) try {
			g = new zn({
				...p,
				element: h
			});
		} catch {
			g = new Zt(p);
		}
		else g = new Zt(p);
		g.finished.then(() => {
			this.notifyFinished();
		}).catch(c), this.pendingTimeline &&= (this.stopTimeline = g.attachTimeline(this.pendingTimeline), void 0), this._animation = g;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), bn()), this._animation;
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
}, Qn = class {
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
		return $n(this.animations, "duration");
	}
	get iterationDuration() {
		return $n(this.animations, "iterationDuration");
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
function $n(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var er = class extends Qn {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, tr = 30, nr = (e) => !isNaN(parseFloat(e)), rr = { current: void 0 }, ir = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = k.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = k.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = nr(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new d());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), O.read(() => {
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
		return rr.current && rr.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = k.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > tr) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, tr);
		return /* @__PURE__ */ m(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
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
function G(e, t) {
	return new ir(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function ar(e, t) {
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
function or(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : ar(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var sr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, cr = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), lr = {
	type: "keyframes",
	duration: .8
}, ur = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, dr = (e, { keyframes: t }) => t.length > 2 ? lr : H.has(e) ? e.startsWith("scale") ? cr(t[1]) : sr : ur, fr = /* @__PURE__ */ new Set([
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
function pr(e) {
	for (let t in e) if (!fr.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var mr = (e, t, n, i = {}, a, o) => (s) => {
	let c = or(i, e) || {}, l = c.delay || i.delay || 0, { elapsed: u = 0 } = i;
	u -= /* @__PURE__ */ f(l);
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
		element: o ? void 0 : a
	};
	pr(c) || Object.assign(d, dr(e, d)), d.duration &&= /* @__PURE__ */ f(d.duration), d.repeatDelay &&= /* @__PURE__ */ f(d.repeatDelay), d.from !== void 0 && (d.keyframes[0] = d.from);
	let p = !1;
	if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (Un(d), d.delay === 0 && (p = !0)), (r.instantAnimations || r.skipAnimations || a?.shouldSkipAnimations || c.skipAnimations) && (p = !0, Un(d), d.delay = 0), d.allowFlatten = !c.type && !c.ease, p && !o && t.get() !== void 0) {
		let e = Kt(d.keyframes, c);
		if (e !== void 0) {
			O.update(() => {
				d.onUpdate(e), d.onComplete();
			});
			return;
		}
	}
	return c.isSync ? new Zt(d) : new Zn(d);
}, hr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function gr(e) {
	let t = hr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function _r(e, t, n = 1) {
	`${e}`;
	let [r, a] = gr(e);
	if (!r) return;
	let o = window.getComputedStyle(t).getPropertyValue(r);
	if (o) {
		let e = o.trim();
		return i(e) ? parseFloat(e) : e;
	}
	return Ce(a) ? _r(a, t, n + 1) : a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function vr(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function yr(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = vr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = vr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function br(e, t, n) {
	let r = e.getProps();
	return yr(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var xr = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...V
]), Sr = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Cr(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, G(n));
}
function wr(e) {
	return Sr(e) ? e[e.length - 1] || 0 : e;
}
function Tr(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = br(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Cr(e, t, wr(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var K = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function Er(e) {
	return !!(K(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Dr(e, t) {
	let n = e.getValue("willChange");
	if (Er(n)) return n.add(t);
	if (!n && r.WillChange) {
		let n = new r.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Or(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var kr = "data-" + Or("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Ar(e) {
	return e.props[kr];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function jr({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function Mr(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? ar(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && jr(f, t)) continue;
		let o = {
			delay: n,
			...or(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			O.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (window.MotionHandoffAnimation) {
			let n = Ar(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, O);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Dr(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(mr(t, r, i, m && xr.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => O.update(() => {
			o && Tr(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var Nr = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Pr = (e) => (t) => t.test(e), Fr = [
	A,
	N,
	ze,
	M,
	Ve,
	Be,
	Nr
], Ir = (e) => Fr.find(Pr(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Lr(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || o(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var Rr = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function zr(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ke) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!Rr.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Br = /\b([a-z-]*)\(.*?\)/gu, Vr = {
	...L,
	getAnimatableNone: (e) => {
		let t = e.match(Br);
		return t ? t.map(zr).join(" ") : e;
	}
}, Hr = {
	...L,
	getAnimatableNone: (e) => {
		let t = L.parse(e);
		return L.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Ur = {
	...A,
	transform: Math.round
}, Wr = {
	borderWidth: N,
	borderTopWidth: N,
	borderRightWidth: N,
	borderBottomWidth: N,
	borderLeftWidth: N,
	borderRadius: N,
	borderTopLeftRadius: N,
	borderTopRightRadius: N,
	borderBottomRightRadius: N,
	borderBottomLeftRadius: N,
	width: N,
	maxWidth: N,
	height: N,
	maxHeight: N,
	top: N,
	right: N,
	bottom: N,
	left: N,
	inset: N,
	insetBlock: N,
	insetBlockStart: N,
	insetBlockEnd: N,
	insetInline: N,
	insetInlineStart: N,
	insetInlineEnd: N,
	padding: N,
	paddingTop: N,
	paddingRight: N,
	paddingBottom: N,
	paddingLeft: N,
	paddingBlock: N,
	paddingBlockStart: N,
	paddingBlockEnd: N,
	paddingInline: N,
	paddingInlineStart: N,
	paddingInlineEnd: N,
	margin: N,
	marginTop: N,
	marginRight: N,
	marginBottom: N,
	marginLeft: N,
	marginBlock: N,
	marginBlockStart: N,
	marginBlockEnd: N,
	marginInline: N,
	marginInlineStart: N,
	marginInlineEnd: N,
	fontSize: N,
	backgroundPositionX: N,
	backgroundPositionY: N,
	rotate: M,
	pathRotation: M,
	rotateX: M,
	rotateY: M,
	rotateZ: M,
	scale: De,
	scaleX: De,
	scaleY: De,
	scaleZ: De,
	skew: M,
	skewX: M,
	skewY: M,
	distance: N,
	translateX: N,
	translateY: N,
	translateZ: N,
	x: N,
	y: N,
	z: N,
	perspective: N,
	transformPerspective: N,
	opacity: Ee,
	originX: He,
	originY: He,
	originZ: N,
	zIndex: Ur,
	fillOpacity: Ee,
	strokeOpacity: Ee,
	numOctaves: Ur
}, Gr = {
	...Wr,
	color: F,
	backgroundColor: F,
	outlineColor: F,
	fill: F,
	stroke: F,
	borderColor: F,
	borderTopColor: F,
	borderRightColor: F,
	borderBottomColor: F,
	borderLeftColor: F,
	filter: Vr,
	WebkitFilter: Vr,
	mask: Hr,
	WebkitMask: Hr
}, Kr = (e) => Gr[e], qr = /*@__PURE__*/ new Set([Vr, Hr]);
function Jr(e, t) {
	let n = Kr(e);
	return qr.has(n) || (n = L), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var Yr = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Xr(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !Yr.has(t) && I(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = Jr(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var Zr = class extends xn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), Ce(r))) {
				let i = _r(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !xr.has(n) || e.length !== 2) return;
		let [r, i] = e, a = Ir(r), o = Ir(i);
		if (Te(r) !== Te(i) && U[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (dn(a) && dn(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else U[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Lr(e[t])) && n.push(t);
		n.length && Xr(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = U[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = U[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Qr = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function $r(e, t, n) {
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
var ei = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: ti, cancel: ni } = /* @__PURE__ */ me(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function ri(e) {
	return a(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function ii(e) {
	return ri(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/follow-value.mjs
function ai(e, t) {
	let n = G(K(e) ? e.get() : e);
	return oi(n, e, t), n;
}
function oi(e, t, n = {}) {
	let r = e.get(), i = null, a = r, o, s = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, c = () => {
		i &&= (i.stop(), null), e.animation = void 0;
	}, l = () => {
		let t = ci(e.get()), r = ci(a);
		if (t === r) {
			c();
			return;
		}
		let s = i ? i.getGeneratorVelocity() : e.getVelocity();
		c(), i = new Zt({
			keyframes: [t, r],
			velocity: s,
			type: "spring",
			restDelta: .001,
			restSpeed: .01,
			...n,
			onUpdate: o
		});
	}, u = () => {
		l(), e.animation = i ?? void 0, e.events.animationStart?.notify(), i?.then(() => {
			e.animation = void 0, e.events.animationComplete?.notify();
		});
	};
	if (e.attach((e, t) => {
		a = e, o = (e) => t(si(e, s)), O.postRender(u);
	}, c), K(t)) {
		let r = n.skipInitialAnimation === !0, i = t.on("change", (t) => {
			r ? (r = !1, e.jump(si(t, s), !1)) : e.set(si(t, s));
		}), a = e.on("destroy", i);
		return () => {
			i(), a();
		};
	}
	return c;
}
function si(e, t) {
	return t ? e + t : e;
}
function ci(e) {
	return typeof e == "number" ? e : parseFloat(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/spring-value.mjs
function li(e, t) {
	return ai(e, {
		type: "spring",
		...t
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var ui = [
	...Fr,
	F,
	L
], di = (e) => ui.find(Pr(e)), fi = () => ({
	min: 0,
	max: 0
}), pi = () => ({
	x: fi(),
	y: fi()
}), mi = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function hi(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function gi(e) {
	return typeof e == "string" || Array.isArray(e);
}
var _i = [
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
function vi(e) {
	return hi(e.animate) || _i.some((t) => gi(e[t]));
}
function yi(e) {
	return !!(vi(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function bi(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (K(i)) e.addValue(r, i);
		else if (K(a)) e.addValue(r, G(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, G(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var xi = { current: null }, Si = { current: !1 }, Ci = typeof window < "u";
function wi() {
	if (Si.current = !0, Ci) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => xi.current = e.matches;
			e.addEventListener("change", t), t();
		} else xi.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var Ti = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Ei = {}, Di = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = xn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = k.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, O.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = vi(t), this.isVariantNode = yi(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && K(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, mi.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (Si.current || wi(), this.shouldReduceMotion = xi.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), he(this.notifyUpdate), he(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && Wn.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new Pn({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ f(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = H.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && O.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
		for (e in Ei) {
			let t = Ei[e];
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
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : pi();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < Ti.length; t++) {
			let n = Ti[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = bi(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
		return n === void 0 && t !== void 0 && (n = G(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (i(n) || o(n)) ? n = parseFloat(n) : !di(n) && L.test(t) && (n = Jr(e, t)), this.setBaseTarget(e, K(n) ? n.get() : n)), K(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = yr(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !K(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new d()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		ti.render(this.render);
	}
}, Oi = class extends Di {
	constructor() {
		super(...arguments), this.KeyframeResolver = Zr;
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
		K(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function ki({ top: e, left: t, right: n, bottom: r }) {
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
function Ai(e, t) {
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
function ji(e, t) {
	return ki(Ai(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var Mi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, Ni = V.length;
function Pi(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < Ni; a++) {
		let o = V[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = ei(s, Wr[o]);
			if (!c) {
				i = !1;
				let t = Mi[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${ei(a, Wr.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function Fi(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (H.has(e)) {
			o = !0;
			continue;
		}
		if (xe(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = ei(n, Wr[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Pi(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function Ii(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function Li(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var Ri = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (N.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${Li(e, t.target.x)}% ${Li(e, t.target.y)}%`;
} }, zi = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = L.parse(e);
	if (i.length > 5) return r;
	let a = L.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = R(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, Bi = {
	borderRadius: {
		...Ri,
		applyTo: [...Qr]
	},
	borderTopLeftRadius: Ri,
	borderTopRightRadius: Ri,
	borderBottomLeftRadius: Ri,
	borderBottomRightRadius: Ri,
	boxShadow: zi
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function Vi(e, { layout: t, layoutId: n }) {
	return H.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Bi[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function Hi(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (K(r[t]) || i && K(i[t]) || Vi(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function Ui(e) {
	return window.getComputedStyle(e);
}
var Wi = class extends Oi {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = Ii;
	}
	mount(e) {
		e.style, super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (H.has(t)) return this.projection?.isProjecting ? sn(t) : ln(e, t);
		{
			let n = Ui(e), r = (xe(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return ji(e, t);
	}
	build(e, t, n) {
		Fi(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Hi(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function Gi(e, t) {
	return e in t;
}
var Ki = class extends Di {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (Gi(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return pi();
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
}, qi = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, Ji = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function Yi(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? qi : Ji;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var Xi = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function Zi(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (Fi(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of Xi) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && Yi(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var Qi = /* @__PURE__ */ new Set([
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
]), $i = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function ea(e, t, n, r) {
	Ii(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(Qi.has(n) ? n : Or(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function ta(e, t, n) {
	let r = Hi(e, t, n);
	for (let n in e) if (K(e[n]) || K(t[n])) {
		let t = V.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var na = class extends Oi {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = pi;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (H.has(t)) {
			let e = Kr(t);
			return e && e.default || 0;
		}
		if (Xi.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = Qi.has(t) ? t : Or(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return ta(e, t, n);
	}
	build(e, t, n) {
		Zi(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		ea(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = $i(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function ra(e, t, n) {
	let r = K(e) ? e : G(e);
	return r.start(mr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ia(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function aa(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ia(t) ? $r(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function oa(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function sa(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function ca(e, n, r) {
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		a.at > n && a.at < r && (t(e, a), i--);
	}
}
function la(e, t, n, r, i, a) {
	ca(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: R(i, a, r[o]),
		easing: /* @__PURE__ */ oe(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function ua(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function da(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var fa = "easeInOut", pa = 20;
function ma(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), d = 0, p = 0, m = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, p);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, sa(p, o.at, d, l));
			continue;
		}
		let [u, h, g = {}] = o;
		g.at !== void 0 && (p = sa(p, g.at, d, l));
		let _ = 0, v = (e, n, r, o = 0, s = 0) => {
			let c = _a(e), { delay: l = 0, times: u = Vt(c), type: d = t.type || "keyframes", repeat: h, repeatType: g, repeatDelay: v = 0, ...y } = n, { ease: b = t.ease || "easeOut", duration: x } = n, C = typeof l == "function" ? l(o, s) : l, w = c.length, T = Mn(d) ? d : i?.[d || "keyframes"];
			if (w <= 2 && T) {
				let e = 100;
				if (w === 2 && ba(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...y
				};
				x !== void 0 && (n.duration = /* @__PURE__ */ f(x));
				let r = wt(n, e, T);
				b = r.ease, x = r.duration;
			}
			x ??= a;
			let E = p + C;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let D = u.length - c.length;
			if (D > 0 && Bt(u, D), c.length === 1 && c.unshift(null), h && `${h}${pa}`, h && h < pa) {
				let e = x > 0 ? v / x : 0;
				x = oa(x, h, v);
				let t = [...c], n = [...u];
				b = Array.isArray(b) ? [...b] : [b];
				let r = [...b], i = g === "reverse" || g === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), g === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ S(e) : e)));
				for (let s = 0; s < h; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), b.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), b.push(e === 0 ? "linear" : /* @__PURE__ */ oe(f, e - 1));
				}
				ua(u, h, e);
			}
			let ee = E + x;
			la(r, c, b, u, E, ee), _ = Math.max(C + x, _), m = Math.max(ee, m);
		};
		if (K(u)) {
			let e = ha(u, s);
			v(h, g, ga("default", e));
		} else {
			let e = aa(u, h, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				h = h, g = g;
				let r = e[n], i = ha(r, s);
				for (let e in h) v(h[e], va(g, e), ga(e, i), n, t);
			}
		}
		d = p, p += _;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(da);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ u(0, m, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(fa)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let d = o.get(r);
			d.keyframes[i] = s;
			let { type: f, ...p } = t;
			d.transition[i] = {
				...p,
				duration: m,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function ha(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function ga(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function _a(e) {
	return Array.isArray(e) ? e : [e];
}
function va(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var ya = (e) => typeof e == "number", ba = (e) => e.every(ya);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function xa(e) {
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
	}, n = ri(e) && !ii(e) ? new na(t) : new Wi(t);
	n.mount(e), mi.set(e, n);
}
function Sa(e) {
	let t = new Ki({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), mi.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function Ca(e, t) {
	return K(e) || typeof e == "number" || typeof e == "string" && !ia(t);
}
function wa(e, t, n, r) {
	let i = [];
	if (Ca(e, t)) i.push(ra(e, ia(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = aa(e, t, r), o = a.length;
		for (let e = 0; e < o; e++) {
			let r = a[e], s = r instanceof Element ? xa : Sa;
			mi.has(r) || s(r);
			let c = mi.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, o)), i.push(...Mr(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function Ta(e, t, n) {
	let r = [];
	return ma(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = G(0);
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
	}), t, n, { spring: Pt }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...wa(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Ea(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Da(e = {}) {
	let { scope: n, reduceMotion: r, skipAnimations: i } = e;
	function a(e, a, o) {
		let s = [], c, l = {};
		if (r !== void 0 && (l.reduceMotion = r), i !== void 0 && (l.skipAnimations = i), Ea(e)) {
			let { onComplete: t, ...r } = a || {};
			typeof t == "function" && (c = t), s = Ta(e, {
				...l,
				...r
			}, n);
		} else {
			let { onComplete: t, ...r } = o || {};
			typeof t == "function" && (c = t), s = wa(e, a, {
				...l,
				...r
			}, n);
		}
		let u = new er(s);
		return c && u.finished.then(c), n && (n.animations.push(u), u.finished.then(() => {
			t(n.animations, u);
		})), u;
	}
	return a;
}
var q = Da(), Oa = {
	some: 0,
	all: 1
};
function J(e, t, { root: n, margin: r, amount: i = "some" } = {}) {
	let a = $r(e), o = /* @__PURE__ */ new WeakMap(), s = new IntersectionObserver((e) => {
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
		threshold: typeof i == "number" ? i : Oa[i]
	});
	return a.forEach((e) => s.observe(e)), () => s.disconnect();
}
//#endregion
//#region ascii.js
function ka(e) {
	let t = document.documentElement, n = document.createElement("div");
	n.className = "ascii-backdrop", n.setAttribute("aria-hidden", "true");
	let r = document.createElement("pre");
	n.append(r), document.body.prepend(n);
	function i() {
		let e = Math.ceil(innerWidth / 7), t = Math.ceil(innerHeight / 24) + 5;
		r.textContent = Array.from({ length: t }, (t, n) => Array.from({ length: e }, (e, t) => Math.sin(t * 7.13 + n * 13.7) * Math.cos(t * .41 - n * .37) > .56 ? ". : + / 0 1 - : ."[(t * 3 + n * 7) % 17] : " ").join("")).join("\n");
	}
	i(), addEventListener("resize", i, { passive: !0 });
	let a = document.querySelector("[data-ascii-sculpture]");
	if (!a) return;
	let o = a.getContext("2d");
	if (!o) return;
	let s = /* @__PURE__ */ new Float32Array(4264), c = /* @__PURE__ */ new Float32Array(4264), l = 0, u = 0, d = !0, f = 0, p = 0, m = 2.2, h = 0, g = 0, _ = 0, v = 0, y = t.dataset.theme === "dark" ? "255,255,255" : "0,0,0";
	function b() {
		if (!l || !u) return;
		s.fill(0), c.fill(0);
		let e = m * .43 + v, t = m * .24 + _, n = Math.sin(e), r = Math.cos(e), i = Math.sin(t), a = Math.cos(t);
		for (let e = 0; e < Math.PI * 2; e += .065) {
			let t = Math.cos(e), o = Math.sin(e);
			for (let e = 0; e < Math.PI * 2; e += .022) {
				let l = Math.cos(e), u = Math.sin(e), d = 2 + t, f = d * (a * l + n * i * u) - o * r * i, p = d * (i * l - n * a * u) + o * r * a, m = 1 / (8 + (r * d * u + o * n)), h = Math.floor(41 + 68 * m * f), g = Math.floor(26 - 35 * m * p);
				if (h < 0 || h >= 82 || g < 0 || g >= 52) continue;
				let _ = h + g * 82;
				if (m <= s[_]) continue;
				s[_] = m;
				let v = l * t * i - r * t * u - n * o + a * (r * o - t * n * u);
				c[_] = Math.max(.1, Math.min(1, (v + 1.3) / 2.7));
			}
		}
		o.clearRect(0, 0, l, u);
		let d = l / 82, f = u / 52;
		o.font = `${Math.max(5, d * 1.25)}px Consolas,monospace`, o.textAlign = "center", o.textBaseline = "middle";
		for (let e = 0; e < s.length; e++) {
			if (!s[e]) continue;
			let t = c[e];
			o.fillStyle = `rgba(${y},${.2 + t * .8})`;
			let n = " .,:;i!+*?%$#@"[Math.max(1, Math.floor(t * 13))];
			o.fillText(n, (e % 82 + .5) * d, (Math.floor(e / 82) + .5) * f);
		}
	}
	function x(t) {
		if (f = 0, !(!d || document.hidden || !e())) {
			if (t - p >= 1e3 / 24) {
				let e = Math.min(70, t - p);
				m += e * 32e-5, _ += (h - _) * .07, v += (g - v) * .07, p = t, b();
			}
			f = requestAnimationFrame(x);
		}
	}
	function S() {
		f && cancelAnimationFrame(f), f = 0, b(), d && !document.hidden && e() && (f = requestAnimationFrame(x));
	}
	new ResizeObserver(() => {
		let e = a.getBoundingClientRect();
		l = e.width, u = e.height;
		let t = Math.min(devicePixelRatio || 1, 2);
		a.width = Math.round(l * t), a.height = Math.round(u * t), o.setTransform(t, 0, 0, t, 0, 0), S();
	}).observe(a), new IntersectionObserver((e) => {
		d = e[0].isIntersecting, S();
	}).observe(a), a.addEventListener("pointermove", (e) => {
		let t = a.getBoundingClientRect();
		h = (e.clientX - t.left) / t.width - .5, g = (e.clientY - t.top) / t.height - .5;
	}, { passive: !0 }), a.addEventListener("pointerleave", () => {
		h = 0, g = 0;
	}), document.addEventListener("portfolio:theme", () => {
		y = t.dataset.theme === "dark" ? "255,255,255" : "0,0,0", b();
	}), document.addEventListener("portfolio:motion", S), document.addEventListener("visibilitychange", S);
}
//#endregion
//#region cinematic.js
function Aa(e) {
	let t = matchMedia("(pointer:fine)").matches;
	if (document.querySelectorAll(".section-header h2,.resume-heading h1,.compact-case-heading h1").forEach((t) => {
		let n = t.textContent;
		t.setAttribute("aria-label", n), t.replaceChildren(...[...n].map((e, t) => {
			let n = document.createElement("span");
			return n.className = "kinetic-letter", n.textContent = e === " " ? "\xA0" : e, n.setAttribute("aria-hidden", "true"), n.style.setProperty("--letter", t), n;
		})), J(t, () => {
			e() && q(t.children, {
				opacity: [0, 1],
				y: [28, 0],
				rotateX: [-65, 0]
			}, {
				duration: .8,
				delay: (e) => e * .025,
				ease: [
					.16,
					1,
					.3,
					1
				]
			});
		}, { amount: .6 });
	}), document.querySelectorAll(".skill-group").forEach((t, n) => {
		J(t, () => {
			if (!e()) return;
			q(t, {
				opacity: [0, 1],
				y: [35, 0],
				rotateX: [7, 0]
			}, {
				duration: .85,
				delay: n % 3 * .07,
				ease: [
					.16,
					1,
					.3,
					1
				]
			});
			let r = t.querySelectorAll("li");
			r.length && q(r, {
				opacity: [0, 1],
				y: [12, 0]
			}, {
				duration: .5,
				delay: (e) => .15 + e * .035,
				ease: [
					.16,
					1,
					.3,
					1
				]
			});
		}, { amount: .2 });
	}), t && (document.querySelectorAll(".project-card").forEach((t) => {
		let n = 0, r = li(0, {
			stiffness: 160,
			damping: 24
		}), i = li(0, {
			stiffness: 160,
			damping: 24
		});
		r.on("change", (e) => t.style.setProperty("--tilt-x", `${e}deg`)), i.on("change", (e) => t.style.setProperty("--tilt-y", `${e}deg`));
		let a = (e, t) => {
			r.set(e), i.set(t);
		};
		t.addEventListener("pointermove", (r) => {
			!e() || n || (n = requestAnimationFrame(() => {
				n = 0;
				let e = t.getBoundingClientRect();
				t.style.setProperty("--card-x", `${(r.clientX - e.left) / e.width * 100}%`), t.style.setProperty("--card-y", `${(r.clientY - e.top) / e.height * 100}%`), t.style.setProperty("--image-x", `${((r.clientX - e.left) / e.width - .5) * 9}px`), t.style.setProperty("--image-y", `${((r.clientY - e.top) / e.height - .5) * 6}px`), a(-((r.clientY - e.top) / e.height - .5) * 5, ((r.clientX - e.left) / e.width - .5) * 7);
			}));
		}, { passive: !0 }), t.addEventListener("pointerleave", () => {
			a(0, 0), t.style.setProperty("--image-x", "0px"), t.style.setProperty("--image-y", "0px");
		}), t.addEventListener("pointerdown", () => t.classList.add("card-pressed"));
		let o = () => t.classList.remove("card-pressed");
		t.addEventListener("pointerup", o), t.addEventListener("pointerleave", o), t.addEventListener("pointercancel", o), document.addEventListener("portfolio:motion", () => {
			e() || (r.jump(0), i.jump(0));
		});
	}), document.querySelectorAll(".explore-button,.hero-actions .text-link,.profile-links a,.theme-toggle").forEach((t) => {
		t.addEventListener("pointermove", (n) => {
			if (!e()) return;
			let r = t.getBoundingClientRect();
			t.style.translate = `${(n.clientX - r.left - r.width / 2) * .16}px ${(n.clientY - r.top - r.height / 2) * .2}px`;
		}, { passive: !0 }), t.addEventListener("pointerleave", () => {
			t.style.translate = "0px 0px";
		});
	})), !t) return;
	let n = document.createElement("canvas");
	n.className = "ascii-wake", n.setAttribute("aria-hidden", "true"), document.body.prepend(n);
	let r = n.getContext("2d");
	if (!r) return;
	let i, a, o = -1e3, s = -1e3, c = 0, l, u = () => {
		i = n.width = innerWidth, a = n.height = innerHeight;
	};
	u(), addEventListener("resize", u, { passive: !0 });
	let d = () => {
		n.style.opacity = "0";
	};
	function f() {
		if (c = 0, document.hidden || !e()) {
			d();
			return;
		}
		r.clearRect(0, 0, i, a);
		let t = document.documentElement.dataset.theme === "dark" ? "255,255,255" : "0,0,0";
		r.font = "11px Consolas,monospace";
		for (let e = Math.max(12, Math.floor((o - 180) / 30) * 30 + 12); e < Math.min(i, o + 180); e += 30) if (!(e > i * .14 && e < i * .86)) for (let n = Math.max(20, Math.floor((s - 180) / 32) * 32 + 20); n < Math.min(a, s + 180); n += 32) {
			let i = Math.max(0, 1 - Math.hypot(e - o, n - s) / 180) * .35;
			i < .02 || (r.fillStyle = `rgba(${t},${i})`, r.fillText(".:+01"[(e + n) % 5], e, n));
		}
		n.style.opacity = "1", clearTimeout(l), l = setTimeout(d, 450);
	}
	addEventListener("pointermove", (t) => {
		o = t.clientX, s = t.clientY, !c && e() && (c = requestAnimationFrame(f));
	}, { passive: !0 }), document.addEventListener("mouseleave", d), document.addEventListener("visibilitychange", () => {
		document.hidden && d();
	}), document.addEventListener("portfolio:motion", () => {
		e() || d();
	});
}
//#endregion
//#region interactions.js
function ja(e) {
	let t = [
		.16,
		1,
		.3,
		1
	], n = matchMedia("(hover:hover) and (pointer:fine)").matches;
	if (document.querySelectorAll("[data-copy-email]").forEach((e) => {
		let t = e.querySelector("[role=\"status\"]"), n;
		e.addEventListener("click", async () => {
			clearTimeout(n);
			try {
				await navigator.clipboard.writeText(e.dataset.copyEmail), e.classList.add("is-copied"), t.textContent = "Copied!";
			} catch {
				e.classList.add("copy-unavailable"), t.textContent = e.dataset.copyEmail;
				let n = window.getSelection(), r = document.createRange();
				r.selectNodeContents(t), n.removeAllRanges(), n.addRange(r);
			}
			n = setTimeout(() => {
				e.classList.remove("is-copied", "copy-unavailable"), t.textContent = "Copy email";
			}, 3500);
		});
	}), document.querySelectorAll(".site-nav a").forEach((e) => {
		let t = e.textContent, n = document.createElement("span");
		n.className = "nav-roll";
		let r = document.createElement("span");
		r.className = "nav-face", r.textContent = t;
		let i = r.cloneNode(!0);
		i.className = "nav-echo", i.setAttribute("aria-hidden", "true"), n.append(r, i), e.replaceChildren(n);
	}), e()) {
		let e = document.querySelector(".hero");
		e && q(e.querySelectorAll(".hero-status,.hero-lower>p,.hero-actions>a,.hero-portrait .profile-wrap,.hero-email,.profile-links>a,.profile-links>button"), {
			opacity: [0, 1],
			y: [22, 0]
		}, {
			duration: .95,
			delay: (e) => .12 + e * .065,
			ease: t
		});
	}
	document.querySelectorAll(".compact-facts article,.compact-preview,.resume-pages figure,.screenshot-card").forEach((n, r) => {
		J(n, () => {
			e() && q(n, n.matches(".compact-preview,.resume-pages figure") ? { opacity: [0, 1] } : {
				opacity: [0, 1],
				y: [30, 0],
				scale: [.98, 1]
			}, {
				duration: .85,
				delay: r % 4 * .075,
				ease: t
			});
		}, { amount: .15 });
	});
	let r = [...document.querySelectorAll(".cert")], i = /* @__PURE__ */ new Map();
	function a(e, n, r = 0) {
		i.get(e)?.forEach((e) => e.stop());
		let a = e.querySelector(".cert-image"), o = e.querySelector(":scope > div"), s = e.querySelector(":scope > span:last-child"), c = [];
		a && c.push(q(a, n ? {
			opacity: [.1, 1],
			scale: [.55, 1],
			rotate: [-14, 0]
		} : { opacity: [.15, 1] }, {
			duration: n ? 1 : .65,
			delay: r,
			ease: t
		})), o && c.push(q(o, n ? {
			opacity: [0, 1],
			x: [24, 0]
		} : { opacity: [.15, 1] }, {
			duration: .75,
			delay: r + .12,
			ease: t
		})), s && c.push(q(s, n ? {
			opacity: [0, 1],
			y: [10, 0]
		} : { opacity: [.15, 1] }, {
			duration: .65,
			delay: r + .25,
			ease: t
		})), i.set(e, c);
	}
	r.forEach((t, n) => {
		J(t, () => {
			a(t, e(), n % 2 * .12);
		}, { amount: .4 });
	});
	let o = document.querySelector(".footer");
	o && J(o, () => {
		e() && q(o.children, {
			opacity: [0, 1],
			y: [12, 0]
		}, {
			duration: .65,
			delay: (e) => e * .08,
			ease: t
		});
	}), n && document.querySelectorAll(".compact-preview,.resume-pages figure").forEach((t) => {
		let n = 0, r = li(0, {
			stiffness: 150,
			damping: 24
		}), i = li(0, {
			stiffness: 150,
			damping: 24
		});
		r.on("change", (e) => t.style.setProperty("--preview-rx", `${e}deg`)), i.on("change", (e) => t.style.setProperty("--preview-ry", `${e}deg`)), t.addEventListener("pointermove", (a) => {
			!e() || n || (n = requestAnimationFrame(() => {
				n = 0;
				let e = t.getBoundingClientRect();
				r.set(-((a.clientY - e.top) / e.height - .5) * 3), i.set(((a.clientX - e.left) / e.width - .5) * 4);
			}));
		}, { passive: !0 }), t.addEventListener("pointerleave", () => {
			r.set(0), i.set(0);
		}), document.addEventListener("portfolio:motion", () => {
			e() || (r.jump(0), i.jump(0));
		});
	}), document.querySelectorAll(".button,.text-link,.skill-evidence a,.hero-email,.profile-links a,.back-link,.next-project,.footer a").forEach((t) => {
		let n;
		t.addEventListener("pointerdown", () => {
			e() && (n?.cancel(), n = t.animate([
				{ opacity: 1 },
				{ opacity: .55 },
				{ opacity: 1 }
			], {
				duration: 260,
				easing: "ease-out"
			}));
		});
	});
}
//#endregion
//#region cat-game.js
var Ma = "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><ellipse cx=\"16\" cy=\"22\" rx=\"8\" ry=\"6\"/><ellipse cx=\"7\" cy=\"13\" rx=\"3\" ry=\"4\" transform=\"rotate(-25 7 13)\"/><ellipse cx=\"14\" cy=\"8\" rx=\"3\" ry=\"4\"/><ellipse cx=\"22\" cy=\"9\" rx=\"3\" ry=\"4\"/><ellipse cx=\"27\" cy=\"15\" rx=\"3\" ry=\"4\" transform=\"rotate(25 27 15)\"/></svg>", Na = "<svg class=\"cat-box-art\" viewBox=\"0 0 200 160\" fill=\"none\" aria-hidden=\"true\"><path class=\"cat-box-shadow\" d=\"M25 143q75-14 150 0-75 20-150 0\"/><g class=\"cat-box-body\"><path d=\"m30 70 70-22 70 22v61l-70 23-70-23Z\"/><path d=\"m30 70 70 23 70-23M100 93v61\"/><path class=\"cat-box-tape\" d=\"m82 55 35 11v24l-17 5-18-6V55Z\"/><path d=\"m44 108 18 6m-18 5 12 4\"/></g><g class=\"cat-box-lid\"><path d=\"m30 70 70-23 70 23-70 24Z\"/><path d=\"m30 70-15-21 69-21 16 19m0 0 17-19 68 21-15 21\"/><path d=\"m84 28 33 0\"/></g></svg>";
function Pa(e) {
	let t = document.querySelector(".hero .profile-wrap"), n = document.querySelector(".hero .about-copy");
	if (!t || !n) return;
	t.tabIndex = 0, t.setAttribute("role", "button"), t.setAttribute("aria-label", "Play hide and seek with the hidden cat");
	let r = document.createElement("button");
	r.type = "button", r.className = "cat-hint", r.innerHTML = `${Ma}<span>Play hide &amp; seek</span>`, t.after(r);
	let i = document.createElement("section");
	i.className = "cat-game", i.id = "cat-game", i.hidden = !0, i.setAttribute("aria-labelledby", "cat-game-title"), r.setAttribute("aria-controls", i.id), r.setAttribute("aria-expanded", "false"), i.innerHTML = `<header class="cat-game-header"><div><h2 id="cat-game-title">Cat &amp; boxes</h2><p>Watch the cat. Follow the shuffle. Pick a box.</p></div><div class="cat-game-score" role="img" aria-label="0 of 3 rounds complete">${[
		0,
		1,
		2
	].map((e) => `<span data-cat-score="${e}">${Ma}</span>`).join("")}</div><button type="button" class="cat-game-close" aria-label="Close cat game">×</button></header><div class="cat-game-board" role="group" aria-label="Three hiding boxes">${[
		0,
		1,
		2
	].map((e) => `<button type="button" class="cat-box" data-cat-box="${e}"><span class="cat-box-head" aria-hidden="true"><img src="/public/assets/profile/profile2.webp" alt="" draggable="false"></span>${Na}<span class="cat-box-empty" aria-hidden="true">${Ma}</span><span class="cat-box-number" aria-hidden="true">${e + 1}</span></button>`).join("")}</div><footer class="cat-game-footer"><p class="cat-game-status" role="status"></p><button type="button" class="cat-game-action">Shuffle boxes <span aria-hidden="true">↝</span></button></footer>`, n.after(i);
	let a = [...i.querySelectorAll(".cat-box")], o = i.querySelector(".cat-game-action"), s = i.querySelector(".cat-game-status"), c = "closed", l = 0, u = 0, d = [
		0,
		1,
		2
	], f = [], p = (e, t) => {
		let n = setTimeout(e, t);
		f.push(n);
	};
	function m() {
		f.forEach(clearTimeout), f = [];
	}
	function h() {
		a.forEach((e, t) => {
			e.style.setProperty("--cat-slot", d[t]), e.setAttribute("aria-label", `Open the ${[
				"left",
				"middle",
				"right"
			][d[t]]} box`);
		});
	}
	function g() {
		i.querySelectorAll("[data-cat-score]").forEach((e, t) => e.classList.toggle("is-earned", t < l)), i.querySelector(".cat-game-score").setAttribute("aria-label", `${l} of 3 rounds complete`);
	}
	function _() {
		m(), c = "preview", u = Math.floor(Math.random() * 3), d = [
			0,
			1,
			2
		], i.classList.remove("is-complete"), a.forEach((e, t) => {
			e.disabled = !1, e.classList.remove("is-open", "is-correct", "is-empty"), e.classList.toggle("is-peeking", t === u);
		}), h(), g(), o.hidden = !1, o.innerHTML = "Shuffle boxes <span aria-hidden=\"true\">↝</span>", s.textContent = `Round ${l + 1} of 3. The cat is in the ${[
			"left",
			"middle",
			"right"
		][d[u]]} box.`;
	}
	function v() {
		if (!i.hidden) {
			i.querySelector(".cat-game-close").focus({ preventScroll: !0 });
			return;
		}
		i.hidden = !1, r.setAttribute("aria-expanded", "true"), l = 0, _(), i.scrollIntoView({
			block: "nearest",
			behavior: e() ? "smooth" : "instant"
		}), o.focus({ preventScroll: !0 });
	}
	function y() {
		if (m(), c = "shuffle", o.hidden = !0, a.forEach((e) => e.classList.remove("is-peeking")), s.textContent = "Follow the boxes…", !e()) {
			c = "pick", s.textContent = "Which box was the cat in?";
			return;
		}
		let t = 3 + l;
		for (let e = 0; e < t; e++) p(() => {
			let e = Math.floor(Math.random() * 3), t = (e + 1 + Math.floor(Math.random() * 2)) % 3;
			[d[e], d[t]] = [d[t], d[e]], h();
		}, 220 + e * 620);
		p(() => {
			c = "pick", s.textContent = "Where is the cat?";
		}, t * 620 + 220);
	}
	function b() {
		if (!e()) return;
		let t = i.querySelector(".cat-game-board");
		for (let e = 0; e < 9; e++) {
			let n = document.createElement("span");
			n.className = "cat-win-paw", n.innerHTML = Ma, t.append(n), n.animate([
				{
					opacity: 0,
					transform: "translate(0,0) scale(.5)"
				},
				{
					opacity: .6,
					offset: .2
				},
				{
					opacity: 0,
					transform: `translate(${(e - 4) * 35}px,${-60 - Math.sin(e) * 35}px) scale(1)`
				}
			], {
				duration: 950,
				delay: e * 35,
				easing: "ease-out"
			}).finished.finally(() => n.remove());
		}
	}
	function x(e) {
		if (c === "preview") {
			y();
			return;
		}
		if (c === "pick" || c === "shuffle") {
			if (m(), c = "pick", a[e].classList.add("is-open"), e !== u) {
				a[e].classList.add("is-empty"), a[e].disabled = !0, s.textContent = "Empty. Try another box.", a.find((e) => !e.disabled)?.focus({ preventScroll: !0 });
				return;
			}
			c = "found", a[e].classList.add("is-correct"), a.forEach((e) => e.disabled = !0), l++, g(), b(), o.hidden = !1, l === 3 ? (c = "complete", i.classList.add("is-complete"), s.textContent = "Three for three. You found the cat!", o.textContent = "Play again") : (s.textContent = "Found it!", o.innerHTML = "Next round <span aria-hidden=\"true\">→</span>"), o.focus({ preventScroll: !0 });
		}
	}
	o.addEventListener("click", () => {
		c === "preview" ? y() : c === "found" ? _() : c === "complete" && (l = 0, _());
	}), a.forEach((e, t) => {
		e.addEventListener("click", () => x(t)), e.addEventListener("keydown", (t) => {
			if (t.key !== "ArrowLeft" && t.key !== "ArrowRight") return;
			t.preventDefault();
			let n = a.filter((e) => !e.disabled).sort((e, t) => d[Number(e.dataset.catBox)] - d[Number(t.dataset.catBox)]);
			n[(n.indexOf(e) + (t.key === "ArrowRight" ? 1 : n.length - 1)) % n.length]?.focus();
		});
	});
	function S() {
		m(), c = "closed", i.hidden = !0, r.setAttribute("aria-expanded", "false"), r.focus({ preventScroll: !0 });
	}
	i.querySelector(".cat-game-close").addEventListener("click", S), i.addEventListener("keydown", (e) => {
		e.key === "Escape" && (e.preventDefault(), S());
	}), r.addEventListener("click", v), t.addEventListener("click", (e) => {
		if (e.pointerType === "touch" && !t.classList.contains("cat-peek")) {
			t.classList.add("cat-peek");
			return;
		}
		v();
	}), t.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.classList.add("cat-peek"), v());
	}), document.addEventListener("visibilitychange", () => {
		document.hidden && c === "shuffle" && (m(), c = "pick", s.textContent = "Where is the cat?");
	}), new IntersectionObserver((e) => {
		!e[0].isIntersecting && c === "shuffle" && (m(), c = "pick", s.textContent = "Where is the cat?");
	}, { threshold: .05 }).observe(i);
}
//#endregion
//#region security-lab.js
var Y = {
	dns: {
		name: "DNS resolver",
		destination: "10.10.0.53",
		protocol: "DNS",
		path: "M130 150 Q240 15 390 50",
		x: 390,
		y: 50
	},
	web: {
		name: "Web server",
		destination: "198.51.100.20",
		protocol: "HTTPS",
		path: "M135 150 L385 150",
		x: 385,
		y: 150
	},
	external: {
		name: "External host",
		destination: "203.0.113.42",
		protocol: "TLS :8443",
		path: "M130 150 Q240 285 390 250",
		x: 390,
		y: 250
	}
}, X = [
	[
		0,
		"dns",
		74,
		"Query: assets.example.test. A routine hostname lookup."
	],
	[
		3,
		"web",
		1240,
		"An HTTPS response fragment during a page load."
	],
	[
		5,
		"external",
		96,
		"Outbound TLS connection on port 8443. Encrypted payload is not available."
	],
	[
		10,
		"web",
		812,
		"Another response fragment. Variable sizes and irregular timing."
	],
	[
		25,
		"external",
		96,
		"Same destination, port and size. Twenty seconds after the previous connection."
	],
	[
		30,
		"dns",
		81,
		"Query: api.example.test. A second routine lookup."
	],
	[
		45,
		"external",
		96,
		"Third connection with the same size and another twenty-second interval."
	],
	[
		49,
		"web",
		1460,
		"A larger HTTPS response fragment, forty-nine seconds into the capture."
	],
	[
		65,
		"external",
		96,
		"Fourth 96-byte connection. The twenty-second interval repeats again."
	],
	[
		70,
		"dns",
		76,
		"Query: static.example.test. No unusual query length in this scenario."
	],
	[
		75,
		"web",
		602,
		"Final response fragment in the fictional capture."
	]
].map(([e, t, n, r], i) => ({
	id: i,
	time: e,
	flow: t,
	size: n,
	detail: r
}));
function Fa(e) {
	let t = document.querySelector("#skills");
	if (!t) return;
	let n = document.createElement("section");
	n.className = "security-lab page-width", n.id = "security-lab", n.setAttribute("aria-labelledby", "security-lab-title"), n.innerHTML = `<header class="lab-heading"><div><p class="interaction-label">Simulated investigation · about one minute</p><h2 id="security-lab-title">Inspect a suspicious connection.</h2><p>A fictional 75-second capture. Follow the traffic, inspect a packet, then flag the connection worth investigating.</p></div><button type="button" class="lab-start lab-button">Start investigation <span aria-hidden="true">↗</span></button></header>
    <div class="lab-console"><div class="lab-network" aria-label="Simulated network connections">
    <svg class="lab-wires" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden="true">${Object.entries(Y).map(([e, t]) => `<path data-flow-path="${e}" d="${t.path}"/>`).join("")}</svg>
    <div class="lab-workstation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2"/><path d="M8 21h8m-4-5v5"/></svg><strong>Workstation</strong><small>10.10.0.12</small></div>
    ${Object.entries(Y).map(([e, t]) => `<button type="button" class="lab-host lab-host-${e}" data-flow="${e}" aria-pressed="false"><span class="lab-node-dot" aria-hidden="true"></span><strong>${t.name}</strong><small>${t.destination}</small></button>`).join("")}
    <span class="lab-network-caption">Select a destination to isolate its traffic.</span></div>
    <div class="lab-intro"><span class="lab-intro-symbol" aria-hidden="true">⌁</span><p>No tools to install.<br>No real traffic is collected.</p><small>Everything runs locally in your browser.</small></div>
    <div class="lab-evidence" hidden><div class="lab-playback"><button type="button" class="lab-play lab-button" aria-label="Pause simulated traffic">Pause</button><label for="lab-time">Capture time <output id="lab-time-value">00s / 75s</output></label><input id="lab-time" type="range" min="0" max="75" step="1" value="0" aria-label="Capture time in seconds"><button type="button" class="lab-show-all">All connections</button></div>
    <div class="lab-packet-scroll"><table class="lab-packets"><caption class="sr-only">Fictional packets available at the selected capture time</caption><thead><tr><th scope="col">Time</th><th scope="col">Source → destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th><th scope="col"><span class="sr-only">Inspect</span></th></tr></thead><tbody></tbody></table></div>
    <div class="lab-inspector" aria-live="polite"><strong>Choose a packet</strong><p>Inspect its timing, destination and size. Move the capture slider forward to reveal more traffic.</p></div>
    <div class="lab-verdict"><span class="lab-selection">No connection selected</span><button type="button" class="lab-flag lab-button" disabled>Flag as suspicious <span aria-hidden="true">↗</span></button></div><p class="lab-feedback" role="status"></p></div></div>
    <p class="lab-disclaimer">Fictional data, reserved documentation addresses, no scanning. A suspicious pattern is a reason to investigate—not proof of an attack.</p>`, t.before(n);
	let r = n.querySelector(".lab-evidence"), i = n.querySelector("#lab-time"), a = n.querySelector(".lab-play"), o = n.querySelector(".lab-inspector"), s = !1, c = !1, l = !1, u = 0, d = null, f = null, p, m = (e) => String(e).padStart(2, "0");
	function h(t) {
		let r = n.querySelector(`[data-flow-path="${t}"]`);
		!r || !e() || !l || document.hidden || (r.getAnimations().forEach((e) => e.cancel()), r.animate([{
			strokeDasharray: "5 8",
			strokeDashoffset: 52,
			opacity: 1
		}, {
			strokeDasharray: "5 8",
			strokeDashoffset: 0,
			opacity: 1
		}], {
			duration: 650,
			easing: "ease-out"
		}));
	}
	function g() {
		i.value = String(u), n.querySelector("#lab-time-value").textContent = `${m(u)}s / 75s`, a.textContent = c ? "Pause" : u === 75 ? "Replay" : "Play", a.setAttribute("aria-label", c ? "Pause simulated traffic" : "Play simulated traffic"), n.querySelectorAll("[data-flow]").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.flow === d))), n.querySelectorAll("[data-flow-path]").forEach((e) => e.classList.toggle("is-selected", e.dataset.flowPath === d));
		let e = X.filter((e) => e.time <= u && (!d || e.flow === d));
		n.querySelector("tbody").innerHTML = e.length ? e.map((e) => `<tr class="${e.id === f ? "is-selected" : ""}"><td>${m(e.time)}s</td><td><span>10.10.0.12 →</span> ${Y[e.flow].destination}</td><td>${Y[e.flow].protocol}</td><td>${e.size}</td><td><button type="button" data-packet="${e.id}" aria-label="Inspect packet at ${e.time} seconds to ${Y[e.flow].destination}" aria-pressed="${e.id === f}">Inspect</button></td></tr>`).join("") : "<tr><td colspan=\"5\">No packets for this connection at this time. Move the slider forward.</td></tr>", n.querySelector(".lab-selection").textContent = d ? `Selected: ${Y[d].name}` : "No connection selected", n.querySelector(".lab-flag").disabled = !d;
		let t = X.find((e) => e.id === f);
		t ? o.innerHTML = `<strong>${Y[t.flow].protocol} · ${t.size} bytes · ${m(t.time)}s</strong><p>${t.detail}</p>` : o.innerHTML = "<strong>Choose a packet</strong><p>Inspect its timing, destination and size. Move the capture slider forward to reveal more traffic.</p>";
	}
	function _() {
		clearInterval(p), p = void 0, !(!c || !l || document.hidden) && (p = setInterval(() => {
			let e = u;
			u = Math.min(75, u + 5), X.filter((t) => t.time > e && t.time <= u).forEach((e) => h(e.flow)), u === 75 && (c = !1), g(), c || _();
		}, 1e3));
	}
	function v() {
		s || (s = !0, c = !0, r.hidden = !1, n.querySelector(".lab-intro").hidden = !0, n.querySelector(".lab-start").hidden = !0, g(), _());
	}
	n.querySelector(".lab-start").addEventListener("click", v), n.querySelectorAll("[data-flow]").forEach((e) => e.addEventListener("click", () => {
		v(), d = e.dataset.flow, f = null, n.querySelector(".lab-feedback").textContent = "", g(), h(d);
	})), n.querySelector("tbody").addEventListener("click", (e) => {
		let t = e.target.closest("[data-packet]");
		t && (f = Number(t.dataset.packet), d = X[f].flow, c = !1, _(), g(), h(d), n.querySelector(`[data-packet="${f}"]`)?.focus({ preventScroll: !0 }));
	}), i.addEventListener("input", () => {
		u = Number(i.value), c = !1, n.querySelector(".lab-feedback").textContent = "", f !== null && X[f].time > u && (f = null), _(), g();
	}), a.addEventListener("click", () => {
		n.querySelector(".lab-feedback").textContent = "", u === 75 && (u = 0, f = null), c = !c, g(), _();
	}), n.querySelector(".lab-show-all").addEventListener("click", () => {
		d = null, g();
	}), n.querySelector(".lab-flag").addEventListener("click", () => {
		c = !1, _(), g();
		let e = n.querySelector(".lab-feedback");
		e.textContent = d === "external" ? X.filter((e) => e.flow === "external" && e.time <= u).length < 4 ? "A plausible lead, but not enough evidence yet. Move the slider to at least 65s and compare the repeated connections." : "Good lead. Four 96-byte TLS connections occur at 05s, 25s, 45s and 65s: a regular 20-second pattern. This can resemble beaconing, but legitimate software can behave similarly. Check process ownership, destination reputation and host logs before deciding." : d === "dns" ? "These short, ordinary hostname lookups provide no strong anomaly in this capture. Try comparing the timing and sizes of the other connections." : "These HTTPS fragments vary in size and timing. That alone is not strong evidence of an incident. Inspect another destination for a repeatable pattern.";
	}), new IntersectionObserver((e) => {
		l = e[0].isIntersecting, _();
	}, { threshold: .05 }).observe(n), document.addEventListener("visibilitychange", _);
}
//#endregion
//#region project-metadata.js
var Z = [
	{
		id: "codex-pulse",
		name: "Codex Pulse",
		summary: "Tracks five-hour and weekly usage alongside local session activity, token history, and optional reset alerts.",
		url: "/projects/codex-pulse/",
		repo: "https://github.com/bonkval/Codex-Pulse",
		skills: [
			"Electron",
			"JavaScript",
			"Windows",
			"VS Code",
			"Local sessions",
			"CSS",
			"HTML",
			"PowerShell",
			"NSIS"
		]
	},
	{
		id: "secure-me-pls",
		name: "Secure me, pls?",
		summary: "Checks eight documented weak-password patterns entirely in the browser, with lessons and a locally saved security checklist.",
		url: "/projects/secure-me-pls/",
		repo: "https://github.com/bonkval/secure-me-pls",
		skills: [
			"Next.js",
			"TypeScript",
			"React 19",
			"Tailwind CSS",
			"Local storage",
			"CSS",
			"JavaScript"
		]
	},
	{
		id: "canvas-copy-pasta",
		name: "CanvasCopyPasta",
		summary: "Uses Manifest V3 and Shadow DOM to copy question text, selected answers, and images without mixing with Canvas styles.",
		url: "/projects/canvas-copy-pasta/",
		repo: "https://github.com/bonkval/CanvasCopyPasta",
		skills: [
			"JavaScript",
			"Browser extension",
			"Shadow DOM",
			"Clipboard API",
			"AutoHotkey",
			"CSS",
			"PowerShell",
			"HTML"
		]
	},
	{
		id: "sentiflow-network-lab",
		name: "SentiFlow Network Lab",
		summary: "Runs eight labeled traffic scenarios through seven detection families, with local SQLite storage and a validation script.",
		url: "/projects/sentiflow-network-lab/",
		repo: "https://github.com/bonkval/SentiFlow-Network-Lab",
		skills: [
			"Python",
			"SQLite",
			"PCAP",
			"TShark",
			"HTML",
			"Batchfile"
		]
	},
	{
		id: "project-chameleon",
		name: "Project Chameleon",
		summary: "Records input only inside project-owned training windows. Includes visible consent, buffered local logs, and no global hooks.",
		url: "/projects/project-chameleon/",
		repo: "https://github.com/bonkval/Project-Chameleon",
		skills: [
			"Python 3.10+",
			"CustomTkinter",
			"Threading",
			"JSON",
			"SHA-256",
			"Python"
		]
	},
	{
		id: "phishhook",
		name: "PhishHook",
		summary: "Limits authorized campaigns to 25 recipients, requires final review, and separates scanner activity from anonymous interaction signals.",
		url: "/projects/phishhook/",
		repo: "https://github.com/bonkval/phishhook",
		skills: [
			"Python 3.12+",
			"CustomTkinter",
			"Cloudflare Workers",
			"D1",
			"SQLite",
			"SMTP",
			"Python",
			"TypeScript",
			"PowerShell"
		]
	},
	{
		id: "huli-na-honeypot",
		name: "Huli na!",
		summary: "Scores SSH and HTTP activity into five severity levels without storing submitted passwords or request bodies.",
		url: "/projects/huli-na-honeypot/",
		repo: "https://github.com/bonkval/huli-na-honeypot",
		skills: [
			"Python",
			"AsyncSSH",
			"SQLite",
			"Windows",
			"Analytics",
			"Batchfile",
			"Inno Setup"
		]
	},
	{
		id: "trustwho",
		name: "TrustWho",
		summary: "Analyzes 34 lexical URL features across three detection layers without opening or resolving the submitted address.",
		url: "/projects/trustwho/",
		repo: "https://github.com/bonkval/TrustWho",
		skills: [
			"Python",
			"FastAPI",
			"scikit-learn",
			"Pandas",
			"Uvicorn",
			"CSS",
			"JavaScript",
			"HTML",
			"Dockerfile"
		]
	},
	{
		id: "network-security-lab",
		name: "NetworkSecLab",
		summary: "Combines three guided labs, five credential-attack detection patterns, and inventory-bound SSH configuration previews.",
		url: "/projects/network-security-lab/",
		repo: "https://github.com/bonkval/NetworkSecLab",
		skills: [
			"Python",
			"Flask",
			"SQLite",
			"SNMP",
			"Docker",
			"HTML",
			"JavaScript",
			"Dockerfile"
		]
	},
	{
		id: "live-screen-view",
		name: "LiveScreenView",
		summary: "Shares on-demand desktop captures over a local network with mobile zoom, OCR extraction, and copy-all text.",
		url: "/projects/live-screen-view/",
		repo: "https://github.com/bonkval/LiveScreenView",
		skills: [
			"Python",
			"MSS",
			"Pillow",
			"Tesseract OCR",
			"LAN HTTP"
		]
	},
	{
		id: "starlium",
		name: "Starlium",
		summary: "Connects PHP account, cart, and checkout flows to inventory, user administration, and reporting.",
		url: "/projects/starlium/",
		repo: "https://github.com/bonkval/Starlium",
		skills: [
			"PHP",
			"MySQL",
			"JavaScript",
			"HTML",
			"CSS"
		]
	}
], Ia = [
	[17, 15],
	[50, 11],
	[83, 15],
	[17, 38],
	[50, 36],
	[83, 38],
	[17, 61],
	[50, 63],
	[83, 61],
	[32, 86],
	[70, 86]
], La = [
	"Python",
	"JavaScript",
	"TypeScript",
	"SQL",
	"Electron"
], Q = (e, t) => t === "All" || e.skills.some((e) => e.toLowerCase() === t.toLowerCase() || t === "SQL" && /^(sqlite|sql)$/i.test(e));
function Ra(e) {
	let t = document.querySelector("#work [data-project-rail]");
	if (!t) return;
	let n = t.closest("section"), r = document.createElement("div");
	r.className = "project-explorer-tools", r.innerHTML = `<div class="project-view-switch" role="group" aria-label="Project view"><button type="button" data-view="cards" aria-pressed="true">Cards</button><button type="button" data-view="map" aria-pressed="false">Map <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 5 11-2-5 12L4 5l12 7"/><circle cx="4" cy="5" r="2"/><circle cx="15" cy="3" r="2"/><circle cx="10" cy="15" r="2"/></svg></button></div><div class="project-skill-filters" role="group" aria-label="Highlight projects by skill">${["All", ...La].map((e) => `<button type="button" data-skill="${e}" aria-pressed="${e === "All"}">${e}</button>`).join("")}</div><span class="project-filter-status" role="status"></span>`, t.before(r);
	let i = document.createElement("div");
	i.className = "project-map", i.hidden = !0, i.innerHTML = "<p class=\"project-map-help\">Shared skills connect the projects. Select a node to inspect it; use arrow keys to move between nodes.</p><div class=\"project-map-scroll\" tabindex=\"0\" role=\"region\" aria-label=\"Project constellation. On small screens, scroll horizontally to explore the map.\"><div class=\"project-map-stage\"><svg class=\"project-map-wires\" viewBox=\"0 0 1000 440\" preserveAspectRatio=\"none\" aria-hidden=\"true\"></svg></div></div><div class=\"project-map-preview\" aria-live=\"polite\"></div>", t.after(i);
	let a = i.querySelector(".project-map-stage"), o = i.querySelector("svg"), s = i.querySelector(".project-map-preview"), c = "All", l = "cards", u = Z[0].id, d = /* @__PURE__ */ new Map(), f = [...t.querySelectorAll(".project-card")], p = [];
	Z.forEach((e, t) => {
		let n = 0;
		for (let r = t + 1; r < Z.length && n < 2; r++) {
			let t = La.filter((t) => Q(e, t) && Q(Z[r], t));
			t.length && (p.push({
				from: e.id,
				to: Z[r].id,
				shared: t
			}), n++);
		}
		let r = document.createElement("button");
		r.type = "button", r.className = "project-map-node", r.dataset.mapProject = e.id, r.innerHTML = `<span class="map-node-pin" aria-hidden="true"></span><strong>${e.name}</strong><small>${e.skills.slice(0, 2).join(" / ")}</small>`, r.setAttribute("aria-pressed", String(u === e.id)), a.append(r), d.set(e.id, r), r.addEventListener("click", () => {
			u = e.id, m(e), h(!1, !0);
		}), r.addEventListener("focus", () => m(e)), r.addEventListener("pointerenter", () => m(e)), r.addEventListener("keydown", (e) => {
			let n = {
				ArrowRight: 1,
				ArrowLeft: -1,
				ArrowDown: 3,
				ArrowUp: -3,
				Home: -t,
				End: Z.length - 1 - t
			};
			if (!(e.key in n)) return;
			e.preventDefault();
			let r = Math.max(0, Math.min(Z.length - 1, t + n[e.key]));
			d.get(Z[r].id).focus();
		});
	});
	function m(e) {
		s.innerHTML = `<div><p class="interaction-label">Project details</p><h3>${e.name}</h3><p>${e.summary}</p></div><div class="map-preview-links"><span>${e.skills.slice(0, 5).join(" · ")}</span><a href="${e.url}" class="text-link">Read documentation <span aria-hidden="true">↗</span></a></div>`;
	}
	function h(t = !1, n = !1) {
		let r = /* @__PURE__ */ new Map();
		t && e() && !i.hidden && d.forEach((e, t) => {
			let n = e.getBoundingClientRect();
			e.getAnimations().forEach((e) => e.cancel()), r.set(t, n);
		});
		let a = [...Z].sort((e, t) => Number(Q(t, c)) - Number(Q(e, c))), s = /* @__PURE__ */ new Map();
		a.forEach((e, t) => {
			let [n, r] = Ia[t], i = d.get(e.id);
			s.set(e.id, [n * 10, r * 4.4]), i.style.left = `calc(${n}% - 90px)`, i.style.top = `calc(${r}% - 31px)`, i.classList.toggle("is-skill-muted", !Q(e, c)), i.setAttribute("aria-pressed", String(u === e.id));
		});
		let l = [];
		r.forEach((e, t) => {
			let n = d.get(t), r = n.getBoundingClientRect();
			l.push([
				n,
				e.left - r.left,
				e.top - r.top
			]);
		}), l.forEach(([e, t, n]) => {
			(t || n) && e.animate([{ transform: `translate(${t}px,${n}px)` }, { transform: "translate(0,0)" }], {
				duration: 550,
				easing: "cubic-bezier(.16,1,.3,1)"
			});
		}), o.innerHTML = p.map((e) => {
			let t = s.get(e.from), n = s.get(e.to), r = e.from === u || e.to === u, i = c !== "All" && !e.shared.includes(c);
			return `<path d="M${t[0]} ${t[1]} Q${(t[0] + n[0]) / 2 + 30} ${(t[1] + n[1]) / 2 - 25} ${n[0]} ${n[1]}" class="${r ? "is-related " : ""}${i ? "is-muted" : ""}"/>`;
		}).join(""), n && e() && o.querySelectorAll(".is-related").forEach((e) => e.animate([{
			strokeDasharray: "4 8",
			strokeDashoffset: 100,
			opacity: 1
		}, {
			strokeDasharray: "4 8",
			strokeDashoffset: 0,
			opacity: .7
		}], {
			duration: 800,
			easing: "ease-out"
		}));
	}
	function g(n) {
		c = n, r.querySelectorAll("[data-skill]").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.skill === c))), f.forEach((e) => {
			let t = Z.find((t) => e.getAttribute("href") === t.url);
			e.classList.toggle("is-skill-muted", t && !Q(t, c));
		});
		let i = Z.filter((e) => Q(e, c));
		if (r.querySelector(".project-filter-status").textContent = c === "All" ? "" : `${i.length} projects use ${c}`, i.some((e) => e.id === u) || (u = i[0].id), m(Z.find((e) => e.id === u)), h(!0), l === "cards" && c !== "All") {
			let n = f.find((e) => !e.classList.contains("is-skill-muted"));
			n && t.scrollTo({
				left: n.offsetLeft - t.offsetLeft,
				behavior: e() ? "smooth" : "instant"
			});
		}
	}
	r.querySelectorAll("[data-skill]").forEach((e) => e.addEventListener("click", () => g(e.dataset.skill))), r.querySelectorAll("[data-view]").forEach((e) => e.addEventListener("click", () => {
		l = e.dataset.view, r.querySelectorAll("[data-view]").forEach((t) => t.setAttribute("aria-pressed", String(t === e))), t.hidden = l !== "cards", i.hidden = l !== "map";
		let a = n.querySelector(".gallery-scrubber");
		a && (a.hidden = l !== "cards"), l === "map" && h();
	})), m(Z[0]), h();
}
//#endregion
//#region project-history.js
var za = {
	"canvas-copy-pasta": {
		mode: "Selected public commits",
		pipeline: [
			"Question content",
			"Answers + images",
			"Isolated toolbar",
			"Clipboard"
		],
		stages: [
			{
				title: "Extension release",
				text: "Released Canvas Copy Assistant v5.0.0, with the extension source, manifest, popup and project documentation.",
				date: "2026-09-08",
				sha: "180d5d0",
				source: "https://github.com/bonkval/CanvasCopyPasta/commit/180d5d0d2ca5bc8031caca5ee351a6702567a764",
				kind: "Public commit",
				flowStep: 2
			},
			{
				title: "Image copying",
				text: "Added question-image copying. The change includes extension content logic and a service worker.",
				date: "2026-09-08",
				sha: "2f99c25",
				source: "https://github.com/bonkval/CanvasCopyPasta/commit/2f99c2567ae4130df77a8ceda3a4bd974883b872",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Multiple answers",
				text: "Added multiple-answer support in v5.4.0 and updated the core tests.",
				date: "2026-09-10",
				sha: "98b6a03",
				source: "https://github.com/bonkval/CanvasCopyPasta/commit/98b6a03cba429b2f3b145dc3eec0081e7bbfc51d",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Review indicators",
				text: "Clarified failed-review indicators in v5.4.5, with changes to content extraction and core tests.",
				date: "2026-09-16",
				sha: "d251d46",
				source: "https://github.com/bonkval/CanvasCopyPasta/commit/d251d46eb52350c73e532c0897bf4b5f7f351769",
				kind: "Public commit",
				flowStep: 0
			}
		],
		repo: "https://github.com/bonkval/CanvasCopyPasta"
	},
	"codex-pulse": {
		mode: "Selected public commits",
		pipeline: [
			"Usage windows",
			"Local sessions",
			"Dashboard",
			"Reset alerts"
		],
		stages: [
			{
				title: "Initial release",
				text: "Published the initial AI Tray release with Electron main, preload and renderer code.",
				date: "2026-09-11",
				sha: "e476fcf",
				source: "https://github.com/bonkval/Codex-Pulse/commit/e476fcf9bbc9a34ef5e6d98a8a7d2b79eb1844c0",
				kind: "Public commit",
				flowStep: 2
			},
			{
				title: "Activity bridge",
				text: "Added a live VS Code Codex activity bridge and a dedicated activity-bridge test.",
				date: "2026-09-11",
				sha: "7435fbd",
				source: "https://github.com/bonkval/Codex-Pulse/commit/7435fbd8059f5375ea886a9d674394b551daab22",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Drag refinement",
				text: "Smoothed minimized-logo dragging through changes to the main process, preload bridge and renderer.",
				date: "2026-09-12",
				sha: "f56ea13",
				source: "https://github.com/bonkval/Codex-Pulse/commit/f56ea13663af787ad571a4e60925af308574a78c",
				kind: "Public commit",
				flowStep: 2
			},
			{
				title: "Dashboard release",
				text: "Released v1.5.9 with dashboard and taskbar improvements, analytics changes and runtime regression tests.",
				date: "2026-10-28",
				sha: "9fea3ac",
				source: "https://github.com/bonkval/Codex-Pulse/commit/9fea3ac0a7947165e2c55f35f0fa30a619a0c879",
				kind: "Public commit",
				flowStep: 2
			}
		],
		repo: "https://github.com/bonkval/Codex-Pulse"
	},
	"huli-na-honeypot": {
		mode: "Selected public commits",
		pipeline: [
			"SSH / HTTP",
			"Risk scoring",
			"Local storage",
			"Incident report"
		],
		stages: [
			{
				title: "Repository setup",
				text: "Established the public repository guardrails with a license and ignored local artifacts.",
				date: "2026-08-11",
				sha: "d7a1f67",
				source: "https://github.com/bonkval/huli-na-honeypot/commit/d7a1f671980b484f9248db1678dca88b6cb1fe60",
				kind: "Public commit",
				flowStep: null
			},
			{
				title: "Decoy engine",
				text: "Added the asynchronous SSH and HTTP decoy engine, storage, analysis and report-export modules.",
				date: "2026-08-11",
				sha: "5005e15",
				source: "https://github.com/bonkval/huli-na-honeypot/commit/5005e158ca090dfe8c39109074cd924748686e75",
				kind: "Public commit",
				flowStep: 0
			},
			{
				title: "Control center",
				text: "Added the desktop control center and tripwire branding.",
				date: "2026-08-11",
				sha: "98f629a",
				source: "https://github.com/bonkval/huli-na-honeypot/commit/98f629abec37a9d2bcf318b66e61e60f23fa7524",
				kind: "Public commit",
				flowStep: 3
			},
			{
				title: "Coverage",
				text: "Added security, storage, protocol, network-integration and report-export tests.",
				date: "2026-08-11",
				sha: "b20e3bb",
				source: "https://github.com/bonkval/huli-na-honeypot/commit/b20e3bbe47dd35dbf91fadbed7bb834818535d34",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Windows packaging",
				text: "Added executable packaging, an installer definition and release-signing scripts.",
				date: "2026-08-11",
				sha: "4310d03",
				source: "https://github.com/bonkval/huli-na-honeypot/commit/4310d0387f41241dc515b227cc508ab85a9d8a73",
				kind: "Public commit",
				flowStep: null
			}
		],
		repo: "https://github.com/bonkval/huli-na-honeypot"
	},
	"live-screen-view": {
		mode: "Implementation walkthrough ? 1 public commit",
		pipeline: [
			"Capture shortcut",
			"Local viewer",
			"OCR extraction",
			"Copy text"
		],
		stages: [
			{
				title: "Problem",
				text: "Moving visible computer-screen information to a phone usually depends on cloud sync, remote desktop software, or manual retyping.",
				sha: "78692ce",
				source: "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Implementation",
				text: "Built an on-demand capture shortcut, local HTTP viewer, responsive zoom controls, OCR extraction, and copy-all workflow.",
				sha: "78692ce",
				source: "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Documented behavior",
				text: "Delivers on-demand primary-screen capture, fit-to-screen and actual-size viewing, touch zoom, selectable OCR output, and one-action text copying.",
				sha: "78692ce",
				source: "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Run locally",
				text: "Install Tesseract and requirements, run python screen_streamer.py, press the apostrophe key to capture, then open the displayed local address on your phone.",
				sha: "78692ce",
				source: "https://github.com/bonkval/LiveScreenView/tree/78692ce20b913bf49f88f950b0c7d26997b969a0",
				kind: "Documented implementation",
				flowStep: null
			}
		],
		repo: "https://github.com/bonkval/LiveScreenView"
	},
	"network-security-lab": {
		mode: "Selected public commits",
		pipeline: [
			"Lab traffic",
			"Detection patterns",
			"Incidents",
			"Dashboard"
		],
		stages: [
			{
				title: "Initial application",
				text: "The initial commit contains the Flask application, dashboard and login templates, and learning guides.",
				date: "2026-08-05",
				sha: "38b7664",
				source: "https://github.com/bonkval/NetworkSecLab/commit/38b7664a26f873460337d1ea9221b0a34cc29ca1",
				kind: "Public commit",
				flowStep: 3
			},
			{
				title: "Network lab",
				text: "Transformed the log demonstration into a network security lab, adding service, alert and incident-related application files.",
				date: "2026-08-06",
				sha: "a2daa1a",
				source: "https://github.com/bonkval/NetworkSecLab/commit/a2daa1a2d837b5c8a2d7afb151f4a8bf4897a5b3",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Operational dashboard",
				text: "Added adaptive themes and operational-dashboard changes, with dashboard tests.",
				date: "2026-08-07",
				sha: "01c36ff",
				source: "https://github.com/bonkval/NetworkSecLab/commit/01c36ff3203c16fa05a99b2598081b8f8a6df6c7",
				kind: "Public commit",
				flowStep: 3
			},
			{
				title: "Documentation",
				text: "Added a screenshots section to the README so the interface can be reviewed before setup.",
				date: "2026-08-07",
				sha: "bbba35f",
				source: "https://github.com/bonkval/NetworkSecLab/commit/bbba35f64f9f327669848a030ea7350b83ad1711",
				kind: "Public commit",
				flowStep: 3
			}
		],
		repo: "https://github.com/bonkval/NetworkSecLab"
	},
	phishhook: {
		mode: "Implementation walkthrough ? 2 public commits",
		pipeline: [
			"Final review",
			"SMTP delivery",
			"Anonymous signals",
			"Local history"
		],
		stages: [
			{
				title: "Problem",
				text: "Phishing-awareness demonstrations need measurable signals without collecting credentials or encouraging uncontrolled bulk campaigns.",
				sha: "ae737c5",
				source: "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Implementation",
				text: "Built the desktop campaign workflow, review gates, SMTP integration, SQLite history, dashboard, and companion Cloudflare Worker with anonymous interaction events.",
				sha: "ae737c5",
				source: "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Documented behavior",
				text: "Enforces a 25-recipient cap, final review, no-credential education page, anonymous tracking signals, send-failure summaries, and demo mode without external services.",
				sha: "ae737c5",
				source: "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
				kind: "Documented implementation",
				flowStep: null
			},
			{
				title: "Run locally",
				text: "Install the desktop package and run python -m antiphish in demo mode. Real sending requires documented authorization and separately supplied services.",
				sha: "ae737c5",
				source: "https://github.com/bonkval/phishhook/tree/ae737c5a4a71b4cd0a8b317541ad89ee67768c24",
				kind: "Documented implementation",
				flowStep: null
			}
		],
		repo: "https://github.com/bonkval/phishhook"
	},
	"project-chameleon": {
		mode: "Selected public commits",
		pipeline: [
			"Consent",
			"Training window",
			"Buffered events",
			"Local logs"
		],
		stages: [
			{
				title: "Initial release",
				text: "Published the training application, controller, event-log modules, security documentation and tests.",
				date: "2026-09-04",
				sha: "bb7a356",
				source: "https://github.com/bonkval/Project-Chameleon/commit/bb7a3569bbb1d48cfb93dae4c38dcdc4883e733a",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Interface redesign",
				text: "Redesigned the controller and client using a modern CustomTkinter interface.",
				date: "2026-09-04",
				sha: "bd5d08b",
				source: "https://github.com/bonkval/Project-Chameleon/commit/bd5d08b072b83cce9991c64166447931b9a4ca7c",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Visual refinement",
				text: "Refined the header and added a custom chameleon mark through a shared widgets module.",
				date: "2026-09-04",
				sha: "9b946e3",
				source: "https://github.com/bonkval/Project-Chameleon/commit/9b946e37927852982fabf295bdcf707abd9e6b50",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Training-only scope",
				text: "The documented application records inside project-owned training windows, with visible consent and buffered local logs. It does not use global hooks. This is current scope, not a fourth historical release.",
				sha: "9b946e3",
				source: "https://github.com/bonkval/Project-Chameleon/tree/9b946e37927852982fabf295bdcf707abd9e6b50",
				kind: "Current documented scope",
				flowStep: 0
			}
		],
		repo: "https://github.com/bonkval/Project-Chameleon"
	},
	"secure-me-pls": {
		mode: "Selected public commits",
		pipeline: [
			"Local input",
			"Pattern checks",
			"Explanation",
			"Checklist"
		],
		stages: [
			{
				title: "Application launch",
				text: "Launched the password checker, guide, shared components and Next.js application pages.",
				date: "2026-09-04",
				sha: "34dc72d",
				source: "https://github.com/bonkval/secure-me-pls/commit/34dc72de16443fd6b220b7ad26e01e438badf828",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Project README",
				text: "Added the project README. This is a documentation milestone, not a separate application release.",
				date: "2026-09-04",
				sha: "c717772",
				source: "https://github.com/bonkval/secure-me-pls/commit/c717772e256f85f5cbef70a3c0150b9bb7e31088",
				kind: "Public commit",
				flowStep: null
			},
			{
				title: "Deployment guide",
				text: "Revised the Vercel deployment instructions in the README.",
				date: "2026-09-04",
				sha: "6ed125f",
				source: "https://github.com/bonkval/secure-me-pls/commit/6ed125f1a36e7dd3d77c24042752b525f0abcf77",
				kind: "Public commit",
				flowStep: null
			},
			{
				title: "Usage guide",
				text: "Rewrote the README as a project guide. Later documentation explains the application rather than implying new checker behavior.",
				date: "2026-09-04",
				sha: "3cd2322",
				source: "https://github.com/bonkval/secure-me-pls/commit/3cd23221da8ccf4cf6cde53b75dd3fd0876ebf3b",
				kind: "Public commit",
				flowStep: null
			}
		],
		repo: "https://github.com/bonkval/secure-me-pls"
	},
	"sentiflow-network-lab": {
		mode: "Selected public commits",
		pipeline: [
			"Traffic scenarios",
			"Detection rules",
			"SQLite incidents",
			"Dashboard"
		],
		stages: [
			{
				title: "Event model",
				text: "Defined normalized security events in the event-model module.",
				date: "2026-08-08",
				sha: "a1cd7fd",
				source: "https://github.com/bonkval/SentiFlow-Network-Lab/commit/a1cd7fd61a610366508ac06d939d639e30e7fc8d",
				kind: "Public commit",
				flowStep: 0
			},
			{
				title: "Detection rules",
				text: "Added explainable detection rules to the detector.",
				date: "2026-08-08",
				sha: "a21a028",
				source: "https://github.com/bonkval/SentiFlow-Network-Lab/commit/a21a028ac0276c9b62bdba64b3d6c80eb714bf16",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Traffic Lab",
				text: "Added the interactive Traffic Lab workflow in the web application.",
				date: "2026-08-08",
				sha: "1479664",
				source: "https://github.com/bonkval/SentiFlow-Network-Lab/commit/1479664d14e84fa35345728cf6e0fad8a13be9d3",
				kind: "Public commit",
				flowStep: 0
			},
			{
				title: "Validation",
				text: "Added a validation-metrics script alongside the previously committed detection-scenario tests.",
				date: "2026-08-08",
				sha: "67d94b4",
				source: "https://github.com/bonkval/SentiFlow-Network-Lab/commit/67d94b4b4b48aa9c3d25bb144c1460cf71455fc4",
				kind: "Public commit",
				flowStep: 1
			}
		],
		repo: "https://github.com/bonkval/SentiFlow-Network-Lab"
	},
	starlium: {
		mode: "Selected public commits",
		pipeline: [
			"Account",
			"Store + cart",
			"Checkout",
			"Inventory"
		],
		stages: [
			{
				title: "Initial storefront",
				text: "Uploaded the initial storefront assets and PHP application files, including administration pages.",
				date: "2026-07-02",
				sha: "50c9928",
				source: "https://github.com/bonkval/Starlium/commit/50c9928f3712973fe1fe66f75df2dfcaf0b2b97f",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Store entry",
				text: "Changed the index entry point to redirect to the store page.",
				date: "2026-07-02",
				sha: "bda3571",
				source: "https://github.com/bonkval/Starlium/commit/bda35718f1efe3e274038cfd2c968879eb410133",
				kind: "Public commit",
				flowStep: 1
			},
			{
				title: "Inventory action",
				text: "Added product-deletion functionality to inventory administration.",
				date: "2026-07-09",
				sha: "80880f8",
				source: "https://github.com/bonkval/Starlium/commit/80880f8486f8d1ded4199eabb9375df8d6da9ee2",
				kind: "Public commit",
				flowStep: 3
			},
			{
				title: "Navigation styles",
				text: "Refactored navigation and header styling in the main stylesheet.",
				date: "2026-07-09",
				sha: "be57eb9",
				source: "https://github.com/bonkval/Starlium/commit/be57eb94f445490cee113b6fe1723c0f395756f2",
				kind: "Public commit",
				flowStep: 1
			}
		],
		repo: "https://github.com/bonkval/Starlium"
	},
	trustwho: {
		mode: "Selected public commits",
		pipeline: [
			"URL input",
			"Lexical features",
			"Detection layers",
			"Security report"
		],
		stages: [
			{
				title: "Project foundation",
				text: "Established the package configuration, container definition, license and example environment file.",
				date: "2026-08-08",
				sha: "b3ef54c",
				source: "https://github.com/bonkval/TrustWho/commit/b3ef54c8ea569fdbf0be2631a2e94aa25dfd7b31",
				kind: "Public commit",
				flowStep: null
			},
			{
				title: "Detection engine",
				text: "Added the local-first URL detection engine, feature extraction, training, URL utilities and API modules.",
				date: "2026-08-08",
				sha: "e32c577",
				source: "https://github.com/bonkval/TrustWho/commit/e32c577393cefbfdb3a75cdea2916f823f80b3b0",
				kind: "Public commit",
				flowStep: 2
			},
			{
				title: "Security report",
				text: "Built the web security-report interface using HTML, CSS and JavaScript.",
				date: "2026-08-08",
				sha: "bd56531",
				source: "https://github.com/bonkval/TrustWho/commit/bd5653110bf23f496f84c672d3b57685ffb68e6f",
				kind: "Public commit",
				flowStep: 3
			},
			{
				title: "Detection tests",
				text: "Added API, detector, feature-extraction and threat-feed update tests.",
				date: "2026-08-08",
				sha: "0631336",
				source: "https://github.com/bonkval/TrustWho/commit/0631336ecf8bdd40fbb2dcd67f72c867f591658e",
				kind: "Public commit",
				flowStep: 2
			},
			{
				title: "Local configuration",
				text: "Updated ignored files and the example configuration to keep environment settings local.",
				date: "2026-08-08",
				sha: "fcde255",
				source: "https://github.com/bonkval/TrustWho/commit/fcde2551fba19ff37a580d0bb7688247884f769f",
				kind: "Public commit",
				flowStep: null
			}
		],
		repo: "https://github.com/bonkval/TrustWho"
	}
};
//#endregion
//#region project-timeline.js
function Ba(e) {
	let t = document.querySelector(".compact-case-layout");
	if (!t) return;
	let n = za[location.pathname.split("/").filter(Boolean)[1]];
	if (!n) return;
	let r = n.stages.length, i = document.createElement("details");
	i.className = "project-timeline", i.open = !0;
	let a = [
		[85, 35],
		[235, 35],
		[235, 105],
		[85, 105]
	];
	i.innerHTML = `<summary><span class="timeline-title">Development timeline</span><span class="timeline-mode">${n.mode}</span><span class="timeline-chevron" aria-hidden="true">⌄</span></summary><div class="timeline-body"><div class="timeline-stage-row"><article class="timeline-stage" aria-live="polite" aria-atomic="true"></article><figure class="timeline-diagram"><figcaption>Current project workflow</figcaption><svg viewBox="0 0 320 140" role="img" aria-label="${n.pipeline.join(" to ")}"><path class="timeline-flow-path" d="M145 35h30 M235 60v20 M175 105h-30"/>${n.pipeline.map((e, t) => `<g data-flow-step="${t}"><rect x="${a[t][0] - 60}" y="${a[t][1] - 21}" width="120" height="42" rx="6"/><text x="${a[t][0]}" y="${a[t][1] + 4}" text-anchor="middle">${e}</text></g>`).join("")}</svg></figure></div><label class="timeline-range-label" for="project-time">Drag through the stages <output></output></label><input id="project-time" class="timeline-range" type="range" min="0" max="1000" step="1" value="0" aria-label="Project development stage"><div class="timeline-milestones" role="group" aria-label="Development milestones">${n.stages.map((e, t) => `<button type="button" data-stage="${t}" aria-pressed="${t === 0}"><span aria-hidden="true">${String(t + 1).padStart(2, "0")}</span>${e.title}</button>`).join("")}</div></div>`, t.after(i);
	let o = i.querySelector("input"), s = i.querySelector("article"), c = -1, l;
	function u(t, a = !0) {
		a && (o.value = String(t / (r - 1) * 1e3)), i.style.setProperty("--timeline-progress", `${Number(o.value) / 10}%`);
		let u = n.stages[t];
		if (o.setAttribute("aria-valuetext", `Stage ${t + 1} of ${r}: ${u.title}`), i.querySelector("output").textContent = `${String(t + 1).padStart(2, "0")} / ${String(r).padStart(2, "0")}`, i.querySelectorAll("[data-stage]").forEach((e) => e.setAttribute("aria-pressed", String(Number(e.dataset.stage) === t))), t === c) return;
		c = t;
		let d = u.date ? ` · ${(/* @__PURE__ */ new Date(u.date + "T00:00:00Z")).toLocaleDateString("en", {
			day: "numeric",
			month: "short",
			year: "numeric",
			timeZone: "UTC"
		})}` : "";
		s.innerHTML = `<p class="interaction-label">${u.kind}${d}</p><h3>${u.title}</h3><p>${u.text}</p><a class="timeline-source" href="${u.source}" target="_blank" rel="noopener noreferrer">${u.kind === "Public commit" ? "View commit" : "Source snapshot"} <code>${u.sha}</code> <span aria-hidden="true">↗</span></a>`, i.querySelectorAll("[data-flow-step]").forEach((e) => e.classList.toggle("is-active", u.flowStep !== null && Number(e.dataset.flowStep) === u.flowStep)), l?.cancel();
		let f = i.getBoundingClientRect();
		e() && i.open && !document.hidden && f.top < innerHeight && f.bottom > 0 && (l = s.animate([{ opacity: .45 }, { opacity: 1 }], {
			duration: 220,
			easing: "ease-out"
		}));
	}
	o.addEventListener("input", () => u(Math.round(Number(o.value) / 1e3 * (r - 1)), !1)), o.addEventListener("change", () => u(c)), o.addEventListener("keydown", (e) => {
		let t = {
			ArrowRight: 1,
			ArrowUp: 1,
			ArrowLeft: -1,
			ArrowDown: -1
		};
		e.key in t ? (e.preventDefault(), u(Math.max(0, Math.min(r - 1, c + t[e.key])))) : (e.key === "Home" || e.key === "End") && (e.preventDefault(), u(e.key === "Home" ? 0 : r - 1));
	}), i.querySelectorAll("[data-stage]").forEach((e) => {
		e.addEventListener("click", () => u(Number(e.dataset.stage))), e.addEventListener("keydown", (t) => {
			if (t.key !== "ArrowLeft" && t.key !== "ArrowRight") return;
			t.preventDefault();
			let n = Math.max(0, Math.min(r - 1, Number(e.dataset.stage) + (t.key === "ArrowRight" ? 1 : -1)));
			u(n), i.querySelector(`[data-stage="${n}"]`).focus({ preventScroll: !0 });
		});
	}), i.addEventListener("toggle", () => {
		i.open || l?.cancel();
	}), u(0);
}
//#endregion
//#region enhancements.js
var Va = document.documentElement, Ha = matchMedia("(prefers-reduced-motion: reduce)"), $ = () => Va.dataset.motion !== "paused";
$() && Va.classList.add("js-motion");
var Ua = document.querySelector(".theme-toggle");
if (Ua) {
	let e = document.createElement("div");
	e.className = "header-actions", Ua.before(e), e.append(Ua);
}
Ha.addEventListener("change", () => {
	Va.dataset.motion = Ha.matches ? "paused" : "full", Va.classList.toggle("js-motion", !Ha.matches), document.dispatchEvent(new Event("portfolio:motion"));
}), ka($), Aa($), ja($), Pa($), Fa($), Ra($), Ba($), document.querySelectorAll("[data-project-rail]").forEach((e, t) => {
	let n = [...e.querySelectorAll(":scope > a")];
	if (n.length < 2) return;
	e.id ||= `project-rail-${t + 1}`, e.tabIndex = 0, e.setAttribute("role", "region"), e.setAttribute("aria-roledescription", "carousel");
	let r = document.createElement("div");
	r.className = "project-rail-controls", r.hidden = !0, r.innerHTML = `<span class="project-rail-hint">Drag or swipe to explore</span><button type="button" class="project-rail-button" aria-label="Previous project" aria-controls="${e.id}">←</button><span class="project-rail-status" aria-live="polite" aria-atomic="true"></span><button type="button" class="project-rail-button" aria-label="Next project" aria-controls="${e.id}">→</button>`;
	let i = document.createElement("div");
	i.className = "gallery-scrubber", i.innerHTML = `<span aria-hidden="true">01</span><input type="range" min="0" max="1000" step="1" value="0" aria-label="Browse projects" aria-controls="${e.id}"><span aria-hidden="true">${String(n.length).padStart(2, "0")}</span>`;
	let a = i.querySelector("input");
	e.before(r), e.after(i);
	let [o, s] = r.querySelectorAll("button");
	o.hidden = !0, s.hidden = !0, r.querySelector(".project-rail-hint").textContent = `${n.length} projects · Scroll, drag, or swipe`;
	let c = document.createElement("span");
	c.id = `${e.id}-help`, c.className = "sr-only", c.textContent = "Use the left and right arrow keys to browse projects. Home and End jump to the first and last project.", r.append(c), e.setAttribute("aria-describedby", c.id);
	let l = r.querySelector(".project-rail-status"), u = 0, d, f = 0, p, m = !1, h = () => Math.max(0, e.scrollWidth - e.clientWidth), g = [], _ = () => {
		let t = h();
		g = n.map((n) => Math.min(t, n.offsetLeft - e.offsetLeft));
	};
	_();
	let v = (e) => g[e] || 0, y = () => {
		let t = e.scrollLeft;
		u = n.reduce((e, n, r) => Math.abs(v(r) - t) < Math.abs(v(e) - t) ? r : e, 0), t >= h() - 3 && (u = n.length - 1);
		let r = `${String(u + 1).padStart(2, "0")} / ${String(n.length).padStart(2, "0")}`;
		l.textContent !== r && (l.textContent = r), o.disabled = t <= 3, s.disabled = t >= h() - 3, i.style.setProperty("--rail-progress", String((t + e.clientWidth) / e.scrollWidth)), a.value = String(Math.round(h() ? t / h() * 1e3 : 0)), a.setAttribute("aria-valuetext", `Project ${u + 1} of ${n.length}`), i.style.setProperty("--scrub-progress", `${a.value / 10}%`);
	}, b = () => {
		d?.stop(), d = void 0;
	};
	a.addEventListener("input", () => {
		b(), e.classList.remove("is-dragging"), e.scrollLeft = h() * Number(a.value) / 1e3, C = e.scrollLeft;
	});
	let x = (t, r = 0) => {
		b();
		let i = v(Math.max(0, Math.min(n.length - 1, t)));
		if (!$()) {
			e.scrollLeft = i, e.classList.remove("is-dragging"), y();
			return;
		}
		e.classList.add("is-dragging"), d = q(e.scrollLeft, i, {
			type: "spring",
			stiffness: 155,
			damping: 26,
			velocity: r,
			onUpdate: (t) => {
				e.scrollLeft = t;
			},
			onComplete: () => {
				e.classList.remove("is-dragging"), y();
			}
		});
	}, S = (t) => {
		let r = e.scrollLeft, i = n.map((e, t) => t);
		t < 0 && i.reverse();
		let a = i.find((e) => t > 0 ? v(e) > r + 4 : v(e) < r - 4);
		a !== void 0 && x(a);
	};
	o.addEventListener("click", () => S(-1)), s.addEventListener("click", () => S(1)), e.addEventListener("keydown", (e) => {
		[
			"ArrowLeft",
			"ArrowRight",
			"Home",
			"End"
		].includes(e.key) && (e.preventDefault(), e.key === "Home" ? x(0) : e.key === "End" ? x(n.length - 1) : S(e.key === "ArrowRight" ? 1 : -1));
	});
	let C = e.scrollLeft;
	e.addEventListener("wheel", (t) => {
		if (t.ctrlKey) return;
		let n = Math.abs(t.deltaX) > Math.abs(t.deltaY) ? t.deltaX : t.deltaY;
		if (!(n < 0 && e.scrollLeft <= 1 || n > 0 && e.scrollLeft >= h() - 1)) {
			if (t.preventDefault(), d || (C = e.scrollLeft), b(), !$()) {
				e.scrollLeft = Math.max(0, Math.min(h(), e.scrollLeft + n));
				return;
			}
			e.classList.add("is-dragging"), C = Math.max(0, Math.min(h(), C + n * (t.deltaMode === 1 ? 30 : 1))), d = q(e.scrollLeft, C, {
				type: "spring",
				stiffness: 110,
				damping: 28,
				onUpdate: (t) => {
					e.scrollLeft = t;
				},
				onComplete: () => {
					d = void 0, e.classList.remove("is-dragging");
				}
			});
		}
	}, { passive: !1 }), e.addEventListener("dragstart", (e) => e.preventDefault()), e.addEventListener("pointerdown", (t) => {
		b(), C = e.scrollLeft, e.classList.remove("is-dragging"), t.pointerType === "mouse" && t.button === 0 && (m = !1, p = {
			startX: t.clientX,
			startY: t.clientY,
			startScroll: e.scrollLeft,
			lastX: t.clientX,
			lastTime: performance.now(),
			velocity: 0,
			moved: !1
		});
	}), e.addEventListener("pointermove", (t) => {
		if (!p) return;
		let n = t.clientX - p.startX;
		if (!p.moved && Math.abs(n) < 7) return;
		if (!p.moved && Math.abs(t.clientY - p.startY) > Math.abs(n)) {
			p = void 0;
			return;
		}
		p.moved || (p.moved = !0, e.setPointerCapture(t.pointerId), e.classList.add("is-dragging"));
		let r = performance.now();
		p.velocity = (p.lastX - t.clientX) / Math.max(1, r - p.lastTime) * 1e3, p.lastX = t.clientX, p.lastTime = r, e.scrollLeft = p.startScroll - n;
	});
	let w = (t) => {
		if (!p) return;
		let r = p;
		if (p = void 0, !r.moved) return;
		e.hasPointerCapture(t.pointerId) && e.releasePointerCapture(t.pointerId), m = !0;
		let i = performance.now() - r.lastTime < 100 ? Math.max(-2500, Math.min(2500, r.velocity)) : 0, a = Math.max(0, Math.min(h(), e.scrollLeft + i * .18));
		n.reduce((e, t, n) => Math.abs(v(n) - a) < Math.abs(v(e) - a) ? n : e, 0), b(), $() ? d = q(e.scrollLeft, a, {
			type: "spring",
			stiffness: 80,
			damping: 22,
			velocity: i,
			onUpdate: (t) => {
				e.scrollLeft = t;
			},
			onComplete: () => {
				d = void 0, e.classList.remove("is-dragging");
			}
		}) : (e.scrollLeft = a, e.classList.remove("is-dragging")), C = a;
	};
	e.addEventListener("pointerup", w), e.addEventListener("pointercancel", (e) => {
		w(e), m = !1;
	}), e.addEventListener("lostpointercapture", () => {
		p = void 0;
	}), e.addEventListener("click", (e) => {
		m &&= (e.preventDefault(), e.stopImmediatePropagation(), !1);
	}, !0), e.addEventListener("scroll", () => {
		f ||= requestAnimationFrame(() => {
			f = 0, y();
		});
	}, { passive: !0 }), document.addEventListener("portfolio:motion", () => {
		$() || (b(), e.classList.remove("is-dragging"));
	}), new ResizeObserver(() => {
		_(), y();
	}).observe(e), y();
});
var Wa = [...document.querySelectorAll(".site-nav a[href^=\"#\"]")], Ga = Wa.map((e) => document.querySelector(e.hash)).filter(Boolean), Ka = new IntersectionObserver((e) => {
	e.forEach((e) => {
		e.isIntersecting && Wa.forEach((t) => {
			t.hash === `#${e.target.id}` ? t.setAttribute("aria-current", "location") : t.removeAttribute("aria-current");
		});
	});
}, {
	rootMargin: "-15% 0px -60% 0px",
	threshold: 0
});
Ga.forEach((e) => Ka.observe(e)), document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape") return;
	let t = document.querySelector(".menu-button");
	t?.getAttribute("aria-expanded") === "true" && (t.click(), t.focus());
}), $() && J(".project-card", (e) => {
	let t = e.querySelector(".project-image img");
	t && $() && q(t, {
		opacity: [0, 1],
		scale: [1.06, 1]
	}, {
		duration: 1.1,
		ease: [
			.16,
			1,
			.3,
			1
		]
	});
}, { amount: .2 });
//#endregion
