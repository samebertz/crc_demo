const parse = require('./parse.js');

const test_polynomials = [
  ['x⁸ + x⁷ + x + 1', [1, 1, 0, 0, 0, 0, 0, 1, 1].reverse().toString()],
  ['x^32 + x^26 + x^23 + x^22 + x^16 + x^12 + x^11 + x^10 + x^8 + x^7 + x^5 + x^4 + x^2 + x + 1', [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1].reverse().toString()],
  ['x^6 + x⁴ + x² + x + 1', [1, 1, 1, 0, 1, 0, 1].reverse().toString()]
];
const test_polynomials_map = new Map(test_polynomials);

// for(poly of test_polynomials_map.entries()) {
//   console.log(poly);
//   let bitstring = parse(poly[0]).toString();
//   console.log(bitstring);
//   console.assert(bitstring === poly[1]);
// }

const compute_crc = require('./crc.js');

const test_crc_default = [
  {
    'input': {'m': [0,1,0,1,0,1,1,1], 'g': [1,0,0,0,0,0,1,1,1]},
    'output': [1,0,1,0,0,0,1,0].toString()
  },
  {
    'input': {'m': [0,1,0,1], 'g': [1,0,1]},
    'output': [0,0].toString()
  },
  {
    'input': {'m': [0,1,0,1,0], 'g': [1,1,0,1]},
    'output': [0,0,1].toString()
  }
];

console.log('test_crc_default\n');
for(test of test_crc_default) {
  console.log(test);
  let crc = compute_crc(test['input']['m'], test['input']['g'], false, false).toString();
  console.log(crc);
  console.assert(crc === test['output']);
}

const test_crc_preset = [
  {
    'input': {'m': [0,1,0,1,0,1,1,1], 'g': [1,0,0,0,0,0,1,1,1]},
    'output': [1,0,1,1,0,1,1,1].toString()
  },
  {
    'input': {'m': [0,1,0,1], 'g': [1,0,1]},
    'output': [0,1].toString()
  },
  {
    'input': {'m': [0,1,0,1,0], 'g': [1,1,0,1]},
    'output': [0,1,1].toString()
  }
];

console.log('\n========\n\ntest_crc_preset\n');
for(test of test_crc_preset) {
  console.log(test);
  let crc = compute_crc(test['input']['m'], test['input']['g'], true, false).toString();
  console.log(crc);
  console.assert(crc === test['output']);
}

const test_crc_post_invert = [
  {
    'input': {'m': [0,1,0,1,0,1,1,1], 'g': [1,0,0,0,0,0,1,1,1]},
    'output': [0,1,0,1,1,1,0,1].toString()
  },
  {
    'input': {'m': [0,1,0,1], 'g': [1,0,1]},
    'output': [1,1].toString()
  },
  {
    'input': {'m': [0,1,0,1,0], 'g': [1,1,0,1]},
    'output': [1,1,0].toString()
  }
];

console.log('\n========\n\ntest_crc_post_invert\n');
for(test of test_crc_post_invert) {
  console.log(test);
  let crc = compute_crc(test['input']['m'], test['input']['g'], false, true).toString();
  console.log(crc);
  console.assert(crc === test['output']);
}

const test_crc_both = [
  {
    'input': {'m': [0,1,0,1,0,1,1,1], 'g': [1,0,0,0,0,0,1,1,1]},
    'output': [0,1,0,0,1,0,0,0].toString()
  },
  {
    'input': {'m': [0,1,0,1], 'g': [1,0,1]},
    'output': [1,0].toString()
  },
  {
    'input': {'m': [0,1,0,1,0], 'g': [1,1,0,1]},
    'output': [1,0,0].toString()
  }
];

console.log('\n========\n\ntest_crc_both\n');
for(test of test_crc_both) {
  console.log(test);
  let crc = compute_crc(test['input']['m'], test['input']['g'], true, true).toString();
  console.log(crc);
  console.assert(crc === test['output']);
}
