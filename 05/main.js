const fs = require("fs");

const text = fs.readFileSync("input.txt").toString();

const [firstSection, secondSection] = text
  .split("\n\n")
  .map((section) => section.split("\n"));

const parseMatrix = (text) => {
  const parseMatrixLine = (line) => {
    out = [];
    for (let i = 1; i < line.length - 1; i += 4) {
      out.push(line[i]);
    }
    return out;
  };

  const lines = text.slice(0, -1).map(parseMatrixLine).reverse();
  const cols = [];
  for (let i = 0; i < lines[0].length; i++) {
    col = [];
    for (const line of lines) {
      if (line[i] !== " ") {
        col.push(line[i]);
      }
    }
    cols.push(col);
  }

  return cols;
};

const tops = (matrix) => matrix.map((col) => col[col.length - 1]);

const initialState = parseMatrix(firstSection);
let state = initialState;

const commands = secondSection
  .map((l) => l.split(" "))
  .filter((ws) => ws.length === 6)
  .map((ws) => [ws[1], ws[3], ws[5]].map((n) => parseInt(n)));

commands.forEach(([count, src, dst], index) => {
  for (let i = 0; i < count; i++) {
    state[dst - 1].push(state[src - 1].pop());
  }
});

console.log("Part 1", tops(state).join(""));

state = parseMatrix(firstSection);
commands.forEach(([count, src, dst], index) => {
  const buf = [];
  for (let i = 0; i < count; i++) {
    buf.push(state[src - 1].pop());
  }
  for (let i = 0; i < count; i++) {
    state[dst - 1].push(buf.pop());
  }
});

console.log("Part 2", tops(state).join(""));
