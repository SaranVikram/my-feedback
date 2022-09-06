const { json } = require("body-parser");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsConfig = {
  origin: ["https://app.my-feedback.in", "http://localhost:3000"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsConfig));
// api specific routes
app.use("/api", require("./router-api"));

//enabling pre-flight
app.options("*", cors(corsConfig));

let sessionOptions = session({
  secret: "javascript is so cool",
  store: new MongoStore({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});
app.use(sessionOptions);
app.use(flash());

app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  next();
});

//routing for server side

const router = require("./router");
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.use("/", router);

module.exports = app;
