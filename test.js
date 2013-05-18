/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


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

test('filename content', function(t) {
  var js = concatenate([
      {
        content: 'function foo() {alert("foo");\nalert("foo2")}',
        filename: 'js/foo.js\n\r\u2028\u2029\n\r\u2028\u2029'
      },
      {
        content: 'function bar() {return "ret"}',
        filename: 'js/bar.js\n\r\u2028\u2029',
        hostname: 'app2\n\r\u2028\u2029\n\r\u2028\u2029'
      }
  ]);

  t.ok(js.indexOf('js/foo.js"') != -1);
  t.ok(js.indexOf('js/bar.js"') != -1);
  t.ok(js.indexOf('app2/') != -1);

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
