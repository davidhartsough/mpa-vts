import generateRandomColor from "./generate";
import { getColors, saveColor } from "./store";
import type { Color } from "./types";

// Get DOM elements
const getElem = (id: string) => document.getElementById(id);
const searchInput = <HTMLInputElement>getElem("search")!;
const nameSort = <HTMLDivElement>getElem("name-sort")!;
const hueSort = <HTMLDivElement>getElem("hue-sort")!;
const nameSortIcon = <HTMLSpanElement>getElem("name-sort-icon")!;
const hueSortIcon = <HTMLSpanElement>getElem("hue-sort-icon")!;
const generateButton = <HTMLButtonElement>getElem("generate")!;
const listDiv = <HTMLDivElement>getElem("list")!;

const colorListItemTemplate = <HTMLTemplateElement>(
  getElem("color-list-item-template")!
);
function cloneColorListItemDiv() {
  return colorListItemTemplate.content.cloneNode(true) as HTMLDivElement;
}

// Set initial local state variables
// Sorting
let sort = "id";
let desc = false;
// Filtering/Searching
let query = "";

// Append a color to the list div
function appendColor({ name, hue, id }: Color) {
  // Create a new div
  const colorDiv = cloneColorListItemDiv();
  // Set the color style
  colorDiv.style.color = `hsl(${hue}, 100%, 50%)`;
  const link = colorDiv.querySelector(".list-item-link")! as HTMLAnchorElement;
  link.style.color = `hsl(${hue}, 100%, 50%)`;
  // Put a link inside the div that links to its color detail page
  link.href = `/color/?c=${id}`;
  // List the name and the hue in the link
  colorDiv.querySelector(".color-item-name")!.textContent = name;
  colorDiv.querySelector(".color-item-hue")!.textContent = hue.toString();
  // Add the new color item div to the list div
  listDiv.appendChild(colorDiv);
}

// Render all colors into the list
function renderList() {
  // Clear out the list div and reset
  listDiv.innerHTML = "";
  // Grab the colors from the Store
  let colors = getColors();
  // Find out which way we should be sorting by
  const sortComparison =
    sort === "id"
      ? compareId
      : sort === "name"
        ? desc
          ? compareNameDesc
          : compareName
        : desc
          ? compareHueDesc
          : compareHue;
  // Sort by that sorting method
  colors.sort(sortComparison);
  // Filter based on the search query
  if (query.length > 0) {
    // Keep any colors that include the search query in their name
    colors = colors.filter((c) => c.name.toUpperCase().includes(query));
  }
  // Render each color by adding it to the list
  colors.forEach((c) => appendColor(c));
}

// Sort colors by id, name, or hue
const compareId = (a: Color, b: Color) => a.id - b.id;
const compareHue = (a: Color, b: Color) => a.hue - b.hue;
const compareHueDesc = (a: Color, b: Color) => b.hue - a.hue;
const compareName = (a: Color, b: Color) => a.name.localeCompare(b.name);
const compareNameDesc = (a: Color, b: Color) => b.name.localeCompare(a.name);
// Handle the name sort toggler
function sortByName() {
  if (sort === "name") {
    // Toggle the sorting direction to descending
    if (desc === false) {
      desc = true;
      nameSortIcon.className = "desc";
      hueSortIcon.className = "hide";
    } else {
      // Set it to sort by id, ascending
      sort = "id";
      desc = false;
      nameSortIcon.className = "hide";
      hueSortIcon.className = "hide";
    }
  } else {
    // Set it to sort by name, ascending
    sort = "name";
    desc = false;
    nameSortIcon.className = "asc";
    hueSortIcon.className = "hide";
  }
  renderList();
}
// Set the handler to the name sort toggler's click event
nameSort.addEventListener("click", sortByName);
// Handle the hue sort toggler
function sortByHue() {
  if (sort === "hue") {
    // Toggle the sorting direction to descending
    if (desc === false) {
      desc = true;
      nameSortIcon.className = "hide";
      hueSortIcon.className = "desc";
    } else {
      // Set it to sort by id, ascending
      sort = "id";
      desc = false;
      nameSortIcon.className = "hide";
      hueSortIcon.className = "hide";
    }
  } else {
    // Set it to sort by hue, ascending
    sort = "hue";
    desc = false;
    nameSortIcon.className = "hide";
    hueSortIcon.className = "asc";
  }
  renderList();
}
// Set the handler to the hue sort toggler's click event
hueSort.addEventListener("click", sortByHue);

// Search for colors by name
function search() {
  query = searchInput.value.toUpperCase();
  renderList();
}
searchInput.addEventListener("input", search);

// Generate a random color
function generate() {
  // Get a new color from the Random Generator
  const newColor = generateRandomColor();
  // Add that new color to the Store
  saveColor(newColor);
  // Re-render the whole list
  renderList();
}
// Set the handler to the generate button's click event
generateButton.addEventListener("click", generate);

// Render the list once the window has loaded
window.addEventListener("load", renderList);
