var mongoHandler = require("./db.client.js");
//var mongo = require("mongodb");
//var MongoClient = mongo.mongoClient;
var collectionName = "products";


exports.getById = function(id, callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    console.log("db.prodcts.js : getById: "+ id);
    var mongoclient = mongoHandler.getDbClient();
    // Open the connection to the server
    var dbUrl = mongoHandler.dbUrl();
    mongoclient.connect(dbUrl, function(err,db) {
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            //db.close();
            //mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                db.close();
                return callback(null, result);
            }
        });
    });

    /*mongoclient.open(function(err, mongoclient) {
        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        var mongoId;
        try {
            mongoId = mongoHandler.makeObjectID(id);
        } catch (e) {
            return callback(e);
        }
        console.log("id:" + mongoId);
        db.collection(collectionName).findOne({
            "_id": mongoId
        }, function(err, result) {
            mongoclient.close();
            if (err) {
                callback(err);
                return;
            } else {
                // Close the connection
                return callback(null, result);
            }
        });
    });*/
};

exports.getAll = function(callback) {
    if (callback === null || typeof(callback) !== "function") {
        throw "Call to db method must include callback function"
    }
    var mongoclient = mongoHandler.getDbClient();
    var dbUrl = mongoHandler.dbUrl();
    mongoclient.connect(dbUrl, function(err,db) {
        if(err) {
            db.close();
            throw err.Message;
            return;
        }

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                db.close();
                throw err.Message;
                return;
            } else {
                result.toArray(function(err, resultArray) {
                    // Close the connection
                    db.close();

                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });

    });
    /*mongoclient.open(function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).find({}, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else {
                result.toArray(function(err, resultArray) {
                    // Close the connection
                    mongoclient.close();

                    console.log("Got data: " + resultArray.length + " records.");
                    return callback(resultArray);

                });
            }
        });
    });*/
};


exports.insert = function(data, callback) {
    var mongoclient = mongoHandler.getDbClient();
    var dbUrl = mongoHandler.dbUrl();
    mongoclient.connect(dbUrl, function(err,db) {
        if (err) {
            db.close();
            throw err.Message;
            return;
        }

        db.collection(collectionName).insert(data, function(err, result) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else if (callback === null && typeof(callback) !== "function") {
                mongoclient.close();
                return callback(result);
            }
        });
    });
    /*mongoclient.open(function(err, mongoclient) {

        if (err) {
            mongoclient.close();
            throw err.Message;
            return;
        }

        var dbName = mongoHandler.dbName();
        var db = mongoclient.db(dbName);
        console.log(dbName + "." + collectionName);

        db.collection(collectionName).insert(data, function(err, result) {
            if (err) {

                mongoclient.close();
                throw err.Message;
                return;
            } else if (callback === null && typeof(callback) !== "function") {
                mongoclient.close();
                return callback(result);
            }
        });
    });
    */
};