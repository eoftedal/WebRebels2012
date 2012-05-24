var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {
  function getQuote(symbol) {
    return 20 + symbol.charCodeAt(0);
  }
  if (request.method === 'POST') {
      var data = '';
      request.addListener('data', function(chunk) { data += chunk; });
      request.addListener('end', function() {
        try {
          console.log(data);
          var stockQuery = eval("(" + data + ")");
          var price = getQuote(stockQuery.symbol);
          var res = '{"symbol": "' + stockQuery.symbol + '" , "price": ' + price + '}'
          response.writeHead(200, {'Content-Type': 'application/json', 'Content-Length' : res.length });
          response.end(res);
        } catch(e) {
          response.writeHead(500);
          response.end('' + e);
        }
      });
    
  }
  if (request.method == "GET") {
    fs.readFile('./index.html', function(error, content) {
    if (error) {
      response.writeHead(500);
      response.end();
    }
    else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
  }

}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
