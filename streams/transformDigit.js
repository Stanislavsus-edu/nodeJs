const Transform  = require('stream').Transform;
const crypto = require('crypto');

class TransformByMulti extends Transform {
  constructor(multiplier, options) {
    options.objectMode = true;
    super(options);
    this.multiplier = multiplier
  }

  _transform(chunk, encoding, done) {
    let result = null, error = null;
    try {
      result = parseInt(chunk) * this.multiplier;
    } catch (e) {
      error = e.message;
    }
    setTimeout(() => {
      done(error, result);
    }, 1000);
  }
}

module.exports = {TransformByMulti}