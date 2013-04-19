
/**
 * Turns JS "files" into a string of concatenated JS that when evaluated in the
 * browser will maintain the original files in the Dev Tools.
 *
 * @param {!Array.<{
 *     content: string,
 *     filename: string,
 *     hostname: (string|undefined)
 * }>} files A list of JS "files".
 * @return {string} The concatenated JS.
 */
module.exports = function(files) {
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