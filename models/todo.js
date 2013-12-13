var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	type: String,
	text: String,
	createdOn: { type: Date, default: Date.now },
	completed: Boolean,
	completedOn: Date,
	notes: [{body: String, createdOn: Date}]
});

module.exports = mongoose.model('Todo', todoSchema);