function runFunc(x, y, func) {
    const px = func.a * x + func.b * y + func.e;
    const py = func.c * x + func.d * y + func.f;
    return [px, py];
}

const IFSs = [
    boxFractal = (x, y) => {
        const funcs = [
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 0, p: 0 / 4 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 2 / 3, p: 1 / 4 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 1 / 3, f: 1 / 3, p: 2 / 4 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 2 / 3, f: 0, p: 3 / 4 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 2 / 3, f: 2 / 3, p: 4 / 4 },
        ];

        x = Util.map(x, -1, 1, 0, 1);
        y = Util.map(y, -1, 1, 0, 1);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, 0, 1, -1, 1);
        y = Util.map(y, 0, 1, -1, 1);

        return [x, y, f, p];
    },
    kochSnowflake = (x, y) => {
        const funcs = [
            { a: 1 / 2, b: (-1 * Math.sqrt(3)) / 6, c: Math.sqrt(3) / 6, d: 1 / 2, e: 0, f: 0, p: 0 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 1 / Math.sqrt(3), f: 1 / 3, p: 1 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 2 / 3, p: 2 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: -1 / Math.sqrt(3), f: 1 / 3, p: 3 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: -1 / Math.sqrt(3), f: -1 / 3, p: 4 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: -2 / 3, p: 5 / 6 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 1 / Math.sqrt(3), f: -1 / 3, p: 6 / 6 },
        ];

        const f = Util.random(funcs);
        const p = f.p;

        [x, y] = runFunc(x, y, f);

        return [x, y, f, p];
    },
    sierpinskiTriangle = (x, y) => {
        const funcs = [
            { a: 1 / 2, b: 0, c: 0, d: 1 / 2, e: 0, f: 0, p: 0 / 2 },
            { a: 1 / 2, b: 0, c: 0, d: 1 / 2, e: 1 / 2, f: 0, p: 1 / 2 },
            { a: 1 / 2, b: 0, c: 0, d: 1 / 2, e: 1 / 4, f: Math.sqrt(3) / 4, p: 2 / 2 },
        ];

        x = Util.map(x, -1, 1, 0, 1);
        y = Util.map(y, -1, 1, 0, 1);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, 0, 1, -1, 1);
        y = Util.map(y, 0, 1, -1, 1);
        return [x, y, f, p];
    },
    sierpinskiCarpet = (x, y) => {
        const funcs = [
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 0, p: 0 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 1 / 3, p: 1 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 0, f: 2 / 3, p: 2 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 1 / 3, f: 0, p: 3 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 1 / 3, f: 2 / 3, p: 4 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 2 / 3, f: 0, p: 5 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 2 / 3, f: 1 / 3, p: 6 / 7 },
            { a: 1 / 3, b: 0, c: 0, d: 1 / 3, e: 2 / 3, f: 2 / 3, p: 7 / 7 },
        ];

        x = Util.map(x, -1, 1, 0, 1);
        y = Util.map(y, -1, 1, 0, 1);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, 0, 1, -1, 1);
        y = Util.map(y, 0, 1, -1, 1);

        return [x, y, f, p];
    },
    barnsleyFern = (x, y) => {
        const funcs = [
            { a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0 / 3 },
            { a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.6, p: 1 / 3 },
            { a: 0.2, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.6, p: 2 / 3 },
            { a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 3 / 3 },
        ];

        const r = random();
        let f;

        if (r < 0.01) {
            f = funcs[0];
        } else if (r < 0.08) {
            f = funcs[2];
        } else if (r < 0.15) {
            f = funcs[3];
        } else {
            f = funcs[1];
        }

        const p = f.p;
        x = Util.map(x, -1, 1, -2.182, 2.6558);
        y = Util.map(y, 1, -1, 0, 9.9983);

        [x, y] = runFunc(x, y, f);

        x = Util.map(x, -2.182, 2.6558, -1, 1);
        y = Util.map(y, 0, 9.9983, 1, -1);

        return [x, y, f, p];
    },
    levyDragon = (x, y) => {
        const funcs = [
            { a: 1 / 2, b: -1 / 2, c: 1 / 2, d: 1 / 2, e: 0, f: 0, p: 0 },
            { a: 1 / 2, b: 1 / 2, c: -1 / 2, d: 1 / 2, e: 1 / 2, f: 1 / 2, p: 1 },
        ];

        x = Util.map(x, -1, 1, 1 / 2, 3 / 2);
        y = Util.map(y, -1, 1, -1 / 4, 1);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, 1 / 2, 3 / 2, -1, 1);
        y = Util.map(y, -1 / 4, 1, -1, 1);

        return [x, y, f, p];
    },
    heighwayDragon = (x, y) => {
        const funcs = [
            { a: 1 / 2, b: -1 / 2, c: 1 / 2, d: 1 / 2, e: 0, f: 0, p: 0 },
            { a: -1 / 2, b: -1 / 2, c: 1 / 2, d: -1 / 2, e: 1, f: 0, p: 1 },
        ];

        x = Util.map(x, -1, 1, -2 / 6, 7 / 6);
        y = Util.map(y, -1, 1, -2 / 6, 7 / 6);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, -2 / 6, 7 / 6, -1, 1);
        y = Util.map(y, -2 / 6, 7 / 6, -1, 1);

        return [x, y, f, p];
    },
    goldenDragon = (x, y) => {
        const funcs = [
            { a: 0.62367, b: -0.40337, c: 0.40337, d: 0.62367, e: 0, f: 0, p: 0 },
            { a: -0.37633, b: -0.40337, c: 0.40337, d: -0.37633, e: 1, f: 0, p: 1 },
        ];

        x = Util.map(x, -1, 1, -0.5, 1.25);
        y = Util.map(y, -1, 1, -0.5, 1);

        const f = Util.random(funcs);
        const p = f.p;
        [x, y] = runFunc(x, y, f);

        x = Util.map(x, -0.5, 1.25, -1, 1);
        y = Util.map(y, -0.5, 1, -1, 1);

        return [x, y, f, p];
    }
];
