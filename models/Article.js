const mongoose = require("mongoose");
const schema = mongoose.Schema;
const articleSchema = new schema(
	{
		title: {
			type: String,
			required: true,
			
		},
		content: {
			type: String,
			required: true,
		},
		author: {
			type: String,

		},
        creationDate: {
            type: Date,
            default: new Date(Date.now())
        }
	},
	{
		timestamps: true,
	}
);
module.exports = mongoose.model("Article", articleSchema);
