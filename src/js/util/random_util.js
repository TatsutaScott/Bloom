/**
 * depending on the arguments, either picks a random float between two numbers, or a random entry in an array
 * @param {number | array} a - either the lower boundary for the random range or an array
 * @param {number} b - the upper boundary for the random range
 * @returns {number | *} depending on the arguments, either a nubmer or an entry in the array
 */
export const random = (a, b) => {
  if (typeof a == "number" && typeof b == "number") {
    const lo = Math.min(a, b);
    const hi = Math.max(a, b);
    const range = hi - lo;
    return Math.random() * range + lo;
  } else if (Array.isArray(a)) {
    return a[Math.floor(Math.random() * a.length)];
  } else {
    throw new Error("random() arguments error");
  }
};

/**
 * Takes an array and shuffles the order of its content
 * @param {array} array - array to be shuffled
 * @returns {array}
 */

export const shuffle = (array) => {
  let rand, temp;
  let index = arr.length;

  while (index > 1) {
    rand = random(0, 1) * index;
    temp = array[--index];
    array[index] = array[rand];
    array[rand] = temp;
  }

  return array;
};

/** Randomly picks an index from an array thats been mapped using generateStochasticMap().
 * Because the of the way that the breakpoints are generated in generateStochasticMap() indexes are returned unevenly.
 * (pair with generateStochasticMap);
 * @param {[{breakpoint:number, content: *}]} mappedArray - array that has been through the random weights function
 * @returns {*}
 */
export function stochasticMapRandom(mappedArray) {
  const testValue = Math.random() * 10000; //pick a random value
  const randomIndex = mappedArray.find((q) => q.breakpoint < testValue); //find the first index that is lower than the test value
  return randomIndex.content; // return just the content of the index
}

/** Takes in an array and returns an array filled with an object that contains a random breakpoint and the previous content of that array index.
 * (pair with stochasticMapRandom)
 * @param {array} array - the array to modify
 * @returns {[{breakpoint:number, content: *}]} an array holding objects that have a breakpoint and content
 */
export function generateStochasticMap(array) {
  //generate the new array with the added object format
  const mappedArray = array.map((i) => {
    return {
      breakpoint: Math.random() * 10000,
      content: i,
    };
  });
  const randomIndex = Math.floor(Math.random() * mappedArray.length); //picks a random index
  mappedArray[randomIndex].breakpoint = 0; //sets the break point of the random index to 0
  mappedArray.sort((a, b) => a.breakpoint - b.breakpoint); // sorts the array by the breakpoint
  return mappedArray;
}
