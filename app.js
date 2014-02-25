
/**
 * Module dependencies.
 */

var express	= require('express'),
	routes	= require('./routes'),
	user	= require('./routes/user'),
	qr		= require('./routes/qr'),
	imgurand= require('./routes/imgurand'),
	recipes	= require('./routes/recipes'),
	mongoose= require('mongoose'),
	http	= require('http'),
	path	= require('path');

if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Cuprobot' // optional
  });
}

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

console.log(app.get('env'));

/*
 * Connection String.
 * Should be using Environment Variables
 */
mongoose.connect('mongodb://crackerjack:ShitStain567@ds053658.mongolab.com:53658/heroku_app20217757');

/*
 * Toys and whatnots
 */
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/qr', qr.index);
app.get('/imgurand', imgurand.index);
app.get('/imgurand/', imgurand.index);
app.get('/envcheck', function (req, res){res.send(app.get('env'));});


/*
 * Recipes Book
 */
app.get('/recipes', recipes.index);
app.get('/recipe/:id', recipes.fetch);
app.post('/recipe', recipes.add);
app.put('/recipe/:id', recipes.update);
app.delete('/recipe/:id', recipes.delete);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
