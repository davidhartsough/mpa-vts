import { saveColor } from "./store";
import type { ColorInput } from "./types";

const form = <HTMLFormElement>document.querySelector("form")!;
const nameInput = <HTMLInputElement>document.getElementById("name")!;
const hueInput = <HTMLInputElement>document.getElementById("hue")!;

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const name = nameInput.value;
  const hue = hueInput.valueAsNumber;
  const colorInput: ColorInput = { name, hue };
  saveColor(colorInput);
  window.location.href = window.location.origin;
  return false;
});
