const Client = require("../models/Post");
const jwt = require("jsonwebtoken");

// how long a token lasts before expiring
const tokenLasts = "30d";

exports.viewCreateScreen = function (req, res) {
  res.render("create-client");
};

exports.create = function (req, res) {
  let client = new Client(req.body, req.file, req.session.user);
  console.log(req.file);
  client
    .create()
    .then(() => {
      res.send("new client created");
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.viewSingle = async function (req, res) {
  try {
    let client = await Client.findingSingleById(req.params.id);
    res.render("review-client", { client: client });
  } catch {
    res.render("404");
  }
};

exports.apiLogin = function (req, res) {
  let client = new Client(req.body);
  client
    .login()
    .then(function (result) {
      res.json({
        token: jwt.sign(
          {
            _id: client.data._id,
            company: client.data.company,
            shortLink: client.data.shortLink,
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: client.data.name,
        avatar: client.avatar,
        email: client.data.Email,
        company: client.data.company,
      });
    })
    .catch(function (e) {
      res.json(false);
    });
};

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiClient = jwt.verify(req.body.token, process.env.JWTSECRET);
    next();
  } catch (error) {
    res.status(500).send("sorry, you must provide valid token");
  }
};

exports.checkToken = function (req, res) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET);
    res.json(true);
  } catch (e) {
    res.json(false);
  }
};

//Check if client exists
exports.ifClientExists = function (req, res, next) {
  let client = new Client(req.params.id);
  client
    .findByCompany()
    .then(function (userDocument) {
      req.company = userDocument.company;
      next();
    })
    .catch(function (e) {
      res.json(false);
    });
};
