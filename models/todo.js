var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
	type: String,
	text: String,
	created: { type: Date, default: Date.now },
	completed: Boolean,
	completedOn: Date,
	notes: [{body: String createdOn: Date]
});
