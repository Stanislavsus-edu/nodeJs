const Readable = require('stream').Readable;
const crypto = require('crypto');

class ReadableRandom  extends Readable  {
  constructor(options) {
    options.objectMode = true;
    super(options);
  }

  _read(size) {
    this.push(String(Math.round(Math.random()*10)));
  }
}

module.exports = {ReadableRandom}