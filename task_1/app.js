const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const chalk = require('chalk');
const { program } = require('commander');

const CaesarStream = require('./transform');
const { getOptions } = require('./cliOptions');

program.parse(process.argv);

const commands = getOptions();
const exit = process.exit;

const options = {
  shift: commands.shift,
  action: commands.action
};

let inputStream;
let outputStream;

if (commands.input) {
  const inputFile = path.basename(commands.input);
  inputStream = fs.createReadStream(path.join(__dirname, inputFile), {
    encoding: 'utf8'
  });
} else {
  inputStream = process.stdin;
  console.log(chalk.blue('Enter text, sweetheart: '));
}

if (commands.output) {
  const outputFile = path.basename(commands.output);
  outputStream = fs.createWriteStream(path.join(__dirname, outputFile), {
    flags: 'a'
  });
} else {
  outputStream = process.stdout;
}

pipeline(inputStream, new CaesarStream(options), outputStream, err => {
  if (err) {
    console.error(chalk.red('Failed!'), err.message);
    exit(1);
  } else {
    process.stdout.write(chalk.cyan('Success!'));
  }
});
