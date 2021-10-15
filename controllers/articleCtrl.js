exports.getHome = (req, res) => {
	console.log("home");
	// console.log(req);
	// console.log(res);

	// res.json({ msg: "getHome" });
	res.render("all-articles", {});
};
