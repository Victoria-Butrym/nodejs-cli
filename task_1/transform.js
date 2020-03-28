const stream = require('stream');
const { StringDecoder } = require('string_decoder');
// const fs = require('fs');

module.exports = class CaesarStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.shift = options.shift;
    this.action = options.action;
  }

  simplifyShift(shift) {
    let simplifiedShift = shift % 26;
    if (simplifiedShift < 0) {
      simplifiedShift = 26 + simplifiedShift;
    }
    return simplifiedShift;
  }

  encode(str, shift) {
    // console.log('encoding');
    let encoded = '';
    this.shift = this.simplifyShift(this.shift);

    for (let i = 0; i < str.length; i++) {
      let ascii = str.charCodeAt(i);

      if (ascii >= 65 && ascii <= 90) {
        ascii = ((ascii - 65 + shift) % 26) + 65; // (ascii - 65) * 26 - shift + 65 = ascii
      } else if (ascii >= 97 && ascii <= 122) {
        ascii = ((ascii - 97 + shift) % 26) + 97;
      }

      encoded += String.fromCharCode(ascii);
    }

    return encoded;
  }

  decode(str, shift) {
    // console.log('decoding');
    let decoded = '';
    this.shift = this.simplifyShift(this.shift);

    for (let i = 0; i < str.length; i++) {
      let ascii = str.charCodeAt(i);

      if (ascii >= 65 && ascii <= 90) {
        ascii = ((ascii + 65 - shift) % 26) - 65;
      } else if (ascii >= 97 && ascii <= 122) {
        ascii = ((ascii + 97 - shift) % 26) - 97;
      }

      decoded += String.fromCharCode(ascii);
    }

    return decoded;
  }

  _transform(chunk, encoding, callback) {
    const decoder = new StringDecoder('utf-8');
    chunk = decoder.write(chunk);
    callback(
      null,
      this.action === 'encode'
        ? this.encode(chunk, this.shift)
        : this.decode(chunk, this.shift)
    );
  }
};
