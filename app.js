
/*
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

/*
 * Node Time Plugin
 */
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Cuprobot'
  });
}

/*
 * Ladies and gentlemen we have an app.
 */
var app = express();

/*
 *all environments
 */
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.compress());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*
 * Connection String.
 * Using Environment Variables
 */
console.log(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGOLAB_URI);

/*
 * Toys and whatnots
 *     Any games are tools will be put here.
 *		 This is for things that don't database
 *     Things with 'rest-like' database interactions will go below.
 */
app.get('/', routes.index);
app.get('/qr', qr.index);
app.get('/imgurand', imgurand.index);
app.get('/imgurand/', function(req, res){res.redirect(301, '/imgurand');});
app.get('/envcheck', function (req, res){res.send(app.get('env'));});


/*
 * Recipe Book
 */
app.get('/recipes', recipes.index);
app.get('/recipe/:id', recipes.fetch);
app.post('/recipe', recipes.add);
app.put('/recipe/:id', recipes.update);
app.delete('/recipe/:id', recipes.delete);


/*
 * Make the server listen on app.get('port')
 */
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
