const fs = require("fs");
const { parse, basename, join } = require("path");
let services = {};
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename(__filename) &&
      file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    services[parse(file).name] = require(join(__dirname, file));
  });

module.exports = {
  ...services,
};
