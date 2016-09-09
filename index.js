// express
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var mongoose = require('mongoose');
var handlebars  = require('express-handlebars');

// database
//mongoose.connect('mongodb://localhost:27017');
var models = require('./models/Post');

// application
var app = express();
var oneDay = 8.64e+7;
app.use(express.static('public', { maxAge: oneDay }));

// body parser
app.use(bodyParser.urlencoded());

// templating engine
app.engine('html', handlebars( {
  extname: '.html',
  partialsDir: 'views/partials/'
} ));
app.set('view engine', 'html');
app.set('views', 'views/');

// email
var transporter = nodemailer.createTransport(directTransport({}));

// pages
app.get('/', function(req, res) {
	res.render('index');
});
app.get('/projects', function(req, res) {
	res.render('projects');
});
app.get('/contact', function(req, res) {
	res.render('contact');
});
app.post('/contact', function(req, res) {
	var mailOptions = {
	    from: req.body.name + ' ' + '<' + req.body.email + '>', // sender address
	    to: 'brandon.smith.945@gmail.com', // list of receivers
	    subject: 'Portfolio Contact', // Subject line
	    text: req.body.message // plaintext body
	};

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent');
		res.render('thank-you');
	});
});


// start
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port') + '...');
