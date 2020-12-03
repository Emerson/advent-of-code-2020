import PASSWORDS from './2.input';

/*
 * PROBLEM 1
 */
function parseRequirements(requirementToken) {
  let lengthRequirements = requirementToken.split(' ')[0].split('-');
  let letterRequirement = requirementToken.split(' ')[1];

  return {
    minimum: parseInt(lengthRequirements[0]),
    maximum: parseInt(lengthRequirements[1]),
    letter: letterRequirement
  };
}

function testPassword(password, requirements) {
  let matches = password.split('').filter(letter => {
    return letter === requirements.letter;
  });
  return (
    matches.length >= requirements.minimum &&
    matches.length <= requirements.maximum
  );
}

function findValidPasswords(records) {
  return records.filter(record => {
    let requirements = parseRequirements(record.split(':')[0]);
    return testPassword(record.split(':')[1], requirements);
  });
}

test('Day 2 - Problem 1', () => {
  let validPasswords = findValidPasswords([...PASSWORDS])
  expect(validPasswords.length).toBe(550);
});

/*
 * PROBLEM 2
 */

function parseRequirements2(requirementToken) {
  let lengthRequirements = requirementToken.split(' ')[0].split('-');
  let letterRequirement = requirementToken.split(' ')[1];

  return {
    positionOne: parseInt(lengthRequirements[0]) - 1,
    positionTwo: parseInt(lengthRequirements[1]) - 1,
    letter: letterRequirement
  };
}

function testPassword2(password, requirements) {
  return password.split('').filter((letter, index) => {
    return (
      letter === requirements.letter &&
      [requirements.positionOne, requirements.positionTwo].includes(index)
    );
  }).length === 1;
}

function findValidPasswords2(records) {
  return records.filter(record => {
    let requirements = parseRequirements2(record.split(':')[0]);
    return testPassword2(record.split(':')[1].trim(), requirements);
  });
}

test('Day 2 - Problem 2', () => {
  let validPasswords = findValidPasswords2([...PASSWORDS]);
  expect(validPasswords.length).toBe(634);
});


