const Transform  = require('stream').Transform;
const crypto = require('crypto');

class TransformToHex extends Transform {
  constructor(options) {
    super(options)
    this.crypto = crypto.createHash('md5')
  }

  _transform(chunk, encoding, done) {
    this.crypto.update(chunk);
    this.push(this.crypto.digest('hex'));
    done();
  }
}

module.exports = {TransformToHex}