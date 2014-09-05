var https = require('https');
var fs = require('fs');

var url ="https://graph.facebook.com/SleepingForLessAndroidProgramming/photos?type=uploaded";

getfb(url);

  function getfb(url){

    https.get(url, function(response) {
      var result = '';
      response.on('data', function (chunk) {
        result += chunk;
      });

        response.on('end', function (chunk) {
        var photos = JSON.parse(result);

        for(var i=0;i<photos.data.length;i++) {
          var photo = photos.data[i];
          console.log(photo.id);
          downloadImage(photo.id, photo.source);
        }
          console.log(photos.data.length);
          
          if(photos.paging.next !== undefined)
           {
            console.log(photos.paging.next);
            getfb(photos.paging.next);
           }
           else{
            console.log("gg");
           }

      });

    });
 }

    function downloadImage(id, url) {
      var file = fs.createWriteStream('./images/'+id + '.jpg');
      var request = https.get(url, function(response) {
        response.pipe(file);
      });
    }