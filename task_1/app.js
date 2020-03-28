/* eslint-disable no-process-exit */
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');

const CaesarStream = require('./transform');

program.version('0.0.1');

program
  .option('-s, --shift <number>', 'position shift') // make required
  .option('-i, --input <filename>', 'input file')
  .option('-o, --output <filename>', 'output file')
  .option('-a, --action [type]', 'encode/decode'); // make required
// .action(() => {
//   const options = program.opts();

//   if (options.action !== 'encode' || options.action !== 'decode') {
//     process.stderr.write('Error: Invalid action');
//     process.exit(1);
//   }
// });

program.parse(process.argv);

const options = {
  shift: +program.shift,
  action: program.action
};

const inputFile = path.basename(program.input);
const outputFile = path.basename(program.output);

// console.log(options, inputFile, outputFile);

let inputStream;
let outputStream;

if (program.input) {
  inputStream = fs.createReadStream(path.join(__dirname, inputFile), {
    encoding: 'utf8'
  });
} else {
  inputStream = process.stdin;
  inputStream.on('data', data => data.toString());
}

if (process.output) {
  outputStream = fs.createWriteStream(path.join(__dirname, outputFile), {
    flags: 'a'
  });
} else {
  outputStream = process.stdout;
}

pipeline(inputStream, new CaesarStream(options), outputStream, err =>
  process.stderr.write('Damn! Check your files, bro...', err)
);

// fs.createReadStream(path.join(__dirname, inputFile), {
//   flags: 'r',
//   encoding: 'utf8'
// })
//   .on('error', err => {
//     process.stderr.write(err.message);
//     process.exit(1);
//   })
//   .pipe(new CaesarStream(options))
//   .on('error', err => {
//     process.stderr.write(err.message);
//     process.exit(1);
//   })
//   .pipe(
// fs
//   .createWriteStream(path.join(__dirname, outputFile), { flags: 'a' })
//       .on('error', err => {
//         process.stderr.write(err.message);
//         process.exit(1);
//       })
//   );

// if (program.input === undefined) {
//   process.stdin.write('Enter something: ');
// }

// if (program.input) {
//   encodeFile(inputStream, +program.shift);
//   console.log(program.output);
// } else {
//   process.stdin.on('data', data => {
//     process.stdout.write(encode(data.toString(), +program.shift));
//   });
// }

// node app.js -s7 -i 'new_text.txt' -o 'encoded.txt' -a 'encode'
// node app.js -s7 -i 'encoded.txt' -o 'decoded.txt' -a 'decode'

// // TODO-SAT:если переданы все аргументы, приложение читает из файла и записывает в файл зашифрованный/расшифрованный текст, при этом предыдущие записи не удаляются
// TODO-SAT:если переданы аргументы с путями к файлам, но файлы отсутствуют (или к ним невозможен доступ), приложение передает соответствующее сообщение в process.stderr и прoцесс завершается с кодом, отличным от 0
// TODO-SUN:если не передан аргумент с путем до файла на чтение, то чтение осуществляется из process.stdin
// // TODO-SUN:если не передан аргумент с путем до файла на запись, то вывод осуществляется в process.stdout
