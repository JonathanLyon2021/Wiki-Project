const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const handlebars = require("express-handlebars");

//Remote files
const articleRoutes = require("./routes/article");

const PORT = process.env.PORT || 3000;
// console.log(process.env);

//express
const app = express();

//register our view engine
app.engine(
	"hbs",
	handlebars({
		extname: ".hbs",
		partialDir: __dirname + "/views/partials",
	})
);
app.set("view engine", "hbs");
app.use(express.static("public"));

//mongo
const dbURI = `mongodb+srv://guest:${process.env.MONGO_PW}@project-wiki.lkv0y.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

//middleware
app.use(express.json());

//routes
app.use(articleRoutes);
// app.get("/", (req, res) => {
// 	res.send("API is running");
// });

mongoose
	.connect(dbURI, {
		// useCreateIndex: true,
		// useFindAndModify: true,
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT);
		console.log(`Connected to db and listening on PORT:${PORT}`);
	})
	.catch((err) => {
		console.log(err);
	});
