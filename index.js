// express
var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var cms = require('thin-cms');
var moment = require('moment');

// database
mongoose.connect(process.env.db_url, {
  user: process.env.db_user,
  pass: process.env.db_pass
});
var models = require('./models/Post');

// application
var app = express();
var oneDay = 8.64e+7;
app.use(express.static('public', { maxAge: oneDay }));

// body parser
app.use(bodyParser.urlencoded());

// templating engine
nunjucks.configure(
  [ 'views', 'views/partials' ],
  {
    autoescape: true,
    noCache: true,
    express: app
  }
)
.addFilter('postDate', function(date) {
  return moment(date).format('MMMM Do, YYYY');
});

// email
var transporter = nodemailer.createTransport(directTransport({}));

// pages
app.get('/', function(req, res) {
  models.Post
    .find({
      isPublished: true
    })
    .sort({ date: -1 })
    .limit(3)
    .exec(function(err, results){

      if(err) {
        res.status(500).send('There was an error'); // TODO: 404/500 pages
      } else {
      	res.render('index.html', {
          recentPosts: results
        });
      }

    });
});
app.get('/posts-and-projects', function(req, res) {

  models.Post
    .find({
      isPublished: true
    })
    .sort({ date: -1 })
    .exec(function(err, results){

      if(err) {
        res.status(500).send('There was an error'); // TODO: 404/500 pages
      } else {
      	res.render('posts-and-projects.html', {
          posts: results
        });
      }

    });

});
app.get('/contact', function(req, res) {
	res.render('contact.html');
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
		res.render('thank-you.html');
	});
});



// start
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port') + '...');

// cms
cms.init(process.env.db_url, {
  'Post': models.Post
});
