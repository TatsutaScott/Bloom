function $(id) { return document.getElementById(id); }

const Util = {
    perlin: tooloud.Perlin.create(Math.floor(Math.random() * 100)),
    map: (num, inLo, inHi, outLo, outHi) => {
        const inScale = (num - inLo) / (inHi - inLo);
        const outScale = outHi - outLo;
        return (inScale * outScale) + outLo;
    },
    random: (a, b) => {
        if (typeof (a) == 'number' && typeof (b) == 'number') {
            const lo = Math.min(a, b);
            const hi = Math.max(a, b);
            const range = hi - lo;
            return (Math.random() * range) + lo;
        } else if (Array.isArray(a)) {
            return a[Math.floor(Math.random() * a.length)];
        }
    },
    shuffle: (arr) => {
        let rnd, tmp, idx = arr.length;
        while (idx > 1) {
            rnd = (Util.random(0, 1) * idx) | 0;

            tmp = arr[--idx];
            arr[idx] = arr[rnd];
            arr[rnd] = tmp;
        }

        return arr;
    }
}

function randomWeights(num) {
    let arr = [];
    arr.push(0);
    for (let i = 0; i < num - 1; i++) {
        let rand = Math.round(Util.perlin.noise(i / num) * 10000);
        arr.push(rand);
    }

    arr.sort();
    return arr;
}

function probPick(arr) {
    let num = Math.round(Math.random() * 10000);
    for (let i = 0; i < arr.length; i++) {
        if (num < arr[i]) {
            return i - 1;
        }
    }
    return arr.length - 1;
}

function imgName(seed) {
    const date = new Date();
    const [month, day, year] = [
        date.getMonth(),
        date.getDate(),
        date.getFullYear(),
    ];
    return `${month + 1}.${day}.${year}.${seed}`;
}


