var mongoose = require('mongoose');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var PostSchema = new Schema({
  title     : { type: String, required: false },
  body      : { type: String },
  imageUrl  : { type: String },
  date      : { type: Date, default: Date.now }
});

Post = mongoose.model('Post', PostSchema);

module.exports = { Post: Post, PostSchema: PostSchema };
