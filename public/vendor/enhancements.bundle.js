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
var x = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, S = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), C = /*@__PURE__*/ b(.33, 1.53, .69, .99), w = /*@__PURE__*/ S(C), T = /*@__PURE__*/ x(w), E = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * w(e) : .5 * (2 - 2 ** (-10 * (e - 1))), D = (e) => 1 - Math.sin(Math.acos(e)), ee = /* @__PURE__ */ S(D), O = /* @__PURE__ */ x(D), k = /*@__PURE__*/ b(.42, 0, 1, 1), A = /*@__PURE__*/ b(0, 0, .58, 1), te = /*@__PURE__*/ b(.42, 0, .58, 1), j = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function M(e, t) {
	return /* @__PURE__ */ j(e) ? e[h(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var ne = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", N = {
	linear: c,
	easeIn: k,
	easeInOut: te,
	easeOut: A,
	circIn: D,
	circInOut: O,
	circOut: ee,
	backIn: w,
	backInOut: T,
	backOut: C,
	anticipate: E
}, P = (e) => typeof e == "string", re = (e) => {
	if (/* @__PURE__ */ ne(e)) {
		e.length;
		let [t, n, r, i] = e;
		return /* @__PURE__ */ b(t, n, r, i);
	}
	return P(e) ? (N[e], `${e}`, N[e]) : e;
}, F = [
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
function ie(e) {
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
var ae = 40;
function oe(e, t) {
	let n = !1, i = !0, a = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, o = () => n = !0, s = F.reduce((e, t) => (e[t] = ie(o), e), {}), { setup: c, read: l, resolveKeyframes: u, preUpdate: d, update: f, preRender: p, render: m, postRender: h } = s, g = () => {
		let o = r.useManualTiming, s = o ? a.timestamp : performance.now();
		n = !1, o || (a.delta = i ? 1e3 / 60 : Math.max(Math.min(s - a.timestamp, ae), 1)), a.timestamp = s, a.isProcessing = !0, c.process(a), l.process(a), u.process(a), d.process(a), f.process(a), p.process(a), m.process(a), h.process(a), a.isProcessing = !1, n && t && (i = !1, e(g));
	}, _ = () => {
		n = !0, i = !0, a.isProcessing || e(g);
	};
	return {
		schedule: F.reduce((e, t) => {
			let r = s[t];
			return e[t] = (e, t = !1, i = !1) => (n || _(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < F.length; t++) s[F[t]].cancel(e);
		},
		state: a,
		steps: s
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: I, cancel: se, state: L, steps: ce } = /* @__PURE__ */ oe(typeof requestAnimationFrame < "u" ? requestAnimationFrame : c, !0), R;
function z() {
	R = void 0;
}
var B = {
	now: () => (R === void 0 && B.set(L.isProcessing || r.useManualTiming ? L.timestamp : performance.now()), R),
	set: (e) => {
		R = e, queueMicrotask(z);
	}
}, le = (e) => (t) => typeof t == "string" && t.startsWith(e), ue = /*@__PURE__*/ le("--"), de = /*@__PURE__*/ le("var(--"), fe = (e) => de(e) ? pe.test(e.split("/*")[0].trim()) : !1, pe = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function me(e) {
	return typeof e == "string" && e.split("/*")[0].includes("var(--");
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var he = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, ge = {
	...he,
	transform: (e) => n(0, 1, e)
}, _e = {
	...he,
	default: 1
}, ve = (e) => Math.round(e * 1e5) / 1e5, ye = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function be(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var xe = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, Se = (e, t) => (n) => !!(typeof n == "string" && xe.test(n) && n.startsWith(e) || t && !be(n) && Object.prototype.hasOwnProperty.call(n, t)), Ce = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(ye);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, we = (e) => n(0, 255, e), Te = {
	...he,
	transform: (e) => Math.round(we(e))
}, V = {
	test: /*@__PURE__*/ Se("rgb", "red"),
	parse: /*@__PURE__*/ Ce("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + Te.transform(e) + ", " + Te.transform(t) + ", " + Te.transform(n) + ", " + ve(ge.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function Ee(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var De = {
	test: /*@__PURE__*/ Se("#"),
	parse: Ee,
	transform: V.transform
}, Oe = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), H = /*@__PURE__*/ Oe("deg"), ke = /*@__PURE__*/ Oe("%"), U = /*@__PURE__*/ Oe("px"), Ae = /*@__PURE__*/ Oe("vh"), je = /*@__PURE__*/ Oe("vw"), Me = {
	...ke,
	parse: (e) => ke.parse(e) / 100,
	transform: (e) => ke.transform(e * 100)
}, Ne = {
	test: /*@__PURE__*/ Se("hsl", "hue"),
	parse: /*@__PURE__*/ Ce("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + ke.transform(ve(t)) + ", " + ke.transform(ve(n)) + ", " + ve(ge.transform(r)) + ")"
}, W = {
	test: (e) => V.test(e) || De.test(e) || Ne.test(e),
	parse: (e) => V.test(e) ? V.parse(e) : Ne.test(e) ? Ne.parse(e) : De.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? V.transform(e) : Ne.transform(e),
	getAnimatableNone: (e) => {
		let t = W.parse(e);
		return t.alpha = 0, W.transform(t);
	}
}, Pe = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function Fe(e) {
	return isNaN(e) && typeof e == "string" && (e.match(ye)?.length || 0) + (e.match(Pe)?.length || 0) > 0;
}
var Ie = "number", Le = "color", Re = "var", ze = "var(", Be = "${}", Ve = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function He(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(Ve, (e) => (W.test(e) ? (r.color.push(a), i.push(Le), n.push(W.parse(e))) : e.startsWith(ze) ? (r.var.push(a), i.push(Re), n.push(e)) : (r.number.push(a), i.push(Ie), n.push(parseFloat(e))), ++a, Be)).split(Be),
		indexes: r,
		types: i
	};
}
function Ue(e) {
	return He(e).values;
}
function We({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			i += e === Ie ? ve(r[a]) : e === Le ? W.transform(r[a]) : r[a];
		}
		return i;
	};
}
function Ge(e) {
	return We(He(e));
}
var Ke = (e) => typeof e == "number" ? 0 : W.test(e) ? W.getAnimatableNone(e) : e, qe = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : Ke(e);
function Je(e) {
	let t = He(e);
	return We(t)(t.values.map((e, n) => qe(e, t.split[n])));
}
var G = {
	test: Fe,
	parse: Ue,
	createTransformer: Ge,
	getAnimatableNone: Je
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function Ye(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function Xe({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = Ye(s, r, e + 1 / 3), a = Ye(s, r, e), o = Ye(s, r, e - 1 / 3);
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
function Ze(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var Qe = (e, t, n) => e + (t - e) * n, $e = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, et = [
	De,
	V,
	Ne
], tt = (e) => et.find((t) => t.test(e));
function nt(e) {
	let t = tt(e);
	if (`${e}`, !t) return !1;
	let n = t.parse(e);
	return t === Ne && (n = Xe(n)), n;
}
var rt = (e, t) => {
	let n = nt(e), r = nt(t);
	if (!n || !r) return Ze(e, t);
	let i = { ...n };
	return (e) => (i.red = $e(n.red, r.red, e), i.green = $e(n.green, r.green, e), i.blue = $e(n.blue, r.blue, e), i.alpha = Qe(n.alpha, r.alpha, e), V.transform(i));
}, it = /* @__PURE__ */ new Set(["none", "hidden"]);
function at(e, t) {
	return it.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function ot(e, t) {
	return (n) => Qe(e, t, n);
}
function st(e) {
	return typeof e == "number" ? ot : typeof e == "string" ? fe(e) ? Ze : W.test(e) ? rt : dt : Array.isArray(e) ? ct : typeof e == "object" ? W.test(e) ? rt : lt : Ze;
}
function ct(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => st(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function lt(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = st(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function ut(e, t) {
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
var dt = (e, t) => {
	let n = G.createTransformer(t), r = He(e), i = He(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? it.has(e) && !i.values.length || it.has(t) && !r.values.length ? at(e, t) : l(ct(ut(r, i), i.values), n) : (`${e}${t}`, Ze(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function ft(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? Qe(e, t, n) : st(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var pt = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => I.update(t, e),
		stop: () => se(t),
		now: () => L.isProcessing ? L.timestamp : B.now()
	};
}, mt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, ht = 2e4;
function gt(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function _t(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(gt(r), ht);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ p(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var K = {
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
function vt(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var yt = 12;
function bt(e, t, n) {
	let r = n;
	for (let n = 1; n < yt; n++) r -= e(r) / t(r);
	return r;
}
var xt = .001;
function St({ duration: e = K.duration, bounce: t = K.bounce, velocity: r = K.velocity, mass: i = K.mass }) {
	let a, o;
	K.maxDuration;
	let s = 1 - t;
	s = n(K.minDamping, K.maxDamping, s), e = n(K.minDuration, K.maxDuration, /* @__PURE__ */ p(e)), s < 1 ? (a = (t) => {
		let n = t * s, i = n * e, a = n - r, o = vt(t, s), c = Math.exp(-i);
		return xt - a / o * c;
	}, o = (t) => {
		let n = t * s * e, i = n * r + r, o = s ** 2 * t ** 2 * e, c = Math.exp(-n), l = vt(t ** 2, s);
		return (-a(t) + xt > 0 ? -1 : 1) * ((i - o) * c) / l;
	}) : (a = (t) => -.001 + Math.exp(-t * e) * ((t - r) * e + 1), o = (t) => Math.exp(-t * e) * ((r - t) * (e * e)));
	let c = 5 / e, l = bt(a, o, c);
	if (e = /* @__PURE__ */ f(e), isNaN(l)) return {
		stiffness: K.stiffness,
		damping: K.damping,
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
var Ct = ["duration", "bounce"], wt = [
	"stiffness",
	"damping",
	"mass"
];
function Tt(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function Et(e) {
	let t = {
		velocity: K.velocity,
		stiffness: K.stiffness,
		damping: K.damping,
		mass: K.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Tt(e, wt) && Tt(e, Ct)) {
		if (t.velocity = 0, e.visualDuration) {
			let r = e.visualDuration, i = 2 * Math.PI / (r * 1.2), a = i * i, o = 2 * n(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(a);
			t = {
				...t,
				mass: K.mass,
				stiffness: a,
				damping: o
			};
		} else {
			let n = St({
				...e,
				velocity: 0
			});
			t = {
				...t,
				...n,
				mass: K.mass
			}, t.isResolvedFromDuration = !0;
		}
	}
	return t;
}
function Dt(e = K.visualDuration, t = K.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: m, isResolvedFromDuration: h } = Et({
		...n,
		velocity: -/* @__PURE__ */ p(n.velocity || 0)
	}), g = m || 0, _ = l / (2 * Math.sqrt(c * u)), v = o - a, y = /* @__PURE__ */ p(Math.sqrt(c / u)), b = Math.abs(v) < 5;
	r ||= b ? K.restSpeed.granular : K.restSpeed.default, i ||= b ? K.restDelta.granular : K.restDelta.default;
	let x, S, C, w, T, E;
	if (_ < 1) C = vt(y, _), w = (g + _ * y * v) / C, x = (e) => {
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
			let e = Math.min(gt(D), ht), t = mt((t) => D.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return D;
}
Dt.applyToOptions = (e) => {
	let t = _t(e, 100, Dt);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ f(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var Ot = 5;
function kt(e, t, n) {
	let r = Math.max(t - Ot, 0);
	return /* @__PURE__ */ m(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function At({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = Dt({
			keyframes: [f.value, m(f.value)],
			velocity: kt(y, e, f.value),
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
function jt(e, t, n) {
	let i = [], a = n || r.mix || ft, o = e.length - 1;
	for (let n = 0; n < o; n++) {
		let r = a(e[n], e[n + 1]);
		t && (r = l(Array.isArray(t) ? t[n] || c : t, r)), i.push(r);
	}
	return i;
}
function Mt(e, t, { clamp: r = !0, ease: i, mixer: a } = {}) {
	let o = e.length;
	if (t.length, o === 1) return () => t[0];
	if (o === 2 && t[0] === t[1]) return () => t[1];
	let s = e[0] === e[1];
	e[0] > e[o - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let c = jt(t, i, a), l = c.length, d = (n) => {
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
function Nt(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ u(0, t, r);
		e.push(Qe(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function Pt(e) {
	let t = [0];
	return Nt(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function Ft(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function It(e, t) {
	return e.map(() => t || te).splice(0, e.length - 1);
}
function Lt({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ j(r) ? r.map(re) : re(r), a = {
		done: !1,
		value: t[0]
	}, o = Mt(Ft(n && n.length === t.length ? n : Pt(t), e), t, { ease: Array.isArray(i) ? i : It(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var Rt = (e) => e !== null;
function zt(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(Rt), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var Bt = {
	decay: At,
	inertia: At,
	tween: Lt,
	keyframes: Lt,
	spring: Dt
};
function Vt(e) {
	typeof e.type == "string" && (e.type = Bt[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Ht = class {
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
}, Ut = (e) => e / 100, Wt = class extends Ht {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== B.now() && this.tick(B.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		Vt(e);
		let { type: t = Lt, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || Lt;
		s !== Lt && typeof o[0] != "number" && (this.mixKeyframes = l(Ut, ft(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = gt(c));
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
		return C && m !== At && (x.value = zt(u, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
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
		return kt((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(B.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ p(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = pt, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(B.now()), this.holdTime = this.currentTime;
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
function Gt(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var q = (e) => e * 180 / Math.PI, Kt = (e) => Jt(q(Math.atan2(e[1], e[0]))), qt = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: Kt,
	rotateZ: Kt,
	skewX: (e) => q(Math.atan(e[1])),
	skewY: (e) => q(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, Jt = (e) => (e %= 360, e < 0 && (e += 360), e), Yt = Kt, Xt = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Zt = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), Qt = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: Xt,
	scaleY: Zt,
	scale: (e) => (Xt(e) + Zt(e)) / 2,
	rotateX: (e) => Jt(q(Math.atan2(e[6], e[5]))),
	rotateY: (e) => Jt(q(Math.atan2(-e[2], e[0]))),
	rotateZ: Yt,
	rotate: Yt,
	skewX: (e) => q(Math.atan(e[4])),
	skewY: (e) => q(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function $t(e) {
	return +!!e.includes("scale");
}
function en(e, t) {
	if (!e || e === "none") return $t(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = Qt, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = qt, i = t;
	}
	if (!i) return $t(t);
	let a = r[t], o = i[1].split(",").map(nn);
	return typeof a == "function" ? a(o) : o[a];
}
var tn = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return en(n, t);
};
function nn(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var rn = [
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
], an = /* @__PURE__ */ new Set([...rn, "pathRotation"]), on = (e) => e === he || e === U, sn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), cn = rn.filter((e) => !sn.has(e));
function ln(e) {
	let t = [];
	return cn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var J = {
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
	x: (e, { transform: t }) => en(t, "x"),
	y: (e, { transform: t }) => en(t, "y")
};
J.translateX = J.x, J.translateY = J.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var Y = /* @__PURE__ */ new Set(), un = !1, dn = !1, fn = !1;
function pn() {
	if (dn) {
		let e = Array.from(Y).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = ln(e);
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
	dn = !1, un = !1, Y.forEach((e) => e.complete(fn)), Y.clear();
}
function mn() {
	Y.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (dn = !0);
	});
}
function hn() {
	fn = !0, mn(), pn(), fn = !1;
}
var gn = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (Y.add(this), un || (un = !0, I.read(mn), I.resolveKeyframes(pn))) : (this.readKeyframes(), this.complete());
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
		Gt(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), Y.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (Y.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, _n = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function vn(e, t, n) {
	_n(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var yn = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function bn(e, t) {
	let n = /* @__PURE__ */ s(e);
	return () => yn[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var xn = /* @__PURE__ */ bn(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Sn = /*@__PURE__*/ bn(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Cn = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, wn = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Cn([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Cn([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Cn([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Cn([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function Tn(e, t) {
	if (e) return typeof e == "function" ? Sn() ? mt(e, t) : "ease-out" : /* @__PURE__ */ ne(e) ? Cn(e) : Array.isArray(e) ? e.map((e) => Tn(e, t) || wn.easeOut) : wn[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function En(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = Tn(s, i);
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
function Dn(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function On({ type: e, ...t }) {
	return Dn(e) && Sn() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var kn = class extends Ht {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = On(e);
		this.animation = En(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = zt(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), vn(t, n, e), this.animation.cancel();
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
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && xn() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), c) : r(this);
	}
}, An = {
	anticipate: E,
	backInOut: T,
	circInOut: O
};
function jn(e) {
	return e in An;
}
function Mn(e) {
	typeof e.ease == "string" && jn(e.ease) && (e.ease = An[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var Nn = 10, Pn = class extends kn {
	constructor(e) {
		Mn(e), Vt(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: r, onComplete: i, element: a, ...o } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let s = new Wt({
			...o,
			autoplay: !1
		}), c = Math.max(Nn, B.now() - this.startTime), l = n(0, Nn, c - Nn), u = s.sample(c).value, { name: d } = this.options;
		a && d && vn(a, d, u), t.setWithVelocity(s.sample(Math.max(0, c - l)).value, u, l), s.stop();
	}
}, Fn = (e, t) => t !== "zIndex" && !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (G.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function In(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function Ln(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = Fn(i, t), s = Fn(a, t);
	return `${t}${i}${a}${o ? a : i}`, !o || !s ? !1 : In(e) || (n === "spring" || Dn(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function Rn(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var zn = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform",
	"backgroundColor"
]), Bn = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function Vn(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && Bn.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var Hn = /* @__PURE__ */ new Set([
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
]), Un = /*@__PURE__*/ s(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function Wn(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e, c = t?.owner?.current;
	if (!(c instanceof HTMLElement) && !(c instanceof SVGElement)) return !1;
	let { onUpdate: l, transformTemplate: u } = t.owner.getProps();
	return Un() && n && (zn.has(n) || Hn.has(n) && Vn(s)) && (n !== "transform" || !u) && !l && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var Gn = 40, Kn = class extends Ht {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = B.now();
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
		}, f = l?.KeyframeResolver || gn;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, i) {
		this.keyframeResolver = void 0;
		let { name: a, type: o, velocity: s, delay: l, isHandoff: u, onUpdate: d } = n;
		this.resolvedAt = B.now();
		let f = !0;
		Ln(e, a, o, s) || (f = !1, (r.instantAnimations || !l) && d?.(zt(e, n, t)), e[0] = e[e.length - 1], Rn(n), n.repeat = 0);
		let p = {
			startTime: i ? this.resolvedAt && this.resolvedAt - this.createdAt > Gn ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, m = f && !u && Wn(p), h = p.motionValue?.owner?.current, g;
		if (m) try {
			g = new Pn({
				...p,
				element: h
			});
		} catch {
			g = new Wt(p);
		}
		else g = new Wt(p);
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
		return this._animation || (this.keyframeResolver?.resume(), hn()), this._animation;
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
}, qn = class {
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
		return Jn(this.animations, "duration");
	}
	get iterationDuration() {
		return Jn(this.animations, "iterationDuration");
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
function Jn(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var Yn = class extends qn {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, Xn = 30, Zn = (e) => !isNaN(parseFloat(e)), Qn = { current: void 0 }, $n = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = B.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = B.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = Zn(this.current));
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
			n(), I.read(() => {
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
		return Qn.current && Qn.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = B.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Xn) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, Xn);
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
function er(e, t) {
	return new $n(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function tr(e, t) {
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
function nr(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : tr(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/default-transitions.mjs
var rr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, ir = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), ar = {
	type: "keyframes",
	duration: .8
}, or = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, sr = (e, { keyframes: t }) => t.length > 2 ? ar : an.has(e) ? e.startsWith("scale") ? ir(t[1]) : rr : or, cr = /* @__PURE__ */ new Set([
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
function lr(e) {
	for (let t in e) if (!cr.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var ur = (e, t, n, i = {}, a, o) => (s) => {
	let c = nr(i, e) || {}, l = c.delay || i.delay || 0, { elapsed: u = 0 } = i;
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
	lr(c) || Object.assign(d, sr(e, d)), d.duration &&= /* @__PURE__ */ f(d.duration), d.repeatDelay &&= /* @__PURE__ */ f(d.repeatDelay), d.from !== void 0 && (d.keyframes[0] = d.from);
	let p = !1;
	if ((d.type === !1 || d.duration === 0 && !d.repeatDelay) && (Rn(d), d.delay === 0 && (p = !0)), (r.instantAnimations || r.skipAnimations || a?.shouldSkipAnimations || c.skipAnimations) && (p = !0, Rn(d), d.delay = 0), d.allowFlatten = !c.type && !c.ease, p && !o && t.get() !== void 0) {
		let e = zt(d.keyframes, c);
		if (e !== void 0) {
			I.update(() => {
				d.onUpdate(e), d.onComplete();
			});
			return;
		}
	}
	return c.isSync ? new Wt(d) : new Kn(d);
}, dr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function fr(e) {
	let t = dr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function pr(e, t, n = 1) {
	`${e}`;
	let [r, a] = fr(e);
	if (!r) return;
	let o = window.getComputedStyle(t).getPropertyValue(r);
	if (o) {
		let e = o.trim();
		return i(e) ? parseFloat(e) : e;
	}
	return fe(a) ? pr(a, t, n + 1) : a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function mr(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function hr(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = mr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = mr(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function gr(e, t, n) {
	let r = e.getProps();
	return hr(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-position.mjs
var _r = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...rn
]), vr = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function yr(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, er(n));
}
function br(e) {
	return vr(e) ? e[e.length - 1] || 0 : e;
}
function xr(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = gr(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) yr(e, t, br(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var X = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function Sr(e) {
	return !!(X(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Cr(e, t) {
	let n = e.getValue("willChange");
	if (Sr(n)) return n.add(t);
	if (!n && r.WillChange) {
		let n = new r.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function wr(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var Tr = "data-" + wr("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Er(e) {
	return e.props[Tr];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function Dr({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function Or(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
	let { transition: a, transitionEnd: o, ...s } = t, c = e.getDefaultTransition();
	a = a ? tr(a, c) : c;
	let l = a?.reduceMotion, u = a?.skipAnimations;
	r && (a = r);
	let d = [], f = i && e.animationState && e.animationState.getState()[i], p = a?.path;
	p && p.animateVisualElement(e, s, a, n, d);
	for (let t in s) {
		let r = e.getValue(t, e.latestValues[t] ?? null), i = s[t];
		if (i === void 0 || f && Dr(f, t)) continue;
		let o = {
			delay: n,
			...nr(a || {}, t)
		};
		u && (o.skipAnimations = !0);
		let c = r.get();
		if (c !== void 0 && !r.isAnimating() && !Array.isArray(i) && i === c && !o.velocity) {
			I.update(() => r.set(i));
			continue;
		}
		let p = !1;
		if (window.MotionHandoffAnimation) {
			let n = Er(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, I);
				e !== null && (o.startTime = e, p = !0);
			}
		}
		Cr(e, t);
		let m = l ?? e.shouldReduceMotion;
		r.start(ur(t, r, i, m && _r.has(t) ? { type: !1 } : o, e, p));
		let h = r.animation;
		h && d.push(h);
	}
	if (o) {
		let t = () => I.update(() => {
			o && xr(e, o);
		});
		d.length ? Promise.all(d).then(t) : t();
	}
	return d;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var kr = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Ar = (e) => (t) => t.test(e), jr = [
	he,
	U,
	ke,
	H,
	je,
	Ae,
	kr
], Mr = (e) => jr.find(Ar(e));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Nr(e) {
	return typeof e == "number" ? e === 0 : e === null || e === "none" || e === "0" || o(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var Pr = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function Fr(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(ye) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!Pr.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Ir = /\b([a-z-]*)\(.*?\)/gu, Lr = {
	...G,
	getAnimatableNone: (e) => {
		let t = e.match(Ir);
		return t ? t.map(Fr).join(" ") : e;
	}
}, Rr = {
	...G,
	getAnimatableNone: (e) => {
		let t = G.parse(e);
		return G.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, zr = {
	...he,
	transform: Math.round
}, Br = {
	borderWidth: U,
	borderTopWidth: U,
	borderRightWidth: U,
	borderBottomWidth: U,
	borderLeftWidth: U,
	borderRadius: U,
	borderTopLeftRadius: U,
	borderTopRightRadius: U,
	borderBottomRightRadius: U,
	borderBottomLeftRadius: U,
	width: U,
	maxWidth: U,
	height: U,
	maxHeight: U,
	top: U,
	right: U,
	bottom: U,
	left: U,
	inset: U,
	insetBlock: U,
	insetBlockStart: U,
	insetBlockEnd: U,
	insetInline: U,
	insetInlineStart: U,
	insetInlineEnd: U,
	padding: U,
	paddingTop: U,
	paddingRight: U,
	paddingBottom: U,
	paddingLeft: U,
	paddingBlock: U,
	paddingBlockStart: U,
	paddingBlockEnd: U,
	paddingInline: U,
	paddingInlineStart: U,
	paddingInlineEnd: U,
	margin: U,
	marginTop: U,
	marginRight: U,
	marginBottom: U,
	marginLeft: U,
	marginBlock: U,
	marginBlockStart: U,
	marginBlockEnd: U,
	marginInline: U,
	marginInlineStart: U,
	marginInlineEnd: U,
	fontSize: U,
	backgroundPositionX: U,
	backgroundPositionY: U,
	rotate: H,
	pathRotation: H,
	rotateX: H,
	rotateY: H,
	rotateZ: H,
	scale: _e,
	scaleX: _e,
	scaleY: _e,
	scaleZ: _e,
	skew: H,
	skewX: H,
	skewY: H,
	distance: U,
	translateX: U,
	translateY: U,
	translateZ: U,
	x: U,
	y: U,
	z: U,
	perspective: U,
	transformPerspective: U,
	opacity: ge,
	originX: Me,
	originY: Me,
	originZ: U,
	zIndex: zr,
	fillOpacity: ge,
	strokeOpacity: ge,
	numOctaves: zr
}, Vr = {
	...Br,
	color: W,
	backgroundColor: W,
	outlineColor: W,
	fill: W,
	stroke: W,
	borderColor: W,
	borderTopColor: W,
	borderRightColor: W,
	borderBottomColor: W,
	borderLeftColor: W,
	filter: Lr,
	WebkitFilter: Lr,
	mask: Rr,
	WebkitMask: Rr
}, Hr = (e) => Vr[e], Ur = /*@__PURE__*/ new Set([Lr, Rr]);
function Wr(e, t) {
	let n = Hr(e);
	return Ur.has(n) || (n = G), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var Gr = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Kr(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !Gr.has(t) && He(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = Wr(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var qr = class extends gn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), fe(r))) {
				let i = pr(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !_r.has(n) || e.length !== 2) return;
		let [r, i] = e, a = Mr(r), o = Mr(i);
		if (me(r) !== me(i) && J[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) {
			if (on(a) && on(o)) for (let t = 0; t < e.length; t++) {
				let n = e[t];
				typeof n == "string" && (e[t] = parseFloat(n));
			}
			else J[n] && (this.needsMeasurement = !0);
		}
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Nr(e[t])) && n.push(t);
		n.length && Kr(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = J[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = J[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, Jr = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Yr(e, t, n) {
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
var Xr = (e, t) => t && typeof e == "number" ? t.transform(e) : e, { schedule: Zr, cancel: Qr } = /* @__PURE__ */ oe(queueMicrotask, !1);
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function $r(e) {
	return a(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function ei(e) {
	return $r(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/follow-value.mjs
function ti(e, t) {
	let n = er(X(e) ? e.get() : e);
	return ni(n, e, t), n;
}
function ni(e, t, n = {}) {
	let r = e.get(), i = null, a = r, o, s = typeof r == "string" ? r.replace(/[\d.-]/g, "") : void 0, c = () => {
		i &&= (i.stop(), null), e.animation = void 0;
	}, l = () => {
		let t = ii(e.get()), r = ii(a);
		if (t === r) {
			c();
			return;
		}
		let s = i ? i.getGeneratorVelocity() : e.getVelocity();
		c(), i = new Wt({
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
		a = e, o = (e) => t(ri(e, s)), I.postRender(u);
	}, c), X(t)) {
		let r = n.skipInitialAnimation === !0, i = t.on("change", (t) => {
			r ? (r = !1, e.jump(ri(t, s), !1)) : e.set(ri(t, s));
		}), a = e.on("destroy", i);
		return () => {
			i(), a();
		};
	}
	return c;
}
function ri(e, t) {
	return t ? e + t : e;
}
function ii(e) {
	return typeof e == "number" ? e : parseFloat(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/spring-value.mjs
function ai(e, t) {
	return ti(e, {
		type: "spring",
		...t
	});
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/find.mjs
var oi = [
	...jr,
	W,
	G
], si = (e) => oi.find(Ar(e)), ci = () => ({
	min: 0,
	max: 0
}), li = () => ({
	x: ci(),
	y: ci()
}), ui = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function di(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function fi(e) {
	return typeof e == "string" || Array.isArray(e);
}
var pi = [
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
function mi(e) {
	return di(e.animate) || pi.some((t) => fi(e[t]));
}
function hi(e) {
	return !!(mi(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function gi(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (X(i)) e.addValue(r, i);
		else if (X(a)) e.addValue(r, er(i, { owner: e }));
		else if (a !== i) {
			if (e.hasValue(r)) {
				let t = e.getValue(r);
				t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
			} else {
				let t = e.getStaticValue(r);
				e.addValue(r, er(t === void 0 ? i : t, { owner: e }));
			}
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var _i = { current: null }, vi = { current: !1 }, yi = typeof window < "u";
function bi() {
	if (vi.current = !0, yi) {
		if (window.matchMedia) {
			let e = window.matchMedia("(prefers-reduced-motion)"), t = () => _i.current = e.matches;
			e.addEventListener("change", t), t();
		} else _i.current = !1;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var xi = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], Si = {}, Ci = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = gn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = B.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, I.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = mi(t), this.isVariantNode = hi(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && X(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, ui.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (vi.current || bi(), this.shouldReduceMotion = _i.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), se(this.notifyUpdate), se(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
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
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && zn.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new kn({
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
		let n = an.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && I.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
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
		for (e in Si) {
			let t = Si[e];
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
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : li();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < xi.length; t++) {
			let n = xi[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = gi(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
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
		return n === void 0 && t !== void 0 && (n = er(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (i(n) || o(n)) ? n = parseFloat(n) : !si(n) && G.test(t) && (n = Wr(e, t)), this.setBaseTarget(e, X(n) ? n.get() : n)), X(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = hr(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !X(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new d()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		Zr.render(this.render);
	}
}, wi = class extends Ci {
	constructor() {
		super(...arguments), this.KeyframeResolver = qr;
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
		X(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Ti({ top: e, left: t, right: n, bottom: r }) {
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
function Ei(e, t) {
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
function Di(e, t) {
	return Ti(Ei(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-transform.mjs
var Oi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, ki = rn.length;
function Ai(e, t, n) {
	let r = "", i = !0;
	for (let a = 0; a < ki; a++) {
		let o = rn[a], s = e[o];
		if (s === void 0) continue;
		let c = !0;
		if (typeof s == "number") c = s === +!!o.startsWith("scale");
		else {
			let e = parseFloat(s);
			c = o.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!c || n) {
			let e = Xr(s, Br[o]);
			if (!c) {
				i = !1;
				let t = Oi[o] || o;
				r += `${t}(${e}) `;
			}
			n && (t[o] = e);
		}
	}
	let a = e.pathRotation;
	return a && (i = !1, r += `rotate(${Xr(a, Br.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function ji(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, o = !1, s = !1;
	for (let e in t) {
		let n = t[e];
		if (an.has(e)) {
			o = !0;
			continue;
		}
		if (ue(e)) {
			i[e] = n;
			continue;
		}
		{
			let t = Xr(n, Br[e]);
			e.startsWith("origin") ? (s = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (o || n ? r.transform = Ai(t, e.transform, n) : r.transform &&= "none"), s) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function Mi(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function Ni(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var Pi = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") {
		if (U.test(e)) e = parseFloat(e);
		else return e;
	}
	return `${Ni(e, t.target.x)}% ${Ni(e, t.target.y)}%`;
} }, Fi = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = G.parse(e);
	if (i.length > 5) return r;
	let a = G.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = Qe(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, Ii = {
	borderRadius: {
		...Pi,
		applyTo: [...Jr]
	},
	borderTopLeftRadius: Pi,
	borderTopRightRadius: Pi,
	borderBottomLeftRadius: Pi,
	borderBottomRightRadius: Pi,
	boxShadow: Fi
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function Li(e, { layout: t, layoutId: n }) {
	return an.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Ii[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function Ri(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (X(r[t]) || i && X(i[t]) || Li(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function zi(e) {
	return window.getComputedStyle(e);
}
var Bi = class extends wi {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = Mi;
	}
	mount(e) {
		e.style, super.mount(e);
	}
	readValueFromInstance(e, t) {
		if (an.has(t)) return this.projection?.isProjecting ? $t(t) : tn(e, t);
		{
			let n = zi(e), r = (ue(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return Di(e, t);
	}
	build(e, t, n) {
		ji(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Ri(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function Vi(e, t) {
	return e in t;
}
var Hi = class extends Ci {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (Vi(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return li();
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
}, Ui = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, Wi = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function Gi(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? Ui : Wi;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var Ki = [
	"transform",
	"opacity",
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function qi(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (ji(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	for (let e of Ki) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	(f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox), t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && Gi(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var Ji = /* @__PURE__ */ new Set([
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
]), Yi = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function Xi(e, t, n, r) {
	Mi(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(Ji.has(n) ? n : wr(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function Zi(e, t, n) {
	let r = Ri(e, t, n);
	for (let n in e) if (X(e[n]) || X(t[n])) {
		let t = rn.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var Qi = class extends wi {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = li;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (an.has(t)) {
			let e = Hr(t);
			return e && e.default || 0;
		}
		if (Ki.includes(t)) {
			let n = getComputedStyle(e)[t];
			if (typeof n == "string" && n) return n.trim();
		}
		return t = Ji.has(t) ? t : wr(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Zi(e, t, n);
	}
	build(e, t, n) {
		qi(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		Xi(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = Yi(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function $i(e, t, n) {
	let r = X(e) ? e : er(e);
	return r.start(ur("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function ea(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function ta(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && ea(t) ? Yr(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function na(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function ra(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function ia(e, n, r) {
	for (let i = 0; i < e.length; i++) {
		let a = e[i];
		a.at > n && a.at < r && (t(e, a), i--);
	}
}
function aa(e, t, n, r, i, a) {
	ia(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: Qe(i, a, r[o]),
		easing: /* @__PURE__ */ M(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function oa(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function sa(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var ca = "easeInOut", la = 20;
function ua(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), d = 0, p = 0, m = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, p);
			continue;
		}
		if (!Array.isArray(o)) {
			l.set(o.name, ra(p, o.at, d, l));
			continue;
		}
		let [u, h, g = {}] = o;
		g.at !== void 0 && (p = ra(p, g.at, d, l));
		let _ = 0, v = (e, n, r, o = 0, s = 0) => {
			let c = pa(e), { delay: l = 0, times: u = Pt(c), type: d = t.type || "keyframes", repeat: h, repeatType: g, repeatDelay: v = 0, ...y } = n, { ease: b = t.ease || "easeOut", duration: x } = n, C = typeof l == "function" ? l(o, s) : l, w = c.length, T = Dn(d) ? d : i?.[d || "keyframes"];
			if (w <= 2 && T) {
				let e = 100;
				if (w === 2 && ga(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...y
				};
				x !== void 0 && (n.duration = /* @__PURE__ */ f(x));
				let r = _t(n, e, T);
				b = r.ease, x = r.duration;
			}
			x ??= a;
			let E = p + C;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let D = u.length - c.length;
			if (D > 0 && Nt(u, D), c.length === 1 && c.unshift(null), h && `${h}${la}`, h && h < la) {
				let e = x > 0 ? v / x : 0;
				x = na(x, h, v);
				let t = [...c], n = [...u];
				b = Array.isArray(b) ? [...b] : [b];
				let r = [...b], i = g === "reverse" || g === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), g === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ S(e) : e)));
				for (let s = 0; s < h; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), b.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), b.push(e === 0 ? "linear" : /* @__PURE__ */ M(f, e - 1));
				}
				oa(u, h, e);
			}
			let ee = E + x;
			aa(r, c, b, u, E, ee), _ = Math.max(C + x, _), m = Math.max(ee, m);
		};
		if (X(u)) {
			let e = da(u, s);
			v(h, g, fa("default", e));
		} else {
			let e = ta(u, h, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				h = h, g = g;
				let r = e[n], i = da(r, s);
				for (let e in h) v(h[e], ma(g, e), fa(e, i), n, t);
			}
		}
		d = p, p += _;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort(sa);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ u(0, m, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(ca)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
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
function da(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function fa(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function pa(e) {
	return Array.isArray(e) ? e : [e];
}
function ma(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var ha = (e) => typeof e == "number", ga = (e) => e.every(ha);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function _a(e) {
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
	}, n = $r(e) && !ei(e) ? new Qi(t) : new Bi(t);
	n.mount(e), ui.set(e, n);
}
function va(e) {
	let t = new Hi({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), ui.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function ya(e, t) {
	return X(e) || typeof e == "number" || typeof e == "string" && !ea(t);
}
function ba(e, t, n, r) {
	let i = [];
	if (ya(e, t)) i.push($i(e, ea(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = ta(e, t, r), o = a.length;
		for (let e = 0; e < o; e++) {
			let r = a[e], s = r instanceof Element ? _a : va;
			ui.has(r) || s(r);
			let c = ui.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, o)), i.push(...Or(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function xa(e, t, n) {
	let r = [];
	return ua(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = er(0);
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
	}), t, n, { spring: Dt }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...ba(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function Sa(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function Ca(e = {}) {
	let { scope: n, reduceMotion: r, skipAnimations: i } = e;
	function a(e, a, o) {
		let s = [], c, l = {};
		if (r !== void 0 && (l.reduceMotion = r), i !== void 0 && (l.skipAnimations = i), Sa(e)) {
			let { onComplete: t, ...r } = a || {};
			typeof t == "function" && (c = t), s = xa(e, {
				...l,
				...r
			}, n);
		} else {
			let { onComplete: t, ...r } = o || {};
			typeof t == "function" && (c = t), s = ba(e, a, {
				...l,
				...r
			}, n);
		}
		let u = new Yn(s);
		return c && u.finished.then(c), n && (n.animations.push(u), u.finished.then(() => {
			t(n.animations, u);
		})), u;
	}
	return a;
}
var Z = Ca(), wa = {
	some: 0,
	all: 1
};
function Ta(e, t, { root: n, margin: r, amount: i = "some" } = {}) {
	let a = Yr(e), o = /* @__PURE__ */ new WeakMap(), s = new IntersectionObserver((e) => {
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
		threshold: typeof i == "number" ? i : wa[i]
	});
	return a.forEach((e) => s.observe(e)), () => s.disconnect();
}
//#endregion
//#region ascii.js
function Ea(e) {
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
function Da(e) {
	let t = matchMedia("(pointer:fine)").matches;
	if (document.querySelectorAll(".section-header h2,.resume-heading h1,.compact-case-heading h1").forEach((t) => {
		let n = t.textContent;
		t.setAttribute("aria-label", n), t.replaceChildren(...[...n].map((e, t) => {
			let n = document.createElement("span");
			return n.className = "kinetic-letter", n.textContent = e === " " ? "\xA0" : e, n.setAttribute("aria-hidden", "true"), n.style.setProperty("--letter", t), n;
		})), Ta(t, () => {
			e() && Z(t.children, {
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
		Ta(t, () => {
			if (!e()) return;
			Z(t, {
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
			r.length && Z(r, {
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
		let n = 0, r = ai(0, {
			stiffness: 160,
			damping: 24
		}), i = ai(0, {
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
	}), document.querySelectorAll(".explore-button,.hero-actions .text-link,.theme-toggle").forEach((t) => {
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
function Oa(e) {
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
		e && Z(e.querySelectorAll(".hero-status,.hero-lower>p,.hero-actions>a,.hero-portrait .profile-wrap,.hero-email,.profile-links>a,.profile-links>button"), {
			opacity: [0, 1],
			y: [22, 0]
		}, {
			duration: .95,
			delay: (e) => .12 + e * .065,
			ease: t
		});
	}
	document.querySelectorAll(".compact-facts article,.compact-preview,.resume-pages figure,.screenshot-card").forEach((n, r) => {
		Ta(n, () => {
			e() && Z(n, n.matches(".compact-preview,.resume-pages figure") ? { opacity: [0, 1] } : {
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
		a && c.push(Z(a, n ? {
			opacity: [.1, 1],
			scale: [.55, 1],
			rotate: [-14, 0]
		} : { opacity: [.15, 1] }, {
			duration: n ? 1 : .65,
			delay: r,
			ease: t
		})), o && c.push(Z(o, n ? {
			opacity: [0, 1],
			x: [24, 0]
		} : { opacity: [.15, 1] }, {
			duration: .75,
			delay: r + .12,
			ease: t
		})), s && c.push(Z(s, n ? {
			opacity: [0, 1],
			y: [10, 0]
		} : { opacity: [.15, 1] }, {
			duration: .65,
			delay: r + .25,
			ease: t
		})), i.set(e, c);
	}
	r.forEach((t, n) => {
		Ta(t, () => {
			a(t, e(), n % 2 * .12);
		}, { amount: .4 });
	});
	let o = document.querySelector(".footer");
	o && Ta(o, () => {
		e() && Z(o.children, {
			opacity: [0, 1],
			y: [12, 0]
		}, {
			duration: .65,
			delay: (e) => e * .08,
			ease: t
		});
	}), n && document.querySelectorAll(".compact-preview,.resume-pages figure").forEach((t) => {
		let n = 0, r = ai(0, {
			stiffness: 150,
			damping: 24
		}), i = ai(0, {
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
var ka = "<svg viewBox=\"0 0 32 32\" fill=\"currentColor\" aria-hidden=\"true\"><ellipse cx=\"16\" cy=\"22\" rx=\"8\" ry=\"6\"/><ellipse cx=\"7\" cy=\"13\" rx=\"3\" ry=\"4\" transform=\"rotate(-25 7 13)\"/><ellipse cx=\"14\" cy=\"8\" rx=\"3\" ry=\"4\"/><ellipse cx=\"22\" cy=\"9\" rx=\"3\" ry=\"4\"/><ellipse cx=\"27\" cy=\"15\" rx=\"3\" ry=\"4\" transform=\"rotate(25 27 15)\"/></svg>", Aa = "<svg class=\"cat-box-art\" viewBox=\"0 0 200 160\" fill=\"none\" aria-hidden=\"true\"><path class=\"cat-box-shadow\" d=\"M25 143q75-14 150 0-75 20-150 0\"/><g class=\"cat-box-body\"><path d=\"m30 70 70-22 70 22v61l-70 23-70-23Z\"/><path d=\"m30 70 70 23 70-23M100 93v61\"/><path class=\"cat-box-tape\" d=\"m82 55 35 11v24l-17 5-18-6V55Z\"/><path d=\"m44 108 18 6m-18 5 12 4\"/></g><g class=\"cat-box-lid\"><path d=\"m30 70 70-23 70 23-70 24Z\"/><path d=\"m30 70-15-21 69-21 16 19m0 0 17-19 68 21-15 21\"/><path d=\"m84 28 33 0\"/></g></svg>";
function ja(e) {
	let t = document.querySelector(".hero .profile-wrap"), n = document.querySelector(".hero .about-copy");
	if (!t || !n) return;
	t.tabIndex = 0, t.setAttribute("role", "button"), t.setAttribute("aria-label", "Play hide and seek with the hidden cat");
	let r = document.createElement("button");
	r.type = "button", r.className = "cat-hint", r.innerHTML = `${ka}<span>Hide N Seek</span>`, t.after(r);
	let i = document.createElement("section");
	i.className = "cat-game", i.id = "cat-game", i.hidden = !0, i.setAttribute("aria-labelledby", "cat-game-title"), r.setAttribute("aria-controls", i.id), r.setAttribute("aria-expanded", "false"), i.innerHTML = `<header class="cat-game-header"><div><h2 id="cat-game-title">Hide N Seek</h2><p>Kitty's hiding. Think you can keep up?</p></div><div class="cat-game-score" role="img" aria-label="0 of 3 rounds complete">${[
		0,
		1,
		2
	].map((e) => `<span data-cat-score="${e}">${ka}</span>`).join("")}</div><button type="button" class="cat-game-close" aria-label="Close cat game"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg></button></header><div class="cat-game-board" role="group" aria-label="Three hiding boxes">${[
		0,
		1,
		2
	].map((e) => `<button type="button" class="cat-box" data-cat-box="${e}"><span class="cat-box-head" aria-hidden="true"><img src="/public/assets/profile/profile2.webp" alt="" draggable="false"></span>${Aa}<span class="cat-box-empty" aria-hidden="true">${ka}</span></button>`).join("")}</div><footer class="cat-game-footer"><p class="cat-game-status" role="status"></p><button type="button" class="cat-game-action">Let's hide! <span aria-hidden="true">↝</span></button></footer>`, t.closest(".hero").append(i);
	let a = [...i.querySelectorAll(".cat-box")], o = i.querySelector(".cat-game-action"), s = i.querySelector(".cat-game-status"), c = "closed", l = 0, u = 0, d = [
		0,
		1,
		2
	], f = [], p = /* @__PURE__ */ new Set();
	function m() {
		p.forEach((e) => e.cancel()), p.clear();
	}
	let h = (e, t) => {
		let n = setTimeout(e, t);
		f.push(n);
	};
	function g() {
		f.forEach(clearTimeout), f = [];
	}
	function _() {
		a.forEach((e, t) => {
			e.style.setProperty("--cat-slot", d[t]), e.setAttribute("aria-label", `Open the ${[
				"left",
				"middle",
				"right"
			][d[t]]} box`);
		});
	}
	function v() {
		i.querySelectorAll("[data-cat-score]").forEach((e, t) => e.classList.toggle("is-earned", t < l)), i.querySelector(".cat-game-score").setAttribute("aria-label", `${l} of 3 rounds complete`);
	}
	function y() {
		g(), m(), c = "preview", u = Math.floor(Math.random() * 3), d = [
			0,
			1,
			2
		], i.classList.remove("is-complete"), a.forEach((e, t) => {
			e.disabled = !1, e.classList.remove("is-open", "is-correct", "is-empty"), e.classList.toggle("is-peeking", t === u);
		}), _(), v(), o.hidden = !1, o.innerHTML = "Let's hide! <span aria-hidden=\"true\">↝</span>", s.textContent = `Round ${l + 1} of 3. Ready or not…`;
	}
	function b() {
		if (!i.hidden) {
			i.querySelector(".cat-game-close").focus({ preventScroll: !0 });
			return;
		}
		i.hidden = !1, r.setAttribute("aria-expanded", "true"), l = 0, y(), i.scrollIntoView({
			block: "nearest",
			behavior: e() ? "smooth" : "instant"
		}), o.focus({ preventScroll: !0 });
	}
	function x() {
		g(), c = "hiding", o.hidden = !0, a.forEach((e) => e.classList.remove("is-peeking")), s.textContent = "Shhh… hiding!";
		let t = e(), n = t ? 520 : 360, r = n + 100, i = t ? 560 : 180, u = 3 + l;
		for (let e = 0; e < u; e++) h(() => {
			c = "shuffle", s.textContent = "Keep your eyes on the boxes…";
			let e = a.map((e) => e.getBoundingClientRect());
			m();
			let r = Math.floor(Math.random() * 3), i = (r + 1 + Math.floor(Math.random() * 2)) % 3;
			[d[r], d[i]] = [d[i], d[r]], _();
			let o = a.map((e) => e.getBoundingClientRect());
			[r, i].forEach((i) => {
				let s = e[i].left - o[i].left, c = t ? i === r ? -18 : 18 : 0, l = t ? [
					{ transform: `translate(${s}px,0)` },
					{
						transform: `translate(${s / 2}px,${c}px)`,
						offset: .5
					},
					{ transform: "translate(0,0)" }
				] : [{ transform: `translate(${s}px,0)` }, { transform: "translate(0,0)" }], u = a[i].animate(l, {
					duration: n,
					easing: "cubic-bezier(.4,0,.2,1)"
				});
				p.add(u), u.finished.then(() => p.delete(u), () => p.delete(u));
			});
		}, i + e * r);
		h(() => {
			c = "pick", s.textContent = "Pick a box. No peeking!";
		}, i + u * r);
	}
	function S() {
		if (!e()) return;
		let t = i.querySelector(".cat-game-board");
		for (let e = 0; e < 9; e++) {
			let n = document.createElement("span");
			n.className = "cat-win-paw", n.innerHTML = ka, t.append(n), n.animate([
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
	function C(e) {
		if (c === "preview") {
			x();
			return;
		}
		if (c === "pick" || c === "shuffle") {
			if (g(), c = "pick", a[e].classList.add("is-open"), e !== u) {
				a[e].classList.add("is-empty"), a[e].disabled = !0, s.textContent = "Nope! Kitty's not in there.", a.find((e) => !e.disabled)?.focus({ preventScroll: !0 });
				return;
			}
			c = "found", a[e].classList.add("is-correct"), a.forEach((e) => e.disabled = !0), l++, v(), S(), o.hidden = !1, l === 3 ? (c = "complete", i.classList.add("is-complete"), s.textContent = "You found me three times!", o.textContent = "Play again") : (s.textContent = "Peekaboo! You found me.", o.innerHTML = "Next round <span aria-hidden=\"true\">→</span>"), o.focus({ preventScroll: !0 });
		}
	}
	o.addEventListener("click", () => {
		c === "preview" ? x() : c === "found" ? y() : c === "complete" && (l = 0, y());
	}), a.forEach((e, t) => {
		e.addEventListener("click", () => C(t)), e.addEventListener("keydown", (t) => {
			if (t.key !== "ArrowLeft" && t.key !== "ArrowRight") return;
			t.preventDefault();
			let n = a.filter((e) => !e.disabled).sort((e, t) => d[Number(e.dataset.catBox)] - d[Number(t.dataset.catBox)]);
			n[(n.indexOf(e) + (t.key === "ArrowRight" ? 1 : n.length - 1)) % n.length]?.focus();
		});
	});
	function w() {
		g(), m(), c = "closed", i.hidden = !0, r.setAttribute("aria-expanded", "false"), r.focus({ preventScroll: !0 });
	}
	i.querySelector(".cat-game-close").addEventListener("click", w), i.addEventListener("keydown", (e) => {
		e.key === "Escape" && (e.preventDefault(), w());
	}), r.addEventListener("click", b), t.addEventListener("click", (e) => {
		if (e.pointerType === "touch" && !t.classList.contains("cat-peek")) {
			t.classList.add("cat-peek");
			return;
		}
		b();
	}), t.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), t.classList.add("cat-peek"), b());
	});
	function T() {
		(c === "shuffle" || c === "hiding") && (g(), m(), c = "pick", s.textContent = "Pick a box. No peeking!");
	}
	document.addEventListener("visibilitychange", () => {
		document.hidden && T();
	}), new IntersectionObserver((e) => {
		e[0].isIntersecting || T();
	}, { threshold: .05 }).observe(i);
}
//#endregion
//#region lab-captures.js
var Ma = {
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
}, Na = [
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
		"Final HTTPS response fragment."
	]
].map(([e, t, n, r], i) => ({
	id: i,
	time: e,
	flow: t,
	size: n,
	detail: r
})), Pa = [
	[
		0,
		"dns",
		74,
		"Query: assets.example.test. A short hostname lookup."
	],
	[
		4,
		"web",
		1240,
		"An HTTPS response fragment from the web server."
	],
	[
		9,
		"external",
		620,
		"A TLS response. Its timing and size differ from the later response."
	],
	[
		12,
		"dns",
		188,
		"Query: a81f02c9b7d04e6f338a9d42.c917fe0ad4b73c865e24a1bf.telemetry.example.test. Long, encoded-looking labels."
	],
	[
		22,
		"dns",
		192,
		"Another long query to telemetry.example.test, with a different encoded-looking subdomain."
	],
	[
		32,
		"dns",
		190,
		"A third long subdomain query to the same parent domain. Compare its size with the first lookup."
	],
	[
		43,
		"web",
		900,
		"An HTTPS response fragment during ordinary web traffic."
	],
	[
		49,
		"dns",
		196,
		"A fourth long query to telemetry.example.test. Repeated encoded-looking labels warrant a closer look."
	],
	[
		59,
		"external",
		432,
		"A second TLS response, fifty seconds after the previous one, with a different size."
	],
	[
		65,
		"dns",
		194,
		"A fifth long query to the same parent domain. Inspect resolver and process logs for context."
	],
	[
		75,
		"web",
		602,
		"Final HTTPS response fragment."
	]
].map(([e, t, n, r], i) => ({
	id: i,
	time: e,
	flow: t,
	size: n,
	detail: r
})), Fa = "<svg viewBox=\"0 0 40 40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" aria-hidden=\"true\"><path d=\"m20 3 17 17-17 17L3 20Z\"/><path d=\"M14 16h3m6 0h3m-12 9 6-3 6 3\"/></svg>", Ia = "<svg viewBox=\"0 0 40 40\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" aria-hidden=\"true\"><circle cx=\"20\" cy=\"20\" r=\"15\"/><path d=\"M13 23q7 8 14 0M13 15h3m8 0h3\"/></svg>", La = "<svg viewBox=\"0 0 64 64\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" aria-hidden=\"true\"><path d=\"M19 9h26v18c0 11-7 17-13 17s-13-6-13-17V9Zm0 6H9v8c0 8 5 13 13 13m23-21h10v8c0 8-5 13-13 13M32 44v10m-12 3h24M32 15l3 6 6 1-5 5 1 6-5-3-5 3 1-6-5-5 6-1Z\"/></svg>";
function Ra(e) {
	let t = document.querySelector("#skills");
	if (!t) return;
	let n = document.createElement("section");
	n.id = "security-lab", n.className = "security-lab signal-arcade page-width", n.setAttribute("aria-labelledby", "signal-arcade-title"), n.innerHTML = `<header class="arcade-heading"><div><h2 id="signal-arcade-title">Signal Chase</h2><p>Catch the diamonds, dodge the decoys, and keep your streak alive.</p></div><div class="arcade-scoreboard"><span><small>Score</small><strong data-arcade-score>0</strong></span><span><small>Best</small><strong data-arcade-best>0</strong></span><span class="arcade-combo"><small>Combo</small><strong data-arcade-combo>×1</strong></span></div></header>
    <div class="arcade-shell"><div class="arcade-toolbar"><span class="arcade-round">Round <strong data-arcade-round>1 / 2</strong></span><div class="arcade-catch-meter" role="img" aria-label="0 of 6 signals caught">${Array.from({ length: 6 }, () => "<i></i>").join("")}</div><button type="button" class="arcade-motion" aria-pressed="${e()}" title="Switch between moving signals and pop-up targets">${e() ? "Flow mode" : "Pop-up mode"}</button><button type="button" class="arcade-pause" disabled>Pause</button></div>
    <div class="arcade-field" tabindex="0" role="group" aria-label="Signal field. Catch diamonds and leave circles. Up and down choose a lane; Space catches a rogue signal in that lane."><div class="arcade-grid" aria-hidden="true"></div>${[
		0,
		1,
		2
	].map((e) => `<div class="arcade-lane" data-arcade-lane="${e}"><span class="arcade-lane-label">0${e + 1}</span><span class="arcade-lane-wire" aria-hidden="true"></span><span class="arcade-lane-end" aria-hidden="true">⊕</span></div>`).join("")}<div class="arcade-tokens"></div><div class="arcade-fx" aria-hidden="true"></div><div class="arcade-overlay"></div></div>
    <footer class="arcade-footer"><div class="arcade-legend"><span>${Fa}Catch</span><span>${Ia}Leave alone</span></div><span class="arcade-controls-help">Tap targets · ↑ ↓ + Space</span><span class="arcade-status sr-only" role="status"></span></footer></div>
    <details class="arcade-behind"><summary>Behind the signals <span>Packet examples</span><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></summary><div class="arcade-behind-content"><p>Explore the network patterns that inspired the game.</p><div class="arcade-samples" role="group" aria-label="Packet examples"><button type="button" data-arcade-sample="timing" aria-pressed="true">Repeating connections</button><button type="button" data-arcade-sample="dns" aria-pressed="false">Long DNS queries</button></div><div class="arcade-sample-note"></div><div class="arcade-sample-scroll"><table><caption class="sr-only">Browser-only sample packet records</caption><thead><tr><th scope="col">Time</th><th scope="col">Destination</th><th scope="col">Protocol</th><th scope="col">Bytes</th></tr></thead><tbody></tbody></table></div></div></details>`;
	let r = document.createElement("div");
	r.className = "arcade-game", r.id = "signal-arcade-game", r.hidden = !0, r.append(...n.childNodes);
	let i = document.createElement("div");
	i.className = "arcade-invitation", i.innerHTML = `<span class="arcade-invitation-icon" aria-hidden="true">${Fa}</span><div><h2 id="arcade-invitation-title">Wanna play a game?</h2><p>Catch a few rogue signals and chase your best score.</p></div><div class="arcade-invitation-actions"><button type="button" class="arcade-primary" data-arcade-open aria-controls="signal-arcade-game" aria-expanded="false">I'm in</button><button type="button" class="arcade-maybe-later" data-arcade-decline>Maybe later</button></div>`;
	let a = document.createElement("div");
	a.className = "arcade-dismissed", a.hidden = !0, a.innerHTML = "<button type=\"button\" data-arcade-open aria-controls=\"signal-arcade-game\" aria-expanded=\"false\" id=\"arcade-quiet-title\">Play Signal Chase</button>";
	let o = document.createElement("button");
	o.type = "button", o.className = "arcade-close", o.setAttribute("aria-label", "Close Signal Chase"), o.innerHTML = "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.6\" stroke-linecap=\"round\" aria-hidden=\"true\"><path d=\"m7 7 10 10M17 7 7 17\"/></svg>", r.querySelector(".arcade-heading").append(o), n.append(i, a, r), n.setAttribute("aria-labelledby", "arcade-invitation-title"), t.before(n);
	let s = n.querySelector(".arcade-field"), c = n.querySelector(".arcade-overlay"), l = n.querySelector(".arcade-tokens"), u = n.querySelector(".arcade-fx"), d = n.querySelector(".arcade-pause"), f = n.querySelector(".arcade-motion"), p = n.querySelector(".arcade-status"), m = "ready", h = 0, g = 0, _ = 0, v = 0, y = 0, b = 0, x = 1, S = e(), C = !1, w, T = 0, E = 0, D = !1, ee = 0, O = !1, k = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Set();
	try {
		E = Math.max(0, Math.min(1e6, Number(localStorage.getItem("portfolio-signal-best")) || 0));
	} catch {}
	function te() {
		if (_ > E) {
			E = _;
			try {
				localStorage.setItem("portfolio-signal-best", String(E));
			} catch {}
		}
	}
	function j() {
		clearInterval(w), w = void 0;
	}
	function M() {
		k.forEach((e) => {
			e.animation?.cancel(), e.node.remove();
		}), k.clear();
	}
	function ne() {
		A.forEach((e) => e.cancel()), A.clear(), u.replaceChildren();
	}
	function N() {
		n.querySelector("[data-arcade-score]").textContent = String(_), n.querySelector("[data-arcade-best]").textContent = String(E), n.querySelector("[data-arcade-combo]").textContent = `×${Math.min(3, 1 + Math.floor(v / 3))}`, n.querySelector(".arcade-combo").classList.toggle("is-hot", v >= 3), n.querySelector("[data-arcade-round]").textContent = `${h + 1} / 2`, n.querySelectorAll(".arcade-catch-meter i").forEach((e, t) => e.classList.toggle("is-caught", t < g)), n.querySelector(".arcade-catch-meter").setAttribute("aria-label", `${g} of 6 signals caught`), n.querySelectorAll("[data-arcade-lane]").forEach((e) => e.classList.toggle("is-keyboard-lane", D && Number(e.dataset.arcadeLane) === x && s === document.activeElement)), d.disabled = m !== "playing" && m !== "paused", d.textContent = m === "paused" ? "Resume" : "Pause", f.setAttribute("aria-pressed", String(S)), f.textContent = S ? "Flow mode" : "Pop-up mode", n.classList.toggle("is-playing", m === "playing");
	}
	function P() {
		if (c.hidden = m === "playing", m !== "playing") {
			if (m === "ready") c.innerHTML = `<div class="arcade-intro-icons" aria-hidden="true">${Fa}<span>vs</span>${Ia}</div><h3>Catch me if you can.</h3><p>Catch 6 diamonds to clear a round.<br>Circles are your friends. Let them through.</p><button type="button" class="arcade-primary" data-arcade-start>Let's play <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10"/></svg></span></button><small>No countdown. Find your rhythm.</small>`;
			else if (m === "paused") c.innerHTML = "<span class=\"arcade-pause-symbol\" aria-hidden=\"true\">Ⅱ</span><h3>Taking a breather?</h3><button type=\"button\" class=\"arcade-primary\" data-arcade-resume>Jump back in <span aria-hidden=\"true\">→</span></button>";
			else {
				let e = m === "complete";
				c.innerHTML = `<button type="button" class="arcade-trophy" data-arcade-confetti aria-label="Celebrate again">${La}</button><span class="arcade-round-clear">${e ? "Both rounds cleared" : "Round 1 cleared"}</span><h3>${e ? b === 0 ? "Clean sweep!" : "Nicely caught!" : "Ghosts caught!"}</h3><div class="arcade-result-stats"><span><strong>${_}</strong>points</span><span><strong>${y}</strong>best streak</span></div><button type="button" class="arcade-primary" ${e ? "data-arcade-restart" : "data-arcade-next"}>${e ? "One more run" : "Bring on the swarm"} <span aria-hidden="true">→</span></button>${e && _ === E ? "<small>Personal best. That one is yours.</small>" : e ? "" : "<small>Next up: two rogues at once.</small>"}`;
			}
		}
	}
	function re(t, n, r = !1) {
		if (document.hidden || !C) return;
		let i = e(), a = r ? 42 : 8;
		for (let e = 0; e < a; e++) {
			let a = document.createElement("i");
			a.className = r ? "arcade-confetti" : "arcade-spark", a.style.left = `${t}px`, a.style.top = `${n}px`, a.style.background = r ? [
				"#f2c75c",
				"#9d8df1",
				"#67cdb6",
				"var(--ink)"
			][e % 4] : "var(--ink)", u.append(a);
			let o = (Math.random() - .5) * (r ? Math.min(550, s.clientWidth) : 90), c = r ? 50 + Math.random() * 210 : (Math.random() - .5) * 90;
			i || (a.style.left = `${t + o}px`, a.style.top = `${Math.max(12, n + c)}px`);
			let l = i ? [
				{
					opacity: 0,
					transform: "translate(0,0) rotate(0deg)"
				},
				{
					opacity: 1,
					offset: .15
				},
				{
					opacity: 0,
					transform: `translate(${o}px,${c}px) rotate(${e * 37}deg)`
				}
			] : [
				{ opacity: 0 },
				{
					opacity: 1,
					offset: .25
				},
				{ opacity: 0 }
			], d = a.animate(l, {
				duration: r ? i ? 1350 : 650 : 420,
				easing: "ease-out"
			});
			A.add(d), d.finished.then(() => {
				a.remove(), A.delete(d);
			}, () => a.remove());
		}
	}
	function F(t, n, r) {
		let i = document.createElement("span");
		i.className = "arcade-pop-score", i.textContent = t, i.style.left = `${Math.max(25, Math.min(s.clientWidth - 75, n))}px`, i.style.top = `${Math.max(10, r - 30)}px`, u.append(i);
		let a = i.animate(e() ? [{
			opacity: 1,
			translate: "0 0"
		}, {
			opacity: 0,
			translate: "0 -28px"
		}] : [{ opacity: 1 }, { opacity: 0 }], {
			duration: 700,
			easing: "ease-out"
		});
		A.add(a), a.finished.then(() => {
			i.remove(), A.delete(a);
		}, () => i.remove());
	}
	function ie(e) {
		k.has(e.id) && (k.delete(e.id), e.animation?.cancel(), e.node.remove());
	}
	function ae() {
		if (m !== "playing") return;
		let e = h === 0 ? 1 : 2;
		for (let t = [...k.values()].filter((e) => e.rogue).length; t < e; t++) oe(!0);
	}
	function oe(e) {
		if (m !== "playing" || k.size >= 8) return;
		let t = ++T, n = document.createElement("button"), r = [...k.values()], i = [
			0,
			1,
			2
		].map((e) => r.filter((t) => t.row === e).length), a = [
			0,
			1,
			2
		].filter((t) => e ? !r.some((e) => e.rogue && e.row === t) : i[t] === Math.min(...i)), o = a[(T + h) % a.length];
		n.type = "button", n.className = `arcade-token ${e ? "is-rogue" : "is-friendly"}`, n.dataset.arcadeToken = String(t), n.innerHTML = e ? Fa : Ia, n.setAttribute("aria-label", `${e ? "Catch rogue" : "Leave friendly"} signal in lane ${o + 1}`);
		let c = s.clientHeight / 3, u = s.clientWidth, d = {
			id: t,
			node: n,
			rogue: e,
			row: o,
			animation: null
		};
		if (k.set(t, d), l.append(n), n.style.top = `${o * c + c / 2 - 32}px`, S) n.style.left = "-70px", d.animation = n.animate([{ transform: "translateX(0)" }, { transform: `translateX(${u + 140}px)` }], {
			duration: e ? h === 0 ? 6500 : 5500 : 7500,
			easing: "linear",
			fill: "forwards"
		});
		else {
			let t = [...k.values()].filter((e) => e !== d && e.row === o).map((e) => parseFloat(e.node.style.left)), r = [
				.18,
				.5,
				.82
			].map((e) => Math.max(12, u * e - 32)), i = r.find((e) => t.every((t) => Math.abs(e - t) > 68)) ?? r[0];
			n.style.left = `${i}px`, d.animation = n.animate([
				{ opacity: 0 },
				{
					opacity: 1,
					offset: .08
				},
				{
					opacity: 1,
					offset: .87
				},
				{ opacity: 0 }
			], {
				duration: e ? 7e3 : 5500,
				fill: "forwards"
			});
		}
		d.animation.finished.then(() => {
			k.has(t) && (k.delete(t), n.remove(), e && (v = 0, N(), p.textContent = "One slipped by. Another is on its way."), ae());
		}, () => {});
	}
	function I() {
		j(), m === "playing" && (w = setInterval(() => {
			k.size < 7 && oe(!1), ae();
		}, 1200));
	}
	function se() {
		ae();
		for (let e = 0; e < 3; e++) oe(!1);
	}
	function L() {
		j(), M(), ne(), g = 0, m = "playing", P(), N(), se(), I(), s.focus({ preventScroll: !0 }), p.textContent = `Round ${h + 1}. Catch diamonds and leave circles.`;
	}
	function ce() {
		m = h === 0 ? "round-clear" : "complete", j(), M(), te(), N(), P(), re(s.clientWidth / 2, 65, !0), c.querySelector(".arcade-primary")?.focus({ preventScroll: !0 }), p.textContent = `${h === 0 ? "Round one cleared" : "Both rounds cleared"}. ${_} points.`;
	}
	function R(e) {
		if (m !== "playing" || !e) return;
		let t = e.node.getBoundingClientRect(), n = s.getBoundingClientRect(), r = t.x + t.width / 2 - n.x, i = t.y + t.height / 2 - n.y, a = Number(e.animation?.currentTime) < 1500, o = document.activeElement === e.node;
		if (ie(e), e.rogue) {
			v++, y = Math.max(y, v);
			let e = 10 * Math.min(3, 1 + Math.floor(v / 3)) + (a ? 5 : 0);
			if (_ += e, g++, re(r, i), F(`+${e}${a ? " quick" : ""}${v > 1 ? " · " + v + " streak" : ""}`, r, i), p.textContent = `Caught. ${g} of 6. ${_} points.`, g === 6) {
				ce();
				return;
			}
			ae();
		} else b++, v = 0, _ = Math.max(0, _ - 5), F("Friendly! −5", r, i), p.textContent = "That was a friendly circle. Go for a diamond.";
		N(), o && s.focus({ preventScroll: !0 });
	}
	function z() {
		m === "playing" && (m = "paused", j(), k.forEach((e) => {
			e.animation?.pause(), e.node.disabled = !0;
		}), ne(), P(), N());
	}
	function B() {
		if (m !== "paused" || document.hidden) return;
		m = "playing";
		let e = k.size === 0;
		k.forEach((e) => {
			e.node.disabled = !1, e.animation?.play();
		}), P(), N(), e ? se() : ae(), I(), s.focus({ preventScroll: !0 });
	}
	function le() {
		if (!r.hidden) return;
		let e = ++ee;
		i.hidden = !0, a.hidden = !0, r.hidden = !1, c.hidden = !0, n.classList.remove("is-dismissed"), n.classList.add("is-open"), n.setAttribute("aria-labelledby", "signal-arcade-title"), n.querySelectorAll("[data-arcade-open]").forEach((e) => e.setAttribute("aria-expanded", "true"));
		try {
			sessionStorage.removeItem("portfolio-arcade-dismissed");
		} catch {}
		r.scrollIntoView({
			block: "start",
			behavior: "instant"
		}), requestAnimationFrame(() => requestAnimationFrame(() => {
			e !== ee || r.hidden || (m === "ready" || m === "complete" ? (h = 0, _ = 0, v = 0, y = 0, b = 0, L()) : m === "paused" ? B() : (P(), N(), c.querySelector(".arcade-primary")?.focus({ preventScroll: !0 })));
		}));
	}
	function ue(e = !1) {
		if (ee++, te(), z(), j(), M(), ne(), r.hidden = !0, n.classList.remove("is-open"), n.classList.toggle("is-dismissed", e), i.hidden = e, a.hidden = !e, n.querySelectorAll("[data-arcade-open]").forEach((e) => e.setAttribute("aria-expanded", "false")), n.setAttribute("aria-labelledby", e ? "arcade-quiet-title" : "arcade-invitation-title"), i.querySelector("[data-arcade-open]").textContent = m === "ready" ? "I'm in" : m === "complete" ? "Play again" : "Keep playing", e) {
			try {
				sessionStorage.setItem("portfolio-arcade-dismissed", "yes");
			} catch {}
			a.querySelector("button").focus({ preventScroll: !0 });
		} else i.querySelector("[data-arcade-open]").focus();
	}
	function de(e = "timing") {
		let t = e === "dns" ? Pa : Na;
		n.querySelector(".arcade-sample-note").textContent = e === "dns" ? "Repeated long queries under the same parent domain." : "Four 96-byte connections, spaced 20 seconds apart.", n.querySelectorAll("[data-arcade-sample]").forEach((t) => t.setAttribute("aria-pressed", String(t.dataset.arcadeSample === e))), n.querySelector("tbody").innerHTML = t.map((e) => `<tr><td>${e.time}s</td><td>${Ma[e.flow].destination}</td><td>${Ma[e.flow].protocol}</td><td>${e.size}</td></tr>`).join("");
	}
	n.addEventListener("click", (e) => {
		if (O && e.detail > 0) {
			e.preventDefault();
			return;
		}
		let t = e.target.closest("button");
		if (t) {
			if (t.hasAttribute("data-arcade-open")) le();
			else if (t.hasAttribute("data-arcade-decline")) ue(!0);
			else if (t.matches(".arcade-close")) ue();
			else if (t.hasAttribute("data-arcade-start") || t.hasAttribute("data-arcade-restart")) h = 0, _ = 0, v = 0, y = 0, b = 0, L();
			else if (t.dataset.arcadeToken && e.detail === 0) R(k.get(Number(t.dataset.arcadeToken)));
			else if (t.hasAttribute("data-arcade-next")) h = 1, L();
			else if (t.hasAttribute("data-arcade-resume")) B();
			else if (t.matches(".arcade-pause")) m === "playing" ? z() : B();
			else if (t.matches(".arcade-motion")) {
				S = !S;
				let e = m === "playing";
				M(), N(), e && (se(), s.focus({ preventScroll: !0 }));
			} else t.hasAttribute("data-arcade-confetti") ? re(s.clientWidth / 2, 65, !0) : t.dataset.arcadeSample && de(t.dataset.arcadeSample);
		}
	}), n.addEventListener("pointerdown", (e) => {
		if (O = !1, e.button !== 0 || !e.isPrimary) return;
		let t = e.target.closest("[data-arcade-token]");
		!t || m !== "playing" || (e.preventDefault(), O = !0, R(k.get(Number(t.dataset.arcadeToken))), m === "playing" && s.focus({ preventScroll: !0 }));
	}), document.addEventListener("pointerup", () => {
		O && setTimeout(() => {
			O = !1;
		}, 0);
	}, { passive: !0 }), document.addEventListener("pointercancel", () => {
		O = !1;
	}, { passive: !0 }), s.addEventListener("keydown", (e) => {
		if (m === "playing" && e.key === "Escape") {
			e.preventDefault(), z(), c.querySelector("button")?.focus();
			return;
		}
		if (e.target === s && m === "playing") {
			if (D = !0, e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault(), x = (x + (e.key === "ArrowDown" ? 1 : 2)) % 3, N();
			else if (e.key === " " || e.key === "Enter") {
				e.preventDefault();
				let t = s.getBoundingClientRect(), n = [...k.values()].find((e) => {
					if (!e.rogue || e.row !== x) return !1;
					let n = e.node.getBoundingClientRect();
					return n.right > t.left + 15 && n.left < t.right - 15 && Number(getComputedStyle(e.node).opacity) > .1;
				});
				n ? R(n) : F("Try another lane", s.clientWidth / 2, s.clientHeight / 2);
			}
		}
	}), n.querySelector(".arcade-behind").addEventListener("toggle", (e) => {
		e.currentTarget.open && z();
	}), s.addEventListener("pointerdown", () => {
		D = !1, N();
	}), s.addEventListener("focus", N), s.addEventListener("blur", N), new ResizeObserver(() => {
		m === "playing" && z(), m === "paused" && M();
	}).observe(s), new IntersectionObserver((e) => {
		C = e[0].isIntersecting, C || (z(), ne());
	}, { threshold: .1 }).observe(s), document.addEventListener("visibilitychange", () => {
		document.hidden && z();
	}), addEventListener("pagehide", () => {
		te(), z(), j(), M(), ne();
	});
	try {
		sessionStorage.getItem("portfolio-arcade-dismissed") === "yes" && (i.hidden = !0, a.hidden = !1, n.classList.add("is-dismissed"), n.setAttribute("aria-labelledby", "arcade-quiet-title"));
	} catch {}
	de(), P(), N();
}
//#endregion
//#region project-metadata.js
var Q = [
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
], za = [
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
], Ba = [
	"Python",
	"JavaScript",
	"TypeScript",
	"SQL",
	"Electron"
], Va = (e, t) => t === "All" || e.skills.some((e) => e.toLowerCase() === t.toLowerCase() || t === "SQL" && /^(sqlite|sql)$/i.test(e));
function Ha(e) {
	let t = document.querySelector("#work [data-project-rail]");
	if (!t) return;
	let n = t.closest("section"), r = document.createElement("div");
	r.className = "project-explorer-tools", r.innerHTML = `<div class="project-view-switch" role="group" aria-label="Project view"><button type="button" data-view="cards" aria-pressed="true">Cards</button><button type="button" data-view="map" aria-pressed="false">Map <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m4 5 11-2-5 12L4 5l12 7"/><circle cx="4" cy="5" r="2"/><circle cx="15" cy="3" r="2"/><circle cx="10" cy="15" r="2"/></svg></button></div><div class="project-skill-filters" role="group" aria-label="Highlight projects by skill">${["All", ...Ba].map((e) => `<button type="button" data-skill="${e}" aria-pressed="${e === "All"}">${e}</button>`).join("")}</div><span class="project-filter-status" role="status"></span>`, t.before(r);
	let i = document.createElement("div");
	i.className = "project-map", i.hidden = !0, i.innerHTML = "<p class=\"project-map-help\">Shared skills connect the projects. Select a node to inspect it; use arrow keys to move between nodes.</p><div class=\"project-map-scroll\" tabindex=\"0\" role=\"region\" aria-label=\"Project constellation. On small screens, scroll horizontally to explore the map.\"><div class=\"project-map-stage\"><svg class=\"project-map-wires\" viewBox=\"0 0 1000 440\" preserveAspectRatio=\"none\" aria-hidden=\"true\"></svg></div></div><div class=\"project-map-preview\" aria-live=\"polite\"></div>", t.after(i);
	let a = i.querySelector(".project-map-stage"), o = i.querySelector("svg"), s = i.querySelector(".project-map-preview"), c = "All", l = "cards", u = Q[0].id, d = /* @__PURE__ */ new Map(), f = [...t.querySelectorAll(".project-card")], p = [];
	Q.forEach((e, t) => {
		let n = 0;
		for (let r = t + 1; r < Q.length && n < 2; r++) {
			let t = Ba.filter((t) => Va(e, t) && Va(Q[r], t));
			t.length && (p.push({
				from: e.id,
				to: Q[r].id,
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
				End: Q.length - 1 - t
			};
			if (!(e.key in n)) return;
			e.preventDefault();
			let r = Math.max(0, Math.min(Q.length - 1, t + n[e.key]));
			d.get(Q[r].id).focus();
		});
	});
	function m(e) {
		s.innerHTML = `<div><p class="interaction-label">Project details</p><h3>${e.name}</h3><p>${e.summary}</p></div><div class="map-preview-links"><span>${e.skills.slice(0, 5).join(" · ")}</span><a href="${e.url}" class="text-link">Read documentation <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10"/></svg></span></a></div>`;
	}
	function h(t = !1, n = !1) {
		let r = /* @__PURE__ */ new Map();
		t && e() && !i.hidden && d.forEach((e, t) => {
			let n = e.getBoundingClientRect();
			e.getAnimations().forEach((e) => e.cancel()), r.set(t, n);
		});
		let a = [...Q].sort((e, t) => Number(Va(t, c)) - Number(Va(e, c))), s = /* @__PURE__ */ new Map();
		a.forEach((e, t) => {
			let [n, r] = za[t], i = d.get(e.id);
			s.set(e.id, [n * 10, r * 4.4]), i.style.left = `calc(${n}% - 90px)`, i.style.top = `calc(${r}% - 31px)`, i.classList.toggle("is-skill-muted", !Va(e, c)), i.setAttribute("aria-pressed", String(u === e.id));
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
			let t = Q.find((t) => e.getAttribute("href") === t.url);
			e.classList.toggle("is-skill-muted", t && !Va(t, c));
		});
		let i = Q.filter((e) => Va(e, c));
		if (r.querySelector(".project-filter-status").textContent = c === "All" ? "" : `${i.length} projects use ${c}`, i.some((e) => e.id === u) || (u = i[0].id), m(Q.find((e) => e.id === u)), h(!0), l === "cards" && c !== "All") {
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
	})), m(Q[0]), h();
}
//#endregion
//#region project-history.js
var Ua = {
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
function Wa(e) {
	let t = document.querySelector(".compact-case-layout");
	if (!t) return;
	let n = Ua[location.pathname.split("/").filter(Boolean)[1]];
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
		s.innerHTML = `<p class="interaction-label">${u.kind}${d}</p><h3>${u.title}</h3><p>${u.text}</p><a class="timeline-source" href="${u.source}" target="_blank" rel="noopener noreferrer">${u.kind === "Public commit" ? "View commit" : "Source snapshot"} <code>${u.sha}</code> <span aria-hidden="true"><svg class="ui-arrow" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M5 15 15 5M5 5h10v10"/></svg></span></a>`, i.querySelectorAll("[data-flow-step]").forEach((e) => e.classList.toggle("is-active", u.flowStep !== null && Number(e.dataset.flowStep) === u.flowStep)), l?.cancel();
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
var Ga = document.documentElement, Ka = matchMedia("(prefers-reduced-motion: reduce)"), $ = () => Ga.dataset.motion !== "paused";
$() && Ga.classList.add("js-motion");
var qa = document.querySelector(".theme-toggle");
if (qa) {
	let e = document.createElement("div");
	e.className = "header-actions", qa.before(e), e.append(qa);
}
Ka.addEventListener("change", () => {
	Ga.dataset.motion = Ka.matches ? "paused" : "full", Ga.classList.toggle("js-motion", !Ka.matches), document.dispatchEvent(new Event("portfolio:motion"));
}), Ea($), Da($), Oa($), ja($), Ra($), Ha($), Wa($), document.querySelectorAll("[data-project-rail]").forEach((e, t) => {
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
		e.classList.add("is-dragging"), d = Z(e.scrollLeft, i, {
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
			e.classList.add("is-dragging"), C = Math.max(0, Math.min(h(), C + n * (t.deltaMode === 1 ? 30 : 1))), d = Z(e.scrollLeft, C, {
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
		n.reduce((e, t, n) => Math.abs(v(n) - a) < Math.abs(v(e) - a) ? n : e, 0), b(), $() ? d = Z(e.scrollLeft, a, {
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
var Ja = [...document.querySelectorAll(".site-nav a[href^=\"#\"]")], Ya = Ja.map((e) => document.querySelector(e.hash)).filter(Boolean), Xa = new IntersectionObserver((e) => {
	e.forEach((e) => {
		e.isIntersecting && Ja.forEach((t) => {
			t.hash === `#${e.target.id}` ? t.setAttribute("aria-current", "location") : t.removeAttribute("aria-current");
		});
	});
}, {
	rootMargin: "-15% 0px -60% 0px",
	threshold: 0
});
Ya.forEach((e) => Xa.observe(e)), document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape") return;
	let t = document.querySelector(".menu-button");
	t?.getAttribute("aria-expanded") === "true" && (t.click(), t.focus());
}), $() && Ta(".project-card", (e) => {
	let t = e.querySelector(".project-image img");
	t && $() && Z(t, {
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
