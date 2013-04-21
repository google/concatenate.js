// For playing with the output see http://jsbin.com/ekahes/2/edit

var concatenate = require('./concatenate');

console.log(concatenate([
  {
    content: 'exports.foo = function() {}',
    filename: 'js/foo.js'
  },
  {
    content: 'exports.bar = function() {}',
    filename: 'js/bar.js'
  }
], function(content, file) {
  return 'registerModule(' + JSON.stringify(file.filename) +
      ', function(exports, module) {' + content + '});\n\n';
}));