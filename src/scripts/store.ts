import type { ColorInput, Color } from "./types";

const defaultColors: Color[] = [
  { name: "red", hue: 0, id: 0 },
  { name: "blue", hue: 240, id: 1 },
  { name: "purple", hue: 270, id: 2 },
];

function getLocalBackup(): Color[] | null {
  const colors = localStorage.getItem("colors");
  if (colors) return JSON.parse(colors);
  return null;
}

function setLocalBackup(colors = defaultColors) {
  localStorage.setItem("colors", JSON.stringify(colors));
}

export function getColors(): Color[] {
  const backup = getLocalBackup();
  if (backup) return backup;
  setLocalBackup();
  return defaultColors;
}

export function saveColor(colorInput: ColorInput) {
  const colors = getColors();
  colors.push({ ...colorInput, id: colors.length });
  setLocalBackup(colors);
}
