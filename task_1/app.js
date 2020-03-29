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

// node app.js -s7 -i 'text.txt' -o 'encoded.txt' -a 'encode'
// node app.js -s7 -i 'encoded.txt' -o 'decoded.txt' -a 'decode'

// // TODO-SAT:если переданы все аргументы, приложение читает из файла и записывает в файл зашифрованный/расшифрованный текст, при этом предыдущие записи не удаляются
// // TODO-SAT: (проверить на output) если переданы аргументы с путями к файлам, но файлы отсутствуют (или к ним невозможен доступ), приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0
// // TODO-SUN:если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin
// // TODO-SUN:если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout
// TODO: README
