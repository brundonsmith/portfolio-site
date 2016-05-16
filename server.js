// express
var express = require('express');
var bodyParser = require('body-parser');
var swig = require('swig');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var mongoose = require('mongoose');
var materialCms = require('../material-cms');

// database
if(process.env.db_user && process.env.db_pass) {
  mongoose.connect('mongodb://' + process.env.db_user + ':' + process.env.db_pass + '@ds023432.mlab.com:23432/portfolio');
} else {
  console.error('No database credentials specified. Use environment variables db_user and db_pass.');
}
var Post = require('./models/Post');
var Project = require('./models/Project');

// CMS
materialCms.init(
  'ds023432.mlab.com:23432/portfolio',
  {
    Post: Post.PostSchema,
    Project: Project.ProjectSchema
  }
);

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

    Project.Project
      .find({})
      .sort({ date: 'descending' })
      .limit(3)
      .exec(function(err, result) {
        response.render('index.html', { projects: result })
      });

});
app.get('/projects', function(request, response) {

  Project.Project
    .find({})
    .sort({ inProgress: 'descending', date: 'descending' })
    .exec(function(err, result) {
      response.render('projects.html', { projects: result })
    });

});
app.get('/contact', function(request, response) {
	response.render('contact.html');
});
app.get('/blog', function(request, response) {

  Post.Post
    .find({})
    .limit(5)
    .sort({ date: 'descending' })
    .exec(function(err, result) {

      response.render('blog.html', { posts: result })
    });

});
/*
app.get('/thank-you', function(request, response) {
	response.render('thank-you.html');
});*/

app.post('/contact', function(request, response) {
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
		response.render('thank-you.html');
	});
});


// start
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
console.log('Listening on port ' + app.get('port') + '...');
