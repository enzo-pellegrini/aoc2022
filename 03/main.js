const fs = require("fs");

aLowerCode = "a".charCodeAt(0);
aUpperCode = "A".charCodeAt(0);
/**
 *
 * @param {string} item
 */
const priorityForItem = (item) => {
  const code = item.charCodeAt(0);
  if (code - aLowerCode >= 0 && code - aLowerCode < 26) {
    return code - aLowerCode + 1;
  } else {
    return code - aUpperCode + 27;
  }
};

fs.readFile("input.txt", (err, data) => {
  const commons = data
    .toString()
    .split("\n")
    .map((l) => l.split(""))
    .filter((l) => l.length > 0)
    .map((l) => {
      const len = l.length;
      return [l.slice(0, len / 2), l.slice(len / 2)];
    })
    .map(([left, right]) => {
      const setRight = new Set(right);
      for (const item of left) {
        if (setRight.has(item)) {
          return item;
        }
      }
    });

  console.log(
    "Part 1:",
    commons.map(priorityForItem).reduce((a, b) => a + b)
  );

  const itemsPerElf = data
    .toString()
    .split("\n")
    .map((l) => l.split(""))
    .filter((l) => l.length > 0);

  const groups = [];
  for (let i = 0; i + 3 <= itemsPerElf.length; i += 3) {
    const group = [itemsPerElf[i], itemsPerElf[i + 1], itemsPerElf[i + 2]];
    groups.push(group);
  }
  const commons2 = groups
    .map((elfs) => elfs.map((arr) => new Set(arr)))
    .map(([first, second, third]) => {
      for (const item of first) {
        if (second.has(item) && third.has(item)) {
          return item;
        }
      }
    });
  console.log(
    "Part 2",
    commons2.map(priorityForItem).reduce((a, b) => a + b)
  );
});
