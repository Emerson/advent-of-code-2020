import DATA from './6.input';

test('Day 6 - Problem 1', () => {
  let results = DATA.map(group => {
    let yes = {};
    group.forEach(answers => {
      answers.split('').sort().forEach(letter => {
        yes[letter] = true;
      });
      return yes;
    })
    return Object.keys(yes);
  }).reduce((accumulator, group) => {
    return accumulator + group.length;
  }, 0);
  expect(results).toBe(6596);
});

test('Day 6 - Problem 2', () => {
  let results = DATA.map(group => {
    let yes = {};
    group.forEach(answers => {
      answers.split('').forEach(letter => {
        if (yes[letter]) {
          yes[letter] += 1;
        } else {
          yes[letter] = 1;
        }
      });
    });
    let allYes = {};
    for (let letter in yes) {
      if (yes[letter] === group.length) {
        allYes[letter] = true;
      }
    }
    return allYes;
  });
  let answer = results.reduce((accumulator, currentValue) => {
    return Object.keys(currentValue).length + accumulator;
  }, 0);
  expect(answer).toBe(3219);
});