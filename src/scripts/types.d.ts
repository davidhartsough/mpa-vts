export interface ColorInput {
  name: string;
  hue: number;
}

export interface Color extends ColorInput {
  id: number;
}
