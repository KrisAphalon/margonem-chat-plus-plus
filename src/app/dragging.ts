let pos1: number;
let pos2: number;
let pos3: number;
let pos4: number;
let currentDragElement: HTMLElement;

function dragMouseDown(event: MouseEvent): void {
  if (
    event.target === event.currentTarget &&
    event.currentTarget instanceof HTMLElement
  ) {
    if (INTERFACE === "NI") {
      Engine.lock.add("cpp-dragging");
    } else {
      g.lock.add("cpp-dragging");
    }
    event.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = event.clientX;
    pos4 = event.clientY;
    currentDragElement = event.currentTarget;
    document.addEventListener("mousemove", elementDrag);
    document.addEventListener("mouseup", closeDragElement);
  }
}

function elementDrag(event: MouseEvent): void {
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

function closeDragElement(): void {
  if (INTERFACE === "NI") {
    Engine.lock.remove("cpp-dragging");
  } else {
    g.lock.remove("cpp-dragging");
  }
  document.removeEventListener("mousemove", elementDrag);
  document.removeEventListener("mouseup", closeDragElement);
}

export function setDraggable(element: HTMLElement): void {
  element.addEventListener("mousedown", dragMouseDown, false);
}

export function revokeDraggable(element: HTMLElement): void {
  element.removeEventListener("mousedown", dragMouseDown, false);
}
