const stream = require('stream');
const { StringDecoder } = require('string_decoder');
// const fs = require('fs');

module.exports = class CaesarStream extends stream.Transform {
  // class CaesarStream extends stream.Transform {
  constructor(options) {
    // options = Object.assign({}, options, {
    //   decodeStrings: false
    // });
    super(options);

    this.shift = options.shift;
    this.action = options.action;
  }

  //   simplifyShift(shift) {
  //     let simplifiedShift = shift % 26;
  //     if (simplifiedShift < 0) {
  //       simplifiedShift = 26 + simplifiedShift;
  //     }
  //     return simplifiedShift;
  //   }

  encode(str, shift) {
    let encoded = '';

    if (this.action === 'decode') {
      this.shift *= -1;
    }

    // this.shift = this.simplifyShift(this.shift);

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

  _transform(chunk, encoding, callback) {
    // if (encoding !== 'utf8') {
    //   this.emit('error', new Error('Only utf-8 sources are supported!'));
    // }

    // this.push(this.encode(chunk, this.shift));

    const decoder = new StringDecoder('utf-8');
    chunk = decoder.write(chunk);
    callback(null, this.encode(chunk, this.shift));
    // console.log(chunk.toString());
    // this.push(this.encode(chunk, this.shift));
    // callback(null, this.encode(chunk, this.shift));
  }
};

// fs.createReadStream('./encoded.txt', 'utf8')
//   .pipe(new CaesarStream({ shift: 7, action: 'encode' }))
//   .pipe(fs.createWriteStream('./decoded.txt'));
