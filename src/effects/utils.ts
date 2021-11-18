export function randomise(max: any) {
  return Math.floor(Math.random() * max);
}

export function setCharAt(str: string, index: number, chr: string) {
  let array = str.split("");
  array.splice(index, 1, chr);
  return array.join("");
}
