import TICKETS from './5.input';

/**
 *
 * Rows: 0-127
 * Columns: 0-7
 *
 *
 * BFFFBBFRRR: row 70, column 7, seat ID 567.
 * FFFBBBFRRR: row 14, column 7, seat ID 119.
 * BBFFBBFRLL: row 102, column 4, seat ID 820.
 */

const ROWS = [...Array(128).keys()];
const COLUMNS = [...Array(8).keys()];

function midpoint(min, max) {
  return min + (max - min) / 2;
}

function lowerHalf(inputArray) {
  let min = inputArray[0];
  let max = inputArray[inputArray.length - 1];
  return inputArray.filter(number => number < midpoint(min, max));
}

function upperHalf(inputArray) {
  let min = inputArray[0];
  let max = inputArray[inputArray.length - 1];
  return inputArray.filter(number => number > midpoint(min, max));
}

function getRow(data) {
  let row = data.split('').reduce((accumulator, currentValue) => {
    if (accumulator.length === 1) {
      return accumulator[0];
    }
    if (currentValue === 'F') {
      return lowerHalf(accumulator);
    }
    if (currentValue === 'B') {
      return upperHalf(accumulator);
    }
  }, [...ROWS]);
  return row[0];
}

function getColumn(data) {
  let column = data.split('').reduce((accumulator, currentValue) => {
    if (accumulator.length === 1) {
      return accumulator[0];
    }
    if (currentValue === 'L') {
      return lowerHalf(accumulator);
    }
    if (currentValue === 'R') {
      return upperHalf(accumulator);
    }
  }, [...COLUMNS])
  return column[0];
}

function getSeat(row, column) {
  return (row * 8) + column;
}

function parseTicket(ticket) {
  let row = getRow(ticket.slice(0, 7));
  let column = getColumn(ticket.slice(7, 10));
  return {row, column, seat: getSeat(row, column)};
}

test('rows', () => {
  expect(ROWS.length).toBe(128);
  expect(ROWS[0]).toBe(0);
  expect(ROWS[127]).toBe(127);
  expect(ROWS[128]).toBe(undefined);
});

test('midpoint', function() {
  expect(midpoint(0, 127)).toBe(63.5);
  expect(midpoint(0, 63)).toBe(31.5);
  expect(midpoint(0, 100)).toBe(50);
});

test('lowerHalf()', () => {
  let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let low = lowerHalf(test);
  expect(low.length).toBe(5);
  expect(low[0]).toBe(0);
  expect(low[4]).toBe(4);
});

test('upperHalf()', () => {
  let test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let upper = upperHalf(test);
  expect(upper.length).toBe(5);
  expect(upper[0]).toBe(5);
  expect(upper[4]).toBe(9);
});

test('getRow()', () => {
  expect(getRow('BBBBBBB')).toBe(127);
  expect(getRow('FFFFFFF')).toBe(0);
  expect(getRow('FBFBBFF')).toBe(44);
  expect(getRow('FFBBFBB')).toBe(27);

});

test('getColumn()', () => {
  expect(getColumn('LLL')).toBe(0);
  expect(getColumn('RRR')).toBe(7);
});

test('getSeat()', () => {
  expect(getSeat(44, 5)).toBe(357);
});

test('Day 5 - Problem 1 Test Data', () => {
  let ticket = parseTicket('BFFFBBFRRR')
  expect(ticket.row).toBe(70);
  expect(ticket.column).toBe(7);
  expect(ticket.seat).toBe(567);
});

test('Day 5 - Problem 1', () => {
  let seatIds = [...TICKETS].map(ticket => {
    return parseTicket(ticket).seat;
  });
  let highestSeatId = Math.max(...seatIds);
  expect(highestSeatId).toBe(816);
});

test('Day 5 - Problem 2', () => {
  /**
   * I cheated to figure this out.
   */
  let seats = {};
  [...TICKETS].forEach(ticket => {
    seats[parseTicket(ticket).seat] = true;
  });

  let myTicket = null;
  for (let seatId in seats) {
    let seatNumber = parseInt(seatId);
    if (!seats[seatNumber + 1] && seats[seatNumber + 2]) {
      myTicket = seatNumber + 1;
      break;
    }
  }

  expect(myTicket).toBe(539);
});
