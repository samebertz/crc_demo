/* jshint node: true */
/* jshint esversion: 6 */

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var baseDirectory = __dirname;

var port = 30000;

http.createServer(function (request, response) {
  try {
    if (request.method == 'POST') {
      console.log("POST");
      var body = '';
      request.on('data', function (data) {
        body += data;
        console.log("Partial body: " + body);
      });
      request.on('end', function () {
        console.log("Body: " + body);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(body, 'utf8');
        response.end('post received');
      });
    } else {
      var requestUrl = url.parse(request.url);
      var fsPath = baseDirectory+path.normalize(requestUrl.pathname);

      response.writeHead(200);
      var fileStream = fs.createReadStream(fsPath);
      fileStream.pipe(response);
      fileStream.on('error',function(e) {
        response.writeHead(404);
        response.end();
      });
    }
  } catch(e) {
    response.writeHead(500);
    response.end();
    console.log(e.stack);
  }
}).listen(port);
console.log("listening on port "+port);
