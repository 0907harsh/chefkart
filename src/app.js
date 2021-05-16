/** @format */

const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const http = require("http");
const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const flash = require("express-flash");
var expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
var bodyParser = require("body-parser");
// require('./db/mongoose')

const app = express();

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const sOpt = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
};
const sessionStore = new MySQLStore(sOpt);

//Session config
app.use(
    session({
        store: sessionStore,
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // security of session (level = low security) 24 hour
    })
);

//passport config
// const passortInit = require("./configPassport/passport");
// passortInit(passport);
app.use(passport.initialize());
app.use(passport.session());

//Models
var models = require("./models");

//load passport strategies
require("./configPassport/passport.js")(passport, models.user);

//Sync Database
models.sequelize
    .sync()
    .then(function () {
        console.log("Nice! Database looks fine");
    })
    .catch(function (err) {
        console.log(err, "Something went wrong with the Database Update!");
    });

app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    // console.log(req)
    next();
});

const ejs = require("ejs");
const server = http.createServer(app);

//Setting Up template engine
app.set("views", path.join(__dirname, "../templates/views/"));
app.engine("ejs", require("ejs").renderFile);
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));

//Remember the layout must be ont the top of the render engine as it help the ejs layout preprocess the fiels befor the render
// Routes Start Here
const webRouter = require("./routes/web");
app.use(webRouter);

//Starting the server and listening on the dedicated port
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// var cookieParser = require('cookie-parser');
// const adminauth = require('./middleware/adminauth')
// const loginauth = require('./middleware/loginauth')

// //Defne path for Express config
// const viewsPath=path.join(__dirname,'../templates/views')
// const partialsPath=path.join(__dirname,'../templates/partials')

// //Setup handlebars engine and viesws locations
// app.set('view engine','hbs')
// app.set('views',viewsPath)

// //Partials path setup
// hbs.registerPartials(partialsPath)

// //Setup static directory to serve
// app.use(express.static(path.join(__dirname,'../public')))
// app.use(require("body-parser").json())
// app.use(cookieParser());
