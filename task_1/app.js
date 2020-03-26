const { program } = require('commander');

program.version('0.0.1');

program
  .option('-s, --shift <number>', 'position shift')
  .option('-i, --input', 'input file')
  .option('-o, --output', 'output file')
  .option('-a, --action', 'encode/decode');

program.parse(process.argv);

if (program.shift) console.log(`shift is ${program.shift}`);
