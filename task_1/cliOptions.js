const { program } = require('commander');
const { validateOptions } = require('./validateOptions');

program.storeOptionsAsProperties(false).passCommandToAction(false);
program.version('0.0.1');

const args = program.opts();

function getOptions() {
  validateOptions(args);
  return args;
}

program
  .requiredOption('-s, --shift <number>', 'position shift')
  .option('-i, --input <filename>', 'input file')
  .option('-o, --output <filename>', 'output file')
  .requiredOption('-a, --action [type]', 'encode/decode');

module.exports = { getOptions };
