const fs = require('fs/promises');

// module.exports = async function (path) {
//   const files = await fs.readdir(path);
//   const dataFiles = []
//   for (const file of files){
//     const dataFile = await fs.readFile(`${path}${file}`, "utf-8")
//     dataFiles.push({name: file, content: dataFile})
//   }
//   return dataFiles
// }

module.exports = async function (path) {
  const files = await fs.readdir(path);
  return Promise.all(files.map( async (cur) => await {name: cur, content: await fs.readFile(`${path}${cur}`, "utf-8")} ))
  }