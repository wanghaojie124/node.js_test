var http = require('http');
var url = require('url');
var request = require('request');
var querystring = require('querystring');
var o = []
var album_id_list = []

function makeExceptionRespons(status_code,msg,response){
  response.writeHead(status_code,{'Content-Type': 'text/plain'});
  response.end(JSON.stringify({'status_code': status_code,'msg': msg}))
}

function indexView(request,response){
  if(request.method == 'GET'){
    response.writeHead(200,{'Content-Type': 'application/json'});
    response.end(JSON.stringify({'status_code':200, 'msg':'this is index resource'}))
  }else{
    makeExceptionRespons(403,'method is not allowed', response)
  }
}


function logView(request, response) {
  if (request.method == 'POST') {
    currentData = ''
    obj = {}
    request.on('data',function(chunk){
      currentData += chunk
      album_id_list = JSON.parse(currentData)['album_id_list'];
      obj.album_id_list = album_id_list
      for (let index in album_id_list){
        getAlbumTitleAndUserId(album_id_list[index],album_id_list.length);
      }
      
    })
    setTimeout(function(){
      response.writeHead(200,{'Content-Type': 'application/json'});
      response.end(JSON.stringify({'status_code':200, 'msg':'this is log resource','album_id_list':obj.album_id_list}))
    },1000);
  }else{
    makeExceptionRespons(403,'method is not allowed', response)
  }
}

router = {
  '/':indexView,
  '/v1/log':logView
}


function saveTodb() {
    console.log("coming!");
    console.log(o);
    o = [];
}

function getAlbumTitleAndUserId(album_id,id_num) {                 

      var url = 'https://jsonplaceholder.typicode.com/albums/' + album_id 
      request(url, function function_name(error,response,body) {          
      data = JSON.parse(body)
      getUserName(data, id_num)
      console.log('id:', album_id, url);
  })                                       
}         

function getUserName(data, id_num) {                 
    
    var url = 'https://jsonplaceholder.typicode.com/users/' + data['userId']  
    request(url, function function_name(error,response,body) {          
      user_data = JSON.parse(body)             
      var result = {}
      result.album_id = data['id']
      result.username = user_data['username']
      result.title = data['title']
      o.push(result)
      if(o.length==id_num){
        saveTodb()
      }
  })
                                                  
}

function makeResponse(request,response) {
  var pathname = url.parse(request.url).pathname;
  console.log(pathname)
  viewFunc = router[pathname]
  if(typeof(viewFunc)!= 'function'){
    makeExceptionRespons(404,'resource is not existed', response)
  }else{
    viewFunc(request,response)
  }
}
http.createServer(function(request,response){
  makeResponse(request,response)
}).listen(8080);
console.log('Server running at http://0.0.0.0:8080');