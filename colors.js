class Palette {
    constructor(a) {
        if (arguments.length == 0) {

        }
        if (Array.isArray(a)) {
            this.colors = a;
            this.weighted = randomizeWeighting(a);
        }
        if (typeof (a) == 'string') {
            let colorsArray = Palette.coolorPalette(a);
            this.colors = colorsArray;
            this.weighted = randomizeWeighting(colorsArray);
        }
    }

    static coolorPalette(url) {
        let slashIndex = url.lastIndexOf("/");
        let colStr = url.slice(slashIndex + 1);
        let cols = colStr.split("-");
        for (let i = 0; i < cols.length; i++) cols[i] = "#" + cols[i];
        for (let i = 0; i < cols.length; i++) {
            let c = cols[i];
            cols[i] = c;
        }
        return cols;
    }

    static interpolate(a, b, interp) {
        const c1 = !Array.isArray(a) ? hexToRGB(a) : a;
        const c2 = !Array.isArray(b) ? hexToRGB(b) : b;
        const c3 = [];
        for (let i = 0; i < c1.length; i++) {
            c3.push(c1[i] + (c2[i] - c1[i]) * interp);
        }
        return c3;
    }

    print() {
        for (let c of this.colors) {
            console.log(c)
        }
    }
    addColor(color) {
        this.colors.push(color);
        this.weighted = randomWeights(this.colors);
    }

    random() {
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        return randomColor;
    }

    weightedRandom() {
        const randomColor = this.weighted[Math.floor(Math.random() * this.weighted.length)];
        return randomColor;
    }

}

function randomizeWeighting(arr) {
    const weighted = [];
    for (let index of arr) {
        const randomWeighting = Math.floor(Math.random() * 100);
        for (let i = 0; i < randomWeighting; i++) {
            weighted.push(index);
        }
    }
    return weighted;
}

function hexToRGB(hex) {
    const rHex = hex.slice(1, 3);
    const gHex = hex.slice(3, 5);
    const bHex = hex.slice(5, 7);
    const rgb = [
        parseInt(rHex, 16),
        parseInt(gHex, 16),
        parseInt(bHex, 16)
    ];
    return rgb;
}

//Utility functions 
function bg(r, g, b) {
    c.fillStyle = `rgb(${r}, ${g}, ${b})`;
    c.fillRect(0, 0, S.width, S.height);
}

// //--------------------------USEFUL VARBIABLES--------------------------//
// //list of selected Coolerp palettes
const urls = [
    // 2 colors
    'https://coolors.co/1f0318-e5f2c9',
    'https://coolors.co/ffcab1-69a2b0',
    'https://coolors.co/ca2e55-ffe0b5',
    'https://coolors.co/f2ff49-ff4242',
    'https://coolors.co/8cb369-ffcfd2',
    // 3 colors
    'https://coolors.co/c97b84-a85751-7d2e68',
    'https://coolors.co/ed6a5a-f4f1bb-9bc1bc',
    'https://coolors.co/ef767a-456990-49beaa',
    'https://coolors.co/dad6d6-92bfb1-f4ac45',
    'https://coolors.co/f6e8ea-ef626c-22181c',
    // 4 colors
    'https://coolors.co/156064-00c49a-f8e16c-ffc2b4',
    'https://coolors.co/ffbe0b-fb5607-ff006e-8338ec',
    'https://coolors.co/f1bf98-e1f4cb-bacba9-717568',
    'https://coolors.co/713e5a-63a375-edc79b-d57a66',
    'https://coolors.co/23f0c7-ef767a-7d7abc-6457a6',
    // 5 colors
    'https://coolors.co/dfd6a7-f7ce5b-f7b05b-af9b46-1f1300',
    'https://coolors.co/c5d86d-261c15-f7f7f2-e4e6c3-f05d23',
    'https://coolors.co/e3c0d3-95818d-576066-2c514c-122932',
    'https://coolors.co/c1c1c1-2c4251-d16666-b6c649-ffffff',
    'https://coolors.co/592941-498467-52b788-b2d3a8-ede5a6',
    // 6 colors
    'https://coolors.co/ffe0b5-ede580-a4af69-4c2719-d35269-585563',
    'https://coolors.co/5a7d7c-dadff7-232c33-a0c1d1-b5b2c2-f5e960',
    'https://coolors.co/160f29-246a73-368f8b-f3dfc1-ddbea8-fcbfb7',
    'https://coolors.co/fcd0a1-b1b695-53917e-63535b-6d1a36-242325',
    'https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c-6c5a49'
];