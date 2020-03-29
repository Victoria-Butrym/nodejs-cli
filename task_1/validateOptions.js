/* eslint-disable no-sync */
const chalk = require('chalk');
const fs = require('fs');

const exit = process.exit;

function validateOptions(args) {
  if (isNaN(args.shift)) {
    process.stderr.write(`${chalk.red('Error: ')}shift is not a number`);
    exit(1);
  }

  if (args.action !== 'encode' && args.action !== 'decode') {
    process.stderr.write(
      `${chalk.red(
        'Error: '
      )}wrong action! Should be either 'encode' or 'decode'`
    );
    exit(1);
  }

  if (args.input && !fs.existsSync(args.input)) {
    process.stderr.write(
      `${chalk.red('Error: ')}input file is not accessable or doesn't exist`
    );
    exit(1);
  }

  if (args.output && !fs.existsSync(args.output)) {
    process.stderr.write(
      `${chalk.red('Error: ')}output file is not accessable or doesn't exist`
    );
    exit(1);
  }
}

module.exports = { validateOptions };
