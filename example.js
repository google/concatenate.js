var concatenate = require('./concatenate');

console.log(concatenate([
  {
    content: 'function foo() {alert("foo");\nalert("foo2")}',
    filename: 'js/foo.js'
  },
  {
    content: 'function bar() {alert("bar");\nalert("bar2")}',
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