const { program } = require('commander');
const fs = require('fs');
// const path = require('path');

const encode = require('./cipher');

const textStream = fs.createReadStream(`${__dirname}/text.txt`, 'utf8');

textStream.on('data', chunk => {
  console.log(encode(chunk, 1));
});

program.version('0.0.1');

program
  .option('-s, --shift <number>', 'position shift')
  .option('-i, --input', 'input file')
  .option('-o, --output', 'output file')
  .option('-a, --action', 'encode/decode');

program.parse(process.argv);

if (program.shift) console.log(`shift is ${program.shift}`);
