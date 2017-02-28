"use strict";

var path = require("path"),
	express = require("express"),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	favicon = require("serve-favicon"),
	server = express(),
	cacheMaxAge = process.env.NODE_ENV === "development" ? 0 : 3600000,
	fs = require("fs"),
	_ = require("lodash"),
	// eslint-disable-next-line no-sync
	indexTemplate = _.template(fs.readFileSync(path.join(__dirname, "/public/index.tpl"), {
		encoding: "utf8"
	})),
	url = require("url");

// Server setup.

server.use(favicon(path.join(__dirname, "public/img/favicon-32x32.png"), {
	maxAge: cacheMaxAge
}));

server.use(express.query());

server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
	extended: false
}));

server.use(cookieParser());

server.use(express.static(path.join(__dirname, "public"), {
	maxAge: cacheMaxAge
}));

server.use(function(req, res, next) {
	var urlObj = url.parse(req.url);
	var regexp = /\/((?:en)|(?:fr))\//;
	var regexpAPI = /\/((?:api))\//;

	if (urlObj.pathname.match(regexpAPI)) {
		// If the request comes to the /api, don't redirect it
		next();
	} else if (urlObj.pathname.match(regexp)) {
		// If we have the locale param in the URL, pass the request along
		next();
	} else {
		// If not, redirect the request to /fr
		urlObj.pathname = "/fr" + urlObj.pathname;
		res.redirect(301, url.format(urlObj));
	}
});

server.get("*", function(req, res) {
	res.send(indexTemplate({
		lang: req.params.lang
	}));
});

// Unhandled exception handler.
server.use(function(err, req, res) {
	console.log(err);
	res.sendStatus(500);
});

module.exports = server;
