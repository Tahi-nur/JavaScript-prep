import { modules, students, mentors, classes } from "./hyf.js";

const getPeopleOfClass = (className) => {
  const classInfo = classes.find((cls) => cls.name === className);
  if (!classInfo) return [];

  const currentModule = classInfo.currentModule;

  // Get students of this class
  const classStudents = students
    .filter((student) => student.class === className)
    .map((student) => ({ name: student.name, role: 'student' }));

  // Get mentors teaching this module
  const classMentors = mentors
    .filter((mentor) => mentor.nowTeaching.includes(currentModule))
    .map((mentor) => ({ name: mentor.name, role: 'mentor' }));

  return [...classStudents, ...classMentors];
};

const getActiveClasses = () => {
  const activeClasses = classes.filter((cls) => cls.active);

  const result = {};
  for (const cls of activeClasses) {
    result[cls.name] = getPeopleOfClass(cls.name);
  }

  return result;
};

// Example usage
// console.log(getPeopleOfClass('class34'));
// console.log(getActiveClasses());
