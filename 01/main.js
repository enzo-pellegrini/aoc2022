const fs = require("fs");

fs.readFile("input.txt", (err, data) => {
  const sums = data
    .toString()
    .split("\n\n")
    .map((s) =>
      s
        .split("\n")
        .map((v) => parseInt(v))
        .filter((n) => !isNaN(n))
        .reduce((a, b) => a + b)
    );

  console.log(
    "Part 1:",
    sums.reduce((a, b) => (a > b ? a : b))
  );

  const sumTopThree = sums
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a + b);
  console.log("Part 2:", sumTopThree);
});
