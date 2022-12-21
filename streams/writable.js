const Writable = require('stream').Writable ;
const crypto = require('crypto');

class WritableConsole extends Writable  {

  _write(chunk, encoding, done) {
    console.log(`Полученные данные - ${chunk}`);
    done();
  }
}

module.exports = {WritableConsole}