
/*
 * A CRUD example that uses MongoDB
 */

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

// Let's require the mongodb package
var app = express();

// Let's require the mongodb package
var mongo = require('mongodb');

// Get the MongoClient Object
var mongoClient = mongo.MongoClient;

// Connect to the db. The callback function will be passed two arguments: err - which
// will contain error information, and db - which will contain a connection to the
// mongodb Database
mongoClient.connect("mongodb://localhost:27017/shoppingList", function(err, db) {
  if(!err) {
    console.log("We are connected");
    // Store the connection to the mongodb database on the aplication object
    // under the name db so that I can access in another file
    app.set('db', db);
  }
  else {
    throw err;
  }
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser('mongodb'));
app.use(express.session());

app.use(express.bodyParser());

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



app.get('/', routes.index);
app.get('/registerPlayer', routes.registerPlayer);
app.get('/registerClub', routes.registerClub);
app.get('/player_profile', routes.player_profile);
app.get('/teamSelection', routes.teamSelection);

app.post('/processLogin', routes.processLogin);
app.post('/processRegisterClub', routes.processRegisterClub);
app.post('/processRegisterPlayer', routes.processRegisterPlayer);


app.get('/logout', routes.logout);


app.get('/getDataBlock', routes.getDataBlock);
app.get('/getDataBlockChart', routes.getDataBlockChart);

app.post('/api/saveData', api.saveData);
app.post('/api/getData', api.getData);
app.post('/api/compareLogin', api.compareLogin);







http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
