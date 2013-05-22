// For output, see try http://jsbin.com/oradut/1/edit with Chrome Dev Tools.

var concatenate = require('./concatenate');

console.log(concatenate([
  {
    content: 'function foo() {\n  alert("foo");\n  alert("foo2");\n}\n',
    filename: 'js/foo.js'
  },
  {
    content: 'function bar() {\n  alert("bar");\n  alert("bar2");\n}\n',
    filename: 'js/bar.js',
    hostname: 'app2'
  },
  // Runtime error
  {
    content: 'boom();',
    filename: 'js/runtime-error.js'
  },
  // Syntax error
  {
    content: '(function bar() {alert("bar");\nalert("bar2")}',
    filename: 'js/syntax-error.js'
  }
]));