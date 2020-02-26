const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ItemSchema = new schema({
	name:{
		type : String,
		required : true
	},
	date:{
		type: Date,
		default: Date.now
	},
})

module.exports = item = mongoose.model('item',ItemSchema);