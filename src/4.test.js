import PASSPORTS from './4.input';

function parseRecord(record) {
  return record.split(/[\n\r\s]+/).reduce((accumulator, record) => {
    accumulator[record.split(':')[0].trim()] = record.split(':')[1].trim();
    return accumulator;
  }, {});
}

function isValid(record, requiredFields = []) {
  let fields = Object.keys(record);
  return requiredFields.every(field => {
    return fields.includes(field);
  });
}

test('Day 4 - parseRecord', () => {
  let record = parseRecord(PASSPORTS[0]);
  expect(record.ecl).toBe('amb');
  expect(record.pid).toBe('690616023');
  expect(record.byr).toBe('1994');
  expect(record.iyr).toBe('2014');
  expect(record.hgt).toBe('172cm');
  expect(record.hcl).toBe('#c0946f');
  expect(record.eyr).toBe('2022');
});

test('Day 4 - isValid', () => {
  expect(isValid({id: 5, name: 'Emerson', city: 'Toronto'}, ['id', 'name'])).toBe(true);
  expect(isValid({id: 5, name: 'Emerson'}, ['id', 'name', 'city'])).toBe(false);
});

test('Day 4 - Problem 1', () => {
  let validPassports = [...PASSPORTS].filter(record => {
    return isValid(parseRecord(record), ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']);
  });
  expect(validPassports.length).toBe(170);
});


function strictValidate(record, requirements) {
  let hasValidData = requirements.every(requirement => {
    return requirement.validations.every(validation => {
      return validation(record[requirement.field]);
    });
  });
  let validKeys = requirements.map(requirement => requirement.field);
  let hasValidKeys = Object.keys(record).every(key => validKeys.includes(key));
  return hasValidData && hasValidKeys;
}

function isYear() {
  return function(value) {
    return value && /^\d{4}$/.test(value.toString());
  }
}

function greaterThan(min) {
  return function(value) {
    return value && parseInt(value) >= min
  }
}

function lessThan(max) {
  return function(value) {
    return value && parseInt(value) <= max
  }
}

function isHeight() {
  return function(value) {
    if (!value) {
      return false;
    }
    if (!/\d+(cm|in)$/.test(value)) { return false; }
    if (value.includes('cm')) {
      let height = parseInt(value.split('cm')[0]);
      return height <= 193 && height >= 150;
    }
    if (value.includes('in')) {
      let height = parseInt(value.split('in')[0]);
      return height <= 76 && height >= 59;
    }
  }
}

function isHair() {
  return function(value) {
    return /^#[0-9a-f]{6}$/.test(value);
  }
}

function isEyeColour() {
  return function(value) {
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
  }
}

function isPid() {
  return function(value) {
    return /^\d{9}$/.test(value);
  }
}

const REQUIREMENTS = [
  {field: 'byr', validations: [isYear(), greaterThan(1920), lessThan(2002)]},
  {field: 'iyr', validations: [isYear(), greaterThan(2010), lessThan(2020)]},
  {field: 'eyr', validations: [isYear(), greaterThan(2020), lessThan(2030)]},
  {field: 'hgt', validations: [isHeight()]},
  {field: 'hcl', validations: [isHair()]},
  {field: 'ecl', validations: [isEyeColour()]},
  {field: 'pid', validations: [isPid()]},
  {field: 'cid', validations: []}
];

test('Day 4 - strictValidate()', () => {
  let validRecord = {
    byr: '1920',
    iyr: '2010',
    eyr: '2020',
    hgt: '150cm',
    hcl: '#000000',
    ecl: 'amb',
    pid: '000000000'
  };
  expect(strictValidate(validRecord, REQUIREMENTS)).toBe(true);
  let invalidRecord = {
    byr: '1920',
    iyr: '2000',
    eyr: '2010',
    hgt: '150cm',
    hcl: '#000000',
    ecl: 'amb',
    pid: '000000000'
  };
  expect(strictValidate(invalidRecord, REQUIREMENTS)).toBe(false);
});

test('Day 4 - Invalid Passports', () => {
  const INVALID =
`eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`.split('\n\n');
  expect(INVALID.length).toBe(4);
  let validPassports = [...INVALID].filter(passport => {
    return strictValidate(parseRecord(passport), REQUIREMENTS)
  });
  expect(validPassports.length).toBe(0);
});

test('Day 4 - Valid Passports', () => {
  const VALID =
`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`.split('\n\n');
  expect(VALID.length).toBe(4);
  let validPassports = [...VALID].filter(passport => {
    return strictValidate(parseRecord(passport), REQUIREMENTS);
  });
  expect(validPassports.length).toBe(4);
});

test('Day 4 - Problem 2', () => {
  expect(PASSPORTS.length).toBe(253);
  let validPassports = [...PASSPORTS].filter((passport) => {
    return strictValidate(parseRecord(passport), REQUIREMENTS);
  });
  expect(validPassports.length).toBe(103);
});


