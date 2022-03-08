const canvas = $('canvas');
const c = canvas.getContext('2d');

const S = {
    width: 800,
    height: 800
}

let x, y, f, p;
let startIFS, endIFS, weights, shuffledVariations, finalTransformation, palette, projectSeed;
let PPL = 10000;// points per loop
let totalFrameCount;
let img;
let frameNum = 0;
let progressImg = false;
let imgWidth = 8000;
let imgHeight = 8000;

function setup() {
    canvas.width = S.width;
    canvas.height = S.height;

    c.fillStyle = 'rgb(255, 255, 255)';
    c.fillRect(0, 0, S.width, S.height);

    // init();
}
setup();
// function draw(){

// }

// function init() {
//     projectSeed = int(random(100000));
//     randomSeed(projectSeed);

//     // set total frame count to know when to restart
//     totalFrameCount = (width * height * 5) / PPL;

//     // reset background
//     background(255);

//     // initialize x and y in random bipolar grid
//     x = random(-1, 1);
//     y = random(-1, 1);

//     // pick and IFS to start and end
//     startIFS = random(IFSs);
//     endIFS = random(IFSs);


//     // sets weighting for variation functions
//     variationFuncWeights = randomWeights(variationFunctions.length);

//     // shuffle weighting array for better randomness
//     shuffledVariations = shuffle(variationFunctions);

//     // pick a final variation function
//     finalVariation = random(finalVariationFunctions);

//     // pick and randomize palette
//     let url = random(urls);
//     palette = createPalette(url);
//     palette = shuffle(palette);

//     // for debugging
//     console.log(`Initial IFS: ${startIFS.name}, \nFinal IFS: ${finalVariation.name}, \nFinal Variation: ${endIFS.name}`);

//     //set background color to white
//     imgReset(img);
// }
// function draw() {
//     img.loadPixels();
//     for (let i = 0; i < PPL; i++) {
//         // pick the random variation function for this loop through
//         let randomFuncIndex = probPick(variationFuncWeights);
//         let currentVariation = shuffledVariations[randomFuncIndex];

//         // starting IFS function
//         [x, y, f, p1] = startIFS(x, y);

//         // weighted random variation function
//         [x, y] = currentVariation(x, y, f);

//         // starting IFS function
//         [x, y, f, p2] = endIFS(x, y);

//         // final transformation function
//         [x, y] = finalVariation(x, y, f);

//         // map x y to canvas proportions
//         let nx = map(x, -1.5, 1.5, 0, imgWidth);
//         let ny = map(y, -1.5, 1.5, 0, imgHeight);

//         // color point
//         let colorInterpolation = ((randomFuncIndex / (variationFuncWeights.length - 1)) + p1 + p2) / 3
//         c = coolerp(palette, colorInterpolation);
//         // stroke(c);

//         // draw point
//         // point(nx, ny);
//         img.set(nx, ny, c);

//     }
//     img.updatePixels();
//     image(img, 0, 0, width, height);

//     if (progressImg) {
//         // returns progress report
//         if ((frameCount / totalFrameCount) % 0.01 === 0) {
//             let progressPercent = (frameCount / totalFrameCount) * 100;
//             let fps = frameRate();
//             console.log(`Image is ${progressPercent}% done. \nFPS: ${fps}`);
//             let name = imgName(projectSeed);
//             saveCanvas(`${name}_${frameNum}`, 'png');
//             frameNum++;
//         }
//     }

//     if (frameCount % totalFrameCount === 0) {
//         // gives name based on date and random seed
//         let name = imgName(projectSeed);

//         //saves file and reinitializes program
//         img.save(name, 'png');
//         init();
//     }
// }

// function init() {
//     projectSeed = int(random(100000));
//     randomSeed(projectSeed);

//     // set total frame count to know when to restart
//     totalFrameCount = (width * height * 5) / PPL;

//     // reset background
//     background(255);

//     // initialize x and y in random bipolar grid
//     x = random(-1, 1);
//     y = random(-1, 1);

//     // pick and IFS to start and end
//     startIFS = random(IFSs);
//     endIFS = random(IFSs);


//     // sets weighting for variation functions
//     variationFuncWeights = randomWeights(variationFunctions.length);

//     // shuffle weighting array for better randomness
//     shuffledVariations = shuffle(variationFunctions);

//     // pick a final variation function
//     finalVariation = random(finalVariationFunctions);

//     // pick and randomize palette
//     let url = random(urls);
//     palette = createPalette(url);
//     palette = shuffle(palette);

//     // for debugging
//     console.log(`Initial IFS: ${startIFS.name}, \nFinal IFS: ${finalVariation.name}, \nFinal Variation: ${endIFS.name}`);

//     //set background color to white
//     imgReset(img);
// }

// function imgReset(img) {
//     img.loadPixels();
//     for (let i = 0; i < img.pixels.length; i++) {
//         img.pixels[i] = 255;
//     }
//     img.updatePixels();
// }