// express
var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
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

// email
var transporter = nodemailer.createTransport(directTransport({}));

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

app.post('/contact', function(request, response) {
	console.log(JSON.stringify(request.body));
	var mailOptions = {
	    from: request.body.name + ' ' + '<' + request.body.email + '>', // sender address
	    to: 'brandon.smith.945@gmail.com', // list of receivers
	    subject: 'Portfolio Contact', // Subject line
	    text: request.body.message // plaintext body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
		response.send();
	});
});




// start
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port') + '...');
