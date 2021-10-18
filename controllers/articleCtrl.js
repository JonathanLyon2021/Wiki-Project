exports.getHome = (req, res) => {
	console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("index.hbs", { docTitle: "home" });
};
