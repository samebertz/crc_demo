const utf8_superscripts = [
    ['²', '2'],
    ['³', '3'],
    ['⁴', '4'],
    ['⁵', '5'],
    ['⁶', '6'],
    ['⁷', '7'],
    ['⁸', '8'],
    ['⁹', '9']
];
const superscript_map = new Map(utf8_superscripts);

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

  function degrees_to_bitstring (degrees) {
    let bitarray = new Array(degrees[0]);
    bitarray.fill(0);
    for(degree of degrees) {
      bitarray[degree] = 1;
    }
    return bitarray;
  }
  return degrees_to_bitstring(degrees).reverse();
}

module.exports = bitstring_from_polynomial;
