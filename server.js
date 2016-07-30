var restify = require('restify');
var request = require('request');

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('/', function handle(req, res, next) {
  var key = req.headers.authorization;
  var latlng = req.query.lat + ',' + req.query.lng;
  request('https://maps.googleapis.com/maps/api/geocode/json?latlng='+latlng+'&key=' + key, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var bundle = {};
      var addr = JSON.parse(body);
      bundle.address = addr.results[0]['formatted_address'];
      addr = addr.results[0]['address_components'];
      addr.forEach(function(ele, i) {
        if (ele.types[0] == 'locality') {
          bundle.city = ele['long_name'];
        }
        if (ele.types[0] == 'administrative_area_level_1') {
          bundle.state = ele['long_name'];
        }
        if (ele.types[1] == 'sublocality') {
          bundle.area = ele['long_name'];
        }
      });
      res.send(bundle);
    } else {
      res.send(500, error);
    }
  })
});

server.listen(8080, function() {
    console.log('listening: %s', server.url);
});
