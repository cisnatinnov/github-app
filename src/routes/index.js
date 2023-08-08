const fs = require('fs');
const path = require('path');
const modules = {};

try {
  let modulePath = path.join(__dirname, '/');
  let files = fs.readdirSync(modulePath).filter((file) => {
    return file !== 'index.js';
  })
  files.forEach((o) => {
    let routeName = o.slice(0, -3);
    modules[routeName] = require(modulePath + routeName);
  })
} catch (err) {
  console.log(err);
}

module.exports = modules;