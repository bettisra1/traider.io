var mongoHandler = require("./db.client.js");
var collectionName = "users";

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
};

exports.find = function(email, callback){
	var mongoclient = mongoHandler.getDbClient();
    var dbUrl = mongoHandler.dbUrl();
    mongoclient.connect(dbUrl, function(err,db) {
        if (err) {
            db.close();
            throw err.Message;
            return;
        }

        db.collection(collectionName).find({"email":email}).toArray(function(err, docs) {
            if (err) {
                mongoclient.close();
                throw err.Message;
                return;
            } else if (callback === null && typeof(callback) !== "function") {
                mongoclient.close();
                return callback(result);
            }
            callback(docs);
        });
    });
}