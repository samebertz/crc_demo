window.onload = () => {
'use strict';

const superscript_map_array = [
    ['²', '2'],
    ['³', '3'],
    ['⁴', '4'],
    ['⁵', '5'],
    ['⁶', '6'],
    ['⁷', '7'],
    ['⁸', '8'],
    ['⁹', '9']
];
const superscript_map = new Map(superscript_map_array);

function bitstring_from_polynomial (polynomial) {
  function parse_term(term) {
    return term.replace(/x\^?/i, '0').replace(/./g, match => superscript_map.get(match) || match);
  }
  let parsed_polynomial = polynomial.split(/[\s+]+/).map(term => parse_term(term));
  for(let i=0; i < parsed_polynomial.length; i++) {
      if(parsed_polynomial[i] == '0') {parsed_polynomial[i] = '1';}
      else if(parsed_polynomial[i] == '1') {parsed_polynomial[i] = '0';}
  }
  let degrees = parsed_polynomial.map(term => parseInt(term, 10));
  if(Number.isNaN(degrees[0])) return [];
  function degrees_to_bitstring (degrees) {
    let bitarray = new Array(degrees[0]);
    bitarray.fill(0);
    for(let degree of degrees) {
      bitarray[degree] = 1;
    }
    return bitarray;
  }
  let bitstring = degrees_to_bitstring(degrees).reverse();
  return bitstring;
}

function compute_crc(message, generator, preset, post_invert) {
  // TODO: input validation

  const crc_length = generator.length - 1;
  const message_crc_length = message.length + crc_length + 1;
  // console.log(message, generator);

  let shift_register = preset ? [1] : [0];
  let crc_register = (new Array(crc_length));
  if(post_invert) {
    crc_register.fill(1);
  } else {
    crc_register.fill(0);
  }
  let crc = shift_register.concat(message.concat(crc_register));
  let steps = [];

  while(crc.length >= generator.length) {
    let bit = crc[0];
    let quotient = generator.map(b => bit*b);
    steps.push(crc.join(' ').padStart(2*message_crc_length));
    steps.push(quotient.join(' ').padStart(2*(message_crc_length - crc.length + quotient.length)));
    steps.push('-'.repeat(2*message_crc_length));

    for(let i=0; i<quotient.length; i++) {
      crc[i] = crc[i] ^ quotient[i];
    }
    crc.shift();
  }
  steps.push(crc.join(' ').padStart(2*message_crc_length));
  return [crc, steps];
}

// could grab all "input" elements so it's not searching the DOM redundantly?
// const gen_poly = document.getElementById('generator_polynomial');
const gen_bits = document.getElementById('generator-bitstring');
// const msg_poly = document.getElementById('message_polynomial');
const msg_bits = document.getElementById('message-bitstring');
const crc_butt = document.getElementById('compute_button');
const crc_out = document.getElementById('crc_steps');
const opt_preset = document.getElementById('preset-option');
const opt_post_invert = document.getElementById('post_invert-option');

(function init_conversion_hooks() {
  // gen_poly.addEventListener('keypress', (event) => {
  //   if(event.key === 'Enter') {
  //     // TODO: input validation
  //     let bitstring_array = bitstring_from_polynomial(event.target.value);
  //     gen_bits.value = bitstring_array.join('');
  //   }
  // }, false);
  // gen_bits.addEventListener('input', (event) => {gen_poly.value = '';}, false);
  //
  // msg_poly.addEventListener('keypress', (event) => {
  //   if(event.key === 'Enter') {
  //     // TODO: input validation
  //     let bitstring_array = bitstring_from_polynomial(event.target.value);
  //     msg_bits.value = bitstring_array.join('');
  //   }
  // }, false);
  // msg_bits.addEventListener('keypress', (event) => {msg_poly.value = '';}, false);

  crc_butt.addEventListener('click', (event) => {
    let preset = opt_preset.checked;
    let post = opt_post_invert.checked;
  	let result = compute_crc(msg_bits.value.split(''), gen_bits.value.split(''), preset, post);
    let steps = result[1];
    //console.log(steps.join('\n'));
    crc_out.textContent = steps.join('\n');
  }, false);
})();

}
