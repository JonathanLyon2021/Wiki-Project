const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
require("dotenv").config();
const handlebars = require("express-handlebars");
const flash = require("connect-flash");

//Remote files
const articleRoutes = require("./routes/article");
const authRoutes = require("./routes/auth");
const User = require("./models/User");
const PORT = process.env.PORT || 3000;
// console.log(process.env);

//mongo
const dbURI = `mongodb+srv://guest:${process.env.MONGO_PW}@project-wiki.lkv0y.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

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

//static files
app.use(express.static("public"));

//middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.json());
const store = new MongoDBStore({
	uri: dbURI,
	collection: "sessions",
});

//how we use things inside our application
app.use(
	session({
		secret: "my secret",
		resave: false,
		saveUninitialized: false,
		store: store,
	})
);

//once we call this array you cant use it anymore, after you call the method/array
app.use(flash());

//Check if user is currently logged into the session
app.use((req, res, next) => {
	if (!req.session.user) {
		return next();
	}
	User.findById(req.session.user._id).then((user) => {
		req.user = user; //store user locally
		next();
	});
});

// Use Local variables
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;

	if (res.locals.isAuthenticated) {
		res.locals.username = req.session.user.username;
	}

	res.locals.errorMessage = req.flash("error");
	res.locals.successMessage = req.flash("success");
	next();
});

//routes
app.use(articleRoutes);

app.use(authRoutes);

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
