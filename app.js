var express = require("express");
var bodyParser = require("body-parser");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var errorHandler = require("errorhandler");
var morgan = require("morgan");

var ac = require("atlassian-connect-express");
var http = require("http");
var path = require("path");
var routes = require("./routes");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.post("/installed", (req, res, next) => {
  req.body.baseUrl = req.body.baseApiUrl;
  next();
});

// Bootstrap the `atlassian-connect-express` library
var addon = ac(app, {
  config: {
    descriptorTransformer: (descriptor, config) => {
      // make descriptor transformations here
      return descriptor;
    }
  }
});

// You can set this in `config.json`
var port = addon.config.port();
// Declare the environment to use in `config.json`
var devEnv = app.get("env") == "development";

// The following settings applies to all environments
app.set("port", port);

// Declare any Express [middleware](http://expressjs.com/api.html#middleware) you'd like to use here
app.use(morgan(devEnv ? "dev" : "combined"));
// You need to instantiate the `atlassian-connect-express` middleware in order to get its goodness for free
app.use(addon.middleware());

// Show nicer errors when in dev mode
if (devEnv) app.use(errorHandler());

// Wire up your routes using the express and `atlassian-connect-express` objects
routes(app, addon);

// Boot the damn thing
http.createServer(app).listen(port, function() {
  console.log("Add-on server running at " + addon.config.localBaseUrl());
});
