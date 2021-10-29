//https://mongoosejs.com/docs/api.html

const Article = require("../models/Article");
const { validationResult } = require("express-validator");

exports.getHome = async (req, res) => {
	console.log("home");
	let username;
	let isLoggedin = req.session.isLoggedin;
	if (isLoggedin) {
		username = req.session.user.username;
	} else {
		username = null;
	}
	try {
		let articles = await Article.find({});
		// console.log(articles);
		articles = articles.slice(0, 3);
		//[map over the articles and constrain the word count to 50 words]
		articles = articles.map((article) => {
			let description = article.content.split(" ").slice(0, 50).join(" ");
			return { title: article.title, content: description };
		});
		res.render("index.hbs", {
			docTitle: `home`,
			isLoggedin,
			username,
			articles,
		});
	} catch (err) {
		console.log(err);
	}
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

exports.getEdit = async (req, res) => {
	let id = req.params.id;
	const article = await Article.findById(id);
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;

	res.render("edit.hbs", {
		docTitle: "Edit article",
		isLoggedin,
		username,
		title: article.title,
		content: article.content,
		id: article._id,
	});
};

exports.postCreate = async (req, res) => {
	let { title, content } = req.body;
	console.log(req.body);

	const obj = { title, content, author: req.user._id };
	const document = await Article.create(new Article(obj));
	if (document) {
		res.redirect("/");
	} else {
		res.render("index.hbs", {
			docTitle: "home",
			errorMessage: "Database Error",
		});
	}
};

exports.postEdit = async (req, res) => {
	let userId = req.params.id;
	let { title, content, id } = req.body;

	//validation
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		return res.render("edit", {
			docTitle: "edit",
			errorMessage: errors.array()[0].msg,
			title: title,
			content: content,
			id: id,
		});
	}

	const article = await Article.findById(userId);
	article.title = title;
	article.content = content;
	await article.save();

	res.redirect("/");
};

exports.getDetails = async (req, res) => {
	const title = req.params.title;
	let article = await Article.find({ title: title });
	article = article[0];
	let isLoggedin = req.session.isLoggedin;
	let username = req.session.user.username;

	let owner = false;
	if (req.user) {
		owner = req.user._id.toString() == article.author;
	}
	if (article) {
		const viewData = {
			docTitle: `details | ${title}`,
			isLoggedin,
			username,
			title: article.title,
			content: article.content,
			id: article._id.toString(),
			owner,
		};
		res.render("article.hbs", viewData);
	}
};

exports.deleteArticle = async (req, res) => {
	try {
		const id = req.params.id;

		await Article.findByIdAndDelete(id);
		res.redirect("/");
	} catch (err) {
		console.log(err);
	}
};
