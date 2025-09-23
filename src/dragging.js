let pos1, pos2, pos3, pos4;

let currentDragElement;

export function dragMouseDown(event) {
  if (event.target === event.currentTarget) {
    if (INTERFACE === "NI") {
      window.Engine.lock.add("cpp-dragging");
    } else {
      window.g.lock.add("cpp-dragging");
    }
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    currentDragElement = event.target;
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("mouseup", closeDragElement);
  }
}

export function setDraggable(element) {
  element.addEventListener("mousedown", dragMouseDown, false);
}

export function revokeDraggable(element) {
  element.removeEventListener("mousedown", dragMouseDown, false);
}

function elementDrag(event) {
  event.preventDefault();
  // calculate the new cursor position:
  pos1 = pos3 - event.clientX;
  pos2 = pos4 - event.clientY;
  pos3 = event.clientX;
  pos4 = event.clientY;
  // set the element's new position:
  currentDragElement.style.top = currentDragElement.offsetTop - pos2 + "px";
  currentDragElement.style.left = currentDragElement.offsetLeft - pos1 + "px";
}

function closeDragElement() {
  if (INTERFACE === "NI") {
    window.Engine.lock.remove("cpp-dragging");
  } else {
    window.g.lock.remove("cpp-dragging");
  }
  document.removeEventListener("mousemove", elementDrag);
  document.removeEventListener("mouseup", closeDragElement);
}
