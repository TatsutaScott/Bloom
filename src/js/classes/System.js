import {
  random,
  generateStochasticMap,
  stochasticMapRandom,
} from "../util/random_util";
// import Palette from "./palette";
import { IFSArray } from "../functions/IFS.js";
import { warpArray, finalWarpArray } from "../functions/warping.js";

/** a class representing a fractal flame system */
export default class System {
  /** Make a Flame Fractal system
   * @param {object} context - the canvas drawing context being used
   */
  constructor(context) {
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.randomInit();
  }
}

/** Randomly initialize the settings in the system */
System.prototype.randomInit = function () {
  this.startIFS = random(IFSArray); // pick an IFS to start the system
  this.endIFS = random(IFSArray); // pick an IFS to end the system
  this.warpFunctions = generateStochasticMap(warpArray); // get the warp functions and give them weightings
  this.finalWarp = random(finalWarpArray); // pick an ending warp function
  this.palette = Palette.randomPalette(); // pick a random palette
};

/** utility function to print out the system info */
System.prototype.print = function () {
  const initIFS = `Initial IFS: ${this.startIFS.name}\n`;
  const finalISF = `Final IFS: ${this.endIFS.name}\n`;
  const finalWarp = `Final warp: ${this.finalWarp.name}`;
  console.log("System Settings:\n" + initIFS + finalISF + finalWarp);
  this.palette.print();
};

/** Main function. runs through the all of the functions and then draws to the canvas at the end
 * @param {Point} point - a point object to track position etc
 */
System.prototype.cycle = function (point, context) {
  this.runStartIFS(point);
  this.runRandomWarp(point);
  this.runEndIFS(point);
  this.runFinalWarp(point);

  const colorInterp = (this.warpRatio + point.p1 + point.p2) / 3; // average out func prob and warp
  if (colorInterp < 0) {
    console.log(this.warpRatio, point.p1, point.p2);
  }

  point.stroke = this.palette.interpolate(colorInterp); // use the prev value to pick a color out of the palette
  point.draw(context); //draw the point
};

/** step 1 in the cycle. Run a point through the starting IFS
 * @param {Point} point - the point being ran through the system
 */
System.prototype.runStartIFS = function (point) {
  point.runIFS(this.startIFS, "START");
};

/** step 2 in the cycle. Run a point through a random warp function
 * @param {Point} point - the point being ran through the system
 */
System.prototype.runRandomWarp = function (point) {
  const currentWarp = stochasticMapRandom(this.warpFunctions); // pick out a random warp function
  point.runWarp(currentWarp); // run the warp function

  const currentWarpIndex = this.warpFunctions.findIndex(
    (x) => x.content == currentWarp
  ); // find the index of the warp function in the warp array
  if (currentWarpIndex < 0) {
    console.log(currentWarpIndex, currentWarp);
  }
  this.warpRatio = currentWarpIndex / (this.warpFunctions.length - 1); // find the ratio of the warp function index compared to the array
};

/** step 3 in the cycle. Run a point through the ending IFS
 * @param {Point} point - point to run through the system
 */
System.prototype.runEndIFS = function (point) {
  point.runIFS(this.endIFS, "END");
};

/** step 4 in the cycle. Run a point through the final warp
 * @param {Point} point - the point being ran through the system
 */
System.prototype.runFinalWarp = function (point) {
  point.runWarp(this.finalWarp);
};

System.prototype.setDimensions = function (width, height) {
  this.width = width;
  this.height = height;
};

System.prototype.setStartIFS = function (name) {
  const newFunction = IFSArray.find((f) => f.name == name);
  this.startIFS = newFunction;
};

System.prototype.setEndIFS = function (name) {
  const newFunction = IFSArray.find((f) => f.name == name);
  this.endIFS = newFunction;
};

System.prototype.setEndWarp = function (name) {
  const newFunction = finalWarpArray.find((f) => f.name == name);
  this.finalWarp = newFunction;
};

System.prototype.randomizeWarps = function () {
  this.warpFunctions = generateStochasticMap(warpArray); // get the warp functions and give them weightings
  return this.warpFunctions;
};
