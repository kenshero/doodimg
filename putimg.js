var https = require('https');
var fs = require('fs');

https.get("https://graph.facebook.com/v1.0/204098339714284/photos?type=uploaded&limit=200", function(response) {
  var result = '';
  response.on('data', function (chunk) {
    result += chunk;
  });
  response.on('end', function (chunk) {
    var photos = JSON.parse(result);
    var count=0;
    for(var i=0;i<photos.data.length;i++) {
      var photo = photos.data[i];
      console.log(photo.id);
      ++count;
      downloadImage(photo.id, photo.source);
    }
    console.log(count);
  });

});

function downloadImage(id, url) {
  var file = fs.createWriteStream(id + '.jpg');
  var request = https.get(url, function(response) {
    response.pipe(file);
  });
}