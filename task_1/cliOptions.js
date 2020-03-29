const { program } = require('commander');
const { validateOptions } = require('./validateOptions');

program.storeOptionsAsProperties(false).passCommandToAction(false);
program.version('0.0.1');

const args = program.opts();

// function validateOptions() {
//   if (isNaN(+args.shift)) {
//     process.stderr.write(`${chalk.red('Error: ')}shift is not a number`);
//     exit(1);
//   }

//   if (args.action !== 'encode' && args.action !== 'decode') {
//     process.stderr.write(
//       `${chalk.red(
//         'Error: '
//       )}wrong action! Should be either 'encode' or 'decode'`
//     );
//     exit(1);
//   }
// }

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
