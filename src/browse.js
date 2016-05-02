const Horseman = require('node-horseman');
const horseman = new Horseman();

function browse(url) {
  return horseman
    .open(url)
    .html();
}

module.exports = browse;
