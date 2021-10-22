exports.isAuth = (req, res, next) => {
	if (req.session.isLoggedin) {
		next();
	} else {
		res.render("auth/login.hbs", { docTitle: "login" });
	}
};
