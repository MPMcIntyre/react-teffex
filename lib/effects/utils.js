export function randomise(max) {
    return Math.floor(Math.random() * max);
}
export function setCharAt(str, index, chr) {
    var array = str.split("");
    array.splice(index, 1, chr);
    return array.join("");
}
