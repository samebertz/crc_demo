function compute_crc(message, generator, preset, post_invert) {
  const crc_length = generator.length - 1;
  const message_crc_length = message.length + crc_length + 1;
  console.log(message, generator);
  console.log();

  let shift_register = [];
  if(preset) {
    shift_register.push(1);
  } else {
    shift_register.push(0);
  }
  let crc_register = (new Array(crc_length));
  if(post_invert) {
    crc_register.fill(1);
  } else {
    crc_register.fill(0);
  }
  let crc = shift_register.concat(message.concat(crc_register));
  // let crc = (new Array(crc_length)).fill(1).concat(message); // Preset to -1
  // let crc = message.concat((new Array(crc_length)).fill(1)); // Post-invert
  // let crc = (new Array(crc_length)).fill(1).concat(message.concat((new Array(crc_length)).fill(1))); // Both

  while(crc.length >= generator.length) {
    let bit = crc[0];
    let quotient = generator.map(b => bit*b);
    // console.log(crc.join(' ').padStart(2*message_crc_length));
    // console.log(quotient.join(' ').padStart(2*(message_crc_length - crc.length + quotient.length)));
    // console.log('-'.repeat(2*message_crc_length));

    for(let i=0; i<quotient.length; i++) {
      crc[i] = crc[i] ^ quotient[i];
    }
    crc.shift();
  }
  // console.log(crc.join(' ').padStart(2*message_crc_length));
  return crc;

  // function ones_complement(bitarray) {
  //   let complement = [];
  //   for(bit of bitarray) {
  //     complement.push(bit == 0 ? 0 : 1);
  //   }
  //   return complement;
  // }
  // return ones_complement(crc);
}

// let g = [1,0,1,1,1];
// let m1 = [0,1,1,1,0,1];
// let x = compute_crc(m1, g, true, true);
// compute_crc(m1.concat(x), g, true, true);
// let m2 = [0,1,1,0,0,1];
// let y = compute_crc(m2, g, true, true);
// compute_crc(m2.concat(y), g, true, true);
// let m3 = [0,1,1,1,1,1];
// let z = compute_crc(m3, g, true, true);
// compute_crc(m3.concat(z), g, true, true);

// // with Post-invert (with or without preset), the result with one-pass check
// // should be the crc of the Post-invert pattern (WITHOUT preset)
// let g2 = [1,0,1,0];
// let pattern = [1,1,1];
// let a = compute_crc(pattern, g2, false, true);
// compute_crc(pattern.concat(a), g2, false, true);

// compute_crc([0,1,0,1,0].concat([1,1,0]), [1,1,0,1], false, true);

module.exports = compute_crc;

// function check_message(message, generator) {
//   const crc_length = generator.length - 1;
//   const message_crc_length = message.length + 2*crc_length;
//   console.log(message, generator);
//   console.log();
//   // let crc = (new Array(crc_length)).fill(1).concat(message);
//   let crc = (new Array(crc_length)).fill(1).concat(message.concat((new Array(crc_length)).fill(1)));
//
//   while(crc.length >= generator.length) {
//     let bit = crc[0];
//     let quotient = generator.map(b => bit*b);
//
//     console.log(crc.join(' ').padStart(2*message_crc_length));
//     console.log(quotient.join(' ').padStart(2*(message_crc_length - crc.length + quotient.length)));
//     console.log('-'.repeat(2*message_crc_length))
//
//     for(let i=0; i<quotient.length; i++) {
//       crc[i] = crc[i] ^ quotient[i];
//     }
//     crc.shift();
//   }
//   console.log(crc.join(' ').padStart(2*message_crc_length));
//   return crc.toString() === (new Array(crc_length)).fill(1).toString();
// }
//
// const g = [1,0,0,0,0,0,1,1,1];
// const m = [0,1,0,1,0,1,1,1];
//
// let c = compute_crc(m, g);
// // console.log(m.concat(c));
//
// // console.log('\n========================================\n');
//
// console.log(check_message(m.concat(c), g));
