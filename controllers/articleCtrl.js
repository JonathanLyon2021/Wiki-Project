//https://mongoosejs.com/docs/api.html

const Article = require("../models/Article");

exports.getHome = (req, res) => {
	console.log("home");
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("index.hbs", { docTitle: "home", isLoggedin, username });
};

exports.getAllArticles = async (req, res) => {
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;
	let titles = [];

	//return all articles from mongo
	const articles = await Article.find({});
	if (articles) {
		articles.forEach((article) => {
			titles.push(article.title);
		});
		console.log(titles);
	}
	// res.json({ msg: "getHome" });
	res.render("all-articles.hbs", {
		docTitle: "All-articles",
		isLoggedin,
		username,
		titles,
	});
};

exports.getCreate = (req, res) => {
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;
	// console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("create.hbs", {
		docTitle: "Create article",
		isLoggedin,
		username,
	});
};

exports.postCreate = async (req, res) => {
	let { title, content } = req.body;

	const obj = { title, content, author: req.user._id };
	const document = await Article.create(new Article(obj));
	if (document) {
		res.render("index.hbs", {
			docTitle: "home",
			successMessage: "Article created successfully",
		});
	} else {
		res.render("index.hbs", {
			docTitle: "home",
			errorMessage: "Database Error",
		});
	}
};

exports.getDetails = async (req, res) => {
	const title = req.params.title;
	let article = await Article.find({ title: title });
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;
	if (article) {
		article = article[0];
		const viewData = {
			docTitle: `details | ${title}`,
			isLoggedin,
			username,
			title: article.title,
			content: article.content,
			id: article._id.toString()
		};
		res.render("article.hbs", viewData);
	}
};
