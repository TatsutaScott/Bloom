import Color from "@/js/classes/Color";
import {
  random,
  generateStochasticMap,
  stochasticMapRandom,
} from "@/js/util/random_util";
import { map } from "@/js/util/math_util";

/** A representation of a color Palette */
export default class Palette {
  /** create a new Palette
   * @param {array} array - an Array of colors
   */
  constructor(array) {
    this.colors = [];
    array.forEach((c) => this.addColor(c));
  }

  /** An alternative constructor for Palettes.
   * Instead of taking an array of colors it accepts a coolors url
   * i.e. 'https://coolors.co/00916e-feefe5-ffcf00-ee6123-fa003f'
   * @param {string} url -  coolors url
   */
  static coolorsPalette(url) {
    const colorString = url.slice(url.lastIndexOf("/") + 1); // slices the url after 'https://coolors.co/'
    const colors = colorString.split("-"); // splits the colors string into individual color strings
    const hexColors = colors.map((c) => "#" + c); // map the array to add # to make it a hex color
    return new Palette(hexColors); // constructs a palette using the array of hex color strings
  }

  /** a collection of urls for coolors color palettes that can be used for generating palettes
   * @const
   */
  static urls = [
    // 2 colors
    "https://coolors.co/1f0318-e5f2c9",
    "https://coolors.co/ffcab1-69a2b0",
    "https://coolors.co/ca2e55-ffe0b5",
    "https://coolors.co/f2ff49-ff4242",
    "https://coolors.co/8cb369-ffcfd2",
    // 3 colors
    "https://coolors.co/c97b84-a85751-7d2e68",
    "https://coolors.co/ed6a5a-f4f1bb-9bc1bc",
    "https://coolors.co/ef767a-456990-49beaa",
    "https://coolors.co/dad6d6-92bfb1-f4ac45",
    "https://coolors.co/f6e8ea-ef626c-22181c",
    // 4 colors
    "https://coolors.co/156064-00c49a-f8e16c-ffc2b4",
    "https://coolors.co/ffbe0b-fb5607-ff006e-8338ec",
    "https://coolors.co/f1bf98-e1f4cb-bacba9-717568",
    "https://coolors.co/713e5a-63a375-edc79b-d57a66",
    "https://coolors.co/23f0c7-ef767a-7d7abc-6457a6",
    // 5 colors
    "https://coolors.co/dfd6a7-f7ce5b-f7b05b-af9b46-1f1300",
    "https://coolors.co/c5d86d-261c15-f7f7f2-e4e6c3-f05d23",
    "https://coolors.co/e3c0d3-95818d-576066-2c514c-122932",
    "https://coolors.co/c1c1c1-2c4251-d16666-b6c649-ffffff",
    "https://coolors.co/592941-498467-52b788-b2d3a8-ede5a6",
    // 6 colors
    "https://coolors.co/ffe0b5-ede580-a4af69-4c2719-d35269-585563",
    "https://coolors.co/5a7d7c-dadff7-232c33-a0c1d1-b5b2c2-f5e960",
    "https://coolors.co/160f29-246a73-368f8b-f3dfc1-ddbea8-fcbfb7",
    "https://coolors.co/fcd0a1-b1b695-53917e-63535b-6d1a36-242325",
    "https://coolors.co/011627-fdfffc-2ec4b6-e71d36-ff9f1c-6c5a49",
  ];

  /** randomly picks a coolors url and returns a palette object based on it
   * @returns {Palette}
   */
  static randomPalette() {
    const url = random(Palette.urls); // picks a random coolors url
    return Palette.coolorsPalette(url); //returns the object
  }
}

/** Add a color to the Palette
 * @param {Color | string | [number]} color - color to be added to the palette
 */
Palette.prototype.addColor = function (color) {
  if (color instanceof Color) {
    //case 1: Color object
    this.colors.push(color);
  } else if (typeof color == "string") {
    // CASE 2: Hex color string
    const newColor = Color.hexColor(color);
    this.colors.push(newColor);
  } else if (color instanceof Array) {
    // CASE 3: Array of RGB(A) values
    const newColor = new Color(...color);
    this.colors.push(newColor);
  }
};

/** Utility function that prints out the contents of the palette */
Palette.prototype.print = function () {
  let printString = "Palette: \n";
  this.colors.forEach((color, index) => {
    printString += `Color #${index}: ` + color.printString();
  });
  console.log(printString);
};

/** Treat the palette as a gradient and pull the color from it
 * @param {number} factor - the position to pull from the palette (range: [0,1])
 * @returns {Color} interpolated color
 */
Palette.prototype.interpolate = function (factor) {
  const pLength = this.colors.length; // get the length of the colors array
  const index1 = Math.floor(factor * (pLength - 1)); // find the first color's index
  const index2 = index1 + 1 > pLength - 1 ? 0 : index1 + 1; // find the second color's index
  const interp = map(factor * pLength, index1, index2, 0, 1); // determine how much to interpolate between the two colors
  return Color.interpolate(this.colors[index1], this.colors[index2], interp); // return the interpolated color
};

/** Returns a random color from the palette */
Palette.prototype.random = function () {
  return random(this.colors);
};

/** Creates a version of the palette with different weightings to allow for random colors with different frequencies
 * @param {[number]} breakpoints - an array of breakpoints to apply to the palette
 */
Palette.prototype.initWeightings = function (breakpoints) {
  //if provided with breakpoints, then make a list based on those values
  if (breakpoints) {
    this.weightedColors = [];
    for (let [point, index] in breakpoints) {
      if (this.colors[index]) {
        this.weightedColors[index] = {
          breakpoint: point,
          content: this.colors[index],
        };
      }
    }
    this.weightedColors.sort((a, b) => a.breakpoint - b.breakpoint);
  } else {
    // otherwise use the generateStochasticMap to automatically generate a map
    this.weightedColors = generateStochasticMap(this.colors);
  }
  return this.weightedColors;
};

/** returns a random color based on the weighted color array
 * @returns {Color} a random color based on the weighting
 */
Palette.prototype.weightedRandom = function () {
  return stochasticMapRandom(this.weightedColors);
};

/** sets the alpha for all of the colors in the palette */
Palette.prototype.setAlpha = function (alpha) {
  this.colors.forEach((c) => c.setAlpha(alpha));
  if (this.weightedColors) {
    this.weightedColors.forEach((c) => c.content.setAlpha(alpha));
  }
};

Palette.prototype.toString = function () {
  let str = "https://coolors.co/";
  this.colors.forEach((c) => {
    const hex = c.getHex().slice(1);
    str += hex + "-";
  });
  return str.slice(0, -1);
};
