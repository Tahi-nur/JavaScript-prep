const list = [1721, 979, 366, 299, 675, 1456];
let result;

// Find two numbers that sum to 2020
for (let i = 0; i < list.length; i++) {
  for (let j = i + 1; j < list.length; j++) {
    if (list[i] + list[j] === 2020) {
      result = list[i] * list[j];
      break;
    }
  }
  if (result !== undefined) break;
}

// TEST CODE, do not change
console.assert(result === 514579, `The result is not correct, it is ${result}, but should be 514579`);
