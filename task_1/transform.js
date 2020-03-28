const stream = require('stream');
// const fs = require('fs');

module.exports = class CaesarStream extends stream.Transform {
  // class CaesarStream extends stream.Transform {
  constructor(options) {
    options = Object.assign({}, options, {
      decodeStrings: false
    });
    super(options);

    this.shift = options.shift;
    this.action = options.action;
  }

  encode(str, shift) {
    let encoded = '';

    for (let i = 0; i < str.length; i++) {
      const ascii = str[i].charCodeAt();

      if ((ascii >= 65 && ascii <= 77) || (ascii >= 97 && ascii <= 109)) {
        encoded += String.fromCharCode(ascii + shift);
      } else if (
        (ascii >= 77 && ascii <= 90) ||
        (ascii >= 110 && ascii <= 122)
      ) {
        encoded += String.fromCharCode(ascii - shift);
      } else {
        encoded += str[i];
      }
    }

    return encoded;
  }

  decode(str, shift) {
    let decoded = '';

    for (let i = 0; i < str.length; i++) {
      const ascii = str[i].charCodeAt();

      if ((ascii >= 65 && ascii <= 77) || (ascii >= 97 && ascii <= 109)) {
        decoded += String.fromCharCode(ascii - shift);
      } else if (
        (ascii >= 77 && ascii <= 90) ||
        (ascii >= 110 && ascii <= 122)
      ) {
        decoded += String.fromCharCode(ascii + shift);
      } else {
        decoded += str[i];
      }
    }

    return decoded;
  }

  _transform(chunk, encoding, callback) {
    if (encoding !== 'utf8') {
      this.emit('error', new Error('Only utf-8 sources are supported!'));
    }

    if (this.action === 'encode') {
      this.push(this.encode(chunk, this.shift));
    } else {
      this.push(this.decode(chunk, this.shift));
    }
    callback();
  }
};

// fs.createReadStream('./encoded.txt', 'utf8')
//   .pipe(new CaesarStream({ shift: 7, action: 'encode' }))
//   .pipe(fs.createWriteStream('./decoded.txt'));
