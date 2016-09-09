var mongoose = require('mongoose');
//var slug = require('slug');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Post = new Schema({
    isPublished   : { type: Boolean },
    isExternalLink: { type: Boolean },
    date          : { type: Date, default: Date.now },
		title					: { type: String, stringType: 'short' },
    titleSlug			: { type: String, stringType: 'short' },
    imageUrl      : { type: String, stringType: 'short' },
    description  	: { type: String, stringType: 'long' },
		body        	: { type: String, stringType: 'long' },
    externalLink  : { type: String, stringType: 'short' }
});

Post = mongoose.model('Post', Post);

Post.schema.pre('save', function(next) {
	//this.titleSlug = slug(this.name).toLowerCase();
	next();
});
Post.schema.pre('save', function(next) {
  if(this.description.length == 0) {
    this.description = this.body;
  }
	next();
});

module.exports = { Post: Post };
