import { addPoint, setDimensions, reset } from "@/js/functions/sketch.js";
import System from "@/js/classes/System";
import Point from "@/js/classes/Point";
import Palette from "@/js/classes/Palette";

// GLOBAL VARIABLES __________________________________
let canvas, context, system, point, animLoop;
let pointsPerLoop = 10000;
// const alpha = 0.5;

// MESSAGE HANDLING AND ROUTING ______________________
onmessage = (e) => workerMethods[e.data.method](e);

/** Uses requestAnimationFrame to draw in a loop*/
function loopingDraw() {
  for (let i = 0; i < pointsPerLoop; i++) {
    addPoint(system, point, context);
  }
  animLoop = requestAnimationFrame(loopingDraw);
}

const workerMethods = {
  setup: (e) => {
    canvas = e.data.canvas;
    context = canvas.getContext("2d");
    system = new System(context); //make a system
    point = new Point(context); // make a point

    point.print();
    system.print();

    reset(context, canvas);

    postMessage({ message: "Initialized system" });
    postMessage({ message: "palette", palette: system.palette.toString() });
  },
  startLoop: () => {
    animLoop = requestAnimationFrame(loopingDraw);
    postMessage({ message: "---Drawing Loop Started" });
  },
  stopLoop: () => {
    cancelAnimationFrame(animLoop);
    postMessage({ message: "---Drawing Loop Ended" });
  },
  download: () => system.download(canvas),
  setDimensions: (e) =>
    setDimensions(canvas, system, point, e.data.width, e.data.height),
  randomizeWarps: () => console.log(system.randomizeWarps()),
  reset: () => reset(context, canvas),
  info: () => {
    system.print();
    point.print();
  },
  updateParams: (e) => {
    pointsPerLoop = e.data.pointsPerLoop;
    system.setStartIFS(e.data.startIFS);
    system.setEndIFS(e.data.endIFS);
    system.setEndWarp(e.data.endWarp);
    point.setAlpha(e.data.alpha);
    point.setSize(e.data.pointSize);
  },
  randomizePalette: () => {
    system.palette = Palette.randomPalette();
    postMessage({ message: "palette", palette: system.palette.toString() });
  },
};
