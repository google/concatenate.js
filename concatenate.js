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


/**
 * @typedef {{
 *     content: string,
 *     filename: string,
 *     hostname: (string|undefined)
 * }}
 */
var File;


/**
 * Turns JS "files" into a string of concatenated JS that when evaluated in the
 * browser will maintain the original files in the Dev Tools.
 *
 * @param {!Array.<File>} files A list of JS "files".
 * @param {(function(string, File):string)=} opt_wrap
 * @return {string} The concatenated JS.
 */
module.exports = function(files, opt_wrap) {
  var allJs = '';
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var content = file.content;
    var filename = sanitizeSingleLineComment(file.filename).replace(/^\//, '');
    var hostname = sanitizeSingleLineComment(file.hostname || 'app');
    var url = 'http://' + hostname + '/' + filename;
    content += '\n//@ sourceURL=' + url;
    var js = 'eval(' + JSON.stringify(content) + ');\n';

    js = 'try{' + js + '}catch(e){if(!e.fileName)e.message+=' +
        JSON.stringify(' ' + url) + ';throw e}\n\n';
    if (opt_wrap) {
      js = opt_wrap(js, file);
    }
    allJs += js;
  }
  return allJs;
};


/**
 * @param {string} str
 * @return {string}
 */
function sanitizeSingleLineComment(str) {
  return str.replace(/[\n\r\u2028\u2029]/g, '');
}
