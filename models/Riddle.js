var mongoose = require('mongoose');

var RiddleSchema = new mongoose.Schema({
	text: String,
	category: String,
	tip: String,
	explenation : String
	
});
mongoose.model('Riddle', RiddleSchema);
