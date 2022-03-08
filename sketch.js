const canvas = $('canvas');
const c = canvas.getContext('2d');

//this object holds all of the settings for our fractal
const S = {
    width: 800,
    height: 800,
    startIFS: null,
    endIFS: null,
    weights: null,
    shuffledVariations: null,
    finalTransformation: null,
    palette: null,
    seed: 0
}

//this object holds all of the global variables that get regularly updated
const G = {
    x: 0,
    y: 0,
    xOut: 0,
    yOut: 0,
    f: null,
    p1: 0,
    p2: 0,
    stroke: null
}

// let startIFS, endIFS, weights, shuffledVariations, finalTransformation, palette, projectSeed;
let PPL = 10000;// points per loop
let totalFrameCount;
let frameNum = 0;

function setup() {
    canvas.width = S.width;
    canvas.height = S.height;

    c.fillStyle = 'rgb(255, 255, 255)';
    c.fillRect(0, 0, S.width, S.height);

    init();
}
setup();
setInterval(() => {
    for (let i = 0; i < 1000; i++) {
        draw();

    }
})

function init() {
    // initialize x and y in random bipolar grid
    G.x = Util.random(-1, 1);
    G.y = Util.random(-1, 1);

    // pick and IFS to start and end
    S.startIFS = Util.random(IFSs);
    S.endIFS = Util.random(IFSs);

    // sets weighting for variation functions
    S.variationFuncWeights = randomWeights(variationFunctions.length);

    // shuffle weighting array for better randomness
    S.shuffledVariations = Util.shuffle(variationFunctions);

    // pick a final variation function
    S.finalVariation = Util.random(finalVariationFunctions);

    // pick and randomize palette
    S.palette = new Palette(Util.random(Palette.urls));
    console.log(S.palette);

    // for debugging
    console.log(`Initial IFS: ${S.startIFS.name}, \nFinal IFS: ${S.finalVariation.name}, \nFinal Variation: ${S.endIFS.name}`);
}

function draw() {
    // img.loadPixels();
    // pick the random variation function for this loop through
    let randomFuncIndex = probPick(S.variationFuncWeights);
    let currentVariation = S.shuffledVariations[randomFuncIndex];

    // starting IFS function
    [G.x, G.y, G.f, G.p1] = S.startIFS(G.x, G.y);

    // weighted random variation function
    [G.x, G.y] = currentVariation(G.x, G.y, G.f);

    // starting IFS function
    [G.x, G.y, G.f, G.p2] = S.endIFS(G.x, G.y);

    // final transformation function
    [G.x, G.y] = S.finalVariation(G.x, G.y, G.f);

    // map x y to canvas proportions
    G.xOut = Util.map(G.x, -1.5, 1.5, 0, S.width);
    G.yOut = Util.map(G.y, -1.5, 1.5, 0, S.height);

    //color point
    let colorInterpolation = ((randomFuncIndex / (S.variationFuncWeights.length - 1)) + G.p1 + G.p2) / 3

    G.stroke = S.palette.paletteInterpolate(colorInterpolation);
    c.strokeStyle = G.stroke;

    c.strokeRect(G.xOut, G.yOut, 0.001, 0.001);
}
