const passwordList = [
    { times: '1-3', letter: 'a', password: 'abcde'},
    { times: '1-3', letter: 'b', password: 'cdefg'},
    { times: '2-9', letter: 'c', password: 'ccccccccc'}
];

for (const entry of passwordList) {
    const [min, max] = entry.times.split('-').map(Number);
    const letter = entry.letter;
    const password = entry.password;

    const count = password.split('').filter(char => char === letter).length;

    const isValid = count >= min && count <= max;

    console.log(
        `'${password}' is ${isValid ? 'VALID' : 'INVALID'}, ${letter} is present ${count} times and should have been present at least ${min} and at most ${max} times`
    );
}
