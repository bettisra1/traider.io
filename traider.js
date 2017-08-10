var express = require('express'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var routes = require('./routes/routes.js');
var MongoStore = require('connect-mongo')({
    session: expressSession
});
var mongohandler = require("./db/db.client.js");

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


createServer = function createServer() {

    var server = express();
    var dbUrl = mongohandler.dbUrl();
    // specify middleware 
    server.use(express.bodyParser());
    server.use(express.static(__dirname + '/public'));
    server.use('/product/*', express.static(__dirname + '/public'));
    server.use('/basket/', express.static(__dirname + '/public'));
    server.use('/login/', express.static(__dirname + '/public'))

    server.use(cookieParser());
    server.use(expressSession({
        secret: 'mdfkldfgkl&*(sas/d,asldsjf()*)(mlksdmfNfjSDsdfYUHNn',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            //url: "mongodb://localhost/traiderioSessions"
            url: dbUrl
            //db: 'traiderioSessions',
            //db: 'traiderio'
        })
    }));

    // passport settings
    server.use(passport.initialize());
    server.user(passport.session());
    

    // attach router handlers
    routes.attachHandlers(server); //, passport);

    return server;

};


var server = createServer();
var port = Number(process.env.PORT || 5000);
server.listen(port, function() {
    console.log("Listening on " + port);
});