const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
	name:{
		type : String,
		required : true
	},
	date:{
		type: Date,
		default: Date.now
	},
	email:{
		type : String,
		required : true,
		unique: true
	},
	password:{
		type : String,
		required : true
	},
})

module.exports = User = mongoose.model('user',UserSchema);