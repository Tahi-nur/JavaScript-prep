"use strict";
/**
 * The `possibleStates` property define the states (in this case: colours)
 * in which the traffic light can be.
 * The `stateIndex` property indicates which of the possible states is current.
 */
const trafficLight = {
  possibleStates: ["green", "orange", "red"],
  stateIndex: 0,
};

let cycle = 0;
while (cycle < 2) {
  const currentState = trafficLight.possibleStates[trafficLight.stateIndex];
  console.log("The traffic light is on", currentState);

  // Transition logic
  if (currentState === "green") {
    trafficLight.stateIndex = 1; // orange
  } else if (currentState === "orange") {
    trafficLight.stateIndex = 2; // red
  } else if (currentState === "red") {
    cycle++; // completed one full cycle
    trafficLight.stateIndex = 0; // green
  }
}