const { body } = require("express-validator");
const User = require("../models/User");

exports.signupValidator = (req, res) => {
	return [
		body("username")
			.trim()
			.not()
			.isEmpty()
			.withMessage("Please provide username")
			.isAlphanumeric()
			.withMessage("Username should be alpha-numeric")
			.isLength({ min: 5, max: 20 })
			.withMessage("Username should be within 5-20 characters")
			.custom((value) => {
				return User.findOne({ username: value }).then((doc) => {
					if (doc) {
						return Promise.reject("Username is already taken");
					}
				});
			}),

		body("password", "Password must be 8-20 alpha-numeric characters")
			.trim()
			.isAlphanumeric()
			.isLength({ min: 8, max: 20 }),

		body("repeatPassword").custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error("Passwords not matching");
			}
			return true;
		}),
	];
};

exports.loginValidator = (req, res) => {
    return [
        body("username") 
            .trim()
            .not()
            .isEmpty()
            .withMessage("Please provide username")
            .isAlphanumeric()
            .withMessage("Username should be alpha-numeric")
            .isLength({ min: 5, max: 20 })
            .withMessage("Username should be within 5-20 characters"),

        body("password", "Password must be 8-20 alpha-numeric characters")
			.trim()
			.isAlphanumeric()
			.isLength({ min: 8, max: 20 })
    ]
}