import type { ColorInput } from "./types";

const consonants = [
  "b",
  "c",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "m",
  "n",
  "p",
  "r",
  "s",
  "t",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const vowels = ["a", "e", "i", "o", "u"];

const getRandomNumber = (cap: number) => Math.floor(Math.random() * cap);
const getRandomItem = (arr: string[]) => arr[getRandomNumber(arr.length)];
const getRandomConsonant = () => getRandomItem(consonants);
const getRandomVowel = () => getRandomItem(vowels);
const getRandomBool = () => Math.random() >= 0.5;
const getRandomPair = () => getRandomVowel() + getRandomConsonant();

function generateRandomColorName() {
  let name = Math.random() >= 0.3 ? getRandomConsonant() : getRandomPair();
  name += getRandomPair();
  if (getRandomBool()) {
    name += getRandomPair();
  }
  if (getRandomBool()) {
    name += getRandomPair();
  }
  return name;
}

export default function generateRandomColor(): ColorInput {
  return {
    name: generateRandomColorName(),
    hue: getRandomNumber(359),
  };
}
