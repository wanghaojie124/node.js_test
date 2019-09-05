var request = require('request');
var o =[]
var fs = require('fs')
var album_id_list = [1,2,3]

function saveTodb() {
	setTimeout(function(){
		console.log(23333);
	},8000);
}

function getAlbumTitleAndUserId(album_id_list) {                 
	for (var album_id in album_id_list){
	var url = 'https://jsonplaceholder.typicode.com/albums/' + album_id_list[album_id] 
	request(url, function function_name(error,response,body) {          
	  data = JSON.parse(body)
	  getUserName(data) 
	                                       
	})    
	}
	saveTodb()                                                                
}         

function getUserName(data) {                 
  	
  	var url = 'https://jsonplaceholder.typicode.com/users/' + data['userId'] 	
  	request(url, function function_name(error,response,body) {          
  		user_data = JSON.parse(body)             
  		var result = {}
  		result.album_id = data['id']
  		result.username = user_data['username']
  		result.title = data['title']
  		o.push(result)
  })
                                                  
}


// getAlbumTitleAndUserId(album_id_list)

// setTimeout(function(){console.log(o);},8000)


// fs.writeFile('./albums', o, 'utf8', function (err) {
// 	if (err) {
//     console.log('文件写入错误，错误是：'+ err);
//   } else {
//     console.log('ok');
//   }
// });