module.exports = function encode(str, shift) {
  let encoded = '';

  for (let i = 0; i < str.length; i++) {
    const ascii = str[i].charCodeAt();

    if ((ascii >= 65 && ascii <= 77) || (ascii >= 97 && ascii <= 109)) {
      encoded += String.fromCharCode(ascii + shift);
    } else if ((ascii >= 77 && ascii <= 90) || (ascii >= 110 && ascii <= 122)) {
      encoded += String.fromCharCode(ascii - shift);
    } else {
      encoded += str[i];
    }
  }

  return encoded;
};
