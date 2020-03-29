const stream = require('stream');
const { StringDecoder } = require('string_decoder');

module.exports = class CaesarStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.shift = options.shift;
    this.action = options.action;
  }

  encode(str, shift) {
    if (shift < 0) return this.encode(str, shift + 26);
    if (shift > 26 && shift % 26 !== 0) return this.encode(str, shift % 26);
    let encoded = '';

    for (let i = 0; i < str.length; i++) {
      const ascii = str.charCodeAt(i);
      let encryptedChar;

      if (ascii >= 65 && ascii <= 90) {
        encryptedChar = String.fromCharCode(((ascii - 65 + shift) % 26) + 65);
      } else if (ascii >= 97 && ascii <= 122) {
        encryptedChar = String.fromCharCode(((ascii - 97 + shift) % 26) + 97);
      } else {
        encryptedChar = String.fromCharCode(ascii);
      }

      encoded += encryptedChar;
    }

    return encoded;
  }

  _transform(chunk, encoding, callback) {
    const decoder = new StringDecoder('utf-8');
    chunk = decoder.write(chunk);
    callback(
      null,
      this.action === 'encode'
        ? this.encode(chunk, this.shift)
        : this.encode(chunk, -this.shift)
    );
  }
};
