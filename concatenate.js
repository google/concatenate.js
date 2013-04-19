
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


function sanitizeSingleLineComment(str) {
  return str.replace(/[\n\r]/g, '');
}