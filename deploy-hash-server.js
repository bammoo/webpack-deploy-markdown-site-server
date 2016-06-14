var http = require("http");
var requestify = require("requestify");
var url = require("url");
var path = require('path');
var fs = require("fs");
var tplHtml = path.resolve(__dirname, './tpl.html')
var outputHtml = '__PATH_OF_INDEX_HTML__/index.html'
var jsLinkDir = 'http://__CDN_URL__/site-assets/'

var startCopyHtml = function(newhash) {
  var jsLink = jsLinkDir + 'build.' + newhash + '.js'

  var tplContent = fs.readFileSync(tplHtml).toString()
  tplContent = tplContent.replace('__VERSION__', newhash)

  var tryCount = 0
  // CDN 回源
  var tryMax = 20
  var timer = null
  var _copyHtml = function() {
    tryCount++
    if(tryCount === tryMax) {
      timer = null
      return
    }
    requestify.get(jsLink)
      .then(function(res) {
        if(res.getCode() === 200) {
          fs.writeFile(outputHtml, tplContent, function(err){
            console.log('Update hash err:', err)
          })
        }
        else {
          console.log('new file 404');
          timer = setTimeout(_copyHtml, 3000)
        }
      })
  }

  _copyHtml()
}

http.createServer(function(req, res) {

  var parsedUrl = url.parse(req.url, true); // true to get query as object
  var queryAsObject = parsedUrl.query;

  if(queryAsObject.newhash && /^[a-z|0-9]{20}$/.test(queryAsObject.newhash)) {
    startCopyHtml(queryAsObject.newhash)
  }

  res.end(null);
}).listen(8080);

console.log("Server listening on port 8080");

