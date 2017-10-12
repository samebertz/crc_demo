function compute_crc(message, generator, preset, post_invert) {
  // TODO: input validation

  // const crc_length = generator.length - 1;
  // const message_crc_length = message.length + crc_length + 1;
  // console.log(message, generator);

  let shift_register = preset ? [1] : [0];
  let crc_register = (new Array(crc_length));
  if(post_invert) {
    crc_register.fill(1);
  } else {
    crc_register.fill(0);
  }
  let crc = shift_register.concat(message.concat(crc_register));

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
}

module.exports = compute_crc;
