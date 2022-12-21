const crypto = require('crypto');
const TransformToHex = require('./transformHash').TransformToHex
const TransformByMulti = require('./transformDigit').TransformByMulti
const ReadableRandom = require('./readable').ReadableRandom
const WritableConsole = require('./writable').WritableConsole
const fs = require('fs');

const oneTask = () => {
  const wrstream = fs.createWriteStream('hash.txt')
  const rdstream = fs.createReadStream('logs.log')

  const hash = crypto.createHash('md5')
  let hashPipe = rdstream.pipe(hash)

  hashPipe.pipe(process.stdout)
  hashPipe.pipe(wrstream)

  return wrstream
}

const twoTask = () => {
  const wrstream = fs.createWriteStream('hash.txt', {flags: 'a'})
  const rdstream = fs.createReadStream('logs.log')

  const hex = new TransformToHex()
  const hashPipe = rdstream.pipe(hex)

  console.log('')
  hashPipe.pipe(process.stdout)
  hashPipe.pipe(wrstream)
  wrstream.write('\n')

  return wrstream
}

const threeTask = () => {
  const options = {highWaterMark: 1};
  const readable = new ReadableRandom(options);
  const transformDigit = new TransformByMulti(2, options);
  const writable = new WritableConsole(options);

  console.log('')
  readable.on('data', (data) => {
    console.log(`Исходные данные - ${data}`);
  })

  readable
    .pipe(transformDigit)
    .pipe(writable);
}

oneTask().on('finish', () => {
  twoTask().on('finish', () => {
    threeTask();
  })
})