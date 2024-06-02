import { ref } from "vue";
/**Makes an element draggable
 * @param {DOMElement} elmnt
 */
export function dragAndDrop(elmnt) {
  let delta_x = 0;
  let delta_y = 0;
  let x = 0;
  let y = 0;
  elmnt.onmousedown = dragMouseDown;
  const parent = elmnt.parentElement;

  function dragMouseDown(e) {
    e.preventDefault();

    // get the mouse cursor position at startup:
    x = e.clientX;
    y = e.clientY;
    document.onmouseup = closeDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    // calculate the new cursor position:
    delta_x = x - e.clientX;
    delta_y = y - e.clientY;
    x = e.clientX;
    y = e.clientY;

    // set the element's new position:
    // elmnt.style.top = elmnt.offsetTop - delta_y + "px";
    // elmnt.style.left = elmnt.offsetLeft - delta_x + "px";

    parent.style.top = parent.offsetTop - delta_y + "px";
    parent.style.left = parent.offsetLeft - delta_x + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/** takes in an array of functions and returns an array with names of said functions.
 * @param {[function]} arr - an array of functions to pull out the names from
 * @returns {ref([string])} - a ref with an array of names inside
 */
export function functionNames(arr) {
  const names = [];
  arr.forEach((f) => names.push(f.name));
  return ref(names);
}

/** randomizes parameters
 * @param {[ref]} params - arrray of refs
 */
export function paramRandomize(params) {
  params.forEach((p) => p.randomize());
}
