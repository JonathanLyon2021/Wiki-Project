const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

exports.getRegister = (req, res) => {
	res.render("auth/register.hbs", { docTitle: "register" });
};

exports.postRegister = (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	// console.log(req);

	//hash the password
	bcrypt
		.hash(password, 12)
		.then((hash) => {
			const user = new User({ username, password: hash });
			user.save();
			res.redirect("index.hbs");
		})
		.catch((err) => console.log(err));
};
