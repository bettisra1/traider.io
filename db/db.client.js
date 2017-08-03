
var mongo = require("mongodb");
var MongoClient = mongo.MongoClient,
    Server = require('mongodb').Server,
    ObjectID = mongo.ObjectID;


exports.getDbClient = function() {
    return MongoClient;
    //return new MongoClient(new Server("127.0.0.1", 27017), {
    //    native_parser : true    });
};

exports.dbName = function() {
    return "traider";
};

exports.dbUrl = function() {
	return "mongodb://localhost:27017/traider"
}

exports.makeObjectID = function(id) {
    console.log("db.client.js : makeObjectID: "+ id);
    return new ObjectID(id);
};