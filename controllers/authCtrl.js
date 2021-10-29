const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const { validationResult } = require("express-validator");

exports.getRegister = (req, res) => {
	res.render("auth/register.hbs", { docTitle: "register" });
};

exports.postRegister = (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.render("auth/register", {
			docTitle: "register",
			errorMessage: errors.array()[0].msg,
		});
	}

	//hash the password
	bcrypt
		.hash(password, 12)
		.then((hash) => {
			const user = new User({ username, password: hash });
			return user.save();
		})
		.then((result) => {
			console.log(result);

			res.render("auth/login.hbs", {
				docTitle: "login",
				successMessage: "Registration Successful",
			});
		})
		.catch((err) => console.log(err));
};

exports.getLogin = (req, res) => {
	res.render("auth/login.hbs", { docTitle: "login" });
};

exports.postLogin = (req, res) => {
	const { username, password } = req.body;
	// const isLoggedin = res.locals.isAuthenticated
	console.log(username, password);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.render("auth/login", {
			docTitle: "login",
			errorMessage: errors.array()[0].msg,
		});
	}
	// console.log(req);

	//check the database to see if this username exists
	User.findOne({ username })
		.then((user) => {
			if (!User) {
				req.flash("error", "User not found in database");

				console.log("no user in database");
				return res.render("/login", {
					errorMessage: req.flash("error"),
				});
			}
			//compare password to hased password in our database
			bcrypt.compare(password, user.password).then((match) => {
				if (match) {
					req.session.isLoggedin = true;
					req.session.user = user;
					// console.log(req.session);

					return req.session.save((err) => {
						console.log(err);
						req.flash("success", "Logged in successfully!");
						// return res.render("index.hbs", {
						// 	successMessage: req.flash("success"),
						// 	isLoggedin: req.session.isLoggedin,
						// 	username: req.session.user.username,
						// });
						return res.redirect("/");
					});
				}
				req.flash("error", "Invalid username or password!");
				return res.render("/login", {
					errorMessage: req.flash("error"),
				});
			});
		})
		.catch((err) => {
			console.log(err);
			return res.render("/login");
		});
};

exports.getLogout = (req, res) => {
	req.session.destroy((result) => {
		res.render("index.hbs", {
			docTitle: "home",
			successMessage: "Successfully logged out",
		});
	});
};
