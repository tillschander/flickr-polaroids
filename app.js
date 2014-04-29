var express 	= require('express'), 
	cons 		= require('consolidate'),
	server 		= express(),
	FlickrAPI 	= require('flickrnode').FlickrAPI,
	apiKey 		= require('./api-key'),
	api_key 	= apiKey.api_key,
	api_secret 	= apiKey.api_secret,
	flickr 		= new FlickrAPI(api_key, api_secret);

server.engine('html', cons.mustache);
server.set('view engine', 'html');
server.set('views', __dirname + '/views');
server.use(express.static(__dirname + '/public'));

server.get("/login", function(req, res) {
	//res.set('Content-Type', 'application/json');
	flickr.getLoginUrl("write", null, function(error, url, frob) {
		//var r = {frob: frob, url: url};
		//res.write(JSON.stringify(r));
		//res.end();
		res.redirect(url);
	});
});

server.get("/auth", function(req, res) {
	res.set('Content-Type', 'application/json');
	var frob = req.params.frob, r;
	flickr.auth.getToken(frob, function(error, results) {
		if (!error) {
			r = results;
		} else {
			r = error;
		}
		res.write(JSON.stringify(r));
		res.end();
	});
});

server.get("/search/:term", function(req, res) {
	flickr.photos.search({tags:req.params.term, per_page: 10},  function(error, results) {
		if (!error) {
			res.render('search', results);
		} else {
			r = error;
			res.end(JSON.stringify(r));
		}
	});
});

server.get("/", function(req, res) {
	res.redirect('/search/kittens');
});

server.listen(10766);

