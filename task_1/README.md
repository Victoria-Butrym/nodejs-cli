# Caesar CLI cipher tool

This is a CLI tool that is used to encode and decode text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)

## Prepare

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository using `git clone`: https://github.com/Victoria-Butrym/nodejs-cli
3. Switch to branch `cli-cipher`
4. Go to folder `task_1`
5. To install all dependencies use [`npm install`](https://docs.npmjs.com/cli/install)

## Options:

CLI tool accepts 4 options (short alias and full name):

1. **-s, --shift \<number>** a shift
2. **-i, --input \<filename>** an input file path
3. **-o, --output \<filename>** an output file path
4. **-a, --action [type]** an action encode/decode

**Warning!**
Action (encode/decode) and the shift are required

## Usage example:

```bash
$ node app.js -s 7 -i './text.txt' -o './encoded.txt' -a 'encode'
```

```bash
$ node app.js --shift 7 --input './text.txt' --output './encoded.txt' --action 'encode'
```

```bash
node app.js --shift 7 --input './encoded.txt' --output './decoded.txt' --action 'decode'
```

**P.S.** If you're using **stdin** as an input source, press <kbd>Ctrl</kbd> + <kbd>C</kbd> to exit the process and see all transformed text in the output file
