const { program } = require('commander');

program.storeOptionsAsProperties(false).passCommandToAction(false);
program.version('0.0.1');

program
  .requiredOption('-s, --shift <number>', 'position shift', value =>
    parseInt(value, 10)
  )
  .option('-i, --input <filename>', 'input file')
  .option('-o, --output <filename>', 'output file')
  .requiredOption('-a, --action [type]', 'encode/decode');

module.exports = program;
