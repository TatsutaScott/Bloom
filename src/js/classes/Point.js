import Vec from "@/js/classes/Vector";
import { map } from "@/js/util/math_util";
import Color from "@/js/classes/Color";

/** a class describing a point */
export default class Point {
  /** makes a point
   * @param {object} context - the canvas's drawing context
   */
  constructor(context) {
    this.width = context.canvas.width;
    this.height = context.canvas.height;
    this.position = new Vec(0, 0);
    this.outPosition = new Vec(0, 0);
    this.currFunction = null;
    this.startP = 0;
    this.endP = 0;
    this.stroke = new Color(0, 0, 0, 1);
    this.size = 1;
    this.alpha = 1;
  }
}

/** Utility function to print out point information */
Point.prototype.print = function () {
  const pos = `position: (${this.position.x}, ${this.position.y})\n`;
  const out = `out: (${this.outPosition.x}, ${this.outPosition.y})\n`;
  const f = `f: ${this.currFunction} \n`;
  const p1 = `p1: ${this.p1} \n`;
  const p2 = `p2: ${this.p2} \n`;
  const stroke = `stroke: ${this.stroke.printString()}`;
  console.log("Point data: \n" + pos + out + f + p1 + p2 + stroke);
};

/** update the position of the scaled output vector */
Point.prototype.updatePosition = function () {
  this.outPosition.x = map(this.position.x, -1.5, 1.5, 0, this.width);
  this.outPosition.y = map(this.position.y, -1.5, 1.5, 0, this.height);
};

/** draw the point to the canvas
 * @param {object} context - canvas drawing context
 */
Point.prototype.draw = function (context) {
  this.updatePosition();
  this.stroke.setStroke(context, this.alpha);
  this.stroke.setFill(context, this.alpha);
  context.fillRect(
    this.outPosition.x,
    this.outPosition.y,
    this.size,
    this.size
  );
};

/** Runs a point through an IFS function and updates its data in accordance
 * @param {() => [number]} IFS - the function to run on the point
 * @param {string} startEnd - whether or not it is the first or last IFS. options: ['START' or 'END']
 */
Point.prototype.runIFS = function (IFS, startEnd) {
  const [x, y, f, p] = IFS(this.position.x, this.position.y); // run point through the IFS functi

  if (startEnd == "START") {
    this.position.set(x, y); // set the points position
    this.currFunction = f; // set the function
    this.p1 = p; // set p1 if its the start IFS
  } else if (startEnd == "END") {
    this.p2 = p; // set p2 if its the end IFS
  }
};

/** Runs a point through a warp function and update its position
 * @param {() => [number]} warp - warping function to be run on the point
 */
Point.prototype.runWarp = function (warp) {
  const [x, y] = warp(this.position.x, this.position.y, this.currFunction); // run the warp function
  this.position.set(x, y); // set the position of the point
};

/** Sets the size of the point when its drawn
 * @param {number} size - the size in pixels
 */
Point.prototype.setSize = function (size) {
  this.size = size;
};

/** Sets the dimensions of the canvas or bounds that the point is drawn too.
 * @param {number} width - width of the canvas or bounds
 * @param {number} height - height of canvas or bounds
 */
Point.prototype.setDimensions = function (width, height) {
  this.width = width;
  this.height = height;
};

Point.prototype.setAlpha = function (alpha) {
  this.alpha = alpha;
};
