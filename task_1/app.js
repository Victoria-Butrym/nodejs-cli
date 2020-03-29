/* eslint-disable no-sync */
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const chalk = require('chalk');

const CaesarStream = require('./transform');
const { program } = require('./cliOptions');

program.parse(process.argv);

const commands = program.opts();
const exit = process.exit;

const options = {
  shift: commands.shift,
  action: commands.action
};

const inputFile = path.basename(commands.input);
const outputFile = path.basename(commands.output);

let inputStream;
let outputStream;

if (commands.input) {
  inputStream = fs.createReadStream(path.join(__dirname, inputFile), {
    encoding: 'utf8'
  });
} else {
  inputStream = process.stdin;
  console.log(chalk.blue('Enter text, sweetheart: '));
}

if (commands.output) {
  outputStream = fs.createWriteStream(path.join(__dirname, outputFile), {
    flags: 'a'
  });
} else {
  outputStream = process.stdout;
}

if (commands.action.length === undefined) {
  process.stderr.write(
    `${chalk.red(
      'Error: '
    )}action is not defined! \nShould be either "encode" or "decode"`
  );
  exit(1);
}

if (commands.output && !fs.existsSync(commands.output)) {
  process.stderr.write(
    `${chalk.red('Error: ')}output file is not accessable or doesn't exist`
  );
  exit(1);
}

if (commands.input && !fs.existsSync(commands.input)) {
  process.stderr.write(
    `${chalk.red('Error: ')}input file is not accessable or doesn't exist`
  );
  exit(1);
}

pipeline(inputStream, new CaesarStream(options), outputStream, err => {
  if (err) {
    console.error(chalk.red('Failed!'));
    exit(1);
  } else {
    process.stdout.write(chalk.cyan('Success!'));
  }
});
