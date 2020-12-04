import MAP from './3.input';

function hasTree(position, map) {
  let x = position.x;
  if (x >= map[position.y].length) {
    x = position.x % map[position.y].length;
  }
  return map[position.y][x] === '#';
};

function countTrees(map, slope) {
  let count = 0;
  let y = 0;
  let x = 0;
  while(y < map.length) {

    if (hasTree({x, y}, map)) {
      count++;
    }
    y = y + slope.y;
    x = x + slope.x;
  }
  return count;
}

test('Day 3 - test hasTree()', () => {
  expect(hasTree({x: 0, y: 0}, [
    '...',
    '...'
  ])).toBe(false);
});

test('Day 3 - test hasTree() when x is out of bounds', () => {
  expect(hasTree({x: 9, y: 1}, [
    '....#',
    '....#'
  ])).toBe(true);
});

test('Day 3 - Problem 1', () => {
  expect(countTrees(MAP, {x: 3, y: 1})).toBe(286);
});

test('Day 3 - Problem 2', () => {
  let count = [
    {x: 1, y: 1},
    {x: 3, y: 1},
    {x: 5, y: 1},
    {x: 7, y: 1},
    {x: 1, y: 2}
  ].map(slope => {
    return countTrees(MAP, slope);
  }).reduce((result, currentValue, index) => {
    if (index === 0) {
      return currentValue;
    } else {
      return result * currentValue;
    }
  }, 0);
  expect(count).toBe(3638606400);
});