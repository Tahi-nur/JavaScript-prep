"use strict";

function runExperiment(sampleSize) {
  const valueCounts = [0, 0, 0, 0, 0, 0];

  // Simulate die rolls
  for (let i = 0; i < sampleSize; i++) {
    const roll = Math.floor(Math.random() * 6) + 1; // random int 1–6
    valueCounts[roll - 1]++; // update the corresponding count
  }

  const results = [];

  // Compute percentages
  for (const count of valueCounts) {
    const percentage = ((count / sampleSize) * 100).toFixed(2);
    results.push(percentage);
  }

  return results;
}

function main() {
  const sampleSizes = [100, 1000, 1000000];

  for (const size of sampleSizes) {
    const result = runExperiment(size);
    console.log(result, size);
  }
}

main();
