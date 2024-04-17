var http = require('http');
var fs = require('fs');
http.createServer(function (request, response) {
  if(request.url === '/favicon.ico'){
    fs.readFile("../favicon.ico",function(err,data){
      if(err) throw err;
      response.writeHead(200, {'Content-Type': 'image/png'});
      return response.end(data)
    })
  }else if(request.url === '/'){
    fs.readFile('./login.html' + request.url,function(err,data){
      if(err) throw err;
      return response.end(data)
    })
  }else if(request.url.endsWith('.map')){
    return response.end('ok')
  }else{
    fs.readFile('./' + request.url,function(err,data){
      if(err) throw err;
      return response.end(data)
    })
  }
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');