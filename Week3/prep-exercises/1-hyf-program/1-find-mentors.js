// Simulated data from hyf.js
export const mentors = [
  { name: 'Stas', modules: ['html', 'javascript', 'using-apis'] },
  { name: 'Joe', modules: ['css', 'javascript', 'node'] },
  { name: 'Marc', modules: ['react', 'node', 'using-apis'] },
];

// Your task functions

/**
 * Returns an array of mentor names who can teach the given module.
 */
const possibleMentorsForModule = (moduleName) => {
  return mentors
    .filter((mentor) => mentor.modules.includes(moduleName))
    .map((mentor) => mentor.name);
};

/**
 * Returns a single random mentor name who can teach the given module.
 */
const findMentorForModule = (moduleName) => {
  const possibleMentors = possibleMentorsForModule(moduleName);
  if (possibleMentors.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * possibleMentors.length);
  return possibleMentors[randomIndex];
};

// Test examples
console.log(possibleMentorsForModule('using-apis'));  // e.g. ['Stas', 'Marc']
console.log(findMentorForModule('javascript'));       // e.g. 'Stas' or 'Joe'
