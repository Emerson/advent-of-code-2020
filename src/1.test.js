import EXPENSES from './1.input';

/**
 * There are way better ways of doing this. The implementation here
 * is a brute force attempt and there are some low hanging optimizations.
 * I think this could be reworked using a `reduce` and it would be much
 * cleaner. This being said, the answers are correct, and I think the elves
 * would be fine with a nasty little script rather than a well thought out
 * program.
 */


/**
 * find two entries that sum to 2020
 */
function findTwo(enteries) {
  for (let i = 0; i < enteries.length; i++) {
    for (let j = 0; j < enteries.length; j++) {
      if (j === i) { continue; }
      if (enteries[i] + enteries[j] === 2020) {
        return enteries[i] * enteries[j];
      }
    }
  }
}

/**
 * find three entries that sum to 2020
 */
function findThree(enteries) {
  for (let i = 0; i < enteries.length; i++) {
    for (let j = 0; j < enteries.length; j++) {
      if (j === i) { continue; }
      for (let k = 0; k < enteries.length; k++) {
        if (k === i || k === j) { continue; }
        if (enteries[i] + enteries[j] + enteries[k] === 2020) {
          return enteries[i] * enteries[j] * enteries[k];
        }
      }
    }
  }
}

test('Day 1 - Problem 1', () => {
  let answer = findTwo(EXPENSES);
  expect(answer).toBe(197451);
});

test('Day 1 - Problem 2', () => {
  console.log(EXPENSES);
  let answer = findThree(EXPENSES);
  expect(answer).toBe(138233720);
});
