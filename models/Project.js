var mongoose = require('mongoose');

var Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var ProjectSchema = new Schema({
  name        : { type: String, required: false },
  description : { type: String },
  imageUrl    : { type: String },
  projectUrl  : { type: String, required: false },
  inProgress  : { type: Boolean },
  date        : { type: Date, default: Date.now }
});

Project = mongoose.model('Project', ProjectSchema);

module.exports = { Project: Project, ProjectSchema: ProjectSchema };
