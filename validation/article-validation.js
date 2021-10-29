const { body } = require("express-validator");

exports.createValidator = (req, res) => {
	return [
		body("title")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide a title")
			.isLength({ min: 5 })
			.withMessage("Title should be at least 5 characters"),

		body("content")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide content")
			.isLength({ min: 20 })
			.withMessage("Content should be at least 20 characters"),
	];
};
