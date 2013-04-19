concatenate.js
==============

Provides a function to concatenate a list of JavaScript files into a single output stream in a way that, when executed in the browser, maintains the illusion in JS development tools, that the files had been loaded as individual script tags.

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

For simulating a CommonJS environment you may consider calling concatenate(…) with a single file and embedding the output inside the module-wrapping closure. Due to the nature of non-global JS eval that should work just fine.
