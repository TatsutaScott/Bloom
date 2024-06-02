const radialBlurAngle = Math.random() * 2 * Math.PI;

//arrays of warp functions
const warpArray = [
  linear,
  sinusoidal,
  spherical,
  swirl,
  horseshoe,
  polar,
  handkerchief,
  heart,
  disc,
  spiral,
  hyperbolic,
  diamond,
  ex,
  julia,
  bent,
  waves,
  fisheye,
  popcorn,
  exponential,
  power,
  cosine,
  rings,
  fan,
  blob,
  PDJ,
  fan2,
  rings2,
  eyefish,
  bubble,
  vCylinder,
  vPerspective,
  vNoise,
  juliaN,
  juliaScope,
  blur,
  gaussian,
  radialBlur,
  pie,
  ngon,
  curl,
  rectangles,
  arch,
  tangent,
  vSquare,
  blade,
  twinTrian,
  cross,
];

const finalWarpArray = [
  linear,
  sinusoidal,
  spherical,
  swirl,
  horseshoe,
  polar,
  handkerchief,
  heart,
  disc,
  spiral,
  hyperbolic,
  diamond,
  ex,
  julia,
  bent,
  waves,
  fisheye,
  popcorn,
  exponential,
  power,
  cosine,
  rings,
  fan,
  blob,
  PDJ,
  fan2,
  rings2,
  eyefish,
  bubble,
  vCylinder,
  vPerspective,
  juliaN,
  juliaScope,
  pie,
  ngon,
  curl,
  rectangles,
  arch,
  tangent,
  blade,
  twinTrian,
  cross,
];

//setting params to be used in functions later
const blobParams = {
  high: 1 + Math.random() * 0.2 - 0.1,
  low: Math.random() * 2 - 1,
  waves: Math.floor(Math.random() * 20) + 1,
};

const pdjParams = {
  a: Math.random() * 6 - 3,
  b: Math.random() * 6 - 3,
  c: Math.random() * 6 - 3,
  d: Math.random() * 6 - 3,
};

const fan2Params = {
  x: Math.random() * 0.9 + 1,
  y: Math.random() * 8 - 4,
};

const rings2Val = Math.floor(Math.random() * 5 + 1) * 0.25;

const perspectiveParams = {
  angle: Math.random(),
  distance: Math.random(),
};

const ngonParams = {
  power: Math.floor(Math.random() * 4) - 1,
  sides:
    (Math.floor(Math.random() * 8) + 1) * (Math.round(Math.random()) * 2 - 1),
  corners: Math.random() * 2 - 1,
  circle: Math.random() * 1.5,
};

const pieParams = {
  slices: Math.floor(Math.random() * 13),
  rotation: Math.random(),
  thickness: Math.random(),
};

const curlParams = {
  c1: Math.random(),
  c2: Math.random(),
};

const rectanglesParams = {
  x: Math.random(),
  y: Math.random(),
};

//FUNCTIONS
function linear(x, y) {
  return [x, y];
}

function sinusoidal(x, y) {
  return [Math.sin(x), Math.sin(y)];
}

function spherical(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return [x / Math.pow(r, 2), y / Math.pow(r, 2)];
}

function swirl(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return [
    x * Math.sin(Math.pow(r, 2)) - y * Math.cos(Math.pow(r, 2)),
    x * Math.cos(Math.pow(r, 2)) + y * Math.sin(Math.pow(r, 2)),
  ];
}

function horseshoe(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  return [(1 / r) * (x - y) * (x + y), (1 / r) * 2 * x * y];
}

function polar(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [th / Math.PI, r - 1];
}

function handkerchief(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [r * Math.sin(th + r), r * Math.cos(th - r)];
}

function heart(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [r * Math.sin(th * r), r * -Math.cos(th * r)];
}

function disc(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [
    (th / Math.PI) * Math.sin(Math.PI * r),
    (th / Math.PI) * Math.cos(Math.PI * r),
  ];
}

function spiral(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [
    (1 / r) * (Math.cos(th) + Math.sin(r)),
    (1 / r) * (Math.sin(th) - Math.cos(r)),
  ];
}

function hyperbolic(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [Math.sin(th) / r, r * Math.cos(th)];
}

function diamond(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  return [Math.sin(th) * Math.cos(r), Math.cos(th) * Math.sin(r)];
}

function ex(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var th = Math.atan2(y, x);
  var p0 = Math.sin(th + r);
  var p1 = Math.cos(th - r);
  return [
    r * (Math.pow(p0, 3) + Math.pow(p1, 3)),
    r * (Math.pow(p0, 3) - Math.pow(p1, 3)),
  ];
}

function julia(x, y) {
  let ohm = Math.random() < 0.5 ? Math.PI : 0;
  let theta = Math.atan(x / y);
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let ox = Math.sqrt(r) * Math.cos(theta / 2 + ohm);
  let oy = Math.sqrt(r) * Math.sin(theta / 2 + ohm);
  return [ox, oy];
}

function bent(x, y) {
  if (x >= 0 && y >= 0) return [x, y];
  else if (x < 0 && y >= 0) return [2 * x, y];
  else if (x >= 0 && y < 0) return [x, y / 2];
  else return [2 * x, y / 2];
}

function waves(x, y, func) {
  let { b, c, e, f } = func;
  if (c == 0) c = 0.0001;
  if (f == 0) f = 0.0001;
  let output = [
    x + b * Math.sin(y / Math.pow(c, 2)),
    y + e * Math.sin(x / Math.pow(f, 2)),
  ];
  return output;
}

function fisheye(x, y) {
  var re = 2 / (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + 1);
  return [re * y, re * x];
}

function popcorn(x, y, func) {
  let { c, f } = func;

  let output = [
    x + c * Math.sin(Math.tan(3 * y)),
    y + f * Math.sin(Math.tan(3 * x)),
  ];
  return output;
}

function exponential(x, y) {
  let ex = Math.exp(x - 1);
  let output = [ex * Math.cos(Math.PI * y), ex * Math.sin(Math.PI * y)];
  return output;
}

function power(x, y) {
  var th = Math.atan2(y, x);
  var rsth = Math.pow(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), Math.sin(th));
  return [rsth * Math.cos(th), rsth * Math.sin(th)];
}

function cosine(x, y) {
  let output = [
    Math.cos(Math.PI * x) * Math.cosh(y),
    -1 * Math.sin(Math.PI * x) * Math.sinh(y),
  ];
  return output;
}

function rings(x, y, func) {
  let { c } = func;
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let th = Math.atan2(y, x);
  let re =
    modn(r + Math.pow(c, 2), 2 * Math.pow(c, 2)) -
    Math.pow(c, 2) +
    r * (1 - Math.pow(c, 2));
  return [re * Math.cos(th), re * Math.sin(th)];
}

function fan(x, y, func) {
  let f = func.f;
  let c = func.c;
  let t = Math.PI * Math.pow(c, 2);
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let theta = Math.atan2(y, x);
  if (modn(theta + f, t) > t / 2) {
    return [r * Math.cos(theta - t / 2), r * Math.sin(theta - t / 2)];
  } else {
    return [r * Math.cos(theta + t / 2), r * Math.sin(theta + t / 2)];
  }
}

function blob(x, y) {
  let { high: h, low: l, waves: w } = blobParams;
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let theta = Math.atan(x / y);
  let b = l + ((h - l) / 2) * (Math.sin(w * theta) + 1);
  let output = [r * b * Math.cos(theta), r * b * Math.sin(theta)];
  return output;
}

function PDJ(x, y) {
  let { a, b, c, d } = pdjParams;
  let output = [
    Math.sin(a * y) - Math.cos(b * x),
    Math.sin(c * x) - Math.cos(d * y),
  ];

  return output;
}

function fan2(x, y) {
  let { x: fx, y: fy } = fan2Params;
  let theta = Math.atan(x / y);
  let p1 = Math.PI * Math.pow(fx, 2);
  let p2 = fy;
  let t = theta + p2 - p1 * Math.floor((2 * theta * p2) / p1);
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let output;

  if (t > p1 / 2) {
    output = [r * Math.sin(theta - p1 / 2), r * Math.cos(theta - p1 / 2)];
  } else {
    output = [r * Math.sin(theta + p1 / 2), r * Math.cos(theta + p1 / 2)];
  }

  return output;
}

function rings2(x, y) {
  let p = Math.pow(rings2Val, 2);
  let theta = Math.atan(x / y);
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let t = r - 2 * p * Math.floor((r + p) / (2 * p)) + r * (1 - p);
  let output = [t * Math.sin(theta), t * Math.cos(theta)];
  return output;
}

function eyefish(x, y) {
  var re = 2 / (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) + 1);
  return [re * x, re * y];
}

function bubble(x, y) {
  var re = 4 / (Math.pow(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), 2) + 4);
  return [re * x, re * y];
}

function vCylinder(x, y) {
  return [Math.sin(x), y];
}

function vPerspective(x, y) {
  let { angle, distance } = perspectiveParams;
  let p = distance / (distance - y * Math.sin(angle));
  let output = [p * x, p * y * Math.cos(angle)];

  return output;
}

function vNoise(x, y) {
  var p1 = Math.random();
  var p2 = Math.random();
  return [
    p1 * x * Math.cos(2 * Math.PI * p2),
    p1 * y * Math.sin(2 * Math.PI * p2),
  ];
}

function juliaN(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var ph = Math.atan2(x, y);
  var p1 = 1;
  var p2 = 0.75;
  let rnd = r || 0.5;
  var p3 = Math.trunc(Math.abs(p1) * rnd);
  var t = (ph + 2 * Math.PI * p3) / p1;
  var rpp = Math.pow(r, p2 / p1);

  return [rpp * Math.cos(t), rpp * Math.sin(t)];
}

function juliaScope(x, y) {
  var p1 = 1;
  var p2 = 0.75;
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  var ph = Math.atan2(x, y);
  let rnd = r || 0.5;
  var p3 = Math.trunc(Math.abs(p1) * rnd);
  let lambda = Math.random() < 0.5 ? 1 : -1;
  let t = (lambda * ph + 2 * Math.PI * p3) / p1;
  var rpp = Math.pow(r, p2 / p1);
  return [rpp * Math.cos(t), rpp * Math.sin(t)];
}

function blur() {
  var p1 = Math.random();
  var p2 = Math.random();
  return [p1 * Math.cos(2 * Math.PI * p2), p1 * Math.sin(2 * Math.PI * p2)];
}

function gaussian() {
  let k = 0;
  for (let i = 0; i < 4; i++) {
    k += Math.random();
  }
  k -= 2;
  let rand = Math.random();
  let output = [
    k * Math.cos(2 * Math.PI * rand),
    k * Math.sin(2 * Math.PI * rand),
  ];
  return output;
}

function radialBlur(x, y) {
  var r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let p1 = radialBlurAngle * (Math.PI / 2);
  let ph = Math.atan2(x, y);
  let t1 = v36();
  let t2 = ph + t1 * Math.sin(p1);
  let t3 = t1 * Math.cos(p1) - 1;
  let output = [
    (1 / v36()) * (r * Math.cos(t2) + t3 * x),
    (1 / v36()) * (r * Math.sin(t2) + t3 * y),
  ];
  return output;
}

function pie() {
  let { slices, thickness, rotation } = pieParams;
  let t1 = Math.floor(Math.random() * slices + 0.5);
  let t2 =
    rotation + ((2 * Math.PI) / slices) * (t1 + Math.random() * thickness);
  let rand = Math.random();
  let output = [rand * Math.cos(t2), rand * Math.sin(t2)];
  return output;
}

function ngon(x, y) {
  let { power, sides, corners, circle } = ngonParams;
  let phi = Math.atan2(x, y);
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let p1 = power;
  let p2 = (2 * Math.PI) / sides;
  let p3 = corners;
  let p4 = circle;
  let t3 = phi - p2 * Math.floor(phi / p2);
  let t4 = t3 > p2 / 2 ? t3 : t3 - p2;
  let k = (p3 * (1 / Math.cos(t4) - 1) + p4) / Math.pow(r, p1);

  return [k * x, k * y];
}

function curl(x, y) {
  let { c1: p1, c2: p2 } = curlParams;

  let t1 = 1 + p1 * x + p2 * (Math.pow(x, 2) - Math.pow(y, 2));
  let t2 = p1 * y + 2 * p2 * x * y;
  let multiplier = 1 / (Math.pow(t1, 2) + Math.pow(t2, 2));
  let output = [multiplier * (x * t1 + y * t2), multiplier * (y * t1 - x * t2)];

  return output;
}

function rectangles(x, y) {
  let { x: p1, y: p2 } = rectanglesParams;
  let output = [
    (2 * Math.floor(x / p1) + 1) * p1 - x,
    (2 * Math.floor(y / p2) + 1) * p2 - y,
  ];
  return output;
}

function arch() {
  let rand = Math.random() * Math.PI;
  let output = [Math.sin(rand), Math.pow(Math.sin(rand), 2) / Math.cos(rand)];

  return output;
}

function tangent(x, y) {
  return [Math.sin(x) / Math.cos(y), Math.tan(y)];
}

function vSquare() {
  var p1 = Math.random();
  var p2 = Math.random();
  return [p1 - 0.5, p2 - 0.5];
}

function blade(x, y) {
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let rand = Math.random() * r;
  let output = [
    x * (Math.cos(rand) + Math.sin(rand)),
    x * (Math.cos(rand) - Math.sin(rand)),
  ];
  return output;
}

function twinTrian(x, y) {
  let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  let rand = Math.random() * r;
  let t = Math.log10(Math.pow(Math.sin(rand), 2)) + Math.cos(rand);
  let output = [x * t, t - Math.PI * Math.sin(rand)];
  return output;
}

function cross(x, y) {
  var s = Math.sqrt(1 / Math.pow(Math.pow(x, 2) - Math.pow(y, 2), 2));
  return [s * x, s * y];
}

function modn(n, m) {
  return ((n % m) + m) % m;
}

function v36() {
  let k = 0;
  for (let i = 0; i < 4; i++) {
    k += Math.random();
  }
  return k - 2;
}

export { warpArray, finalWarpArray };
