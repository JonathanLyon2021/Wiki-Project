const Article = require("../models/Article");

exports.getHome = (req, res) => {
	console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("index.hbs", { docTitle: "home" });
};

exports.getAllArticles = (req, res) => {
	// console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("all-articles.hbs", { docTitle: "All-articles" });
};

exports.getCreate = (req, res) => {
	// console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("create.hbs", { docTitle: "Create article" });
};

exports.postCreate = (req, res) => {
	let { title, content } = req.body;
};
