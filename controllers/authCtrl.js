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
			return user.save();
		})
		.then((result) => {
			console.log(result);
			req.flash("success", "Registration Successful");

			res.render("index.hbs", { docTitle: "home" });
		})
		.catch((err) => console.log(err));
};

exports.getLogin = (req, res) => {
	res.render("auth/login.hbs", { docTitle: "login" });
};

exports.postLogin = (req, res) => {
	const { username, password } = req.body;
	console.log(username, password);
	// console.log(req);

	//check the database to see if this username exists
	User.findOne({ username })
		.then((user) => {
			if (!User) {
				req.flash("error", "User not found in database");

				console.log("no user in database");
				return res.redirect("/login");
			}
			//compare password to hased password in our database
			bcrypt.compare(password, user.password).then((match) => {
				if (match) {
					req.session.isLoggedin = true;
					req.session.user = user;
					console.log(match);
					console.log("logged in!");
					// localStorage.setItem("userid", user._id);
					// localStorage.setItem("username", user.username);
					req.flash("success", "Logged in successfully!");

					return res.redirect("/");
				}
				return res.redirect("/login");
			});
		})
		.catch((err) => {
			console.log(err);
			return res.redirect("/login");
		});
};
