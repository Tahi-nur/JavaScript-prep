const list = [1721, 979, 366, 299, 675, 1456];
let result;

// Find three numbers that sum to 2020
for (let i = 0; i < list.length; i++) {
  for (let j = i + 1; j < list.length; j++) {
    for (let k = j + 1; k < list.length; k++) {
      if (list[i] + list[j] + list[k] === 2020) {
        result = list[i] * list[j] * list[k];
        break;
      }
    }
    if (result !== undefined) break;
  }
  if (result !== undefined) break;
}

// TEST CODE, do not change
console.assert(result === 241861950, `The result is not correct, it is ${result}, but should be 241861950`);
