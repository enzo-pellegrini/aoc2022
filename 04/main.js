const fs = require("fs");

const isContained = (left, right) => {
  const [startLeft, endLeft] = left;
  const [startRight, endRight] = right;
  return startRight >= startLeft && endRight <= endLeft;
};

const doOverlap = (left, right) => {
  const [startLeft, endLeft] = left;
  const [startRight, endRight] = right;
  
  return (startLeft <= endRight && startLeft >= startRight) || (startRight <= endLeft && startRight >= startLeft)
}

fs.readFile("input.txt", (err, data) => {
  const assignments = data
    .toString()
    .split("\n")
    .filter((l) => l.length > 0)
    .map((l) => l.split(","))
    .map((pair) => pair.map((ass) => ass.split("-").map((s) => parseInt(s))));

  const contained = assignments.filter(
    ([left, right]) => isContained(left, right) || isContained(right, left)
  );

  console.log(
    "Part 1",
    contained.length
  );

  const overlapping = assignments.filter(([left, right]) => doOverlap(left, right))
  console.log("Part 2", overlapping.length)
});
