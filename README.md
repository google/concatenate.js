concatenate.js
==============

Demonstrates a technique to bundle large numbers of JS files into a single file while maintaining the original file boundaries and names inside development tools. Use this to make your JavaScript serving system be awesome during development without the complexity of source maps.

The module rovides a single function to concatenate a list of JavaScript files into a single output stream in a way that, when executed in the browser, maintains the illusion in JS development tools, that the files had been loaded as individual script tags.

## When would you use it

- When you have too many JS files to make loading via script tags feasible (because the HTTP requests take too long) during development.
- As a component of i.e. browserify to deliver slightly modified JS files in a single response while maintaining the original files.
- ONLY FOR DEVELOPMENT, DO NOT USE THIS IN PRODUCTION!

## Usage

    var js = require('./concatenate')([
      {
        content: 'function foo() {alert("foo")}',
        filename: 'js/foo.js'
      },
      {
        content: 'function bar() {alert("bar")}',
        filename: 'js/bar.js',
        hostname: 'app2'
      }
    ]);

Specifying the hostname is optional, the default is 'app'. Chrome Dev Tools groups JS files under the hostname.

## How does it work

This is using multiple eval calls with [@sourceURL](https://blog.getfirebug.com/2009/08/11/give-your-eval-a-name-with-sourceurl/) annotations in a single output stream.

## How about source maps

This is better than source maps under these circumstances:
- Your input language is JS
- You are not working with obfuscated JS

Why is it better:
- This is the real deal. The browser acts like there were real files. No leaky abstractions.
- Also: This is just super simple, no special parsing or anything like that required at any point in the process.

## Limitations

When you have a syntax error at least V8 based browsers will not show you a line number.

## Browser support

(For the generated JS)

- Chrome Dev Tools
- Safari Dev Tools
- Firebug (Not recommended. It gets really slow with large numbers of files)

## Advanced Usage

The exported function supports a second param which is a funcion that gets to modify the output after the eval was added. You may find this useful for i.e. adding CommonJS module wrappers. For an example see example_common_js_simulator.js.

## Fine print

Pull requests are very much appreciated. Please sign the [Google Code contributor license agreement](http://code.google.com/legal/individual-cla-v1.0.html) (There is a convenient online form) before submitting.

<dl>
  <dt>Author</dt><dd><a href="https://github.com/cramforce">Malte Ubl (Google Inc.)</a></dd>
  <dt>Copyright</dt><dd>Copyright © 2013 Google, Inc.</dd>
  <dt>License</dt><dd>Apache 2.0</dd>
</dl>
