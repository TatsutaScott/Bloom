import System from "@/js/classes/System";
import Point from "@/js/classes/Point";

/** Initializes the system by generating the basic conditions
 * @returns {[System, Point]} system object and point object
 */
export function init(context) {
  const system = new System(context); //make a system
  const point = new Point(context); // make a point
  return [system, point];
}

/** Adds a single point to the canvas
 * @param {System} system - the system of functions that the point is run through
 * @param {Point} point - the point being moved through the system
 * @param {*} context - the drawing context of the canvas
 */
export function addPoint(system, point, context) {
  system.cycle(point, context);
}

/** Paints over the canvas white
 * @param {*} canvas - the canvas DOM object
 * @param {*} context - the drawing context of the canvas
 */
export function reset(context, canvas) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

/** sets the dimensions of the canvas, system, and point
 * @param {*} canvas - the canvas DOM object
 * @param {System} system - the system of functions that the point is run through
 * @param {Point} point - the point being moved through the system
 * @param {number} width - width value in pixels
 * @param {number} height - height value in pixels
 */
export function setDimensions(canvas, system, point, width, height) {
  canvas.width = width;
  canvas.height = height;

  system.setDimensions(width, height);
  point.setDimensions(width, height);
}
