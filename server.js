// express
var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
/*
var mongoose = require('mongoose');
*/

// database
/*
mongoose.connect('mongodb://localhost:27017');
var models = require('./model/File');
*/

// application
var app = express();
var oneDay = 8.64e+7;
app.use(express.static('public', { maxAge: oneDay }));

// body parser
app.use(bodyParser.urlencoded());

// templating engine
swig.setDefaults({ cache: false });
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('view cache', false);


// pages
app.get('/', function(request, response) {
  response.render('index.html');
});
app.get('/projects', function(request, response) {
  response.render('projects.html');
});
app.get('/contact', function(request, response) {
  response.render('contact.html');
});






// start
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port') + '...');
