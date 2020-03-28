const { program } = require('commander');

program.storeOptionsAsProperties(false).passCommandToAction(false);
program.version('0.0.1');

program
  .requiredOption('-s, --shift <number>', 'position shift') // make required
  .option('-i, --input <filename>', 'input file')
  .option('-o, --output <filename>', 'output file')
  .requiredOption('-a, --action [type]', 'encode/decode'); // make required

module.exports = program;
