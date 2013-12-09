
/**
 * Module dependencies.
 */

var express	= require('express'),
	routes	= require('./routes'),
	user	= require('./routes/user'),
	qr		= require('./routes/qr'),
	imgurand= require('./routes/imgurand'),
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

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/qr', qr.index);
app.get('/imgurand', imgurand.index);
//app.get('/getri', imgurand.getri);
app.get('/envcheck', function (req, res){res.send(app.get('env'));});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
