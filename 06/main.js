const fs = require("fs");

const text = fs.readFileSync("input.txt").toString();

class CountingSet {
  constructor() {
    this._map = new Map();
  }
  add(v) {
    this._map.set(v, (this._map.get(v) ?? 0) + 1);
  }
  remove(v) {
    this._map.set(v, this._map.get(v) - 1);
    if (this._map.get(v) <= 0) {
      this._map.delete(v);
    }
  }
  size() {
    return this._map.size;
  }
}

const minRead = (lenMarker) => {
  const set = new CountingSet();
  for (let i = 0; i < text.length; i++) {
    if (i > lenMarker-1) {
      set.remove(text[i - lenMarker]);
    }
    set.add(text[i]);
    if (set.size() == lenMarker) {
      return i + 1;
    }
  }
};

console.log("Part 1", minRead(4));
console.log("Part 2", minRead(14));