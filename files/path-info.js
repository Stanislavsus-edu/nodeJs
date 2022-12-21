const fs = require('fs');

module.exports = function (path, callback) {
  fs.stat(path, (e, stats) => {
    callback(e, {
      path,
      type: stats.isDirectory() ? 'directory' : stats.isFile() ? 'file': undefined,
      content: stats.isFile() ? fs.readFileSync(path, 'utf-8') : undefined,
      childs: stats.isDirectory() ? fs.readdirSync(path) : undefined,
    })
  })
}