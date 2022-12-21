const fs = require('fs/promises');

module.exports = {
  read: async (file) => {
    return await fs.readFile(file, "utf-8")
  },
  write: async (file, data) => {
    await fs.writeFile(file, data, "utf-8")
    return file
  }
}