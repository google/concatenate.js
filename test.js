

var test = require('tap').test;
var concatenate = require('./concatenate');

test('simple', function(t) {
  var js = concatenate([
      {
        content: 'function foo() {alert("foo");\nalert("foo2")}',
        filename: 'js/foo.js'
      },
      {
        content: 'function bar() {return "ret"}',
        filename: 'js/bar.js',
        hostname: 'app2'
      }
  ]);

  eval(js);

  t.is(typeof foo, 'function');
  t.is(typeof bar, 'function');
  t.is(bar(), 'ret');
  t.end();
});

test('syntax error', function(t) {
  var js = concatenate([
      {
        content: 'function foo() {alert("foo");\nalert("foo2")}',
        filename: 'js/foo.js'
      },
      // Leading )
      {
        content: ')function bar() {return "ret"}',
        filename: 'js/syntax-error.js',
        hostname: 'app2'
      }
  ]);

  var error;
  try {
    eval(js);
  } catch(e) {
    error = e;
  }

  t.is(typeof foo, 'function');
  t.is(typeof bar, 'undefined');
  t.ok(!!error);
  t.ok(/syntax-error\.js/.test(error.message));
  t.end();
});

test('runtime error', function(t) {
  var js = concatenate([
      {
        content: 'function foo() {throw new Error("foo")}',
        filename: '/js/foo.js'
      },
      {
        content: 'function bar() {throw new Error("bar")}',
        filename: 'js/bar.js',
        hostname: 'app2'
      }
  ]);
  eval(js);
  t.is(typeof foo, 'function');
  t.is(typeof bar, 'function');

  try {
    foo();
  } catch(e) {
    t.is(e.message, 'foo');
    t.ok(/http\:\/\/app\/js\/foo\.js/.test(e.stack));
  }

  try {
    bar();
  } catch(e) {
    t.is(e.message, 'bar');
    t.ok(/http\:\/\/app2\/js\/bar\.js/.test(e.stack));
  }
  t.end();
});
